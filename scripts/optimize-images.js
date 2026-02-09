const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const backupDir = path.join(imagesDir, 'originals');

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const imagesToOptimize = [
    'choose-us.webp',
    'contact-us.webp',
    'services.webp',
    'blog.jpg',
    'about-us-hero.webp',
    'about-us.webp',
    'faq.webp',
    'service-2.jpg',
    'service-5.webp',
    'service-6.webp',
    'service-3.webp'
];

async function optimizeImages() {
    for (const imageName of imagesToOptimize) {
        const inputPath = path.join(imagesDir, imageName);
        const backupPath = path.join(backupDir, imageName);

        if (!fs.existsSync(inputPath)) {
            console.log(`Skipping ${imageName}: file not found.`);
            continue;
        }

        // Backup original
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
            console.log(`Backed up ${imageName} to originals/`);
        }

        const ext = path.extname(imageName).toLowerCase();
        let outputPath = inputPath;

        // If it's a jpg, we might want to convert it to webp or just compress
        // For consistency and best performance, let's keep the name but compress

        try {
            const result = sharp(backupPath);

            if (ext === '.webp' || imageName === 'blog.jpg') {
                // If it's blog.jpg, let's just keep the name but compress it hard or convert
                // Actually, let's keep extensions to avoid breaking code links
                if (ext === '.webp') {
                    await result.webp({ quality: 75 }).toFile(inputPath + '.tmp');
                } else {
                    await result.jpeg({ quality: 75, progressive: true }).toFile(inputPath + '.tmp');
                }
            } else {
                await result.toFile(inputPath + '.tmp');
            }

            const oldSize = fs.statSync(backupPath).size;
            const newSize = fs.statSync(inputPath + '.tmp').size;

            fs.renameSync(inputPath + '.tmp', inputPath);

            console.log(`Optimized ${imageName}:`);
            console.log(`  Original: ${(oldSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  New:      ${(newSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  Reduction: ${((1 - newSize / oldSize) * 100).toFixed(1)}%`);
        } catch (err) {
            console.error(`Error optimizing ${imageName}:`, err);
        }
    }
}

optimizeImages();
