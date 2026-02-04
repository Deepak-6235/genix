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

// PUT update statistic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { key, value, suffix, icon, color, order } = body;

    const statistic = await prisma.statistic.update({
      where: { id },
      data: {
        ...(key && { key }),
        ...(value !== undefined && { value: parseInt(value) }),
        ...(suffix !== undefined && { suffix }),
        ...(icon && { icon }),
        ...(color && { color }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Statistic updated successfully',
      statistic,
    });
  } catch (error) {
    console.error('Update statistic error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update statistic' },
      { status: 500 }
    );
  }
}

// DELETE statistic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.statistic.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Statistic deleted successfully',
    });
  } catch (error) {
    console.error('Delete statistic error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete statistic' },
      { status: 500 }
    );
  }
}
