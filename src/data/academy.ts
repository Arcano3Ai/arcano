export type AcademyCategoryId =
  | "tarot"
  | "astrologia"
  | "numerologia"
  | "reiki";

export type FutureAcademyCategoryId =
  | "angeles-oraculos"
  | "cristales-piedras"
  | "pendulo-radiestesia"
  | "lectura-manos"
  | "feng-shui"
  | "meditacion"
  | "registros-akashicos"
  | "suenos-simbolismo"
  | "manifestacion"
  | "chakras";

export interface AcademyCategory {
  id: AcademyCategoryId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  glyph: string;
  badge: string;
  idealFor: string;
  activeCount: number;
}

export interface FutureDiscipline {
  id: FutureAcademyCategoryId;
  title: string;
  description: string;
  glyph: string;
  status: "proximamente" | "en_desarrollo";
}

export interface AcademyCourse {
  id: string;
  category: AcademyCategoryId;
  categoryName: string;
  level: number;
  romanLevel: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  currency: string;
  formattedPrice: string;
  tag?: string;
  badge?: string;
  isSpecialPromotionTrigger?: boolean;
  webUnlockLevel?: boolean;
  specialTags?: string[];
  countsForPromotion: boolean;
  duration: string;
  lessonsCount: string;
  content: string[];
  glyph: string;
  cardImage: string;
  ctaText: string;
  idealFor?: string;
  featured?: boolean;
}

