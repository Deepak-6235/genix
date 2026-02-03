// Load environment variables FIRST before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Sample comment data for different blogs
const commentTemplates = [
  {
    name: 'Ahmed Al-Maliki',
    email: 'ahmed.maliki@example.com',
    website: 'https://example.com',
    comment: 'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    website: null,
    comment: 'Great content! I appreciate the detailed explanation and practical examples provided in this post.',
  },
  {
    name: 'Mohammed Hassan',
    email: 'm.hassan@example.com',
    website: 'https://mhblog.com',
    comment: 'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!',
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    website: null,
    comment: 'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.',
  },
  {
    name: 'Omar Abdullah',
    email: 'omar.a@example.com',
    website: 'https://omartech.com',
    comment: 'Thank you for this comprehensive guide. It answered all my questions and provided great insights.',
  },
  {
    name: 'Lisa Martinez',
    email: 'lisa.m@example.com',
    website: null,
    comment: 'Well written and easy to understand. The examples really help clarify the concepts discussed.',
  },
  {
    name: 'Khalid Ibrahim',
    email: 'khalid.ib@example.com',
    website: null,
    comment: 'This is a must-read for anyone interested in this topic. Very helpful and informative!',
  },
  {
    name: 'Anna Kowalski',
    email: 'anna.k@example.com',
    website: 'https://annasblog.com',
    comment: 'I found this article very useful. The information is well-organized and presented clearly.',
  },
];

export async function seedComments(prisma: PrismaClient) {
  try {
    console.log('Starting comment seeding...');

    // Get all languages
    const languages = await prisma.language.findMany();
    if (languages.length === 0) {
      throw new Error('No languages found. Please seed languages first.');
    }

    // Get all unique blog slugs
    const blogs = await prisma.blog.findMany({
      distinct: ['slug'],
      select: {
        slug: true,
      },
    });

    if (blogs.length === 0) {
      console.log('No blogs found. Skipping comment seeding.');
      return;
    }

    console.log(`Found ${blogs.length} unique blog(s)`);

    // For each blog, create 3-5 comments
    for (const blog of blogs) {
      const numComments = Math.floor(Math.random() * 3) + 3; // 3-5 comments
      console.log(`Creating ${numComments} comments for blog: ${blog.slug}`);

      // Randomly select comments from templates
      const selectedComments = commentTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, numComments);

      for (const template of selectedComments) {
        const commentId = uuidv4();
        const isApproved = Math.random() > 0.3; // 70% approved, 30% pending

        // Get English language
        const englishLang = languages.find((l) => l.code === 'en');
        if (!englishLang) continue;

        // Translations for the comment text in all languages
        const translations: Record<string, string> = {
          en: template.comment,
          ar: await translateToArabic(template.comment),
          pt: await translateToPortuguese(template.comment),
          zh: await translateToChinese(template.comment),
          ja: await translateToJapanese(template.comment),
          de: await translateToGerman(template.comment),
          fr: await translateToFrench(template.comment),
        };

        // Create comment in all languages
        for (const lang of languages) {
          await prisma.comment.create({
            data: {
              commentId,
              blogSlug: blog.slug,
              languageId: lang.id,
              name: template.name,
              email: template.email,
              website: template.website,
              comment: translations[lang.code] || template.comment,
              isApproved,
            },
          });
        }

        console.log(`  ✓ Created comment by ${template.name} (${isApproved ? 'approved' : 'pending'})`);
      }
    }

    console.log('✅ Comment seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding comments:', error);
    throw error;
  }
}

// Simple translation functions (in production, these would use actual translation API)
async function translateToArabic(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      'مقال مفيد جداً! ساعدني حقاً على فهم الموضوع بشكل أفضل. شكراً لمشاركة هذه المعلومات القيمة.',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      'محتوى رائع! أقدر التفسير المفصل والأمثلة العملية المقدمة في هذا المنشور.',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      'هذا بالضبط ما كنت أبحث عنه. النهج خطوة بخطوة يجعل من السهل المتابعة. استمر في العمل الجيد!',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      'مقال ممتاز مع شروحات واضحة. تعلمت الكثير من قراءة هذا. أتطلع إلى المزيد من المنشورات مثل هذا.',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      'شكراً لك على هذا الدليل الشامل. أجاب على جميع أسئلتي وقدم رؤى رائعة.',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      'مكتوب بشكل جيد وسهل الفهم. تساعد الأمثلة حقاً في توضيح المفاهيم المناقشة.',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      'هذا يجب قراءته لأي شخص مهتم بهذا الموضوع. مفيد جداً وغني بالمعلومات!',
    'I found this article very useful. The information is well-organized and presented clearly.':
      'وجدت هذا المقال مفيداً جداً. المعلومات منظمة بشكل جيد ومقدمة بوضوح.',
  };
  return translations[text] || text;
}

async function translateToPortuguese(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      'Artigo muito informativo! Isso realmente me ajudou a entender melhor o tópico. Obrigado por compartilhar essas informações valiosas.',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      'Ótimo conteúdo! Aprecio a explicação detalhada e os exemplos práticos fornecidos nesta postagem.',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      'Isso é exatamente o que eu estava procurando. A abordagem passo a passo facilita o acompanhamento. Continue com o bom trabalho!',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      'Artigo excelente com explicações claras. Aprendi muito ao ler isso. Ansioso por mais postagens como esta.',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      'Obrigado por este guia abrangente. Respondeu todas as minhas perguntas e forneceu ótimas percepções.',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      'Bem escrito e fácil de entender. Os exemplos realmente ajudam a esclarecer os conceitos discutidos.',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      'Esta é uma leitura obrigatória para quem se interessa por este tópico. Muito útil e informativo!',
    'I found this article very useful. The information is well-organized and presented clearly.':
      'Achei este artigo muito útil. As informações estão bem organizadas e apresentadas claramente.',
  };
  return translations[text] || text;
}

