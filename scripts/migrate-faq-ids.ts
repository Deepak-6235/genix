/**
 * Migration script to populate faqId for existing FAQs
 * Run this script once to update existing FAQs in the database
 *
 * Usage: npx tsx scripts/migrate-faq-ids.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrateFaqIds() {
  console.log('🔄 Starting FAQ ID migration...\n');

  try {
    // Get all FAQs grouped by order
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    });

    if (faqs.length === 0) {
      console.log('ℹ️  No FAQs found in database.');
      return;
    }

    console.log(`📊 Found ${faqs.length} FAQs in database\n`);

    // Group FAQs by order number (assuming same order = same FAQ across languages)
    const faqsByOrder = new Map<number, typeof faqs>();
    for (const faq of faqs) {
      const existing = faqsByOrder.get(faq.order) || [];
      existing.push(faq);
      faqsByOrder.set(faq.order, existing);
    }

    console.log(`📋 Found ${faqsByOrder.size} unique FAQ groups\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each FAQ group
    for (const [order, faqGroup] of faqsByOrder) {
      // Check if any FAQ in this group already has a faqId
      const hasExistingId = faqGroup.some(faq => faq.faqId);

      if (hasExistingId) {
        console.log(`⏭️  Order ${order}: Already has faqId, skipping...`);
        skippedCount += faqGroup.length;
        continue;
      }

      // Generate new faqId for this group
      const faqId = randomUUID();

      // Update all FAQs in this group with the same faqId
      await prisma.fAQ.updateMany({
        where: { order },
        data: { faqId },
      });

      console.log(`✅ Order ${order}: Updated ${faqGroup.length} FAQs with faqId: ${faqId}`);
      updatedCount += faqGroup.length;
    }

    console.log('\n✨ Migration completed!');
    console.log(`📊 Updated: ${updatedCount} FAQs`);
    console.log(`⏭️  Skipped: ${skippedCount} FAQs (already had faqId)`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

migrateFaqIds()
  .then(() => {
    console.log('\n✅ Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });
