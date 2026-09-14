export interface TarotistProfile {
  name: string;
  role: string;
  specialty: string;
  experienceYears: string;
  philosophy: string;
  bio: string[];
  certifications: string[];
  social: {
    instagram?: string;
    substack?: string;
  };
  imagePlaceholder: {
    alt: string;
    caption: string;
    aspectRatio: string;
    imageUrl: string;
  };
  sacredTitles?: string[];
}

export const tarotistProfile: TarotistProfile = {
  name: "El Señor de los Arcanos",
  role: "Lector y Custodio de los Símbolos",
  sacredTitles: [
    "El Maestro",
    "El Guía",
    "Custodio de los Símbolos",
  ],
  specialty: "Tarot Simbólico, Mitología Comparada y Hermetismo Tradicional",
  experienceYears: "Más de 12 años de consagración ceremonial y estudio continuo",
  philosophy:
    "El tarot no posee una verdad absoluta sobre tu futuro; posee la capacidad prodigiosa de recordarte quién eres cuando el ruido del mundo nubla tu juicio. Cada tirada es una conversación sagrada con tu propia alma.",
  bio: [
    "Iniciado en la tradición de los símbolos arcanos y las artes contemplativas, concibo la lectura como un ritual de escucha profunda, silencio y apertura consciente, jamás como un espectáculo adivinatorio.",
    "A través del fuego, el sahumerio y el respeto reverente hacia el consultante, facilito un espacio sagrado donde las preguntas más difíciles pueden respirar despojadas de juicios.",
    "Mi aproximación integra la psicología profunda de los arquetipos, la filosofía hermética occidental y una mirada ética inquebrantable sobre el libre albedrío.",
  ],
  certifications: [
    "Estudios en Simbología y Mitología Arquetípica Tradicional",
    "Práctica Ceremonial y Filosofía Hermética Occidental",
    "Código ético de confidencialidad estricta y respeto al libre albedrío",
  ],
  social: {
    instagram: "https://instagram.com/arcanotarot",
    substack: "https://arcanotarot.substack.com",
  },
  imagePlaceholder: {
    alt: "El Señor de los Arcanos, lector y custodio de los símbolos en el santuario de ARCANO",
    caption: "El Señor de los Arcanos · Presencia ceremonial, ojos del oráculo y sabiduría arcana",
    aspectRatio: "1/1",
    imageUrl: "/images/malachai-perfil.gif",
  },
};
