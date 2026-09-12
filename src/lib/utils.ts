import { brandConfig } from "@/config/brandConfig";

/**
 * Concatena clases de Tailwind filtrando valores nulos o indefinidos
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Retorna la ruta completa de un asset considerando el basePath en GitHub Pages
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (envBasePath) {
    return `${envBasePath}${cleanPath}`;
  }
  if (typeof window !== "undefined" && (window.location.pathname.startsWith("/arcano") || window.location.hostname.includes("github.io"))) {
    return `/arcano${cleanPath}`;
  }
  return cleanPath;
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
