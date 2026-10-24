/**
 * generate-product-feeds.js
 * 
 * Generador estático de feeds de productos para:
 * 1. Google Merchant Center & Google Ads (Demand Gen / Shopping / PMax) [XML & CSV]
 * 2. Meta Commerce Manager (Facebook / Instagram Shopping & Dynamic Ads) [CSV]
 * 
 * Uso: node scripts/generate-product-feeds.js
 */

const fs = require('fs');
const path = require('path');
const { enrichedItems, collectionsOutput } = require('./build-inventory-dataset');

const ROOT_DIR = path.resolve(__dirname, '..');
const FEEDS_DIR = path.join(ROOT_DIR, 'public', 'feeds');
const BASE_URL = 'https://arcanosolutions.com';
const BRAND_NAME = 'ARCANO';

// Asegurar existencia de public/feeds
if (!fs.existsSync(FEEDS_DIR)) {
  fs.mkdirSync(FEEDS_DIR, { recursive: true });
}

console.log('\n📦 [FEED GENERATOR] Iniciando generación de Feeds de Productos para ARCANO...');
console.log(`ℹ️  Productos a procesar: ${enrichedItems.length}`);

// ==============================================================================
// 1. GENERAR FEED XML PARA GOOGLE MERCHANT CENTER (RSS 2.0)
// ==============================================================================
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getGoogleCategory(collectionId) {
  if (['coleccion-arcanos', 'talismanes', 'alta-joyeria-oro', 'ambar-chiapas'].includes(collectionId)) {
    return '200'; // Bracelets
  }
  if (['portainciensos-y-runas', 'doble-perforacion', 'sahumerios-y-kits', 'duos'].includes(collectionId)) {
    return '6388'; // Home Fragrances > Incense Holders
  }
  return '188'; // Jewelry general
}

const xmlItems = enrichedItems.map(item => {
  const productUrl = `${BASE_URL}/tienda?item=${encodeURIComponent(item.slug || item.id)}`;
  const rawImg = item.imageUrl.startsWith('http') ? item.imageUrl : `${BASE_URL}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`;
  const imageUrl = escapeXml(rawImg);
  const price = `${Number(item.priceMxn).toFixed(2)} MXN`;
  const availability = (item.availableQuantity > 0 && item.isActive) ? 'in_stock' : 'out_of_stock';
  const googleCategory = getGoogleCategory(item.collectionId);
  const cleanDesc = escapeXml(`${item.tagline || ''} — Consagrado artesanalmente. Minerales 100% auténticos.`.trim());

  return `    <item>
      <g:id>${escapeXml(item.id)}</g:id>
      <g:title><![CDATA[${item.name}]]></g:title>
      <g:description><![CDATA[${cleanDesc}]]></g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:brand>${escapeXml(BRAND_NAME)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type><![CDATA[Joyería & Altar > ${item.collectionName || 'Talismanes'}]]></g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>MX</g:country>
        <g:service>Envío Express México</g:service>
        <g:price>0.00 MXN</g:price>
      </g:shipping>
      <g:custom_label_0>${escapeXml(item.collectionId)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(item.sku)}</g:custom_label_1>
      <g:custom_label_2>${escapeXml(item.stoneType || 'Mineral Sagrado')}</g:custom_label_2>
    </item>`;
}).join('\n');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>ARCANO — Sabiduría de los Arcanos</title>
    <link>${BASE_URL}</link>
    <description>Catálogo Oficial de Productos de ARCANO para Google Merchant Center y Demand Gen Ads</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${xmlItems}
  </channel>
