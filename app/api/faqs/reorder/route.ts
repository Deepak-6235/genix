import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/faqs/reorder - Reorder FAQs (updates all language versions)
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
        // For each FAQ in the reordered list, find its current order and update all FAQs with that order
        for (const item of faqs) {
            // Find the FAQ to get its current order
            const faq = await prisma.fAQ.findUnique({
                where: { id: item.id },
            });

            if (faq) {
                // Update all FAQs with the same current order (all language versions)
                await prisma.fAQ.updateMany({
                    where: { order: faq.order },
                    data: { order: item.order },
                });
            }
        }

        return NextResponse.json({ success: true, message: 'FAQs reordered successfully' });
    } catch (error) {
        console.error('Error reordering FAQs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to reorder FAQs' },
            { status: 500 }
        );
    }
}
