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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
        slug: id,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      icon,
      slug,
      isActive,
      order,
      title,
      shortDescription,
      fullDescription,
      servicesProvided,
      targetInsects,
      methodsTitle,
      methodsDescription,
      advancedTechnologies,
      safeUseDescription,
      serviceGuarantee,
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

    // Update all language versions
    const updatedServices = await Promise.all(
      existingServices.map((service) =>
        prisma.service.update({
          where: { id: service.id },
          data: {
            icon: icon !== undefined ? icon : service.icon,
            slug: slug !== undefined ? slug : service.slug,
            isActive: isActive !== undefined ? isActive : service.isActive,
            order: order !== undefined ? order : service.order,
            title: title !== undefined ? title : service.title,
            shortDescription: shortDescription !== undefined ? shortDescription : service.shortDescription,
            fullDescription: fullDescription !== undefined ? fullDescription : service.fullDescription,
            servicesProvided: servicesProvided !== undefined ? servicesProvided : service.servicesProvided,
            targetInsects: targetInsects !== undefined ? targetInsects : service.targetInsects,
            methodsTitle: methodsTitle !== undefined ? methodsTitle : service.methodsTitle,
            methodsDescription: methodsDescription !== undefined ? methodsDescription : service.methodsDescription,
            advancedTechnologies: advancedTechnologies !== undefined ? advancedTechnologies : service.advancedTechnologies,
            safeUseDescription: safeUseDescription !== undefined ? safeUseDescription : service.safeUseDescription,
            serviceGuarantee: serviceGuarantee !== undefined ? serviceGuarantee : service.serviceGuarantee,
          },
        })
      )
    );

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Delete all language versions
    await Promise.all(
      existingServices.map((service) =>
        prisma.service.delete({
          where: { id: service.id },
        })
      )
    );

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
