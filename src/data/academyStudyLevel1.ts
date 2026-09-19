// ==============================================================================
// ARCANO ACADEMIA ESOTÉRICA — GUÍAS DE ESTUDIO OFICIALES: TAROT NIVEL 1
// LOS PRIMEROS 12 ARCANOS MAYORES (DEL LOCO AL COLGADO) CON CANCIONES OBLIGATORIAS
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
  // LECCIÓN 1: ARCANO 0 — EL LOCO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-1': {
    lessonId: 'tarot-01-lesson-1',
    courseId: 'tarot-01',
    title: 'Arcano 0: El Loco — El Salto al Vacío y la Inocencia Sagrada',
    subtitle: 'El viajero sin ataduras: El cero primordial antes de todo comienzo manifiesto',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-loco',
      title: 'Himno Sagrado de El Loco — El Salto al Vacío',
      audioUrl: '/audio/arcanos/el-loco.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Himno Sagrado de El Loco con audífonos. Medita en su lírica y siente la frecuencia de liberarte del control racional antes de iniciar tu estudio.',
    },
    modules: [
      {
        sectionTitle: '1. Naturaleza Arquetípica de El Loco',
        paragraphs: [
          'El Loco lleva el número Cero (0). En las matemáticas sagradas, el cero no simboliza la nada estéril, sino el vacío fértil: el huevo cósmico que contiene todas las potencialidades aún no manifestadas.',
          'Representa el alma humana antes de encarnar, el espíritu libre que camina al borde del abismo con una flor blanca en la mano, ajeno a los juicios del mundo y confiado en la providencia invisible.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Principio de Causa y Efecto',
          text: '«Toda causa tiene su efecto; todo efecto tiene su causa». El Loco no es irresponsabilidad ciega: es la decisión consciente de no vivir atado a los condicionamientos del pasado para inaugurar una nueva cadena causal.',
        },
      },
      {
        sectionTitle: '2. Simbología Esotérica Fundamental',
        paragraphs: [
          '• El hatillo al hombro: Contiene las memorias de vidas pasadas que aún no ha desempaquetado.',
          '• El perro blanco: Representa el instinto animal domesticado, advirtiendo del peligro físico pero acompañando el viaje.',
          '• El precipicio y los picos nevados: Las alturas de la conciencia espiritual y el riesgo iniciático necesario para evolucionar.',
          '• El sol amarillo brillante: La gracia divina que bendice la inocencia del viajero.',
        ],
      },
      {
        sectionTitle: '3. Expresión en Luz y en Sombra',
        paragraphs: [
          '• EN LUZ: Audacia, fe incondicional, frescura mental, libertad interior, inicio genuino sin prejuicios.',
          '• EN SOMBRA: Negligencia, inmadurez, evasión de responsabilidades, saltar al abismo sin propósito.',
        ],
      },
    ],
    keyTerms: [
      { term: 'El Cero Sagrado', definition: 'El estado de potencial puro donde coexisten todas las posibilidades futuras.' },
      { term: 'Salto de Fe', definition: 'Confianza primordial en el universo que disuelve el miedo paralizante del ego.' },
    ],
    practicalExercise: {
      title: 'Sintonización Acústica y Meditación con El Loco',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha con auriculares el «Himno Sagrado de El Loco — El Salto al Vacío». Cierra los ojos y presta atención a cada compás y palabra de la lírica.',
        'Coloca la carta de El Loco sobre tu paño ceremonial.',
        'Pregúntate: «¿En qué área de mi vida necesito dar un salto de fe y liberarme del miedo al qué dirán?»',
        'Redacta tu reflexión en tu bitácora de tarotista y envíala a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu bitácora a consultas@arcanosolutions.com con el asunto «Bitácora Arcano 0 — [Tu Nombre]».',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 2: ARCANO I — EL MAGO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-2': {
    lessonId: 'tarot-01-lesson-2',
    courseId: 'tarot-01',
    title: 'Arcano I: El Mago — Como es Arriba, es Abajo y el Poder Creador',
    subtitle: 'El canal activo de manifestación: La voluntad humana alineada con la ley divina',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-mago',
      title: 'Invocación de El Mago — Como es Arriba, es Abajo',
      audioUrl: '/audio/arcanos/el-mago.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha atentamente la Invocación de El Mago. Comprende cómo la respiración y la vibración del mantra alinean tus 4 cuerpos (físico, emocional, mental y espiritual).',
    },
    modules: [
      {
        sectionTitle: '1. El Canal Sagrado de Manifestación',
        paragraphs: [
          'El Mago alza su mano derecha con una varita apuntando al cielo, mientras su mano izquierda señala la tierra. Esta postura es la encarnación viva del axioma hermético: «Como es arriba, es abajo; como es abajo, es arriba».',
          'El Mago no crea de la nada: canaliza la energía divina del cosmos y la transmuta en el plano terrenal utilizando los 4 elementos.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Principio de Polaridad y Ritmo',
          text: 'El Mago domina el flujo: sabe cuándo recibir (receptividad) y cuándo emitir (voluntad activa) sin forzar las leyes universales.',
        },
      },
      {
        sectionTitle: '2. Los 4 Instrumentos sobre la Mesa',
        paragraphs: [
          'Sobre su mesa se encuentran las 4 herramientas sagradas que originan los 4 palos del Tarot:',
          '• La Vara (Bastos / Fuego): La fuerza de la voluntad, la visión y la pasión creadora.',
          '• La Copa (Copas / Agua): La intuición, los sentimientos puros y el amor universal.',
          '• La Espada (Espadas / Aire): El intelecto agudo, el discernimiento y la palabra veraz.',
          '• El Pentáculo (Oros / Tierra): La materia, el cuerpo físico y los recursos tangibles.',
        ],
      },
      {
        sectionTitle: '3. Luz y Sombra',
        paragraphs: [
          '• EN LUZ: Capacidad de manifestación, concentración impecable, elocuencia, dominio de habilidades prácticas.',
          '• EN SOMBRA: Manipulación, charlatanería, arrogancia intelectual, usar el conocimiento para engañar.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Axioma de Hermes', definition: 'La correspondencia sagrada entre el macrocosmos (universo) y el microcosmos (hombre).' },
      { term: 'Lemniscata', definition: 'El símbolo del infinito sobre su cabeza: acceso a la fuente inagotable de sabiduría.' },
    ],
    practicalExercise: {
      title: 'Práctica de Alineación Elemental con El Mago',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Invocación de El Mago: Como es Arriba, es Abajo» con respiración consciente.',
        'Observa tus 4 herramientas cotidianas: tu cuerpo (Oros), tus emociones (Copas), tus ideas (Espadas) y tu pasión (Bastos).',
        'Escribe qué proyecto concreto estás listo para manifestar en este momento.',
        'Envía tu informe a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu ejercicio a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 3: ARCANO II — LA SACERDOTISA
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-3': {
    lessonId: 'tarot-01-lesson-3',
    courseId: 'tarot-01',
    title: 'Arcano II: La Sacerdotisa — El Silencio del Templo y la Memoria Oculta',
    subtitle: 'La guardiana del umbral: La sabiduría receptiva, el inconsciente y los registros sagrados',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-sacerdotisa',
      title: 'Cántico de La Sacerdotisa — El Silencio del Templo',
      audioUrl: '/audio/arcanos/la-sacerdotisa.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Cántico de La Sacerdotisa en soledad y silencio absoluto. Permite que la melodía aquiete tus pensamientos para abrir tu tercer ojo.',
    },
    modules: [
      {
        sectionTitle: '1. El Templo Interior y el Silencio Sagrado',
        paragraphs: [
          'La Sacerdotisa está sentada entre dos columnas: Boaz (la negra, severidad y sombra) y Jachin (la blanca, misericordia y luz). Ella no toma partido: se sienta en el centro exacto, custodiando el velo de granadas.',
          'Representa la mente intuitiva profunda, la memoria akáshica y el conocimiento que no se grita ni se exhibe, sino que se revela a quien sabe callar y escuchar.',
        ],
      },
      {
        sectionTitle: '2. Simbolismo del Velo y la Luna',
        paragraphs: [
          '• El velo de granadas y palmeras: Unión de lo femenino fértil con lo masculino ascendente.',
          '• La luna creciente a sus pies: Dominio del mundo emocional y de las mareas inconscientes.',
          '• El pergamino de la TORA: La ley divina enrollada, revelada únicamente a los ojos preparados.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Columnas Boaz y Jachin', definition: 'Los dos pilares del Templo de Salomón que representan la dualidad cósmica.' },
      { term: 'Intuición Pura', definition: 'Percepción directa de la verdad sin necesidad de intermediación del razonamiento discursivo.' },
    ],
    practicalExercise: {
      title: 'Silencio Iniciático y Conexión con La Sacerdotisa',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha el «Cántico de La Sacerdotisa: El Silencio del Templo» en penumbra.',
        'Permanece 5 minutos en completo silencio sin revisar teléfono ni hablar.',
        'Anota el primer sueño o corazonada clara que surja en tu bitácora.',
        'Remite tu experiencia a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu bitácora a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 4: ARCANO III — LA EMPERATRIZ
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-4': {
    lessonId: 'tarot-01-lesson-4',
    courseId: 'tarot-01',
    title: 'Arcano III: La Emperatriz — El Florecer Eterno y la Abundancia Creadora',
    subtitle: 'La Gran Madre Naturaleza: Belleza sensorial, gozo de vivir y gestación fecunda',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-emperatriz',
      title: 'Sinfonía de La Emperatriz — El Florecer Eterno',
      audioUrl: '/audio/arcanos/la-emperatriz.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Sinfonía de La Emperatriz. Sintoniza con la frecuencia del agradecimiento por la abundancia y la belleza estética de la creación.',
    },
    modules: [
      {
        sectionTitle: '1. La Arquetípica Madre y Creadora',
        paragraphs: [
          'Si la Sacerdotisa es el misterio oculto en la sombra, la Emperatriz es la vida que florece a la luz del sol. Es la regente de la naturaleza viva, los sentidos despiertos, el arte, el amor y la nutrición.',
          'Enseña que la verdadera espiritualidad no rechaza la materia ni el placer estético, sino que reconoce la divinidad en cada hoja, en cada caricia y en cada fruto cosechado.',
        ],
      },
      {
        sectionTitle: '2. Claves Visuales y de Polaridad',
        paragraphs: [
          '• Las doce estrellas de su corona: Regencia sobre los 12 signos del zodiaco y los 12 meses del año.',
          '• El campo de trigo dorado: Maduración, fertilidad y recompensa tras el período de siembra.',
          '• El escudo de Venus con forma de corazón: El amor incondicional como fuerza generadora universal.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Fecundidad Sagrada', definition: 'Poder de materializar ideas abstractas en creaciones vivas y prósperas.' },
      { term: 'Veneración de Venus', definition: 'Apertura al disfrute de los sentidos con gratitud y elevación estética.' },
    ],
    practicalExercise: {
      title: 'Meditación Sensorial y Escucha Fértil',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Sinfonía de La Emperatriz — El Florecer Eterno» con los ojos cerrados.',
        'Haz una lista de 5 dones o bendiciones materiales que tengas hoy en tu vida.',
        'Dedica un acto de cuidado a una planta, animal o persona querida.',
        'Envía tu reporte a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu reporte a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 5: ARCANO IV — EL EMPERADOR
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-5': {
    lessonId: 'tarot-01-lesson-5',
    courseId: 'tarot-01',
    title: 'Arcano IV: El Emperador — El Orden de la Piedra y la Estructura Terrenal',
    subtitle: 'El Padre soberano: Ley, estabilidad, protección y arquitectura del mundo manifiesto',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-emperador',
      title: 'Marcha Soberana de El Emperador — El Orden de la Piedra',
      audioUrl: '/audio/arcanos/el-emperador.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Marcha Soberana de El Emperador para sintonizar con la firmeza, la disciplina inquebrantable y el orden interior.',
    },
    modules: [
      {
        sectionTitle: '1. El Trono de Piedra y la Firmeza Creadora',
        paragraphs: [
          'El Emperador es la contraparte masculina de la Emperatriz. Mientras ella provee la vida fecunda, él construye los cimientos, las murallas protectoras y las leyes que permiten a esa vida prosperar en paz.',
          'Sentado en su trono cúbico de piedra labrada, decorado con cabezas de carnero (Aries), encarna la autoridad moral, la justicia terrenal y el dominio del caos mediante la estructura.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Trono Cúbico', definition: 'El cubo como símbolo de la materia dominada y la estabilidad indestructible.' },
      { term: 'Soberanía Personal', definition: 'Capacidad de gobernar los propios impulsos y ser el amo de tu propio destino.' },
    ],
    practicalExercise: {
      title: 'Ordenando el Templo Personal con El Emperador',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Marcha Soberana de El Emperador» manteniendo la espalda erguida.',
        'Identifica un área caótica de tu vida (finanzas, horarios, compromisos) y establece 3 reglas firmes para ordenarla.',
        'Envía tu plan de acción a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu ejercicio a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 6: ARCANO V — EL HIEROFANTE
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-6': {
    lessonId: 'tarot-01-lesson-6',
    courseId: 'tarot-01',
    title: 'Arcano V: El Hierofante — El Rito Sagrado y el Puente hacia lo Divino',
    subtitle: 'El Sumo Sacerdote: La transmisión oral del linaje, las llaves de los misterios y la ética',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-hierofante',
      title: 'Rito de El Hierofante — La Llave de los Misterios',
      audioUrl: '/audio/arcanos/el-hierofante.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Rito de El Hierofante. Reflexiona sobre la responsabilidad sagrada de estudiar el Tarot bajo un código ético inquebrantable.',
    },
    modules: [
      {
        sectionTitle: '1. El Pontífice: El Hacedor de Puentes',
        paragraphs: [
          'La palabra «Pontífice» proviene del latín pontifex: constructor de puentes. El Hierofante tiende el puente entre la conciencia humana terrenal y las dimensiones sagradas de la divinidad.',
          'Representa las escuelas de misterios, los maestros, la tradición esotérica verificada y la ética que protege al estudiante de caer en la soberbia o el engaño.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Llaves Cruzadas', definition: 'Las llaves de oro y plata que abren los misterios solares (conscientes) y lunares (ocultos).' },
      { term: 'Linaje Sagrado', definition: 'Cadena ininterrumpida de conocimiento hermético transmitida de maestro a discípulo.' },
    ],
    practicalExercise: {
      title: 'Compromiso Ético y Sintonización con El Hierofante',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha el «Rito de El Hierofante: La Llave de los Misterios».',
        'Redacta tu compromiso ético como estudiante de ARCANO: jamás utilizar el Tarot para manipular o asustar.',
        'Envía tu juramento ético a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu compromiso ético a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 7: ARCANO VI — LOS ENAMORADOS
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-7': {
    lessonId: 'tarot-01-lesson-7',
    courseId: 'tarot-01',
    title: 'Arcano VI: Los Enamorados — La Sagrada Elección y la Alianza del Corazón',
    subtitle: 'El dilema del alma: La unión alquímica de opuestos y la elección desde la verdad interior',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'los-enamorados',
      title: 'Melodía de Los Enamorados — La Sagrada Elección',
      audioUrl: '/audio/arcanos/los-enamorados.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Melodía de Los Enamorados. Medita sobre la alineación entre lo que deseas, lo que piensas y lo que eliges cada día.',
    },
    modules: [
      {
        sectionTitle: '1. Mucho Más que Amor Romántico: La Gran Encrucijada',
        paragraphs: [
          'Los Enamorados no habla únicamente del romance entre dos personas: es la representación visual de la Sagrada Elección en la encrucijada de la vida.',
          'Bajo las alas del arcángel Rafael, el hombre (la mente consciente) mira a la mujer (la mente subconsciente/emocional), y ella mira hacia el cielo (la superconciencia espiritual). Es el circuito perfecto de la sabiduría.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Boda Alquímica', definition: 'La unificación armoniosa de la energía masculina y femenina en el interior de un mismo ser.' },
      { term: 'Libre Albedrío', definition: 'El poder supremo concedido al ser humano para elegir su camino evolutivo.' },
    ],
    practicalExercise: {
      title: 'Examen de Decisiones con Los Enamorados',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Melodía de Los Enamorados — La Sagrada Elección».',
        'Analiza una decisión importante pendiente en tu vida. ¿La estás tomando desde el miedo o desde el amor?',
        'Envía tu resolución a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu ejercicio a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 8: ARCANO VII — EL CARRO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-8': {
    lessonId: 'tarot-01-lesson-8',
    courseId: 'tarot-01',
    title: 'Arcano VII: El Carro — La Victoria del Alma y la Dirección Consciente',
    subtitle: 'El guerrero victorioso: Maestría sobre las fuerzas opuestas y avance implacable',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-carro',
      title: 'Tono Victorioso de El Carro — La Conquista del Alma',
      audioUrl: '/audio/arcanos/el-carro.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Tono Victorioso de El Carro. Siente cómo la voluntad domina las dudas y te proyecta hacia tu meta sin titubeos.',
    },
    modules: [
      {
        sectionTitle: '1. El Conductor sin Riendas',
        paragraphs: [
          'El guerrero del Carro no sujeta las esfinges con cuerdas de cuero ni riendas físicas: las gobierna con el poder de su mente y de su voluntad concentrada.',
          'Las dos esfinges (una blanca y una negra) tiran hacia lados opuestos. El triunfo consiste en mantener el carro avanzando en línea recta sin permitir que ninguna polaridad desvíe tu curso.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Esfinges Opuestas', definition: 'Las fuerzas de la luz y de la sombra que el espíritu debe gobernar para no ser despedazado.' },
      { term: 'Armadura Sagrada', definition: 'Protección psíquica del iniciado que avanza con un propósito moral intachable.' },
    ],
    practicalExercise: {
      title: 'Dirección Inquebrantable con El Carro',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha el «Tono Victorioso de El Carro — La Conquista del Alma».',
        'Define tu meta principal para los próximos 3 meses y los dos obstáculos (esfinges) que debes dominar.',
        'Envía tu mapa de avance a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu mapa a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 9: ARCANO VIII — LA FUERZA
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-9': {
    lessonId: 'tarot-01-lesson-9',
    courseId: 'tarot-01',
    title: 'Arcano VIII: La Fuerza — La Caricia y el León: Dominio mediante el Amor',
    subtitle: 'La fuerza del espíritu: La ternura y la compasión domesticando al instinto animal',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-fuerza',
      title: 'Consagración de La Fuerza — La Caricia y el León',
      audioUrl: '/audio/arcanos/la-fuerza.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Consagración de La Fuerza. Siente cómo la suavidad, la respiración profunda y el amor disuelven la ira y la frustración interna.',
    },
    modules: [
      {
        sectionTitle: '1. La Fuerza no es Violencia: Es Mansedumbre Soberana',
        paragraphs: [
          'La mujer no empuña una espada ni encadena al león feroz: le acaricia suavemente la mandíbula con una corona de flores y paciencia infinita.',
          'Enseña que reprimir o golpear nuestras pasiones e instintos salvajes solo los vuelve más destructivos. La maestría reside en amarlos, comprenderlos y canalizarlos con ternura espiritual.',
        ],
      },
    ],
    keyTerms: [
      { term: 'El León Interior', definition: 'La naturaleza instintiva, las pasiones viscerales, el ego y el fuego primordial.' },
      { term: 'Mansedumbre Espiritual', definition: 'El poder supremo de permanecer en paz y amor frente a la agresividad externa o interna.' },
    ],
    practicalExercise: {
      title: 'Domesticando al León Interior con La Fuerza',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Consagración de La Fuerza — La Caricia y el León».',
        'Identifica un impulso de enojo o impaciencia recurrente y escribe cómo puedes abordarlo con caricia y calma.',
        'Envía tu reflexión a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu reflexión a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 10: ARCANO IX — EL ERMITAÑO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-10': {
    lessonId: 'tarot-01-lesson-10',
    courseId: 'tarot-01',
    title: 'Arcano IX: El Ermitaño — La Lámpara en la Cumbre y la Búsqueda Interior',
    subtitle: 'El sabio solitario: La lámpara de Hermes iluminando el sendero en la oscuridad',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-ermitano',
      title: 'Vigilia de El Ermitaño — La Lámpara en la Cumbre',
      audioUrl: '/audio/arcanos/el-ermitano.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha la Vigilia de El Ermitaño en soledad nocturna. Abraza la quietud y permite que tu propia luz interior ilumine tus dudas.',
    },
    modules: [
      {
        sectionTitle: '1. La Soledad Fértil y la Linterna de Hermes',
        paragraphs: [
          'El Ermitaño ha escalado la montaña sagrada. No busca el aplauso de las multitudes ni los títulos del mundo exterior.',
          'Sostiene en lo alto su farol hexagonal, dentro del cual brilla una estrella de seis puntas (el Sello de Salomón): la luz de la verdad que solo alumbra un paso a la vez, el suficiente para no tropezar.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Báculo de Tres Nudos', definition: 'El soporte de la sabiduría apoyado en los tres mundos: físico, psíquico y espiritual.' },
      { term: 'Estrella en el Farol', definition: 'La chispa divina de la conciencia que nunca se apaga en medio de la noche oscura del alma.' },
    ],
    practicalExercise: {
      title: 'Vigilia Silenciosa con El Ermitaño',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha la «Vigilia de El Ermitaño — La Lámpara en la Cumbre» con las luces apagadas.',
        'Apaga todos los dispositivos y permanece 10 minutos contigo mismo.',
        'Anota la verdad íntima que tu mente solía acallar con el ruido diario.',
        'Envía tu reflexión a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu ejercicio a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 11: ARCANO X — LA JUSTICIA
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-11': {
    lessonId: 'tarot-01-lesson-11',
    courseId: 'tarot-01',
    title: 'Arcano X: La Justicia — La Balanza Inflexible y la Ley Causa y Efecto',
    subtitle: 'El juicio imparcial: La espada de la verdad y el equilibrio cósmico de cada acto',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'la-justicia',
      title: 'Decreto de La Justicia — La Balanza Inflexible',
      audioUrl: '/audio/arcanos/la-justicia.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Decreto de La Justicia. Comprende la ley del karma y asume la responsabilidad total de tus pensamientos, palabras y acciones.',
    },
    modules: [
      {
        sectionTitle: '1. La Balanza del Alma y la Espada de Doble Filo',
        paragraphs: [
          'La Justicia se sienta erguida con la mirada fija hacia el frente. En su mano izquierda sostiene la balanza dorada (equilibrio impecable de motivos e intenciones) y en su mano derecha la espada erguida (el corte inexorable de las consecuencias).',
          'Enseña que el cosmos no castiga ni premia: simplemente equilibra. Lo que siembras en el plano invisible de la mente cosecharás en el plano visible de la materia.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Espada de Doble Filo', definition: 'La verdad que corta tanto el engaño ajeno como el autoengaño propio.' },
      { term: 'Ley del Karma', definition: 'El principio cósmico de restitución armónica y equilibrio de fuerzas.' },
    ],
    practicalExercise: {
      title: 'Pesaje en la Balanza con La Justicia',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha el «Decreto de La Justicia — La Balanza Inflexible».',
        'Examina una situación en la que culpaste a otros y asume tu 50% de responsabilidad.',
        'Escribe qué acción reparadora puedes tomar para restablecer el balance kármico.',
        'Envía tu análisis a consultas@arcanosolutions.com.',
      ],
      deliverablePrompt: 'Envía tu análisis a consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 12: ARCANO XI — EL COLGADO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-12': {
    lessonId: 'tarot-01-lesson-12',
    courseId: 'tarot-01',
    title: 'Arcano XI: El Colgado — La Visión Invertida y la Rendición Iluminada',
    subtitle: 'La pausa fecunda: Mirar el mundo al revés para liberarse de las cadenas del ego',
    readingTimeMinutes: 24,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    recommendedArcanaAudio: {
      slug: 'el-colgado',
      title: 'Éxtasis de El Colgado — La Visión Invertida',
      audioUrl: '/audio/arcanos/el-colgado.mp3',
      taskDescription: 'REQUISITO OBLIGATORIO: Escucha el Éxtasis de El Colgado. Comprende el misterio de la entrega voluntaria: cuando el ego deja de luchar, el alma despierta iluminada.',
    },
    modules: [
      {
        sectionTitle: '1. El Sacrificio Sagrado y el Halo de Oro',
        paragraphs: [
          'El Colgado está suspendido de un pie en un madero vivo con brotes verdes. Su rostro no expresa dolor ni angustia: está en calma absoluta, con un halo dorado de iluminación brillando en torno a su cabeza.',
          'Es el arquetipo de la rendición consciente. Cuando todas las estrategias del ego fracasan, quedarse quieto y mirar la situación desde una perspectiva totalmente invertida revela la salida que la mente apresurada no podía ver.',
        ],
      },
      {
        sectionTitle: '2. Culminación del Nivel 1 y los 12 Arcanos',
        paragraphs: [
          'Con El Colgado completas los primeros 12 Arcanos Mayores de tu iniciación (del 0 al XI).',
          'Has recorrido el salto audaz de El Loco, la manifestación de El Mago, el templo de La Sacerdotisa, la fertilidad de La Emperatriz, el orden de El Emperador, el rito de El Hierofante, la elección de Los Enamorados, el avance de El Carro, la ternura de La Fuerza, la lámpara de El Ermitaño, la balanza de La Justicia y la iluminación invertida de El Colgado.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Visión Invertida', definition: 'Cambio radical de paradigma donde lo que parecía pérdida se revela como la mayor ganancia espiritual.' },
      { term: 'Pausa Fecunda', definition: 'La detención activa del movimiento exterior para gestar una transformación interna profunda.' },
    ],
    practicalExercise: {
      title: 'Tirada de Graduación del Nivel 1 (Los 12 Arcanos)',
      instructions: [
        '🎵 TAREA ACÚSTICA OBLIGATORIA: Escucha el «Éxtasis de El Colgado — La Visión Invertida».',
        'Separa los primeros 12 Arcanos Mayores de tu mazo (del 0 al XI).',
        'Barájalos con reverencia y extrae 3 cartas para responder: «¿Cuál ha sido la mayor transformación de mi conciencia en este primer nivel?»',
        'Redacta tu ensayo final y envíalo con tus fotografías a consultas@arcanosolutions.com para recibir tu retroalimentación oficial de graduación del Nivel 1.',
      ],
      deliverablePrompt: 'Envía tu trabajo de graduación a consultas@arcanosolutions.com con el asunto «Graduación Tarot Nivel 1 — [Tu Nombre]».',
    },
  },
};
