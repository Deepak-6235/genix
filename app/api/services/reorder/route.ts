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

// POST update order for services (updates all language versions)
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
    const { services } = body; // Array of { id, order }

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { success: false, message: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Get the slug for each service ID, then update all language versions
    await Promise.all(
      services.map(async (item: { id: string; order: number }) => {
        // First get the slug from the service ID
        const service = await prisma.service.findUnique({
          where: { id: item.id },
          select: { slug: true },
        });

        if (service) {
          // Update all language versions with same slug
          return prisma.service.updateMany({
            where: { slug: service.slug },
            data: { order: item.order },
          });
        }
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update order' },
      { status: 500 }
    );
  }
}
