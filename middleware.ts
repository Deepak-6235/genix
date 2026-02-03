import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is the admin dashboard
  if (pathname.startsWith('/admin-genix/dashboard')) {
    const token = request.cookies.get('admin_token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/admin-genix', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify token (basic JWT verification)
      // Full session validation happens in the API route
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // Invalid token, redirect to login
      const loginUrl = new URL('/admin-genix', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);

      // Clear invalid token
      response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });

      return response;
    }
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (pathname === '/admin-genix') {
    const token = request.cookies.get('admin_token')?.value;

    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin-genix/dashboard', request.url));
      } catch (error) {
        // Invalid token, allow access to login page
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-genix/:path*'],
};
