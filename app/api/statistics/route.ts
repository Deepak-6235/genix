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

// GET all statistics
export async function GET(request: NextRequest) {
  try {
    const statistics = await prisma.statistic.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      statistics,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

// POST create new statistic
export async function POST(request: NextRequest) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { label, value, icon, order } = body;

    if (!label || value === undefined) {
      return NextResponse.json(
        { success: false, message: 'Label and value are required' },
        { status: 400 }
      );
    }

    const statistic = await prisma.statistic.create({
      data: {
        label,
        value: parseInt(value),
        icon: icon || '📊',
        order: order ?? 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Statistic created successfully',
      statistic,
    });
  } catch (error) {
    console.error('Create statistic error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}
