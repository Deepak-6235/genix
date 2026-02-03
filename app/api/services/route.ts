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

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if this slug already exists
    const existing = await prisma.service.findFirst({
      where: { slug },
    });

    if (!existing) {
      return slug;
    }

    // If it exists, append a number and try again
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// GET all services in selected language
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;
    const allLangs = searchParams.get('allLangs') === 'true';

    // If allLangs is true, return services grouped by slug with all translations
    if (allLangs) {
      const allServices = await prisma.service.findMany({
        orderBy: { order: 'asc' },
        include: {
          language: true,
        },
      });

      // Group services by slug
      const servicesBySlug = new Map();

      for (const service of allServices) {
        if (!servicesBySlug.has(service.slug)) {
          // Initialize with the first service data
          servicesBySlug.set(service.slug, {
            id: service.id,
            slug: service.slug,
            name: service.name,
            title: service.title,
            subtitle: service.subtitle,
            shortDescription: service.shortDescription,
            fullDescription: service.fullDescription,
            isActive: service.isActive,
            order: service.order,
            imageUrl: service.imageUrl,
            translations: {},
          });
        }

        const serviceData = servicesBySlug.get(service.slug);

        // Add translation for this language
        serviceData.translations[service.language.code] = {
          name: service.name,
          title: service.title,
          subtitle: service.subtitle,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
        };
      }

      const services = Array.from(servicesBySlug.values());

      return NextResponse.json({
        success: true,
        services,
      });
    }

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
      slug,
      isActive,
      imageUrl,
      order,
      translations: clientTranslations,
    } = body;

    // Validation - check if translations from client has English content
    if (!clientTranslations || !clientTranslations.en || !clientTranslations.en.name || !clientTranslations.en.title || !clientTranslations.en.subtitle || !clientTranslations.en.shortDescription) {
      return NextResponse.json(
        { success: false, message: 'Name, title, subtitle, and short description are required' },
        { status: 400 }
      );
    }

    const englishContent = clientTranslations.en;
    const baseSlug = slug || generateSlug(englishContent.title);
    const generatedSlug = await generateUniqueSlug(baseSlug);

    // Use translations from client (already translated on client side)
    const translations = clientTranslations;

    // Get all language records
    const languages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create or update service records for all languages
    const createdServices = await Promise.allSettled(
      languages.map((lang) => {
        const content = translations[lang.code as keyof typeof translations];

        // Use provided translation or fall back to English
        const finalContent = content || translations['en'];

        if (!finalContent) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.service.upsert({
          where: {
            slug_languageId: {
              slug: generatedSlug,
              languageId: lang.id,
            },
          },
          update: {
            name: finalContent.name,
            title: finalContent.title,
            subtitle: finalContent.subtitle,
            shortDescription: finalContent.shortDescription,
            fullDescription: finalContent.fullDescription || null,
            imageUrl: imageUrl || null,
            isActive: isActive !== undefined ? isActive : true,
            order: order || 0,
          },
          create: {
            slug: generatedSlug,
            languageId: lang.id,
            name: finalContent.name,
            title: finalContent.title,
            subtitle: finalContent.subtitle,
            shortDescription: finalContent.shortDescription,
            fullDescription: finalContent.fullDescription || null,
            imageUrl: imageUrl || null,
            isActive: isActive !== undefined ? isActive : true,
            order: order || 0,
          },
          include: {
            language: true,
          },
        });
      })
    );

    // Extract successful results
    const successfulServices = createdServices
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Service created successfully in all languages',
      service: successfulServices,
    });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}
