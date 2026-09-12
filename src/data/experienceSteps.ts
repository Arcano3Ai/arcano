export interface ExperienceStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  glyph: string;
}

export const experienceSteps: ExperienceStep[] = [
  {
    stepNumber: "01",
    title: "ELIGE TU LECTURA",
    subtitle: "Siente cuál resonancia corresponde a tu inquietud",
    description: "Recorre nuestro catálogo ceremonial y selecciona el enfoque que necesitas: un panorama general, una inmersión en vínculos afectivos, una clarificación de propósito profesional o una lectura profunda.",
    symbol: "✧",
    glyph: "🜁",
  },
  {
    stepNumber: "02",
    title: "RESERVA TU MOMENTO",
    subtitle: "Un espacio sagrado en tu calendario",
    description: "Elige la fecha y hora que te permitan disponer de quietud ininterrumpida. Nuestro sistema agnóstico sincroniza la cita en tu huso horario sin fricciones.",
    symbol: "☾",
    glyph: "☉",
  },
  {
    stepNumber: "03",
    title: "CONECTA",
    subtitle: "El umbral del santuario",
    description: "Nos encontramos en una sala privada en alta definición. Comenzamos con unos instantes de silencio y respiración consciente para abrir el campo de escucha respetuosa.",
    symbol: "✦",
    glyph: "☽",
  },
  {
    stepNumber: "04",
    title: "RECIBE TU INTERPRETACIÓN",
    subtitle: "El diálogo con los símbolos vivos",
    description: "Las cartas se descubren sobre la mesa ceremonial. Analizamos arquetipos, relaciones cromáticas y tensiones invisibles, desentrañando el mensaje que tu presente necesita oír.",
    symbol: "◇",
    glyph: "🜂",
  },
  {
    stepNumber: "05",
    title: "REFLEXIONA",
    subtitle: "La sabiduría se asienta en el silencio",
    description: "Al concluir la sesión, recibirás una fotografía de alta calidad de tu tirada y una pregunta seminal de integración para que las respuestas maduren con tus elecciones cotidianas.",
    symbol: "🜄",
    glyph: "♁",
  },
];
