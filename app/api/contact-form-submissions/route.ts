import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { LANGUAGE_CODES } from '@/lib/languages';
import { translateContent } from '@/lib/translate';
import { nanoid } from 'nanoid';

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

// GET all contact form submissions (admin only)
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

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    // Handle missing or invalid lang parameter
    if (!lang || lang === 'undefined' || lang === 'null') {
      return NextResponse.json(
        { success: false, message: 'Language parameter is required' },
        { status: 400 }
      );
    }

    // Find the language
    const language = await prisma.language.findUnique({
      where: { code: lang },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: `Language '${lang}' not found` },
        { status: 404 }
      );
    }

    const submissions = await prisma.contactFormSubmission.findMany({
      where: {
        languageId: language.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        language: true,
      },
    });

    // Fetch service names for each submission
    const submissionsWithServiceNames = await Promise.all(
      submissions.map(async (submission) => {
        // Find the service by slug and language
        const service = await prisma.service.findFirst({
          where: {
            slug: submission.serviceSlug,
            languageId: language.id,
          },
          select: {
            name: true,
          },
        });

        return {
          ...submission,
          serviceName: service?.name || null,
        };
      })
    );

    return NextResponse.json({
      success: true,
      submissions: submissionsWithServiceNames,
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}

// POST create new contact form submission with translations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceSlug, message } = body;

    // Validate required fields
    if (!name || !email || !serviceSlug || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, service, and message are required' },
        { status: 400 }
      );
    }

    // Generate unique contact ID for all language versions
    const contactId = nanoid();

    // Prepare content for translation
    const content = {
      name,
      message,
    };

    // Auto-translate to all languages
    const translations = await translateContent(content, LANGUAGE_CODES);

    // Get all language records
    const languages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create contact form submissions for all languages
    const createdSubmissions = await Promise.allSettled(
      languages.map((lang) => {
        const trans = translations[lang.code as keyof typeof translations];
        const finalTrans = trans || translations['en'];

        if (!finalTrans) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.contactFormSubmission.create({
          data: {
            contactId,
            languageId: lang.id,
            name: finalTrans.name,
            email,
            phone: phone || null,
            serviceSlug,
            message: finalTrans.message,
          },
          include: {
            language: true,
          },
        });
      })
    );

    const successfulSubmissions = createdSubmissions
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      submissions: successfulSubmissions,
    });
  } catch (error) {
    console.error('Create contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
