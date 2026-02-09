
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking database...');

    const jaLang = await prisma.language.findUnique({
        where: { code: 'ja' }
    });

    if (!jaLang) {
        console.log('Japanese language not found!');
        return;
    }

    console.log('Japanese Language ID:', jaLang.id);

    const service = await prisma.service.findFirst({
        where: {
            slug: 'pest-control',
            languageId: jaLang.id
        }
    });

    if (!service) {
        console.log('Service not found for ja!');
    } else {
        console.log('Service found:');
        console.log('Name:', service.name);
        console.log('Description:', service.shortDescription);
    }

    const enLang = await prisma.language.findUnique({ where: { code: 'en' } });
    if (enLang) {
        const enService = await prisma.service.findFirst({
            where: {
                slug: 'pest-control',
                languageId: enLang.id
            }
        });
        if (enService) {
            console.log('English Service found (for comparison):');
            console.log('Name:', enService.name);
            console.log('Description:', enService.shortDescription);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
