import { brandConfig } from "@/config/brandConfig";

/**
 * Concatena clases de Tailwind filtrando valores nulos o indefinidos
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Retorna la ruta completa de un asset considerando el basePath en GitHub Pages o dominio personalizado
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  // 1. Limpiar la ruta para prevenir duplicados de /arcano
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  while (cleanPath.startsWith("/arcano/")) {
    cleanPath = cleanPath.slice(7);
  }
  if (cleanPath === "/arcano") {
    cleanPath = "/";
  }

  // 2. Detección precisa en navegador (evita romper dominios personalizados como arcanosolutions.com)
  if (typeof window !== "undefined") {
    const { pathname, hostname } = window.location;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");
    const isCustomDomain = !isLocal && !hostname.endsWith(".github.io");

    // En localhost o dominio propio (ej. arcanosolutions.com), los assets se sirven desde la raíz
    if (isLocal || isCustomDomain) {
      return cleanPath;
    }

    // En GitHub Pages bajo subdirectorio /arcano
    if (pathname.startsWith("/arcano/") || pathname === "/arcano") {
      return `/arcano${cleanPath}`;
    }

    return cleanPath;
  }

  // 3. En SSR / Compilación estática
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (envBasePath && envBasePath !== "" && envBasePath !== "/") {
    const cleanEnvBase = envBasePath.endsWith("/") ? envBasePath.slice(0, -1) : envBasePath;
    return `${cleanEnvBase}${cleanPath}`;
  }

  return cleanPath;
}

/**
 * Recuperador automático ante fallos de carga de imágenes (404 por desfase de basePath):
 * Si la imagen falló con /arcano/, reintenta inmediatamente en raíz /.
 * Si falló en raíz /, reintenta bajo /arcano/.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (!target || target.dataset.fallbackTried) return;
  target.dataset.fallbackTried = "true";

  try {
    const currentSrc = target.currentSrc || target.src;
    if (!currentSrc) return;

    const isBrowser = typeof window !== "undefined";
    const hostname = isBrowser ? window.location.hostname : "www.arcanosolutions.com";
    const isGitHubPages = hostname.endsWith(".github.io");
    const isApexDomain = hostname === "arcanosolutions.com";

    const url = new URL(currentSrc, isBrowser ? window.location.href : "https://www.arcanosolutions.com");

    // Si venía de arcanosolutions.com sin www, normalizar a www para evitar redirecciones 308
    if (isApexDomain || url.hostname === "arcanosolutions.com") {
      url.hostname = "www.arcanosolutions.com";
      target.src = url.toString();
      return;
    }

    // Si falló un asset .webp, intentar el equivalente en .jpg
    if (url.pathname.endsWith(".webp")) {
      url.pathname = url.pathname.replace(/\.webp$/, ".jpg");
      target.src = url.toString();
      return;
    }

    // Si tiene /arcano/ pero NO estamos en subdirectorio de GitHub Pages, quitarlo inmediatamente
    if (url.pathname.includes("/arcano/") && !isGitHubPages) {
      url.pathname = url.pathname.replace(/\/arcano\//g, "/");
      target.src = url.toString();
      return;
    }

    // ÚNICAMENTE en GitHub Pages se permite el fallback a subdirectorio /arcano/
    if (isGitHubPages && !url.pathname.startsWith("/arcano/")) {
      url.pathname = `/arcano${url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`}`;
      target.src = url.toString();
      return;
    }
  } catch {
    // Si la manipulación de URL falla, asegurar limpieza básica
    if (target.src && target.src.includes("/arcano/")) {
      target.src = target.src.replace("/arcano/", "/");
    }
  }
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
