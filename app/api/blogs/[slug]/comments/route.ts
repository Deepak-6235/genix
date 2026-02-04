import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '@/lib/languages';
import { translateContent } from '@/lib/translate';
import { nanoid } from 'nanoid';

// GET approved comments for a blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;

    // Find the language
    const language = await prisma.language.findUnique({
      where: { code: lang },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Language not found' },
        { status: 404 }
      );
    }

    // Fetch approved comments for this blog
    const comments = await prisma.comment.findMany({
      where: {
        blogSlug: slug,
        languageId: language.id,
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        language: true,
      },
    });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST create new comment (needs admin approval)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, email, website, comment } = body;

    // Validate required fields
    if (!name || !email || !comment) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and comment are required' },
        { status: 400 }
      );
    }

    // Generate unique comment ID for all language versions
    const commentId = nanoid();

    // Prepare content for translation
    const content = {
      name,
      comment,
    };

    // Auto-translate to all languages
    const translations = await translateContent(content, LANGUAGE_CODES);

    // Get all language records
    const languages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create comment in all languages
    const createdComments = await Promise.allSettled(
      languages.map((lang) => {
        const trans = translations[lang.code as keyof typeof translations];
        const finalTrans = trans || translations['en'];

        if (!finalTrans) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.comment.create({
          data: {
            commentId,
            blogSlug: slug,
            languageId: lang.id,
            name: finalTrans.name,
            email,
            website: website || null,
            comment: finalTrans.comment,
            isApproved: true, // Automatically approved
          },
          include: {
            language: true,
          },
        });
      })
    );

    const successfulComments = createdComments
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully. It will appear after admin approval.',
      comments: successfulComments,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}
