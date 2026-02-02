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

        // Two-phase update to prevent order collisions:
        // Phase 1: Set all to temporary negative values
        for (let i = 0; i < faqs.length; i++) {
            const item = faqs[i];
            const faq = await prisma.fAQ.findUnique({
                where: { id: item.id },
            });

            if (faq) {
                // Update all FAQs with the same current order to temporary negative value
                await prisma.fAQ.updateMany({
                    where: { order: faq.order },
                    data: { order: -(i + 1000) }, // Use negative temp values
                });
            }
        }

        // Phase 2: Set final order values
        for (let i = 0; i < faqs.length; i++) {
            const tempOrder = -(i + 1000);
            await prisma.fAQ.updateMany({
                where: { order: tempOrder },
                data: { order: i },
            });
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
