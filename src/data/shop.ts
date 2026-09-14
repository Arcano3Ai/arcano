export interface ShopCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  symbol: string;
  imageUrl: string;
}

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number;
  formattedPrice: string;
  tagline: string;
  description: string;
  ritualUse: string;
  details: string[];
  inStock: boolean;
  badge?: string;
  imageUrl: string;
  featured?: boolean;
}

export const shopCategories: ShopCategory[] = [
  {
    id: "velas-y-sahumerios",
    slug: "velas-y-sahumerios",
    name: "Velas y sahumerios",
    description:
      "Artículos utilizados en rituales, meditación y ambientación espiritual.",
    symbol: "🜂",
    imageUrl: "/images/shop/velas-y-sahumerios.jpg",
  },
  {
    id: "inciensos-y-resinas",
    slug: "inciensos-y-resinas",
    name: "Inciensos y resinas",
    description:
      "Productos aromáticos tradicionales en prácticas culturales y simbólicas.",
    symbol: "🜁",
    imageUrl: "/images/shop/inciensos-y-resinas.jpg",
  },
  {
    id: "cristales-y-minerales",
    slug: "cristales-y-minerales",
    name: "Cristales y minerales",
    description:
      "Piedras y minerales asociados a tradiciones espirituales y simbólicas.",
    symbol: "🜃",
    imageUrl: "/images/shop/cristales-y-minerales.jpg",
  },
  {
    id: "cartas-y-oraculos",
    slug: "cartas-y-oraculos",
    name: "Cartas y oráculos",
    description:
      "Barajas de tarot, oráculos y sistemas simbólicos consagrados.",
    symbol: "☉",
    imageUrl: "/images/shop/cartas-y-oraculos.jpg",
  },
  {
    id: "libros-y-articulos-rituales",
    slug: "libros-y-articulos-rituales",
    name: "Libros y artículos rituales",
    description:
      "Material informativo y objetos utilizados en prácticas espirituales.",
    symbol: "☾",
    imageUrl: "/images/shop/libros-y-articulos-rituales.jpg",
  },
];

