const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, 'src/public/logos');
const outputDir = path.join(__dirname, 'src/public/logos/webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Logo files only (already-small PNGs — convert for format consistency & lossless compression)
const logoFiles = [
  'vortexx-logo-horizontal-blue-violet.png',
  'vortexx-logo-horizontal-icon-left-compact.png',
  'vortexx-logo-horizontal-icon-left.png',
  'vortexx-logo-icon-blue-violet.png',
  'vortexx-logo-stacked.png',
];

async function convert() {
  for (const file of logoFiles) {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace('.png', '.webp');
    const outputPath = path.join(outputDir, outputName);

    const beforeStats = fs.statSync(inputPath);
    const beforeKB = Math.round(beforeStats.size / 1024);

    await sharp(inputPath)
      .webp({ quality: 90, lossless: false, nearLossless: true })
      .toFile(outputPath);

    const afterStats = fs.statSync(outputPath);
    const afterKB = Math.round(afterStats.size / 1024);
    const saving = Math.round((1 - afterStats.size / beforeStats.size) * 100);

    console.log('OK: ' + file);
    console.log('   ' + beforeKB + ' KB  ->  ' + afterKB + ' KB  (' + (saving > 0 ? saving + '% smaller' : 'similar size') + ')');
  }
  console.log('\nDone! Logo WebP files saved to src/public/logos/webp/');
}

convert().catch(function(err) {
  console.error('Error:', err.message);
  process.exit(1);
});