</rss>`;

const XML_PATH = path.join(FEEDS_DIR, 'google-merchant.xml');
fs.writeFileSync(XML_PATH, xmlContent, 'utf8');
console.log(`✅ [XML] Feed de Google Merchant generado: ${XML_PATH}`);

// ==============================================================================
// 2. GENERAR FEED CSV PARA GOOGLE MERCHANT CENTER (CARGA DIRECTA / PLANO)
// ==============================================================================
function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const googleCsvHeaders = [
  'id',
  'title',
  'description',
  'link',
  'image_link',
  'availability',
  'price',
  'brand',
  'condition',
  'google_product_category',
  'product_type',
  'identifier_exists',
  'shipping(country:service:price)',
  'custom_label_0',
  'custom_label_1'
];

const googleCsvRows = [googleCsvHeaders.join(',')];

enrichedItems.forEach(item => {
  const productUrl = `${BASE_URL}/tienda?item=${encodeURIComponent(item.slug || item.id)}`;
  const rawImg = item.imageUrl.startsWith('http') ? item.imageUrl : `${BASE_URL}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`;
  const price = `${Number(item.priceMxn).toFixed(2)} MXN`;
  const availability = (item.availableQuantity > 0 && item.isActive) ? 'in_stock' : 'out_of_stock';
  const googleCategory = getGoogleCategory(item.collectionId);
  const cleanDesc = `${item.tagline || item.name} — Joyería y talismanes consagrados a mano con minerales naturales de alta vibración.`;

  googleCsvRows.push([
    escapeCsv(item.id),
    escapeCsv(item.name),
    escapeCsv(cleanDesc),
    escapeCsv(productUrl),
    escapeCsv(rawImg),
    escapeCsv(availability),
    escapeCsv(price),
    escapeCsv(BRAND_NAME),
    escapeCsv('new'),
    escapeCsv(googleCategory),
    escapeCsv(`Joyería > ${item.collectionName}`),
    escapeCsv('no'),
    escapeCsv('MX:Envío Express:0.00 MXN'),
    escapeCsv(item.collectionId),
    escapeCsv(item.sku)
  ].join(','));
});

const GOOGLE_CSV_PATH = path.join(FEEDS_DIR, 'google-merchant.csv');
fs.writeFileSync(GOOGLE_CSV_PATH, googleCsvRows.join('\n'), 'utf8');
console.log(`✅ [CSV Google] Feed CSV de Google Merchant generado: ${GOOGLE_CSV_PATH}`);

// ==============================================================================
// 3. GENERAR FEED CSV PARA META COMMERCE (FACEBOOK / INSTAGRAM SHOPPING)
// ==============================================================================
const metaCsvHeaders = [
  'id',
  'title',
  'description',
  'availability',
  'condition',
  'price',
  'link',
  'image_link',
  'brand',
  'google_product_category',
  'fb_product_category'
];

const metaCsvRows = [metaCsvHeaders.join(',')];

enrichedItems.forEach(item => {
  const productUrl = `${BASE_URL}/tienda?item=${encodeURIComponent(item.slug || item.id)}`;
  const rawImg = item.imageUrl.startsWith('http') ? item.imageUrl : `${BASE_URL}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`;
  const price = `${Number(item.priceMxn).toFixed(2)} MXN`;
  const availability = (item.availableQuantity > 0 && item.isActive) ? 'in stock' : 'out of stock';
  const cleanDesc = `${item.tagline || item.name} — Talismán artesanal en minerales de alta pureza.`;

  metaCsvRows.push([
    escapeCsv(item.id),
    escapeCsv(item.name),
    escapeCsv(cleanDesc),
    escapeCsv(availability),
    escapeCsv('new'),
    escapeCsv(price),
    escapeCsv(productUrl),
    escapeCsv(rawImg),
    escapeCsv(BRAND_NAME),
    escapeCsv('188'),
    escapeCsv('jewelry & watches > jewelry > bracelets')
  ].join(','));
});

const META_CSV_PATH = path.join(FEEDS_DIR, 'facebook-catalog.csv');
fs.writeFileSync(META_CSV_PATH, metaCsvRows.join('\n'), 'utf8');
console.log(`✅ [CSV Meta] Catálogo de Facebook/Instagram generado: ${META_CSV_PATH}`);

console.log('\n🚀 [RESUMEN FINAL]');
console.log(`- Total productos exportados: ${enrichedItems.length}`);
console.log(`- Archivos generados en public/feeds/:`);
console.log(`  1. google-merchant.xml`);
console.log(`  2. google-merchant.csv`);
console.log(`  3. facebook-catalog.csv`);
console.log('✨ Feeds listos para producción.');
