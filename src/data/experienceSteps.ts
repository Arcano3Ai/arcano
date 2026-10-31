export interface ExperienceStep {
  stepNumber: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  symbol: string;
  glyph: string;
}

export const experienceSteps: ExperienceStep[] = [
  {
    stepNumber: "01",
    title: "ELIGE TU LECTURA",
    titleEn: "CHOOSE YOUR READING",
    subtitle: "Siente cuál resonancia corresponde a tu inquietud",
    subtitleEn: "Feel which resonance aligns with your inquiry",
    description: "Recorre nuestro catálogo ceremonial y selecciona el enfoque que necesitas: un panorama general, una inmersión en vínculos afectivos, una clarificación de propósito profesional o una lectura profunda.",
    descriptionEn: "Explore our ceremonial catalog and select the focus you need: an overarching perspective, deep dive into relationships, professional clarity, or an in-depth reading.",
    symbol: "✧",
    glyph: "🜁",
  },
  {
    stepNumber: "02",
    title: "RESERVA TU MOMENTO",
    titleEn: "RESERVE YOUR TIME",
    subtitle: "Un espacio sagrado en tu calendario",
    subtitleEn: "A sacred space in your calendar",
    description: "Elige la fecha y hora que te permitan disponer de quietud ininterrumpida. Nuestro sistema agnóstico sincroniza la cita en tu huso horario sin fricciones.",
    descriptionEn: "Choose a date and time that grants you uninterrupted stillness. Our system seamlessly syncs the appointment to your local time zone.",
    symbol: "☾",
    glyph: "☉",
  },
  {
    stepNumber: "03",
    title: "CONECTA",
    titleEn: "CONNECT",
    subtitle: "El umbral del santuario",
    subtitleEn: "The threshold of the sanctuary",
    description: "Nos encontramos en una sala privada en alta definición. Comenzamos con unos instantes de silencio y respiración consciente para abrir el campo de escucha respetuosa.",
    descriptionEn: "We meet in a private HD video sanctuary. We begin with moments of silence and mindful breath to open a receptive space of deep listening.",
    symbol: "✦",
    glyph: "☽",
  },
  {
    stepNumber: "04",
    title: "RECIBE TU INTERPRETACIÓN",
    titleEn: "RECEIVE YOUR INTERPRETATION",
    subtitle: "El diálogo con los símbolos vivos",
    subtitleEn: "A dialogue with living symbols",
    description: "Las cartas se descubren sobre la mesa ceremonial. Analizamos arquetipos, relaciones cromáticas y tensiones invisibles, desentrañando el mensaje que tu presente necesita oír.",
    descriptionEn: "The cards are unveiled upon the ceremonial table. We analyze archetypes, chromatic relationships, and subtle tensions, unlocking the message your present needs to receive.",
    symbol: "◇",
    glyph: "🜂",
  },
  {
    stepNumber: "05",
    title: "REFLEXIONA",
    titleEn: "REFLECT & INTEGRATE",
    subtitle: "La sabiduría se asienta en el silencio",
    subtitleEn: "Wisdom settles into silence",
    description: "Al concluir la sesión, recibirás una fotografía de alta calidad de tu tirada y una pregunta seminal de integración para que las respuestas maduren con tus elecciones cotidianas.",
    descriptionEn: "At the conclusion of the session, you receive an HD photograph of your spread and a seminal reflection prompt so that insights mature through daily choices.",
    symbol: "🜄",
    glyph: "♁",
  },
];
