import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const promoDir = path.join(projectRoot, 'promocion');

if (!fs.existsSync(promoDir)) {
  fs.mkdirSync(promoDir, { recursive: true });
}

// Buscar ejecutable de Chrome o Edge
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let executablePath = chromePaths.find(p => fs.existsSync(p));
if (!executablePath) {
  console.error('No se encontró ejecutable de Chrome o Edge');
  process.exit(1);
}
console.log(`Usando navegador en: ${executablePath}`);

const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--hide-scrollbars'
    ]
  });

  const baseUrl = 'http://localhost:3000';

  console.log('Iniciando sesión de capturas promocionales...');

  // 1. DESKTOP SESSION (1920x1080 @ 2x Scale)
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2
  });

  // Lista de capturas de escritorio
  const desktopTasks = [
    {
      name: '01_landing_hero_desktop.png',
      url: `${baseUrl}/`,
      fullPage: false,
      waitMs: 3000,
      description: 'Landing Page - Hero y cabecera mística'
    },
    {
      name: '02_landing_completa_desktop.png',
      url: `${baseUrl}/`,
      fullPage: true,
      waitMs: 2500,
      description: 'Landing Page - Recorrido visual completo'
    },
    {
      name: '03_carta_del_dia_oraculo.png',
      url: `${baseUrl}/carta-del-dia`,
      fullPage: false,
      waitMs: 2500,
      description: 'Carta del Día - Vista inicial previa a revelar'
    },
    {
      name: '04_carta_del_dia_revelada.png',
      url: `${baseUrl}/carta-del-dia`,
      fullPage: false,
      action: async (p) => {
        // Clic en la carta o botón para revelar
        const cardSelector = 'button, div[role="button"], .perspective-1000, [class*="cursor-pointer"]';
        try {
          const btn = await p.$(cardSelector);
          if (btn) {
            await btn.click();
            await wait(2000); // esperar animación 3D
          }
        } catch (e) {
          console.warn('No se pudo hacer clic para revelar:', e.message);
        }
      },
      waitMs: 2500,
      description: 'Carta del Día - Carta revelada con interpretación'
    },
    {
      name: '05_galeria_arcanos.png',
      url: `${baseUrl}/arcanos`,
      fullPage: false,
      waitMs: 2500,
      description: 'Enciclopedia de Arcanos - Galería de Arquetipos'
    },
    {
      name: '06_lecturas_servicios.png',
      url: `${baseUrl}/lecturas`,
      fullPage: false,
      waitMs: 2500,
      description: 'Lecturas y Consultas - Catálogo de Servicios'
    },
    {
      name: '07_academia_tarot.png',
      url: `${baseUrl}/academia`,
      fullPage: false,
      waitMs: 2500,
      description: 'Academia ARCANO - Formación Esotérica y Cursos'
    },
    {
      name: '08_tienda_esoterica.png',
      url: `${baseUrl}/tienda`,
      fullPage: false,
      waitMs: 2500,
      description: 'Tienda ARCANO - Mazos sagrados y artefactos'
    },
    {
      name: '09_tarot_del_amor.png',
      url: `${baseUrl}/tarot-del-amor`,
      fullPage: false,
      waitMs: 2500,
      description: 'Tarot del Amor - Dinámicas vinculares'
    },
    {
      name: '10_tarot_profesional.png',
      url: `${baseUrl}/tarot-profesional`,
      fullPage: false,
      waitMs: 2500,
      description: 'Tarot Profesional - Propósito y vocación'
    }
  ];

  for (const task of desktopTasks) {
    console.log(`Capturando Desktop: ${task.name} (${task.description})...`);
    try {
      await page.goto(task.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await wait(task.waitMs || 2000);
      if (task.action) {
        await task.action(page);
      }
      const filePath = path.join(promoDir, task.name);
      await page.screenshot({
        path: filePath,
        fullPage: task.fullPage
      });
      console.log(`✓ Guardado: ${task.name}`);
    } catch (err) {
      console.error(`✗ Error en ${task.name}:`, err.message);
    }
  }

  // 2. MOBILE SESSIONS (430x932 iPhone 15 Pro Max @ 3x Scale - Stories / Social Media)
  console.log('Iniciando sesión de capturas Mobile (Vertical para Redes/Promoción)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  const mobileTasks = [
    {
      name: '11_mobile_landing_hero.png',
      url: `${baseUrl}/`,
      fullPage: false,
      waitMs: 2500,
      description: 'Móvil - Landing Hero (Vertical)'
    },
    {
      name: '12_mobile_carta_del_dia.png',
      url: `${baseUrl}/carta-del-dia`,
      fullPage: false,
      action: async (p) => {
        try {
          const btn = await p.$('button, div[role="button"], .perspective-1000, [class*="cursor-pointer"]');
          if (btn) {
            await btn.click();
            await wait(2000);
          }
        } catch (e) {
          console.warn('Error click móvil:', e.message);
        }
      },
      waitMs: 2500,
      description: 'Móvil - Carta del Día revelada'
    },
    {
      name: '13_mobile_academia.png',
      url: `${baseUrl}/academia`,
      fullPage: false,
      waitMs: 2500,
      description: 'Móvil - Academia ARCANO'
    },
    {
      name: '14_mobile_tienda.png',
      url: `${baseUrl}/tienda`,
      fullPage: false,
      waitMs: 2500,
      description: 'Móvil - Tienda Esotérica'
    }
  ];

  for (const task of mobileTasks) {
    console.log(`Capturando Móvil: ${task.name} (${task.description})...`);
    try {
      await mobilePage.goto(task.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await mobilePage.evaluate(() => document.fonts && document.fonts.ready);
      await wait(task.waitMs || 2000);
      if (task.action) {
        await task.action(mobilePage);
      }
      const filePath = path.join(promoDir, task.name);
      await mobilePage.screenshot({
        path: filePath,
        fullPage: task.fullPage
      });
      console.log(`✓ Guardado: ${task.name}`);
    } catch (err) {
      console.error(`✗ Error en ${task.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('¡Todas las capturas promocionales han sido generadas con éxito en /promocion!');
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
