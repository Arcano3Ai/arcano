import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/tienda');
  await page.evaluate(() => {
    localStorage.setItem('arcano_ceremonial_cart_v1', JSON.stringify([
      { id: '1', name: 'Item 1', price: 1680, quantity: 1 },
      { id: '2', name: 'Item 2', price: 1680, quantity: 1 }
    ]));
  });
  await page.reload({ waitUntil: 'networkidle2' });
  const data = await page.evaluate(() => {
    const toRect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
    };
    const cartBtn = document.querySelector('button[aria-label="Ver carrito ceremonial"]');
    const botBtn = document.querySelector('button[aria-label="Abrir asistente de Arcanos"]');
    const waBtn = document.querySelector('aside[id="whatsapp-floating-btn"]');
    
    return {
      cart: toRect(cartBtn),
      bot: toRect(botBtn),
      wa: toRect(waBtn)
    };
  });
  console.log('Coordinates:', JSON.stringify(data, null, 2));
  await browser.close();
}

test();
