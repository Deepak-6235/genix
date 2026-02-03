// Migration script to add faqId to existing FAQs
import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrateFAQs() {
  console.log('Starting FAQ migration...');

  try {
    // Get all FAQs
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'asc' },
    });

    console.log(`Found ${faqs.length} FAQs to migrate`);

    // Update each FAQ with a unique faqId
    for (const faq of faqs) {
      if (!faq.faqId) {
        const newFaqId = uuidv4();
        await prisma.fAQ.update({
          where: { id: faq.id },
          data: { faqId: newFaqId },
        });
        console.log(`✓ Updated FAQ ${faq.id} with faqId: ${newFaqId}`);
      } else {
        console.log(`⏭️  FAQ ${faq.id} already has faqId: ${faq.faqId}`);
      }
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrateFAQs()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
