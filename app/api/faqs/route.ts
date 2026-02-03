import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translateContent } from '@/lib/translate';
import { LanguageCode } from '@/lib/languages';
import { randomUUID } from 'crypto';

interface FAQContent {
  question: string;
  answer: string;
}

// GET /api/faqs - Fetch FAQs for a specific language
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get('lang') || 'en';

        // Get language by code
        const language = await prisma.language.findUnique({
            where: { code: lang },
        });

        if (!language) {
            return NextResponse.json(
                { success: false, message: 'Language not found' },
                { status: 404 }
            );
        }

        const faqs = await prisma.fAQ.findMany({
            where: {
                languageId: language.id,
                isActive: true,
            },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' },
            ],
            select: {
                id: true,
                faqId: true,
                question: true,
                answer: true,
                order: true,
                isActive: true,
            },
        });

        return NextResponse.json({ success: true, faqs });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch FAQs' },
            { status: 500 }
        );
    }
}

// POST /api/faqs - Create a new FAQ in all languages (auto-translate)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, answer, isActive } = body;

        // Validation
        if (!question) {
            return NextResponse.json(
                { success: false, message: 'Question is required' },
                { status: 400 }
            );
        }

        // Get all active languages
        const languages = await prisma.language.findMany({
            where: { isActive: true },
        });

        // Generate unique faqId for this FAQ across all languages
        const faqId = randomUUID();

        // Get the highest order number
        const maxOrderFaq = await prisma.fAQ.findFirst({
            orderBy: { order: 'desc' },
        });
        const nextOrder = (maxOrderFaq?.order ?? -1) + 1;

        // Prepare English content
        const englishContent: FAQContent = {
            question,
            answer: answer || '',
        };

        // Translate to all languages
        console.log('Translating FAQ to all languages...');
        const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja', 'de', 'fr'];
        const translations = await translateContent(englishContent, targetLanguages);

        // Create FAQ for all languages with translations
        const createdFaqs = await Promise.all(
            languages.map(async (language) => {
                const langCode = language.code as LanguageCode;
                const translatedContent = translations[langCode] || englishContent;

                return prisma.fAQ.create({
                    data: {
                        faqId,
                        languageId: language.id,
                        question: translatedContent.question,
                        answer: translatedContent.answer || null,
                        isActive: isActive !== undefined ? isActive : true,
                        order: nextOrder,
                    },
                    include: {
                        language: true,
                    },
                });
            })
        );

        return NextResponse.json({
            success: true,
            faqs: createdFaqs,
            message: `FAQ created in ${languages.length} languages`
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create FAQ' },
            { status: 500 }
        );
    }
}
