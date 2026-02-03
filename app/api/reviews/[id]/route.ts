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

// GET single review by slug and language
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

    const review = await prisma.review.findFirst({
      where: {
        slug: id,
        languageId: language.id,
      },
    });

    if (!review) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Get review error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PUT update review in all languages
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
      slug,
      isActive,
      rating,
      order,
      translations: clientTranslations,
    } = body;

    // Find all reviews with this slug (all language versions)
    const existingReviews = await prisma.review.findMany({
      where: { slug: id },
    });

    if (existingReviews.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    // Get all languages to match review updates
    const allLanguages = await prisma.language.findMany();

    // Update all language versions with translations (sequentially to avoid connection pool exhaustion)
    const updatedReviews = [];
    for (const review of existingReviews) {
      // Find the language code for this review
      const reviewLanguage = allLanguages.find(lang => lang.id === review.languageId);
      const langCode = reviewLanguage?.code as any;

      // Get the correct translation for this language
      const langTranslation = clientTranslations && langCode ? clientTranslations[langCode] : null;

      const updatedReview = await prisma.review.update({
        where: { id: review.id },
        data: {
          slug: slug !== undefined ? slug : review.slug,
          isActive: isActive !== undefined ? isActive : review.isActive,
          rating: rating !== undefined ? rating : review.rating,
          order: order !== undefined ? order : review.order,
          name: langTranslation?.name || review.name,
          position: langTranslation?.position || review.position,
          company: langTranslation?.company || review.company,
          text: langTranslation?.text || review.text,
        },
      });
      updatedReviews.push(updatedReview);
    }

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      reviews: updatedReviews,
    });
  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE review (all language versions)
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

    // Find all reviews with this slug
    const existingReviews = await prisma.review.findMany({
      where: { slug: id },
    });

    if (existingReviews.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    // Delete all language versions (sequentially to avoid connection pool exhaustion)
    for (const review of existingReviews) {
      await prisma.review.delete({
        where: { id: review.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Delete review error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
