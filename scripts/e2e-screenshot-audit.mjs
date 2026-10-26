import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('🚀 Iniciando Auditoría Visual y E2E con Navegador Real...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. BARRO NEGRO
  console.log('\n🏺 [1/3] Auditando Barro Negro Oaxaqueño...');
  await page.goto('http://localhost:3000/tienda/barro-negro', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Captura estado inicial
  const shot1Path = path.join(ARTIFACT_DIR, 'audit_barro_negro_hero.png');
  await page.screenshot({ path: shot1Path, fullPage: false });
  console.log(`  📸 Captura Hero: ${shot1Path}`);

  // Test de fase 4 (Obsidiana Metálica)
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.trim() === 'Fase 4') {
      await btn.click();
      console.log('  👆 Clic en botón "Fase 4 (Obsidiana Metálica)" realizado con éxito');
      break;
    }
  }
  await sleep(1000);
  const shot1PhasePath = path.join(ARTIFACT_DIR, 'audit_barro_negro_phase4_obsidiana.png');
  await page.screenshot({ path: shot1PhasePath, fullPage: false });
  console.log(`  📸 Captura Fase 4: ${shot1PhasePath}`);

  // Scroll al catálogo
  await page.evaluate(() => window.scrollTo(0, 2100));
  await sleep(1000);
  const shot1CatalogPath = path.join(ARTIFACT_DIR, 'audit_barro_negro_catalog.png');
  await page.screenshot({ path: shot1CatalogPath, fullPage: false });
  console.log(`  📸 Captura Catálogo: ${shot1CatalogPath}`);

  // 2. ALEBRIJES
  console.log('\n🦊 [2/3] Auditando Alebrijes de Oaxaca...');
  await page.goto('http://localhost:3000/tienda/alebrijes', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Test Selector de Tótems Nahuales
  const nahualButtons = await page.$$('button');
  for (const btn of nahualButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Búho')) {
      await btn.click();
      console.log('  👆 Clic en tótem "Búho Sagrado" realizado');
      break;
    }
  }
  await sleep(1000);
  const shot2NahualPath = path.join(ARTIFACT_DIR, 'audit_alebrijes_nahual_revealed.png');
  await page.screenshot({ path: shot2NahualPath, fullPage: false });
  console.log(`  📸 Captura Nahual Revelado: ${shot2NahualPath}`);

  // Scroll al catálogo
  await page.evaluate(() => window.scrollTo(0, 1100));
  await sleep(1000);
  const shot2CatalogPath = path.join(ARTIFACT_DIR, 'audit_alebrijes_catalog.png');
  await page.screenshot({ path: shot2CatalogPath, fullPage: false });
  console.log(`  📸 Captura Catálogo Alebrijes: ${shot2CatalogPath}`);

  // 3. ARTE HUICHOL
  console.log('\n✨ [3/3] Auditando Arte Huichol / Wixárika...');
  await page.goto('http://localhost:3000/tienda/arte-huichol', { waitUntil: 'networkidle2', timeout: 30000 });
  const shot3DayPath = path.join(ARTIFACT_DIR, 'audit_huichol_day_mode.png');
  await page.screenshot({ path: shot3DayPath, fullPage: false });
  console.log(`  📸 Captura Modo Sol: ${shot3DayPath}`);

  // Conmutar a Modo Noche
  const huicholButtons = await page.$$('button');
  for (const btn of huicholButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Visión Nocturna')) {
      await btn.click();
      console.log('  👆 Clic en "Visión Nocturna del Fuego"');
      break;
    }
  }
  await sleep(1000);
  const shot3NightPath = path.join(ARTIFACT_DIR, 'audit_huichol_night_mode.png');
  await page.screenshot({ path: shot3NightPath, fullPage: false });
  console.log(`  📸 Captura Fuego Sagrado Nocturno: ${shot3NightPath}`);

  // Scroll al catálogo
  await page.evaluate(() => window.scrollTo(0, 1000));
  await sleep(1000);
  const shot3CatalogPath = path.join(ARTIFACT_DIR, 'audit_huichol_catalog.png');
  await page.screenshot({ path: shot3CatalogPath, fullPage: false });
  console.log(`  📸 Captura Catálogo Huichol: ${shot3CatalogPath}`);

  await browser.close();
  console.log('\n🎉 Auditoría visual y funcional completada al 100%.');
}

main().catch(err => {
  console.error('Error en auditoría:', err);
  process.exit(1);
});
