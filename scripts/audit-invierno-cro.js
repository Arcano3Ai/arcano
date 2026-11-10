const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PORT = 3456;
const OUT_DIR = path.join(__dirname, 'out');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// Servidor de archivos estáticos simple para servir 'out'
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(OUT_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(OUT_DIR, reqPath + '.html');
  }

  if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: EDGE_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    // Emular celular iPhone 14 / estándar mobile (390 x 844)
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });

    await page.goto(`http://localhost:${PORT}/invierno/`, {
      waitUntil: 'networkidle2',
      timeout: 15000
    });

    // 1. Auditoría de elementos prohibidos (Fugas CRO)
    const auditData = await page.evaluate(() => {
      const header = document.querySelector('header');
      const globalNav = document.querySelector('nav[aria-label="Navegación móvil inferior"]');
      const cartBtn = document.querySelector('button[aria-label="Ver carrito ceremonial"]');
      const stickyCta = document.querySelector('#sticky-mobile-cta a');
      const whatsappLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => a.href);

      return {
        hasGlobalHeader: !!document.querySelector('header.fixed'),
        hasGlobalBottomNav: !!globalNav,
        hasFloatingCart: !!cartBtn,
        stickyCtaHref: stickyCta ? stickyCta.href : null,
        whatsappLinksCount: whatsappLinks.length,
        firstWhatsappLink: whatsappLinks[0] || null
      };
    });

    console.log('AUDIT RESULT:', JSON.stringify(auditData, null, 2));

    const artifactDir = path.resolve('C:/Users/sergi/.gemini/antigravity/brain/d27c6168-04b1-4d3b-b4eb-808772da4512');

    // Captura 1: Hero móvil (above the fold)
    await page.screenshot({
      path: path.join(artifactDir, 'audit_invierno_hero_mobile.png'),
      fullPage: false
    });

    // Captura 2: Scroll medio (beneficios de alta joyería y qué incluye)
    await page.evaluate(() => window.scrollTo(0, 900));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(artifactDir, 'audit_invierno_benefits_mobile.png'),
      fullPage: false
    });

    // Captura 3: Página completa
    await page.screenshot({
      path: path.join(artifactDir, 'audit_invierno_fullpage_mobile.png'),
      fullPage: true
    });

    console.log('Screenshots guardadas con éxito.');
    await browser.close();
  } catch (err) {
    console.error('Error during audit:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});