const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Language Audit ---');
    const languages = await prisma.language.findMany();
    languages.forEach(l => console.log(`ID: ${l.id}, Code: ${l.code}, Name: ${l.name}`));

    console.log('\n--- Service Audit ---');
    const services = await prisma.service.findMany({
        include: { language: true }
    });
    console.log(`Total services found: ${services.length}`);

    const activeCount = services.filter(s => s.isActive).length;
    console.log(`Active services: ${activeCount}`);

    services.forEach(s => {
        console.log(`[${s.language.code}] ID: ${s.id}, Name: ${s.name}, Active: ${s.isActive}, Slug: ${s.slug}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
