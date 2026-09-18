import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const cardsDir = path.resolve('public/images/cards');

async function optimizeCards() {
  if (!fs.existsSync(cardsDir)) {
    console.error(`Directorio no encontrado: ${cardsDir}`);
    return;
  }

  const files = fs.readdirSync(cardsDir).filter(f => f.endsWith('.jpg'));
  console.log(`Encontrados ${files.length} archivos .jpg en ${cardsDir}`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let processed = 0;

  for (const file of files) {
    const inputPath = path.join(cardsDir, file);
    const outputPath = path.join(cardsDir, file.replace(/\.jpg$/, '.webp'));

    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;

    // Convertir a WebP con calidad 84 y esfuerzo de compresión alto
    await sharp(inputPath)
      .webp({ quality: 84, effort: 6 })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    totalOptimized += newSize;
    processed++;
  }

  const savedMB = ((totalOriginal - totalOptimized) / (1024 * 1024)).toFixed(2);
  const origMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const optMB = (totalOptimized / (1024 * 1024)).toFixed(2);
  const pct = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1);

  console.log(`\n========================================`);
  console.log(`OPTIMIZACIÓN DE CARTAS COMPLETADA`);
  console.log(`Procesadas: ${processed} imágenes`);
  console.log(`Peso original:  ${origMB} MB`);
  console.log(`Peso optimizado: ${optMB} MB`);
  console.log(`Ahorro total:   ${savedMB} MB (${pct}% menos peso)`);
  console.log(`========================================\n`);
}

optimizeCards().catch(err => {
  console.error('Error optimizando cartas:', err);
  process.exit(1);
});
