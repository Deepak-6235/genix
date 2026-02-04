import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all languages
export async function GET() {
  try {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        dir: true,
      },
    });

    return NextResponse.json({
      success: true,
      languages,
    });
  } catch (error) {
    console.error('Get languages error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}
