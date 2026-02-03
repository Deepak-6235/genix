import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// POST /api/faqs/reorder - Reorder FAQs (updates all language versions)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { faqs } = body; // Array of { id, order }

    if (!Array.isArray(faqs)) {
      return NextResponse.json(
        { success: false, message: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Get the order for each FAQ ID, then update all language versions with same order
    await Promise.all(
      faqs.map(async (item: { id: string; order: number }) => {
        // Get the current FAQ to find its order (shared across languages)
        const faq = await prisma.fAQ.findUnique({
          where: { id: item.id },
          select: { order: true },
        });

        if (faq !== null) {
          // Update all FAQs with same old order to new order (all languages)
          return prisma.fAQ.updateMany({
            where: { order: faq.order },
            data: { order: item.order },
          });
        }
      })
    );

    return NextResponse.json({
      success: true,
      message: 'FAQs reordered successfully',
    });
  } catch (error) {
    console.error('Error reordering FAQs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reorder FAQs' },
      { status: 500 }
    );
  }
}
