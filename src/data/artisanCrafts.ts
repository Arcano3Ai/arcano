export interface ArtisanCollection {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  descriptor: string;
  symbol: string;
  accentColor: string;
  href: string;
  heritageRegion: string;
  masterTechnique: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  badge: string;
  bannerImage: string;
}

export interface ArtisanProduct {
  id: string;
  slug: string;
  collectionId: "barro-negro" | "alebrijes" | "arte-huichol" | "talismanes";
  name: string;
  artisanName: string;
  community: string;
  price: number;
  formattedPrice: string;
  dimensions: string;
  materials: string;
  technique: string;
  consecrationDetails: string;
  story: string;
  description: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  badge?: string;
  inStock: boolean;
  featured?: boolean;
  tags: string[];
}

export const GRAND_COLLECTIONS: ArtisanCollection[] = [
  {
    id: "talismanes",
    slug: "talismanes",
    name: "Talismanes & Tarot",
    subtitle: "78 Arcanos en Pura Piedra Mineral",
    descriptor: "Baraja Completa & Veta Telúrica de 32 Minerales",
    symbol: "🔮",
    accentColor: "#C5A059",
    href: "/tienda/",
    heritageRegion: "Monterrey · Tallado Hermético Ceremonial",
    masterTechnique: "Calibre uniforme 8mm en pura piedra natural sin metales",
    shortDescription: "La Gran Obra Alquímica: los 78 Arcanos consagrados ante fuego ceremonial sobre 32 minerales geológicos.",
    heroHeadline: "Como es arriba, es abajo.",
    heroSubheadline: "22 Arcanos Mayores y 56 Menores forjados en cuarzos, lapislázuli, ónix y gemas puras de la tierra.",
    badge: "Colección Central",
    bannerImage: "/images/shop/pulseras/lifestyle_wrist_jade_emperatriz.jpg",
  },
  {
    id: "barro-negro",
    slug: "barro-negro",
    name: "Barro Negro Oaxaqueño",
    subtitle: "Alquimia de San Bartolo Coyotepec",
    descriptor: "Bruñido con Cuarzo de Río & Horneado de Reducción",
    symbol: "🏺",
    accentColor: "#8E8D8A",
    href: "/tienda/barro-negro/",
    heritageRegion: "San Bartolo Coyotepec, Valles Centrales, Oaxaca",
    masterTechnique: "Bruñido manual con cuarzo fluvial y ahumado subterráneo de dos bocas",
    shortDescription: "Piezas ceremoniales de arcilla ancestral que se transforman en negro grafito lustroso mediante el humo del horno subterráneo sellado.",
    heroHeadline: "Del corazón de la tierra al fuego ahumado.",
    heroSubheadline: "El misterio de San Bartolo Coyotepec: arcilla milenaria bruñida con cantos de cuarzo y transmutada en obsidiana viva por reducción de oxígeno.",
    badge: "Alfarería Ancestral",
    bannerImage: "/images/shop/barro-negro/jarron-parallax-master.jpg",
  },
  {
    id: "alebrijes",
    slug: "alebrijes",
    name: "Alebrijes & Nahuales",
    subtitle: "Talla Sagrada en Madera de Copal",
    descriptor: "Tótems Zoomorfos & Protectores Espirituales",
    symbol: "🐆",
    accentColor: "#00E5FF",
    href: "/tienda/alebrijes/",
    heritageRegion: "San Martín Tilcajete & San Antonio Arrazola, Oaxaca",
    masterTechnique: "Talla en madera viva de copal con pigmentos naturales y grecas zapotecas",
    shortDescription: "Guardianes de la dimensión onírica y nahuales protectores tallados en copal bendito con minuciosas grecas de poder zapoteca.",
    heroHeadline: "El nahual que custodia tu espíritu.",
    heroSubheadline: "Criaturas aladas y guardianes místicos donde la madera sagrada de copal cobra vida a través de geometrías cósmicas y tintes minerales.",
    badge: "Madera Sagrada",
    bannerImage: "/images/shop/alebrijes/jaguar-alado-nahual.jpg",
  },
  {
    id: "arte-huichol",
    slug: "arte-huichol",
    name: "Arte Huichol · Wixárika",
    subtitle: "Cosmogonía Sagrada de Wirikuta",
    descriptor: "Micro-Chaquira de Cristal sobre Cera de Abeja Campeche",
    symbol: "🦌",
    accentColor: "#FF9100",
    href: "/tienda/arte-huichol/",
    heritageRegion: "Sierra Madre Occidental (Jalisco, Nayarit, Zacatecas) & Wirikuta",
    masterTechnique: "Micro-chaquira de cristal calibrado fijada sobre cera virgen de campeche",
    shortDescription: "Visiones místicas de los marakames: el venado azul Kauyumari, el abuelo fuego Tatewari y la flor sagrada del peyote Híkuri.",
    heroHeadline: "La oración plasmada en luz de cristal.",
    heroSubheadline: "Cada cuenta de cristal es un rezo depositado sobre cera virgen: la visión del sol naciente, el venado mensajero y la floración del desierto sagrado.",
    badge: "Cosmogonía Sagrada",
    bannerImage: "/images/shop/arte-huichol/craneo-venado-kauyumari.jpg",
  },
];

