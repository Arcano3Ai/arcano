/**
 * src/lib/googleMapsLoader.ts
 * Loader idempotente para Google Maps JavaScript API.
 * Previene descargas duplicadas de scripts y gestiona concurrencia con un Singleton Promise.
 */

let googleMapsPromise: Promise<typeof google> | null = null;

export interface GoogleMapsLoaderOptions {
  apiKey: string;
  libraries?: string[];
  language?: string;
  region?: string;
}

export function loadGoogleMaps({
  apiKey,
  libraries = ['places', 'geometry'],
  language = 'es',
  region = 'MX',
}: GoogleMapsLoaderOptions): Promise<typeof google> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps solo puede cargarse en el cliente (navegador).'));
  }

  // 1. Si ya está cargado globalmente en window
  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  // 2. Si ya hay una promesa en curso, devolver la misma
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // 3. Crear nueva promesa de carga
  googleMapsPromise = new Promise((resolve, reject) => {
    if (!apiKey) {
      reject(new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no está definida o está vacía.'));
      return;
    }

    const scriptId = 'google-maps-api-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.google?.maps) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps cargó pero window.google.maps no está disponible.'));
        }
      });
      existingScript.addEventListener('error', () => {
        googleMapsPromise = null;
        reject(new Error('Error al cargar Google Maps script existente.'));
      });
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;

    const libs = libraries.join(',');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=${encodeURIComponent(libs)}&language=${encodeURIComponent(
      language
    )}&region=${encodeURIComponent(region)}&solution_channel=GMP_QB_commutes_v3_c`;

    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google);
      } else {
        googleMapsPromise = null;
        reject(new Error('Google Maps cargó pero window.google.maps no está inicializado.'));
      }
    };

    script.onerror = () => {
      googleMapsPromise = null;
      script.remove();
      reject(new Error('Fallo de conexión o clave inválida al cargar Google Maps API.'));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}
