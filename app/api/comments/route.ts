import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateContent } from '@/lib/translate';
import { LANGUAGE_CODES } from '@/lib/languages';
import { v4 as uuidv4 } from 'uuid';

// GET - Fetch comments for a blog in a specific language
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blogSlug = searchParams.get('blogSlug');
    const lang = searchParams.get('lang') || 'en';
    const includeUnapproved = searchParams.get('includeUnapproved') === 'true'; // For admin

    if (!blogSlug) {
      return NextResponse.json(
        { success: false, message: 'Blog slug is required' },
        { status: 400 }
      );
    }

    // Get language
    const language = await prisma.language.findUnique({
      where: { code: lang },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Invalid language' },
        { status: 400 }
      );
    }

    // Fetch comments
    const comments = await prisma.comment.findMany({
      where: {
        blogSlug,
        languageId: language.id,
        ...(includeUnapproved ? {} : { isApproved: true }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - Create a new comment (with auto-translation to all 7 languages)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogSlug, name, email, website, comment, languageId } = body;

    // Validation
    if (!blogSlug || !name || !email || !comment || !languageId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verify blog exists
    const blogExists = await prisma.blog.findFirst({
      where: { slug: blogSlug },
    });

    if (!blogExists) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Auto-translate comment to all languages
    const translations: Record<string, string> = {};

    if (languageId === 'en') {
      const targetLanguages = LANGUAGE_CODES.filter((code) => code !== 'en');
      const translatedContent = await translateContent(
        { text: comment },
        targetLanguages as any
      );

      translations.en = comment;
      Object.keys(translatedContent).forEach((lang) => {
        translations[lang] = translatedContent[lang].text;
      });
    } else {
      // Translate to English first, then to other languages
      const toEnglish = await translateContent(
        { text: comment },
        ['en'] as any
      );
      const englishText = toEnglish.en.text;

      const targetLanguages = LANGUAGE_CODES.filter(
        (code) => code !== 'en' && code !== languageId
      );
      const translatedContent = await translateContent(
        { text: englishText },
        targetLanguages as any
      );

      translations[languageId] = comment; // Original
      translations.en = englishText;
      Object.keys(translatedContent).forEach((lang) => {
        translations[lang] = translatedContent[lang].text;
      });
    }

    // Generate unique commentId for this comment across all languages
    const uniqueCommentId = uuidv4();

    // Create comment in all 7 languages
    const createdComments = await Promise.all(
      LANGUAGE_CODES.map(async (code) => {
        const lang = await prisma.language.findUnique({
          where: { code },
        });

        if (!lang) return null;

        return prisma.comment.create({
          data: {
            commentId: uniqueCommentId,
            blogSlug,
            languageId: lang.id,
            name,
            email,
            website: website || null,
            comment: translations[code] || comment,
            isApproved: false, // Require admin approval
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully. It will be visible after admin approval.',
      comments: createdComments.filter(Boolean),
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
