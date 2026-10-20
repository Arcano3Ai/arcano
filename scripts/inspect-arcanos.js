const fs = require('fs');
const content = fs.readFileSync('src/data/majorArcanaTalismans.ts', 'utf8');

const regex = /id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?arcanoNumber:\s*"([^"]+)"/g;
let match;
const items = [];
while ((match = regex.exec(content)) !== null) {
  items.push({ id: match[1], name: match[2], arcanoNumber: match[3] });
}

console.log('Found', items.length, 'arcanos:');
items.forEach(it => console.log(`${it.arcanoNumber}: ${it.id} -> ${it.name}`));
