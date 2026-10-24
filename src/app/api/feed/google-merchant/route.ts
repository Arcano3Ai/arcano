import { NextResponse } from "next/server";
import { siteConfig } from "@/config/siteConfig";
import { brandConfig } from "@/config/brandConfig";
import { shopProducts, ShopProduct } from "@/data/shop";

// Escape de caracteres especiales para XML seguro
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Limpieza de descripciones para cumplir políticas de Google Merchant Center
function cleanDescription(product: ShopProduct): string {
  const parts: string[] = [];
  if (product.tagline) parts.push(product.tagline);
  if (product.description) parts.push(product.description);
  if (product.arcanoStory) parts.push(product.arcanoStory);
  if (product.details && product.details.length > 0) {
    parts.push("Especificaciones: " + product.details.join(" · "));
  }
  
  const text = parts.join(" — ").trim();
  // Google permite hasta 5,000 caracteres en g:description
  return text.slice(0, 4900);
}

// Determinar categoría exacta de Google Product Taxonomy
function getGoogleCategory(product: ShopProduct): string {
  // 188 = Apparel & Accessories > Jewelry
  // 200 = Apparel & Accessories > Jewelry > Bracelets
  if (
    product.categoryId === "coleccion-arcanos" ||
    product.categoryId === "talismanes" ||
    product.categoryId === "alta-joyeria-oro" ||
    product.categoryId === "ambar-chiapas"
  ) {
    return "200"; // Bracelets
  }
  if (
    product.categoryId === "portainciensos-y-runas" ||
    product.categoryId === "doble-perforacion" ||
    product.categoryId === "sahumerios-y-kits" ||
    product.categoryId === "duos"
  ) {
    return "6388"; // Home & Garden > Decor > Home Fragrances > Incense Holders
  }
  return "188"; // Jewelry general
}

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/+$/, "");
  const buildDate = new Date().toUTCString();

  const xmlItems = shopProducts
    .map((product) => {
      const productUrl = `${baseUrl}/tienda?product=${encodeURIComponent(product.slug || product.id)}`;
      const rawImageUrl = product.imageUrl.startsWith("http")
        ? product.imageUrl
        : `${baseUrl}${product.imageUrl.startsWith("/") ? "" : "/"}${product.imageUrl}`;
      const imageUrl = escapeXml(rawImageUrl);

      const secondaryImageUrl = product.secondaryImageUrl
        ? escapeXml(
            product.secondaryImageUrl.startsWith("http")
              ? product.secondaryImageUrl
              : `${baseUrl}${product.secondaryImageUrl.startsWith("/") ? "" : "/"}${product.secondaryImageUrl}`
          )
        : null;

      const description = cleanDescription(product);
      const googleCategory = getGoogleCategory(product);
      const formattedPrice = `${product.price.toFixed(2)} MXN`;
      const availability = product.inStock ? "in_stock" : "out_of_stock";

      // g:identifier_exists: "no" es OBLIGATORIO para piezas artesanales
      // para evitar que Google rechace los productos por no tener código GTIN/EAN/UPC comercial.
      return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      ${secondaryImageUrl ? `<g:additional_image_link>${secondaryImageUrl}</g:additional_image_link>` : ""}
      <g:availability>${availability}</g:availability>
      <g:price>${formattedPrice}</g:price>
      <g:brand>${escapeXml(brandConfig.name)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type><![CDATA[Joyería & Altar > ${product.categoryName || "Talismanes"}]]></g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>MX</g:country>
        <g:service>Envío Express México</g:service>
        <g:price>0.00 MXN</g:price>
      </g:shipping>
      <g:custom_label_0>${escapeXml(product.categoryId || "general")}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(product.stoneType || product.arcanoNumber || "mineral")}</g:custom_label_1>
      <g:custom_label_2>${product.featured ? "destacado" : "regular"}</g:custom_label_2>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(brandConfig.name)} — ${escapeXml(brandConfig.descriptor)}</title>
    <link>${baseUrl}</link>
    <description>Feed oficial de productos para Google Merchant Center, Campañas de Generación de Demanda y Shopping de ARCANO.</description>
    <lastBuildDate>${buildDate}</lastBuildDate>
${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
