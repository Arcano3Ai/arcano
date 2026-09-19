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
  originalPrice?: number;
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
  // RUTA 1: TAROT (6 NIVELES DE FORMACIÓN INICIÁTICA A PROFESIONAL)
  // ------------------------------------------------------------
  {
    id: "tarot-01",
    category: "tarot",
    categoryName: "TAROT",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Tarot desde Cero",
    description:
      "Conoce la estructura del Tarot, su origen hermético y aprende los fundamentos necesarios para comenzar a interpretar las cartas con absoluta seguridad.",
    price: 0,
    originalPrice: 799,
    currency: "MXN",
    formattedPrice: "GRATIS",
    badge: "100% GRATIS (PROMOCIÓN)",
    tag: "NIVEL 1 GRATUITO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Introducción al Tarot y su origen histórico-hermético",
      "Estructura completa del mazo: 78 naipes sagrados",
      "Diferencias esenciales entre Arcanos Mayores y Arcanos Menores",
      "Palabras clave, arquetipos universales y glosario iniciático",
      "Los 4 palos y los 4 elementos primordiales (Fuego, Agua, Aire, Tierra)",
      "Preparación del espacio sagrado, consagración del mazo y barajado ético",
      "Primeras tiradas guiadas: Lecturas lineales de 1 y 3 cartas",
    ],
    glyph: "🜁",
    cardImage: "/images/academy/Tarot_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas que desean comenzar desde cero en el arte del Tarot con bases sólidas y ordenadas.",
    featured: true,
  },
  {
    id: "tarot-02",
    category: "tarot",
    categoryName: "TAROT",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Los 22 Arcanos Mayores",
    description:
      "Profundiza en el lenguaje simbólico, los misterios arquetípicos y las claves ocultas de los 22 Arcanos Mayores a lo largo del viaje del Loco.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "CONTINÚA TU CAMINO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "El viaje iniciático del Loco a través de los 22 Arcanos Mayores",
      "Simbología esotérica: colores, vestiduras, números y geometría sagrada",
      "Significados profundos en luz y sombra de cada arcano",
      "Correspondencias astrológicas, planetarias y elementales de cada carta",
      "Arquetipos junguianos del inconsciente colectivo reflejados en el Tarot",
      "Doble polaridad: cartas al derecho e invertidas en la consulta",
      "Técnicas de combinación e interacción entre dos arcanos mayores",
      "Casos prácticos de interpretación psicológica y espiritual",
    ],
    glyph: "☉",
    cardImage: "/images/academy/Los_22_Arcanos.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que conocen las bases y desean dominar los 22 Arcanos Mayores con maestría simbólica.",
  },
  {
    id: "tarot-03",
    category: "tarot",
    categoryName: "TAROT",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Arcanos Menores y Palos",
    description:
      "Descifra los 56 Arcanos Menores: las 4 dinámicas elementales, la numerología del As al Diez y las 16 figuras cortesanas.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "LOS 4 ELEMENTOS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Dinámica de los 4 Palos: Bastos (Fuego/Acción), Copas (Agua/Emoción), Espadas (Aire/Mente) y Oros (Tierra/Materia)",
      "Progresión numerológica del As al Diez en cada palo elemental",
      "Las 16 Figuras de la Corte: Sotas (Mensajeros), Caballeros (Acción), Reinas (Madurez Interna) y Reyes (Poder)",
      "Identificación de personas reales y facetas psicológicas en la mesa de lectura",
      "Integración de Arcanos Mayores y Menores en tiradas combinadas",
      "Técnicas para responder asuntos cotidianos, laborales y sentimentales",
      "Resolución de dudas sobre el tiempo y la concreción de sucesos",
    ],
    glyph: "✦",
    cardImage: "/images/academy/Tiradas_e_Interpretacion.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean completar el estudio de la baraja entera y leer los 78 naipes con precisión cotidiana.",
  },
  {
    id: "tarot-04",
    category: "tarot",
    categoryName: "TAROT",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Tiradas y Métodos de Lectura",
    description:
      "Aprende las arquitecturas de lectura más poderosas del Tarot, desde la Cruz Celta hasta la rueda astrológica y tiradas de vínculos afectivos.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "MÉTODOS AVANZADOS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "El arte de formular preguntas abiertas y empoderadoras al consultante",
      "Tirada de 3 Cartas: Causa Raíz, Estado Presente y Desenlace Potencial",
      "La Cruz Celta completa paso a paso: 10 posiciones de revelación",
      "Tirada Astrológica de las 12 Casas zodiacales aplicada al Tarot",
      "Tiradas de Vínculos y Compatibilidad de Pareja (Espejo y Puente)",
      "Hilado narrativo: cómo conectar cartas contiguas sin contradicciones",
      "Desarrollo de la intuición y lectura del campo sutil en vivo",
    ],
    glyph: "🜄",
    cardImage: "/images/academy/Tarot_Intuitivo.jpg",
    ctaText: "VER CURSO",
    idealFor: "Tarotistas que buscan enriquecer su repertorio de tiradas con lecturas fluidas y profundas.",
  },
  {
    id: "tarot-05",
    category: "tarot",
    categoryName: "TAROT",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Tarot Terapéutico y Profesional",
    description:
      "Transforma tu práctica en un servicio profesional ético y terapéutico. Al culminar este curso, desbloqueas tu Página Web Profesional con Dominio Propio.",
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
    lessonsCount: "8 Módulos",
    content: [
      "Enfoque del Tarot Terapéutico: De la adivinación pasiva al crecimiento consciente",
      "Identificación de patrones kármicos, mandatos familiares y sombras del ego",
      "Protocolo de consulta profesional: Apertura de sesión, encuadre y cierre ceremonial",
      "Código de ética hermética: Manejo de temas sensibles (salud, duelo y crisis)",
      "Estructuración de honorarios justos, agenda digital y atención al cliente",
      "Marketing ético para terapeutas holísticos y tarotistas",
      "Desbloqueo y configuración de tu Página Web Profesional con Dominio Propio (.com)",
    ],
    glyph: "🜃",
    cardImage: "/images/academy/Tarot_Terapeutico.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que culminan los 5 niveles de formación y reciben su página web profesional gratuita.",
    featured: true,
  },
  {
    id: "tarot-06",
    category: "tarot",
    categoryName: "TAROT",
    level: 6,
    romanLevel: "NIVEL 6",
    title: "Maestría Esotérica en Tarot",
    description:
      "Accede a los misterios avanzados de la Alta Magia, la Cábala hermética, el Árbol de la Vida y la formación de nuevos iniciados.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "MAESTRÍA",
    tag: "ALTA SABIDURÍA",
    countsForPromotion: false,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Cábala hermética: El Árbol de la Vida y los 22 Senderos de Sabiduría",
      "Correspondencias de los 10 Sephirot con los Arcanos Menores",
      "Meditaciones arquetípicas y visualizaciones astrales guiadas",
      "Alta magia ceremonial de consagración y protección del espacio de lectura",
      "Sincronicidades colectivas y lectura de arquetipos mundiales",
      "Didáctica hermética: Preparación para impartir talleres y formar iniciados",
    ],
    glyph: "⚜",
    cardImage: "/images/academy/Tarot_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Maestros e investigadores esotéricos que buscan alcanzar el más alto grado de sabiduría en los Arcanos.",
  },

  // ------------------------------------------------------------
  // RUTA 2: ASTROLOGÍA (5 NIVELES: DE LA MECÁNICA CELESTE A LA CONSULTA KÁRMICA)
  // ------------------------------------------------------------
  {
    id: "astrologia-01",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Astrología desde Cero",
    description:
      "Conoce los fundamentos de la mecánica celeste, la rueda zodiacal y aprende los elementos esenciales para comenzar a descifrar una carta natal.",
    price: 0,
    originalPrice: 799,
    currency: "MXN",
    formattedPrice: "GRATIS",
    badge: "100% GRATIS (PROMOCIÓN)",
    tag: "NIVEL 1 GRATUITO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Historia y filosofía de la astrología tradicional y moderna",
      "La Rueda Zodiacal: División en 360 grados y los 12 signos sagrados",
      "Los 4 Elementos: Fuego (impulso), Tierra (materia), Aire (mente) y Agua (alma)",
      "Las 3 Modalidades energéticas: Cardinal (iniciar), Fija (consolidar) y Mutable (adaptar)",
      "Polaridades Yin y Yang en la carta del cielo",
      "Diferencia entre signo solar, signo lunar y punto ascendente",
      "Cálculo e introducción a la carta natal con efemérides astronómicas",
    ],
    glyph: "♈",
    cardImage: "/images/academy/Astrologia_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas que desean aprender astrología formal desde cero con rigor pedagógico.",
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
      "Profundiza en la psicología arquetípica de cada signo zodiacal, sus regencias planetarias, polaridades, virtudes y sombras inconscientes.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "EL ZODIACO VIVO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Signos de Fuego: Aries (voluntad pura), Leo (expresión del ser) y Sagitario (búsqueda de sentido)",
      "Signos de Tierra: Tauro (estabilidad sensorial), Virgo (análisis y orden) y Capricornio (maestría y estructura)",
      "Signos de Aire: Géminis (comunicación dual), Libra (armonía vincular) y Acuario (visión colectiva)",
      "Signos de Agua: Cáncer (nutrición emocional), Escorpio (transmutación) y Piscis (unidad mística)",
      "Regencias planetarias clásicas vs. modernas (Marte/Plutón, Júpiter/Neptuno, Saturno/Urano)",
      "Ejes complementarios: Aries-Libra, Tauro-Escorpio, Géminis-Sagitario, Cáncer-Capricornio",
      "Manifestaciones en luz (evolución) y sombra (bloqueo reactivo) de cada signo",
    ],
    glyph: "♉",
    cardImage: "/images/academy/Los_12_Signos_del_Zodiaco.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean comprender a fondo la psicología y esencia arquetípica de cada signo zodiacal.",
  },
  {
    id: "astrologia-03",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Planetas, Luminarias y Casas",
    description:
      "Aprende el significado de los 10 cuerpos celestes, las 12 casas natales y los aspectos geométricos mayores en la carta astral.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "PLANETAS Y CASAS",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "9 Módulos",
    content: [
      "Las Luminarias: El Sol (conciencia e identidad) y la Luna (mundo afectivo y memoria nutricia)",
      "Planetas Personales: Mercurio (intelecto), Venus (amor y valores) y Marte (deseo y acción)",
      "Planetas Sociales: Júpiter (expansión y fe) y Saturno (límite, tiempo y maduración)",
      "Planetas Transpersonales: Urano (liberación), Neptuno (misticismo) y Plutón (regeneración)",
      "Las 12 Casas Astrológicas: Escenarios de vida, casas angulares, sucedentes y cadentes",
      "Los 4 Ángulos cardinales: Ascendente (ASC), Descendente (DSC), Medio Cielo (MC) y Fondo de Cielo (IC)",
      "Aspectos Mayores: Conjunción (0°), Trígono (120°), Sextil (60°), Cuadratura (90°) y Oposición (180°)",
      "Orbes, aspectos armónicos vs. aspectos de tensión evolutiva",
    ],
    glyph: "☉",
    cardImage: "/images/academy/Carta_Natal.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes listos para articular planetas, signos y casas en una síntesis fluida.",
  },
  {
    id: "astrologia-04",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Interpretación Integral de Carta Natal",
    description:
      "Domina el arte de la lectura de cartas natales: jerarquías planetarias, regentes de casas, balance elemental y síntesis psicológica.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "SÍNTESIS NATAL",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Metodología de lectura paso a paso: De la visión global al detalle milimétrico",
      "Balance de Elementos y Modalidades: Dones energéticos y vacíos a compensar",
      "El Planeta Regente del Ascendente: La nave capitana del nativo",
      "Dispositores finales y recepciones mutuas entre planetas",
      "Interpretación de planetas retrógrados (Rx) en la carta natal",
      "Figuras de aspectos: Gran Trígono, Cruz Cósmica, T-Cuadrada y Barrilete",
      "Estructuración de una consulta astrológica de 60 a 90 minutos",
    ],
    glyph: "♃",
    cardImage: "/images/academy/Astrologia_Predictiva.jpg",
    ctaText: "VER CURSO",
    idealFor: "Astrólogos en formación que desean ofrecer sesiones natales con solvencia y claridad.",
  },
  {
    id: "astrologia-05",
    category: "astrologia",
    categoryName: "ASTROLOGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Astrología Kármica, Tránsitos y Consulta",
    description:
      "Explora los Nodos Lunares, Quirón, tránsitos anuales y la ética de consulta profesional. Desbloquea tu Página Web Profesional con Dominio Propio.",
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
    lessonsCount: "8 Módulos",
    content: [
      "Los Nodos Lunares: Nodo Sur (memoria kármica de vidas pasadas) y Nodo Norte (misión de alma)",
      "Quirón, el sanador herido: Localización de la herida profunda y su transmutación en sabiduría",
      "Lilith (Luna Negra): Tabúes, represión del poder primigenio e integración de la sombra",
      "Introducción a Tránsitos Planetarios y Revolución Solar para el año en curso",
      "Sinastría de Parejas básica: Conexiones interplanetarias y acuerdos de alma",
      "Ética del astrólogo: No determinismo, respeto al libre albedrío y lenguaje constructivo",
      "Desbloqueo y entrega de tu Página Web Profesional con Dominio Propio (.com)",
    ],
    glyph: "♄",
    cardImage: "/images/academy/Astrologia_Karmica.jpg",
    ctaText: "VER CURSO",
    idealFor: "Astrólogos que completan su formación de 5 niveles y reciben su página web profesional gratuita.",
    featured: true,
  },

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // RUTA 3: NUMEROLOGÍA (5 NIVELES: DE LOS CÓDIGOS PITAGÓRICOS A LA CONSULTA INTEGRAL)
  // ------------------------------------------------------------
  {
    id: "numerologia-01",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Numerología desde Cero",
    description:
      "Descubre el poder de los números como códigos universales del cosmos y aprende a calcular e interpretar sus vibraciones esenciales del 1 al 9.",
    price: 0,
    originalPrice: 799,
    currency: "MXN",
    formattedPrice: "GRATIS",
    badge: "100% GRATIS (PROMOCIÓN)",
    tag: "NIVEL 1 GRATUITO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Origen histórico y filosófico de la numerología pitagórica y caldea",
      "La reducción teosófica: Cómo destilar cualquier cifra a su raíz sagrada",
      "Vibración y psicología arquetípica de los números simples del 1 al 9",
      "Tabla alfanumérica pitagórica: Conversión de letras a códigos numéricos",
      "Números pares (estabilidad y receptividad) vs. impares (acción e impulso)",
      "Introducción a los números maestros (11, 22, 33) y su exigencia espiritual",
      "Primeros ejercicios de cálculo con nombres y fechas natales",
    ],
    glyph: "①",
    cardImage: "/images/academy/Numerologia_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean iniciarse en el fascinante simbolismo de los números con rigor y método.",
    featured: true,
  },
  {
    id: "numerologia-02",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Sendero de Vida y Misión Natal",
    description:
      "Aprende el cálculo preciso del Número de Vida, lecciones kármicas, dones innatos y el propósito supremo grabado en la fecha de nacimiento.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "EL SENDERO NATAL",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "8 Módulos",
    content: [
      "Cálculo exacto del Sendero de Vida (Camino Natal) paso a paso",
      "Significado profundo de los Senderos 1 al 9: Vocación, temperamento y sombra",
      "Los Números Maestros como Sendero de Vida: 11 (El Iluminador), 22 (El Constructor) y 33 (El Guía)",
      "El Número del Día de Nacimiento: El talento natural y herramienta congénita",
      "Deudas Kármicas natales: Números 13, 14, 16 y 19 y su proceso de transmutación",
      "Casos prácticos: Interpretación de la fecha de nacimiento en personajes reales",
      "Orientación vocacional y resolución de crisis vitales mediante el sendero",
    ],
    glyph: "②",
    cardImage: "/images/academy/Numero_de_Vida.jpg",
    ctaText: "VER CURSO",
    idealFor: "Quienes desean descubrir la misión, dones y desafíos grabados en su fecha de nacimiento.",
  },
  {
    id: "numerologia-03",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Numerología del Nombre y Alma",
    description:
      "Descodifica la vibración de las vocales y consonantes: el Deseo del Alma, la Máscara de Personalidad y el Número de Expresión de Vida.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "VIBRACIÓN DEL NOMBRE",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "La vibración de las vocales: El Número del Alma (motivación íntima oculta)",
      "La vibración de las consonantes: El Número de la Personalidad (la imagen proyectada)",
      "La suma integral: El Número de Expresión o Destino (cómo actúas en el mundo)",
      "Linchamiento y herencia: La carga kármica de los apellidos paterno y materno",
      "Inclusión de letras acentuadas, la letra 'Y' como vocal o consonante",
      "El Número de Equilibrio y las lecciones ausentes en la tabla del nombre",
      "Integración del Nombre con la Fecha de Nacimiento: Armonías y discrepancias",
    ],
    glyph: "③",
    cardImage: "/images/academy/Numerologia_del_Nombre.jpg",
    ctaText: "VER CURSO",
    idealFor: "Estudiantes que desean descodificar la vibración del nombre y la identidad profunda.",
  },
  {
    id: "numerologia-04",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Ciclos Vitales, Pináculos y Año Personal",
    description:
      "Sincroniza decisiones con el tiempo universal: calcula el Año, Mes y Día Personal, más los 4 grandes Pináculos y Desafíos de vida.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "RITMOS TEMPORALES",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "El Año Universal vs. El Año Personal: Cálculo y resonancia individual",
      "El ciclo de 9 años: Desde la siembra (Año 1) hasta el cierre y cosecha (Año 9)",
      "Cálculo del Mes Personal y Día Personal para momentos clave y firmas de contratos",
      "Los 4 Grandes Pináculos de la Vida: Épocas de realización y maduración",
      "Los 4 Desafíos de Vida: Las pruebas recurrentes que forjan el carácter",
      "Tránsitos de las letras del nombre: Cómo los ciclos de letras marcan etapas",
      "Planificación estratégica personal y empresarial mediante el calendario numerológico",
    ],
    glyph: "④",
    cardImage: "/images/academy/Ciclos_de_Vida.jpg",
    ctaText: "VER CURSO",
    idealFor: "Consultores y entusiastas que buscan orientar decisiones en momentos propicios con precisión.",
  },
  {
    id: "numerologia-05",
    category: "numerologia",
    categoryName: "NUMEROLOGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Consulta Numerológica Profesional",
    description:
      "Aprende a redactar cartas numerológicas de nivel profesional, sinastría de parejas y nombres de empresas. Desbloquea tu Página Web Profesional con Dominio Propio.",
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
    lessonsCount: "8 Módulos",
    content: [
      "Estructuración de la Carta Numerológica Integral: Informe escrito de 12 a 15 páginas",
      "Sinastría Numerológica de Pareja: Compatibilidad de sendero, temperamentos y acuerdos",
      "Numerología Empresarial: Elección de nombres de marca, fechas de lanzamiento y números de éxito",
      "Metodología de consulta 1 a 1: Entrevista previa, entrega del informe y sesión grabada",
      "Fijación de tarifas profesionales, ética en el asesoramiento y confidencialidad",
      "Herramientas digitales de cálculo para optimizar el tiempo de entrega al cliente",
      "Desbloqueo y entrega de tu Página Web Profesional con Dominio Propio (.com)",
    ],
    glyph: "⑤",
    cardImage: "/images/academy/Numerologia_Profesional.jpg",
    ctaText: "VER CURSO",
    idealFor: "Consultores que completan los 5 niveles de formación numerológica y desbloquean su web gratis.",
    featured: true,
  },

  // ------------------------------------------------------------
  // RUTA 4: REIKI Y ENERGÍA (5 NIVELES: SANACIÓN SUTIL Y TERAPIA HOLÍSTICA)
  // Formación de bienestar y espiritualidad — sin afirmaciones médicas
  // ------------------------------------------------------------
  {
    id: "reiki-01",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 1,
    romanLevel: "NIVEL 1",
    title: "Despertar Energético y Chakras",
    description:
      "Iníciate en los principios de la anatomía sutil, los 7 centros energéticos principales, la autopurificación áurica y la meditación consciente.",
    price: 0,
    originalPrice: 799,
    currency: "MXN",
    formattedPrice: "GRATIS",
    badge: "100% GRATIS (PROMOCIÓN)",
    tag: "NIVEL 1 GRATUITO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Qué es la energía vital universal (Ki, Prana, Chi) y cómo fluye en el cuerpo",
      "Anatomía sutil: El campo electromagnético (Aura) y sus capas energéticas",
      "Los 7 Chakras principales: Muladhara, Svadhisthana, Manipura, Anahata, Vishuddha, Ajna y Sahasrara",
      "Técnicas de respiración consciente (Pranayama) para limpiar el canal central",
      "Higiene energética cotidiana: Cómo descargar densidades y proteger el campo sutil",
      "Técnicas de enraizamiento a la Tierra (Grounding) y apertura del corazón",
      "Meditación guiada de alineación y sintonización personal",
    ],
    glyph: "ॐ",
    cardImage: "/images/academy/Reiki_desde_Cero.jpg",
    ctaText: "VER CURSO",
    idealFor: "Personas que buscan cultivar equilibrio interior, paz mental y sensibilidad energética.",
    featured: true,
  },
  {
    id: "reiki-02",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 2,
    romanLevel: "NIVEL 2",
    title: "Reiki Usui Nivel 1 (Shoden)",
    description:
      "Aprende el método tradicional de Mikao Usui: sintonización de primer grado, los 5 principios Gokai y el protocolo de autopratamiento y sesión a otros.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 2",
    tag: "SHODEN — PRIMER GRADO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Historia y legado del Maestro Mikao Usui y la tradición Usui Shiki Ryoho",
      "Los 5 Principios espirituales de Reiki (Gokai) y su práctica diaria en japonés y español",
      "Preparación del terapeuta: Apertura, meditación Gassho y conexión con la fuente",
      "Protocolo completo de las 12 posiciones tradicionales de manos en autotratamiento",
      "Protocolo para brindar sesión de imposición de manos a familiares, plantas y animales",
      "El periodo de purificación y desintoxicación energética de los 21 días",
      "Consagración y sellado de la sesión sin desgaste de la propia energía vital",
    ],
    glyph: "☯",
    cardImage: "/images/academy/Chakras_y_Energia.jpg",
    ctaText: "VER CURSO",
    idealFor: "Iniciados listos para canalizar energía con las manos para su propio bienestar y el de su entorno.",
  },
  {
    id: "reiki-03",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 3,
    romanLevel: "NIVEL 3",
    title: "Reiki Usui Nivel 2 (Okuden)",
    description:
      "Recibe los 3 símbolos sagrados tradicionales: potencia física, armonización mental-emocional y sanación a distancia superando el tiempo y espacio.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 3",
    tag: "OKUDEN — SEGUNDO GRADO",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Primer Símbolo: Cho Ku Rei (El interruptor de poder y fijación de luz)",
      "Segundo Símbolo: Sei He Ki (Armonización emocional, liberación de apegos y traumas)",
      "Tercer Símbolo: Hon Sha Ze Sho Nen (La conexión a distancia temporal y espacial)",
      "Trazado correcto, pronunciación del mantra y activación de los símbolos",
      "Tratamiento a distancia: Protocolos con fotografía, sustituto testigo o visualización",
      "Sanación de situaciones del pasado y envío de energía hacia metas futuras",
      "Limpieza y consagración de espacios físicos, hogares y objetos rituales",
    ],
    glyph: "☸",
    cardImage: "/images/academy/Meditacion_y_Energia.jpg",
    ctaText: "VER CURSO",
    idealFor: "Reikistas de Nivel 1 que desean dominar los símbolos sagrados y la sanación a distancia.",
  },
  {
    id: "reiki-04",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 4,
    romanLevel: "NIVEL 4",
    title: "Armonización con Cristales y Péndulo",
    description:
      "Integra la radiestesia y la gemoterapia energética: diagnóstico áurico con péndulo, desbloqueo de chakras y creación de redes cristalinas.",
    price: 799,
    currency: "MXN",
    formattedPrice: "$799 MXN",
    badge: "NIVEL 4",
    tag: "CRISTALES & RADIESTESIA",
    countsForPromotion: true,
    duration: "A tu propio ritmo",
    lessonsCount: "7 Módulos",
    content: [
      "Introducción a la radiestesia sagrada: Calibración y diálogo con el péndulo",
      "Diagnóstico del giro y vitalidad de cada chakra con gráficos de medición (Bovis)",
      "Propiedades terapéuticas de los cuarzos: Amatista, Cuarzo Rosa, Citrino, Jaspe y Turmalina",
      "Limpieza, activación y programación energética de piedras y minerales",
      "Diseño e instalación de Mallas y Cuadrículas de Cristales (Crystal Grids)",
      "Detección y extracción de parásitos y cordones etéricos densos",
      "Protocolo integral combinando Reiki, Péndulo y Gemas en camilla",
    ],
    glyph: "✦",
    cardImage: "/images/academy/Reiki_Nivel_II.jpg",
    ctaText: "VER CURSO",
    idealFor: "Terapeutas holísticos que desean enriquecer su consulta con cuarzos y radiestesia clínica.",
  },
  {
    id: "reiki-05",
    category: "reiki",
    categoryName: "REIKI Y ENERGÍA",
    level: 5,
    romanLevel: "NIVEL 5",
    title: "Terapeuta Energético y Maestría Personal",
    description:
      "Consolida tu práctica como Terapeuta Holístico Profesional. Aprende encuadre clínico, ética sagrada y desbloquea tu Página Web Profesional con Dominio Propio.",
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
    lessonsCount: "8 Módulos",
    content: [
      "El rol del facilitador: Humildad hermética y el principio de no interferencia kármica",
      "Estructuración de la sesión profesional: Anamnesis energética y consentimiento informado",
      "Acondicionamiento del santuario de consulta: Aromas sagrados, frecuencia sonora y temperatura",
      "Protocolo de cierre y corte de lazos energéticos con el consultante al terminar",
      "Marco legal y ético: Coexistencia con la medicina alopática sin emitir diagnósticos médicos",
      "Estructura de planes de tratamiento holístico de 4 a 8 sesiones continuas",
      "Desbloqueo y entrega de tu Página Web Profesional con Dominio Propio (.com)",
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
    answer: "¡El Nivel 1 de cada disciplina es 100% GRATIS por promoción especial de bienvenida! A partir del Nivel 2 en adelante, cada curso tiene una inversión accesible de $799 MXN. Además, al completar los 5 niveles de tu formación recibes tu página web profesional personalizada con dominio propio incluido por 1 año.",
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
