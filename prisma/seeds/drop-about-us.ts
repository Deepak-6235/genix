// Drop existing About Us table
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

async function dropAboutUs() {
  console.log('🔄 Dropping About Us entries...');

  try {
    await prisma.aboutUs.deleteMany();
    console.log('✅ About Us entries deleted successfully!');
  } catch (error) {
    console.error('❌ Error dropping About Us:', error);
    throw error;
  }
}

dropAboutUs()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
