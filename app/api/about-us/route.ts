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

// GET about us info
export async function GET() {
  try {
    let aboutUs = await prisma.aboutUs.findFirst();

    // If no record exists, create a default one
    if (!aboutUs) {
      aboutUs = await prisma.aboutUs.create({
        data: {
          email: '',
          phoneNumber1: '',
          phoneNumber2: '',
          workingHours: '24/7',
          address: '',
          city: '',
        },
      });
    }

    return NextResponse.json({
      success: true,
      aboutUs,
    });
  } catch (error) {
    console.error('Get about us error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch about us info' },
      { status: 500 }
    );
  }
}

// PUT update about us info
export async function PUT(request: NextRequest) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, phoneNumber1, phoneNumber2, workingHours, address, city } = body;

    let aboutUs = await prisma.aboutUs.findFirst();

    if (!aboutUs) {
      aboutUs = await prisma.aboutUs.create({
        data: {
          email: email || '',
          phoneNumber1: phoneNumber1 || '',
          phoneNumber2: phoneNumber2 || '',
          workingHours: workingHours || '24/7',
          address: address || '',
          city: city || '',
        },
      });
    } else {
      aboutUs = await prisma.aboutUs.update({
        where: { id: aboutUs.id },
        data: {
          ...(email !== undefined && { email }),
          ...(phoneNumber1 !== undefined && { phoneNumber1 }),
          ...(phoneNumber2 !== undefined && { phoneNumber2 }),
          ...(workingHours !== undefined && { workingHours }),
          ...(address !== undefined && { address }),
          ...(city !== undefined && { city }),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'About us updated successfully',
      aboutUs,
    });
  } catch (error) {
    console.error('Update about us error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update about us' },
      { status: 500 }
    );
  }
}
