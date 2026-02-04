// Reset and seed statistics with hardcoded labels
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

const statisticsData = [
  {
    key: 'satisfied_customers',
    value: 1000,
    suffix: '+',
    color: 'blue',
    order: 0,
  },
  {
    key: 'work_team',
    value: 50,
    suffix: '+',
    color: 'green',
    order: 1,
  },
  {
    key: 'houses',
    value: 1000,
    suffix: '+',
    color: 'purple',
    order: 2,
  },
  {
    key: 'years_experience',
    value: 12,
    suffix: '+',
    color: 'cyan',
    order: 3,
  },
];

async function resetStatistics() {
  console.log('🔄 Resetting statistics...');

  try {
    // Delete all existing statistics
    await prisma.statistic.deleteMany();
    console.log('✓ Cleared existing statistics');

    // Create new statistics
    for (const stat of statisticsData) {
      await prisma.statistic.create({
        data: stat,
      });
      console.log(`✓ Created: ${stat.key} = ${stat.value}${stat.suffix}`);
    }

    console.log('\n✅ Statistics reset completed successfully!');
  } catch (error) {
    console.error('❌ Error resetting statistics:', error);
    throw error;
  }
}

resetStatistics()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
