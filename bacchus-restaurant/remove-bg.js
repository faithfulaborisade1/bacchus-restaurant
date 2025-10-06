import sharp from 'sharp';

sharp('src/assets/images/logo.jpg')
  .removeAlpha()
  .flatten({ background: { r: 255, g: 255, b: 255 } })
  .threshold(240)
  .negate()
  .threshold(1)
  .negate()
  .png()
  .toFile('src/assets/images/logo.png')
  .then(() => console.log('Logo background removed! Saved as logo.png'))
  .catch(err => console.error('Error:', err));
