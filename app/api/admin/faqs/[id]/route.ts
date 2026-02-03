import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/admin/faqs/[id] - Update an existing FAQ
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { languageId, question, answer, isActive, order } = body;
        const { id } = params;

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

        const faq = await prisma.fAQ.update({
            where: { id },
            data: {
                ...(languageId && { languageId }),
                ...(question && { question }),
                ...(answer && { answer }),
                ...(isActive !== undefined && { isActive }),
                ...(order !== undefined && { order }),
            },
            include: {
                language: true,
            },
        });

        return NextResponse.json({ success: true, faq });
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update FAQ' },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/faqs/[id] - Delete an FAQ
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

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

        await prisma.fAQ.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: 'FAQ deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete FAQ' },
            { status: 500 }
        );
    }
}
