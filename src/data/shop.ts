export interface ShopCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  symbol: string;
}

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number;
  formattedPrice: string;
  shippingNote: string;
  tagline: string;
  description: string;
  ritualUse: string;
  details: string[];
  inStock: boolean;
  badge?: string;
  imageUrl: string;
  featured?: boolean;
}

export const artisanManifesto = {
  eyebrow: "Colección Viva de Piezas Únicas de Río",
  title: "Cada proceso es diferente, cada colección es diferente, cada piedra es única",
  description:
    "Nuestras piezas provienen de cauces naturales de río moldeados por el agua durante siglos. Ninguna piedra es idéntica a otra: cada una es recolectada a mano, taladrada y grabada con pigmentos áureos bajo momentos ceremoniales propicios. La forma, textura, peso y vetas de la pieza que llegue a tus manos serán irrepetibles, guardando una impronta sagrada y personal para tu altar.",
  highlights: [
    {
      title: "Piedras Naturales de Río",
      text: "Extraídas respetando el cauce, pulidas de manera orgánica por la corriente.",
    },
    {
      title: "Taladrado & Grabado a Mano",
      text: "Orificios precisos para varillas de incienso o carbón ceremonial con acabado artesanal.",
    },
    {
      title: "Consagración Individual",
      text: "Cada pieza se entrega purificada con humo de resinas sagradas antes de su envío.",
    },
  ],
};

export const shopCategories: ShopCategory[] = [
  {
    id: "todos",
    slug: "todos",
    name: "Toda la Colección",
    description: "Todas las piezas de piedra de río, quemadores y sahumerios ceremoniales.",
    symbol: "✦",
  },
  {
    id: "portainciensos-y-runas",
    slug: "portainciensos-y-runas",
    name: "Quemadores Rúnicos & Aura",
    description: "Soportes de piedra taladrados a mano para incienso y varitas sagradas.",
    symbol: "ᚱ",
  },
  {
    id: "simbolos-y-geometria",
    slug: "simbolos-y-geometria",
    name: "Símbolos Sagrados & Mandalas",
    description: "Geometría sagrada, soles alquímicos, lunas y mandalas grabados en piedra.",
    symbol: "🜃",
  },
  {
    id: "frecuencias-angelicales",
    slug: "frecuencias-angelicales",
    name: "Números Angelicales & Portales",
    description: "Frecuencias sincrónicas (11:11, 777, 444) para anclar intenciones.",
    symbol: "☉",
  },
  {
    id: "sahumerios-y-kits",
    slug: "sahumerios-y-kits",
    name: "Kits Rituales & Sahumerios",
    description: "Inciensos artesanales de monte, atados de salvia y kits de limpieza profunda.",
    symbol: "🜁",
  },
];

