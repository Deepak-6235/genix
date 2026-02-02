import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/faqs/reorder - Reorder FAQs (updates all language versions)
// Optimized for bulk operations with 200-500+ FAQs
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

        // Use Prisma transaction for atomicity and better performance
        await prisma.$transaction(async (tx) => {
            // Phase 1: Batch fetch all current orders in parallel
            const faqsWithCurrentOrder = await Promise.all(
                faqs.map(async (item, index) => {
                    const faq = await tx.fAQ.findUnique({
                        where: { id: item.id },
                        select: { order: true },
                    });
                    return {
                        currentOrder: faq?.order,
                        newOrder: index,
                        tempOrder: -(index + 1000),
                    };
                })
            );

            // Phase 2: Set all to temporary negative values in parallel
            await Promise.all(
                faqsWithCurrentOrder.map(({ currentOrder, tempOrder }) => {
                    if (currentOrder !== undefined) {
                        return tx.fAQ.updateMany({
                            where: { order: currentOrder },
                            data: { order: tempOrder },
                        });
                    }
                })
            );

            // Phase 3: Set final order values in parallel
            await Promise.all(
                faqsWithCurrentOrder.map(({ tempOrder, newOrder }) => {
                    return tx.fAQ.updateMany({
                        where: { order: tempOrder },
                        data: { order: newOrder },
                    });
                })
            );
        });

        return NextResponse.json({
            success: true,
            message: 'FAQs reordered successfully'
        });
    } catch (error) {
        console.error('Error reordering FAQs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to reorder FAQs' },
            { status: 500 }
        );
    }
}
