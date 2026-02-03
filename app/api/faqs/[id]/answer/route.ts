import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateContent } from '@/lib/translate';
import { LanguageCode } from '@/lib/languages';

interface FAQContent {
  answer: string;
}

// PATCH /api/faqs/[id]/answer - Add answer to unanswered FAQ (auto-translate to all languages)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { answer } = body;
        const { id } = await params;

        // Validation
        if (!answer || answer.trim().length === 0) {
            return NextResponse.json(
                { success: false, message: 'Answer is required' },
                { status: 400 }
            );
        }

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

        // Prepare English content for translation (only answer)
        const englishContent: FAQContent = {
            answer: answer.trim(),
        };

        // Translate answer to all languages
        console.log('Translating answer to all languages...');
        const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja', 'de', 'fr'];
        const translations = await translateContent(englishContent, targetLanguages);

        // Update answer for each language version
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
                        answer: translatedContent.answer,
                    },
                });
            })
        );

        return NextResponse.json({
            success: true,
            message: 'Answer added in all languages'
        });
    } catch (error) {
        console.error('Error adding answer:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to add answer' },
            { status: 500 }
        );
    }
}
