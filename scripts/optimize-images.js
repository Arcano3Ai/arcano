const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const images = [
    { file: 'public/images/malachai-perfil.webp', type: 'webp', quality: 82 },
    { file: 'public/og-arcano.jpg', type: 'jpeg', quality: 82 },
    { file: 'public/og-academia.jpg', type: 'jpeg', quality: 82 },
    { file: 'public/images/og-arcano.jpg', type: 'jpeg', quality: 82 },
    { file: 'public/images/og-academia.jpg', type: 'jpeg', quality: 82 },
    { file: 'public/images/santuario-nocturno.jpg', type: 'jpeg', quality: 80 },
    { file: 'public/images/tarotista-estandarte.jpg', type: 'jpeg', quality: 80 },
    { file: 'public/images/tarotista-sol.jpg', type: 'jpeg', quality: 80 },
    { file: 'public/images/malachai-ritual-niebla.jpg', type: 'jpeg', quality: 80 },
    { file: 'public/images/malachai-diablo.jpg', type: 'jpeg', quality: 80 },
  ];

  for (let i = 0; i <= 21; i++) {
    const num = i.toString().padStart(2, '0');
    images.push({ file: `public/images/cards/ar${num}.webp`, type: 'webp', quality: 80 });
  }

  let totalSaved = 0;

  for (const item of images) {
    if (!fs.existsSync(item.file)) continue;
    const originalSize = fs.statSync(item.file).size;
    const inputBuffer = fs.readFileSync(item.file);
    let buffer;
    if (item.type === 'webp') {
      buffer = await sharp(inputBuffer).webp({ quality: item.quality, effort: 6 }).toBuffer();
    } else if (item.type === 'jpeg') {
      buffer = await sharp(inputBuffer).jpeg({ quality: item.quality, mozjpeg: true }).toBuffer();
    }

    if (buffer && buffer.length < originalSize) {
      fs.writeFileSync(item.file, buffer);
      const saved = originalSize - buffer.length;
      totalSaved += saved;
      console.log(`Optimized ${item.file}: ${(originalSize/1024).toFixed(1)}KB -> ${(buffer.length/1024).toFixed(1)}KB (saved ${(saved/1024).toFixed(1)}KB)`);
    } else {
      console.log(`Skipped ${item.file}: already optimal`);
    }
  }

  console.log(`Total saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeImages().catch(err => console.error(err));
