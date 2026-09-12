const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const cardsDir = path.join(__dirname, '..', 'public', 'images', 'cards');
const width = 480;
const height = 744;

// 22 Arcanos Mayores
const majorArcanaData = [
  { num: 'ar00', roman: '0', name: 'EL LOCO', elem: '🜁' },
  { num: 'ar01', roman: 'I', name: 'EL MAGO', elem: '🜁' },
  { num: 'ar02', roman: 'II', name: 'LA SACERDOTISA', elem: '🜄' },
  { num: 'ar03', roman: 'III', name: 'LA EMPERATRIZ', elem: '♁' },
  { num: 'ar04', roman: 'IV', name: 'EL EMPERADOR', elem: '🜂' },
  { num: 'ar05', roman: 'V', name: 'EL SUMO SACERDOTE', elem: '♁' },
  { num: 'ar06', roman: 'VI', name: 'LOS ENAMORADOS', elem: '🜁' },
  { num: 'ar07', roman: 'VII', name: 'EL CARRO', elem: '🜄' },
  { num: 'ar08', roman: 'VIII', name: 'LA FUERZA', elem: '🜂' },
  { num: 'ar09', roman: 'IX', name: 'EL ERMITAÑO', elem: '♁' },
  { num: 'ar10', roman: 'X', name: 'LA RUEDA DE LA FORTUNA', elem: '🜂' },
  { num: 'ar11', roman: 'XI', name: 'LA JUSTICIA', elem: '🜁' },
  { num: 'ar12', roman: 'XII', name: 'EL COLGADO', elem: '🜄' },
  { num: 'ar13', roman: 'XIII', name: 'LA MUERTE', elem: '🜄' },
  { num: 'ar14', roman: 'XIV', name: 'LA TEMPLANZA', elem: '🜂' },
  { num: 'ar15', roman: 'XV', name: 'EL DIABLO', elem: '♁' },
  { num: 'ar16', roman: 'XVI', name: 'LA TORRE', elem: '🜂' },
  { num: 'ar17', roman: 'XVII', name: 'LA ESTRELLA', elem: '🜁' },
  { num: 'ar18', roman: 'XVIII', name: 'LA LUNA', elem: '🜄' },
  { num: 'ar19', roman: 'XIX', name: 'EL SOL', elem: '🜂' },
  { num: 'ar20', roman: 'XX', name: 'EL JUICIO', elem: '🜂' },
  { num: 'ar21', roman: 'XXI', name: 'EL MUNDO', elem: '♁' },
];

// 56 Arcanos Menores
const suits = [
  { prefix: 'wa', name: 'BASTOS', elem: '🜂 FUEGO' },
  { prefix: 'cu', name: 'COPAS', elem: '🜄 AGUA' },
  { prefix: 'sw', name: 'ESPADAS', elem: '🜁 AIRE' },
  { prefix: 'pe', name: 'OROS', elem: '♁ TIERRA' },
];

const ranks = [
  { code: 'ac', roman: 'AS', label: 'AS DE' },
  { code: '02', roman: 'II', label: 'DOS DE' },
  { code: '03', roman: 'III', label: 'TRES DE' },
  { code: '04', roman: 'IV', label: 'CUATRO DE' },
  { code: '05', roman: 'V', label: 'CINCO DE' },
  { code: '06', roman: 'VI', label: 'SEIS DE' },
  { code: '07', roman: 'VII', label: 'SIETE DE' },
  { code: '08', roman: 'VIII', label: 'OCHO DE' },
  { code: '09', roman: 'IX', label: 'NUEVE DE' },
  { code: '10', roman: 'X', label: 'DIEZ DE' },
  { code: 'pa', roman: 'SOTA', label: 'SOTA DE' },
  { code: 'kn', roman: 'CABALLERO', label: 'CABALLERO DE' },
  { code: 'qu', roman: 'REINA', label: 'REINA DE' },
  { code: 'ki', roman: 'REY', label: 'REY DE' },
];

