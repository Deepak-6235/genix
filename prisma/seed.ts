// Load environment variables FIRST before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create pool and adapter for Prisma 7
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// Create a new Prisma client for seeding
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed languages
  const languages = [
    {
      code: 'en',
      name: 'English',
      dir: 'ltr',
    },
    {
      code: 'ar',
      name: 'Arabic',
      dir: 'rtl',
    },
    {
      code: 'pt',
      name: 'Portuguese',
      dir: 'ltr',
    },
    {
      code: 'zh',
      name: 'Chinese',
      dir: 'ltr',
    },
    {
      code: 'ja',
      name: 'Japanese',
      dir: 'ltr',
    },
    {
      code: 'de',
      name: 'German',
      dir: 'ltr',
    },
    {
      code: 'fr',
      name: 'French',
      dir: 'ltr',
    },
  ];

  console.log('📝 Seeding languages...');
  for (const lang of languages) {
    const existingLang = await prisma.language.findUnique({
      where: { code: lang.code },
    });

    if (!existingLang) {
      await prisma.language.create({
        data: lang,
      });
      console.log(`✅ Created language: ${lang.name}`);
    } else {
      console.log(`⏭️  Language already exists: ${lang.name}`);
    }
  }

  // Create default admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('Admin@123!', 12);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@genix.com' },
    update: {},
    create: {
      email: 'admin@genix.com',
      password: hashedPassword,
      name: 'Super Admin',
      isActive: true,
    },
  });

  console.log('✅ Created admin user:', { id: admin.id, email: admin.email });
  console.log('📧 Email: admin@genix.com');
  console.log('🔑 Password: Admin@123!');

  // Import and run seedServices dynamically to ensure env vars are loaded
  console.log('📦 Importing seed-services...');
  const { seedServices } = await import('./seed-services');
  await seedServices(prisma);

  // Import and run seedReviews
  console.log('📦 Importing seed-reviews...');
  const { seedReviews } = await import('./seed-reviews');
  await seedReviews(prisma);

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
