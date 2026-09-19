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
  theme?: "doble-perforacion" | "reiki" | "runas" | "geometria" | "angelical" | "altar";
  isDoublePerforation?: boolean;
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

export interface CreativeProcessImage {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export const creativeProcessGallery: CreativeProcessImage[] = [
  {
    id: "proceso-1",
    src: "/images/shop/proceso/proceso-creativo-1.jpeg",
    title: "Creación en Plena Naturaleza",
    caption: "Trazado a mano y pinceladas áureas sobre piedras de río recolectadas en cauce natural.",
  },
  {
    id: "proceso-2",
    src: "/images/shop/proceso/proceso-creativo-2.jpeg",
    title: "Detalle de Símbolos Sagrados",
    caption: "Pintado minucioso de runas, geometrías y sellos de luz bajo la luz del sol.",
  },
  {
    id: "proceso-3",
    src: "/images/shop/proceso/proceso-creativo-3.jpeg",
    title: "Encuentro Creativo en Comunidad",
    caption: "Compartiendo la devoción del arte manual y la intención ceremonial en grupo.",
  },
  {
    id: "proceso-4",
    src: "/images/shop/proceso/proceso-creativo-4.jpeg",
    title: "Concentración y Precisión",
    caption: "Cada curva y pigmento se asienta sobre la morfología mineral única de cada piedra.",
  },
  {
    id: "proceso-5",
    src: "/images/shop/proceso/proceso-creativo-5.jpeg",
    title: "Taller al Aire Libre",
    caption: "Inspiración directa conectando con los elementos: tierra, agua y aire libre.",
  },
  {
    id: "proceso-6",
    src: "/images/shop/proceso/proceso-creativo-6.jpeg",
    title: "Selección y Pigmentos Dorados",
    caption: "Aplicación de tonos oro y sellado protector para preservar la obra en el altar.",
  },
  {
    id: "proceso-7",
    src: "/images/shop/proceso/proceso-creativo-7.jpeg",
    title: "Compañerismo & Propósito",
    caption: "El trabajo artesanal como vía de meditación activa y presencia plena.",
  },
  {
    id: "proceso-8",
    src: "/images/shop/proceso/proceso-creativo-8.jpeg",
    title: "Texturas y Formas Fluviales",
    caption: "Respetando los cantos rodados originales pulidos durante décadas por la corriente.",
  },
  {
    id: "proceso-9",
    src: "/images/shop/proceso/proceso-creativo-9.jpeg",
    title: "El Alma de Cada Pieza",
    caption: "Manos artesanas que transmiten calidez y reverencia en cada trazo ceremonial.",
  },
  {
    id: "proceso-10",
    src: "/images/shop/proceso/proceso-creativo-10.jpeg",
    title: "Consagración al Fuego",
    caption: "Sesión nocturna de pintura y activación junto a las brasas de la fogata sagrada.",
  },
  {
    id: "proceso-11",
    src: "/images/shop/proceso/proceso-creativo-11.jpeg",
    title: "Alquimia Ceremonial",
    caption: "El fuego como cuarto elemento que sella la energía viva de cada piedra de río.",
  },
];

export const artisanManifesto = {
  eyebrow: "Colección Viva de Piezas Únicas de Río",
  title: "Cada proceso es diferente, cada colección es diferente, cada piedra es única",
  description:
    "Nuestras piezas provienen de cauces naturales de río moldeados por el agua durante siglos. Ninguna piedra es idéntica a otra: cada una es recolectada a mano, taladrada y grabada con pigmentos áureos bajo momentos ceremoniales propicios. La forma, textura, peso y vetas de la pieza que llegue a tus manos serán irrepetibles, guardando una impronta sagrada y personal para tu altar.",
  highlights: [
    {
      title: "Piedras Naturales de Río",
      text: "Extraídas respetando el cauce, pulidas de manera orgánica por la corriente fluvial.",
    },
    {
      title: "Taladrado Simple & Doble Perforación",
      text: "Orificios individuales o duales para sahumerio simultáneo y mezclas aromáticas.",
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
    id: "doble-perforacion",
    slug: "doble-perforacion",
    name: "Doble Perforación (Dual)",
    description: "Soportes de piedra con dos orificios para sahumerio dual y mezcla de aromas.",
    symbol: "⚡",
  },
  {
    id: "reiki-sanacion",
    slug: "reiki-sanacion",
    name: "Reiki & Sanación",
    description: "Símbolos Cho Ku Rei, Hagstones (piedras bruja) y piedras de armonización.",
    symbol: "🌀",
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
    name: "Símbolos Sagrados & Sol",
    description: "Geometría sagrada, soles alquímicos, lunas y mandalas grabados en piedra.",
    symbol: "🜃",
  },
  {
    id: "frecuencias-angelicales",
    slug: "frecuencias-angelicales",
    name: "Números Angelicales",
    description: "Frecuencias sincrónicas (11:11, 777, 444) para anclar intenciones.",
    symbol: "☉",
  },
  {
    id: "sahumerios-y-kits",
    slug: "sahumerios-y-kits",
    name: "Kits & Bandejas de Altar",
    description: "Inciensos de monte, atados de salvia, bandejas de río y kits de limpieza profunda.",
    symbol: "🜁",
  },
];

export const shopProducts: ShopProduct[] = [
  // ==========================================
  // 1. COLECCIÓN DOBLE PERFORACIÓN (DUAL)
  // ==========================================
  {
    id: "quemador-rio-doble-basalto",
    slug: "quemador-rio-doble-basalto-ceremonial",
    name: "Quemador de Basalto de Río – Doble Perforación",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 269,
    formattedPrice: "MXN $269",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de basalto oscuro con doble orificio para combustión dual simultánea.",
    description:
      "Soporte esculpido sobre basalto fluvial volcánico de alta densidad. Presenta dos perforaciones paralelas para encender simultáneamente dos varitas de incienso, permitiendo fundir notas complementarias (ej. Sándalo y Lavanda) o intensificar el sahumerio en rituales mayores.",
    ritualUse:
      "Sahumado dual de espacios amplios o invocación de las polaridades sol y luna en ceremonias de luna llena.",
    details: [
      "Basalto natural de río seleccionado por peso, densidad y textura volcánica",
      "Doble perforación artesanal calibrada para varitas estándar de resina",
      "Retiene el calor de la brasa sin alterar la superficie",
      "Medidas aprox: 10 a 14 cm de largo x 4 a 6 cm de ancho",
    ],
    inStock: false,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/basalt_incense_holder_1.jpg",
    featured: true,
  },
  {
    id: "quemador-rio-doble-oro-alquimico",
    slug: "quemador-rio-doble-oro-alquimico",
    name: "Quemador de Río Áureo – Doble Perforación Ceremonial",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 279,
    formattedPrice: "MXN $279",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado con detalles en pan de oro y dos orificios para varillas aromáticas.",
    description:
      "Una pieza magna de altar donde la roca viva de río se funde con pigmentos en pan de oro. Sus dos orificios de combustión están dispuestos para crear dos columnas de humo paralelas, simbolizando las columnas de la sabiduría hermética.",
    ritualUse:
      "Perfecto para acompañar lecturas oraculares profundas o ceremonias de consagración de herramientas sagradas.",
    details: [
      "Piedra fluvial con pátina de pan de oro sellada al calor",
      "Doble orificio de perforación artesanal limpia",
      "Base sólida antideslizante",
      "Incluye bolsita protectora de lino ceremonial",
    ],
    inStock: true,
    badge: "Doble Perforación · Pan de Oro",
    imageUrl: "/images/shop/gold_painted_river_stone_incense_holder.jpg",
    featured: true,
  },
  {
    id: "quemador-rio-doble-artesanal",
    slug: "quemador-rio-doble-artesanal-zen",
    name: "Quemador de Río Rústico – Doble Perforación Zen",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 239,
    formattedPrice: "MXN $239",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de río natural con textura fluvial virgen y doble taladro artesanal.",
    description:
      "Sobriedad telúrica en estado puro. Moldeada únicamente por la corriente fluvial durante siglos, esta pieza mantiene su tacto áspero mineral y dos orificios precisos para acompañar prácticas de silencio y respiración consciente.",
    ritualUse:
      "Meditación zen, respiración pranayama y limpieza perimetral del espacio de descanso.",
    details: [
      "Piedra natural virgen sin químicos ni barnices plásticos",
      "Doble orificio taladrado a mano con broca de diamante",
      "Apto para cenizas calientes y fácil limpieza",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/handmade_river_stone_incense_holder.jpg",
  },
  {
    id: "quemador-rio-doble-purpura-tarot",
    slug: "quemador-fluvial-purpura-doble-perforacion-oracular",
    name: "Quemador Fluvial Púrpura – Doble Perforación Oracular",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 259,
    formattedPrice: "MXN $259",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra con tonalidad mística púrpura y doble taladro para sahumerio de cartas.",
    description:
      "Inspirada en el rayo transmutador del Arcano Mayor de La Templanza y el chakra corona. Sus dos orificios permiten aromatizar la baraja con fragancias de mirra y copal al unísono.",
    ritualUse:
      "Purificación de mazos de tarot y cristales antes y después de cada consulta privada.",
    details: [
      "Tonalidad mineral púrpura/ametista natural con destellos dorados",
      "Doble perforación vertical segura",
      "Consagrada con sahumerio de salvia blanca",
    ],
    inStock: false,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/purple_tarot_incense_holder.jpg",
  },
  {
    id: "quemador-rio-doble-reiki-simbolos",
    slug: "quemador-reiki-sagrado-doble-perforacion",
    name: "Quemador Reiki Sagrado – Doble Perforación de Sanación",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "reiki",
    isDoublePerforation: true,
    price: 269,
    formattedPrice: "MXN $269",
    shippingNote: "MÁS ENVÍO",
    tagline: "Símbolos de armonización grabados y dos orificios para inciensos de purificación.",
    description:
      "Diseñado para practicantes de Reiki y terapeutas holísticos. La piedra canaliza la energía vital universal potenciada por dos varitas aromáticas encendidas simultáneamente.",
    ritualUse:
      "Acompañamiento en camilla de Reiki, alineación de chakras o inicio de terapias energéticas.",
    details: [
      "Grabado manual con simbología de apertura y flujo bioenergético",
      "Doble perforación simétrica para balance sutil",
      "Piedra fluvial de tacto tibio y reconfortante",
    ],
    inStock: true,
    badge: "Doble Perforación · Reiki",
    imageUrl: "/images/shop/reiki_stone_incense_holder.jpg",
    featured: true,
  },
  {
    id: "quemador-rio-doble-canto-n14",
    slug: "canto-rodado-fluvial-14-doble-perforacion",
    name: "Canto Rodado Fluvial N° 14 – Doble Perforación",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 249,
    formattedPrice: "MXN $249",
    shippingNote: "MÁS ENVÍO",
    tagline: "Forma anatómica de río seleccionada con perforación dual simétrica.",
    description:
      "Una piedra que reposa con firmeza absoluta sobre cualquier superficie. Su silueta fluida recuerda la paciencia milenaria del agua sobre la roca.",
    ritualUse:
      "Ideal para sahumerio cotidiano en el escritorio, velador o rincón de lectura.",
    details: [
      "Doble taladro artesanal para encendido simultáneo",
      "Superficie pulida suave al tacto",
      "Resistente a la ceniza",
    ],
    inStock: false,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/river_stone_incense_holder_14.jpg",
  },
  {
    id: "quemador-rio-doble-canto-n15",
    slug: "canto-rodado-fluvial-15-doble-perforacion-altar",
    name: "Canto Rodado Fluvial N° 15 – Doble Perforación de Altar",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 249,
    formattedPrice: "MXN $249",
    shippingNote: "MÁS ENVÍO",
    tagline: "Base plana perfecta y doble taladro para mezclar aromas de madera y flores.",
    description:
      "Ejemplar robusto recolectado en lecho de río cristalino. Presenta dos cavidades perpendiculares que mantienen las varillas erguidas y seguras.",
    ritualUse:
      "Para rituales de petición donde se ofrecen simultáneamente inciensos a dos intenciones o deidades.",
    details: [
      "Doble orificio de 3 mm compatible con todo tipo de varitas artesanales",
      "Base naturalmente nivelada que no se tambalea",
      "Peso aprox: 350 a 500 gramos",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/river_stone_incense_holder_15.jpg",
  },
  {
    id: "quemador-rio-doble-borgoña",
    slug: "piedra-rio-tono-borgoña-doble-perforacion",
    name: "Piedra de Río Tono Borgoña – Doble Perforación",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 259,
    formattedPrice: "MXN $259",
    shippingNote: "MÁS ENVÍO",
    tagline: "Vetas rojizas y terrosas de río con perforación doble para sahumado dual.",
    description:
      "Mineral de tonalidad borgoña profundo con óxidos de hierro naturales. Conecta con el chakra raíz (Muladhara), aportando enraizamiento y fuerza física.",
    ritualUse:
      "Sesiones de conexión con la tierra, superación del cansancio y protección contra el agotamiento psíquico.",
    details: [
      "Tonalidad mineral borgoña natural irrepetible",
      "Doble orificio de combustión vertical",
      "Consagración previa con copal negro",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/burgundy_stone_incense_holder.jpg",
  },
  {
    id: "quemador-rio-doble-bosque-profundo",
    slug: "piedra-fluvial-bosque-profundo-doble-perforacion",
    name: "Piedra Fluvial Bosque Profundo – Doble Perforación",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 239,
    formattedPrice: "MXN $239",
    shippingNote: "MÁS ENVÍO",
    tagline: "Tonalidad mineral verde-oliva oscura con dos orificios de combustión vertical.",
    description:
      "Recolectada en arroyos boscosos de alta serranía. Su tono verdoso y su porosidad sutil transportan el espíritu del bosque húmedo a tu santuario.",
    ritualUse:
      "Encender dos varitas de Bosque Sagrado o pino para crear una atmósfera de retiro y quietud natural.",
    details: [
      "Piedra fluvial con pigmentación verde-oliva natural",
      "Doble perforación artesanal precisa",
      "Excelente estabilidad sobre telas de altar",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/image_20260918_104707.jpg",
  },
  {
    id: "quemador-rio-doble-terracota",
    slug: "canto-rodado-terracota-natural-doble-orificio",
    name: "Canto Rodado Terracota Natural – Doble Orificio",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 229,
    formattedPrice: "MXN $229",
    shippingNote: "MÁS ENVÍO",
    tagline: "Calidez de tierra y agua con orificios duales para varillas aromáticas.",
    description:
      "Cálida y acogedora como la arcilla cocida por el sol. Sus dos perforaciones permiten aromatizar veladas de lectura introspectiva.",
    ritualUse:
      "Tiradas de tarot enfocadas en hogar, familia, estabilidad económica y raíces.",
    details: [
      "Tono terroso suave",
      "Doble perforación taladrada a baja revolución para preservar la piedra",
      "Fácil de transportar y limpiar",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/image_20260918_105459.jpg",
  },
  {
    id: "quemador-rio-doble-rustica-ancestral",
    slug: "piedra-ancestral-rio-doble-perforacion-rustica",
    name: "Piedra Ancestral de Río – Doble Perforación Rústica",
    categoryId: "doble-perforacion",
    categoryName: "Doble Perforación (Dual)",
    theme: "doble-perforacion",
    isDoublePerforation: true,
    price: 239,
    formattedPrice: "MXN $239",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra robusta con presencia rústica y doble taladro para rituales prolongados.",
    description:
      "Una piedra pesada y rotunda con marcas geológicas visibles. Diseñada para quienes aprecian la estética cruda y sin artificios de los elementos de la naturaleza.",
    ritualUse:
      "Fijación de intenciones a largo plazo y purificación de objetos de poder.",
    details: [
      "Pieza de peso substancial que no se desplaza",
      "Doble perforación funcional",
      "Pátina fluvial añeja",
    ],
    inStock: true,
    badge: "Doble Perforación",
    imageUrl: "/images/shop/image_20260918_105509.jpg",
  },

  // ==========================================
  // 2. COLECCIÓN REIKI & SANACIÓN
  // ==========================================
  {
    id: "trio-piedras-reiki-cho-ku-rei",
    slug: "trio-sagrado-rio-simbolo-cho-ku-rei-reiki",
    name: "Trío Sagrado de Río – Símbolo Cho Ku Rei (Reiki)",
    categoryId: "reiki-sanacion",
    categoryName: "Reiki & Sanación",
    theme: "reiki",
    price: 289,
    formattedPrice: "MXN $289",
    shippingNote: "MÁS ENVÍO",
    tagline: "Conjunto de 3 piedras de río grabadas con el símbolo de poder y protección Reiki.",
    description:
      "El Cho Ku Rei es el interruptor de la energía cósmica ('Pon todo el poder del universo aquí'). Este trío de cantos rodados de río está grabado en oro con el símbolo de poder, permitiendo trazar una rejilla de protección triangular en tu altar o espacio terapéutico.",
    ritualUse:
      "Colocar en triángulo alrededor del consultante, del mazo de tarot o en los tres vértices de la habitación para sellar energéticamente el espacio.",
    details: [
      "Set de 3 piedras de río seleccionadas por afinidad y armonía visual",
      "Grabado manual con el trazo sagrado del Cho Ku Rei en pan de oro",
      "Consagración con sintonización energética previa al empaque",
      "Incluye bolsita de terciopelo negro",
    ],
    inStock: true,
    badge: "Sello Cho Ku Rei · Set 3 Piezas",
    imageUrl: "/images/shop/cho_ku_rei_pebbles.jpg",
    featured: true,
  },
  {
    id: "canto-rio-cho-ku-rei-oro",
    slug: "canto-rodado-cho-ku-rei-oro-alquimico",
    name: "Canto Rodado Cho Ku Rei en Oro Alquímico",
    categoryId: "reiki-sanacion",
    categoryName: "Reiki & Sanación",
    theme: "reiki",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra de palma con el símbolo Cho Ku Rei en pan de oro para anclar energía vital.",
    description:
      "Una piedra pulida por el río diseñada para ser sostenida en la palma durante meditaciones, autotratamientos de Reiki o momentos de necesidad de fortaleza espiritual.",
    ritualUse:
      "Sostener en la mano dominante mientras se visualiza el símbolo activándose con luz dorada brillante.",
    details: [
      "Canto rodado suave de gran ergonomía",
      "Pintura en pan de oro de alta adherencia",
      "Orificio opcional para colocar varita de incienso de sándalo",
    ],
    inStock: false,
    badge: "Poder Reiki",
    imageUrl: "/images/shop/gold_cho_ku_rei_pebble.jpg",
  },
  {
    id: "piedra-bruja-hagstone-reiki-oro",
    slug: "piedra-bruja-fluvial-hagstone-oro-sagrado",
    name: "Piedra Bruja Fluvial (Hagstone) con Oro Sagrado",
    categoryId: "reiki-sanacion",
    categoryName: "Reiki & Sanación",
    theme: "reiki",
    price: 299,
    formattedPrice: "MXN $299",
    shippingNote: "MÁS ENVÍO",
    tagline: "Piedra con perforación natural creada por el agua y detalles dorados sagrados.",
    description:
      "Las 'Hagstones' o Piedras de Odín son tesoros folclóricos escasos: piedras perforadas a través de miles de años únicamente por la fricción del agua y sedimentos. En la tradición celta y hermética, mirar a través de su agujero disipa ilusiones y engaños psíquicos.",
    ritualUse:
      "Mirar a través de su orificio antes de formular preguntas críticas al tarot o colgar en el umbral para desviar mal de ojo.",
    details: [
      "Perforación 100% natural producida por la corriente del río (no taladrada)",
      "Detalles perimetrales en pan de oro ceremonial",
      "Pieza mística de colección sumamente singular",
    ],
    inStock: true,
    badge: "Hagstone · Orificio Natural",
    imageUrl: "/images/shop/reiki_hagstone_gold.jpg",
    featured: true,
  },
  {
    id: "piedra-meditacion-reiki-dorada",
    slug: "piedra-meditacion-reiki-destellos-aureos",
    name: "Piedra de Meditación Reiki – Destellos Áureos",
    categoryId: "reiki-sanacion",
    categoryName: "Reiki & Sanación",
    theme: "reiki",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado suave para imposición de manos, meditación y alineación de chakras.",
    description:
      "Piedra fluvial de forma serena con micropuntos dorados que representan el mapa de meridianos energéticos. Perfecta para masajes de manos o anclaje en el plexo solar.",
    ritualUse:
      "Colocar sobre el centro del pecho (Anahata) o la frente (Ajna) en estados de relajación guiada.",
    details: [
      "Tacto sedoso pulido naturalmente por la arena fluvial",
      "Micro-puntos en oro alquímico",
      "Compacta y liviana para portar en bolso o bolsillo",
    ],
    inStock: false,
    badge: "Sanación Energética",
    imageUrl: "/images/shop/reiki_pebble_gold.jpg",
  },

  // ==========================================
  // 3. QUEMADORES RÚNICOS Y AURA
  // ==========================================
  {
    id: "juego-quemador-piedra-aura-runas",
    slug: "juego-quemador-piedra-aura-runas",
    name: "Juego de Quemador de Incienso de Piedra Aura Runas",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    theme: "runas",
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
    theme: "runas",
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
    id: "piedra-aura-dorada-ritual",
    slug: "piedra-aura-dorada-edicion-ritual",
    name: "💫 Piedra Aura Dorada – Edición Ritual",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    theme: "runas",
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
    id: "piedra-ovalada-runas-dremel",
    slug: "piedra-runica-nordica-poder-ancestral",
    name: "Piedra Rúnica Nórdica – Sello de Poder Ancestral",
    categoryId: "portainciensos-y-runas",
    categoryName: "Quemadores Rúnicos & Aura",
    theme: "runas",
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

  // ==========================================
  // 4. SÍMBOLOS SAGRADOS, SOL & GEOMETRÍA
  // ==========================================
  {
    id: "piedra-rio-simbolo-solar",
    slug: "piedra-rio-simbolo-solar-ancestral",
    name: "Piedra de Río Símbolo Solar Ancestral",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
    price: 219,
    formattedPrice: "MXN $219",
    shippingNote: "MÁS ENVÍO",
    tagline: "Grabado del sol radiante primitivo sobre piedra pulida por el río.",
    description:
      "El sol es el dador de vida y la luz que despeja las brumas de la mente. Cincelado en trazos arcaicos con destellos áureos, este soporte conecta con el Arcano XIX y la energía solar activa.",
    ritualUse:
      "Encender por las mañanas para despertar la vitalidad, creatividad y resolución frente a proyectos pendientes.",
    details: [
      "Grabado solar rústico inspirado en petroglifos antiguos",
      "Orificio para varilla de incienso cítrico o romero",
      "Roca de lecho fluvial resistente al calor",
    ],
    inStock: true,
    badge: "Símbolo Solar",
    imageUrl: "/images/shop/river_stone_sun_symbol.jpg",
  },
  {
    id: "piedra-colgante-loto-borgoña",
    slug: "piedra-amuleto-loto-sagrado-borgoña",
    name: "Piedra Amuleto Loto Sagrado – Tono Borgoña",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
    price: 199,
    formattedPrice: "MXN $199",
    shippingNote: "MÁS ENVÍO",
    tagline: "Canto rodado con flor de loto en relieve dorado y matiz borgoña profundo.",
    description:
      "Una joya de río que aúna la delicadeza del loto de la iluminación con la fuerza terrenal de la roca rojiza. Funciona como talismán de cabecera o soporte meditativo.",
    ritualUse:
      "Meditaciones de renacimiento personal y superación de etapas difíciles con dignidad y gracia.",
    details: [
      "Flor de loto dorada grabada en superficie suave",
      "Matiz borgoña natural de la roca",
      "Formato compacto ideal para altares pequeños",
    ],
    inStock: false,
    badge: "Loto Sagrado",
    imageUrl: "/images/shop/burgundy_lotus_pendant.jpg",
  },
  {
    id: "quemador-rio-pintado-orquidea-dorada",
    slug: "quemador-rio-ilustrado-motivos-celestiales",
    name: "Quemador de Río Ilustrado – Motivos Celestiales",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
    price: 239,
    formattedPrice: "MXN $239",
    shippingNote: "MÁS ENVÍO",
    tagline: "Soporte taladrado para incienso con ilustración sagrada en pan de oro.",
    description:
      "Cada trazo fue pintado a pincel fino con pigmentos áureos indelebles. Sus filigranas evocan los movimientos celestes y las estrellas guías del navegante nocturno.",
    ritualUse:
      "Invocación de ángeles guías y delimitación del círculo sagrado antes de barajar las cartas.",
    details: [
      "Pintura artística manual en pan de oro",
      "Perforación central para incienso",
      "Sellado con laca mate de alta resistencia",
    ],
    inStock: true,
    badge: "Arte Ceremonial",
    imageUrl: "/images/shop/painted_river_stone_incense_holder.jpg",
  },
  {
    id: "piedra-rio-pintada-motivos-sagrados",
    slug: "piedra-fluvial-ilustrada-geometria-sagrada",
    name: "Piedra Fluvial Ilustrada – Geometría Sagrada",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
    price: 229,
    formattedPrice: "MXN $229",
    shippingNote: "MÁS ENVÍO",
    tagline: "Pintura ritual con pigmentos áureos y sellado mate sobre roca de río.",
    description:
      "Canto rodado plano con ornamentación geométrica consagrada. Su presencia visual transforma cualquier rincón profano en un espacio de recogimiento espiritual.",
    ritualUse:
      "Tótem de contemplación visual (Trataka) para calmar la mente antes de dormir.",
    details: [
      "Trazos geométricos minuciosos",
      "Base firme y segura",
      "Orificio funcional para incienso",
    ],
    inStock: true,
    badge: "Pintada a Mano",
    imageUrl: "/images/shop/painted_river_stone.jpg",
  },
  {
    id: "piedra-plana-flor-de-la-vida",
    slug: "piedra-plana-flor-de-la-vida-geometria-sagrada",
    name: "Piedra Plana Flor de la Vida – Geometría Sagrada",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    inStock: false,
    badge: "Fuerza Solar",
    imageUrl: "/images/shop/piedra-sol-cara-dorado.png",
  },
  {
    id: "piedra-sol-dual-dorado",
    slug: "piedra-sol-dual-polaridad-y-equilibrio",
    name: "Piedra Sol Dual – Polaridad & Luz Interior",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    id: "piedra-7-chakras-puntos",
    slug: "piedra-alineacion-7-chakras-vortices",
    name: "Piedra de Alineación 7 Chakras – Centros Sutiles",
    categoryId: "simbolos-y-geometria",
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    categoryName: "Símbolos Sagrados & Sol",
    theme: "geometria",
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
    inStock: false,
    badge: "Amor Consciente",
    imageUrl: "/images/shop/piedra-corazon-infinito.png",
  },

  // ==========================================
  // 5. NÚMEROS ANGELICALES Y PORTALES
  // ==========================================
  {
    id: "piedra-natural-11-11",
    slug: "piedra-rio-alargada-portal-11-11",
    name: "Piedra de Río Portal 11:11 – Manifestación Angélica",
    categoryId: "frecuencias-angelicales",
    categoryName: "Números Angelicales",
    theme: "angelical",
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
    categoryName: "Números Angelicales",
    theme: "angelical",
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
    inStock: false,
    badge: "Frecuencia Mística",
    imageUrl: "/images/shop/piedra-oscura-777-dorado.png",
  },
  {
    id: "piedra-numero-444",
    slug: "piedra-angelica-444-proteccion-guia",
    name: "Piedra Angélica 444 – Protección y Fundación",
    categoryId: "frecuencias-angelicales",
    categoryName: "Números Angelicales",
    theme: "angelical",
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

  // ==========================================
  // 6. KITS, BANDEJAS DE ALTAR Y SAHUMERIOS
  // ==========================================
  {
    id: "bandeja-altar-rio-cenizas-incienso",
    slug: "bandeja-ceremonial-rio-incienso-cenizas",
    name: "Bandeja Ceremonial de Río para Incienso & Cenizas",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
    price: 319,
    formattedPrice: "MXN $319",
    shippingNote: "MÁS ENVÍO",
    tagline: "Plato de piedra natural para depositar cenizas, quemar resinas o colocar varillas.",
    description:
      "Pieza de lecho fluvial ahuecada de forma natural por el desgaste del agua. Funciona como bandeja recolectora de cenizas de incienso, cuenco para resinas sobre carbón o soporte para cristales de transmutación.",
    ritualUse:
      "Recipiente seguro e incombustible para quemar salvia, ruda, palo santo o conos de incienso en tu mesa ritual.",
    details: [
      "Piedra cóncava natural seleccionada",
      "100% resistente al calor directo y la ceniza",
      "Medidas aprox: 15 a 20 cm de diámetro",
      "Pieza pesada y de gran presencia en el altar",
    ],
    inStock: true,
    badge: "Bandeja de Río · Altar",
    imageUrl: "/images/shop/river_stone_incense_tray.jpg",
    featured: true,
  },
  {
    id: "bandeja-altar-piedras-tarot",
    slug: "bandeja-altar-fluvial-lecturas-tarot",
    name: "Bandeja de Altar Fluvial para Lecturas de Tarot",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
    price: 349,
    formattedPrice: "MXN $349",
    shippingNote: "MÁS ENVÍO",
    tagline: "Set de bandeja y piedras consagradas para acompañar la mesa del tarotista.",
    description:
      "Una composición ceremonial que incluye una bandeja de roca fluvial pulida y piedras de río seleccionadas para delimitar el espacio de la tirada. Evita que corrientes dispersas interfieran con la concentración del lector.",
    ritualUse:
      "Disponer junto al tapiz de lectura como custodio de los cuarzos o para sostener el sahumador encendido.",
    details: [
      "Bandeja de río amplia con cantos rodados complementarios",
      "Pátinas con símbolos de protección discretos",
      "Embalaje ceremonial reforzado para traslado seguro",
    ],
    inStock: true,
    badge: "Colección Tarotista",
    imageUrl: "/images/shop/tarot_stones_tray.jpg",
    featured: true,
  },
  {
    id: "kit-altar-mistico-incienso-flatlay",
    slug: "kit-altar-mistico-piedra-varillas-sagradas",
    name: "Kit de Altar Místico con Piedra & Varillas Sagradas",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
    price: 329,
    formattedPrice: "MXN $329",
    shippingNote: "MÁS ENVÍO",
    tagline: "Conjunto completo con quemador de río, varillas botánicas y elementos de altar.",
    description:
      "El punto de partida ideal para quien desea fundar su altar personal. Reúne un quemador de río taladrado a mano, un atado de hierbas purificadoras y un paquete exclusivo de varillas de incienso artesanal de monte.",
    ritualUse:
      "Encendido inicial para consagrar una nueva vivienda, consultorio o espacio de meditación íntimo.",
    details: [
      "1 Quemador de piedra de río seleccionado a mano",
      "1 Paquete de 12 varitas de incienso Bosque Sagrado",
      "Elementos botánicos para bendición inicial",
      "Caja protectora rígida con sello de ARCANO",
    ],
    inStock: true,
    badge: "Kit Completo de Altar",
    imageUrl: "/images/shop/mystical_incense_tarot_flatlay.jpg",
  },
  {
    id: "kit-ceremonial-plano-incienso",
    slug: "set-ceremonial-incienso-soporte-piedra",
    name: "Set Ceremonial de Incienso & Soporte de Piedra",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
    price: 299,
    formattedPrice: "MXN $299",
    shippingNote: "MÁS ENVÍO",
    tagline: "Edición con quemador de río, incienso natural y guía de armonización.",
    description:
      "Equilibrio entre forma y aroma. Cada elemento ha sido purificado para crear una experiencia olfativa y espiritual de alta vibración.",
    ritualUse:
      "Acompañar lecturas de tarot diarias y momentos de recogimiento personal.",
    details: [
      "Soporte de río taladrado con base estable",
      "Selección de varitas botánicas aromáticas de alta pureza",
      "Folleto explicativo con oraciones de apertura",
    ],
    inStock: true,
    badge: "Set Ceremonial",
    imageUrl: "/images/shop/incense_kit_flatlay.jpg",
  },
  {
    id: "kit-limpia-runas-salvia-palosanto",
    slug: "kit-limpia-runas-salvia-blanca-palo-santo",
    name: "Kit Ceremonial Limpia Runas con Salvia & Palo Santo",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
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
  {
    id: "set-incienso-bosque-sagrado",
    slug: "set-incienso-bosque-sagrado",
    name: "🪶 Set de Incienso «Bosque Sagrado»",
    categoryId: "sahumerios-y-kits",
    categoryName: "Kits & Bandejas de Altar",
    theme: "altar",
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
];
