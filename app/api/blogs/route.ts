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

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if this slug already exists
    const existing = await prisma.blog.findFirst({
      where: { slug },
    });

    if (!existing) {
      return slug;
    }

    // If it exists, append a number and try again
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
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

    const baseSlug = slug || generateSlug(title);
    const generatedSlug = await generateUniqueSlug(baseSlug);

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

    // Create or update blog records for all languages
    const createdBlogs = await Promise.allSettled(
      languages.map((lang) => {
        const trans = translations[lang.code as keyof typeof translations];

        // Use provided translation or fall back to English
        const finalTrans = trans || translations['en'];

        if (!finalTrans) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.blog.upsert({
          where: {
            slug_languageId: {
              slug: generatedSlug,
              languageId: lang.id,
            },
          },
          update: {
            title: finalTrans.title,
            excerpt: finalTrans.shortDescription,
            content: finalTrans.fullDescription,
            imageUrl: imageUrl,
            author: author || null,
            isActive: isActive,
            publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
          },
          create: {
            slug: generatedSlug,
            languageId: lang.id,
            title: finalTrans.title,
            excerpt: finalTrans.shortDescription,
            content: finalTrans.fullDescription,
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

    // Extract successful results
    const successfulBlogs = createdBlogs
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully in all languages',
      blog: successfulBlogs,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
