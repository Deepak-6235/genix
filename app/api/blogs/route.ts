import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '@/lib/languages';
import { translateContent } from '@/lib/translate';
import { uploadToS3 } from '@/lib/s3';

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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET all blogs in selected language
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;

    // First, find the language
    const language = await prisma.language.findUnique({
      where: { code: lang },
    });

    if (!language) {
      return NextResponse.json(
        { success: false, message: 'Language not found' },
        { status: 404 }
      );
    }

    // Then fetch blogs for that language
    const blogs = await prisma.blog.findMany({
      where: {
        languageId: language.id,
        isActive: true,
      },
      orderBy: { publishedAt: 'desc' },
      include: {
        language: true,
      },
    });

    return NextResponse.json({
      success: true,
      blogs,
      language: lang,
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog with image upload
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const slug = formData.get('slug') as string;
    const imageFile = formData.get('image') as File;
    const isActive = formData.get('isActive') === 'true';
    const publishedAt = formData.get('publishedAt') as string;

    // Validation
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, excerpt and content are required' },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Upload image to S3 if provided
    if (imageFile) {
      try {
        const buffer = await imageFile.arrayBuffer();
        imageUrl = await uploadToS3(
          Buffer.from(buffer),
          imageFile.name,
          imageFile.type
        );
      } catch (error) {
        console.error('Image upload error:', error);
        return NextResponse.json(
          { success: false, message: 'Failed to upload image' },
          { status: 400 }
        );
      }
    }

    const generatedSlug = slug || generateSlug(title);

    // Prepare English content
    const englishContent = {
      title,
      shortDescription: excerpt,
      fullDescription: content,
      servicesProvided: '',
      targetInsects: '',
      methodsTitle: '',
      methodsDescription: '',
      advancedTechnologies: '',
      safeUseDescription: '',
      serviceGuarantee: '',
    };

    // Auto-translate to all languages
    const translations = await translateContent(
      englishContent,
      LANGUAGE_CODES
    );

    // Get all language records
    const languages = await prisma.language.findMany({
      where: {
        code: {
          in: LANGUAGE_CODES,
        },
      },
    });

    // Create blog records for all languages
    const createdBlogs = await Promise.all(
      languages.map((lang) => {
        const trans = translations[lang.code as keyof typeof translations];
        return prisma.blog.create({
          data: {
            slug: generatedSlug,
            languageId: lang.id,
            title: trans.title,
            excerpt: trans.shortDescription,
            content: trans.fullDescription,
            imageUrl: imageUrl,
            author: author || null,
            isActive: isActive,
            publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
          },
          include: {
            language: true,
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully in all languages',
      blog: createdBlogs,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
