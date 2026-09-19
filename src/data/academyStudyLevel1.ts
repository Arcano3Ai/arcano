// ==============================================================================
// ARCANO ACADEMIA ESOTÉRICA — MATERIAL DE ESTUDIO OFICIAL: NIVEL 1
// Curso: Tarot desde Cero (Fundamentos, Simbología y Práctica Sagrada)
// Correo Oficial de Consultas Académicas: consultas@arcanosolutions.com
// ==============================================================================

export interface LessonStudyGuide {
  lessonId: string;
  courseId: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  officialTutorEmail: string;
  modules: {
    sectionTitle: string;
    paragraphs: string[];
    bulletPoints?: string[];
    calloutBox?: {
      type: 'hermetic' | 'warning' | 'practice';
      title: string;
      text: string;
    };
  }[];
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
    subtitle: 'El despertar del ojo simbólico: De juego cortesano a espejo del alma humana',
    readingTimeMinutes: 18,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. Qué es el Tarot: Espejo, no Sentencia',
        paragraphs: [
          'En la tradición de ARCANO, el Tarot no es un oráculo fatalista concebido para predecir un destino inmutable y rígido. Es, en su dimensión más sagrada, una gramática arquetípica: un espejo revelador que exterioriza los estratos profundos del inconsciente y las corrientes energéticas que envuelven las decisiones del consultante.',
          'Cuando un mazo es barajado y desplegado sobre el tapete ceremonial, las 78 láminas no inventan nada nuevo ni dictan tu futuro: organizan los símbolos que tu alma ya conoce pero que la mente racional aún no ha logrado articular con claridad.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Principio Hermético de Correspondencia',
          text: '«Como es arriba, es abajo; como es adentro, es afuera». El orden en que emergen los naipes refleja con exactitud la correlación entre tu estado interior (miedos, anhelos y lealtades inconscientes) y las circunstancias que se materializan en tu mundo exterior.',
        },
      },
      {
        sectionTitle: '2. Génesis Histórica: De Milán al Renacimiento Ocultista',
        paragraphs: [
          'Los primeros vestigios documentados del Tarot surgen en el norte de Italia a mediados del siglo XV (hacia 1440-1450) bajo el nombre de «Trionfi» (Triunfos), creados para las cortes nobiliarias de Milán y Ferrara, destacando el famoso mazo Visconti-Sforza.',
          'Hacia los siglos XVII y XVIII, en Marsella (Francia), las barajas populares se estandarizan en la xilografía clásica que hoy denominamos Tarot de Marsella, con su estética medieval, austera y preñada de símbolos alquímicos.',
          'A finales del siglo XIX y principios del XX, con la Orden Hermética de la Golden Dawn en Londres, Arthur Edward Waite y la artista mística Pamela Colman Smith revolucionan la tradición al crear el Tarot Rider-Waite-Smith (1909), ilustrando por primera vez cada uno de los 56 Arcanos Menores con escenas arquetípicas vivas, facilitando la lectura intuitiva y psicológica.',
        ],
        bulletPoints: [
          'Siglo XV: Barajas Visconti-Sforza en Italia (origen cortesano y alegórico).',
          'Siglo XVIII: Estandarización del Tarot de Marsella en Francia y primeras tesis esotéricas (Court de Gébelin, Antoine Court).',
          'Siglo XIX: Eliphas Lévi vincula el Tarot con la Cábala hermética y las 22 letras del alfabeto hebreo.',
          '1909: Publicación del mazo Rider-Waite-Smith, puente entre el hermetismo y la psicología arquetípica moderna.',
        ],
      },
      {
        sectionTitle: '3. El Enfoque Psicológico de Carl Gustav Jung',
        paragraphs: [
          'El médico y psiquiatra suizo Carl G. Jung reconoció en el Tarot una representación visual magistral de los «Arquetipos del Inconsciente Colectivo»: figuras primordiales (La Madre, El Anciano Sabio, La Sombra, El Héroe, La Muerte) que residen en la psique de toda la humanidad sin distinción de época o cultura.',
          'A través del fenómeno de la Sincronicidad —la coincidencia significativa de dos acontecimientos sin vínculo causal directo— el momento exacto en que barajas y extraes una carta sintoniza con tu campo psíquico, convirtiendo la sesión en un diálogo transformador.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Arcano',
        definition: 'Del latín «arcanum», que significa secreto, misterio o conocimiento reservado que se abre mediante la contemplación.',
      },
      {
        term: 'Sincronicidad',
        definition: 'Principio de conexión acausal formulado por Jung: dos sucesos conectados por su significado íntimo, no por causa-efecto.',
      },
      {
        term: 'Arquetipo',
        definition: 'Molde o patrón energético universal presente en el inconsciente colectivo de la humanidad.',
      },
    ],
    practicalExercise: {
      title: 'Ejercicio Sagrado: Diálogo con tu Mazo',
      instructions: [
        'Toma tu mazo de cartas con ambas manos. Cierra los ojos y realiza tres respiraciones profundas inhalando por la nariz y exhalando lentamente.',
        'Baraja sin prisa sintiendo la textura de los bordes. Haz una única pregunta en voz alta o mentalmente: «¿Cuál es la energía o arquetipo que me acompaña a iniciar este estudio en ARCANO?»',
        'Extrae una carta al azar, colócala boca arriba y contémplala durante 3 minutos en silencio antes de buscar su significado en libros.',
        'Anota en tu diario de estudiante: colores que resaltan, personajes, emociones corporales y qué te transmite.',
      ],
      deliverablePrompt: 'Si deseas retroalimentación del maestro sobre tu primera carta de inicio, envía tu anotación y foto al correo oficial: consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 2: ESTRUCTURA COMPLETA DEL MAZO: LOS 78 NAIPES SAGRADOS
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-2': {
    lessonId: 'tarot-01-lesson-2',
    courseId: 'tarot-01',
    title: 'Estructura Completa del Mazo: Los 78 Naipes Sagrados',
    subtitle: 'La arquitectura cósmica: 22 Arcanos Mayores y 56 Arcanos Menores',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Catedral de Papel: 78 Cartas en Armonía',
        paragraphs: [
          'El mazo de Tarot no es una aglomeración aleatoria de naipes; constituye un sistema geométrico, numérico y filosófico cerrado y perfecto de 78 láminas divididas en dos grandes reinos:',
          '1. Los 22 Arcanos Mayores: El Macrocosmos, las leyes universales, las etapas del alma y los grandes puntos de inflexión del destino.',
          '2. Los 56 Arcanos Menores: El Microcosmos, la vida cotidiana, los pensamientos, las pasiones, los afectos y la materia tangible.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'La Clave Numérica de 78',
          text: '7 + 8 = 15 (El Diablo / La Pasión en la Materia) -> 1 + 5 = 6 (Los Enamorados / El Libre Albedrío). El Tarot entero es un mapa de cómo la conciencia aprende a elegir conscientemente en medio del mundo material.',
        },
      },
      {
        sectionTitle: '2. Anatomía Gráfica de una Carta de Tarot',
        paragraphs: [
          'Cada carta de Tarot posee 5 elementos visuales que todo lector profesional debe aprender a reconocer al instante:',
        ],
        bulletPoints: [
          'El Número (en arábigo o romano): Marca el grado evolutivo en el ciclo de la materia o del alma.',
          'El Título: El nombre arquetípico (El Loco, La Torre, Tres de Espadas).',
          'La Paleta Cromática: Rojo (voluntad, sangre, fuerza motriz), Azul (receptividad, alma, intuición), Amarillo (intelecto solar, iluminación), Verde (vida, crecimiento terrenal) y Blanco (pureza primordial).',
          'La Simbología Geométrica: Círculos (espíritu), Cuadrados (materia estable), Triángulos (fuego divino y Trinidad).',
          'La Orientación Espacial: Hacia dónde miran los personajes (hacia la izquierda / pasado / introspección; hacia la derecha / futuro / acción).',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Macrocosmos',
        definition: 'El orden universal superior que rige el destino espiritual, encarnado en los 22 Arcanos Mayores.',
      },
      {
        term: 'Microcosmos',
        definition: 'La esfera del ser humano y su vida cotidiana en la Tierra, representada en los 56 Arcanos Menores.',
      },
    ],
    practicalExercise: {
      title: 'Práctica de Clasificación y Conteo',
      instructions: [
        'Separa tu mazo completo en 5 grupos sobre una mesa limpia: Grupo 1 (22 Mayores), Grupo 2 (Bastos), Grupo 3 (Copas), Grupo 4 (Espadas) y Grupo 5 (Oros).',
        'Verifica que tengas 14 cartas en cada palo menor (del As al Diez más Sota, Caballero, Reina y Rey).',
        'Contempla la diferencia de vibración entre un Arcano Mayor y una carta numérica menor.',
      ],
      deliverablePrompt: 'Dudas sobre la numeración o estructura de tu mazo: consultas@arcanosolutions.com.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 3: ARCANOS MAYORES VS. ARCANOS MENORES: MACROCOSMOS Y MICROCOSMOS
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-3': {
    lessonId: 'tarot-01-lesson-3',
    courseId: 'tarot-01',
    title: 'Arcanos Mayores vs. Arcanos Menores',
    subtitle: 'Jerarquía sagrada: Cuándo el destino manda y cuándo la decisión es tuya',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. Distinción de Peso Energético en la Mesa',
        paragraphs: [
          'Uno de los errores más comunes del principiante es darle el mismo peso interpretativo a una carta mayor que a una carta menor. En una lectura:',
          '• Si predominan los Arcanos Mayores: El consultante está atravesando una encrucijada mayor de vida (un cambio de vocación, una ruptura de raíz, un despertar espiritual, un llamado kármico). Las fuerzas en juego van más allá de su control inmediato y le piden maduración interna.',
          '• Si predominan los Arcanos Menores: La situación es maleable, transitoria y depende enteramente de las decisiones, hábitos y conversaciones cotidianas del consultante.',
        ],
        calloutBox: {
          type: 'practice',
          title: 'Regla de Oro en Consulta',
          text: '«Los Arcanos Mayores señalan el POR QUÉ profundo y hacia dónde sopla el viento del alma; los Arcanos Menores muestran el CÓMO actuar y las circunstancias de tierra firme».',
        },
      },
      {
        sectionTitle: '2. Tabla Comparativa de Lectura',
        paragraphs: [
          'Observa la diferencia de enfoque al responder una misma pregunta:',
          'Pregunta: «¿Cómo evolucionará mi proyecto laboral?»',
          '• Si sale EL JUICIO (Arcano Mayor XX): Hay una transformación de raíz, un llamado vocacional ineludible y un despertar de talentos dormidos que cambiará tu vida profesional para siempre.',
          '• Si sale el TRES DE OROS (Arcano Menor): El proyecto avanzará con éxito mediante el trabajo en equipo, la cooperación con colegas calificados y la entrega rigurosa en el día a día.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Kármico',
        definition: 'Relativo a las lecciones de causa y efecto indispensables para la evolución del alma.',
      },
      {
        term: 'Tendencia Maleable',
        definition: 'Circunstancia descrita por los arcanos menores susceptible de ser modificada con un cambio de actitud consciente.',
      },
    ],
    practicalExercise: {
      title: 'Tirada Comparativa: Lo Esencial vs. Lo Cotidiano',
      instructions: [
        'Separa los 22 Arcanos Mayores a tu izquierda y los 56 Menores a tu derecha.',
        'Baraja los Mayores y extrae 1 carta: «¿Cuál es mi lección de vida central en este mes?»',
        'Baraja los Menores y extrae 1 carta: «¿Qué acción concreta me ayudará a transitarla hoy?»',
      ],
      deliverablePrompt: 'Envía tu interpretación de ambas cartas a consultas@arcanosolutions.com para recibir validación de tu enfoque.',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 4: PALABRAS CLAVE ESENCIALES Y GLOSARIO ARQUETÍPICO
  // ----------------------------------------------------------------------------
  'tarot-01-lesson-4': {
    lessonId: 'tarot-01-lesson-4',
    courseId: 'tarot-01',
    title: 'Palabras Clave Esenciales y Glosario Arquetípico',
    subtitle: 'El vocabulario iniciático: Luz y sombra de los primeros 11 Arcanos Mayores',
    readingTimeMinutes: 25,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. Cómo Memorizar Cartas sin Convertirte en un Robot',
        paragraphs: [
          'En ARCANO enseñamos a no depender de folletos de memoria memorizados de paporreta. Cada arcano tiene una pulsación nuclear que puede resumirse en 2 palabras clave de luz y 2 palabras clave de sombra.',
          'El arte del tarotista consiste en captar qué polo de la carta está activo en la vida del consultante durante la sesión.',
        ],
      },
      {
        sectionTitle: '2. Claves de los Arcanos 0 al X',
        paragraphs: [
          '• 0 EL LOCO: Luz: Salto de fe, inocencia, libertad, inicio audaz. Sombra: Imprudencia, evasión, caos, desconexión.',
          '• I EL MAGO: Luz: Voluntad consciente, herramientas disponibles, manifestación, iniciativa. Sombra: Manipulación, charlatanería, engaño, parálisis.',
          '• II LA SACERDOTISA: Luz: Sabiduría intuitiva, silencio sagrado, misterio, gestación. Sombra: Secretismo frío, represión emocional, aislamiento.',
          '• III LA EMPERATRIZ: Luz: Abundancia, fertilidad, creatividad sensorial, gozo de vivir. Sombra: Vanidad, posesividad, asfixia afectiva.',
          '• IV EL EMPERADOR: Luz: Estructura sólida, protección, liderazgo, orden firme. Sombra: Tiranía, rigidez mental, control obsesivo.',
          '• V EL SUMO SACERDOTE: Luz: Tradición sabia, mentoría, ética hermética, valores espirituales. Sombra: Dogmatismo ciego, fanatismo, hipocresía moral.',
          '• VI LOS ENAMORADOS: Luz: Elección del corazón, armonía vincular, alineación de valores. Sombra: Indecisión crónica, conflicto moral, dependencia.',
          '• VII EL CARRO: Luz: Determinación triunfante, dominio de impulsos opuestos, avance certero. Sombra: Arrogancia, choque violento, pérdida de rumbo.',
          '• VIII LA FUERZA: Luz: Dominio del instinto con ternura, compasión, paciencia heroica. Sombra: Lucha estéril, brutalidad, debilidad interior.',
          '• IX EL ERMITAÑO: Luz: Introspección iluminadora, retiro sabio, búsqueda de la verdad interior. Sombra: Soledad amarga, misantropía, temor a compartir.',
          '• X LA RUEDA DE LA FORTUNA: Luz: Cambio de ciclo favorable, sincronía cósmica, evolución inevitable. Sombra: Resistencia al cambio, fatalismo, sensación de montaña rusa.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Regla Hermética de la Polaridad',
          text: '«Los extremos se tocan; todos los contrarios son idénticos en su naturaleza, pero diferentes en su grado». Ninguna carta es 100% positiva ni 100% negativa; todo depende del nivel de conciencia con el que se viva su frecuencia.',
        },
      },
    ],
    keyTerms: [
      {
        term: 'Manifestación en Luz',
        definition: 'La expresión consciente, madura y constructiva del arquetipo.',
      },
      {
        term: 'Manifestación en Sombra',
        definition: 'La expresión reactiva, exagerada o reprimida del arquetipo que genera conflicto.',
      },
    ],
    practicalExercise: {
      title: 'Identificación de Luz y Sombra',
      instructions: [
        'Escoge un Arcano Mayor entre el 0 y el X con el que sientas afinidad o resistencia.',
        'Escribe en tu cuaderno: «¿En qué momentos de mi vida he vivido la luz de este arcano? ¿Y en qué momentos he caído en su sombra?»',
      ],
      deliverablePrompt: 'Comparte tu reflexión con el tutor de ARCANO: consultas@arcanosolutions.com.',
    },
  },

  // ------------------------------------------------------------
  // LECCIÓN 5: LOS 4 PALOS Y LOS 4 ELEMENTOS PRIMORDIALES
  // ------------------------------------------------------------
  'tarot-01-lesson-5': {
    lessonId: 'tarot-01-lesson-5',
    courseId: 'tarot-01',
    title: 'Los 4 Palos y los 4 Elementos Primordiales',
    subtitle: 'Fuego, Agua, Aire y Tierra: La brújula material de los 56 Arcanos Menores',
    readingTimeMinutes: 24,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Alquimia Elemental en el Tarot',
        paragraphs: [
          'Los 56 Arcanos Menores se organizan en torno a la doctrina clásica de los 4 Elementos. Conocer el elemento de una carta te permite saber de inmediato en qué área de la vida del consultante está ocurriendo el suceso:',
        ],
        bulletPoints: [
          '🔥 BASTOS — ELEMENTO FUEGO: Representa la fuerza vital, la pasión creadora, los proyectos, la ambición, la energía sexual y la chispa espiritual. Su pregunta guía: «¿Qué deseo crear con voluntad?»',
          '💧 COPAS — ELEMENTO AGUA: Representa el mundo emocional, los vínculos afectivos, la familia, el amor, los sueños, el alma y la intuición sutil. Su pregunta guía: «¿Qué siento verdaderamente en mi corazón?»',
          '💨 ESPADAS — ELEMENTO AIRE: Representa el intelecto, los pensamientos, las palabras, los acuerdos, las verdades dolorosas, los límites y las batallas mentales. Su pregunta guía: «¿Qué comprendo con lucidez?»',
          '🌱 OROS / PENTÁCULOS — ELEMENTO TIERRA: Representa la materia tangible, el cuerpo físico, el dinero, el trabajo, las propiedades, la salud y la perseverancia terrenal. Su pregunta guía: «¿Qué construyo en la realidad?»',
        ],
      },
      {
        sectionTitle: '2. Las 16 Figuras Cortesanas: Las Familias Elementales',
        paragraphs: [
          'Cada palo contiene 4 figuras que representan grados de maduración y personalidades concretas:',
          '• SOTAS (Pajes / Tierra del elemento): La curiosidad, el aprendizaje, el mensaje nuevo, la actitud de aprendiz.',
          '• CABALLEROS (Caballos / Aire del elemento): La acción decidida, el impulso dinámico, el viaje, la conquista o la prisa.',
          '• REINAS (Agua del elemento): La maestría interior, la nutrición del don, la receptividad y la madurez emocional.',
          '• REYES (Fuego del elemento): El dominio exterior, la autoridad consolidada, el liderazgo y la responsabilidad pública.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Bastos',
        definition: 'Palo asociado al elemento Fuego y a la energía de iniciativa, voluntad y proyectos.',
      },
      {
        term: 'Copas',
        definition: 'Palo asociado al elemento Agua y al universo afectivo, emocional e intuitivo.',
      },
      {
        term: 'Espadas',
        definition: 'Palo asociado al elemento Aire y al discernimiento mental, comunicación y corte ético.',
      },
      {
        term: 'Oros',
        definition: 'Palo asociado al elemento Tierra y a la economía, salud, cuerpo y concreción material.',
      },
    ],
    practicalExercise: {
      title: 'Mapeo Elemental Personal',
      instructions: [
        'Toma las 4 cartas de los Ases (As de Bastos, As de Copas, As de Espadas y As de Oros).',
        'Colócalos en cruz sobre tu mesa (Fuego al Sur, Agua al Oeste, Aire al Este y Tierra al Norte).',
        'Pregúntate con honestidad: «¿Cuál de estos 4 elementos está más desnutrido en mi vida en este instante? ¿Cuál está en exceso?»',
      ],
      deliverablePrompt: 'Para dudas sobre el balance elemental de tus cartas: consultas@arcanosolutions.com.',
    },
  },

  // ------------------------------------------------------------
  // LECCIÓN 6: PREPARACIÓN DEL ESPACIO SAGRADO, CONSAGRACIÓN Y BARAJADO ÉTICO
  // ------------------------------------------------------------
  'tarot-01-lesson-6': {
    lessonId: 'tarot-01-lesson-6',
    courseId: 'tarot-01',
    title: 'Preparación del Espacio Sagrado, Consagración y Barajado Ético',
    subtitle: 'El templo del lector: Cómo limpiar tu mazo, blindar tu energía y barajar con respeto',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. El Rito de Apertura del Espacio Sagrado',
        paragraphs: [
          'Una consulta de Tarot no es una charla casual de pasillo. Es un espacio de revelación donde dos almas se encuentran frente a símbolos ancestrales.',
          'Antes de iniciar cualquier lectura:',
          '1. Limpia la superficie física con un paño limpio y coloca tu tapete de tela natural (algodón, terciopelo o seda oscura).',
          '2. Enciende una vela blanca o un incienso ceremonial (sándalo, salvia o mirra) para purificar el ambiente.',
          '3. Silencia dispositivos electrónicos para evitar fugas de atención y concentración.',
        ],
        calloutBox: {
          type: 'warning',
          title: 'Código Deontológico de ARCANO',
          text: 'Nunca leas las cartas bajo efectos de alcohol o estados de agitación extrema. El Tarot requiere quietud mental y absoluto respeto a la intimidad y vulnerabilidad de quien consulta.',
        },
      },
      {
        sectionTitle: '2. Limpieza y Consagración de tu Mazo',
        paragraphs: [
          'Cuando un mazo es nuevo o ha sido utilizado para lecturas de alta carga emocional, es conveniente armonizar su impronta energética:',
          '• Purificación por Sahumerio: Pasa cada tercio del mazo lentamente a través del humo de salvia blanca o copal.',
          '• Purificación con Cristal: Coloca un cuarzo blanco o una selenita sobre el mazo durante una noche.',
          '• Consagración Personal: Sostén el mazo sobre tu pecho y proclama con convicción tu intención de que estas cartas sirvan a la verdad, la claridad, el consuelo ético y la luz.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Tapete Ceremonial',
        definition: 'Superficie de tela consagrada que delimita el espacio sagrado de lectura de la mesa profana.',
      },
      {
        term: 'Consagración',
        definition: 'Acto voluntario y consciente de dedicar un objeto ritual a un propósito superior y ético.',
      },
    ],
    practicalExercise: {
      title: 'Consagración Solemne de tu Primer Mazo',
      instructions: [
        'Realiza la limpieza con humo o con un cuarzo de tu baraja.',
        'Coloca las 78 cartas en orden (desde El Loco hasta El Mundo, seguidos de Bastos, Copas, Espadas y Oros).',
        'Respira hondo y consagra tu mazo dedicándolo a tu aprendizaje en ARCANO.',
      ],
      deliverablePrompt: 'Dudas sobre rituales de consagración y limpieza: consultas@arcanosolutions.com.',
    },
  },

  // ------------------------------------------------------------
  // LECCIÓN 7: PRIMERAS TIRADAS GUIADAS: LECTURAS LINEALES DE 1 Y 3 CARTAS
  // ------------------------------------------------------------
  'tarot-01-lesson-7': {
    lessonId: 'tarot-01-lesson-7',
    courseId: 'tarot-01',
    title: 'Primeras Tiradas Guiadas: Lecturas Lineales de 1 y 3 Cartas',
    subtitle: 'De la teoría a la mesa: Técnicas de lectura dinámica, conexión de cartas y casos reales',
    readingTimeMinutes: 26,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Tirada de 1 Carta: El Oráculo del Día',
        paragraphs: [
          'Es el ejercicio diario más formativo para el estudiante. Cada mañana, tras barajar, extraes una carta única preguntando:',
          '«¿Cuál es la frecuencia arquetípica que necesito comprender y encarnar hoy?»',
          'Al finalizar la jornada, antes de dormir, revisa los sucesos del día y constata cómo se manifestó esa energía.',
        ],
      },
      {
        sectionTitle: '2. La Tirada Clásica de 3 Cartas: El Hilo del Tiempo',
        paragraphs: [
          'La tirada lineal de 3 cartas es la arquitectura más versátil y profunda del Tarot. Sus tres posiciones se leen de izquierda a derecha:',
          '• Posición 1 (Izquierda): La Causa Raíz / Pasado / Lo que originó la situación.',
          '• Posición 2 (Centro): El Estado Presente / El desafío nuclear / Dónde estás parado ahora.',
          '• Posición 3 (Derecha): El Desenlace Potencial / La tendencia futura si mantienes tu rumbo actual.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'El Secreto de la Conexión de Cartas',
          text: 'Nunca interpretes las 3 cartas como islas desconectadas. Construye una oración viva: «Vienes de (Carta 1), te encuentras trabajando (Carta 2), y si actúas con conciencia te encaminas hacia (Carta 3)».',
        },
      },
      {
        sectionTitle: '3. Caso Práctico Resuelto',
        paragraphs: [
          'Consulta: «Deseo saber cómo abordar un cambio laboral que me atemoriza».',
          'Tirada obtenida:',
          '1. Pasado: DIEZ DE ESPADAS (Un cierre forzado, doloroso o agotamiento en tu antiguo empleo que te dejó sin fuerzas).',
          '2. Presente: EL MAGO (Arcano Mayor I): Tienes todos los talentos, contactos y destrezas sobre la mesa; la parálisis no es por falta de capacidad, sino por miedo residual.',
          '3. Futuro: TRES DE BASTOS: El horizonte se abre, expansión comercial, visión de largo plazo y confirmación de que el proyecto tomará vuelo firme.',
          'Síntesis pedagógica del lector: El dolor del pasado terminó (10 Espadas); hoy es momento de tomar el control activo de tus herramientas (El Mago) para mirar con audacia el nuevo horizonte que ya te espera (3 Bastos).',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Lectura Lineal',
        definition: 'Estructura de tirada secuencial donde cada posición responde a una dimensión temporal o temática.',
      },
      {
        term: 'Futuro Potencial',
        definition: 'La proyección probabilística basada en las elecciones actuales; el libre albedrío siempre puede moldearla.',
      },
    ],
    practicalExercise: {
      title: 'Tirada de 3 Cartas para un Asunto Personal',
      instructions: [
        'Formule una pregunta clara a tu mazo sobre un tema de tu vida actual.',
        'Extrae 3 cartas alineadas de izquierda a derecha (Pasado / Presente / Futuro Potencial).',
        'Escribe un informe de 1 a 2 párrafos unificando el mensaje en una síntesis con sentido.',
        'Envía tu tirada con la fotografía al correo oficial de tutoría: consultas@arcanosolutions.com para revisión y graduación del Nivel 1.',
      ],
      deliverablePrompt: 'Envía tu ejercicio completado a consultas@arcanosolutions.com con el asunto «Práctica Nivel 1 — [Tu Nombre]».',
    },
  },
};
