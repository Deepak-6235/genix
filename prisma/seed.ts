import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Create adapter
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
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
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
