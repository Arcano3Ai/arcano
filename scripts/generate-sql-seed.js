const fs = require('fs');
const path = require('path');
const { COLLECTION_SPECS, collectionsOutput, enrichedItems } = require('./build-inventory-dataset');

const ROOT_DIR = path.resolve(__dirname, '..');
const SQL_PATH = path.join(ROOT_DIR, 'supabase', 'seed_inventory.sql');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

let sql = `-- ==============================================================================
-- ARCANO — SEED DE INVENTARIO: 1,000 UNIDADES EXACTAS POR COLECCIÓN
-- Total Colecciones: 11 | Total Piezas: 148 | Total Unidades: 11,000
-- Generado para integración directa con PostgreSQL / Supabase & Agente WhatsApp
-- ==============================================================================

BEGIN;

-- 1. INSERTAR O ACTUALIZAR COLECCIONES CEREMONIALES
`;

for (const col of collectionsOutput) {
  sql += `INSERT INTO public.inventory_collections (id, name, slug, description, symbol, target_stock, current_stock)
VALUES (
  ${escapeSql(col.id)},
  ${escapeSql(col.name)},
  ${escapeSql(col.slug)},
  ${escapeSql(col.description)},
  ${escapeSql(col.symbol)},
  ${col.targetStock},
  ${col.currentStock}
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  symbol = EXCLUDED.symbol,
  target_stock = EXCLUDED.target_stock,
  updated_at = NOW();

`;
}

sql += `\n-- 2. INSERTAR O ACTUALIZAR PIEZAS (148 PRODUCTOS ÚNICOS)\n`;

for (const item of enrichedItems) {
  const metadata = JSON.stringify({
    tagline: item.tagline || '',
    stoneType: item.stoneType || '',
    arcanoNumber: item.arcanoNumber || null
  });

  sql += `INSERT INTO public.inventory_items (
  id, sku, name, slug, collection_id, price_mxn, stock_quantity, reserved_quantity, min_stock_alert, is_active, tagline, stone_type, image_url, metadata
) VALUES (
  ${escapeSql(item.id)},
  ${escapeSql(item.sku)},
  ${escapeSql(item.name)},
  ${escapeSql(item.slug)},
  ${escapeSql(item.collectionId)},
  ${item.priceMxn},
  ${item.stockQuantity},
  0,
  ${item.minStockAlert},
  TRUE,
  ${escapeSql(item.tagline)},
  ${escapeSql(item.stoneType)},
  ${escapeSql(item.imageUrl)},
  ${escapeSql(metadata)}::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  collection_id = EXCLUDED.collection_id,
  price_mxn = EXCLUDED.price_mxn,
  stock_quantity = EXCLUDED.stock_quantity,
  reserved_quantity = 0,
  min_stock_alert = EXCLUDED.min_stock_alert,
  is_active = TRUE,
  tagline = EXCLUDED.tagline,
  stone_type = EXCLUDED.stone_type,
  image_url = EXCLUDED.image_url,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

`;
}

sql += `\n-- 3. REGISTRO EN EL LIBRO MAYOR DE AUDITORÍA (INVENTORY_MOVEMENTS)\n`;

for (const item of enrichedItems) {
  sql += `INSERT INTO public.inventory_movements (
  item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
) VALUES (
  ${escapeSql(item.id)},
  'initial_seed',
  ${item.stockQuantity},
  0,
  ${item.stockQuantity},
  'SEED-COLLECTION-1000',
  'Carga inicial ceremonial: distribución equitativa de 1,000 unidades por colección'
);

`;
}

sql += `
-- 4. RE-SINCRONIZAR AUTOMÁTICAMENTE EL STOCK ACTUAL DE CADA COLECCIÓN
UPDATE public.inventory_collections c
SET current_stock = COALESCE((
  SELECT SUM(stock_quantity) 
  FROM public.inventory_items 
  WHERE collection_id = c.id AND is_active = TRUE
), 0),
updated_at = NOW();

COMMIT;

-- VERIFICACIÓN FINAL:
-- SELECT id, name, target_stock, current_stock FROM public.inventory_collections ORDER BY id;
`;

fs.writeFileSync(SQL_PATH, sql, 'utf8');
console.log(`✅ Archivo seed SQL generado exitosamente en: ${SQL_PATH}`);
console.log(`- Tamaño del archivo: ${(fs.statSync(SQL_PATH).size / 1024).toFixed(2)} KB`);
