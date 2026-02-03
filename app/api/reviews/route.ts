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

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function generateUniqueSlug(baseName: string): Promise<string> {
  let slug = generateSlug(baseName);
  let counter = 1;

  while (true) {
    const existing = await prisma.review.findFirst({
      where: { slug },
    });

    if (!existing) {
      return slug;
    }

    slug = `${generateSlug(baseName)}-${counter}`;
    counter++;
  }
}

// GET all reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;
    const allLangs = searchParams.get('allLangs') === 'true';

    // If allLangs is true, return reviews grouped by slug with all translations
    if (allLangs) {
      const allReviews = await prisma.review.findMany({
        orderBy: { order: 'asc' },
        include: {
          language: true,
        },
      });

      // Group reviews by slug
      const reviewsBySlug = new Map();

      for (const review of allReviews) {
        if (!reviewsBySlug.has(review.slug)) {
          // Initialize with the first review data
          reviewsBySlug.set(review.slug, {
            id: review.id,
            slug: review.slug,
            name: review.name,
            position: review.position,
            company: review.company,
            text: review.text,
            rating: review.rating,
            isActive: review.isActive,
            order: review.order,
            translations: {},
          });
        }

        const reviewData = reviewsBySlug.get(review.slug);

        // Add translation for this language
        reviewData.translations[review.language.code] = {
          name: review.name,
          position: review.position,
          company: review.company,
          text: review.text,
        };
      }

      const reviews = Array.from(reviewsBySlug.values());

      return NextResponse.json({
        success: true,
        reviews,
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

    // Then fetch reviews for that language
    const reviews = await prisma.review.findMany({
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
      reviews,
      language: lang,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST create new review with auto-translation to all languages
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
      rating,
      order,
      translations: clientTranslations,
    } = body;

    // Validation - check if translations from client has English content
    if (!clientTranslations || !clientTranslations.en || !clientTranslations.en.name || !clientTranslations.en.text) {
      return NextResponse.json(
        { success: false, message: 'Name and review text are required' },
        { status: 400 }
      );
    }

    const englishContent = clientTranslations.en;
    const generatedSlug = slug || await generateUniqueSlug(englishContent.name);

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

    // Create or update review records for all languages
    const createdReviews = await Promise.allSettled(
      languages.map((lang) => {
        const content = translations[lang.code as keyof typeof translations];

        // Use provided translation or fall back to English
        const finalContent = content || translations['en'];

        if (!finalContent) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.review.upsert({
          where: {
            slug_languageId: {
              slug: generatedSlug,
              languageId: lang.id,
            },
          },
          update: {
            name: finalContent.name,
            position: finalContent.position,
            company: finalContent.company,
            text: finalContent.text,
            rating: rating || 5,
            isActive: isActive !== undefined ? isActive : true,
            order: order || 0,
          },
          create: {
            slug: generatedSlug,
            languageId: lang.id,
            name: finalContent.name,
            position: finalContent.position,
            company: finalContent.company,
            text: finalContent.text,
            rating: rating || 5,
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
    const successfulReviews = createdReviews
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Review created successfully in all languages',
      review: successfulReviews,
    });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create review' },
      { status: 500 }
    );
  }
}
