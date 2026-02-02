import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/faqs/reorder - Reorder FAQs
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { faqs } = body;

        if (!Array.isArray(faqs)) {
            return NextResponse.json(
                { success: false, message: 'Invalid data format' },
                { status: 400 }
            );
        }

        // Update order for each FAQ across all languages
        await Promise.all(
            faqs.map(async (faq: { id: string; order: number }) => {
                await prisma.fAQ.update({
                    where: { id: faq.id },
                    data: { order: faq.order },
                });
            })
        );

        return NextResponse.json({ success: true, message: 'FAQs reordered successfully' });
    } catch (error) {
        console.error('Error reordering FAQs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to reorder FAQs' },
            { status: 500 }
        );
    }
}
