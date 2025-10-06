import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logoPath = join(__dirname, 'src/assets/images/logo-transparent.png');
const publicDir = join(__dirname, 'public');

async function generateFavicons() {
  try {
    console.log('🎨 Generating favicons from logo...');

    // Favicon 16x16
    await sharp(logoPath)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Created favicon-16x16.png');

    // Favicon 32x32
    await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Created favicon-32x32.png');

    // Apple Touch Icon 180x180
    await sharp(logoPath)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png');

    // Favicon ICO (using 32x32)
    await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFormat('png')
      .toFile(join(publicDir, 'favicon.ico'));
    console.log('✅ Created favicon.ico');

    console.log('🎉 All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons();
