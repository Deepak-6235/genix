import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { LANGUAGE_CODES } from '@/lib/languages';
import { translateContent } from '@/lib/translate';

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

// GET all detailed services for a service slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const allLangs = searchParams.get('allLangs') === 'true';

    // Check if service exists
    const serviceExists = await prisma.service.findFirst({
      where: { slug },
    });

    if (!serviceExists) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Get all detailed services for this slug
    const detailedServices = await prisma.detailedService.findMany({
      where: { serviceSlug: slug },
      orderBy: { sectionOrder: 'asc' },
      include: {
        language: true,
      },
    });

    if (allLangs) {
      // Group by sectionOrder and return with all translations
      const detailedByOrder = new Map();

      for (const detailed of detailedServices) {
        const key = `${detailed.sectionOrder}`;

        if (!detailedByOrder.has(key)) {
          detailedByOrder.set(key, {
            id: detailed.id,
            order: detailed.sectionOrder,
            title: detailed.title,
            subtitle: detailed.subtitle,
            fullDescription: detailed.fullDescription,
            imageUrl: detailed.imageUrl,
            translations: {},
          });
        }

        const item = detailedByOrder.get(key);
        item.translations[detailed.language.code] = {
          title: detailed.title,
          subtitle: detailed.subtitle,
          fullDescription: detailed.fullDescription,
        };
      }

      const result = Array.from(detailedByOrder.values());

      return NextResponse.json({
        success: true,
        detailedServices: result,
      });
    }

    return NextResponse.json({
      success: true,
      detailedServices: detailedServices.map(d => ({
        id: d.id,
        order: d.sectionOrder,
        title: d.title,
        subtitle: d.subtitle,
        fullDescription: d.fullDescription,
        imageUrl: d.imageUrl,
        languageCode: d.language.code,
      })),
    });
  } catch (error) {
    console.error('Get detailed services error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch detailed services' },
      { status: 500 }
    );
  }
}

// POST create new detailed service section in all languages
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { order, translations: clientTranslations } = body;

    // Validation
    if (
      !clientTranslations ||
      !clientTranslations.en ||
      !clientTranslations.en.title ||
      !clientTranslations.en.subtitle ||
      !clientTranslations.en.fullDescription
    ) {
      return NextResponse.json(
        { success: false, message: 'Title, subtitle, and full description are required' },
        { status: 400 }
      );
    }

    // Check if service exists
    const serviceExists = await prisma.service.findFirst({
      where: { slug },
    });

    if (!serviceExists) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Get the highest section order to use as default if not provided
    const maxOrder = await prisma.detailedService.findFirst({
      where: { serviceSlug: slug },
      orderBy: { sectionOrder: 'desc' },
      select: { sectionOrder: true },
    });

    const newOrder = order !== undefined ? order : (maxOrder?.sectionOrder || 0) + 1;

    // Get all languages to create detailed services for each
    const allLanguages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create detailed service in all languages
    const createdDetails = await Promise.allSettled(
      allLanguages.map((lang) => {
        const content = clientTranslations[lang.code as keyof typeof clientTranslations];
        const finalContent = content || clientTranslations['en'];

        if (!finalContent) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.detailedService.create({
          data: {
            serviceSlug: slug,
            languageId: lang.id,
            title: finalContent.title,
            subtitle: finalContent.subtitle,
            fullDescription: finalContent.fullDescription,
            imageUrl: body.imageUrl || null,
            sectionOrder: newOrder,
          },
          include: {
            language: true,
          },
        });
      })
    );

    const successfulDetails = createdDetails
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Detailed service created successfully in all languages',
      detailedServices: successfulDetails,
    });
  } catch (error) {
    console.error('Create detailed service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create detailed service' },
      { status: 500 }
    );
  }
}

// PUT update detailed service section
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { detailId, order, imageUrl, translations: clientTranslations } = body;

    if (!detailId) {
      return NextResponse.json(
        { success: false, message: 'Detail ID is required' },
        { status: 400 }
      );
    }

    // Get the existing detailed service
    const existingDetail = await prisma.detailedService.findUnique({
      where: { id: detailId },
      include: {
        language: true,
      },
    });

    if (!existingDetail) {
      return NextResponse.json(
        { success: false, message: 'Detailed service not found' },
        { status: 404 }
      );
    }

    // Find all detailed services with the same sectionOrder and serviceSlug
    const allDetails = await prisma.detailedService.findMany({
      where: {
        serviceSlug: slug,
        sectionOrder: existingDetail.sectionOrder,
      },
      include: {
        language: true,
      },
    });

    if (allDetails.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Detailed service not found' },
        { status: 404 }
      );
    }

    // Get all languages
    const allLanguages = await prisma.language.findMany();

    // Update all language versions
    const updatedDetails = [];
    for (const detail of allDetails) {
      const serviceLanguage = allLanguages.find(lang => lang.id === detail.languageId);
      const langCode = serviceLanguage?.code as any;

      const langTranslation = clientTranslations && langCode ? clientTranslations[langCode] : null;

      const updated = await prisma.detailedService.update({
        where: { id: detail.id },
        data: {
          title: langTranslation?.title || detail.title,
          subtitle: langTranslation?.subtitle || detail.subtitle,
          fullDescription: langTranslation?.fullDescription || detail.fullDescription,
          imageUrl: imageUrl !== undefined ? imageUrl : detail.imageUrl,
          sectionOrder: order !== undefined ? order : detail.sectionOrder,
        },
        include: {
          language: true,
        },
      });
      updatedDetails.push(updated);
    }

    return NextResponse.json({
      success: true,
      message: 'Detailed service updated successfully',
      detailedServices: updatedDetails,
    });
  } catch (error) {
    console.error('Update detailed service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update detailed service' },
      { status: 500 }
    );
  }
}

// DELETE detailed service section
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { detailId } = body;

    if (!detailId) {
      return NextResponse.json(
        { success: false, message: 'Detail ID is required' },
        { status: 400 }
      );
    }

    // Get the detailed service to find sectionOrder
    const detailedService = await prisma.detailedService.findUnique({
      where: { id: detailId },
    });

    if (!detailedService) {
      return NextResponse.json(
        { success: false, message: 'Detailed service not found' },
        { status: 404 }
      );
    }

    // Find and delete all language versions of this detailed service
    const allVersions = await prisma.detailedService.findMany({
      where: {
        serviceSlug: slug,
        sectionOrder: detailedService.sectionOrder,
      },
    });

    // Delete all versions
    for (const version of allVersions) {
      await prisma.detailedService.delete({
        where: { id: version.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Detailed service deleted successfully',
    });
  } catch (error) {
    console.error('Delete detailed service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete detailed service' },
      { status: 500 }
    );
  }
}
