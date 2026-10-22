const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetsPart2 = [
  { id: 'Turmalina', file: '21_turmalina', x: 620, y: 190, size: 160 },
  { id: 'Ámbar', file: '22_ambar', x: 500, y: 300, size: 180 },
  { id: 'Fluorita', file: '23_fluorita', x: 510, y: 450, size: 190 },
  { id: 'Aguamarina', file: '24_aguamarina', x: 450, y: 620, size: 200 },
  { id: 'Rodocrosita', file: '25_rodocrosita', x: 410, y: 740, size: 150 },
  { id: 'Cuarzo Rutilado', file: '26_cuarzo_rutilado', x: 530, y: 850, size: 180 },
  { id: 'Granate', file: '27_granate', x: 540, y: 970, size: 160 },
  { id: 'Ojo de Buey', file: '28_ojo_buey', x: 500, y: 1100, size: 170 },
  { id: 'Selenita', file: '29_selenita', x: 500, y: 1190, size: 160 },
  { id: 'Lava Volcánica', file: '30_lava_volcanica', x: 570, y: 1300, size: 160 },
  { id: 'Amazonita', file: '31_amazonita', x: 500, y: 1440, size: 190 },
  { id: 'Jade Nefrita', file: '32_jade_nefrita', x: 500, y: 1600, size: 190 }
];

async function run() {
  const dir = path.join(__dirname, '../public/images/shop/vein_gems');
  for (const t of targetsPart2) {
    const r = Math.round(t.size / 2);
    const left = Math.max(0, Math.min(960 - t.size, Math.round(t.x - r)));
    const top = Math.max(0, Math.min(1720 - t.size, Math.round(t.y - r)));

    const circleSvg = Buffer.from(
      `<svg width="${t.size}" height="${t.size}">
        <circle cx="${r}" cy="${r}" r="${r - 2}" fill="white"/>
      </svg>`
    );

    await sharp(path.join(__dirname, '../public/images/shop/reference_user_vein_part2.jpg'))
      .extract({ left, top, width: t.size, height: t.size })
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .png()
      .toFile(path.join(dir, `${t.file}.png`));

    console.log('Created part 2 gem:', t.file);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
