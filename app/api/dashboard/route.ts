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

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get English language first (single query)
    const enLanguage = await prisma.language.findFirst({ where: { code: 'en' } });
    const enLangId = enLanguage?.id;

    // Fetch ALL data in parallel with single Promise.all
    const [
      recentServices,
      recentBlogs,
      recentReviews,
      serviceCount,
      blogCount,
      reviewCount,
      faqCount,
      statisticCount,
    ] = await Promise.all([
      // Recent services (3)
      prisma.service.findMany({
        where: { languageId: enLangId },
        select: { id: true, title: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Recent blogs (3)
      prisma.blog.findMany({
        where: { languageId: enLangId },
        select: { id: true, title: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Recent reviews (3)
      prisma.review.findMany({
        select: { id: true, name: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Counts
      prisma.service.count({ where: { languageId: enLangId } }),
      prisma.blog.count({ where: { languageId: enLangId } }),
      prisma.review.count(),
      prisma.fAQ.count({ where: { languageId: enLangId } }),
      prisma.statistic.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        services: serviceCount,
        blogs: blogCount,
        reviews: reviewCount,
        faqs: faqCount,
        statistics: statisticCount,
      },
      recentContent: {
        services: recentServices || [],
        blogs: recentBlogs || [],
        reviews: recentReviews || [],
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