export interface LearningBenefit {
  id: string;
  title: string;
  description: string;
  glyph: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface AcademyFaqItem {
  question: string;
  answer: string;
}

// ============================================================
// 1. CATEGORÍAS ACTIVAS (4 GRANDES DISCIPLINAS)
// ============================================================
export const academyCategories: AcademyCategory[] = [
  {
    id: "tarot",
    title: "TAROT",
    subtitle: "El lenguaje arquetípico de los 78 Arcanos",
    description:
      "Aprende a interpretar los Arcanos, comprender sus símbolos y desarrollar tu capacidad de lectura.",
    icon: "🎴",
    glyph: "✦",
    badge: "6 NIVELES",
    idealFor: "Para quienes desean aprender interpretación simbólica y lecturas.",
    activeCount: 6,
  },
  {
    id: "astrologia",
    title: "ASTROLOGÍA",
    subtitle: "El mapa cósmico de planetas, signos y casas",
    description:
      "Descubre el lenguaje de los astros, los signos, los planetas y la carta natal.",
    icon: "🪐",
    glyph: "☉",
    badge: "5 NIVELES",
    idealFor: "Para quienes desean comprender signos, planetas y cartas natales.",
    activeCount: 5,
  },
  {
    id: "numerologia",
    title: "NUMEROLOGÍA",
    subtitle: "La vibración sagrada y los ciclos del ser",
    description:
      "Descubre el simbolismo de los números y aprende a interpretar sus ciclos y significados.",
    icon: "🔢",
    glyph: "⬡",
    badge: "5 NIVELES",
    idealFor: "Para quienes desean estudiar el simbolismo de los números.",
    activeCount: 5,
  },
  {
    id: "reiki",
    title: "REIKI Y ENERGÍA",
    subtitle: "Bienestar energético y conexión interior",
    description:
      "Explora prácticas de bienestar energético, meditación, respiración y conexión interior.",
    icon: "✨",
    glyph: "✺",
    badge: "5 NIVELES",
    idealFor: "Para quienes desean explorar prácticas de bienestar y conexión interior.",
    activeCount: 5,
  },
];

// ============================================================
// 2. FUTURAS DISCIPLINAS (ARQUITECTURA EXTENSIBLE PREPARADA)
// ============================================================
export const futureAcademyDisciplines: FutureDiscipline[] = [
  {
    id: "angeles-oraculos",
    title: "Ángeles y Oráculos",
    description: "Conexión angélica y sistemas oraculares devocionales.",
    glyph: "🕊",
    status: "proximamente",
  },
  {
    id: "cristales-piedras",
    title: "Cristales y Piedras",
    description: "Mineralogía sagrada, resonancias y rejillas de cuarzos.",
    glyph: "💎",
    status: "proximamente",
  },
  {
    id: "pendulo-radiestesia",
    title: "Péndulo y Radiestesia",
    description: "Detección sutil de frecuencias y armonización bioenergética.",
    glyph: "⟠",
    status: "proximamente",
  },
  {
    id: "lectura-manos",
    title: "Lectura de Manos (Quiromancia)",
    description: "El mapa palmar de líneas, montes y tendencias de vida.",
    glyph: "✋",
    status: "proximamente",
  },
  {
    id: "feng-shui",
    title: "Feng Shui",
    description: "Armonización espacial y flujo de energía en el entorno.",
    glyph: "⛩",
    status: "proximamente",
  },
  {
    id: "meditacion",
    title: "Meditación Profunda",
    description: "Calma mental, respiración consciente y presencia plena.",
    glyph: "🧘",
    status: "proximamente",
  },
  {
    id: "registros-akashicos",
    title: "Registros Akáshicos",
    description: "Acceso al libro memorial del alma y memorias universales.",
    glyph: "📖",
    status: "proximamente",
  },
  {
    id: "suenos-simbolismo",
    title: "Sueños y Simbolismo",
    description: "Oniromancia psicológica y arquetipos del inconsciente.",
    glyph: "🌙",
    status: "proximamente",
  },
  {
    id: "manifestacion",
    title: "Manifestación Consciente",
    description: "Leyes universales de enfoque, intención y materialización.",
    glyph: "⚡",
    status: "proximamente",
  },
  {
    id: "chakras",
    title: "Chakras y Vórtices Sutiles",
    description: "Estudio exhaustivo del sistema anatómico sutil del ser humano.",
    glyph: "☸",
    status: "proximamente",
  },
];

// ============================================================
// 3. CATÁLOGO COMPLETO DE CURSOS ($799 MXN UNIVERSAL)
// ============================================================
export const academyCourses: AcademyCourse[] = [
  // ------------------------------------------------------------
  // RUTA 1: TAROT (6 NIVELES EXISTENTES)
  // ------------------------------------------------------------
  {
    id: "tarot-01",
    category: "tarot",
    categoryName: "TAROT",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Tarot desde Cero",
    description:
      "Conoce la estructura del Tarot y aprende los fundamentos necesarios para comenzar a interpretar las cartas con seguridad.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 1",
    tag: "IDEAL PARA PRINCIPIANTES",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Introducción al Tarot",
      "Estructura de la baraja",
      "Arcanos Mayores",
      "Arcanos Menores",
      "Palabras clave",
      "Preparación para una lectura",
    ],
    glyph: "🜁",
    cardImage: "/images/academy/Tarot_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas que desean comenzar desde cero en el arte del Tarot.",
    featured: true,
  },
  {
    id: "tarot-02",
    category: "tarot",
    categoryName: "TAROT",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Los 22 Arcanos",
    description:
      "Profundiza en el lenguaje simbólico de los 22 Arcanos Mayores y aprende a reconocer sus mensajes.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "CONTINÚA TU CAMINO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Los 22 Arcanos Mayores",
      "Simbolismo",
      "Significados",
      "Luz y sombra",
      "Arquetipos",
      "Interpretación",
    ],
    glyph: "☉",
    cardImage: "/images/academy/Los_22_Arcanos.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que conocen las bases y desean dominar los 22 Arcanos Mayores.",
  },
  {
    id: "tarot-03",
    category: "tarot",
    categoryName: "TAROT",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Tiradas e Interpretación",
    description:
      "Aprende a realizar tiradas y a conectar varias cartas para construir interpretaciones completas.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "TIRADAS PROFESIONALES",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Tirada de una carta",
      "Tirada de tres cartas",
      "Pasado, presente y futuro",
      "Cruz Celta",
      "Preguntas específicas",
      "Combinación de cartas",
      "Construcción de una lectura",
    ],
    glyph: "✦",
    cardImage: "/images/academy/Tiradas_e_Interpretacion.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean realizar tiradas fluidas e interpretaciones ricas y reveladoras.",
  },
  {
    id: "tarot-04",
    category: "tarot",
    categoryName: "TAROT",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Tarot Intuitivo",
    description:
      "Desarrolla tu intuición y aprende a complementar el conocimiento tradicional con tu propia percepción.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "FORMACIÓN AVANZADA",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Intuición",
      "Símbolos",
      "Percepción",
      "Conexión con las cartas",
      "Lectura intuitiva",
      "Desarrollo personal",
    ],
    glyph: "🜄",
    cardImage: "/images/academy/Tarot_Intuitivo.jpg",
    ctaText: "VER CURSO",
    idealFor: "Tarotistas que buscan confiar en su intuición y lectura de campo sutil.",
  },
  {
    id: "tarot-05",
    category: "tarot",
    categoryName: "TAROT",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Tarot Terapéutico",
    description:
      "Explora el Tarot como una herramienta de reflexión, autoconocimiento y crecimiento personal.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "DESBLOQUEA TU WEB",
    tag: "DESBLOQUEA TU WEB GRATIS",
    isSpecialPromotionTrigger: true,
    webUnlockLevel: true,
    specialTags: ["DESBLOQUEA TU WEB GRATIS", "NIVEL 5: WEB INCLUIDA"],
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Autoconocimiento",
      "Emociones",
      "Patrones",
      "Reflexión",
      "Preguntas poderosas",
      "Lecturas enfocadas en crecimiento",
    ],
    glyph: "🜃",
    cardImage: "/images/academy/Tarot_Terapeutico.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que completan su formación de 5 niveles y desbloquean su página web profesional gratis.",
    featured: true,
  },
  {
    id: "tarot-06",
    category: "tarot",
    categoryName: "TAROT",
    level: 6,
    romanLevel: "NIVEL 6",
    title: "Tarot Profesional",
    description:
      "Aprende a estructurar consultas, trabajar preguntas complejas y desarrollar una práctica profesional como tarotista.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "MAESTRÍA",
    tag: "MAESTRÍA",
    countsForPromotion: false,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Consulta profesional",
      "Preparación de sesiones",
      "Preguntas difíciles",
      "Interpretación avanzada",
      "Ética profesional",
      "Comunicación con clientes",
      "Lecturas online",
      "Desarrollo de tu práctica",
    ],
    glyph: "🜂",
    cardImage: "/images/academy/Tarot_Profesional.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean vivir de su consulta de Tarot con ética y profesionalismo.",
  },

  // ------------------------------------------------------------
  // RUTA 2: ASTROLOGÍA (5 NIVELES)
  // ------------------------------------------------------------
  {
    id: "astrologia-01",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Astrología desde Cero",
    description:
      "Conoce los fundamentos de la astrología y aprende los elementos esenciales para comenzar a interpretar una carta natal.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 1",
    tag: "FUNDAMENTOS CELESTES",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Historia de la astrología",
      "Signos zodiacales",
      "Elementos",
      "Modalidades",
      "Planetas",
      "Casas astrológicas",
      "Conceptos fundamentales",
      "Introducción a la carta natal",
    ],
    glyph: "♈",
    cardImage: "/images/academy/Astrologia_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas curiosas por el cosmos que desean aprender astrología formal desde cero.",
    featured: true,
  },
  {
    id: "astrologia-02",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Los 12 Signos del Zodiaco",
    description:
      "Profundiza en la naturaleza de cada signo zodiacal, sus dinámicas energéticas, virtudes y desafíos arquetípicos.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "EL ZODIACO VIVO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "12 Módulos",
    content: [
      "Aries",
      "Tauro",
      "Géminis",
      "Cáncer",
      "Leo",
      "Virgo",
      "Libra",
      "Escorpio",
      "Sagitario",
      "Capricornio",
      "Acuario",
      "Piscis",
      "Interpretación de personalidad, elementos y modalidades",
      "Fortalezas, desafíos y simbolismo",
    ],
    glyph: "♉",
    cardImage: "/images/academy/Los_12_Signos_del_Zodiaco.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean comprender a fondo la psicología y esencia de cada signo zodiacal.",
  },
  {
    id: "astrologia-03",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Carta Natal",
    description:
      "Aprende a integrar Sol, Luna, Ascendente, casas y aspectos para realizar una lectura natal completa y reveladora.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "CARTA NATAL COMPLETA",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "9 Módulos",
    content: [
      "Sol",
      "Luna",
      "Ascendente",
      "Casas",
      "Planetas",
      "Signos",
      "Aspectos",
      "Interpretación básica",
      "Lectura de una carta natal",
    ],
    glyph: "☉",
    cardImage: "/images/academy/Carta_Natal.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes listos para interpretar cartas natales con soltura y profundidad.",
  },
  {
    id: "astrologia-04",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Astrología Predictiva",
    description:
      "Domina el análisis del tiempo celeste: tránsitos mayores, revoluciones solares y ciclos de vida.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "EL TIEMPO CÓSMICO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Tránsitos",
      "Ciclos planetarios",
      "Retrogradaciones",
      "Revolución solar",
      "Tendencias astrológicas",
      "Interpretación temporal",
    ],
    glyph: "♃",
    cardImage: "/images/academy/Astrologia_Predictiva.jpg",
    ctaText: "VER CURSO",
    idealFor: "Astrólogos que desean asesorar sobre momentos clave y ciclos anuales.",
  },
  {
    id: "astrologia-05",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Astrología Kármica",
    description:
      "Explora el propósito del alma, los nodos lunares y los patrones de evolución espiritual en la carta.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "DESBLOQUEA TU WEB",
    tag: "DESBLOQUEA TU WEB GRATIS",
    isSpecialPromotionTrigger: true,
    webUnlockLevel: true,
    specialTags: ["DESBLOQUEA TU WEB GRATIS", "NIVEL 5: WEB INCLUIDA"],
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Nodos lunares",
      "Patrones",
      "Ciclos",
      "Aprendizajes",
      "Simbolismo kármico",
      "Interpretación espiritual",
    ],
    glyph: "♄",
    cardImage: "/images/academy/Astrologia_Karmica.jpg",
    ctaText: "VER CURSO",
    idealFor: "Astrólogos que completan su formación de 5 niveles y reciben su página web profesional gratis.",
    featured: true,
  },

  // ------------------------------------------------------------
  // RUTA 3: NUMEROLOGÍA (5 NIVELES)
  // ------------------------------------------------------------
  {
    id: "numerologia-01",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Numerología desde Cero",
    description:
      "Descubre el poder de los números como códigos universales y aprende a calcular e interpretar sus vibraciones esenciales.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 1",
    tag: "CÓDIGOS PITAGÓRICOS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Historia",
      "Conceptos básicos",
      "Significado de los números",
      "Vibraciones numéricas",
      "Números maestros",
      "Interpretación inicial",
    ],
    glyph: "①",
    cardImage: "/images/academy/Numerologia_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean iniciarse en el fascinante simbolismo de los números.",
    featured: true,
  },
  {
    id: "numerologia-02",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Número de Vida",
    description:
      "Aprende el cálculo preciso del sendero de vida y el significado de cada vibración del 1 al 9 y números maestros.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "EL SENDERO NATAL",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "11 Módulos",
    content: [
      "Cálculo del número de vida",
      "Número 1",
      "Número 2",
      "Número 3",
      "Número 4",
      "Número 5",
      "Número 6",
      "Número 7",
      "Número 8",
      "Número 9",
      "Números maestros 11, 22 y 33",
    ],
    glyph: "②",
    cardImage: "/images/academy/Numero_de_Vida.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean descubrir la misión y desafíos grabados en la fecha de nacimiento.",
  },
  {
    id: "numerologia-03",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Numerología del Nombre",
    description:
      "Descodifica la vibración de las letras, el número del alma, la personalidad exterior y la expresión de vida.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "VIBRACIÓN DEL NOMBRE",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Conversión de letras",
      "Vibración del nombre",
      "Número del alma",
      "Número de personalidad",
      "Número de expresión",
      "Interpretación",
    ],
    glyph: "③",
    cardImage: "/images/academy/Numerologia_del_Nombre.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que desean descodificar la vibración del nombre y la identidad sutil.",
  },
  {
    id: "numerologia-04",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Ciclos de Vida",
    description:
      "Aprende a calcular el año personal, mes y día personal para sincronizar decisiones con los ritmos numéricos universales.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "RITMOS TEMPORALES",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Año personal",
      "Mes personal",
      "Día personal",
      "Ciclos",
      "Etapas",
      "Interpretación",
    ],
    glyph: "④",
    cardImage: "/images/academy/Ciclos_de_Vida.jpg",
    ctaText: "VER CURSO",
    idealFor: "Consultores y entusiastas que buscan orientar decisiones en momentos propicios.",
  },
  {
    id: "numerologia-05",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Numerología Profesional",
    description:
      "Estructura informes y cartas numerológicas integrales, combinando nombre, nacimiento y tránsitos para consulta profesional.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "DESBLOQUEA TU WEB",
    tag: "DESBLOQUEA TU WEB GRATIS",
    isSpecialPromotionTrigger: true,
    webUnlockLevel: true,
    specialTags: ["DESBLOQUEA TU WEB GRATIS", "NIVEL 5: WEB INCLUIDA"],
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "5 Módulos",
    content: [
      "Lecturas completas",
      "Combinaciones",
      "Interpretación avanzada",
      "Métodos de consulta",
      "Práctica profesional",
    ],
    glyph: "⑤",
    cardImage: "/images/academy/Numerologia_Profesional.jpg",
    ctaText: "VER CURSO",
    idealFor: "Consultores que completan los 5 niveles de formación numerológica y desbloquean su web gratis.",
    featured: true,
  },

  // ------------------------------------------------------------
  // RUTA 4: REIKI Y ENERGÍA (5 NIVELES)
  // Formación de bienestar y espiritualidad — sin afirmaciones médicas
  // ------------------------------------------------------------
  {
    id: "reiki-01",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Reiki desde Cero",
    description:
      "Iníciate en los principios tradicionales de la energía universal, la preparación personal y la meditación consciente.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 1",
    tag: "BIENESTAR Y ARMONÍA",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Qué es Reiki",
      "Historia",
      "Principios",
      "Energía y bienestar",
      "Preparación personal",
      "Meditación",
      "Prácticas introductorias",
    ],
    glyph: "ॐ",
    cardImage: "/images/academy/Reiki_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes buscan cultivar equilibrio energético, serenidad y autoconexión.",
    featured: true,
  },
  {
    id: "reiki-02",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Chakras y Energía",
    description:
      "Comprende el mapa de los 7 centros energéticos principales, su simbolismo sutil y técnicas de visualización armónica.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "LOS 7 CENTROS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Los 7 chakras",
      "Simbolismo",
      "Energía",
      "Meditación",
      "Visualización",
      "Prácticas de bienestar",
    ],
    glyph: "☯",
    cardImage: "/images/academy/Chakras_y_Energia.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas interesadas en el flujo energético sutil y la alineación interior.",
  },
  {
    id: "reiki-03",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Meditación y Energía",
    description:
      "Aprende técnicas avanzadas de respiración, atención plena y relajación profunda para restablecer la armonía interior.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "MEDITACIÓN & PRÁCTICA",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Respiración",
      "Meditación",
      "Atención plena",
      "Visualización",
      "Relajación",
      "Conexión interior",
    ],
    glyph: "☸",
    cardImage: "/images/academy/Meditacion_y_Energia.jpg",
    ctaText: "VER CURSO",
    idealFor: "Practicantes de bienestar listos para profundizar en la meditación y el equilibrio sutil.",
  },
  {
    id: "reiki-04",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Reiki Nivel II",
    description:
      "Profundiza en la tradición energética de segundo grado, símbolos sagrados tradicionales y prácticas de presencia serena.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "SÍMBOLOS SAGRADOS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "5 Módulos",
    content: [
      "Profundización de la práctica",
      "Símbolos tradicionales",
      "Meditación",
      "Prácticas energéticas",
      "Desarrollo personal",
    ],
    glyph: "✦",
    cardImage: "/images/academy/Reiki_Nivel_II.jpg",
    ctaText: "VER CURSO",
    idealFor: "Iniciados que desean profundizar en los símbolos tradicionales y su enfoque meditativo.",
  },
  {
    id: "reiki-05",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Energía y Bienestar",
    description:
      "Integra hábitos diarios de meditación, respiración consciente y rutinas de equilibrio para tu vida personal y profesional.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "DESBLOQUEA TU WEB",
    tag: "DESBLOQUEA TU WEB GRATIS",
    isSpecialPromotionTrigger: true,
    webUnlockLevel: true,
    specialTags: ["DESBLOQUEA TU WEB GRATIS", "NIVEL 5: WEB INCLUIDA"],
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "6 Módulos",
    content: [
      "Hábitos de bienestar",
      "Meditación",
      "Respiración",
      "Relajación",
      "Autoconocimiento",
      "Rutinas personales",
    ],
    glyph: "✺",
    cardImage: "/images/academy/Energia_y_Bienestar.jpg",
    ctaText: "VER CURSO",
    idealFor: "Practicantes de bienestar que culminan los 5 niveles de maestría energética y desbloquean su web gratis.",
    featured: true,
  },
];

