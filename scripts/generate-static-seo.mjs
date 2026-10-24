/**
 * scripts/generate-static-seo.mjs
 * 
 * Generador estático en tiempo de compilación (SSG & Pre-rendering) para:
 * 1. Feed XML RSS 2.0 oficial de Google Merchant Center y Meta Catalog en public/tienda/feed.xml
 * 2. Páginas HTML estáticas individuales por cada producto en tienda/[slug]/index.html
 *    con meta tags OpenGraph y schema.org/Product JSON-LD nativo en el <head>.
 * 
 * Diseñado específicamente para hosting estático en Hostinger / GitHub sin runtime Node.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BASE_URL = 'https://arcanosolutions.com';
const BRAND_NAME = 'ARCANO';
const CATALOG_PATH = path.join(ROOT_DIR, 'data', 'catalogo.json');

console.log('\n🔮 [SSG STATIC SEO GENERATOR] Iniciando compilación de Feeds y Páginas Estáticas...');

// 1. Cargar catálogo centralizado
if (!fs.existsSync(CATALOG_PATH)) {
  console.error(`❌ Error crítico: No se encontró el catálogo en ${CATALOG_PATH}`);
  process.exit(1);
}

const catalogRaw = fs.readFileSync(CATALOG_PATH, 'utf8');
const catalog = JSON.parse(catalogRaw);
console.log(`📦 Catálogo cargado: ${catalog.length} productos físicos para exportación.`);

// Helpers de escape
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getGoogleCategory(categoria) {
  if (['coleccion-arcanos', 'talismanes', 'alta-joyeria-oro', 'ambar-chiapas'].includes(categoria)) {
    return '200'; // Bracelets
  }
  if (['portainciensos-y-runas', 'doble-perforacion', 'sahumerios-y-kits', 'duos'].includes(categoria)) {
    return '6388'; // Home Fragrances > Incense Holders
  }
  return '188'; // Jewelry
}

function getFullImageUrl(imgPath) {
  if (!imgPath) return `${BASE_URL}/og-tienda.jpg`;
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
  return `${BASE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// ==============================================================================
// PASO 1: GENERAR FEED XML (public/tienda/feed.xml)
// ==============================================================================
const PUBLIC_TIENDA_DIR = path.join(ROOT_DIR, 'public', 'tienda');
if (!fs.existsSync(PUBLIC_TIENDA_DIR)) {
  fs.mkdirSync(PUBLIC_TIENDA_DIR, { recursive: true });
}

const xmlItems = catalog.map((item) => {
  const productCanonicalUrl = `${BASE_URL}/tienda/${encodeURIComponent(item.slug)}/`;
  const imageUrl = getFullImageUrl(item.imagen);
  const priceFormatted = `${Number(item.precio).toFixed(2)} MXN`;
  const googleCategory = getGoogleCategory(item.categoria);
  const availability = item.disponibilidad === 'in_stock' ? 'in_stock' : 'out_of_stock';

  return `    <item>
      <g:id>${escapeXml(item.id)}</g:id>
      <g:title><![CDATA[${item.nombre}]]></g:title>
      <g:description><![CDATA[${item.descripcion}]]></g:description>
      <g:link>${escapeXml(productCanonicalUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>${escapeXml(BRAND_NAME)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type><![CDATA[Joyería & Altar > ${item.categoria || 'Talismanes'}]]></g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>MX</g:country>
        <g:service>Envío Express México</g:service>
        <g:price>0.00 MXN</g:price>
      </g:shipping>
      <g:custom_label_0>${escapeXml(item.categoria || 'general')}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(item.sku || 'SKU')}</g:custom_label_1>
    </item>`;
}).join('\n');

const feedXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>ARCANO — Sabiduría de los Arcanos | Catálogo Oficial de Productos</title>
    <link>${BASE_URL}/tienda/</link>
    <description>Feed oficial para Google Merchant Center, Campañas de Generación de Demanda (Demand Gen) y Meta Catalog de ARCANO.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${xmlItems}
  </channel>
</rss>`;

// Guardar en public/tienda/feed.xml
const PUBLIC_FEED_PATH = path.join(PUBLIC_TIENDA_DIR, 'feed.xml');
fs.writeFileSync(PUBLIC_FEED_PATH, feedXmlContent, 'utf8');
console.log(`✅ [FEED XML] Creado exitosamente en: ${PUBLIC_FEED_PATH}`);

// Si existe out/tienda, sincronizar feed.xml
const OUT_TIENDA_DIR = path.join(ROOT_DIR, 'out', 'tienda');
if (fs.existsSync(OUT_TIENDA_DIR)) {
  fs.writeFileSync(path.join(OUT_TIENDA_DIR, 'feed.xml'), feedXmlContent, 'utf8');
  console.log(`✅ [FEED XML] Sincronizado en out/tienda/feed.xml`);
}

// ==============================================================================
// PASO 2: GENERAR PÁGINAS ESTÁTICAS HTML EN tienda/[slug]/index.html
// ==============================================================================
// Generaremos tanto en:
// a) /tienda/[slug]/index.html (raíz del repositorio, ideal para Hostinger sirviendo desde repo root)
// b) /public/tienda/[slug]/index.html (para que Next.js build lo copie a out/)
// c) /out/tienda/[slug]/index.html (si out/ ya existe)

const ROOT_TIENDA_DIR = path.join(ROOT_DIR, 'tienda');
if (!fs.existsSync(ROOT_TIENDA_DIR)) {
  fs.mkdirSync(ROOT_TIENDA_DIR, { recursive: true });
}

let generatedPagesCount = 0;

for (const item of catalog) {
  const productCanonicalUrl = `${BASE_URL}/tienda/${encodeURIComponent(item.slug)}/`;
  const storeRedirectUrl = `/tienda/?item=${encodeURIComponent(item.slug)}`;
  const imageUrl = getFullImageUrl(item.imagen);
  const formattedPriceMxn = `$${Number(item.precio).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': item.nombre,
    'image': [imageUrl],
    'description': item.descripcion,
    'sku': item.sku || item.id,
    'brand': {
      '@type': 'Brand',
      'name': BRAND_NAME
    },
    'offers': {
      '@type': 'Offer',
      'url': productCanonicalUrl,
      'priceCurrency': 'MXN',
      'price': Number(item.precio).toFixed(2),
      'availability': item.disponibilidad === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'seller': {
        '@type': 'Organization',
        'name': 'ARCANO — Sabiduría de los Arcanos'
      }
    }
  };

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(item.nombre)} | ARCANO Alta Joyería Ceremonial</title>
  <meta name="description" content="${escapeHtml(item.descripcion)}">
  <link rel="canonical" href="${escapeHtml(productCanonicalUrl)}">

  <!-- OpenGraph / Facebook / Instagram / Meta Catalog -->
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="ARCANO — Sabiduría de los Arcanos">
  <meta property="og:title" content="${escapeHtml(item.nombre)}">
  <meta property="og:description" content="${escapeHtml(item.descripcion)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:alt" content="${escapeHtml(item.nombre)}">
  <meta property="og:url" content="${escapeHtml(productCanonicalUrl)}">
  <meta property="product:price:amount" content="${Number(item.precio).toFixed(2)}">
  <meta property="product:price:currency" content="MXN">
  <meta property="og:availability" content="${item.disponibilidad === 'in_stock' ? 'instock' : 'outofstock'}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(item.nombre)}">
  <meta name="twitter:description" content="${escapeHtml(item.descripcion)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">

  <!-- Schema.org Product Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>

  <!-- Redirección client-side suave para visitantes reales hacia la boutique interactiva -->
  <script>
    (function() {
      var isBot = /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|Google-InspectionTool|bingbot/i.test(navigator.userAgent);
      if (!isBot) {
        window.location.replace("${storeRedirectUrl}");
      }
    })();
  </script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #070707;
      color: #F5F5F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      line-height: 1.6;
    }
    .card {
      max-width: 680px;
      width: 100%;
      background: #0E0E0E;
      border: 1px solid #262626;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
      text-align: center;
    }
    .img-wrap {
      width: 100%;
      max-height: 480px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .img-wrap img {
      width: 100%;
      height: auto;
      max-height: 480px;
      object-fit: cover;
      display: block;
    }
    .content {
      padding: 32px 24px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border: 1px solid #C5A059;
      color: #C5A059;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border-radius: 9999px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .desc {
      color: #A3A3A3;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .price-box {
      margin-bottom: 24px;
    }
    .price {
      font-size: 28px;
      font-weight: 800;
      color: #C5A059;
    }
    .shipping {
      font-size: 12px;
      color: #22C55E;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 4px;
    }
    .btn {
      display: inline-block;
      width: 100%;
      max-width: 320px;
      padding: 14px 28px;
      background: #C5A059;
      color: #000000;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      border-radius: 8px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: background 0.2s ease;
    }
    .btn:hover {
      background: #D8B368;
    }
    .footer-note {
      margin-top: 24px;
      font-size: 12px;
      color: #737373;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="img-wrap">
      <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.nombre)}" width="600" height="600" loading="eager">
    </div>
    <div class="content">
      <span class="badge">Pieza Ceremonial Consagrada</span>
      <h1>${escapeHtml(item.nombre)}</h1>
      <p class="desc">${escapeHtml(item.descripcion)}</p>
      
      <div class="price-box">
        <div class="price">${formattedPriceMxn}</div>
        <div class="shipping">Envío Express Gratis a Todo México</div>
      </div>

      <a href="${storeRedirectUrl}" class="btn">Entrar a la Boutique ARCANO</a>
      
      <div class="footer-note">
        ARCANO — Sabiduría de los Arcanos · Minerales 100% Puros Grado AAA
      </div>
    </div>
  </div>
</body>
</html>`;

  // 1. Escribir en raíz: tienda/[slug]/index.html
  const rootProductDir = path.join(ROOT_TIENDA_DIR, item.slug);
  if (!fs.existsSync(rootProductDir)) {
    fs.mkdirSync(rootProductDir, { recursive: true });
  }
  fs.writeFileSync(path.join(rootProductDir, 'index.html'), htmlContent, 'utf8');

  // 2. Escribir en public: public/tienda/[slug]/index.html
  const publicProductDir = path.join(PUBLIC_TIENDA_DIR, item.slug);
  if (!fs.existsSync(publicProductDir)) {
    fs.mkdirSync(publicProductDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicProductDir, 'index.html'), htmlContent, 'utf8');

  // 3. Escribir en out (si existe): out/tienda/[slug]/index.html
  if (fs.existsSync(OUT_TIENDA_DIR)) {
    const outProductDir = path.join(OUT_TIENDA_DIR, item.slug);
    if (!fs.existsSync(outProductDir)) {
      fs.mkdirSync(outProductDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outProductDir, 'index.html'), htmlContent, 'utf8');
  }

  generatedPagesCount++;
}

console.log(`✅ [HTML STATIC] ${generatedPagesCount} páginas estáticas pre-renderizadas generadas con éxito.`);
console.log(`📁 Rutas creadas:`);
console.log(`   - public/tienda/feed.xml`);
console.log(`   - tienda/[slug]/index.html (para repo raíz en Hostinger)`);
console.log(`   - public/tienda/[slug]/index.html (para static export de Next.js)`);
console.log(`🔮 [SSG STATIC SEO GENERATOR] Proceso finalizado al 100% sin Jerry-work.\n`);
