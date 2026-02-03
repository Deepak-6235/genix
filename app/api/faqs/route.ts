import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/faqs - Fetch FAQs (supports admin=true for all FAQs)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get('lang') || 'en';
        const isAdmin = searchParams.get('admin') === 'true';

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
                ...(isAdmin ? {} : { isActive: true }), // Only filter by isActive for public
            },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' },
            ],
            select: {
                id: true,
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

// POST /api/faqs - Create a new FAQ (auto-creates for all languages)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, answer, isActive } = body;

        // Validation
        if (!question || !answer) {
            return NextResponse.json(
                { success: false, message: 'Question and answer are required' },
                { status: 400 }
            );
        }

        // Get all active languages
        const languages = await prisma.language.findMany({
            where: { isActive: true },
        });

        // Get the highest order number
        const maxOrderFaq = await prisma.fAQ.findFirst({
            orderBy: { order: 'desc' },
        });
        const nextOrder = (maxOrderFaq?.order ?? -1) + 1;

        // Create FAQ for all languages
        const createdFaqs = await Promise.all(
            languages.map(async (language) => {
                return prisma.fAQ.create({
                    data: {
                        languageId: language.id,
                        question,
                        answer,
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
