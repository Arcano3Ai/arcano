// ==============================================================================
// ARCANO ACADEMIA ESOTÉRICA — MATERIAL DE ESTUDIO OFICIAL: NIVEL 1
// Ruta: ASTROLOGÍA (La Mecánica Celeste y la Rueda Zodiacal)
// Curso: Astrología desde Cero (astrologia-01)
// Correo Oficial de Tutorías y Prácticas: consultas@arcanosolutions.com
// ==============================================================================

import { LessonStudyGuide } from './academyStudyLevel1';

export const ASTROLOGY_LEVEL_1_STUDY_GUIDES: Record<string, LessonStudyGuide> = {
  // ----------------------------------------------------------------------------
  // LECCIÓN 1: HISTORIA Y FILOSOFÍA DE LA ASTROLOGÍA TRADICIONAL Y MODERNA
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-1': {
    lessonId: 'astrologia-01-lesson-1',
    courseId: 'astrologia-01',
    title: 'Historia y Filosofía de la Astrología Tradicional y Moderna',
    subtitle: 'El principio hermético de correspondencia: Como es arriba, es abajo',
    readingTimeMinutes: 18,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. El Nacimiento de la Astrología en la Mesopotamia Sagrada',
        paragraphs: [
          'La astrología nació en el momento en que el ser humano elevó la mirada a la bóveda celeste y comprendió que el orden estelar no era ajeno al devenir terrestre. En las llanuras de Caldea y Babilonia (siglos XIX a VI a.C.), los sacerdotes astrónomos registraron minuciosamente los eclipses, las fases lunares y el movimiento errante de los cinco planetas visibles a simple vista: Mercurio, Venus, Marte, Júpiter y Saturno.',
          'Para el pensamiento mesopotámico, el cielo era una gran pizarra donde los dioses grababan presagios colectivos. La astrología primitiva no era individual ni natal; era judicial y oracular, consagrada a predecir la prosperidad del reino, las crecidas de los ríos Tigris y Éufrates, y el destino de los reyes.',
        ],
        bulletPoints: [
          'Tablillas de Enuma Anu Enlil: Primer compendio de más de 7,000 presagios astrológicos babilónicos.',
          'El Zigurat como observatorio y altar de mediación entre cielo y tierra.',
          'Noción del tiempo cíclico: Los astros demuestran que la realidad no es un caos lineal sino un orden sagrado de retorno periódico.',
        ],
      },
      {
        sectionTitle: '2. La Síntesis Helenística y el Nacimiento de la Carta Natal',
        paragraphs: [
          'Con la conquista de Alejandro Magno y el florecimiento de Alejandría en Egipto, la tradición babilónica se fusionó con la filosofía pitagórica, la geometría platónica y la física aristotélica. Aquí nació la astrología horoscópica o natal: la determinación del horoskopos (el signo y grado ascendente en el horizonte oriental al momento del nacimiento individual).',
          'En el siglo II d.C., Claudio Ptolomeo compuso el Tetrabiblos, la obra maestra que codificó la doctrina de los 12 signos tropicales, las 12 casas celestes, los aspectos geométricos mayores y las dignidades planetarias, sentando las bases que rigieron Europa y el mundo islámico durante más de mil quinientos años.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Axioma Hermético de Hermes Trismegisto (Tabla de Esmeralda)',
          text: '«Quod est inferius est sicut quod est superius, et quod est superius est sicut quod est inferius, ad perpetranda miracula rei unius» (Lo que está abajo es semejante a lo que está arriba, y lo que está arriba es semejante a lo que está abajo, para obrar los milagros de una sola cosa). La astrología no postula que los astros emitan un rayo magnético determinista sobre tu voluntad, sino que reflejan el estado del Todo en sincronicidad armónica.',
        },
      },
      {
        sectionTitle: '3. El Tránsito a la Astrología Psicológica y Humanista',
        paragraphs: [
          'Durante el Renacimiento, astrónomos y sabios como Johannes Kepler y Tycho Brahe continuaron ejerciendo la astrología con rigor matemático. No obstante, con la llegada del mecanicismo cartesiano, la disciplina fue relegada de las academias formales.',
          'En el siglo XX, el médico psiquiatra suizo Carl Gustav Jung rescató la astrología como el sistema arquetípico más completo jamás diseñado por la psique humana. La astrología contemporánea concibe la carta natal no como una condena del destino, sino como un mapa del tesoro psíquico, una semilla de potencialidades donde los planetas son funciones psicológicas internas en proceso de integración.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Zodíaco Tropical',
        definition: 'Sistema astrológico occidental basado en las estaciones y el punto vernal (0° de Aries), en contraposición al zodíaco sideral que mide las constelaciones astronómicas visibles.',
      },
      {
        term: 'Sincronicidad',
        definition: 'Concepto junguiano de coincidencia temporal no causal entre un estado anímico interno y un evento cósmico externo con sentido significativo.',
      },
      {
        term: 'Carta Natal (Radix)',
        definition: 'Fotografía instantánea y matemática del firmamento visto desde la latitud, longitud, fecha y hora exacta del nacimiento de un individuo.',
      },
    ],
    practicalExercise: {
      title: 'Práctica de Iniciación: Tu Conexión con los Ciclos Cósmicos',
      instructions: [
        'Investiga con exactitud tu hora de nacimiento en tu acta oficial o partida de bautismo.',
        'Redacta un texto reflexivo de 1 a 2 páginas respondiendo: ¿Concibes el universo como un mecanismo ciego y azaroso o como un organismo vivo interconectado?',
        'Identifica un momento en tu vida en el que hayas experimentado una sincronicidad indudable entre un proceso emocional y un evento externo.',
      ],
      deliverablePrompt: 'Envía tu reflexión en documento PDF o texto al correo oficial consultas@arcanosolutions.com con el asunto: "Astrología Nivel 1 - Lección 1: Historia y Sincronicidad - [Tu Nombre Completo]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 2: LA RUEDA ZODIACAL: DIVISIÓN EN 360 GRADOS Y LOS 12 SIGNOS
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-2': {
    lessonId: 'astrologia-01-lesson-2',
    courseId: 'astrologia-01',
    title: 'La Rueda Zodiacal: División en 360 Grados y los 12 Signos Sagrados',
    subtitle: 'La eclíptica solar, los 4 portales cardinales y el viaje del héroe de Aries a Piscis',
    readingTimeMinutes: 22,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. Geometría Sagrada de la Eclíptica',
        paragraphs: [
          'La rueda zodiacal es el cinturón imaginario de la esfera celeste a través del cual transita el Sol, la Luna y los planetas a lo largo de un año terrestre visto desde una perspectiva geocéntrica. Este círculo sagrado de 360 grados se divide matemáticamente en 12 arcos idénticos de 30 grados cada uno.',
          'Cada sector de 30 grados constituye un signo zodiacal. El punto de origen es el Equinoccio de Primavera en el hemisferio norte (el Punto Vernal o Punto Aries, 0° ♈). En este instante cósmico, el día y la noche tienen exactamente la misma duración y la fuerza vital del fuego primordial despierta de su letargo invernal.',
        ],
        bulletPoints: [
          'Equinoccio de Primavera (0° Aries): Nacimiento del ciclo vital, la chispa de fuego.',
          'Solsticio de Verano (0° Cáncer): La plenitud del agua emocional y la luz máxima.',
          'Equinoccio de Otoño (0° Libra): El balance del aire relacional y la contemplación del otro.',
          'Solsticio de Invierno (0° Capricornio): La solidez de la tierra, la maduración y la noche más profunda.',
        ],
      },
      {
        sectionTitle: '2. El Sendero Evolutivo de los 12 Arquetipos Zodiacales',
        paragraphs: [
          'Los 12 signos no son etiquetas superficiales, sino una espiral evolutiva de la conciencia humana:',
          '1. Aries (♈): El impulso original, el grito vital, la individualidad naciente.\n2. Tauro (♉): La fijación de la materia, los 5 sentidos, la nutrición y el valor.\n3. Géminis (♊): La curiosidad, el lenguaje, la dualidad y la conexión mental.\n4. Cáncer (♋): El útero primordial, el hogar, la memoria ancestral y la ternura.\n5. Leo (♌): El brillo solar, la creatividad individual, el juego y la autoafirmación.\n6. Virgo (♍): El discernimiento, la purificación, la artesanía y el servicio útil.',
          '7. Libra (♎): El encuentro con el prójimo, la armonía, la estética y la justicia.\n8. Escorpio (♏): La metamorfosis, la sombra, la sexualidad y la regeneración profunda.\n9. Sagitario (♐): La búsqueda de sentido, la filosofía, la fe y la expansión de horizontes.\n10. Capricornio (♑): La estructura, la ley del tiempo (Saturno), la maestría y la cosecha.\n11. Acuario (♒): La fraternidad universal, la innovación vanguardista y la libertad de mente.\n12. Piscis (♓): La disolución de las fronteras, la compasión mística y el retorno al océano primordial.',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'El Ciclo Completo del Espíritu',
          text: 'En Aries el alma dice «YO SOY»; en Tauro «YO TENGO»; en Géminis «YO PIENSO»; en Cáncer «YO SIENTO»; en Leo «YO CREO»; en Virgo «YO ANALIZO»; en Libra «YO EQUILIBRO»; en Escorpio «YO DESEO / TRANSFORMO»; en Sagitario «YO VEO»; en Capricornio «YO CONSTRUYO»; en Acuario «YO SÉ»; y en Piscis «YO ME FUNDO CON EL TODO».',
        },
      },
    ],
    keyTerms: [
      {
        term: 'Eclíptica',
        definition: 'Trayectoria aparente del Sol alrededor de la Tierra a lo largo del año solar.',
      },
      {
        term: 'Signo Tropical',
        definition: 'Cada uno de los 12 segmentos de 30° medidos a partir del equinoccio vernal.',
      },
      {
        term: 'Cúspide de Signo',
        definition: 'La frontera exacta (grado 0°00\'00") donde concluye un signo e inicia el siguiente.',
      },
    ],
    practicalExercise: {
      title: 'Mapeo de los 12 Arquetipos en tu Entorno',
      instructions: [
        'Dibuja a mano en una lámina o cuaderno un círculo perfecto y divídelo en 12 sectores iguales de 30° anotando los glifos de los 12 signos.',
        'Elige a 4 personas cercanas de signos solares distintos y describe cómo manifiestan las virtudes y los excesos de su signo zodiacal.',
        'Identifica en qué signos reconoces mayor afinidad natural y en cuáles experimentas mayor dificultad o fricción.',
      ],
      deliverablePrompt: 'Envía tu lámina dibujada y tu análisis descriptivo a consultas@arcanosolutions.com para revisión del tutor oficial con el asunto: "Astrología Nivel 1 - Lección 2: Rueda Zodiacal - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 3: LOS 4 ELEMENTOS CELESTES: FUEGO, TIERRA, AIRE Y AGUA
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-3': {
    lessonId: 'astrologia-01-lesson-3',
    courseId: 'astrologia-01',
    title: 'Los 4 Elementos Celestes: Fuego, Tierra, Aire y Agua',
    subtitle: 'Dinámica de la materia, temperamentos alquímicos y el balance elemental del ser',
    readingTimeMinutes: 20,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Doctrina Alquímica de los Elementos en el Cielo',
        paragraphs: [
          'La naturaleza manifestada se compone de cuatro sustancias primarias, cada una fruto de la combinación de dos cualidades primarias: Caliente, Frío, Seco y Húmedo.',
          'Cada signo zodiacal pertenece de forma inmutable a una de estas cuatro familias elementales (triplicidades). El elemento de un signo define su temperamento básico, su motor motivacional y el prisma a través del cual procesa la realidad.',
        ],
        bulletPoints: [
          'FUEGO (Caliente + Seco) — Aries, Leo, Sagitario: Impulso vital, entusiasmo, coraje, intuición activa, fe, liderazgo. En sombra: ira, egocentrismo, impaciencia destructiva.',
          'TIERRA (Fría + Seca) — Tauro, Virgo, Capricornio: Concreción tangible, paciencia, realismo, disciplina, contacto sensorial. En sombra: terquedad, materialismo ciego, rigidez mental.',
          'AIRE (Caliente + Húmedo) — Géminis, Libra, Acuario: Pensamiento abstracto, comunicación, perspectiva social, discernimiento ético. En sombra: desconexión emocional, dispersión, intelectualismo frío.',
          'AGUA (Fría + Húmeda) — Cáncer, Escorpio, Piscis: Emotividad, intuición receptiva, empatía profunda, memoria psíquica, devoción. En sombra: apego patológico, drama, hipersensibilidad victimaria.',
        ],
      },
      {
        sectionTitle: '2. El Cálculo del Balance Elemental en una Carta Natal',
        paragraphs: [
          'Ningún ser humano está compuesto de un solo elemento. Una carta natal contiene 10 planetas y puntos sensibles distribuidos a lo largo del mandala. Un individuo con Sol en Cáncer (Agua) puede tener Luna en Aries (Fuego), Mercurio en Géminis (Aire) y Ascendente en Tauro (Tierra).',
          'Aprender a tabular cuántos planetas se encuentran en cada elemento revela la homeostasis del consultante: qué elemento es dominante (el don innato) y qué elemento es deficiente (la lección kármica que debe cultivarse conscientemente en esta vida).',
        ],
        calloutBox: {
          type: 'hermetic',
          title: 'Compensación de Elementos Faltantes',
          text: 'Cuando una persona carece casi por completo del elemento Agua, puede sobreintelectualizar los sentimientos o rodearse inconscientemente de parejas con fuerte impronta de Agua para que carguen su mundo afectivo. La astrología sagrada busca la transmutación del plomo en oro: la autointegración de los cuatro elementos.',
        },
      },
    ],
    keyTerms: [
      {
        term: 'Triplicidad',
        definition: 'Grupo de 3 signos zodiacales que comparten el mismo elemento sagrado, separados por 120 grados (aspecto de trígono armónico).',
      },
      {
        term: 'Homeostasis Elemental',
        definition: 'Equilibrio psíquico y biológico resultante de la ponderación de planetas en Fuego, Tierra, Aire y Agua.',
      },
      {
        term: 'Carencia Elemental',
        definition: 'Ausencia o escasez de cuerpos celestes en determinado elemento, lo cual genera un anhelo inconsciente o una necesidad de desarrollo consciente.',
      },
    ],
    practicalExercise: {
      title: 'Auditoría Elemental Personal',
      instructions: [
        'Escribe en una tabla cuántos planetas de tu carta natal están en Fuego, Tierra, Aire y Agua (puedes usar tu Sol, Luna, Mercurio, Venus y Marte).',
        'Analiza: ¿Cuál es tu elemento predominante y cómo se manifiesta en tu vocación y estilo de vida?',
        'Si tienes deficiencia de algún elemento, diseña una práctica cotidiana para nutrirlo (ejemplo: si te falta Tierra, caminar descalzo en la hierba, llevar contabilidad ordenada y cocinar con presencia).',
      ],
      deliverablePrompt: 'Envía tu análisis de balance elemental al tutor oficial en consultas@arcanosolutions.com con el asunto: "Astrología Nivel 1 - Lección 3: Balance Elemental - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 4: LAS 3 MODALIDADES ENERGÉTICAS: CARDINAL, FIJA Y MUTABLE
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-4': {
    lessonId: 'astrologia-01-lesson-4',
    courseId: 'astrologia-01',
    title: 'Las 3 Modalidades Energéticas: Cardinal, Fija y Mutable',
    subtitle: 'La dinámica del movimiento cósmico: La chispa, el ancla y el viento de cambio',
    readingTimeMinutes: 19,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. El Ritmo Triádico de la Naturaleza',
        paragraphs: [
          'Si los elementos representan la sustancia de la que estamos hechos (el QUÉ), las modalidades energéticas o cuadruplicidades representan el ritmo dinámico con el que esa sustancia se manifiesta en el tiempo (el CÓMO).',
          'En el cosmos nada permanece estático. Todo fenómeno nace (Cardinal), se consolida en su forma (Fijo), y finalmente se disuelve para dar paso a lo nuevo (Mutable). Este ciclo coincide con las estaciones climáticas.',
        ],
        bulletPoints: [
          'SIGNOS CARDINALES (Aries, Cáncer, Libra, Capricornio): Coinciden con los solsticios y equinoccios. Son la energía iniciadora, la ambición pionera, el liderazgo y el arranque de nuevos proyectos. En sombra: incapacidad de concluir lo comenzado.',
          'SIGNOS FIJOS (Tauro, Leo, Escorpio, Acuario): Ocupan la mitad de cada estación. Son la perseverancia inquebrantable, la solidez, la profundidad y el sostenimiento en el tiempo. En sombra: rigidez dogmática, apego obstinado y resistencia patológica al cambio.',
          'SIGNOS MUTABLES (Géminis, Virgo, Sagitario, Piscis): Marcan la transición de una estación hacia la siguiente. Son la flexibilidad mental, la adaptabilidad, la capacidad de mediación y la integración de perspectivas múltiples. En sombra: dispersión, evasión del compromiso e inestabilidad.',
        ],
      },
      {
        sectionTitle: '2. Cruces Cósmicas y Conflictos Arquetípicos',
        paragraphs: [
          'Los signos que comparten una misma modalidad forman aspectos de cuadratura (90°) y oposición (180°) entre sí, conformando las tres grandes Cruces Cósmicas:',
          '1. La Cruz Cardinal: Crisis de acción y dirección (¿A dónde voy y quién dirige?).\n2. La Cruz Fija: Crisis de valor, deseo y solidez (¿A qué me aferro y qué debo soltar?).\n3. La Cruz Mutable: Crisis de sentido, aprendizaje y entrega (¿Cómo integro lo contradictorio?).',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Cuadruplicidad',
        definition: 'Grupo de 4 signos zodiacales que comparten la misma modalidad vibratoria, separados entre sí por ángulos de 90° y 180°.',
      },
      {
        term: 'Aspecto Dinámico (Cuadratura)',
        definition: 'Tensión geométrica de 90 grados entre dos planetas o signos que exige esfuerzo, acción y resolución de contradicciones.',
      },
    ],
    practicalExercise: {
      title: 'Diagnóstico de tu Estilo de Gestión y Acción',
      instructions: [
        'Evalúa en tus proyectos personales: ¿Eres de los que arrancan con fuego e ímpetu pero les cuesta terminar (Cardinal)? ¿Eres de los que se quedan años perfeccionando lo mismo sin permitir cambios (Fijo)? ¿O cambias de rumbo con fluidez pero corres riesgo de dispersión (Mutable)?',
        'Elige un proyecto pendiente y define un plan de 3 pasos para compensar tu modalidad menos desarrollada.',
      ],
      deliverablePrompt: 'Envía tu reflexión a consultas@arcanosolutions.com con el asunto: "Astrología Nivel 1 - Lección 4: Modalidades - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 5: POLARIDADES YIN Y YANG EN LA CARTA DEL CIELO
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-5': {
    lessonId: 'astrologia-01-lesson-5',
    courseId: 'astrologia-01',
    title: 'Polaridades Yin y Yang en la Carta del Cielo',
    subtitle: 'Fuerzas activas diurnas vs. fuerzas receptivas nocturnas en el mandala astrológico',
    readingTimeMinutes: 17,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Primera Bipartición Cósmica: Día y Noche',
        paragraphs: [
          'Antes de dividirse en 4 elementos o 12 signos, el mandala astrológico se divide en dos grandes polaridades universales que la tradición oriental denomina Yin y Yang, y la tradición hermética llama Fuerzas Masculinas / Diurnas y Fuerzas Femeninas / Nocturnas.',
          'Esta polaridad no se refiere al género biológico ni a la orientación sexual, sino a modos primordiales de relación entre la conciencia y el mundo exterior.',
        ],
        bulletPoints: [
          'POLARIDAD YANG / ACTIVA / MASCULINA: Corresponde a los signos de Fuego (Aries, Leo, Sagitario) y Aire (Géminis, Libra, Acuario). Su vector se proyecta hacia afuera, hacia la conquista del mundo exterior, la expresión de ideas y la autoafirmación visible.',
          'POLARIDAD YIN / RECEPTIVA / FEMENINA: Corresponde a los signos de Tierra (Tauro, Virgo, Capricornio) y Agua (Cáncer, Escorpio, Piscis). Su vector se repliega hacia adentro, hacia la contención, la nutrición, la asimilación profunda y la escucha sensible.',
        ],
      },
      {
        sectionTitle: '2. La Carta Diurna y la Carta Nocturna (Secta Planetaria)',
        paragraphs: [
          'En la astrología clásica tradicional, el concepto de Secta (Hairesis) es capital: si el Sol se encontraba sobre el horizonte (Casas 7 a 12) al nacer, la carta es Diurna; si el Sol estaba debajo del horizonte (Casas 1 a 6), la carta es Nocturna.',
          'En una carta diurna, el Sol, Júpiter y Saturno operan con mayor dignidad y confort térmico. En una carta nocturna, la Luna, Venus y Marte encuentran su territorio de mayor agudeza intuitiva.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Secta Astrológica',
        definition: 'Condición diurna o nocturna de una carta natal determinada por la posición del Sol en relación con el horizonte oriental-occidental (eje Ascendente-Descendente).',
      },
      {
        term: 'Vector Centrífugo (Yang)',
        definition: 'Energía que parte del centro del individuo hacia el entorno visible.',
      },
      {
        term: 'Vector Centrípeto (Yin)',
        definition: 'Energía que atrae las experiencias del entorno hacia la matriz interna de procesamiento emocional y corporal.',
      },
    ],
    practicalExercise: {
      title: 'Mapeo de tu Polaridad Primaria',
      instructions: [
        'Revisa si naciste de día (con sol visible) o de noche (después del atardecer).',
        'Contabiliza tus signos planetarios en Yang (Fuego + Aire) vs. Yin (Tierra + Agua).',
        'Redacta un texto de 1 cuartilla analizando cómo incide esta polaridad en tus momentos de estrés: ¿tiendes a actuar y verbalizar hacia afuera (Yang) o a recluirte y digerir en silencio (Yin)?',
      ],
      deliverablePrompt: 'Envía tu ejercicio a consultas@arcanosolutions.com con el asunto: "Astrología Nivel 1 - Lección 5: Polaridades - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 6: DIFERENCIA ENTRE SIGNO SOLAR, SIGNO LUNAR Y ASCENDENTE
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-6': {
    lessonId: 'astrologia-01-lesson-6',
    courseId: 'astrologia-01',
    title: 'Diferencia entre Signo Solar, Signo Lunar y Punto Ascendente',
    subtitle: 'La Santísima Trinidad de la personalidad: El Héroe, el Alma y el Vehículo',
    readingTimeMinutes: 24,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. La Trinidad de la Conciencia en la Astrología Humanista',
        paragraphs: [
          'El mayor error de la astrología comercial de horóscopos periodísticos consiste en reducir la inmensidad del ser humano a su Signo Solar. Dos personas con el Sol en Tauro pueden ser diametralmente distintas si una tiene Luna en Aries con Ascendente en Escorpio, y la otra tiene Luna en Piscis con Ascendente en Virgo.',
          'La base insustituible de la lectura natal descansa en el trípode fundacional: Sol, Luna y Ascendente.',
        ],
        bulletPoints: [
          'EL SIGNO SOLAR (La Mente Consciente / El Núcleo de Vida): Representa el Héroe Solar, el propósito consciente, la voluntad de ser, la vitalidad biológica y aquello hacia lo cual evolucionamos con madurez. Es el "Yo Soy".',
          'EL SIGNO LUNAR (El Inconsciente / El Cuerpo Emocional): Representa el refugio de la infancia, los patrones reactivos de seguridad afectiva, la relación con la figura materna y lo que necesitamos para sentirnos nutridos en la intimidad. Es el "Yo Siento y Me Protejo".',
          'EL ASCENDENTE (La Máscara Sagrada / El Vehículo de Encarnación): Es el signo que emergía por el horizonte este al momento de tu primera respiración. No es solo la apariencia física o cómo te ven los demás; es el lente a través del cual contemplas la vida y el escenario de experiencias que el destino te presentará para que despiertes tu Sol.',
        ],
      },
      {
        sectionTitle: '2. Dinámica de Integración de la Gran Trinidad',
        paragraphs: [
          'Imagina un carruaje ceremonial: el Sol es el noble pasajero que sabe a dónde quiere llegar; la Luna son los caballos que suministran la fuerza emocional e instintiva (que deben ser amados y tranquilizados sin ser castigados); y el Ascendente es el propio carruaje y el cochero visible ante la sociedad.',
          'Cuando el Sol, la Luna y el Ascendente entran en conflicto (por ejemplo, Sol en Leo que quiere brillar, pero Luna en Cáncer que teme ser expuesta y Ascendente en Capricornio que se muestra frío), el consultante experimenta angustia interna hasta que comprende que cada uno tiene una función sagrada irreemplazable.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Ascendente (AC)',
        definition: 'Grado del zodíaco que corta la cúspide de la Casa 1 en el horizonte oriental al momento de nacer.',
      },
      {
        term: 'Luminarias',
        definition: 'Denominación tradicional para el Sol y la Luna, los dos centros principales de luz en el cielo.',
      },
      {
        term: 'Regente del Ascendente',
        definition: 'El planeta que gobierna el signo del Ascendente; es considerado el "Capitán del Barco" o planeta timonel de toda la carta natal.',
      },
    ],
    practicalExercise: {
      title: 'Constelación de tu Trinidad Personal',
      instructions: [
        'Identifica tu Signo Solar, tu Signo Lunar y tu Signo Ascendente.',
        'Redacta un diálogo imaginario entre tus tres partes: ¿Qué le pide tu Luna a tu Sol? ¿Qué le exige tu Ascendente a tu Luna?',
        'Describe una situación reciente donde hayas reaccionado desde tu Luna instintiva y cómo pudiste haber respondido desde la madurez de tu Sol.',
      ],
      deliverablePrompt: 'Envía tu diálogo y análisis de la Gran Trinidad a consultas@arcanosolutions.com con el asunto: "Astrología Nivel 1 - Lección 6: Trinidad Personal - [Tu Nombre]".',
    },
  },

  // ----------------------------------------------------------------------------
  // LECCIÓN 7: INTRODUCCIÓN AL CÁLCULO DE LA CARTA NATAL CON EFEMÉRIDES
  // ----------------------------------------------------------------------------
  'astrologia-01-lesson-7': {
    lessonId: 'astrologia-01-lesson-7',
    courseId: 'astrologia-01',
    title: 'Introducción al Cálculo de la Carta Natal con Efemérides Astronómicas',
    subtitle: 'La anatomía del gráfico natal, los 4 ángulos cardinales y la ética de la consulta',
    readingTimeMinutes: 25,
    officialTutorEmail: 'consultas@arcanosolutions.com',
    modules: [
      {
        sectionTitle: '1. Anatomía Visual de un Mandala Astrológico',
        paragraphs: [
          'La carta natal es un mapa circular bi-dimensional del cielo tridimensional. En el centro está la Tierra (el sujeto); alrededor se encuentran los doce signos del zodíaco (el escenario cósmico), las doce casas astrológicas (las áreas de experiencia práctica) y los glifos de los diez planetas y nodos lunares.',
          'Los cuatro ángulos fundamentales estructuran la rueda:',
          '• Ascendente (AC): Cúspide de Casa 1 — El Yo, la máscara, el nacimiento.\n• Descendente (DC): Cúspide de Casa 7 — El Otro, la pareja, las alianzas, el espejo.\n• Medio Cielo (MC): Cúspide de Casa 10 — La vocación pública, el cenit, la reputación y el destino profesional.\n• Fondo del Cielo (IC): Cúspide de Casa 4 — El nadir, la raíz familiar, el hogar íntimo y el linaje de los ancestros.',
        ],
      },
      {
        sectionTitle: '2. Las Efemérides y el Tiempo Universal (GMT/UTC)',
        paragraphs: [
          'Para levantar una carta natal con precisión matemática, se requiere convertir la hora civil local a Tiempo Universal Coordinado (UTC), corrigiendo husos horarios y horarios de verano. Con la latitud y longitud geográfica del lugar de nacimiento, se consulta la tabla de efemérides planetarias para calcular el Tiempo Sidéreo Local (LST) y determinar con exactitud las cúspides.',
          'Hoy en día contamos con potentes softwares astronómicos, pero el astrólogo profesional debe comprender la mecánica celeste que opera detrás de cada cálculo computarizado.',
        ],
        calloutBox: {
          type: 'warning',
          title: 'Código Deontológico y Ética de la Lectura Astrológica',
          text: 'Nunca utilices la carta natal para emitir diagnósticos médicos definitivos, vaticinar fechas fatales o infundir terror psicológico. La astrología es un instrumento sagrado de empoderamiento, consciencia y autoconocimiento, jamás de condena.',
        },
      },
      {
        sectionTitle: '3. Caso Práctico Resuelto: Lectura Integral Básica',
        paragraphs: [
          'Analicemos un caso de estudio pedagógico:',
          '• Nativo con Sol en Tauro (Casa 10), Luna en Escorpio (Casa 4) y Ascendente en Leo (Casa 1).\n• Diagnóstico inicial: El Ascendente en Leo le otorga una presencia luminosa, digna y cálida; no obstante, su Luna en Escorpio en el fondo íntimo del hogar guarda heridas infantiles profundas y un intenso miedo a la traición. Su propósito vital (Sol en Tauro en el cenit del Medio Cielo) consiste en construir una obra profesional tangible, serena, próspera y estable que le demuestre a su alma que el mundo es seguro y fértil.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Medio Cielo (MC)',
        definition: 'Punto de culminación superior del Sol en el meridiano al mediodía; rige la vocación y el estatus social.',
      },
      {
        term: 'Casas Astrológicas',
        definition: 'Doce sectores del espacio local que representan los diferentes escenarios prácticos de la vida humana (economía, hermanos, hogar, hijos, salud, pareja, etc.).',
      },
      {
        term: 'Tiempo Sidéreo',
        definition: 'Escala de tiempo basada en la rotación de la Tierra en relación con las estrellas lejanas, en lugar del Sol.',
      },
    ],
    practicalExercise: {
      title: 'Práctica Final Evaluativa de Nivel 1: Tu Mandala Natal',
      instructions: [
        'Genera tu carta natal completa ingresando tus datos exactos de nacimiento (fecha, hora y ciudad).',
        'Identifica en el gráfico tus 4 ángulos cardinales: Signo y grado exacto del Ascendente, Descendente, Medio Cielo y Fondo del Cielo.',
        'Redacta un ensayo de graduación de Nivel 1 de 2 a 3 páginas explicando cómo interactúa tu Signo Solar con tu Ascendente y tu Signo Lunar, basándote en los conceptos de elementos y modalidades aprendidos.',
      ],
      deliverablePrompt: 'Envía tu ensayo final de graduación con la imagen de tu carta natal adjunta al correo oficial consultas@arcanosolutions.com con el asunto: "Graduación Astrología Nivel 1 - [Tu Nombre Completo]".',
    },
  },
};
