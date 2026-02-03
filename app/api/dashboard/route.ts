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

    // Fetch all data in parallel
    const [services, blogs, reviews, faqs, statistics, aboutUs] = await Promise.all([
      // Fetch services count and recent services
      prisma.service.findMany({
        where: { languageId: (await prisma.language.findFirst({ where: { code: 'en' } }))?.id },
        select: { id: true, title: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Fetch blogs count and recent blogs
      prisma.blog.findMany({
        where: { languageId: (await prisma.language.findFirst({ where: { code: 'en' } }))?.id },
        select: { id: true, title: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Fetch reviews count and recent reviews
      prisma.review.findMany({
        select: { id: true, name: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),

      // Fetch FAQs count
      prisma.faq.findMany({
        where: { languageId: (await prisma.language.findFirst({ where: { code: 'en' } }))?.id },
        select: { id: true },
      }),

      // Fetch statistics count
      prisma.statistic.findMany({
        select: { id: true },
      }),

      // Fetch about us data
      prisma.aboutUs.findFirst({
        select: { email: true, phoneNumber1: true, phoneNumber2: true, workingHours: true, address: true, city: true },
      }),
    ]);

    // Get language for proper counting
    const enLanguage = await prisma.language.findFirst({ where: { code: 'en' } });

    // Count all items
    const serviceCount = await prisma.service.count({
      where: { languageId: enLanguage?.id },
    });

    const blogCount = await prisma.blog.count({
      where: { languageId: enLanguage?.id },
    });

    const reviewCount = await prisma.review.count();
    const faqCount = await prisma.faq.count({
      where: { languageId: enLanguage?.id },
    });
    const statisticCount = await prisma.statistic.count();

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
        services: services || [],
        blogs: blogs || [],
        reviews: reviews || [],
      },
      aboutUs: aboutUs || null,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
