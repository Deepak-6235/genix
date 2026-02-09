@echo off
echo Starting batch image compression...
echo.

node scripts\compress-single-image.js about-us-hero.jpg
node scripts\compress-single-image.js about-us.jpg
node scripts\compress-single-image.js choose-us.jpg
node scripts\compress-single-image.js contact-us.jpg
node scripts\compress-single-image.js faq.jpg
node scripts\compress-single-image.js hero-bg1.jpg
node scripts\compress-single-image.js services.jpg

echo.
echo ========================================
echo All images compressed!
echo Compressed files are in public/images/ with 'compressed_' prefix
echo Review the results and replace the originals if satisfied
echo ========================================
