import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateContent } from '@/lib/translate';
import { LANGUAGE_CODES } from '@/lib/languages';

// GET - Fetch single comment (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        language: true,
      },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Fetch all language versions of this comment
    const allVersions = await prisma.comment.findMany({
      where: {
        commentId: comment.commentId,
      },
      include: {
        language: true,
      },
    });

    return NextResponse.json({
      success: true,
      comment,
      allVersions,
    });
  } catch (error) {
    console.error('Error fetching comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comment' },
      { status: 500 }
    );
  }
}

// PUT - Update comment (admin only - updates all language versions)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, website, comment, languageId } = body;

    if (!name || !email || !comment || !languageId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the original comment to find commentId
    const originalComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!originalComment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
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

      translations[languageId] = comment;
      translations.en = englishText;
      Object.keys(translatedContent).forEach((lang) => {
        translations[lang] = translatedContent[lang].text;
      });
    }

    // Update all language versions
    const updatedComments = await Promise.all(
      LANGUAGE_CODES.map(async (code) => {
        const lang = await prisma.language.findUnique({
          where: { code },
        });

        if (!lang) return null;

        return prisma.comment.updateMany({
          where: {
            commentId: originalComment.commentId,
            languageId: lang.id,
          },
          data: {
            name,
            email,
            website: website || null,
            comment: translations[code] || comment,
          },
        });
      })
    );

    const updatedComment = await prisma.comment.findUnique({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment updated successfully',
      comment: updatedComment,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE - Delete comment (admin only - deletes all language versions)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Get the comment to find commentId
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Delete all language versions of this comment
    await prisma.comment.deleteMany({
      where: {
        commentId: comment.commentId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// PATCH - Approve/unapprove comment (admin only - updates all language versions)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isApproved } = body;

    if (typeof isApproved !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'isApproved must be a boolean' },
        { status: 400 }
      );
    }

    // Get the comment to find commentId
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Update all language versions
    await prisma.comment.updateMany({
      where: {
        commentId: comment.commentId,
      },
      data: {
        isApproved,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Comment ${isApproved ? 'approved' : 'unapproved'} successfully`,
    });
  } catch (error) {
    console.error('Error updating comment approval:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update comment' },
      { status: 500 }
    );
  }
}
