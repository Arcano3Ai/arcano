const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/shop.ts'), 'utf8');
const regex = /imageUrl:\s*"([^"]+)"/g;
let match;
const missing = [];
const cdnImages = [];
const localOk = [];

while ((match = regex.exec(content)) !== null) {
  const imgUrl = match[1];
  if (imgUrl.startsWith('http')) {
    cdnImages.push(imgUrl);
  } else {
    const fullPath = path.join(__dirname, '../public', imgUrl.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      missing.push(imgUrl);
    } else {
      localOk.push(imgUrl);
    }
  }
}

console.log('CDN Images:', cdnImages.length);
console.log('Local OK:', localOk.length);
console.log('Missing Local:', missing.length);
console.log('Missing List:', missing);
