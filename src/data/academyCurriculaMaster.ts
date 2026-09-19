/**
 * ARCANO — Sabiduría de los Arcanos
 * Temarios Maestros Estandarizados para las 4 Rutas de Formación
 * 
 * Cada ruta sigue la estructura canónica de 14 dimensiones pedagógicas:
 * 1. Introducción al Sistema
 * 2. Comprensión de la Baraja / Mandala / Sistema
 * 3. Componentes Arquetípicos Mayores
 * 4. Componentes Estructurales Menores
 * 5. Métodos de Lectura / Aplicación / Tiradas
 * 6. Interpretación y Síntesis
 * 7. Ética y Responsabilidad Profesional
 * 8. Práctica y Desarrollo Personal
 * 9. Recursos Adicionales
 * 10. Conexión Espiritual y Sintonización
 * 11. Diferentes Usos y Aplicaciones
 * 12. Ejemplos Prácticos Comentados
 * 13. Esquemas, Guías y Resúmenes
 * 14. Conclusión y Certificación Oficial
 */

export interface CurriculumTopic {
  title: string;
  items: string[];
}

export interface RouteCurriculumMaster {
  id: 'tarot' | 'astrologia' | 'numerologia' | 'reiki';
  disciplineName: string;
  subtitle: string;
  glyph: string;
  sections: CurriculumTopic[];
}