function generateSvgOverlay(topText, bottomText, subBadge) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Viñeta radial para fundido en sombras de niebla y obsidiana -->
        <radialGradient id="vignette" cx="50%" cy="50%" r="62%">
          <stop offset="35%" stop-color="#000000" stop-opacity="0" />
          <stop offset="70%" stop-color="#050508" stop-opacity="0.68" />
          <stop offset="95%" stop-color="#030305" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#010102" stop-opacity="0.98" />
        </radialGradient>

        <!-- Gradiente de oro pulido ceremonial -->
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c6a052" />
          <stop offset="25%" stop-color="#f5e8be" />
          <stop offset="50%" stop-color="#dfb76c" />
          <stop offset="85%" stop-color="#a88338" />
          <stop offset="100%" stop-color="#6e511b" />
        </linearGradient>

        <linearGradient id="goldPlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#14141e" />
          <stop offset="50%" stop-color="#09090e" />
          <stop offset="100%" stop-color="#040406" />
        </linearGradient>
      </defs>

      <!-- Viñeta perimetral de sombra mística de copal -->
      <rect width="${width}" height="${height}" fill="url(#vignette)" />

      <!-- Borde de marco exterior de obsidiana de 10px -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#040407" stroke-width="12" />

      <!-- Borde de pan de oro exterior -->
      <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="6" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
      
      <!-- Filete de oro interior de 1px -->
      <rect x="15" y="15" width="${width - 30}" height="${height - 30}" rx="4" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.75" />

      <!-- Filigranas en esquinas: rombos y destellos arcanos -->
      <!-- Esquina Superior Izquierda -->
      <path d="M10 16L16 10M16 10L22 16M16 10V24M10 16H24" stroke="url(#goldGrad)" stroke-width="1.4" />
      <circle cx="16" cy="16" r="1.5" fill="url(#goldGrad)" />

      <!-- Esquina Superior Derecha -->
      <path d="M${width - 10} 16L${width - 16} 10M${width - 16} 10L${width - 22} 16M${width - 16} 10V24M${width - 10} 16H${width - 24}" stroke="url(#goldGrad)" stroke-width="1.4" />
      <circle cx="${width - 16}" cy="16" r="1.5" fill="url(#goldGrad)" />

      <!-- Esquina Inferior Izquierda -->
      <path d="M10 ${height - 16}L16 ${height - 10}M16 ${height - 10}L22 ${height - 16}M16 ${height - 10}V${height - 24}M10 ${height - 16}H24" stroke="url(#goldGrad)" stroke-width="1.4" />
      <circle cx="16" cy="${height - 16}" r="1.5" fill="url(#goldGrad)" />

      <!-- Esquina Inferior Derecha -->
      <path d="M${width - 10} ${height - 16}L${width - 16} ${height - 10}M${width - 16} ${height - 10}L${width - 22} ${height - 16}M${width - 16} ${height - 10}V${height - 24}M${width - 10} ${height - 16}H${width - 24}" stroke="url(#goldGrad)" stroke-width="1.4" />
      <circle cx="${width - 16}" cy="${height - 16}" r="1.5" fill="url(#goldGrad)" />

      <!-- Cartela superior con número o rango -->
      <g>
        <rect x="${width/2 - 50}" y="10" width="100" height="24" rx="4" fill="url(#goldPlate)" stroke="url(#goldGrad)" stroke-width="1.2" />
        <text x="${width/2}" y="26.5" font-family="'Cinzel', Georgia, serif" font-size="13" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">${topText}</text>
      </g>

      <!-- Cartela inferior ceremonial con nombre del arcano -->
      <g>
        <rect x="${width/2 - 145}" y="${height - 46}" width="290" height="32" rx="4" fill="url(#goldPlate)" stroke="url(#goldGrad)" stroke-width="1.2" />
        <text x="${width/2}" y="${height - 25.5}" font-family="'Cinzel', Georgia, serif" font-size="12.5" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3.5">${bottomText}</text>
      </g>

      <!-- Sub-badge ceremonial opcional (elemento / esencia) -->
      ${subBadge ? `
        <text x="${width/2}" y="${height - 52}" font-family="sans-serif" font-size="9" font-weight="600" fill="#dfb76c" text-anchor="middle" letter-spacing="2.5" opacity="0.85">${subBadge}</text>
      ` : ''}
    </svg>
  `);
}

async function processCard(inputFile, outputFile, topText, bottomText, subBadge) {
  const overlaySvg = generateSvgOverlay(topText, bottomText, subBadge);

  // Procesamiento fotográfico ceremonial a 480p (480x744)
  await sharp(inputFile)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({
      brightness: 0.90, // atmósfera solemne y misteriosa
      saturation: 1.30, // resalta los colores sagrados y pigmentos
    })
    .linear(1.22, -16) // claroscuro cinematográfico de alto contraste (estilo Malachai)
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 }) // nitidez gloriosa
    .composite([
      {
        input: overlaySvg,
        top: 0,
        left: 0,
      }
    ])
    .jpeg({ quality: 90, progressive: true })
    .toFile(outputFile);
}

async function main() {
  console.log('--- TRANSFORMACIÓN DE LOS 78 ARCANOS A VERSIÓN ÉPICA Y GLORIOSA (480p) ---');
  let count = 0;

  // 1. Procesar los 22 Arcanos Mayores
  console.log('Procesando XXII Arcanos Mayores...');
  for (const arcana of majorArcanaData) {
    const filename = `${arcana.num}.jpg`;
    const inPath = path.join(cardsDir, filename);
    const tempOut = path.join(cardsDir, `_epic_${filename}`);

    if (fs.existsSync(inPath)) {
      await processCard(
        inPath,
        tempOut,
        arcana.roman,
        arcana.name,
        `ARCANO MAYOR · ${arcana.elem}`
      );
      // Reemplazar de forma atómica
      fs.copyFileSync(tempOut, inPath);
      fs.unlinkSync(tempOut);
      count++;
      console.log(`[${count}/78] Mayor completado: ${arcana.name}`);
    }
  }

  // 2. Procesar los 56 Arcanos Menores
  console.log('Procesando LVI Arcanos Menores...');
  for (const suit of suits) {
    for (const rank of ranks) {
      const filename = `${suit.prefix}${rank.code}.jpg`;
      const inPath = path.join(cardsDir, filename);
      const tempOut = path.join(cardsDir, `_epic_${filename}`);

      if (fs.existsSync(inPath)) {
        const fullTitle = `${rank.label} ${suit.name}`;
        await processCard(
          inPath,
          tempOut,
          rank.roman,
          fullTitle,
          `PALO DE ${suit.name} · ${suit.elem}`
        );
        fs.copyFileSync(tempOut, inPath);
        fs.unlinkSync(tempOut);
        count++;
        if (count % 10 === 0 || count === 78) {
          console.log(`[${count}/78] Cartas procesadas con éxito`);
        }
      }
    }
  }

  console.log(`¡EXITO TOTAL! Se transformaron las ${count} cartas del tarot a la versión épica y gloriosa a 480p estilo Malachai.`);
}

main().catch((err) => {
  console.error('Error procesando arcanos:', err);
  process.exit(1);
});
