import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { deleteFromS3 } from '@/lib/s3';

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

// DELETE a specific detailed blog section (across all languages)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ blogId: string; order: string }> }
) {
  try {
    const { blogId, order } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderNum = parseInt(order);

    // Find all detailed blog sections with this blogId and order (all language versions)
    const detailedSections = await prisma.detailedBlog.findMany({
      where: {
        blogId,
        order: orderNum,
      },
    });

    if (detailedSections.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Detailed section not found' },
        { status: 404 }
      );
    }

    // Delete images from S3 if they exist
    const imageUrls = new Set(
      detailedSections
        .map((section) => section.imageUrl)
        .filter((url): url is string => url !== null)
    );

    for (const imageUrl of imageUrls) {
      try {
        await deleteFromS3(imageUrl);
      } catch (error) {
        console.error(`Failed to delete image ${imageUrl}:`, error);
      }
    }

    // Delete all language versions of this detailed section
    await prisma.detailedBlog.deleteMany({
      where: {
        blogId,
        order: orderNum,
      },
    });

    // Reorder remaining sections
    const remainingSections = await prisma.detailedBlog.findMany({
      where: {
        blogId,
        order: {
          gt: orderNum,
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Update order for remaining sections (decrement by 1)
    for (const section of remainingSections) {
      await prisma.detailedBlog.updateMany({
        where: {
          blogId,
          order: section.order,
        },
        data: {
          order: section.order - 1,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Detailed section deleted successfully in all languages',
    });
  } catch (error) {
    console.error('Delete detailed section error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete detailed section' },
      { status: 500 }
    );
  }
}
