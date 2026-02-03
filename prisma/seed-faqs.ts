import { PrismaClient } from '@prisma/client';
import { translateContent } from '../lib/translate';
import { LanguageCode } from '../lib/languages';
import { randomUUID } from 'crypto';

interface FAQContent {
  question: string;
  answer: string;
}

export async function seedFaqs(prisma: PrismaClient) {
  console.log('🔮 Seeding FAQs...');

  try {
    // Get all active languages
    const languages = await prisma.language.findMany({
      where: { isActive: true },
    });

    if (languages.length === 0) {
      console.log('⚠️  No active languages found. Please seed languages first.');
      return;
    }

    console.log(`📝 Found ${languages.length} active languages`);

    // Sample FAQs - Mix of answered and unanswered
    const faqsData = [
      {
        question: 'What services do you offer?',
        answer: 'We offer comprehensive pest control services including termite treatment, rodent control, bed bug extermination, cockroach removal, and general pest prevention for both residential and commercial properties.',
        hasAnswer: true,
      },
      {
        question: 'How long does a typical pest control treatment take?',
        answer: 'Treatment duration varies depending on the property size and pest type. Most residential treatments take 1-2 hours, while commercial properties may require 3-4 hours. We will provide an estimated timeframe during inspection.',
        hasAnswer: true,
      },
      {
        question: 'Are your pest control products safe for children and pets?',
        answer: 'Yes, we use eco-friendly and certified products that are safe for children and pets when applied correctly. We follow strict safety protocols and provide detailed aftercare instructions to ensure your family\'s safety.',
        hasAnswer: true,
      },
      {
        question: 'Do you provide emergency pest control services?',
        answer: 'Yes, we offer 24/7 emergency pest control services for urgent situations. Contact us anytime and our team will respond promptly to address your pest emergency.',
        hasAnswer: true,
      },
      {
        question: 'What is your service warranty policy?',
        answer: 'We provide a comprehensive warranty on all our services. If pests return within the warranty period, we will re-treat your property at no additional cost. Warranty duration varies by service type.',
        hasAnswer: true,
      },
      {
        question: 'How much does pest control cost in Riyadh?',
        answer: 'Pricing depends on property size, pest type, and treatment method. We offer free inspections and provide detailed quotes before any work begins. Contact us for a customized estimate.',
        hasAnswer: true,
      },
      {
        question: 'Do I need to prepare my home before pest control treatment?',
        answer: null,
        hasAnswer: false,
      },
      {
        question: 'How often should I schedule pest control services?',
        answer: null,
        hasAnswer: false,
      },
      {
        question: 'Can you help with bed bug infestations in apartments?',
        answer: null,
        hasAnswer: false,
      },
    ];

    // Get current max order
    const maxOrderFaq = await prisma.fAQ.findFirst({
      orderBy: { order: 'desc' },
    });
    let currentOrder = (maxOrderFaq?.order ?? -1) + 1;

    // Process each FAQ
    for (const faqData of faqsData) {
      console.log(`\n📋 Processing FAQ: "${faqData.question.substring(0, 50)}..."`);

      // Generate unique faqId
      const faqId = randomUUID();

      // Prepare English content
      const englishContent: FAQContent = {
        question: faqData.question,
        answer: faqData.answer || '',
      };

      // Translate to all languages
      console.log('   🌍 Translating to all languages...');
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja', 'de', 'fr'];
      const translations = await translateContent(englishContent, targetLanguages);

      // Create FAQ for each language
      let createdCount = 0;
      for (const language of languages) {
        const langCode = language.code as LanguageCode;
        const translatedContent = translations[langCode] || englishContent;

        // Check if FAQ already exists (prevent duplicates)
        const existingFaq = await prisma.fAQ.findFirst({
          where: {
            languageId: language.id,
            question: translatedContent.question,
          },
        });

        if (!existingFaq) {
          await prisma.fAQ.create({
            data: {
              faqId,
              languageId: language.id,
              question: translatedContent.question,
              answer: faqData.hasAnswer ? translatedContent.answer : null,
              isActive: true,
              order: currentOrder,
            },
          });
          createdCount++;
        }
      }

      if (createdCount > 0) {
        console.log(`   ✅ Created FAQ in ${createdCount} languages (Order: ${currentOrder})`);
        console.log(`   📊 Status: ${faqData.hasAnswer ? 'Answered' : 'Pending Answer'}`);
        currentOrder++;
      } else {
        console.log(`   ⏭️  FAQ already exists, skipping...`);
      }
    }

    // Summary
    const totalFaqs = await prisma.fAQ.count();
    const answeredFaqs = await prisma.fAQ.count({
      where: { answer: { not: null } },
    });
    const unansweredFaqs = await prisma.fAQ.count({
      where: { answer: null },
    });

    console.log('\n✨ FAQ seeding completed!');
    console.log(`📊 Total FAQs in database: ${totalFaqs}`);
    console.log(`✅ Answered FAQs: ${answeredFaqs}`);
    console.log(`⏳ Pending FAQs: ${unansweredFaqs}`);
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    throw error;
  }
}
