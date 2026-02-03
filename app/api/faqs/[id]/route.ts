import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

        // Update all FAQs with the same order (all language versions)
        await prisma.fAQ.updateMany({
            where: { order: existingFaq.order },
            data: {
                ...(question && { question }),
                ...(answer && { answer }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        return NextResponse.json({ success: true, message: 'FAQ updated in all languages' });
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

        // Delete all FAQs with the same order (all language versions)
        await prisma.fAQ.deleteMany({
            where: { order: existingFaq.order },
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
