import fs from 'fs';
import path from 'path';

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const outDir = path.resolve('out');
if (!fs.existsSync(outDir)) {
  console.error('out dir does not exist');
  process.exit(1);
}

const files = findHtmlFiles(outDir);
console.log(`Total HTML files found: ${files.length}`);

let h1Issues = [];
let descIssues = [];

files.forEach(file => {
  const relPath = path.relative(outDir, file);
  const content = fs.readFileSync(file, 'utf-8');
  
  // Check H1
  const h1s = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length !== 1) {
    h1Issues.push({ file: relPath, count: h1s.length });
  }

  // Check Meta Description
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]*>/i);
  if (!descMatch) {
    descIssues.push({ file: relPath, reason: 'Missing meta description' });
  } else {
    const textMatch = descMatch[0].match(/content=["']([^"']*)["']/i);
    const desc = textMatch ? textMatch[1] : '';
    if (desc.length < 25 || desc.length > 160) {
      descIssues.push({ file: relPath, length: desc.length, desc });
    }
  }
});

console.log('--- H1 ISSUES (Expected 1 per page) ---');
console.log(`Found: ${h1Issues.length}`);
h1Issues.forEach(i => console.log(`  ${i.file}: ${i.count} h1 tags`));

console.log('\n--- META DESCRIPTION ISSUES (Expected 25 - 160 chars) ---');
console.log(`Found: ${descIssues.length}`);
descIssues.slice(0, 15).forEach(i => console.log(`  ${i.file}: ${i.length || i.reason} chars`));
