import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateContent } from '@/lib/translate';
import { LanguageCode } from '@/lib/languages';

interface FAQContent {
  question: string;
  answer: string;
}

// PUT /api/faqs/[id] - Update an existing FAQ (updates all language versions)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { question, answer, isActive } = body;
        const { id } = await params;

        // Check if FAQ exists
        const existingFaq = await prisma.fAQ.findUnique({
            where: { id },
        });

        if (!existingFaq) {
            return NextResponse.json(
                { success: false, message: 'FAQ not found' },
                { status: 404 }
            );
        }

        // If we have faqId, use it to update all language versions
        // Otherwise, fall back to order (for backward compatibility)
        const whereClause = existingFaq.faqId
            ? { faqId: existingFaq.faqId }
            : { order: existingFaq.order };

        // Get all languages
        const languages = await prisma.language.findMany({
            where: { isActive: true },
        });

        // Prepare English content for translation
        const englishContent: FAQContent = {
            question: question || existingFaq.question,
            answer: answer !== undefined ? answer : (existingFaq.answer || ''),
        };

        // Translate to all languages
        console.log('Translating updated FAQ to all languages...');
        const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja', 'de', 'fr'];
        const translations = await translateContent(englishContent, targetLanguages);

        // Update each language version
        await Promise.all(
            languages.map(async (language) => {
                const langCode = language.code as LanguageCode;
                const translatedContent = translations[langCode] || englishContent;

                return prisma.fAQ.updateMany({
                    where: {
                        ...whereClause,
                        languageId: language.id,
                    },
                    data: {
                        question: translatedContent.question,
                        answer: translatedContent.answer || null,
                        ...(isActive !== undefined && { isActive }),
                    },
                });
            })
        );

        return NextResponse.json({
            success: true,
            message: 'FAQ updated in all languages'
        });
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update FAQ' },
            { status: 500 }
        );
    }
}

// DELETE /api/faqs/[id] - Delete an FAQ (deletes all language versions)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Check if FAQ exists
        const existingFaq = await prisma.fAQ.findUnique({
            where: { id },
        });

        if (!existingFaq) {
            return NextResponse.json(
                { success: false, message: 'FAQ not found' },
                { status: 404 }
            );
        }

        // If we have faqId, use it to delete all language versions
        // Otherwise, fall back to order (for backward compatibility)
        const whereClause = existingFaq.faqId
            ? { faqId: existingFaq.faqId }
            : { order: existingFaq.order };

        // Delete all FAQs with the same faqId or order (all language versions)
        await prisma.fAQ.deleteMany({
            where: whereClause,
        });

        return NextResponse.json({
            success: true,
            message: 'FAQ deleted in all languages'
        });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete FAQ' },
            { status: 500 }
        );
    }
}