export const ACADEMY_CURRICULA_MASTER: Record<string, RouteCurriculumMaster> = {
  tarot: {
    id: 'tarot',
    disciplineName: 'TAROT HERMÉTICO Y EVOLUTIVO',
    subtitle: 'El sendero sagrado de los 78 naipes y el despertar arquetípico',
    glyph: '🜁',
    sections: [
      {
        title: 'INTRODUCCIÓN AL TAROT',
        items: [
          'Objetivos del curso y misión del iniciado',
          'Historia y origen hermético del Tarot (Egipto, Marsella, Rider-Waite-Smith)',
          'Materiales necesarios: mazo consagrado, paño ritual y bitácora',
          'Expectativas del curso y compromiso de estudio',
        ],
      },
      {
        title: 'COMPRENDIENDO LA BARAJA DEL TAROT',
        items: [
          'Estructura de la baraja: 78 cartas (22 Arcanos Mayores y 56 Arcanos Menores)',
          'Diferentes tipos de barajas y escuelas tradicionales',
          'Primera actividad: Conociendo tu baraja y consagración inicial',
        ],
      },
      {
        title: 'LOS ARCANOS MAYORES',
        items: [
          'Significado profundo de cada una de las 22 cartas de los Arcanos Mayores',
          'Interpretaciones, simbología esotérica, colores y geometría sagrada',
          'El Viaje del Loco y las leyes de polaridad en luz y sombra',
        ],
      },
      {
        title: 'LOS ARCANOS MENORES',
        items: [
          'Estructura de los Arcanos Menores: los 4 palos y la progresión numérica del As al Diez',
          'Significado de las cartas de cada palo (Copas, Espadas, Oros, Bastos) y sus elementos',
          'Las 16 Figuras de la Corte (Sotas, Caballeros, Reinas, Reyes) como tipos psicológicos',
        ],
      },
      {
        title: 'MÉTODOS DE TIRADA',
        items: [
          'Tirada de una carta (Oráculo matutino y foco de atención)',
          'Tirada de tres cartas (Pasado, Presente, Futuro / Mente, Cuerpo, Espíritu)',
          'Tirada de la Cruz Celta (Análisis exhaustivo en 10 posiciones)',
          'Otros métodos populares de tirada: Estrella de 5 puntas y tirada de toma de decisiones',
        ],
      },
      {
        title: 'INTERPRETACIÓN DE TIRADAS',
        items: [
          'Cómo conectar las cartas en una tirada: flujo visual, correspondencias y contrastes',
          'Interpretación intuitiva vs. interpretación basada en significados dogmáticos',
          'Prácticas de lectura y ejercicios de integración narrativa',
        ],
      },
      {
        title: 'ÉTICA Y RESPONSABILIDAD DEL TAROTISTA',
        items: [
          'Código de ética en las lecturas de Tarot profesional',
          'Cómo manejar preguntas delicadas o difíciles (salud terminal, muerte, infidelidad y legal)',
          'Responsabilidad hacia los consultantes y preservación del libre albedrío',
        ],
      },
      {
        title: 'PRÁCTICA Y DESARROLLO PERSONAL',
        items: [
          'Consejos para desarrollar y canalizar la intuición superior',
          'Ejercicios de práctica diaria y autoevaluación',
          'Crear y custodiar un Diario de Tarot personal',
        ],
      },
      {
        title: 'RECURSOS ADICIONALES',
        items: [
          'Libros y tratados recomendados (Rachel Pollack, Sallie Nichols, Arthur E. Waite)',
          'Aplicaciones, efemérides y herramientas digitales complementarias',
        ],
      },
      {
        title: 'CONECTAR CON TUS GUÍAS ESPIRITUALES',
        items: [
          'Protocolos de apertura del espacio sagrado y protección psíquica',
          'Invocación a los maestros y guardianes antes de barajar',
        ],
      },
      {
        title: 'DIFERENTES USOS DEL TAROT',
        items: [
          'Tarot evolutivo y terapéutico para el autoconocimiento',
          'Tarot oracular y predictivo de tendencias energéticas',
          'Tarot meditativo para la fijación de arquetipos conscientes',
        ],
      },
      {
        title: 'EJEMPLOS DE TIRADAS COMENTADAS',
        items: [
          'Caso real 1: Desbloqueo de encrucijada laboral mediante Cruz Celta comentada',
          'Caso real 2: Tirada vincular de pareja con análisis de cartas en espejo',
        ],
      },
      {
        title: 'ESQUEMAS, GUÍAS Y RESÚMENES',
        items: [
          'Tabla de correspondencias astrológicas y cabalísticas',
          'Guía sintética de palabras clave en luz y en sombra',
          'Plantilla imprimible de registro de tiradas',
        ],
      },
      {
        title: 'CONCLUSIÓN DEL CURSO',
        items: [
          'Repaso de los temas clave y mandatos herméticos',
          'Siguientes pasos en el aprendizaje del Tarot en la Escuela ARCANO',
          'Certificación oficial de finalización del curso',
        ],
      },
    ],
  },

  astrologia: {
    id: 'astrologia',
    disciplineName: 'ASTROLOGÍA HERMÉTICA Y NATAL',
    subtitle: 'El mapa celeste del alma y la sincronicidad cósmica',
    glyph: '☉',
    sections: [
      {
        title: 'INTRODUCCIÓN A LA ASTROLOGÍA',
        items: [
          'Objetivos del curso y visión hermética del cosmos',
          'Historia de la Astrología: Babilonia, Alejandría y la revolución psicológica',
          'Materiales necesarios: efemérides, software astronómico y cuaderno de efemérides',
          'Expectativas del curso: El principio de "Como es arriba, es abajo"',
        ],
      },
      {
        title: 'COMPRENDIENDO EL MANDALA ASTROLÓGICO',
        items: [
          'Estructura de la rueda zodiacal: los 360°, los 12 signos y el horizonte local',
          'Diferentes tipos de cartas: Carta Natal, Tránsitos, Sinastría y Revolución Solar',
          'Primera actividad: Levantando y contemplando tu propia Carta Natal',
        ],
      },
      {
        title: 'LAS LUMINARIAS Y LOS PLANETAS',
        items: [
          'Las Luminarias: El Sol (identidad consciente) y la Luna (matriz emocional e inconsciente)',
          'Planetas Personales: Mercurio (mente), Venus (afecto) y Marte (voluntad)',
          'Planetas Sociales y Transpersonales: Júpiter, Saturno, Urano, Neptuno y Plutón',
        ],
      },
      {
        title: 'LOS SIGNOS Y LAS CASAS ASTROLÓGICAS',
        items: [
          'Los 12 Signos agrupados por Elementos (Fuego, Tierra, Aire, Agua) y Modalidades',
          'Las 12 Casas Astrológicas: Escenarios concretos de vida (del Ascendente al Medio Cielo)',
          'Ejes zodiacales de integración y polaridades complementarias',
        ],
      },
      {
        title: 'MÉTODOS DE LECTURA Y GEOMETRÍA CELESTE',
        items: [
          'Lectura de la tríada fundamental: Sol, Luna y Signo Ascendente',
          'Los aspectos mayores: Conjunción, Oposición, Trígono, Cuadratura y Sextil',
          'Distribución hemisférica, balance de elementos y planetas dominantes',
          'Introducción a los tránsitos y ciclos de maduración planetaria',
        ],
      },
      {
        title: 'INTERPRETACIÓN DE LA CARTA NATAL',
        items: [
          'Cómo conectar planetas, signos y casas en una narrativa integradora',
          'Interpretación intuitiva vs. rigor astronómico y matemático',
          'Prácticas guiadas de lectura natal y resolución de contradicciones aparentes',
        ],
      },
      {
        title: 'ÉTICA Y RESPONSABILIDAD DEL ASTRÓLOGO',
        items: [
          'Código de ética en la consulta astrológica profesional',
          'Cómo manejar tránsitos tensos (Plutón, Saturno, eclipses) sin generar angustia',
          'Preservación de la soberanía y libre albedrío del consultante',
        ],
      },
      {
        title: 'PRÁCTICA Y DESARROLLO PERSONAL',
        items: [
          'Consejos para sintonizar con los ritmos celestes en el día a día',
          'Ejercicios de seguimiento del tránsito de la Luna por las 12 casas',
          'Creación y custodia de un Diario Astrológico personal',
        ],
      },
      {
        title: 'RECURSOS ADICIONALES',
        items: [
          'Libros recomendados (Liz Greene, Howard Sasportas, Stephen Arroyo, Dane Rudhyar)',
          'Plataformas astronómicas, efemérides y software profesional de cartas',
        ],
      },
      {
        title: 'CONECTAR CON LA ARMONÍA DE LAS ESFERAS',
        items: [
          'Meditaciones de sintonización con los arquetipos planetarios',
          'Invocación a las inteligencias cósmicas y guardianes del tiempo',
        ],
      },
      {
        title: 'DIFERENTES USOS DE LA ASTROLOGÍA',
        items: [
          'Astrología evolutiva y del propósito vital del alma',
          'Astrología relacional: Sinastría y dinámica de vínculos',
          'Astrología predictiva consciente: Tránsitos y ciclos de vida',
        ],
      },
      {
        title: 'EJEMPLOS DE CARTAS COMENTADAS',
        items: [
          'Caso de estudio 1: Lectura completa de carta natal con nudo de cuadratura en T',
          'Caso de estudio 2: Análisis vocacional a través del regente del Ascendente y Casas de Tierra',
        ],
      },
      {
        title: 'ESQUEMAS, GUÍAS Y RESÚMENES',
        items: [
          'Tabla maestra de dignidades planetarias: Domicilios, exaltaciones, caídas y exilios',
          'Glosario rápido de símbolos astronómicos y glifos sagrados',
          'Ficha de síntesis para el análisis de una carta natal en 5 pasos',
        ],
      },
      {
        title: 'CONCLUSIÓN DEL CURSO',
        items: [
          'Repaso de los fundamentos del mandala zodiacal',
          'Siguientes pasos en la Escuela de Astrología de ARCANO',
          'Certificación oficial de finalización del curso',
        ],
      },
    ],
  },

  numerologia: {
    id: 'numerologia',
    disciplineName: 'NUMEROLOGÍA PITAGÓRICA Y SAGRADA',
    subtitle: 'El código vibratorio del alma y la arquitectura universal',
    glyph: '⬡',
    sections: [
      {
        title: 'INTRODUCCIÓN A LA NUMEROLOGÍA',
        items: [
          'Objetivos del curso y comprensión de la vibración del número',
          'Historia de la Numerología: Pitágoras, la Cábala hebrea y la Escuela de Alejandría',
          'Materiales necesarios: tabla alfanumérica, libreta pitagórica y calculadora sagrada',
          'Expectativas del curso: El universo estructurado bajo leyes matemáticas universales',
        ],
      },
      {
        title: 'COMPRENDIENDO EL SISTEMA NUMÉRICO SAGRADO',
        items: [
          'Estructura de la tabla alfanumérica pitagórica (del 1 al 9)',
          'Diferencias entre numerología pitagórica, tántrica y cabalística',
          'Primera actividad: Reducción teosófica de tu fecha de nacimiento',
        ],
      },
      {
        title: 'LOS NÚMEROS SIMPLES Y NÚMEROS MAESTROS',
        items: [
          'Vibración profunda de los 9 números base (del 1 al 9) en frecuencia constructiva, destructiva y pasiva',
          'Los Números Maestros: 11, 22, 33 y 44 (desafío espiritual y misión cósmica)',
          'Simbología geométrica asociada a cada frecuencia numérica',
        ],
      },
      {
        title: 'LOS NÚMEROS KÁRMICOS Y COMPONENTES DEL NOMBRE',
        items: [
          'Las deudas kármicas: 13/4, 14/5, 16/7 y 19/1 (origen, memoria y trascendencia)',
          'El Número del Alma (suma de vocales): El anhelo íntimo del corazón',
          'El Número de la Personalidad (suma de consonantes): La máscara externa',
          'El Número de la Expresión y Talentos Innatos (nombre completo)',
        ],
      },
      {
        title: 'MÉTODOS DE CÁLCULO Y MAPA NUMEROLÓGICO',
        items: [
          'Cálculo del Sendero de Vida (Camino del Destino)',
          'La Matriz de los 4 Pináculos y los 4 Desafíos de Vida',
          'El Año Personal, Mes Personal y Día Personal',
          'Cálculo de compatibilidad numérica de pareja y sinastría vibratoria',
        ],
      },
      {
        title: 'INTERPRETACIÓN DEL MAPA NUMEROLÓGICO',
        items: [
          'Cómo conectar la fecha de nacimiento y el nombre en un perfil holístico',
          'Interpretación intuitiva vs. exactitud matemática y analítica',
          'Prácticas guiadas de lectura de mapas numerológicos de consultantes reales',
        ],
      },
      {
        title: 'ÉTICA Y RESPONSABILIDAD DEL NUMERÓLOGO',
        items: [
          'Código de ética en el asesoramiento numerológico',
          'Cómo comunicar números kármicos y etapas de desafío sin crear sugestión negativa',
          'Empoderamiento del consultante a través del autoconocimiento de sus ciclos',
        ],
      },
      {
        title: 'PRÁCTICA Y DESARROLLO PERSONAL',
        items: [
          'Consejos para identificar y decodificar sincronicidades numéricas (números espejo)',
          'Ejercicios de cálculo diario del Número del Día y observación de sincronicidades',
          'Creación de la Bitácora Pitagórica personal',
        ],
      },
      {
        title: 'RECURSOS ADICIONALES',
        items: [
          'Libros y tratados recomendados (Matthew Oliver Goodwin, Florence Campbell, Hans Decoz)',
          'Plantillas digitales y calculadoras de mapas de pináculos',
        ],
      },
      {
        title: 'CONECTAR CON LA VIBRACIÓN CÓSMICA DEL NÚMERO',
        items: [
          'Meditaciones con las geometrías sagradas asociadas a cada dígito',
          'Sintonización interior antes de trazar un mapa numerológico',
        ],
      },
      {
        title: 'DIFERENTES USOS DE LA NUMEROLOGÍA',
        items: [
          'Numerología del autoconocimiento y orientación vocacional',
          'Numerología empresarial y selección de nombres de marcas o proyectos',
          'Numerología temporal para la toma consciente de decisiones anuales',
        ],
      },
      {
        title: 'EJEMPLOS DE MAPAS NUMEROLÓGICOS COMENTADOS',
        items: [
          'Caso de estudio 1: Sendero 7 con Número Maestro 11 en Alma y Deuda Kármica 14/5',
          'Caso de estudio 2: Análisis de cambio de ciclo anual: del Año Personal 9 al 1',
        ],
      },
      {
        title: 'ESQUEMAS, GUÍAS Y RESÚMENES',
        items: [
          'Tabla alfanumérica de conversión pitagórica universal',
          'Fichas sintéticas de los 9 números base y los 4 números maestros',
          'Formato imprimible de levantamiento de mapa numerológico',
        ],
      },
      {
        title: 'CONCLUSIÓN DEL CURSO',
        items: [
          'Repaso de las fórmulas maestras y la sinfonía de los números',
          'Siguientes pasos de especialización en la Escuela ARCANO',
          'Certificación oficial de finalización del curso',
        ],
      },
    ],
  },

  reiki: {
    id: 'reiki',
    disciplineName: 'REIKI USUI TRADICIONAL Y SANACIÓN ENERGÉTICA',
    subtitle: 'El arte sagrado de canalizar la energía vital universal',
    glyph: '✺',
    sections: [
      {
        title: 'INTRODUCCIÓN AL REIKI Y A LA ENERGÍA SUTIL',
        items: [
          'Objetivos del curso y propósito del canal de luz',
          'Historia y linaje sagrado del Reiki (Mikao Usui, Hayashi, Takata y la tradición japonesa)',
          'Materiales necesarios: espacio sagrado, almohadilla, incienso y música a 432Hz',
          'Expectativas del curso: Ser un canal puro y transparente, no la fuente',
        ],
      },
      {
        title: 'COMPRENDIENDO EL SISTEMA ENERGÉTICO HUMANO',
        items: [
          'Anatomía sutil: El Campo Bioenergético (Aura) y sus 7 capas electromagnéticas',
          'Los 7 Chakras principales: ubicación, color, glándulas y correspondencias emocionales',
          'Primera actividad: Autoevaluación del estado energético y centrado en el Tan Tien',
        ],
      },
      {
        title: 'LOS PRINCIPIOS Y SÍMBOLOS SAGRADOS DEL REIKI',
        items: [
          'Los 5 Principios del Reiki (Gokai) en japonés y español',
          'El rito de iniciación (Reiju): Apertura del canal coronario y sintonización vibratoria',
          'El símbolo sagrado Cho Ku Rei: Trazo, mantra y activación del poder primordial',
        ],
      },
      {
        title: 'CANALES ENERGÉTICOS Y PROTOCOLOS PREVIOS',
        items: [
          'Los meridianos sutiles y el canal central (Sushumna, Ida y Pingala)',
          'Técnicas de purificación: Baño seco (Kenyoku Ho) y enraizamiento a la Tierra',
          'Percepción de las sensaciones en las manos (Byosen): Calor, cosquilleo y frío',
        ],
      },
      {
        title: 'MÉTODOS DE APLICACIÓN Y POSICIONES SAGRADAS',
        items: [
          'Posiciones de manos para el autotratamiento completo (cabeza, torso, plexo, espalda)',
          'Tratamiento completo a otra persona en camilla o silla',
          'Tratamiento de armonización rápida de los 7 Chakras',
          'Aplicación de Reiki en animales, plantas, medicamentos y alimentos',
        ],
      },
      {
        title: 'INTERPRETACIÓN DE SENSACIONES Y FLUJO ENERGÉTICO',
        items: [
          'Cómo interpretar las densidades energéticas sin emitir juicios médicos',
          'Escucha intuitiva vs. seguimiento mecánico del protocolo de posiciones',
          'Prácticas guiadas de imposición de manos y calibración de sensibilidad palmar',
        ],
      },
      {
        title: 'ÉTICA Y RESPONSABILIDAD DEL TERAPEUTA REIKI',
        items: [
          'Código de ética: El Reiki como terapia complementaria, jamás sustitutiva',
          'Respeto al proceso y consentimiento libre del consultante',
          'Desapego del resultado: Confianza en la inteligencia propia de la energía universal',
        ],
      },
      {
        title: 'PRÁCTICA Y DESARROLLO PERSONAL',
        items: [
          'El período sagrado de 21 días de autotratamiento y purificación interior',
          'Ejercicios diarios de meditación Gassho y respiración Hatsurei Ho',
          'Creación de la Bitácora de Práctica Energética personal',
        ],
      },
      {
        title: 'RECURSOS ADICIONALES',
        items: [
          'Libros recomendados (Frans Stiene, Frank Arjava Petter, William Lee Rand)',
          'Música sagrada, frecuencias solfeggio (528Hz, 432Hz) y aromaterapia armónica',
        ],
      },
      {
        title: 'CONECTAR CON LA FUENTE UNIVERSAL Y GUÍAS DE SANACIÓN',
        items: [
          'Invocación a los Maestros Ascendidos de la línea Usui y guías espirituales de luz',
          'Técnica de apertura del canal de luz y corte de lazos energéticos al finalizar',
        ],
      },
      {
        title: 'DIFERENTES USOS DEL REIKI',
        items: [
          'Reiki para la relajación profunda, alivio del estrés y sueño reparador',
          'Reiki para la liberación de bloqueos emocionales estancados',
          'Reiki para la limpieza y bendición de espacios y hogares',
        ],
      },
      {
        title: 'EJEMPLOS DE SESIONES COMENTADAS',
        items: [
          'Caso de estudio 1: Sesión completa de 45 minutos a consultante con agotamiento crónico',
          'Caso de estudio 2: Manejo consciente de una catarsis emocional durante la sesión',
        ],
      },
      {
        title: 'ESQUEMAS, GUÍAS Y RESÚMENES',
        items: [
          'Mapa visual de las 12 posiciones de manos para autotratamiento y tratamiento a terceros',
          'Tabla de los 7 Chakras, glándulas, colores y frecuencias sonoras',
          'Guía rápida de los 5 Principios y decretos del amanecer',
        ],
      },
      {
        title: 'CONCLUSIÓN DEL CURSO',
        items: [
          'Repaso de los fundamentos y juramento del canal de luz',
          'Siguientes pasos hacia el Nivel 2 (Símbolos superiores y sanación a distancia)',
          'Certificación oficial con linaje de la Escuela ARCANO',
        ],
      },
    ],
  },
};
