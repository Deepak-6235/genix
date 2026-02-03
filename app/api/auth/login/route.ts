import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/password';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

// Rate limiting: Track failed attempts
const failedAttempts = new Map<string, { count: number; lockoutUntil?: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.toLowerCase().trim();
    const password = body.password;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const attempts = failedAttempts.get(email);
    if (attempts?.lockoutUntil && Date.now() < attempts.lockoutUntil) {
      const remainingTime = Math.ceil((attempts.lockoutUntil - Date.now()) / 1000 / 60);
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed attempts. Try again in ${remainingTime} minutes.`
        },
        { status: 429 }
      );
    }

    // Find admin user in database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateFailedAttempts(email);

      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated. Contact administrator.' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, admin.password);

    if (!isPasswordValid) {
      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateFailedAttempts(email);

      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    failedAttempts.delete(email);

    // Generate JWT token
    const token = await new SignJWT({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(JWT_SECRET);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

function updateFailedAttempts(email: string) {
  const attempts = failedAttempts.get(email) || { count: 0 };
  attempts.count += 1;

  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockoutUntil = Date.now() + LOCKOUT_DURATION;
  }

  failedAttempts.set(email, attempts);
}
