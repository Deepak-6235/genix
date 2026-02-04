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

// GET all blogs in selected language with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || DEFAULT_LANGUAGE;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

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

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalBlogs = await prisma.blog.count({
      where: {
        languageId: language.id,
        isActive: true,
      },
    });

    // Then fetch blogs for that language with pagination
    const blogs = await prisma.blog.findMany({
      where: {
        languageId: language.id,
        isActive: true,
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
      include: {
        language: true,
        detailedBlogs: {
          where: {
            languageId: language.id,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
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

// POST create new blog with image upload and detailed sections
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
    const name = formData.get('name') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const author = formData.get('author') as string;
    const slug = formData.get('slug') as string;
    const imageFile = formData.get('image') as File;
    const isActive = formData.get('isActive') === 'true';
    const publishedAt = formData.get('publishedAt') as string;
    const detailedSectionsJson = formData.get('detailedSections') as string;

    // Validation
    if (!name || !shortDescription || !author) {
      return NextResponse.json(
        { success: false, message: 'Name, short description, and author are required' },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Upload image to S3 if provided
    if (imageFile && imageFile.size > 0) {
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

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Blog image is required' },
        { status: 400 }
      );
    }

    const baseSlug = slug || generateSlug(name);
    const generatedSlug = await generateUniqueSlug(baseSlug);

    // Prepare English content for main blog
    const englishContent = {
      name,
      shortDescription,
    };

    // Auto-translate main blog to all languages
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
    const createdBlogs = await Promise.allSettled(
      languages.map((lang) => {
        const trans = translations[lang.code as keyof typeof translations];
        const finalTrans = trans || translations['en'];

        if (!finalTrans) {
          throw new Error(`No translation found for language ${lang.code}`);
        }

        return prisma.blog.create({
          data: {
            slug: generatedSlug,
            languageId: lang.id,
            name: finalTrans.name,
            shortDescription: finalTrans.shortDescription,
            author,
            imageUrl,
            isActive,
            publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
          },
          include: {
            language: true,
          },
        });
      })
    );

    const successfulBlogs = createdBlogs
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    // Parse and create detailed sections if provided
    if (detailedSectionsJson) {
      try {
        const detailedSections = JSON.parse(detailedSectionsJson);

        for (let i = 0; i < detailedSections.length; i++) {
          const section = detailedSections[i];

          // Upload section image if provided
          let sectionImageUrl: string | null = null;
          const sectionImageFile = formData.get(`sectionImage_${i}`) as File;

          if (sectionImageFile && sectionImageFile.size > 0) {
            try {
              const buffer = await sectionImageFile.arrayBuffer();
              sectionImageUrl = await uploadToS3(
                Buffer.from(buffer),
                sectionImageFile.name,
                sectionImageFile.type
              );
            } catch (error) {
              console.error(`Error uploading section ${i} image:`, error);
            }
          }

          // Translate each section
          const sectionContent = {
            title: section.title,
            description: section.description,
          };

          const sectionTranslations = await translateContent(
            sectionContent,
            LANGUAGE_CODES
          );

          // Create detailed blog entries for all languages
          await Promise.allSettled(
            languages.map((lang) => {
              const blog = successfulBlogs.find((b) => b.languageId === lang.id);
              if (!blog) return Promise.resolve();

              const trans = sectionTranslations[lang.code as keyof typeof sectionTranslations];
              const finalTrans = trans || sectionTranslations['en'];

              return prisma.detailedBlog.create({
                data: {
                  blogId: blog.id,
                  languageId: lang.id,
                  title: finalTrans.title,
                  description: finalTrans.description,
                  imageUrl: sectionImageUrl,
                  order: section.order,
                },
              });
            })
          );
        }
      } catch (error) {
        console.error('Error creating detailed sections:', error);
      }
    }

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
