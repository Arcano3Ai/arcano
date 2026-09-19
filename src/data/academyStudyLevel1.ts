// ==============================================================================
// ARCANO ACADEMIA ESOTÉRICA — GUÍAS DE ESTUDIO OFICIALES: TAROT NIVEL 1
// CURSO: TAROT DESDE CERO — FUNDAMENTOS E INICIACIÓN (tarot-01)
// 7 LECCIONES MAESTRAS CON REQUISITO DE ESCUCHA DE LAS 12 CANCIONES SAGRADAS
// Correo Oficial de Tutorías y Consultas: consultas@arcanosolutions.com
// ==============================================================================

export interface LessonModule {
  sectionTitle: string;
  paragraphs: string[];
  calloutBox?: {
    type: 'hermetic' | 'astrological' | 'warning' | 'tip' | 'practice';
    title: string;
    text: string;
  };
  bulletPoints?: string[];
}

export interface LessonStudyGuide {
  lessonId: string;
  courseId: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  officialTutorEmail: string;
  recommendedArcanaAudio?: {
    slug: string;
    title: string;
    audioUrl: string;
    taskDescription: string;
  };
  modules: LessonModule[];
  keyTerms: { term: string; definition: string }[];
  practicalExercise: {
    title: string;
    instructions: string[];
    deliverablePrompt: string;
  };
}