// ─────────────────────────────────────────────────────────────
// CATÁLOGO DE PIEZAS MAESTRAS DE BARRO NEGRO
// ─────────────────────────────────────────────────────────────
export const BARRO_NEGRO_PRODUCTS: ArtisanProduct[] = [
  {
    id: "bn-jarron-monumental-calado",
    slug: "jarron-monumental-calado-zapoteca",
    collectionId: "barro-negro",
    name: "Jarrón Monumental de Dos Asas con Calado Zapoteca",
    artisanName: "Taller Maestro Pedro y Familia",
    community: "San Bartolo Coyotepec, Oaxaca",
    price: 6800,
    formattedPrice: "$6,800 MXN",
    dimensions: "Altura: 58 cm · Diámetro: 26 cm · Peso: 4.8 kg",
    materials: "100% Arcilla natural de San Bartolo Coyotepec",
    technique: "Modelado a mano, calado fino con navaja de carrizo, bruñido con cuarzo de río y cocción en horno subterráneo de dos bocas",
    consecrationDetails: "Ahumado con leña de encino y sahumado con copal blanco antes del empaque",
    story: "Inspirado en las ánforas ceremoniales que resguardaban el mezcal y los bálsamos sagrados en los templos de Monte Albán. El calado permite que la luz cree sombras vivas en el altar.",
    description: "Pieza magistral de gran formato. Sus grecas y espirales caladas simbolizan la serpiente emplumada y el movimiento eterno del sol. Posee un brillo metálico bruñido que parece obsidiana sólida sin usar ningún barniz químico.",
    imageUrl: "/images/shop/barro-negro/jarron-parallax-master.jpg",
    badge: "Obra Maestra",
    inStock: true,
    featured: true,
    tags: ["Jarrón", "Calado", "Monumental", "Altar", "Bruñido"],
  },
  {
    id: "bn-alhajero-cuatro-petalos",
    slug: "alhajero-ceremonial-cuatro-petalos",
    collectionId: "barro-negro",
    name: "Alhajero Ceremonial con Tapa de Flor Solar",
    artisanName: "Maestra Alfarera Amalia Gómez",
    community: "San Bartolo Coyotepec, Oaxaca",
    price: 1850,
    formattedPrice: "$1,850 MXN",
    dimensions: "Diámetro: 18 cm · Altura: 11 cm · Peso: 1.1 kg",
    materials: "Arcilla negra fina de Coyotepec",
    technique: "Torno de plato tradicional de dos piezas, calado caligráfico y bruñido de espejo",
    consecrationDetails: "Purificado en luna llena para la custodia de talismanes y gemas minerales",
    story: "Diseñado para custodiar tus talismanes de los Arcanos, péndulos y joyas consagradas. La flor de cuatro pétalos de la tapa representa los cuatro puntos cardinales y los cuatro elementos alquímicos.",
    description: "Cofre ceremonial con calado caligráfico calado que permite airear resinas o proteger objetos sagrados. El contraste entre el bruñido de espejo exterior y el interior ahumado es sublime.",
    imageUrl: "/images/shop/barro-negro/alhajero-cuatro-petalos.jpg",
    badge: "Custodio de Joyas",
    inStock: true,
    featured: true,
    tags: ["Alhajero", "Cofre", "Cuatro Pétalos", "Joyería", "Protección"],
  },
  {
    id: "bn-jaguar-ceremonial-crouching",
    slug: "escultura-nahual-jaguar-ceremonial",
    collectionId: "barro-negro",
    name: "Escultura Nahual Jaguar en Furia Silenciosa",
    artisanName: "Maestro Escultor Mateo Martínez",
    community: "San Bartolo Coyotepec, Oaxaca",
    price: 4900,
    formattedPrice: "$4,900 MXN",
    dimensions: "Largo: 42 cm · Altura: 24 cm · Ancho: 19 cm · Peso: 3.6 kg",
    materials: "Arcilla local rica en óxido de hierro",
    technique: "Escultura a bulto redondo modelada a mano libre, esgrafiado de rosetas y bruñido intenso",
    consecrationDetails: "Activado como tótem guardián del umbral doméstico contra energías densas",
    story: "El Jaguar (*Bidxaa*) en la cosmología zapoteca es el sol nocturno que atraviesa el inframundo sin ser derrotado. Su piel negra refleja la noche estrellada y su mirada fija protege el recinto sagrado.",
    description: "Imponente escultura de jaguar en posición de acecho. Cada roseta y cada músculo han sido pulidos con piedra de cuarzo antes del secado al cuero, logrando un lustre carbón intenso de presencia magnética.",
    imageUrl: "/images/shop/barro-negro/jaguar-ceremonial-bruñido.jpg",
    badge: "Guardián de Umbral",
    inStock: true,
    featured: true,
    tags: ["Jaguar", "Escultura", "Nahual", "Fuerza", "Monte Albán"],
  },
  {
    id: "bn-cantaro-calado-floral",
    slug: "cantaro-calado-tradicional-coyotepec",
    collectionId: "barro-negro",
    name: "Cántaro Esférico con Encaje Calado Ancestral",
    artisanName: "Familia Alfarera Real",
    community: "San Bartolo Coyotepec, Oaxaca",
    price: 3200,
    formattedPrice: "$3,200 MXN",
    dimensions: "Altura: 32 cm · Diámetro: 28 cm · Peso: 2.7 kg",
    materials: "Arcilla pura tamizada con agua de pozo",
    technique: "Torno primitivo de dos platos superpuestos, calado de malla floral y ahumado en fosa subterránea",
    consecrationDetails: "Consagrado para canalizar el elemento Agua y Tierra en armonía",
    story: "La técnica del calado fino fue perfeccionada en Coyotepec para crear piezas que juegan con la luz y el viento. Colocada cerca de una vela, proyecta mandalas de sombra sobre los muros del santuario.",
    description: "Cántaro globular de cuello ancho y base esbelta. El cuerpo está revestido por una red de calado que asemeja encaje textil zapoteco, coronado por un cuello bruñido en brillo espejo.",
    imageUrl: "/images/shop/barro-negro/cantaro-calado-coyotepec.jpg",
    badge: "Filtro de Luz",
    inStock: true,
    featured: false,
    tags: ["Cántaro", "Encaje", "Vela", "Sombra", "Tradición"],
  },
];

