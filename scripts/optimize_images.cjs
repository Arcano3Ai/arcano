const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeJpg(filePath, maxDimension = 1000) {
  try {
    const inputBuf = fs.readFileSync(filePath);
    const origSize = inputBuf.length;
    // Don't re-optimize if already small
    if (origSize < 110 * 1024) return;

    let pipeline = sharp(inputBuf);
    const meta = await pipeline.metadata();

    if (meta.width && meta.width > maxDimension) {
      pipeline = pipeline.resize({ width: maxDimension, withoutEnlargement: true });
    }

    const buf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    if (buf.length < origSize) {
      fs.writeFileSync(filePath, buf);
      const saved = ((1 - buf.length / origSize) * 100).toFixed(1);
      console.log(`[JPG] ${path.basename(filePath)}: ${(origSize/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB (-${saved}%)`);
    }
  } catch (err) {
    console.warn(`Error optimizing ${path.basename(filePath)}:`, err.message);
  }
}

async function run() {
  console.log('--- OPTIMIZING PULSERAS JPGs ---');
  const pulserasDir = path.join('public', 'images', 'shop', 'pulseras');
  if (fs.existsSync(pulserasDir)) {
    const files = fs.readdirSync(pulserasDir);
    for (const f of files) {
      if (f.endsWith('.jpg') || f.endsWith('.jpeg')) {
        await optimizeJpg(path.join(pulserasDir, f), 1000);
      }
    }
  }

  console.log('\n--- OPTIMIZING SHOP EDITORIAL & HERO ---');
  const shopDir = path.join('public', 'images', 'shop');
  const shopFiles = [
    'reference_user_vein_part2.jpg',
    'lifestyle_wrist_jade_emperatriz.jpg',
    'lifestyle_wrist_tiger_eye.jpg',
    'aurum_hero_wrist.jpg',
    'crystals_inside_mineral_mine.jpg',
    'volcanic_mine_vein_master.jpg',
    'volcanic_mine_vein_part2.jpg',
    'volcanic_mine_vein_extended_master.jpg',
    'diagonal_mineral_vein.jpg'
  ];
  for (const f of shopFiles) {
    const fp = path.join(shopDir, f);
    if (fs.existsSync(fp)) {
      await optimizeJpg(fp, 1400);
    }
  }

  console.log('\nDONE OPTIMIZING ALL JPGs!');
}

run();
