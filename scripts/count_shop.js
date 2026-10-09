const fs = require('fs');
const content = fs.readFileSync('src/data/shop.ts', 'utf8');

const cats = [
  'todos',
  'alta-joyeria-oro',
  'doble-perforacion',
  'reiki-sanacion',
  'portainciensos-y-runas',
  'simbolos-y-geometria',
  'frecuencias-angelicales',
  'talismanes',
  'duos',
  'sahumerios-y-kits'
];

let sum = 0;
for (const c of cats) {
  if (c === 'todos') continue;
  const m = content.split('categoryId: "' + c + '"').length - 1;
  console.log(c.padEnd(25), ':', m);
  sum += m;
}

console.log('---------------------------------');
console.log('Total productos en catálogo :', sum);
