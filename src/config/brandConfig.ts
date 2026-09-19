/**
 * brandConfig.ts
 * Configuración centralizada de marca e identidad para ARCANO.
 * Permite cambiar nombre, descriptor, logotipos, colores, tipografías,
 * precios, redes sociales y contacto desde un único punto.
 */

export interface BrandConfig {
  name: string;
  descriptor: string;
  tagline: string;
  philosophicalQuote: string;
  closingQuote: string;
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string; // formato internacional sin '+' ni espacios: ej. 5215512345678
    whatsappDefaultMessage: string;
    location: string;
    hours: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    facebook?: string;
    tiktok: string;
    youtube: string;
    spotify: string;
  };
  pricing: {
    currency: string;
    currencySymbol: string;
    locale: string;
  };
  booking: {
    provider: "native" | "calendly" | "calcom";
    calendlyUrl?: string;
    calcomUrl?: string;
  };
  legal: {
    companyLegalName: string; // Placeholder editable
    taxId: string; // RFC o ID fiscal placeholder
    address: string;
    lastUpdated: string;
  };
}

export const brandConfig: BrandConfig = {
  name: "ARCANO",
  descriptor: "Sabiduría de los Arcanos",
  tagline: "Descubre lo que los símbolos pueden revelar sobre tu camino.",
  philosophicalQuote:
    "Hay preguntas que no necesitan una respuesta inmediata. Necesitan ser observadas desde otra perspectiva.",
  closingQuote:
    "Quizá la pregunta no sea qué va a suceder. Quizá sea qué estás preparado para ver.",
  contact: {
    email: "consultas@arcanosolutions.com",
    phone: "+52 (81) 2191-2778",
    whatsappNumber: "5218121912778",
    whatsappDefaultMessage:
      "Hola ARCANO, deseo consultar sobre una lectura privada.",
    location: "Santuario Digital & Sesiones Privadas",
    hours: "Lunes a Sábado · Con cita previa",
  },
  social: {
    instagram: "https://www.instagram.com/arcanosabiduria/",
    instagramHandle: "@arcanosabiduria",
    facebook: "https://www.facebook.com/profile.php?id=61594271284117",
    tiktok: "https://www.facebook.com/profile.php?id=61594271284117",
    youtube: "https://www.facebook.com/profile.php?id=61594271284117",
    spotify: "https://spotify.com/show/arcanopodcast",
  },
  pricing: {
    currency: "MXN",
    currencySymbol: "$",
    locale: "es-MX",
  },
  booking: {
    provider: "native",
    calendlyUrl: "https://calendly.com/arcanotarot/sesion",
    calcomUrl: "https://cal.com/arcanotarot/sesion",
  },
  legal: {
    companyLegalName: "[Razón Social / Titular - ARCANO]",
    taxId: "[RFC / Identificación Fiscal]",
    address: "[Ciudad de México / Modalidad Online Global]",
    lastUpdated: "Septiembre 2026",
  },
};

/**
 * Generador de enlace directo a WhatsApp con mensaje codificado
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(
    customMessage || brandConfig.contact.whatsappDefaultMessage
  );
  return `https://wa.me/${brandConfig.contact.whatsappNumber}?text=${message}`;
}
