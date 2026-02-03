import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/faqs - Fetch all FAQs
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const languageId = searchParams.get('languageId');

        const faqs = await prisma.fAQ.findMany({
            where: languageId ? { languageId } : {},
            include: {
                language: true,
            },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' },
            ],
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

// POST /api/admin/faqs - Create a new FAQ
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { languageId, question, answer, isActive, order } = body;

        // Validation
        if (!languageId || !question || !answer) {
            return NextResponse.json(
                { success: false, message: 'Language, question, and answer are required' },
                { status: 400 }
            );
        }

        const faq = await prisma.fAQ.create({
            data: {
                languageId,
                question,
                answer,
                isActive: isActive !== undefined ? isActive : true,
                order: order || 0,
            },
            include: {
                language: true,
            },
        });

        return NextResponse.json({ success: true, faq }, { status: 201 });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create FAQ' },
            { status: 500 }
        );
    }
}
