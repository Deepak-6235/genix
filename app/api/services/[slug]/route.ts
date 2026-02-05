import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { DEFAULT_LANGUAGE } from '@/lib/languages';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET single service by slug and language
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;

    // First, find the language
    const language = await prisma.language.findUnique({
      where: { code: lang },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Language not found' },
        { status: 404 }
      );
    }

    const service = await prisma.service.findFirst({
      where: {
        slug: slug,
        languageId: language.id,
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error('Get service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT update service in all languages
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: id } = await params;
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      imageUrl,
      slug,
      isActive,
      order,
      translations: clientTranslations,
    } = body;

    // Find all services with this slug (all language versions)
    const existingServices = await prisma.service.findMany({
      where: { slug: id },
    });

    if (existingServices.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Get all languages to match service updates
    const allLanguages = await prisma.language.findMany();

    // Update all language versions with translations (sequentially to avoid connection pool exhaustion)
    const updatedServices = [];
    for (const service of existingServices) {
      // Find the language code for this service
      const serviceLanguage = allLanguages.find(lang => lang.id === service.languageId);
      const langCode = serviceLanguage?.code as any;

      // Get the correct translation for this language
      const langTranslation = clientTranslations && langCode ? clientTranslations[langCode] : null;

      const updatedService = await prisma.service.update({
        where: { id: service.id },
        data: {
          imageUrl: imageUrl !== undefined ? imageUrl : service.imageUrl,
          slug: slug !== undefined ? slug : service.slug,
          isActive: isActive !== undefined ? isActive : service.isActive,
          order: order !== undefined ? order : service.order,
          name: langTranslation?.name || service.name,
          title: langTranslation?.title || service.title,
          subtitle: langTranslation?.subtitle || service.subtitle,
          shortDescription: langTranslation?.shortDescription || service.shortDescription,
          fullDescription: langTranslation?.fullDescription || service.fullDescription,
        },
      });
      updatedServices.push(updatedService);
    }

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
      services: updatedServices,
    });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE service (all language versions)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: id } = await params;
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find all services with this slug
    const existingServices = await prisma.service.findMany({
      where: { slug: id },
    });

    if (existingServices.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Delete all language versions (sequentially to avoid connection pool exhaustion)
    for (const service of existingServices) {
      await prisma.service.delete({
        where: { id: service.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
