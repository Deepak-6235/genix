const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Get image path from command line argument
const imageName = process.argv[2];

if (!imageName) {
    console.error('Usage: node compress-single-image.js <image-filename>');
    process.exit(1);
}

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const inputPath = path.join(imagesDir, imageName);
const outputPath = path.join(imagesDir, `compressed_${imageName}`);

async function compressImage() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error(`Error: ${imageName} not found in public/images/`);
            process.exit(1);
        }

        const originalStats = fs.statSync(inputPath);
        const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

        console.log(`Compressing ${imageName}...`);
        console.log(`Original size: ${originalSizeMB}MB`);

        await sharp(inputPath)
            .jpeg({
                quality: 82,
                progressive: true,
            })
            .toFile(outputPath);

        const compressedStats = fs.statSync(outputPath);
        const compressedSizeMB = (compressedStats.size / (1024 * 1024)).toFixed(2);
        const reduction = (((originalStats.size - compressedStats.size) / originalStats.size) * 100).toFixed(1);

        console.log(`Compressed size: ${compressedSizeMB}MB`);
        console.log(`Reduction: ${reduction}%`);
        console.log(`\nCompressed file saved as: compressed_${imageName}`);
        console.log('To replace the original, rename or delete the old file and rename this one.');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

compressImage();