// ─────────────────────────────────────────────────────────────
// CATÁLOGO DE PIEZAS MAESTRAS DE ALEBRIJES
// ─────────────────────────────────────────────────────────────
export const ALEBRIJES_PRODUCTS: ArtisanProduct[] = [
  {
    id: "al-jaguar-alado-nahual",
    slug: "jaguar-alado-nahual-alebrije",
    collectionId: "alebrijes",
    name: "Jaguar Alado Guardián del Inframundo (Nahual Zapoteco)",
    artisanName: "Maestro Tallerista Isaías Fuentes",
    community: "San Martín Tilcajete, Oaxaca",
    price: 8900,
    formattedPrice: "$8,900 MXN",
    dimensions: "Largo: 45 cm · Altura: 38 cm · Envergadura: 36 cm · Peso: 2.1 kg",
    materials: "Madera tallada de Copal hembra (*Bursera bipinnata*), pigmentos acrílicos finos y tintes naturales",
    technique: "Talla manual con gubias y machete sobre madera curada contra insectos, punteado zapoteco a mano alzada con pincel de un solo pelo",
    consecrationDetails: "Bendecido con humo de copal y resinas de la Sierra Sur de Oaxaca",
    story: "En la mitología zapoteca, cada ser humano nace vinculado a un nahual animal que comparte su destino. El jaguar alado une la fuerza telúrica de la tierra con la libertad clarividente del cielo.",
    description: "Pieza magistral de concurso. Las alas desplegadas lucen miles de micro-grecas geométricas que representan las fases de la luna y el ciclo del maíz. Una joya visual irrepetible con certificado de autoría firmado.",
    imageUrl: "/images/shop/alebrijes/jaguar-alado-nahual.jpg",
    badge: "Pieza de Museo",
    inStock: true,
    featured: true,
    tags: ["Jaguar", "Alas", "Copal", "Tilcajete", "Nahual", "Grecas"],
  },
  {
    id: "al-buho-sabiduria-copal",
    slug: "buho-sabiduria-nahual-clarividencia",
    collectionId: "alebrijes",
    name: "Búho Sagrado de la Clarividencia Nocturna",
    artisanName: "Taller Hermanos Hernández",
    community: "San Antonio Arrazola, Oaxaca",
    price: 5400,
    formattedPrice: "$5,400 MXN",
    dimensions: "Envergadura: 48 cm · Altura: 32 cm · Profundidad: 20 cm · Peso: 1.4 kg",
    materials: "Madera de copal macho curada en horno de arena",
    technique: "Talla anatómica con ensambles invisibles en alas y policromía con grecas de Monte Albán",
    consecrationDetails: "Consagrado bajo luna llena para despertar la intuición y el discernimiento psíquico",
    story: "El búho es el mensajero de los secretos que se ocultan en la oscuridad. Sus alas extendidas abrazan el espacio del altar y sus ojos hipnóticos disuelven cualquier ilusión o engaño.",
    description: "Majestuoso búho en pleno vuelo con plumaje ilustrado en tonos turquesa, oro solar y violeta cósmico. Cada pluma es un lienzo individual con laberintos geométricos que atrapan la mirada.",
    imageUrl: "/images/shop/alebrijes/buho-sabiduria-copal.jpg",
    badge: "Visión Psíquica",
    inStock: true,
    featured: true,
    tags: ["Búho", "Clarividencia", "Alas", "Arrazola", "Sabiduría"],
  },
];

