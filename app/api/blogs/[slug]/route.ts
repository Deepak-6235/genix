import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { DEFAULT_LANGUAGE } from '@/lib/languages';
import { deleteFromS3 } from '@/lib/s3';

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

// GET single blog by slug and language
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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

    const blog = await prisma.blog.findFirst({
      where: {
        slug: slug,
        languageId: language.id,
      },
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

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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
    const imageFile = formData.get('image') as File;
    const isActive = formData.get('isActive') === 'true';
    const publishedAt = formData.get('publishedAt') as string;
    const detailedSectionsJson = formData.get('detailedSections') as string;

    // Find all blogs with this slug (all language versions)
    const existingBlogs = await prisma.blog.findMany({
      where: { slug: slug },
    });

    if (existingBlogs.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    let imageUrl: string | undefined;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (existingBlogs[0].imageUrl) {
        await deleteFromS3(existingBlogs[0].imageUrl);
      }

      // Upload new image
      const { uploadToS3 } = await import('@/lib/s3');
      const buffer = await imageFile.arrayBuffer();
      imageUrl = await uploadToS3(
        Buffer.from(buffer),
        imageFile.name,
        imageFile.type
      );
    }

    // Update all language versions (sequentially to avoid connection pool exhaustion)
    const updatedBlogs = [];
    for (const blog of existingBlogs) {
      const updatedBlog = await prisma.blog.update({
        where: { id: blog.id },
        data: {
          name: name || blog.name,
          shortDescription: shortDescription || blog.shortDescription,
          author: author || blog.author,
          imageUrl: imageUrl !== undefined ? imageUrl : blog.imageUrl,
          isActive: isActive !== undefined ? isActive : blog.isActive,
          publishedAt: publishedAt ? new Date(publishedAt) : blog.publishedAt,
        },
        include: {
          language: true,
        },
      });
      updatedBlogs.push(updatedBlog);
    }

    // Update detailed sections if provided
    if (detailedSectionsJson) {
      try {
        const detailedSections = JSON.parse(detailedSectionsJson);

        // Delete existing detailed sections for this blog
        await prisma.detailedBlog.deleteMany({
          where: {
            blogId: {
              in: existingBlogs.map((b) => b.id),
            },
          },
        });

        // Get all languages
        const { LANGUAGE_CODES } = await import('@/lib/languages');
        const { translateContent } = await import('@/lib/translate');
        const languages = await prisma.language.findMany({
          where: {
            code: {
              in: LANGUAGE_CODES,
            },
          },
        });

        // Create new detailed sections
        for (let i = 0; i < detailedSections.length; i++) {
          const section = detailedSections[i];

          // Upload section image if provided
          let sectionImageUrl: string | null = null;
          const sectionImageFile = formData.get(`sectionImage_${i}`) as File;

          if (sectionImageFile && sectionImageFile.size > 0) {
            try {
              const { uploadToS3 } = await import('@/lib/s3');
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

          const sectionContent = {
            title: section.title,
            description: section.description,
          };

          const sectionTranslations = await translateContent(
            sectionContent,
            LANGUAGE_CODES
          );

          await Promise.allSettled(
            languages.map((lang) => {
              const blog = existingBlogs.find((b) => b.languageId === lang.id);
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
        console.error('Error updating detailed sections:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      blogs: updatedBlogs,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog (all language versions)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Verify authentication
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find all blogs with this slug
    const existingBlogs = await prisma.blog.findMany({
      where: { slug: slug },
    });

    if (existingBlogs.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete images from S3
    for (const blog of existingBlogs) {
      if (blog.imageUrl) {
        await deleteFromS3(blog.imageUrl);
      }
    }

    // Delete all language versions (sequentially to avoid connection pool exhaustion)
    for (const blog of existingBlogs) {
      await prisma.blog.delete({
        where: { id: blog.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
