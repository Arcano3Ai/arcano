import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/sergi/.gemini/antigravity-ide/brain/9950cc5a-3005-46df-a4fb-d06daf120bc5';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('🧪 Probando disposición visual del Carrito y Bot...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/tienda', { waitUntil: 'networkidle2' });

  // Inyectar 2 artículos en localStorage para simular exactamente el estado de la foto del usuario
  await page.evaluate(() => {
    const mockCart = [
      {
        id: "talisman-el-loco",
        productId: "talisman-el-loco",
        name: "Pulsera El Loco · Turquesa",
        price: 1680,
        quantity: 1,
        imageUrl: "/images/shop/pulseras/el-loco-pulsera.jpg",
        categoryName: "Talismanes"
      },
      {
        id: "talisman-el-mago",
        productId: "talisman-el-mago",
        name: "Pulsera El Mago · Lapis Lázuli",
        price: 1680,
        quantity: 1,
        imageUrl: "/images/shop/pulseras/el-mago-pulsera.jpg",
        categoryName: "Talismanes"
      }
    ];
    localStorage.setItem("arcano_ceremonial_cart_v1", JSON.stringify(mockCart));
  });

  // Recargar para que CartContext cargue los artículos
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1200);

  // Captura de la esquina inferior derecha mostrando el stack vertical perfecto
  const shotPath = path.join(ARTIFACT_DIR, 'verify_cart_and_bot_fixed.png');
  await page.screenshot({
    path: shotPath,
    clip: {
      x: 1100,
      y: 650,
      width: 340,
      height: 250
    }
  });

  console.log(`✅ Captura generada en: ${shotPath}`);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
