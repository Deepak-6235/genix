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

// POST update order for blogs (updates all language versions)
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
    const { blogs } = body; // Array of { id, order } or { slug, order }

    if (!Array.isArray(blogs)) {
      return NextResponse.json(
        { success: false, message: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Update order for each blog (all language versions)
    await Promise.all(
      blogs.map(async (item: { id?: string; slug?: string; order: number }) => {
        if (item.slug) {
          // If slug is provided, update by slug
          return prisma.blog.updateMany({
            where: { slug: item.slug },
            data: { order: item.order },
          });
        } else if (item.id) {
          // If id is provided, get slug first then update all versions
          const blog = await prisma.blog.findUnique({
            where: { id: item.id },
            select: { slug: true },
          });

          if (blog) {
            return prisma.blog.updateMany({
              where: { slug: blog.slug },
              data: { order: item.order },
            });
          }
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
