const sharp = require('sharp');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const backupDir = path.join(__dirname, '..', 'public', 'images', 'originals');

// Images to compress (large files that need optimization)
const imagesToCompress = [
    'about-us-hero.jpg',
    'about-us.jpg',
    'choose-us.jpg',
    'contact-us.jpg',
    'services.jpg',
    'faq.jpg',
    'hero-bg1.jpg',
    'service-3.jpg',
    'service-5.jpg',
    'service-6.jpg',
];

async function compressImage(filename) {
    const inputPath = path.join(imagesDir, filename);
    const backupPath = path.join(backupDir, filename);
    const tempPath = path.join(imagesDir, `temp_${filename}`);

    try {
        // Check if file exists
        if (!fsSync.existsSync(inputPath)) {
            console.log(`⚠️  Skipping ${filename} - file not found`);
            return;
        }

        // Get original file size
        const originalStats = await fs.stat(inputPath);
        const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

        // Backup original if not already backed up
        if (!fsSync.existsSync(backupPath)) {
            await fs.copyFile(inputPath, backupPath);
            console.log(`📦 Backed up ${filename}`);
        }

        // Compress image with sharp
        await sharp(inputPath)
            .jpeg({
                quality: 82,
                progressive: true,
            })
            .toFile(tempPath);

        // Get compressed file size
        const compressedStats = await fs.stat(tempPath);
        const compressedSizeMB = (compressedStats.size / (1024 * 1024)).toFixed(2);
        const reduction = (((originalStats.size - compressedStats.size) / originalStats.size) * 100).toFixed(1);

        // Replace original with compressed version
        await fs.unlink(inputPath);
        await fs.rename(tempPath, inputPath);

        console.log(`✅ ${filename}: ${originalSizeMB}MB → ${compressedSizeMB}MB (${reduction}% reduction)`);
    } catch (error) {
        console.error(`❌ Error compressing ${filename}:`, error.message);
        // Clean up temp file if it exists
        if (fsSync.existsSync(tempPath)) {
            await fs.unlink(tempPath).catch(() => { });
        }
    }
}

async function compressAllImages() {
    console.log('🖼️  Starting image compression...\n');

    // Create backup directory if it doesn't exist
    if (!fsSync.existsSync(backupDir)) {
        await fs.mkdir(backupDir, { recursive: true });
    }

    console.log(`📁 Images directory: ${imagesDir}`);
    console.log(`📁 Backup directory: ${backupDir}\n`);

    for (const filename of imagesToCompress) {
        await compressImage(filename);
    }

    console.log('\n✨ Image compression complete!');
    console.log('💡 Original images are backed up in public/images/originals/');
}

compressAllImages().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