export const shopProducts: ShopProduct[] = [
  // 1. Quemadores Rúnicos y Aura (Principales solicitados)
  {
    id: "juego-quemador-piedra-aura-runas",
    slug: "juego-quemador-piedra-aura-runas",
    name: "Juego de Quemador de Incienso de Piedra Aura Runas",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Soporte de piedra de río taladrado a mano con Runas Sagradas y 12 varitas de incienso.",
    description:
      "Incluye 1 soporte de piedra de río, taladrado a mano y pintado con Runas Sagradas en dorado. Acompañado de un paquete de 12 varitas de incienso Bosque Sagrado Rúnico. Cada pieza representa conexión ancestral, equilibrio y protección energética.",
    ritualUse:
      "Colocar en el centro del altar al abrir un espacio de introspección o lectura rúnica. El orificio sujeta firmemente la varita mientras el humo eleva tu intención.",
    details: [
      "1 Soporte de piedra de río auténtica seleccionada por peso y balance",
      "Taladrado artesanal para varillas estándar de incienso natural",
      "Grabado y pátina dorada con símbolos rúnicos de protección",
      "Incluye 12 varitas de incienso artesanal «Bosque Sagrado Rúnico»",
      "Pieza irrepetible: forma y grano únicos por naturaleza",
    ],
    inStock: true,
    badge: "Precio Rúnico · Destacado",
    imageUrl: "/images/shop/piedra-aura-runas-dorada.png",
    featured: true,
  },
  {
    id: "juego-quemador-piedra-aura",
    slug: "juego-quemador-piedra-aura",
    name: "🌿 Juego de Quemador de Incienso de Piedra Aura",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    price: 149,
    formattedPrice: "MXN $149",
    shippingNote: "MÁS ENVÍO",
    tagline: "Soporte de río taladrado a mano + paquete de 12 varitas Bosque Sagrado.",
    description:
      "Incluye 1 soporte de piedra de río taladrado a mano y un paquete de 12 varitas de incienso Bosque Sagrado. Diseñado para espacios de calma, meditación y claridad interior.",
    ritualUse:
      "Ideal para sahumar el espacio de lectura, escritorio o zona de descanso antes de iniciar una sesión de meditación o estudio oracular.",
    details: [
      "1 Soporte de piedra de río pulida naturalmente por corrientes fluviales",
      "Taladro vertical para combustión vertical segura y limpia",
      "Incluye paquete con 12 varitas artesanales de Bosque Sagrado",
      "Resistente a la ceniza y fácil de limpiar con paño seco",
    ],
    inStock: true,
    badge: "Esencial Calma",
    imageUrl: "/images/shop/piedra-redonda-mandala-dorado.png",
    featured: true,
  },
  {
    id: "set-incienso-bosque-sagrado",
    slug: "set-incienso-bosque-sagrado",
    name: "🪶 Set de Incienso «Bosque Sagrado»",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits Rituales & Sahumerios",
    price: 89,
    formattedPrice: "MXN $89",
    shippingNote: "MÁS ENVÍO",
    tagline: "12 varitas artesanales de resinas naturales y aceites esenciales de monte.",
    description:
      "Incluye 12 varitas artesanales elaboradas con resinas naturales y aceites esenciales. Aroma: notas de madera, tierra y hierbas sagradas. Ideal para rituales de limpieza energética y conexión espiritual.",
    ritualUse:
      "Encender para armonizar atmósferas densas, purificar cristales o acompañar la tirada de cartas con notas amaderadas y terrosas.",
    details: [
      "12 Varitas artesanales extra largas de combustión lenta (40-45 min)",
      "Elaboradas con resinas vegetales puras, copal, maderas y aceites esenciales",
      "Humo blanco ligero, libre de aditivos derivados del petróleo",
      "Empaque sellado para preservar la potencia aromática botánica",
    ],
    inStock: true,
    badge: "Aroma Ceremonial",
    imageUrl: "/images/shop/inciensos-y-resinas.jpg",
    featured: true,
  },
  {
    id: "piedra-aura-dorada-ritual",
    slug: "piedra-aura-dorada-edicion-ritual",
    name: "💫 Piedra Aura Dorada – Edición Ritual",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de río tallada y pintada a mano con símbolos de protección y equilibrio.",
    description:
      "Piedra de río tallada y pintada a mano con símbolos de protección y equilibrio. Perfecta para acompañar rituales de meditación, sanación o manifestación.",
    ritualUse:
      "Sostener en las manos durante afirmaciones de abundancia y protección, o colocar sobre el paño de lectura para asentar las energías de la consulta.",
    details: [
      "Piedra de río natural con acabado semi-mate y pigmento áureo duradero",
      "Símbolos de equilibrio tallados artesanalmente en la superficie",
      "Forma ergonómica que cabe cómodamente en la palma de la mano",
      "Consagrada con sahumerio de resinas antes de empacar",
    ],
    inStock: true,
    badge: "Edición Ritual",
    imageUrl: "/images/shop/piedra-aura-corazon-chakras.png",
    featured: true,
  },
  {
    id: "kit-limpia-runas-salvia-palosanto",
    slug: "kit-limpia-runas-salvia-blanca-palo-santo",
    name: "Kit Ceremonial Limpia Runas con Salvia & Palo Santo",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits Rituales & Sahumerios",
    price: 349,
    formattedPrice: "MXN $349",
    shippingNote: "MÁS ENVÍO",
    tagline: "Plato de piedra de río para sahumado, atado de salvia blanca y palo santo.",
    description:
      "Un kit maestro de purificación telúrica. Integra una piedra plana de río consagrada con runas para depositar cenizas y sahumar, junto con un atado de salvia blanca silvestre y trozo de palo santo recolectado de forma sustentable.",
    ritualUse:
      "Usa la piedra plana como altar de combustión para la salvia y el palo santo mientras realizas limpieza áurica o bendición del hogar.",
    details: [
      "1 Piedra natural plana de río grabada con runas protectoras",
      "1 Atado ceremonial de Salvia Blanca Silvestre",
      "Varitas de Palo Santo aromático grado ceremonial",
      "Guía básica de sahumerio y palabras de activación",
    ],
    inStock: true,
    badge: "Kit Maestro",
    imageUrl: "/images/shop/kit-limpia-runas-salvia-palosanto.png",
    featured: true,
  },

  // 2. Frecuencias Angelicales y Sincronías
  {
    id: "piedra-natural-11-11",
    slug: "piedra-rio-alargada-portal-11-11",
    name: "Piedra de Río Portal 11:11 – Manifestación Angélica",
    categoryId: "frecuencias-angelicales",
    categoryName: "Números Angelicales & Portales",
    price: 229,
    formattedPrice: "MXN $229",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra alargada con grabado dremel del código sincrónico 11:11 en oro.",
    description:
      "El número 11:11 es el código sagrado de despertar y alineación con los propósitos del alma. Esta piedra alargada de río presenta la secuencia grabada en bajo relieve dorado, funcionando como ancla vibracional en momentos clave.",
    ritualUse:
      "Encender una varita en su orificio al momento de redactar intenciones de Luna Nueva o formular preguntas complejas al oráculo.",
    details: [
      "Piedra natural de forma alargada con base nivelada",
      "Grabado dremel de alta precisión bañado en tinta oro alquímico",
      "Taladro para varilla de incienso en extremo superior",
      "Medidas aprox: 9 a 13 cm de longitud",
    ],
    inStock: true,
    badge: "Código Angélico",
    imageUrl: "/images/shop/piedra-natural-11-11.png",
  },
  {
    id: "piedra-oscura-777-dorado",
    slug: "piedra-oscura-frecuencia-777-sincronia-divina",
    name: "Piedra Oscura Frecuencia 777 – Sincronía Divina",
    categoryId: "frecuencias-angelicales",
    categoryName: "Números Angelicales & Portales",
    price: 229,
    formattedPrice: "MXN $229",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado oscuro con el número sagrado 777 en pan de oro.",
    description:
      "El 777 simboliza la gracia divina, los siete cielos herméticos y la culminación de ciclos espirituales. Su contraste entre la piedra oscura volcánica y el dorado evoca la revelación en la oscuridad.",
    ritualUse:
      "Colocar en la esquina norte del paño de lectura para estabilizar energías telúricas durante tiradas profundas.",
    details: [
      "Piedra fluvial de coloración oscura natural (sin tintes sintéticos)",
      "Grabado profundo 777 con pátina oro resplandeciente",
      "Preparada para colocar incienso o como tótem de meditación",
    ],
    inStock: true,
    badge: "Frecuencia Mística",
    imageUrl: "/images/shop/piedra-oscura-777-dorado.png",
  },
  {
    id: "piedra-numero-444",
    slug: "piedra-angelica-444-proteccion-guia",
    name: "Piedra Angélica 444 – Protección y Fundación",
    categoryId: "frecuencias-angelicales",
    categoryName: "Números Angelicales & Portales",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de río grabada con el 444, sello de amparo y seguridad espiritual.",
    description:
      "La tríada del cuatro representa la estabilidad de los cuatro elementos y la custodia constante de tus guías espirituales. Una piedra sólida que aporta paz mental en momentos de incertidumbre.",
    ritualUse:
      "Mantener en la mesa de trabajo o junto a la cama para disipar miedos nocturnos y recordar tu firmeza interna.",
    details: [
      "Canto rodado suave de río seleccionado a mano",
      "Tipografía rúnico-moderna grabada y dorada",
      "Orificio artesanal para varita aromática",
    ],
    inStock: true,
    badge: "Guía Arcangélica",
    imageUrl: "/images/shop/piedra-numero-444.png",
  },

  // 3. Símbolos Sagrados y Geometría
  {
    id: "piedra-plana-flor-de-la-vida",
    slug: "piedra-plana-flor-de-la-vida-geometria-sagrada",
    name: "Piedra Plana Flor de la Vida – Geometría Sagrada",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 249,
    formattedPrice: "MXN $249",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado plano con la matriz de la Flor de la Vida grabada artesanalmente.",
    description:
      "La Flor de la Vida contiene los patrones de creación del universo conocido. Grabada sobre la cara plana de una piedra fluvial, emite una frecuencia ordenadora que disuelve el caos ambiental.",
    ritualUse:
      "Apoya cristales o varillas sobre ella para recargarlos de coherencia geométrica durante las fases lunares.",
    details: [
      "Superficie plana ideal para soporte de cuarzos o incienso",
      "Trazado geométrico concéntrico detallado",
      "Pintura dorada resistente al contacto y calor moderado",
    ],
    inStock: true,
    badge: "Geometría Sagrada",
    imageUrl: "/images/shop/piedra-plana-flor-de-la-vida.png",
    featured: true,
  },
  {
    id: "piedra-blanca-luna-estrellas",
    slug: "piedra-blanca-luna-estrellas-altar-nocturno",
    name: "Piedra Natural Blanca – Luna Mística & Constelaciones",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 249,
    formattedPrice: "MXN $249",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra blanca de río ilustrada a mano con luna creciente y cielo nocturno.",
    description:
      "Piedra fluvial de tono marfil claro, pintada a mano con un motivo de luna creciente dorada y estrellas celestes. Símbolo de intuición despierta, sueños lúcidos y sensibilidad oracular.",
    ritualUse:
      "Consagrada al Arcano XVIII (La Luna) y la Alta Sacerdotisa. Excelente compañera para diarios de sueños y lecturas nocturnas.",
    details: [
      "Piedra clara natural recolectada en riachuelos de alta montaña",
      "Ilustración manual detallada con acentos en pan de oro",
      "Taladrada para sujeción de varitas de incienso",
    ],
    inStock: true,
    badge: "Pintada a Mano",
    imageUrl: "/images/shop/piedra-blanca-luna-estrellas.png",
  },
  {
    id: "piedra-triple-luna-fases",
    slug: "piedra-triple-luna-fases-hecate",
    name: "Piedra Triple Luna – Arquetipos de la Diosa",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Las tres fases sagradas (Doncella, Madre y Anciana) cinceladas en río.",
    description:
      "Representación de la plenitud cíclica del tiempo femenino y los misterios oraculares. Una pieza cargada de sobriedad y magnetismo para lectoras y practicantes del sendero introspectivo.",
    ritualUse:
      "Trabajo de sanación de linaje, celebración de solsticios/equinoccios y rituales de luna llena.",
    details: [
      "Diseño de tres lunas concéntricas doradas",
      "Canto de río sólido y balanceado para quemado seguro",
      "Taladrado central para varilla de incienso",
    ],
    inStock: true,
    badge: "Arquetipo Lunar",
    imageUrl: "/images/shop/piedra-triple-luna-fases.png",
  },
  {
    id: "piedra-sol-cara-dorado",
    slug: "piedra-solar-alquimica-rostro-dorado",
    name: "Piedra Solar Alquímica – Rostro del Sol de Medianoche",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Sol radiante cincelado con expresión solemne y destellos dorados.",
    description:
      "Canaliza la fuerza nutricia y reveladora del Sol hermético. Atrae vitalidad, disuelve pesadumbres del ánimo y magnetiza la claridad intelectual en tu espacio de estudio.",
    ritualUse:
      "Encender al amanecer o antes de acometer proyectos de gran envergadura para encender el fuego de la voluntad.",
    details: [
      "Rostro solar tallado con ojos y rayos expansivos",
      "Acabado dorado bruñido que resalta la textura de la roca",
      "Orificio funcional para portar inciensos florales o resinas",
    ],
    inStock: true,
    badge: "Fuerza Solar",
    imageUrl: "/images/shop/piedra-sol-cara-dorado.png",
  },
  {
    id: "piedra-sol-dual-dorado",
    slug: "piedra-sol-dual-polaridad-y-equilibrio",
    name: "Piedra Sol Dual – Polaridad & Luz Interior",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto de río con mitad dorada reflectante y rayos en contraste.",
    description:
      "Una manifestación visual del principio de correspondencia y polaridad: como es adentro es afuera, como es la noche es el día. Equilibra fuerzas activas y receptivas en el consultante.",
    ritualUse:
      "Soporte de meditación en ejercicios de respiración polar (solar/lunar) y resolución de conflictos emocionales.",
    details: [
      "Diseño de mitad bañada en dorado y mitad en textura de roca desnuda",
      "Perforación central artesanal para varitas aromáticas",
      "Tratamiento protector mate contra el calor de la brasa",
    ],
    inStock: true,
    badge: "Equilibrio Áureo",
    imageUrl: "/images/shop/piedra-sol-dual-dorado.png",
  },
  {
    id: "piedra-om-tallado",
    slug: "piedra-sagrada-om-vibracion-primordial",
    name: "Piedra Sagrada Mantra OM – Vibración Primordial",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 179,
    formattedPrice: "MXN $179",
    shippingNote: "MÁS ENVÍO",
    tagline: "Glifo sánscrito sagrado del OM tallado sobre canto rodado pulido por el agua.",
    description:
      "El sonido raíz que dio forma al cosmos manifestado. El OM tallado en relieve sobre esta piedra de río propicia el silencio mental necesario para escuchar la voz de la intuición.",
    ritualUse:
      "Punto de concentración visual (Trataka) y soporte de sahumerio durante la entonación de mantras.",
    details: [
      "Talla precisa del glifo OM en dorado resplandeciente",
      "Superficie suave y pulida naturalmente por la corriente",
      "Orificio para incienso incluido",
    ],
    inStock: true,
    badge: "Mantra Primordial",
    imageUrl: "/images/shop/piedra-om-tallado.png",
  },
  {
    id: "piedra-ojo-turco",
    slug: "piedra-amuleto-ojo-turco-nazar",
    name: "Piedra Amuleto Ojo Turco – Escudo Nazar",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 189,
    formattedPrice: "MXN $189",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado pintado a mano con el amuleto tradicional contra malas energías.",
    description:
      "Un escudo telúrico para salvaguardar tu hogar, negocio o santuario. La sabiduría de las piedras de río absorbe y redirige miradas densas y vibraciones disonantes.",
    ritualUse:
      "Colocar frente a la puerta principal o junto al tarot para mantener el campo energético limpio de interferencias.",
    details: [
      "Ilustración nazar artesanal con pigmentos duraderos",
      "Perforada para inciensos purificadores de ruda o salvia",
      "Base estable que no se desliza",
    ],
    inStock: true,
    badge: "Protección Total",
    imageUrl: "/images/shop/piedra-ojo-turco.png",
  },
  {
    id: "piedra-ovalada-mandala-loto",
    slug: "piedra-ovalada-mandala-loto-6-petalos",
    name: "Piedra Ovalada Mandala Loto – Despertar & Serenidad",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Mandala de loto de 6 pétalos grabado con dremel sobre piedra ovalada de río.",
    description:
      "La flor de loto florece impecable sobre las aguas estancadas. Este mandala grabado sobre la piedra inspira superación, templanza y claridad mental en los momentos de mayor desafío.",
    ritualUse:
      "Acompaña la lectura del Arcano de La Templanza y la meditación zen.",
    details: [
      "Piedra ovalada de río con perfecta simetría natural",
      "Grabado dremel minucioso de pétalos y puntos dorados",
      "Orificio central para combustión uniforme",
    ],
    inStock: true,
    badge: "Loto Sagrado",
    imageUrl: "/images/shop/piedra-ovalada-mandala-loto.png",
  },
  {
    id: "piedra-ovalada-runas-dremel",
    slug: "piedra-runica-nordica-poder-ancestral",
    name: "Piedra Rúnica Nórdica – Sello de Poder Ancestral",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Runas del Futhark Antiguo talladas en relieve dremel con pátina oro nórdico.",
    description:
      "Grabada con glifos rúnicos vinculados a la victoria, la salud y la protección divina. Conecta con el vigor de los pueblos nórdicos y su respeto reverencial por las fuerzas de la naturaleza.",
    ritualUse:
      "Cargar talismanes sobre ella o quemar incienso de pino y sándalo para despejar dudas antes de decisiones cruciales.",
    details: [
      "Piedra de río de gran densidad y peso reconfortante",
      "Talla profunda que no se borra con el paso del tiempo",
      "Taladrado para soporte de varitas de incienso",
    ],
    inStock: true,
    badge: "Fuerza Nórdica",
    imageUrl: "/images/shop/piedra-ovalada-runas-dremel.png",
  },
  {
    id: "piedra-7-chakras-puntos",
    slug: "piedra-alineacion-7-chakras-vortices",
    name: "Piedra de Alineación 7 Chakras – Centros Sutiles",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra fluvial con la secuencia de vórtices energéticos punteada a mano.",
    description:
      "Desde el chakra raíz hasta la corona, esta piedra condensa el mapa bioenergético del ser humano. Excelente para alinear centros sutiles y restaurar el flujo vital.",
    ritualUse:
      "Colocar sobre el cuerpo durante meditaciones de relajación o junto al vaso de agua ceremonial.",
    details: [
      "Siete marcadores circulares dorados que corresponden a los centros",
      "Piedra suavemente erosionada por el agua dulce",
      "Perforación para incienso de armonización",
    ],
    inStock: true,
    badge: "Armonía Sutil",
    imageUrl: "/images/shop/piedra-7-chakras-puntos.png",
  },
  {
    id: "piedra-corazon-infinito",
    slug: "piedra-corazon-infinito-amor-sagrado",
    name: "Piedra Corazón Infinito – Amor Sagrado & Vínculo",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Mandalas",
    price: 189,
    formattedPrice: "MXN $189",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de río con el lazo infinito entrelazado con el corazón sagrado.",
    description:
      "Símbolo del amor incondicional, la reconciliación y los lazos que trascienden el tiempo. Suaviza la dureza del corazón y abre canales para perdonar y recibir bendiciones.",
    ritualUse:
      "Compañera inseparable de lecturas de Sinastría y Tarot del Amor.",
    details: [
      "Forma redondeada con trazado fino en oro",
      "Base plana para asentarse sin balanceos sobre el altar",
      "Taladrada para varilla de incienso de rosas o jazmín",
    ],
    inStock: true,
    badge: "Amor Consciente",
    imageUrl: "/images/shop/piedra-corazon-infinito.png",
  },
];
