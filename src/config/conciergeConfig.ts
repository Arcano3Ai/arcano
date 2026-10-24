/**
 * conciergeConfig.ts
 * Configuración centralizada para el modelo "Concierge VIP Local" de ARCANO en Monterrey.
 * Cierre directo a WhatsApp sin pasarela de pago compleja y tracking para Google Ads.
 */

import { brandConfig } from "./brandConfig";

/**
 * Constante centralizada y fácil de editar para el número oficial de WhatsApp Concierge.
 * Formato internacional sin '+' ni espacios: ej. 528121912778
 */
export const WHATSAPP_NUMBER = brandConfig.contact.whatsappNumber || "528121912778";

/**
 * Zonas VIP de entrega concierge privada sin costo en Monterrey y área metropolitana.
 */
export const CONCIERGE_ZONES = [
  "San Pedro Garza García",
  "San Jerónimo / Colinas",
  "Cumbres (Elite / Puerta de Hierro / Sectores)",
  "Linda Vista / Contry",
  "Otra zona en Monterrey",
] as const;

export type ConciergeZone = typeof CONCIERGE_ZONES[number];

export const CONCIERGE_DEFAULT_ZONE: ConciergeZone = "San Pedro Garza García";

export interface ConciergeProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
}

export interface ConciergeWhatsAppPayload {
  product: ConciergeProduct;
  selectedZone: string;
}

/**
 * Construye dinámicamente la URL de WhatsApp con el mensaje estructurado de cierre:
 *
 * ✨ Hola ARCANO, me interesa adquirir esta pieza de su colección:
 * 💎 *Pieza:* [Nombre del Producto] ([ID/SKU])
 * 💰 *Inversión:* $[Precio] MXN
 * 📍 *Entrega Concierge en:* [Zona seleccionada]
 * 🔗 *Link de la pieza:* https://arcanosolutions.com/tienda/?item=[slug]
 * 
 * ¿Está disponible para entrega privada?
 */
export function buildConciergeWhatsAppUrl(payload: ConciergeWhatsAppPayload): string {
  const { product, selectedZone } = payload;
  const formattedPrice = Number(product.price).toLocaleString("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const sku = product.id.toUpperCase();
  const productLink = `https://arcanosolutions.com/tienda/?item=${encodeURIComponent(product.slug)}`;

  const message = `✨ Hola ARCANO, me interesa adquirir esta pieza de su colección:
💎 *Pieza:* ${product.name} (${sku})
💰 *Inversión:* $${formattedPrice} MXN
📍 *Entrega Concierge en:* ${selectedZone}
🔗 *Link de la pieza:* ${productLink}

¿Está disponible para entrega privada?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Tracking ligero para Google Ads en dataLayer antes de abrir WhatsApp.
 */
export function trackConciergeLead(payload: ConciergeWhatsAppPayload): void {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "whatsapp_concierge_lead",
      item_id: payload.product.id,
      value: payload.product.price,
      currency: "MXN",
      zona: payload.selectedZone,
    });
  }
}
