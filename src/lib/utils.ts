import { brandConfig } from "@/config/brandConfig";

/**
 * Concatena clases de Tailwind filtrando valores nulos o indefinidos
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formatea un número al estándar monetario configurado (por defecto MXN)
 */
export function formatCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat(brandConfig.pricing.locale, {
      style: "currency",
      currency: brandConfig.pricing.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${brandConfig.pricing.currencySymbol}${amount} ${brandConfig.pricing.currency}`;
  }
}

/**
 * Formatea fechas al estilo editorial en español
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}
