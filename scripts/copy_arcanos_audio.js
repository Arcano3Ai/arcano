const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\sergi\\Downloads\\Arcanos';
const dstDir = path.join(__dirname, '..', 'public', 'audio', 'arcanos');

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log('Archivos en origen:', files);

const mappings = [
  { match: /el\s*loco/i, target: 'el-loco.wav' },
  { match: /el\s*mago/i, target: 'el-mago.wav' },
  { match: /la\s*sacerdotisa/i, target: 'la-sacerdotisa.wav' },
  { match: /la\s*emperatriz/i, target: 'la-emperatriz.wav' },
  { match: /el\s*emperador/i, target: 'el-emperador.wav' },
  { match: /el\s*hierofante/i, target: 'el-hierofante.wav' },
  { match: /los\s*enamorados/i, target: 'los-enamorados.wav' },
  { match: /el\s*carro/i, target: 'el-carro.wav' },
  { match: /fuerza/i, target: 'la-fuerza.wav' },
  { match: /ermita/i, target: 'el-ermitano.wav' },
  { match: /justicia/i, target: 'la-justicia.mp3' },
  { match: /colgado/i, target: 'el-colgado.wav' },
];

let copied = 0;
for (const m of mappings) {
  const found = files.find(f => m.match.test(f));
  if (found) {
    const srcFile = path.join(srcDir, found);
    const dstFile = path.join(dstDir, m.target);
    fs.copyFileSync(srcFile, dstFile);
    const stat = fs.statSync(dstFile);
    console.log(`✓ Copiado [${found}] -> [${m.target}] (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
    copied++;
  } else {
    console.warn(`⚠ No encontrado para patrón:`, m.match);
  }
}

console.log(`\nCompletado: ${copied} archivos copiados a ${dstDir}`);
