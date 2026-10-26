import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('📸 Capturando nueva página de Dorodangos...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/tienda/dorodangos/', { waitUntil: 'networkidle2' });
  await sleep(1000);

  // 1. Hero interactivo
  const heroPath = path.join(ARTIFACT_DIR, 'dorodangos_hero_experience.png');
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`✅ Hero Dorodangos: ${heroPath}`);

  // 2. Scroll al catálogo
  await page.evaluate(() => window.scrollTo(0, 850));
  await sleep(1000);
  const catalogPath = path.join(ARTIFACT_DIR, 'dorodangos_catalog_grid.png');
  await page.screenshot({ path: catalogPath, fullPage: false });
  console.log(`✅ Catálogo Dorodangos: ${catalogPath}`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
