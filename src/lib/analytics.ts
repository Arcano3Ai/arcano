/**
 * Capa de eventos de analítica agnóstica y respetuosa de la privacidad.
 * Permite conectar Google Analytics (gtag), Meta Pixel o PostHog sin acoplar componentes.
 */

type AnalyticsEvent =
  | { name: "view_service"; params: { serviceId: string; serviceName: string; price: number } }
  | { name: "click_booking"; params: { serviceId?: string; source: string } }
  | { name: "submit_contact"; params: { subject: string } }
  | { name: "daily_card_reveal"; params: { cardSlug: string; cardName: string } }
  | { name: "click_whatsapp"; params: { source: string } }
  | { name: "newsletter_signup"; params: { location: string } };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Registrar en consola de desarrollo con estilo místico discreto
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[ARCANO Analytics] ✦ ${event.name}`, event.params);
  }

  // Integración con dataLayer / gtag si está configurado
  if (typeof (window as unknown as { dataLayer?: unknown[] }).dataLayer !== "undefined") {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: event.name,
      ...event.params,
    });
  }
}