export const shopProducts: ShopProduct[] = [
  // 1. Velas y sahumerios
  {
    id: "vela-arcano-ritualis",
    slug: "vela-arcano-ritualis-cera-soja",
    name: "Vela Ceremonial ARCANO RITUALIS (Edición Alquímica)",
    categoryId: "velas-y-sahumerios",
    categoryName: "Velas y sahumerios",
    price: 490,
    formattedPrice: "$490 MXN",
    tagline: "Cera de soja 100% botánica vertida a mano en vaso negro mate con pan de oro.",
    description:
      "Consagrada bajo los auspicios de los cuatro elementos, esta vela de cera de soja pura y mecha de algodón orgánico emite una llama serena y limpia libre de toxinas. Su vaso de cristal negro mate con sello de pan de oro de ARCANO está diseñado para acompañar tiradas nocturnas de tarot y meditaciones profundas.",
    ritualUse:
      "Encender al iniciar una sesión de introspección o lectura oracular para delimitar el espacio sagrado y serenar las corrientes mentales del consultante.",
    details: [
      "10 oz (285 g) · Más de 55 horas de combustión limpia",
      "Aceites esenciales botánicos de mirra, resina de benjuí y cedro blanco",
      "Etiqueta metálica estampada en pan de oro con sello ARCANO",
      "Vaso reutilizable de cristal templado negro mate",
    ],
    inStock: true,
    badge: "Sello de ARCANO",
    imageUrl: "/images/shop/velas-y-sahumerios.jpg",
    featured: true,
  },
  {
    id: "sahumerio-salvia-copal",
    slug: "sahumerio-ceremonial-salvia-blanca-copal",
    name: "Atado de Sahumerio Sagrado (Salvia Blanca, Copal & Lavanda)",
    categoryId: "velas-y-sahumerios",
    categoryName: "Velas y sahumerios",
    price: 320,
    formattedPrice: "$320 MXN",
    tagline: "Atado artesanal atado con hilo de oro para limpieza del altar y el hogar.",
    description:
      "Selección rigurosa de salvia blanca silvestre cosechada respetando los ciclos lunares, entretejida con hojas de lavanda calmante y lágrimas de copal puro mexicano. Atado con hilo de fibra dorada ceremonial.",
    ritualUse:
      "Ahumado perimetral del consultante o del espacio ceremonial para disipar campos electromagnéticos densos antes de manipular el mazo de cartas.",
    details: [
      "Longitud aproximada: 18 cm",
      "100% orgánico, recolectado de forma sustentable",
      "Aroma herbal profundo, purificante y balsámico",
    ],
    inStock: true,
    imageUrl: "/images/shop/velas-y-sahumerios.jpg",
    featured: false,
  },

  // 2. Inciensos y resinas
  {
    id: "resinas-sagradas-arcano",
    slug: "caja-resinas-sagradas-copal-incienso",
    name: "Caja de Resinas Sagradas ARCANO (Copal Negro & Frankincense)",
    categoryId: "inciensos-y-resinas",
    categoryName: "Inciensos y resinas",
    price: 580,
    formattedPrice: "$580 MXN",
    tagline: "Resinas puras de monte para quemar sobre carbón ceremonial.",
    description:
      "Presentación de alta gama en cofre negro rígido con estampado dorado hermético. Contiene lágrimas vírgenes de copal negro silvestre de Chiapas e incienso frankincense de corte tradicional. Acompañado de pastillas de carbón vegetal prensado de encendido rápido.",
    ritualUse:
      "Elevar la plegaria y purificar el aire de la cámara ritual. El humo ascendente simboliza el diálogo entre la materia terrestre y el éter cósmico.",
    details: [
      "150 g de resinas seleccionadas a mano en frasco hermético",
      "Incluye 10 pastillas de carbón ceremonial de combustión lenta",
      "Caja rígida con dorados en relieve y sello oficial ARCANO",
    ],
    inStock: true,
    badge: "Edición Consagrada",
    imageUrl: "/images/shop/inciensos-y-resinas.jpg",
    featured: true,
  },
  {
    id: "varillas-incienso-arcanos",
    slug: "varillas-incienso-artesanal-siete-arcanos",
    name: "Varillas de Incienso Ritual Siete Arcanos (Sándalo & Mirra)",
    categoryId: "inciensos-y-resinas",
    categoryName: "Inciensos y resinas",
    price: 240,
    formattedPrice: "$240 MXN",
    tagline: "Incienso de varilla bañado en resinas vegetales sin carbón químico.",
    description:
      "Elaborado de manera ancestral mediante molienda de cortezas de sándalo indio, resina de mirra y polvo de flor de azahar. Combustión suave y homogénea de 45 minutos por varilla.",
    ritualUse:
      "Acompañamiento aromático para lecturas diarias, estudios del Libro de Thot o ejercicios de respiración consciente.",
    details: [
      "Caja con 20 varillas extra largas",
      "Libre de solventes sintéticos y aromas artificiales",
      "Corteza vegetal 100% natural",
    ],
    inStock: true,
    imageUrl: "/images/shop/inciensos-y-resinas.jpg",
    featured: false,
  },

  // 3. Cristales y minerales
  {
    id: "estuche-mineralia-arcano",
    slug: "estuche-ceremonial-cristales-arcano",
    name: "Estuche Ceremonial ARCANO CRISTALES & MINERALES",
    categoryId: "cristales-y-minerales",
    categoryName: "Cristales y minerales",
    price: 890,
    formattedPrice: "$890 MXN",
    tagline: "Cofre de terciopelo con los 4 minerales de transmutación y protección.",
    description:
      "Exclusivo estuche de terciopelo negro noche con estampado en pan de oro con el escudo de ARCANO. Contiene cuatro ejemplares minerales puros de colección: geoda de amatista profunda (intuición), huevo de obsidiana negra pulida espejo (sombra e inconsciente), obelisco generador de cuarzo cristalino (claridad) y pepita de pirita áurea (prosperidad).",
    ritualUse:
      "Colocar en las cuatro esquinas del paño de lectura para anclar la energía telúrica y proteger la psique del lector y del consultante.",
    details: [
      "Estuche rígido forrado en terciopelo con broche magnético",
      "4 minerales auténticos de grado coleccionista",
      "Incluye guía de activación y limpieza mineral por El Señor de los Arcanos",
    ],
    inStock: true,
    badge: "Colección Exclusiva",
    imageUrl: "/images/shop/cristales-y-minerales.jpg",
    featured: true,
  },
  {
    id: "espejo-obsidiana-sagrada",
    slug: "espejo-obsidiana-negra-teotihuacana",
    name: "Espejo Psíquico de Obsidiana Negra Pulida a Mano",
    categoryId: "cristales-y-minerales",
    categoryName: "Cristales y minerales",
    price: 650,
    formattedPrice: "$650 MXN",
    tagline: "Disco de obsidiana volcánica para prácticas de scrying y confrontación con la sombra.",
    description:
      "Tallado por maestros canteros a partir de bloques de obsidiana negra profunda. Pulido hasta lograr un reflejo humo-espejo perfecto que no dispersa la luz. Herramienta sagrada en la tradición hermética mesoamericana y europea.",
    ritualUse:
      "Meditación en penumbra a la luz de una sola vela para indagar en los arquetipos de El Diablo y La Luna.",
    details: [
      "Diámetro: 12 cm · Grosor: 1.5 cm",
      "Incluye base de madera de cedro teñida en negro y bolsa de gamuza",
    ],
    inStock: true,
    imageUrl: "/images/shop/cristales-y-minerales.jpg",
    featured: false,
  },

  // 4. Cartas y oráculos
  {
    id: "baraja-arcano-tarot-deluxe",
    slug: "baraja-arcano-tarot-78-cartas-bordes-oro",
    name: "Baraja ARCANO TAROT: 78 Arcanos Mayores & Menores (Bordes Dorados)",
    categoryId: "cartas-y-oraculos",
    categoryName: "Cartas y oráculos",
    price: 1150,
    formattedPrice: "$1,150 MXN",
    tagline: "Caja rígida de lujo con pan de oro, cartas de 350g y cantos dorados reflectantes.",
    description:
      "La obra maestra editorial de ARCANO. Reúne los 22 Arcanos Mayores y los 56 Arcanos Menores restaurados con pigmentos tradicionales y adaptados a la estética Dark Luxury. Impresas sobre cartulina alemana de lino de 350 gramos con bordes bañados en pan de oro brillante (gilded gold edges).",
    ritualUse:
      "La herramienta canónica de lectura para tarotistas principiantes y maestros consagrados. Responde con fluidez al barajado manual y proyecta una presencia solemne en la mesa.",
    details: [
      "78 cartas de gran formato (12.5 x 7.5 cm)",
      "Bordes dorados espejados que protegen del desgaste y la humedad",
      "Caja rígida protectora de dos piezas con acabados en oro caliente",
      "Incluye libreto ceremonial de 120 páginas redactado por El Señor de los Arcanos",
    ],
    inStock: true,
    badge: "Obra Maestra",
    imageUrl: "/images/shop/cartas-y-oraculos.jpg",
    featured: true,
  },
  {
    id: "oraculo-tres-puertas",
    slug: "oraculo-de-las-tres-puertas-senor-de-los-arcanos",
    name: "Oráculo de las Tres Puertas (Mazo Introspectivo de 33 Cartas)",
    categoryId: "cartas-y-oraculos",
    categoryName: "Cartas y oráculos",
    price: 780,
    formattedPrice: "$780 MXN",
    tagline: "Mazo oracular complementario concebido para respuestas directas del alma.",
    description:
      "Diseñado por El Señor de los Arcanos como complemento para tiradas complejas. Cada carta encarna una llave simbólica para destrabar bloqueos en momentos de incertidumbre inmediata.",
    ritualUse:
      "Extracción de una sola carta matutina para fijar la intención y el foco meditativo de la jornada.",
    details: [
      "33 cartas con acabado aterciopelado soft-touch",
      "Folleto con preguntas de autoindagación psicológica para cada carta",
    ],
    inStock: true,
    imageUrl: "/images/shop/cartas-y-oraculos.jpg",
    featured: false,
  },

  // 5. Libros y artículos rituales
  {
    id: "libro-arcano-simbolos-senor-de-los-arcanos",
    slug: "arcano-el-libro-de-los-simbolos-tapa-dura",
    name: "ARCANO: El Libro de los Símbolos (Tratado Hermético de El Señor de los Arcanos)",
    categoryId: "libros-y-articulos-rituales",
    categoryName: "Libros y artículos rituales",
    price: 850,
    formattedPrice: "$850 MXN",
    tagline: "Encuadernación de lujo en pasta dura con broche antiguo y grabados en pan de oro.",
    description:
      "El tratado definitivo sobre la tradición de los 22 Arcanos Mayores escrito por El Señor de los Arcanos, Lector y Custodio de los Símbolos. Más de 320 páginas impresas en papel pergamino color marfil, profusamente ilustradas con grabados herméticos del siglo XV al XX, análisis psicológico arquetípico y rituales de consagración paso a paso.",
    ritualUse:
      "Texto de consulta obligatoria en la mesa del estudiante y oráculo de cabecera para profundizar en cada tirada.",
    details: [
      "320 páginas encuadernadas en tapa dura con broche metálico vintage",
      "Estampado de títulos y glifos planetarios en lámina dorada",
      "Cinta marcapáginas de seda carmesí y cantos tintados",
    ],
    inStock: true,
    badge: "Tratado Oficial",
    imageUrl: "/images/shop/libros-y-articulos-rituales.jpg",
    featured: true,
  },
  {
    id: "tapiz-altar-terciopelo-oro",
    slug: "tapiz-ceremonial-terciopelo-negro-matriz-oro",
    name: "Tapiz Ceremonial de Terciopelo Negro con Matriz de los 4 Elementos",
    categoryId: "libros-y-articulos-rituales",
    categoryName: "Libros y artículos rituales",
    price: 620,
    formattedPrice: "$620 MXN",
    tagline: "Paño de lectura con bordado en hilo de oro y flecos ceremoniales.",
    description:
      "Confeccionado en terciopelo negro espeso de alta densidad con forro posterior de satén antideslizante. En el centro exhibe la rueda zodiacal y los cuatro triángulos alquímicos bordados con hilo de oro de alto brillo, rematado con flecos dorados tradicionales.",
    ritualUse:
      "Protección de las cartas durante la tirada y delimitación del espacio sagrado sobre cualquier mesa o superficie profana.",
    details: [
      "Dimensiones: 65 x 65 cm con flecos de 4 cm",
      "Bordado de alta resistencia mecánica a la fricción de cartas",
      "Incluye estuche protector de transporte",
    ],
    inStock: true,
    imageUrl: "/images/shop/libros-y-articulos-rituales.jpg",
    featured: false,
  },
];
