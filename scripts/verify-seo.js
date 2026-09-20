const fs = require('fs');

const html = fs.readFileSync('out/index.html', 'utf-8');
const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
console.log('=== VERIFICACIÓN SEO HOMEPAGE ===');
console.log('H1 count in out/index.html:', h1s.length);
h1s.forEach((h, i) => console.log(`H1 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
if (metaDescMatch) {
  console.log('Meta description length:', metaDescMatch[1].length);
  console.log('Meta description:', metaDescMatch[1]);
} else {
  console.log('Meta description not found!');
}
