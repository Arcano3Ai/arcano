const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createCircularGems() {
  const dir = path.join(__dirname, '../public/images/shop/vein_gems');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const targets = [
    { id: 'Cuarzo Cristal', file: '01_cuarzo_cristal', x: 440, y: 110, size: 220 },
    { id: 'Cuarzo Rosa', file: '02_cuarzo_rosa', x: 620, y: 340, size: 200 },
    { id: 'Amatista', file: '03_amatista', x: 490, y: 530, size: 210 },
    { id: 'Ojo de Tigre', file: '04_ojo_tigre', x: 480, y: 730, size: 200 },
    { id: 'Obsidiana', file: '05_obsidiana', x: 420, y: 910, size: 210 },
    { id: 'Howlita', file: '06_howlita', x: 500, y: 1040, size: 200 },
    { id: 'Jaspe Rojo', file: '07_jaspe_rojo', x: 410, y: 1160, size: 190 },
    { id: 'Sodalita', file: '08_sodalita', x: 520, y: 1260, size: 210 },
    { id: 'Cornalina', file: '09_cornalina', x: 460, y: 1390, size: 200 },
    { id: 'Cuarzo Ahumado', file: '10_cuarzo_ahumado', x: 600, y: 1460, size: 200 },
    { id: 'Malaquita', file: '11_malaquita', x: 400, y: 1540, size: 190 },
    { id: 'Lapislázuli', file: '12_lapislazuli', x: 520, y: 1660, size: 250 },
    { id: 'Citrino', file: '13_citrino', x: 420, y: 1800, size: 200 },
    { id: 'Piedra Luna', file: '14_piedra_luna', x: 530, y: 1880, size: 220 },
    { id: 'Labradorita', file: '15_labradorita', x: 610, y: 1980, size: 210 },
    { id: 'Turquesa', file: '16_turquesa', x: 510, y: 2100, size: 240 },
    { id: 'Pirita', file: '17_pirita', x: 440, y: 2200, size: 190 },
    { id: 'Hematita', file: '18_hematita', x: 540, y: 2280, size: 200 },
    { id: 'Jade', file: '19_aventurina', x: 500, y: 2400, size: 240 },
    { id: 'Jaspe Dálmata', file: '20_dalmata', x: 580, y: 2500, size: 180 }
  ];

  for (const t of targets) {
    const r = Math.round(t.size / 2);
    const left = Math.max(0, Math.min(960 - t.size, Math.round(t.x - r)));
    const top = Math.max(0, Math.min(2560 - t.size, Math.round(t.y - r)));

    const circleSvg = Buffer.from(
      `<svg width="${t.size}" height="${t.size}">
        <circle cx="${r}" cy="${r}" r="${r - 2}" fill="white"/>
      </svg>`
    );

    await sharp(path.join(__dirname, '../public/images/shop/reference_user_vein.jpg'))
      .extract({ left, top, width: t.size, height: t.size })
      .composite([{
        input: circleSvg,
        blend: 'dest-in'
      }])
      .png()
      .toFile(path.join(dir, `${t.file}.png`));

    console.log('Created gem:', t.file);
  }
}

createCircularGems().catch(err => {
  console.error(err);
  process.exit(1);
});
