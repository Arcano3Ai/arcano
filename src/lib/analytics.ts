/**
 * Capa de eventos de analítica agnóstica y respetuosa de la privacidad.
 * Permite conectar Google Analytics (gtag), Google Ads (AW-18219380453), Meta Pixel y GTM.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsEvent =
  | { name: "view_service"; params: { serviceId: string; serviceName: string; price: number } }
  | { name: "click_booking"; params: { serviceId?: string; source: string } }
  | { name: "submit_contact"; params: { subject: string } }
  | { name: "daily_card_reveal"; params: { cardSlug: string; cardName: string } }
  | { name: "click_whatsapp"; params: { source: string; value?: number; currency?: string } }
  | { name: "generate_lead"; params: { source: string; value?: number; currency?: string } }
  | { name: "newsletter_signup"; params: { location: string } };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Registrar en consola de desarrollo con estilo místico discreto
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[ARCANO Analytics] ✦ ${event.name}`, event.params);
  }

  // Integración con dataLayer / gtag si está configurado
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: event.name,
      ...event.params,
    });
  }

  // Disparo a gtag directo si está disponible
  if (typeof window.gtag === "function") {
    window.gtag("event", event.name, event.params);
  }
}

/**
 * Disparador de conversión específico para WhatsApp y Google Ads (Demand Gen)
 * Optimizado para ser detectado por Google Tag Assistant, GTM Triggers y el algoritmo de puja de Google Ads.
 */
export function trackWhatsAppConversion(params: {
  source: string;
  value?: number;
  currency?: string;
  item_name?: string;
}): void {
  if (typeof window === "undefined") return;

  const value = params.value ?? 1299;
  const currency = params.currency ?? "MXN";
  const source = params.source;
  const itemName = params.item_name ?? "Pulsera de Lapislázuli Invierno";

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[Google Ads Conversion] ✦ WhatsApp click: ${source} - $${value} ${currency}`);
  }

  // 1. DataLayer Push (detectable por cualquier Trigger de GTM)
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "click_whatsapp",
      event_category: "conversion",
      event_label: source,
      value: value,
      currency: currency,
      item_name: itemName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    window.dataLayer.push({
      event: "generate_lead",
      event_category: "lead",
      event_label: source,
      value: value,
      currency: currency,
    });
  }

  // 2. Google Tag (gtag.js) directo a cuenta AW-18219380453
  if (typeof window.gtag === "function") {
    window.gtag("event", "click_whatsapp", {
      event_category: "engagement",
      event_label: source,
      value: value,
      currency: currency,
      item_name: itemName,
    });

    window.gtag("event", "generate_lead", {
      event_category: "lead",
      event_label: source,
      value: value,
      currency: currency,
    });

    // Evento de conversión explícito de Google Ads
    window.gtag("event", "conversion", {
      send_to: "AW-18219380453",
      value: value,
      currency: currency,
      transaction_id: `lead_${Date.now()}`,
    });
  }
}
