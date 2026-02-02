import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '@/lib/languages';
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET all services in selected language
export async function GET(request: NextRequest) {
  try {
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

    // Then fetch services for that language
    const services = await prisma.service.findMany({
      where: {
        languageId: language.id,
        isActive: true,
      },
      orderBy: { order: 'asc' },
      include: {
        language: true,
      },
    });

    return NextResponse.json({
      success: true,
      services,
      language: lang,
    });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST create new service with auto-translation to all languages
export async function POST(request: NextRequest) {
  try {
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

    // Validation
    if (!title || !shortDescription) {
      return NextResponse.json(
        { success: false, message: 'Title and short description are required' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || generateSlug(title);

    // Prepare English content
    const englishContent = {
      title,
      shortDescription,
      fullDescription: fullDescription || '',
      servicesProvided: servicesProvided || '',
      targetInsects: targetInsects || '',
      methodsTitle: methodsTitle || '',
      methodsDescription: methodsDescription || '',
      advancedTechnologies: advancedTechnologies || '',
      safeUseDescription: safeUseDescription || '',
      serviceGuarantee: serviceGuarantee || '',
    };

    // Auto-translate to all languages
    const translations = await translateContent(
      englishContent,
      LANGUAGE_CODES as any
    );

    // Get all language records
    const languages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create service records for all languages
    const createdServices = await Promise.all(
      languages.map((lang) => {
        const content = translations[lang.code as keyof typeof translations];
        return prisma.service.create({
          data: {
            icon: icon || null,
            slug: generatedSlug,
            languageId: lang.id,
            title: content.title,
            shortDescription: content.shortDescription,
            fullDescription: content.fullDescription || null,
            servicesProvided: content.servicesProvided || null,
            targetInsects: content.targetInsects || null,
            methodsTitle: content.methodsTitle || null,
            methodsDescription: content.methodsDescription || null,
            advancedTechnologies: content.advancedTechnologies || null,
            safeUseDescription: content.safeUseDescription || null,
            serviceGuarantee: content.serviceGuarantee || null,
            isActive: isActive !== undefined ? isActive : true,
            order: order || 0,
          },
          include: {
            language: true,
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Service created successfully in all languages',
      service: createdServices,
    });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}
