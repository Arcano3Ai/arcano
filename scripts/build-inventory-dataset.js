const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SHOP_PATH = path.join(ROOT_DIR, 'src', 'data', 'shop.ts');
const ARCANOS_PATH = path.join(ROOT_DIR, 'src', 'data', 'majorArcanaTalismans.ts');

const shopContent = fs.readFileSync(SHOP_PATH, 'utf8');
const arcanosContent = fs.readFileSync(ARCANOS_PATH, 'utf8');

// Colecciones oficiales y sus prefijos de SKU
const COLLECTION_SPECS = [
  { id: 'coleccion-arcanos', skuPrefix: 'ARC', name: 'Colección Arcanos Mayores', slug: 'coleccion-arcanos', symbol: '♾️', description: '22 talismanes de muñeca consagrados forjados exclusivamente en 100% pura piedra mineral natural de calibre uniforme 8 mm Grado AAA sobre elástico. Diseño ceremonial puro: sin dijes, sin colgantes ni bisutería.' },
  { id: 'alta-joyeria-oro', skuPrefix: 'ORO', name: 'Alta Joyería & Oro 18K', slug: 'alta-joyeria-oro', symbol: '⚜️', description: 'Talismanes ceremoniales y gargantillas consagradas con herrajes bañados en oro 18K y gemas naturales de Grado AAA.' },
  { id: 'ambar-chiapas', skuPrefix: 'AMB', name: 'Ámbar de Chiapas & Minerales', slug: 'ambar-chiapas', symbol: '✨', description: 'Talismanes ceremoniales con auténtico ámbar fósil de Simojovel, plata fina Ley .925 y minerales sagrados.' },
  { id: 'doble-perforacion', skuPrefix: 'DBP', name: 'Doble Perforación (Dual)', slug: 'doble-perforacion', symbol: '⚡', description: 'Soportes de piedra con dos orificios para sahumerio dual y mezcla de aromas.' },
  { id: 'reiki-sanacion', skuPrefix: 'RKI', name: 'Reiki & Sanación', slug: 'reiki-sanacion', symbol: '🌀', description: 'Símbolos Cho Ku Rei, Hagstones (piedras bruja) y piedras de armonización.' },
  { id: 'portainciensos-y-runas', skuPrefix: 'RUN', name: 'Quemadores Rúnicos & Aura', slug: 'portainciensos-y-runas', symbol: 'ᚱ', description: 'Soportes de piedra taladrados a mano para incienso y varitas sagradas.' },
  { id: 'simbolos-y-geometria', skuPrefix: 'GEO', name: 'Símbolos Sagrados & Sol', slug: 'simbolos-y-geometria', symbol: '🜃', description: 'Geometría sagrada, soles alquímicos, lunas y mandalas pintados a mano en piedra.' },
  { id: 'frecuencias-angelicales', skuPrefix: 'ANG', name: 'Números Angelicales', slug: 'frecuencias-angelicales', symbol: '☉', description: 'Frecuencias sincrónicas (11:11, 777, 444) para anclar intenciones.' },
  { id: 'sahumerios-y-kits', skuPrefix: 'SAH', name: 'Kits & Bandejas de Altar', slug: 'sahumerios-y-kits', symbol: '🜁', description: 'Inciensos de monte, atados de salvia, bandejas de río y kits de limpieza profunda.' },
  { id: 'talismanes', skuPrefix: 'TAL', name: 'Talismanes de Muñeca', slug: 'talismanes', symbol: '📿', description: 'Pulseras artesanales consagradas con minerales naturales y amuletos sagrados.' },
  { id: 'duos', skuPrefix: 'DUO', name: 'Dúos Alquímicos', slug: 'duos', symbol: '✨', description: 'Kits rituales de Altar Fluvial: Piedra Sahumadora + Talismán de Muñeca.' }
];