// ─────────────────────────────────────────────────────────────
// CATÁLOGO DE PIEZAS MAESTRAS DE ARTE HUICHOL (WIXÁRIKA)
// ─────────────────────────────────────────────────────────────
export const ARTE_HUICHOL_PRODUCTS: ArtisanProduct[] = [
  {
    id: "wh-craneo-venado-kauyumari",
    slug: "craneo-sagrado-venado-kauyumari",
    collectionId: "arte-huichol",
    name: "Cráneo Ceremonial del Venado Azul (Kauyumari)",
    artisanName: "Marakame Santos López & Familia",
    community: "Santa Catarina Cuexcomatitlán, Jalisco / Wirikuta",
    price: 14500,
    formattedPrice: "$14,500 MXN",
    dimensions: "Altura con cornamenta: 62 cm · Ancho: 44 cm · Peso: 2.8 kg",
    materials: "Cráneo y cornamenta natural de venado recolectado ceremonialmente, cera de campeche y micro-chaquiras checas calibradas no. 11",
    technique: "Colocación cuenta por cuenta sobre cera virgen de abeja y resina de pino",
    consecrationDetails: "Llevado en peregrinación a Wirikuta y consagrado ante el fuego sagrado de Tatewari",
    story: "Para el pueblo Wixárika, Kauyumari es el hermano mayor y espíritu guía que enseñó a los hombres a escuchar la voz de los dioses a través del canto del peyote. Esta pieza es un altar vivo de gratitud cósmica.",
    description: "Obra de alto coleccionismo etnográfico. Representa el mapa celestial de Wirikuta: el sol Tayaupá en la frente, las flores de Híkuri en las sienes, el venado azul descendiendo hacia el agua sagrada y el escorpión protector en la quijada.",
    imageUrl: "/images/shop/arte-huichol/craneo-venado-kauyumari.jpg",
    badge: "Altar Mayor Wirikuta",
    inStock: true,
    featured: true,
    tags: ["Venado", "Kauyumari", "Wirikuta", "Chaquira", "Peyote", "Marakame"],
  },
  {
    id: "wh-cabeza-jaguar-fuego",
    slug: "cabeza-jaguar-fuego-sagrado-chaquira",
    collectionId: "arte-huichol",
    name: "Cabeza de Jaguar del Fuego Sagrado (Tatewari)",
    artisanName: "Maestra Wixárika Yuriria de la Cruz",
    community: "San Andrés Cohamiata, Nayarit",
    price: 7800,
    formattedPrice: "$7,800 MXN",
    dimensions: "Largo: 30 cm · Altura: 28 cm · Ancho: 22 cm · Peso: 2.2 kg",
    materials: "Base tallada en madera recubierta con cera de campeche y más de 35,000 micro-chaquiras de cristal",
    technique: "Encerado tradicional y engarzado manual con aguja de hueso",
    consecrationDetails: "Purificado en el amanecer ceremonial del Cerro del Quemado",
    story: "El jaguar rugiente representa el despertar del coraje interior y la custodia del fuego ancestral. Los tonos ardientes de amarillo, bermellón y naranja simbolizan las llamas que nunca se extinguen.",
    description: "Pieza de energía desbordante. El rostro del jaguar ruge hacia la eternidad mostrando colmillos sagrados, rodeado de venados danzantes, mazorcas de maíz sagrado y el sol central irradiando bendiciones.",
    imageUrl: "/images/shop/arte-huichol/cabeza-jaguar-chaquira.jpg",
    badge: "Fuego Interior",
    inStock: true,
    featured: true,
    tags: ["Jaguar", "Fuego", "Tatewari", "Chaquira", "Fuerza"],
  },
];
