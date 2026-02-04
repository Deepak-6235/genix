import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { translateContent } from '@/lib/translate';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

const LANGUAGE_CODES = ['en', 'ar', 'pt', 'zh', 'ja', 'de', 'fr'] as const;

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

// GET about us info (returns data for specified language or English by default)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const langCode = searchParams.get('lang') || 'en';

    // Get the language ID
    const language = await prisma.language.findUnique({
      where: { code: langCode },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Language not found' },
        { status: 404 }
      );
    }

    // Get about us for this language
    let aboutUs = await prisma.aboutUs.findFirst({
      where: {
        slug: 'about-us',
        languageId: language.id,
      },
    });

    if (!aboutUs) {
      return NextResponse.json(
        { success: false, message: 'About us not found' },
        { status: 404 }
      );
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

// PUT update about us info (with auto-translation)
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
    const {
      email,
      phoneNumber1,
      phoneNumber2,
      workingHours,
      address,
      languageId,
    } = body;

    if (!languageId) {
      return NextResponse.json(
        { success: false, message: 'Language ID is required' },
        { status: 400 }
      );
    }

    // Get the language
    const language = await prisma.language.findUnique({
      where: { id: languageId },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Language not found' },
        { status: 404 }
      );
    }

    // Auto-translate address if provided
    let translatedAddresses: Record<string, string> = {};

    if (address !== undefined && address !== null) {
      if (language.code === 'en') {
        // Translate from English to all other languages
        const targetLanguages = LANGUAGE_CODES.filter((code) => code !== 'en');
        const translated = await translateContent(
          { text: address },
          targetLanguages as any
        );

        translatedAddresses.en = address;
        Object.keys(translated).forEach((lang) => {
          translatedAddresses[lang as keyof typeof translatedAddresses] =
            translated[lang as keyof typeof translated].text;
        });
      } else {
        // Translate to English first, then to other languages
        const toEnglish = await translateContent(
          { text: address },
          ['en'] as any
        );
        const englishAddress = toEnglish.en.text;

        const targetLanguages = LANGUAGE_CODES.filter(
          (code) => code !== 'en' && code !== language.code
        );
        const translated = await translateContent(
          { text: englishAddress },
          targetLanguages as any
        );

        translatedAddresses[language.code] = address; // Original
        translatedAddresses.en = englishAddress;
        Object.keys(translated).forEach((lang) => {
          translatedAddresses[lang as keyof typeof translatedAddresses] =
            translated[lang as keyof typeof translated].text;
        });
      }
    }

    // Update all language versions
    const updatedAboutUs = await Promise.all(
      LANGUAGE_CODES.map(async (code) => {
        const lang = await prisma.language.findUnique({
          where: { code },
        });

        if (!lang) return null;

        const existingAboutUs = await prisma.aboutUs.findFirst({
          where: {
            slug: 'about-us',
            languageId: lang.id,
          },
        });

        if (!existingAboutUs) return null;

        return prisma.aboutUs.update({
          where: { id: existingAboutUs.id },
          data: {
            ...(email !== undefined && { email }),
            ...(phoneNumber1 !== undefined && { phoneNumber1 }),
            ...(phoneNumber2 !== undefined && { phoneNumber2 }),
            ...(workingHours !== undefined && { workingHours }),
            ...(translatedAddresses[code] && {
              address: translatedAddresses[code],
            }),
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: 'About us updated successfully',
      aboutUs: updatedAboutUs.filter(Boolean),
    });
  } catch (error) {
    console.error('Update about us error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update about us' },
      { status: 500 }
    );
  }
}
