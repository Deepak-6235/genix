import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/languages - Fetch all languages
export async function GET(request: NextRequest) {
    try {
        const languages = await prisma.language.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                code: true,
                name: true,
            },
        });

        return NextResponse.json({ success: true, languages });
    } catch (error) {
        console.error('Error fetching languages:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch languages' },
            { status: 500 }
        );
    }
}