// ============================================================
// 4. BENEFICIOS ("¿QUÉ VAS A DESARROLLAR?")
// ============================================================
export const academyBenefits: LearningBenefit[] = [
  {
    id: "conocimiento",
    title: "CONOCIMIENTO",
    description: "Comprende los fundamentos de cada disciplina.",
    glyph: "🜁",
  },
  {
    id: "interpretacion",
    title: "INTERPRETACIÓN",
    description: "Aprende a interpretar símbolos, patrones y significados.",
    glyph: "✦",
  },
  {
    id: "intuicion",
    title: "INTUICIÓN",
    description: "Desarrolla tu capacidad de observación y percepción.",
    glyph: "☉",
  },
  {
    id: "autoconocimiento",
    title: "AUTOCONOCIMIENTO",
    description: "Utiliza el aprendizaje como herramienta de reflexión personal.",
    glyph: "🜄",
  },
  {
    id: "practica",
    title: "PRÁCTICA",
    description: "Lleva tus conocimientos a ejercicios y lecturas.",
    glyph: "🜃",
  },
  {
    id: "presencia-profesional",
    title: "PRESENCIA PROFESIONAL",
    description: "Convierte tu conocimiento en una propuesta digital.",
    glyph: "🜂",
  },
];

// Compatibilidad hacia atrás
export const whatYouWillLearn = academyBenefits;

