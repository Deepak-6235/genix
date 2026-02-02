import { config } from 'dotenv';
import bcrypt from 'bcrypt';

// Load environment variables
config({ path: '.env.local' });

// Use the prisma instance from lib
import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed languages
  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      dir: 'ltr',
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      dir: 'rtl',
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      dir: 'ltr',
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      dir: 'ltr',
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      dir: 'ltr',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      dir: 'ltr',
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
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
