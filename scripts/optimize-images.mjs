import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const IMAGES_DIR = join(import.meta.dirname, '..', 'images');

// Quality settings
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 80;

// Image categories and their target widths
const heroImages = [
  'abc-bouw-bus-storten',
  'abc-bouw-bus-trailer',
  'abc-bouw-team-werk',
  'sloopwerk-grote-ruimte',
  'uitbouw-baksteen-ramen',
];

const contentImages = [
  'uitbouw-wit-patio',
];

const comparisonImages = [
  'straatwerk-tuinpad-detail',
  'straatwerk-tuinpad-af',
  'sloopwerk-keuken-vloer',
  'verbouw-keuken-af',
  'grondwerk-tuin-voor',
  'grondwerk-tuin-grond',
  'sloopwerk-keuken-baksteen',
  'keuken-voor-renovatie',
  'sloopwerk-badkamer-muren',
  'badkamer-douche-tegels',
  'sloopwerk-toilet-gestript',
  'toilet-voor-renovatie',
];

const portraitImages = [
  'lars',
];

const logoImages = [
  'abcbouwlogo',
];

// Find the source file (could be .jpeg or .png)
async function findSource(baseName) {
  const exts = ['.jpeg', '.jpg', '.png'];
  for (const ext of exts) {
    const filePath = join(IMAGES_DIR, baseName + ext);
    try {
      await stat(filePath);
      return { path: filePath, ext };
    } catch {}
  }
  throw new Error(`Source not found for: ${baseName}`);
}

async function generateVariants(baseName, widths) {
  const { path: srcPath, ext } = await findSource(baseName);
  const image = sharp(srcPath);
  const metadata = await image.metadata();

  console.log(`\n📷 ${baseName}${ext} (${metadata.width}x${metadata.height})`);

  for (const w of widths) {
    // Skip if target width is larger than source
    if (w > metadata.width) {
      console.log(`  ⏭ ${w}w skipped (source is ${metadata.width}px wide)`);
      continue;
    }

    const webpOut = join(IMAGES_DIR, `${baseName}-${w}w.webp`);
    const jpegOut = join(IMAGES_DIR, `${baseName}-${w}w.jpeg`);

    // WebP variant
    await sharp(srcPath)
      .resize(w)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOut);

    // JPEG variant (fallback)
    if (ext === '.png') {
      // For PNG sources, generate JPEG fallback too
      await sharp(srcPath)
        .resize(w)
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(jpegOut);
    } else {
      await sharp(srcPath)
        .resize(w)
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(jpegOut);
    }

    const webpStat = await stat(webpOut);
    const jpegStat = await stat(jpegOut);
    console.log(`  ✅ ${w}w → WebP: ${(webpStat.size / 1024).toFixed(0)} KB, JPEG: ${(jpegStat.size / 1024).toFixed(0)} KB`);
  }
}

async function generateLogoVariant(baseName, width) {
  const { path: srcPath, ext } = await findSource(baseName);
  console.log(`\n📷 ${baseName}${ext} (logo)`);

  const webpOut = join(IMAGES_DIR, `${baseName}-${width}w.webp`);

  await sharp(srcPath)
    .resize(width)
    .webp({ quality: WEBP_QUALITY })
    .toFile(webpOut);

  const webpStat = await stat(webpOut);
  console.log(`  ✅ ${width}w → WebP: ${(webpStat.size / 1024).toFixed(0)} KB`);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  // Hero/banner images: 480, 768, 1200, 1920
  console.log('=== HERO/BANNER IMAGES ===');
  for (const name of heroImages) {
    await generateVariants(name, [480, 768, 1200, 1920]);
  }

  // Content images: 480, 768, 1200
  console.log('\n=== CONTENT IMAGES ===');
  for (const name of contentImages) {
    await generateVariants(name, [480, 768, 1200]);
  }

  // Comparison slider images: 480, 768
  console.log('\n=== COMPARISON SLIDER IMAGES ===');
  for (const name of comparisonImages) {
    await generateVariants(name, [480, 768]);
  }

  // Portrait images: 480, 768
  console.log('\n=== PORTRAIT IMAGES ===');
  for (const name of portraitImages) {
    await generateVariants(name, [480, 768]);
  }

  // Logo: single 280w WebP
  console.log('\n=== LOGO ===');
  await generateLogoVariant('abcbouwlogo', 280);

  console.log('\n\n✅ All images optimized!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
