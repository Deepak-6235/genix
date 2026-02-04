// Migrate About Us to multi-language structure
import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const LANGUAGE_CODES = ['en', 'ar', 'pt', 'zh', 'ja', 'de', 'fr'];

// Default addresses for each language
const defaultAddresses: Record<string, string> = {
  en: 'Riyadh, Saudi Arabia',
  ar: 'الرياض، المملكة العربية السعودية',
  pt: 'Riade, Arábia Saudita',
  zh: '沙特阿拉伯利雅得',
  ja: 'サウジアラビア、リヤド',
  de: 'Riad, Saudi-Arabien',
  fr: 'Riyad, Arabie Saoudite',
};

async function migrateAboutUs() {
  console.log('🔄 Migrating About Us to multi-language structure...\n');

  try {
    // Get all languages
    const languages = await prisma.language.findMany();
    console.log(`✓ Found ${languages.length} languages`);

    // Delete existing About Us entries (if any)
    await prisma.aboutUs.deleteMany();
    console.log('✓ Cleared existing About Us entries');

    // Create About Us entry for each language
    for (const lang of languages) {
      const aboutUs = await prisma.aboutUs.create({
        data: {
          slug: 'about-us',
          languageId: lang.id,
          email: 'info@genix.sa',
          phoneNumber1: '+966 XX XXX XXXX',
          phoneNumber2: '+966 XX XXX XXXX',
          workingHours: '24/7',
          address: defaultAddresses[lang.code] || defaultAddresses.en,
        },
      });
      console.log(`✓ Created About Us for ${lang.name}: ${aboutUs.address}`);
    }

    console.log('\n✅ About Us migration completed successfully!');
  } catch (error) {
    console.error('❌ Error migrating About Us:', error);
    throw error;
  }
}

migrateAboutUs()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
