const https = require("https");
const fs = require("fs");
const path = require("path");

const items = [
  {
    name: "pulsera-ambar-trebol-plata.jpg",
    url: "https://quetzam.mx/cdn/shop/products/1_687ac35d-703b-4ad2-ba5f-aab4c01c89be.jpg?v=1665091103&width=800"
  },
  {
    name: "pulsera-ambar-plata-amor-por-siempre.jpg",
    url: "https://quetzam.mx/cdn/shop/products/6_0427ce2f-9622-46a8-bad0-3ba713002d7e.jpg?v=1655149040&width=800"
  },
  {
    name: "pulsera-ambar-mano-fatima-plata.jpg",
    url: "https://quetzam.mx/cdn/shop/products/3_de33fb05-ea16-4714-bf1f-d7be382fffdf.jpg?v=1649957701&width=800"
  },
  {
    name: "pulsera-ojo-tigre-verde-perlas-ambar.jpg",
    url: "https://quetzam.mx/cdn/shop/products/1_d29c2c1c-e2f2-456c-bf78-3c367caab7bf.jpg?v=1663183832&width=800"
  },
  {
    name: "pulsera-ambar-plata-arbol-de-la-vida.jpg",
    url: "https://quetzam.mx/cdn/shop/products/Image20220408151527.jpg?v=1649449589&width=800"
  },
  {
    name: "pulsera-ambar-chiapas-caricias-maternales.jpg",
    url: "https://quetzam.mx/cdn/shop/products/2_801f9ceb-474b-455a-9c08-4e67d7718b23.jpg?v=1630699664&width=800"
  },
  {
    name: "pulsera-howlita-blanca-perla-ambar.jpg",
    url: "https://quetzam.mx/cdn/shop/products/1_d62b8298-1839-4d95-a272-846c83d19d68.jpg?v=1668624958&width=800"
  },
  {
    name: "pulsera-ambar-chiapas-chips-fluviales.jpg",
    url: "https://quetzam.mx/cdn/shop/products/1_9e27dacd-895b-4c61-84f4-52b7acb7c41e.jpg?v=1653503496&width=800"
  }
];

const targetDir = path.join(__dirname, "../public/images/shop/pulseras");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });
      fileStream.on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("Downloading 8 missing amber bracelet images to public/images/shop/pulseras...");
  for (const item of items) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✓ Descargada: ${item.name} (${size} bytes)`);
    } catch (e) {
      console.error(`✗ Error descargando ${item.name}: ${e.message}`);
    }
  }
  console.log("Finalizado.");
}

run();