function extractProducts(content) {
  const blocks = content.split(/\{\s*id:\s*"/g).slice(1);
  return blocks.map(block => {
    const id = (block.match(/^([^"]+)"/) || [])[1] || '';
    const slug = (block.match(/slug:\s*"([^"]+)"/) || [])[1] || id;
    const name = (block.match(/name:\s*"([^"]+)"/) || [])[1] || '';
    const categoryId = (block.match(/categoryId:\s*"([^"]+)"/) || [])[1] || '';
    const categoryName = (block.match(/categoryName:\s*"([^"]+)"/) || [])[1] || '';
    const price = parseInt((block.match(/price:\s*(\d+)/) || [])[1] || '0', 10);
    const tagline = (block.match(/tagline:\s*"([^"]+)"/) || [])[1] || '';
    const description = (block.match(/description:\s*"([^"]+)"/) || [])[1] || '';
    const imageUrl = (block.match(/imageUrl:\s*"([^"]+)"/) || [])[1] || '';
    const stoneType = (block.match(/stoneType:\s*"([^"]+)"/) || [])[1] || '';
    const inStock = (block.match(/inStock:\s*(true|false)/) || [])[1] === 'true';
    const arcanoNumber = (block.match(/arcanoNumber:\s*"([^"]+)"/) || [])[1] || '';
    
    return {
      id,
      slug,
      name,
      categoryId,
      categoryName,
      price,
      tagline,
      description,
      imageUrl,
      stoneType,
      inStock,
      arcanoNumber
    };
  }).filter(p => p.id && p.categoryId);
}

const arcanos = extractProducts(arcanosContent).map(p => ({
  ...p,
  categoryId: p.categoryId || 'coleccion-arcanos',
  categoryName: p.categoryName || 'Colección Arcanos Mayores'
}));

const shopOthers = extractProducts(shopContent);
const rawProducts = [...arcanos, ...shopOthers];

// Deduplicar por id
const seenIds = new Set();
const uniqueProducts = [];
for (const p of rawProducts) {
  if (!seenIds.has(p.id)) {
    seenIds.add(p.id);
    uniqueProducts.push(p);
  }
}

// Agrupar por colección
const collectionMap = new Map();
COLLECTION_SPECS.forEach(c => collectionMap.set(c.id, []));

uniqueProducts.forEach(p => {
  if (collectionMap.has(p.categoryId)) {
    collectionMap.get(p.categoryId).push(p);
  } else {
    console.warn('Colección no reconocida:', p.categoryId, p.id);
  }
});

const TARGET_STOCK_PER_COLLECTION = 1000;
const enrichedItems = [];
const collectionsOutput = [];

COLLECTION_SPECS.forEach(spec => {
  const prods = collectionMap.get(spec.id) || [];
  const count = prods.length;
  if (count === 0) {
    console.error(`Error: Colección ${spec.id} no tiene piezas!`);
    return;
  }
  
  const baseStock = Math.floor(TARGET_STOCK_PER_COLLECTION / count);
  const remainder = TARGET_STOCK_PER_COLLECTION % count;
  let runningSum = 0;

  prods.forEach((prod, index) => {
    const allocatedStock = baseStock + (index < remainder ? 1 : 0);
    runningSum += allocatedStock;

    // Generar SKU determinista y legible para agentes
    let skuSuffix;
    if (spec.id === 'coleccion-arcanos' && prod.arcanoNumber !== undefined && prod.arcanoNumber !== '') {
      skuSuffix = String(prod.arcanoNumber).padStart(2, '0');
    } else {
      skuSuffix = String(index + 1).padStart(2, '0');
    }
    const sku = `${spec.skuPrefix}-${skuSuffix}`;

    enrichedItems.push({
      id: prod.id,
      sku,
      name: prod.name,
      slug: prod.slug,
      collectionId: spec.id,
      collectionName: spec.name,
      priceMxn: prod.price,
      stockQuantity: allocatedStock,
      reservedQuantity: 0,
      availableQuantity: allocatedStock,
      minStockAlert: Math.max(5, Math.floor(allocatedStock * 0.1)),
      isActive: true,
      tagline: prod.tagline,
      stoneType: prod.stoneType,
      imageUrl: prod.imageUrl,
      arcanoNumber: prod.arcanoNumber || null
    });
  });

  collectionsOutput.push({
    id: spec.id,
    name: spec.name,
    slug: spec.slug,
    symbol: spec.symbol,
    description: spec.description,
    targetStock: TARGET_STOCK_PER_COLLECTION,
    currentStock: runningSum,
    itemCount: count
  });
});

console.log(`\n✅ Proceso completado exitosamente:`);
console.log(`- Colecciones procesadas: ${collectionsOutput.length}`);
console.log(`- Piezas procesadas: ${enrichedItems.length}`);
const totalStock = enrichedItems.reduce((acc, it) => acc + it.stockQuantity, 0);
console.log(`- Stock total agregado: ${totalStock} (Exactamente ${TARGET_STOCK_PER_COLLECTION} x ${collectionsOutput.length})`);

// Exportar dataset JSON
const OUT_DIR = path.join(ROOT_DIR, 'public');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const snapshotData = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  targetPerCollection: TARGET_STOCK_PER_COLLECTION,
  totalStockUnits: totalStock,
  totalCollections: collectionsOutput.length,
  totalProducts: enrichedItems.length,
  collections: collectionsOutput,
  items: enrichedItems
};

fs.writeFileSync(path.join(OUT_DIR, 'agent-inventory-snapshot.json'), JSON.stringify(snapshotData, null, 2), 'utf8');
console.log(`✅ Snapshot guardado en: public/agent-inventory-snapshot.json`);

module.exports = {
  COLLECTION_SPECS,
  collectionsOutput,
  enrichedItems,
  snapshotData
};
