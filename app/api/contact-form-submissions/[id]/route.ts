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

// PATCH - Mark submission as read/unread
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { isRead } = body;

    // Find the submission and get its contactId
    const submission = await prisma.contactFormSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    // Update all language versions of this submission
    await prisma.contactFormSubmission.updateMany({
      where: {
        contactId: submission.contactId,
      },
      data: {
        isRead: isRead !== undefined ? isRead : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Submission updated successfully',
    });
  } catch (error) {
    console.error('Update submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

// DELETE - Delete submission (all language versions)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find the submission and get its contactId
    const submission = await prisma.contactFormSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    // Delete all language versions of this submission
    await prisma.contactFormSubmission.deleteMany({
      where: {
        contactId: submission.contactId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
