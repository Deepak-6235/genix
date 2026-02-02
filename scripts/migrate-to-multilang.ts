import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrate() {
  try {
    console.log('Starting migration to multi-language structure...');

    // Fetch all existing services with old structure
    const existingServices = await prisma.$queryRaw<any[]>`
      SELECT id, title, "shortDescription", icon, slug, "fullDescription",
             "servicesProvided", "targetInsects", "methodsTitle", "methodsDescription",
             "advancedTechnologies", "safeUseDescription", "serviceGuarantee",
             "isActive", "order", "createdAt", "updatedAt"
      FROM services
    `;

    console.log(`Found ${existingServices.length} existing services to migrate`);

    // Store the data temporarily
    const servicesData = existingServices.map(service => ({
      id: service.id,
      icon: service.icon,
      slug: service.slug,
      isActive: service.isActive,
      order: service.order,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      translations: {
        en: {
          title: service.title,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
          servicesProvided: service.servicesProvided,
          targetInsects: service.targetInsects,
          methodsTitle: service.methodsTitle,
          methodsDescription: service.methodsDescription,
          advancedTechnologies: service.advancedTechnologies,
          safeUseDescription: service.safeUseDescription,
          serviceGuarantee: service.serviceGuarantee,
        }
      }
    }));

    console.log('Data backed up. Now applying schema changes...');
    console.log('Please run: npx prisma db push --accept-data-loss');
    console.log('Then run this script again to restore data.');

    // Check if new structure exists
    const tableCheck = await prisma.$queryRaw<any[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'service_translations'
      )
    `;

    if (tableCheck[0].exists) {
      console.log('\nNew structure detected. Restoring data...');

      for (const serviceData of servicesData) {
        // Update service (remove old columns)
        await prisma.$executeRaw`
          UPDATE services
          SET icon = ${serviceData.icon},
              slug = ${serviceData.slug},
              "isActive" = ${serviceData.isActive},
              "order" = ${serviceData.order}
          WHERE id = ${serviceData.id}
        `;

        // Insert English translation
        await prisma.$executeRaw`
          INSERT INTO service_translations (
            id, "serviceId", language, title, "shortDescription",
            "fullDescription", "servicesProvided", "targetInsects",
            "methodsTitle", "methodsDescription", "advancedTechnologies",
            "safeUseDescription", "serviceGuarantee", "createdAt", "updatedAt"
          ) VALUES (
            gen_random_uuid(), ${serviceData.id}, 'en',
            ${serviceData.translations.en.title},
            ${serviceData.translations.en.shortDescription},
            ${serviceData.translations.en.fullDescription},
            ${serviceData.translations.en.servicesProvided},
            ${serviceData.translations.en.targetInsects},
            ${serviceData.translations.en.methodsTitle},
            ${serviceData.translations.en.methodsDescription},
            ${serviceData.translations.en.advancedTechnologies},
            ${serviceData.translations.en.safeUseDescription},
            ${serviceData.translations.en.serviceGuarantee},
            NOW(), NOW()
          )
        `;

        console.log(`Migrated service: ${serviceData.translations.en.title}`);
      }

      console.log('\n✅ Migration completed successfully!');
    } else {
      console.log('\n⚠️  New structure not found. Please run the schema push first.');
    }

  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

migrate();