// ============================================================
// 5. CÓMO FUNCIONA (4 PASOS)
// ============================================================
export const howItWorksSteps: HowItWorksStep[] = [
  {
    stepNumber: "01",
    title: "ELIGE",
    description: "Selecciona la disciplina que quieres aprender.",
  },
  {
    stepNumber: "02",
    title: "APRENDE",
    description: "Avanza a través de cada curso.",
  },
  {
    stepNumber: "03",
    title: "COMPLETA",
    description: "Completa tus 5 niveles de formación.",
  },
  {
    stepNumber: "04",
    title: "DESBLOQUEA",
    description: "Obtén tu página web personalizada GRATIS.",
  },
];

// ============================================================
// 6. PROMOCIÓN DE LA PÁGINA WEB
// ============================================================
export const webPromotionBenefits: string[] = [
  "Página web personalizada",
  "Diseño profesional",
  "Adaptada a tu actividad",
  "Presentación personal",
  "Servicios",
  "Información de contacto",
  "Botón de WhatsApp",
  "Diseño responsive",
  "Dominio incluido durante 1 año",
];

// ============================================================
// 7. PREGUNTAS FRECUENTES (FAQ)
// ============================================================
export const academyFaqList: AcademyFaqItem[] = [
  {
    question: "¿CUÁNTO CUESTA CADA CURSO?",
    answer: "Cada curso tiene un precio de $799 MXN.",
  },
  {
    question: "¿NECESITO EXPERIENCIA PREVIA?",
    answer: "No. Cada ruta comienza con un nivel introductorio.",
  },
  {
    question: "¿PUEDO ESTUDIAR DIFERENTES DISCIPLINAS?",
    answer:
      "Sí. Puedes estudiar Tarot, Astrología, Numerología y Reiki y Energía de manera independiente.",
  },
  {
    question: "¿CÓMO OBTENGO LA PÁGINA WEB GRATIS?",
    answer: "Completa los 5 niveles de cualquier disciplina para desbloquear tu página web profesional con dominio incluido.",
  },
  {
    question: "¿QUÉ INCLUYE LA PÁGINA WEB?",
    answer:
      "Una página web personalizada con diseño profesional, información de tu actividad, contacto, WhatsApp y adaptación responsive.",
  },
  {
    question: "¿EL DOMINIO ESTÁ INCLUIDO?",
    answer: "Sí. El dominio está incluido durante un año.",
  },
  {
    question: "¿QUÉ PASA DESPUÉS DEL PRIMER AÑO?",
    answer: "La renovación del dominio es independiente.",
  },
  {
    question: "¿LOS CURSOS TIENEN QUE HACERSE EN ORDEN?",
    answer: "Se recomienda comenzar por el Nivel 1 para construir una base sólida.",
  },
];