export const TAROT_LEVEL_1_STUDY_GUIDES: Record<string, LessonStudyGuide> = {
  // ----------------------------------------------------------------------------
  // LECCIÓN 1: INTRODUCCIÓN AL TAROT Y SU ORIGEN HISTÓRICO-HERMÉTICO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-1': {
    lessonId: 'tarot-01-lesson-1',
    courseId: 'tarot-01',
    title: 'Introducción al Tarot y su Origen Histórico-Hermético',
    subtitle: 'Del libro mudo de Thot y las cortes renacentistas al espejo sagrado de la psique humana',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-loco',
      title: 'Himno Sagrado de El Loco — El Salto al Vacío',
      audioUrl: '/audio/arcanos/el-loco.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Himno Sagrado de El Loco con audífonos. Medita en su lírica y siente la frecuencia de liberarte del control racional antes de abrir el estudio del Tarot.',
    },
    modules: [
      {
        sectionTitle: '1. El Misterio de los Orígenes: Mito y Realidad Histórica',
        paragraphs: [
          'El Tarot es una de las catedrales simbólicas más asombrosas de Occidente. Durante siglos, ocultistas como Antoine Court de Gébelin y Éliphas Lévi sostuvieron que el Tarot era el legendario «Libro de Thot», el remanente sobreviviente de las bibliotecas sagradas de Alejandría y el antiguo Egipto, codificado en forma de cartas de juego para burlar la censura y la destrucción temporal.',
          'La investigación histórica moderna documenta la aparición física de los primeros mazos en el norte de Italia (Milán, Ferrara y Bolonia) durante el siglo XV, conocidos como «Trionfi» o naipes de los Visconti-Sforza. No obstante, más allá de su uso cortesano, el Tarot recogió la vasta corriente del hermetismo alejandrino, el neoplatonismo renacentista, la alquimia medieval y la Cábala hebrea.',
        ],
        bulletPoints: [
          'Etimología sagrada: Derivaciones tradicionales como «Rota» (rueda en latín), «Tora» (ley sagrada) y «Tar-Rog» (camino real en mística egipcia).',
          'El Tarot como criptograma: Un lenguaje jeroglífico donde los secretos del alma se transmiten a través de imágenes arquetípicas y colores vivos.',
          'Superación de la adivinación vulgar: En la Academia ARCANO concebimos el Tarot no como una bola de cristal para adivinar un destino fatalista, sino como un espejo sagrado para proyectar el inconsciente y despertar el libre albedrío.',
        ],
      },
      {
        sectionTitle: '2. Filosofía Hermética: Como es Arriba, es Abajo',
        paragraphs: [
          'El fundamento operativo del Tarot descansa en la segunda ley de la Tabla de Esmeralda atribuida a Hermes Trismegisto: «Lo que está abajo es semejante a lo que está arriba, y lo que está arriba es semejante a lo que está abajo, para obrar los prodigios de una sola cosa».',
          'Cuando barajamos las cartas, no opera el azar caótico; opera la sincronicidad (término acuñado por Carl Gustav Jung). La carta que emerge sobre la mesa es una respuesta isomórfica al estado psíquico y espiritual del consultante en ese instante cósmico.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Axioma de la Academia ARCANO',
          text: 'Las cartas del Tarot no crean tu destino; revelan las corrientes energéticas invisibles que ya están moldeando tu presente. El buen tarotista es un cartógrafo del alma, no un juez ni un adivino determinista.',
        },
      },
    ],
    keyTerms: [
      { term: 'Arcano', definition: 'Del latín «arcanum» (secreto o misterio celosamente guardado en un cofre). Llave iniciática para comprender una verdad espiritual.' },
      { term: 'Sincronicidad', definition: 'Coincidencia significativa en el tiempo de dos o más sucesos sin relación causal directa, conectada por un significado psíquico profundo.' },
      { term: 'Trionfi', definition: 'Nombre original en el Renacimiento italiano de los triunfos que más tarde constituirían los 22 Arcanos Mayores.' },
    ],
    practicalExercise: {
      title: 'Audición Sagrada y Bitácora de Iniciación',
      instructions: [
        '🎵 TAREA OBLIGATORIA: En el reproductor de canciones sagradas, reproduce con audífonos «0. El Loco» y «I. El Mago». Anota en tu cuaderno qué sensaciones corporales y emociones evocan en ti.',
        'Toma una libreta nueva consagrada exclusivamente como tu «Diario del Tarotista».',
        'Escribe un manifiesto de intención de media cuartilla respondiendo: «¿Por qué elijo aprender el lenguaje sagrado de los Arcanos y cuál es mi compromiso ético con este estudio?»',
      ],
      deliverablePrompt: 'Envía tu manifiesto escrito al correo oficial consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 1: Manifiesto de Iniciación - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 2: ESTRUCTURA DE LA BARAJA: LOS 78 NAIPES SAGRADOS
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-2': {
    lessonId: 'tarot-01-lesson-2',
    courseId: 'tarot-01',
    title: 'Estructura de la Baraja: Los 78 Naipes Sagrados',
    subtitle: 'La anatomía completa del mazo: Macrocosmos, microcosmos y la corte arquetípica',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-mago',
      title: 'Invocación de El Mago — Como es Arriba, es Abajo',
      audioUrl: '/audio/arcanos/el-mago.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Invocación de El Mago. Medita en los 4 elementos sobre su mesa (copa, espada, oro y basto) que conectan con la estructura total de los 78 naipes.',
    },
    modules: [
      {
        sectionTitle: '1. Los 78 Naipes: Un Sistema Completo y Autosuficiente',
        paragraphs: [
          'Una baraja tradicional de Tarot se compone estrictamente de 78 cartas o láminas sagradas. No sobra ninguna ni falta ninguna. Esta estructura matemática y geométrica refleja la totalidad de la experiencia humana y cósmica.',
          'La baraja se articula en dos grandes cámaras iniciáticas:',
          '• Los 22 Arcanos Mayores: Los principios arquetípicos universales, las leyes cósmicas inmutables y el gran viaje iniciático del alma.',
          '• Los 56 Arcanos Menores: La manifestación terrenal cotidiana de esos arquetipos en la vida práctica, divididos a su vez en 40 cartas numerales (del As al 10 en cuatro palos) y 16 cartas de la corte o figuras reales.',
        ],
      },
      {
        sectionTitle: '2. Comparativa de Tradiciones: Marsella vs. Rider-Waite-Smith',
        paragraphs: [
          'En el estudio del Tarot existen dos escuelas visuales primordiales:',
          '1. Escuela de Marsella: Proveniente de la Francia de los siglos XVII y XVIII. Destaca por sus Arcanos Mayores de marcado estilo medieval y renacentista, mientras que sus Arcanos Menores presentan únicamente patrones geométricos de los palos (sin escenas ilustradas con personajes).',
          '2. Escuela Rider-Waite-Smith (1909): Creada por Arthur Edward Waite e ilustrada por Pamela Colman Smith bajo la égida de la Orden Hermética del Golden Dawn. Es la más didáctica y universal del mundo moderno porque los 56 Arcanos Menores están completamente ilustrados con escenas humanas y alegorías vivas.',
        ],
        calloutBox: {
          type: 'tip',
          title: 'Recomendación Pedagógica de la Academia ARCANO',
          text: 'Para este Nivel 1 recomendamos utilizar una baraja basada en Rider-Waite-Smith tradicional o Marsella restaurado. En ambos casos, las correspondencias simbólicas fundamentales son perfectamente aplicables.',
        },
      },
    ],
    keyTerms: [
      { term: '78 Naipes', definition: 'La suma perfecta de 22 Arcanos Mayores + 56 Arcanos Menores (40 numerales + 16 cortesanos).' },
      { term: 'Golden Dawn', definition: 'Hermandad esotérica británica de finales del siglo XIX que unificó el Tarot con la Astrología, la Cábala y la Alta Magia ceremonial.' },
      { term: 'Lámina', definition: 'Término esotérico tradicional para designar cada naipe del Tarot, aludiendo a los grabados alquímicos antiguos.' },
    ],
    practicalExercise: {
      title: 'Inventario y Reconocimiento de tu Baraja',
      instructions: [
        '🎵 TAREA OBLIGATORIA: Escucha con auriculares la canción «II. La Sacerdotisa — El Silencio del Templo».',
        'Desempaqueta tu baraja física y separa físicamente los 22 Arcanos Mayores de los 56 Arcanos Menores.',
        'Cuenta meticulosamente cada grupo para verificar que tu mazo esté completo (78 cartas).',
        'Toma una carta al azar de cada grupo, obsérvalas durante 3 minutos en silencio y anota las diferencias visuales entre ambas.',
      ],
      deliverablePrompt: 'Envía un breve reporte con las fotos de tu baraja separada a consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 2: Inventario de Baraja - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 3: DIFERENCIAS ESENCIALES: ARCANOS MAYORES VS. MENORES
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-3': {
    lessonId: 'tarot-01-lesson-3',
    courseId: 'tarot-01',
    title: 'Diferencias Esenciales: Arcanos Mayores vs. Menores',
    subtitle: 'El Macrocosmos trascendente frente al Microcosmos cotidiano en una lectura',
    readingTimeMinutes: 21,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-sacerdotisa',
      title: 'Cántico de La Sacerdotisa — El Silencio del Templo',
      audioUrl: '/audio/arcanos/la-sacerdotisa.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Cántico de La Sacerdotisa. Reconoce el velo del templo que separa lo oculto (Arcanos Mayores) de lo manifestado (Arcanos Menores).',
    },
    modules: [
      {
        sectionTitle: '1. Arcanos Mayores: El Peso del Destino y las Lecciones del Alma',
        paragraphs: [
          'Cuando en una tirada aparece un Arcano Mayor, la situación consultada no es meramente circunstancial ni pasajera. Indica un hito kármico, un aprendizaje evolutivo ineludible o un cambio de rumbo existencial ordenado por el alma superior.',
          'Los 22 Arcanos Mayores representan las grandes fuerzas que escapan al control inmediato del ego. Te dicen el POR QUÉ profundo y el propósito espiritual de lo que estás atravesando.',
        ],
        bulletPoints: [
          'Fuerzas trascendentes: El nacimiento (La Emperatriz), la ley divina (La Justicia), la crisis purificadora (La Torre), el renacimiento (El Juicio).',
          'Arquetipos junguianos universales: El Sabio (Ermitaño), la Sombra (El Diablo), el Alma Guía (La Estrella).',
          'Efecto duradero: Sus consecuencias suelen extenderse a lo largo de meses o años en la vida del consultante.',
        ],
      },
      {
        sectionTitle: '2. Arcanos Menores: El Escenario Terrenal y la Respuesta Humana',
        paragraphs: [
          'Los 56 Arcanos Menores representan el cómo, el cuándo y con quién. Son la vida cotidiana: una discusión laboral, un cobro de dinero, una decepción amorosa o una llamada telefónica importante.',
          'Mientras que los Mayores marcan el clima general, los Menores indican los detalles precisos y las elecciones que el libre albedrío del consultante puede tomar en el corto plazo (días o semanas).',
        ],
        calloutBox: {
          type: 'practice',
          title: 'Regla de Oro en la Consulta Profesional',
          text: 'Una tirada dominada por Arcanos Mayores (ej. 3 de 3 cartas) anuncia que el consultante está viviendo un vórtice de destino donde debe fluir y aprender. Una tirada con mayoría de Arcanos Menores indica que tiene absoluto control operativo para solucionar el problema con acciones prácticas inmediatas.',
        },
      },
    ],
    keyTerms: [
      { term: 'Macrocosmos', definition: 'El orden cósmico superior y los principios arquetípicos universales representados por los Arcanos Mayores.' },
      { term: 'Microcosmos', definition: 'El ser humano individual y sus vivencias cotidianas concretas reflejadas en los Arcanos Menores.' },
      { term: 'Hito Kármico', definition: 'Suceso o prueba espiritual ineludible pactada por el alma para su crecimiento en la encarnación.' },
    ],
    practicalExercise: {
      title: 'Contraste Visual y Energético de Naipes',
      instructions: [
        '🎵 TAREA OBLIGATORIA: Escucha con auriculares «III. La Emperatriz — El Florecer Eterno» y «IV. El Emperador — El Orden de la Piedra».',
        'Coloca frente a ti la carta de El Emperador (Arcano Mayor IV) al lado del 4 de Bastos (Arcano Menor).',
        'Contempla ambas durante 5 minutos y describe por escrito cómo cambia la vibración: ¿Cuál evoca autoridad universal inmutable y cuál evoca una celebración humana concreta?',
      ],
      deliverablePrompt: 'Envía tu comparación de naipes a consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 3: Mayores vs Menores - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 4: PALABRAS CLAVE, ARQUETIPOS Y GLOSARIO INICIÁTICO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-4': {
    lessonId: 'tarot-01-lesson-4',
    courseId: 'tarot-01',
    title: 'Palabras Clave, Arquetipos y Glosario Iniciático',
    subtitle: 'El vocabulario sagrado del lector: Cómo nombrar con precisión la verdad de las cartas',
    readingTimeMinutes: 24,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-emperatriz',
      title: 'Sinfonía de La Emperatriz — El Florecer Eterno',
      audioUrl: '/audio/arcanos/la-emperatriz.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Sinfonía de La Emperatriz. Presta atención a las palabras de fertilidad, creación y belleza en la letra como ejemplo vivo de vocabulario arquetípico.',
    },
    modules: [
      {
        sectionTitle: '1. El Poder de la Palabra en el Tarot Terapéutico',
        paragraphs: [
          'Un terapeuta o lector de Tarot profesional se distingue por la precisión y nobleza de su lenguaje. Decirle a un consultante «te va a ir mal» es una negligencia destructiva. Decirle «el naipe señala un momento de repliegue necesario para revisar tus bases» ilumina su conciencia.',
          'Cada arcano posee un abanico de palabras clave en polaridad de Luz (su máxima expresión armónica) y Sombra (su exceso, defecto o distorsión).',
        ],
        bulletPoints: [
          'Arcano 0 (El Loco): Luz = Inocencia, libertad, nuevo inicio, fe pura. Sombra = Caos, imprudencia, huida inmadura.',
          'Arcano I (El Mago): Luz = Voluntad creadora, recursos disponibles, elocuencia. Sombra = Manipulación, dispersión, engaño.',
          'Arcano II (La Sacerdotisa): Luz = Intuición, misterio fértil, sabiduría silenciosa. Sombra = Secretismo gélido, represión emocional.',
          'Arcano III (La Emperatriz): Luz = Fertilidad, abundancia creativa, placer sensorial. Sombra = Vanidad, asfixia afectiva, derroche.',
        ],
      },
      {
        sectionTitle: '2. El Viaje del Loco como Arquetipo de la Conciencia',
        paragraphs: [
          'Carl Gustav Jung demostró que los 22 Arcanos Mayores configuran el proceso de Individuación: el sendero mediante el cual una persona integra su sombra, reconcilia su ánima o ánimus y alcanza la totalidad de su Ser.',
          'El Loco parte inocente y desnudo; atraviesa los maestros del mundo exterior (Mago a Carro), se sumerge en la introspección profunda (Fuerza a Templanza), desciende al inframundo de sus deseos inconscientes (Diablo a Luna) y finalmente renace en la iluminación plena (Sol, Juicio y Mundo).',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Glosario Hermético Esencial',
          text: '• Sombra: Los aspectos no reconocidos ni aceptados de la psique que se proyectan en los demás.\n• Arquetipo: Matriz o molde primordial heredado en el inconsciente colectivo de toda la humanidad.\n• Individuación: El proceso de despertar y autorrealización integral del alma.',
        },
      },
    ],
    keyTerms: [
      { term: 'Proceso de Individuación', definition: 'Término de la psicología profunda de Jung que describe la integración del ego con el Yo Superior a lo largo de la vida.' },
      { term: 'Polaridad Luz-Sombra', definition: 'La manifestación armónica constructiva frente a la manifestación bloqueada o exagerada de una misma energía arquetípica.' },
      { term: 'Inconsciente Colectivo', definition: 'Estrato psíquico universal compartido por todos los seres humanos donde habitan los mitos y los arquetipos sagrados.' },
    ],
    practicalExercise: {
      title: 'Creación de tu Diccionario Arquetípico',
      instructions: [
        '🎵 TAREA OBLIGATORIA: Escucha con auriculares «V. El Hierofante — Rito de El Hierofante» y «VI. Los Enamorados — La Sagrada Elección».',
        'Elige 3 cartas de los Arcanos Mayores que más te llamen la atención.',
        'Redacta para cada una: 3 palabras clave en luz, 3 palabras clave en sombra y una frase iniciática sintética que resuma su enseñanza.',
      ],
      deliverablePrompt: 'Envía tu diccionario arquetípico a consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 4: Glosario Arquetípico - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 5: LOS 4 PALOS Y LOS 4 ELEMENTOS PRIMORDIALES
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-5': {
    lessonId: 'tarot-01-lesson-5',
    courseId: 'tarot-01',
    title: 'Los 4 Palos y los 4 Elementos Primordiales',
    subtitle: 'Fuego, Agua, Aire y Tierra: La alquimia elemental que gobierna los 56 Arcanos Menores',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-emperador',
      title: 'Marcha Soberana de El Emperador — El Orden de la Piedra',
      audioUrl: '/audio/arcanos/el-emperador.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Marcha Soberana de El Emperador. Siente la fuerza del elemento Tierra y Fuego que sostienen el trono de la materia construida.',
    },
    modules: [
      {
        sectionTitle: '1. Correspondencia Alquímica de los 4 Palos',
        paragraphs: [
          'La manifestación cósmica se rige por el cuaternario primordial. Los 4 palos del Tarot son los recipientes donde se desenvuelven las cuatro funciones psíquicas básicas del ser humano:',
          '• BASTOS (Fuego) — La Intuición y la Voluntad: Rige la pasión, la energía vital, el coraje, la creatividad artística, la ambición, la chispa sexual y el liderazgo. En desequilibrio: ira, burnout, impaciencia y agresividad.',
          '• COPAS (Agua) — El Sentimiento y el Amor: Rige las relaciones afectivas, las emociones íntimas, la empatía, los sueños, el arte sensible y la receptividad mística. En desequilibrio: apego, drama desbordado, melancolía y victimismo.',
          '• ESPADAS (Aire) — El Pensamiento y la Lógica: Rige el intelecto, la mente analítica, la verdad cruda, la comunicación, los dilemas morales y los conflictos éticos. En desequilibrio: ansiedad, sobrepensamiento, frialdad cruel y miedo mental.',
          '• OROS o PENTÁCULOS (Tierra) — La Sensación y la Materia: Rige el cuerpo físico, la salud biológica, las finanzas, el trabajo práctico, los bienes raíces y el mundo tangible. En desequilibrio: avaricia, miedo a la escasez, terquedad y estancamiento.',
        ],
      },
      {
        sectionTitle: '2. Dinámica de Elementos en una Lectura Real',
        paragraphs: [
          'Al extender las cartas de una tirada, el primer golpe de vista del lector experto no lee palabras individuales: examina el equilibrio elemental global.',
          'Si una lectura sobre una relación de pareja contiene 4 Espadas y ninguna Copa, el vínculo está atrapado en la frialdad del análisis mental y la discusión, careciendo del agua nutricia del afecto y el perdón.',
        ],
        calloutBox: {
          type: 'astrological',
          title: 'Correspondencias Astrológicas de los Palos',
          text: '• Bastos (Fuego) -> Aries, Leo, Sagitario\n• Copas (Agua) -> Cáncer, Escorpio, Piscis\n• Espadas (Aire) -> Géminis, Libra, Acuario\n• Oros (Tierra) -> Tauro, Virgo, Capricornio',
        },
      },
    ],
    keyTerms: [
      { term: 'Cuaternario Sagrado', definition: 'Los 4 pilares elementales de la creación manifestada (Fuego, Agua, Aire y Tierra) reflejados en el Tetragrámaton.' },
      { term: 'Pentáculos / Oros', definition: 'Símbolo sagrado de la materia consagrada por el espíritu humano, grabado habitualmente con la estrella de 5 puntas.' },
      { term: 'Preponderancia Elemental', definition: 'La dominancia evidente de un palo sobre los demás en una tirada, marcando el tema raíz del consultante.' },
    ],
    practicalExercise: {
      title: 'Auditoría y Mapeo Elemental con tus Cartas',
      instructions: [
        '🎵 TAREA OBLIGATORIA: Escucha con auriculares «VII. El Carro — La Conquista del Alma» y «VIII. La Fuerza — La Caricia y el León».',
        'Toma los 4 Ases de tu baraja (As de Bastos, As de Copas, As de Espadas y As de Oros) y colócalos en cruz sobre tu mesa.',
        'Medita 2 minutos ante cada uno y redacta cuál de los 4 elementos sientes más despierto en tu momento actual y cuál sientes más debilitado.',
      ],
      deliverablePrompt: 'Envía tu análisis de los 4 palos a consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 5: Los 4 Palos - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 6: PREPARACIÓN DEL ESPACIO SAGRADO, CONSAGRACIÓN Y BARAJADO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-6': {
    lessonId: 'tarot-01-lesson-6',
    courseId: 'tarot-01',
    title: 'Preparación del Espacio Sagrado, Consagración y Barajado',
    subtitle: 'El rito de apertura: Cómo purificar el altar, neutralizar energías densas y conectar con la intuición',
    readingTimeMinutes: 23,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-hierofante',
      title: 'Rito de El Hierofante — La Llave de los Misterios',
      audioUrl: '/audio/arcanos/el-hierofante.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Rito de El Hierofante. Conéctate con la solemnidad del templo interior antes de consagrar tu baraja de lectura.',
    },
    modules: [
      {
        sectionTitle: '1. El Espacio Ceremonial de Lectura',
        paragraphs: [
          'El Tarot no debe leerse en mesas desordenadas, sobre camas revueltas ni en ambientes con ruido discordante. Una lectura es un acto sagrado de psicomagia y conexión con el plano invisible; por ello requiere un contenedor energético seguro.',
          'Elementos esenciales para armar tu espacio de lectura:',
          '• Un paño o tapete de lectura: Preferentemente de seda, terciopelo o algodón natural en colores oscuros (morado, azul noche, negro o burdeos). Este paño aísla las cartas de la superficie profana.',
          '• Vela blanca o de cera de abejas: Representa la luz del discernimiento divino y quema residuos etéricos densos.',
          '• Sahumerio o incienso sagrado: Copal, mirra, sándalo o ruda para purificar el aire.',
          '• Cristal de cuarzo transparente o turmalina negra: Para canalizar claridad y neutralizar cargas de consultantes.',
        ],
      },
      {
        sectionTitle: '2. Protocolo de Consagración de la Baraja',
        paragraphs: [
          'Cuando un mazo sale de fábrica, contiene la impregnación industrial y las manipulaciones de muchas manos. Es necesario «bautizarlo» o consagrarlo para que responda a tu frecuencia psíquica personal:',
          '1. Purificación con humo: Pasa cada tercio del mazo a través del humo del incienso bendiciendo las láminas.',
          '2. Sal marina y luna: Coloca el mazo envuelto en seda sobre un lecho de sal o déjalo expuesto a la luz de la Luna Llena o Creciente.',
          '3. Impregnación magnética: Duerme con el mazo debajo de tu almohada durante tres noches consecutivas barajándolo suavemente cada mañana sin emitir juicios.',
        ],
        calloutBox: {
          type: 'practice',
          title: 'Técnica de Barajado Consciente',
          text: 'Nunca barajes con ansiedad mecánica. Respira por la nariz, pide mentalmente guía a tus protectores espirituales y formula la pregunta en tu mente mientras sientes el roce de los bordes de las cartas entre tus dedos.',
        },
      },
    ],
    keyTerms: [
      { term: 'Consagración', definition: 'El acto ritual mediante el cual un objeto profano (los naipes impresos) se dedica formalmente a un propósito espiritual sagrado.' },
      { term: 'Paño Ceremonial', definition: 'Manto textil que delimita el templo físico de la tirada, protegiendo las cartas de la suciedad y de energías discordantes.' },
      { term: 'Corte de Mazo', definition: 'La partición en dos o tres montones de la baraja con la mano izquierda (mano del corazón y de la intuición) antes de extender la tirada.' },
    ],
    practicalExercise: {
      title: 'Ceremonia de Consagración de tu Baraja',
      instructions: [
        '🎵 TAREA OBLIGATORIA: Escucha con auriculares «IX. El Ermitaño — La Lámpara en la Cumbre» y «X. La Justicia — La Balanza Inflexible».',
        'Monta tu mesa de trabajo con paño, vela e incienso siguiendo las instrucciones de la lección.',
        'Realiza la consagración de tu baraja siguiendo los 3 pasos rituales.',
        'Toma una fotografía de tu altar consagrado y redacta tu experiencia de apertura.',
      ],
      deliverablePrompt: 'Envía la foto de tu altar consagrado y tu reporte a consultas@arcanosolutions.com con el asunto: "Tarot Nivel 1 - Lección 6: Consagración de Baraja - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 7: PRIMERAS TIRADAS GUIADAS: LECTURAS DE 1 Y 3 CARTAS
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-7': {
    lessonId: 'tarot-01-lesson-7',
    courseId: 'tarot-01',
    title: 'Primeras Tiradas Guiadas: Lecturas de 1 y 3 Cartas',
    subtitle: 'El arte de la pregunta honesta: Lectura del Consejo Diario y la Tirada Temporal de 3 Cartas',
    readingTimeMinutes: 26,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'los-enamorados',
      title: 'Melodía de Los Enamorados — La Sagrada Elección',
      audioUrl: '/audio/arcanos/los-enamorados.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Melodía de Los Enamorados y Éxtasis de El Colgado. Comprende la sagrada responsabilidad de orientar una elección humana a través de la lectura.',
    },
    modules: [
      {
        sectionTitle: '1. Cómo Formular Preguntas Sagradas',
        paragraphs: [
          'El 80% del éxito de una tirada radica en la calidad de la pregunta. Preguntas como «¿Me va a engañar mi esposo?» o «¿Me ganaré la lotería mañana?» nacen del miedo y de la pasividad infantil.',
          'Las preguntas de la Escuela ARCANO son evolutivas y empoderadoras:',
          '• En lugar de «¿Volverá mi ex?», pregunta: «¿Cuál es la raíz kármica de este distanciamiento y qué debo aprender yo de este vínculo?»',
          '• En lugar de «¿Voy a tener dinero?», pregunta: «¿Qué bloqueo interior me impide manifestar prosperidad económica y qué acción concreta debo ejecutar?»',
        ],
      },
      {
        sectionTitle: '2. Tirada 1: La Carta Única (Oráculo Diario)',
        paragraphs: [
          'Es la práctica diaria obligatoria de todo estudiante iniciático. Cada mañana al levantarte:',
          '1. Barajas con calma y preguntas: «¿Cuál es la energía arquetípica que me acompañará hoy y qué lección exige mi alma?»',
          '2. Extraes un solo naipe. Lo colocas en tu altar y observas sus detalles visuales durante el día.',
          '3. Por la noche, contrastas lo vivido con el simbolismo de la carta.',
        ],
      },
      {
        sectionTitle: '3. Tirada 2: La Tríada Sagrada (Pasado — Presente — Futuro Potencial)',
        paragraphs: [
          'La lectura de 3 cartas es la arquitectura madre de todo el Tarot. Se disponen tres cartas alineadas de izquierda a derecha:',
          '• Carta 1 (Izquierda): La Raíz / Pasado reciente que generó la circunstancia.',
          '• Carta 2 (Centro): El Presente / El estado actual de la energía y el desafío central.',
          '• Carta 3 (Derecha): El Futuro Potencial / El desenlace más probable si el consultante continúa en la misma dirección de pensamiento y acción.',
        ],
        calloutBox: {
          type: 'warning',
          title: 'El Futuro Potencial no es Destino Fijo',
          text: 'Si la Carta 3 muestra una energía discordante (ej. La Torre o el 5 de Oros), no es una profecía inmutable; es una advertencia amorosa del universo diciendo: «Si cambias tu conducta y pensamientos hoy, modificarás ese futuro».',
        },
      },
    ],
    keyTerms: [
      { term: 'Pregunta Evolutiva', definition: 'Interrogante planteada con madurez que busca comprender y transformar la realidad en lugar de buscar certezas pasivas.' },
      { term: 'Tríada Sagrada', definition: 'Método fundamental de tres cartas que conecta el origen (pasado), la vivencia presente y el vector de manifestación futuro.' },
      { term: 'Futuro Probable', definition: 'El desenlace temporal con mayor densidad cuántica en el momento de la consulta, siempre sujeto al libre albedrío.' },
    ],
    practicalExercise: {
      title: 'Práctica Final de Graduación: Tu Primera Tirada de 3 Cartas',
      instructions: [
        '🎵 TAREA OBLIGATORIA FINAL: Asegúrate de haber escuchado las 12 canciones sagradas de los Arcanos Mayores en el aula y de marcarlas como comprendidas en tu panel.',
        'Abre tu espacio sagrado con vela y paño de lectura.',
        'Realiza una tirada real de 3 cartas sobre un tema personal honesto (Pasado, Presente, Futuro Potencial).',
        'Fotografía las tres cartas sobre tu tapete.',
        'Redacta un informe de graduación de Nivel 1 de 2 a 3 páginas analizando: el tema consultado, la interpretación detallada carta por carta, cómo dialogan entre sí y el consejo final que te brinda el Tarot.',
      ],
      deliverablePrompt: 'Envía tu informe final de graduación de 3 cartas con su fotografía adjunta a consultas@arcanosolutions.com con el asunto: "Graduación Tarot Nivel 1 - Informe de 3 Cartas - [Tu Nombre Completo]".',
    },
  },
};