async function translateToChinese(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      '非常有信息量的文章！这真的帮助我更好地理解了这个主题。感谢分享这些宝贵的信息。',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      '很棒的内容！我很欣赏这篇文章中提供的详细解释和实际例子。',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      '这正是我在寻找的。循序渐进的方法使其易于理解。继续努力！',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      '优秀的文章，解释清晰。我从阅读中学到了很多。期待更多这样的帖子。',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      '感谢这份全面的指南。它回答了我所有的问题并提供了很好的见解。',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      '写得很好，易于理解。这些例子真的有助于澄清所讨论的概念。',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      '对于对这个话题感兴趣的任何人来说，这是必读的。非常有帮助和信息丰富！',
    'I found this article very useful. The information is well-organized and presented clearly.':
      '我发现这篇文章非常有用。信息组织良好，呈现清晰。',
  };
  return translations[text] || text;
}

async function translateToJapanese(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      'とても有益な記事です！このトピックをより良く理解するのに本当に役立ちました。この貴重な情報を共有していただきありがとうございます。',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      '素晴らしいコンテンツです！この投稿で提供された詳細な説明と実用的な例を高く評価します。',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      'これはまさに私が探していたものです。段階的なアプローチにより、理解しやすくなっています。良い仕事を続けてください！',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      '明確な説明を含む優れた記事です。これを読んで多くを学びました。このような投稿をもっと楽しみにしています。',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      'この包括的なガイドをありがとうございます。私のすべての質問に答え、素晴らしい洞察を提供してくれました。',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      'よく書かれていて理解しやすいです。例は議論された概念を明確にするのに本当に役立ちます。',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      'このトピックに興味のある人にとって必読です。非常に役立ち、有益です！',
    'I found this article very useful. The information is well-organized and presented clearly.':
      'この記事は非常に有用だと思いました。情報はよく整理され、明確に提示されています。',
  };
  return translations[text] || text;
}

async function translateToGerman(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      'Sehr informativer Artikel! Das hat mir wirklich geholfen, das Thema besser zu verstehen. Vielen Dank für das Teilen dieser wertvollen Informationen.',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      'Toller Inhalt! Ich schätze die detaillierte Erklärung und die praktischen Beispiele in diesem Beitrag.',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      'Das ist genau das, wonach ich gesucht habe. Der schrittweise Ansatz macht es einfach zu folgen. Weiter so!',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      'Ausgezeichneter Artikel mit klaren Erklärungen. Ich habe viel beim Lesen gelernt. Freue mich auf mehr solcher Beiträge.',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      'Vielen Dank für diesen umfassenden Leitfaden. Er hat alle meine Fragen beantwortet und großartige Einblicke geboten.',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      'Gut geschrieben und leicht verständlich. Die Beispiele helfen wirklich, die besprochenen Konzepte zu verdeutlichen.',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      'Dies ist ein Muss für jeden, der sich für dieses Thema interessiert. Sehr hilfreich und informativ!',
    'I found this article very useful. The information is well-organized and presented clearly.':
      'Ich fand diesen Artikel sehr nützlich. Die Informationen sind gut organisiert und klar dargestellt.',
  };
  return translations[text] || text;
}

async function translateToFrench(text: string): Promise<string> {
  const translations: Record<string, string> = {
    'Very informative article! This really helped me understand the topic better. Thank you for sharing this valuable information.':
      'Article très informatif ! Cela m\'a vraiment aidé à mieux comprendre le sujet. Merci de partager ces informations précieuses.',
    'Great content! I appreciate the detailed explanation and practical examples provided in this post.':
      'Excellent contenu ! J\'apprécie l\'explication détaillée et les exemples pratiques fournis dans cet article.',
    'This is exactly what I was looking for. The step-by-step approach makes it easy to follow. Keep up the good work!':
      'C\'est exactement ce que je cherchais. L\'approche étape par étape facilite le suivi. Continuez ce bon travail !',
    'Excellent article with clear explanations. I learned a lot from reading this. Looking forward to more posts like this.':
      'Excellent article avec des explications claires. J\'ai beaucoup appris en lisant ceci. J\'attends avec impatience plus d\'articles comme celui-ci.',
    'Thank you for this comprehensive guide. It answered all my questions and provided great insights.':
      'Merci pour ce guide complet. Il a répondu à toutes mes questions et fourni d\'excellentes perspectives.',
    'Well written and easy to understand. The examples really help clarify the concepts discussed.':
      'Bien écrit et facile à comprendre. Les exemples aident vraiment à clarifier les concepts discutés.',
    'This is a must-read for anyone interested in this topic. Very helpful and informative!':
      'C\'est une lecture incontournable pour toute personne intéressée par ce sujet. Très utile et informatif !',
    'I found this article very useful. The information is well-organized and presented clearly.':
      'J\'ai trouvé cet article très utile. Les informations sont bien organisées et présentées clairement.',
  };
  return translations[text] || text;
}

// Run if executed directly
if (require.main === module) {
  // Create pool and adapter for Prisma 7
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);

  // Create a new Prisma client for seeding
  const prisma = new PrismaClient({
    adapter,
  });

  seedComments(prisma)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
}
