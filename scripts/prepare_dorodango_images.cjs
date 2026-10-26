const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.resolve('public/images/shop/dorodangos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToProcess = [
  {
    src: 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5/dorodango_master_sphere_1793023068800.jpg',
    dest: path.join(targetDir, 'dorodango-oro-kintsugi.jpg')
  },
  {
    src: 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5/dorodango_obsidiana_1793023097701.jpg',
    dest: path.join(targetDir, 'dorodango-obsidiana.jpg')
  },
  {
    src: 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5/dorodango_lapis_1793023128528.jpg',
    dest: path.join(targetDir, 'dorodango-lapis.jpg')
  },
  {
    src: 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5/dorodango_jade_1793023168914.jpg',
    dest: path.join(targetDir, 'dorodango-jade.jpg')
  }
];

async function run() {
  console.log('Optimizing Dorodango images...');
  for (const item of imagesToProcess) {
    if (!fs.existsSync(item.src)) {
      console.error(`Source not found: ${item.src}`);
      continue;
    }
    const buffer = fs.readFileSync(item.src);
    await sharp(buffer)
      .resize(1000, 1000, { fit: 'cover' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(item.dest);
    const stat = fs.statSync(item.dest);
    console.log(`✅ ${path.basename(item.dest)}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

run();
