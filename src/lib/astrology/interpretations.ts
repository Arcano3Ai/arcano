import { Aspect, CelestialBodyName, Element, Modality, NatalChartData, ZodiacSignName } from './types';

export interface InterpretationBlock {
  title: string;
  subtitle: string;
  summary: string;
  esotericMeaning: string;
  counsel: string;
}

export const SIGN_ESSENCE: Record<ZodiacSignName, { element: Element; modality: Modality; archetype: string; mantra: string }> = {
  Aries: {
    element: 'Fuego',
    modality: 'Cardinal',
    archetype: 'El Pionero y el Guerrero de la Luz',
    mantra: 'Yo Soy y Abro el Camino',
  },
  Tauro: {
    element: 'Tierra',
    modality: 'Fijo',
    archetype: 'El Guardián de la Materia y la Belleza',
    mantra: 'Yo Construyo y Reverencio la Vida',
  },
  Géminis: {
    element: 'Aire',
    modality: 'Mutable',
    archetype: 'El Mensajero y el Alquimista de Ideas',
    mantra: 'Yo Conecto y Traduzco el Misterio',
  },
  Cáncer: {
    element: 'Agua',
    modality: 'Cardinal',
    archetype: 'La Matriz Sagrada y el Protector del Alma',
    mantra: 'Yo Siento y Nutro la Raíz',
  },
  Leo: {
    element: 'Fuego',
    modality: 'Fijo',
    archetype: 'El Rey Solar y el Fuego Creativo',
    mantra: 'Yo Irradio la Verdad de mi Corazón',
  },
  Virgo: {
    element: 'Tierra',
    modality: 'Mutable',
    archetype: 'El Artesano del Orden Sagrado',
    mantra: 'Yo Discierne y Sirvo con Devoción',
  },
  Libra: {
    element: 'Aire',
    modality: 'Cardinal',
    archetype: 'El Pacificador y el Espejo de la Armonía',
    mantra: 'Yo Equilibro y Busco la Gracia Divina',
  },
  Escorpio: {
    element: 'Agua',
    modality: 'Fijo',
    archetype: 'El Ave Fénix y el Iniciado de las Profundidades',
    mantra: 'Yo Trasciendo y Regenero desde la Sombra',
  },
  Sagitario: {
    element: 'Fuego',
    modality: 'Mutable',
    archetype: 'El Filósofo Errante y la Flecha Espiritual',
    mantra: 'Yo Exploro y Confío en la Consciencia Suprema',
  },
  Capricornio: {
    element: 'Tierra',
    modality: 'Cardinal',
    archetype: 'El Sabio de la Cima y el Arquitecto del Destino',
    mantra: 'Yo Materializo la Visión Trascendente',
  },
  Acuario: {
    element: 'Aire',
    modality: 'Fijo',
    archetype: 'El Visionario Cósmico y el Rebelde Iluminado',
    mantra: 'Yo Despierto el Futuro en el Presente',
  },
  Piscis: {
    element: 'Agua',
    modality: 'Mutable',
    archetype: 'El Místico Oceánico y la Compasión Universal',
    mantra: 'Yo Disuelvo las Fronteras y Todo lo Abrazo',
  },
};

export const SUN_INTERPRETATIONS: Record<ZodiacSignName, InterpretationBlock> = {
  Aries: {
    title: 'Sol en Aries: El Fuego Primordial',
    subtitle: 'La Chispa de la Creación y el Coraje del Guerrero',
    summary: 'Tu esencia vital es una llama incandescente que no tolera la sumisión ni la inercia. Has venido a romper moldes, a ser el primer impulso donde otros dudan.',
    esotericMeaning: 'En el Tarot, resuena con El Emperador y El Carro. Representa el poder de la voluntad consciente sobre la materia virgen.',
    counsel: 'Dirige tu impulso con templanza: que tu fuego ilumine y caliente, no que arrase con impaciencia lo que aún está madurando.',
  },
  Tauro: {
    title: 'Sol en Tauro: El Templo de la Tierra',
    subtitle: 'La Belleza Duradera y el Enraizamiento Sagrado',
    summary: 'Tu vitalidad florece cuando honras el ritmo orgánico de la vida. Posees una fuerza telúrica capaz de transformar semillas invisibles en bosques frondosos.',
    esotericMeaning: 'Correspondencia con El Hierofante y La Emperatriz. Enseña que lo sagrado habita en lo tangible y en el deleite de los cinco sentidos.',
    counsel: 'Distingue entre perseverancia virtuosa y terquedad protectora. Abraza las mutaciones que el universo te invita a transitar.',
  },
  Géminis: {
    title: 'Sol en Géminis: La Danza de la Dualidad',
    subtitle: 'El Viento de la Consciencia y el Puente del Saber',
    summary: 'Tu espíritu es un caleidoscopio en constante renovación. Tu mente es un portal que teje relaciones entre planos aparentemente inconexos.',
    esotericMeaning: 'Vinculado a Los Enamorados y El Mago. Tu camino evolutivo reside en reconciliar las aparentes paradojas de la experiencia humana.',
    counsel: 'Profundiza en una sola verdad antes de saltar a diez nuevas. La maestría nace de anclar la curiosidad en un propósito superior.',
  },
  Cáncer: {
    title: 'Sol en Cáncer: El Manantial de la Memoria',
    subtitle: 'El Vientre Nutricio y la Fuerza de la Vulnerabilidad',
    summary: 'Llevas en tu interior la memoria oceánica de los orígenes. Tu poder radica en la intuición indómita y en tu don para proteger la chispa de la vida.',
    esotericMeaning: 'Correspondencia con La Suma Sacerdotisa y La Luna. El arquetipo de la vasija que custodia los misterios del tiempo y del amor protector.',
    counsel: 'No confundas proteger tu sensibilidad con construir murallas herméticas. Permite que las mareas emocionales fluyan sin retener nostalgias.',
  },
  Leo: {
    title: 'Sol en Leo: La Corona Solar',
    subtitle: 'La Soberanía del Corazón y el Esplendor Creativo',
    summary: 'Naciste para ocupar el centro de tu propio universo con generosidad radiante. Tu calor vital inspira y eleva a quienes tienen el honor de orbitar cerca de ti.',
    esotericMeaning: 'Correspondencia con La Fuerza y El Sol. Simboliza el despertar del león interior domesticado por la gracia y el amor incondicional.',
    counsel: 'El verdadero rey no exige vasallaje; su luz es tan abundante que ilumina a todos sin esperar aplausos. Crea por el gozo divino de crear.',
  },
  Virgo: {
    title: 'Sol en Virgo: El Crisol Alquímico',
    subtitle: 'La Pulcritud del Detalle y la Alquimia de la Perfección',
    summary: 'Tu consciencia es una lupa sagrada que distingue lo que sirve de lo que debe ser transmutado. Eres el afinador del mundo material.',
    esotericMeaning: 'Correspondencia con El Ermitaño. La lámpara que guía en la oscuridad a través de la sabiduría paciente y el discernimiento puro.',
    counsel: 'No confundas excelencia con autoexigencia implacable. Recuerda que la imperfección es el espacio donde respira el misterio de la vida.',
  },
  Libra: {
    title: 'Sol en Libra: La Balanza Cósmica',
    subtitle: 'La Armonía de los Opuestos y el Sendero de la Gracia',
    summary: 'Tu viaje sagrado es la búsqueda incesante de la belleza, la justicia y la sintonía armónica entre el yo y el otro.',
    esotericMeaning: 'Correspondencia con La Justicia. El platillo que busca el punto exacto de reposo entre el rigor y la compasión.',
    counsel: 'La paz auténtica no se logra evitando el conflicto a costa de tu propia voz. Aprende a sostener desacuerdos constructivos con entereza.',
  },
  Escorpio: {
    title: 'Sol en Escorpio: La Fragua del Inframundo',
    subtitle: 'La Regeneración Inmortal y la Verdad Oculta',
    summary: 'No temes descender a las profundidades de la sombra humana porque sabes que allí yacen los mayores tesoros de poder y transmutación.',
    esotericMeaning: 'Correspondencia con La Muerte (El Arcano XIII). No como final, sino como el paso indispensable hacia el renacimiento supremo del Fénix.',
    counsel: 'Suelta el deseo de control absoluto. La mayor muestra de poderío interior es entregarse al misterio de la confianza y el perdón.',
  },
  Sagitario: {
    title: 'Sol en Sagitario: La Flecha Infinita',
    subtitle: 'La Búsqueda de la Sabiduría Mayor y la Fe Intrépida',
    summary: 'Tu mirada está clavada en el horizonte más lejano. Eres el buscador eterno de sentido, el puente entre lo terrenal y las leyes cósmicas.',
    esotericMeaning: 'Correspondencia con La Templanza. La mezcla sagrada entre las aguas de la tierra y del cielo guiada por el centauro celestial.',
    counsel: 'Que tu optimismo no niegue las realidades del presente. Camina con los pies en la tierra mientras tus ojos contemplan la constelación.',
  },
  Capricornio: {
    title: 'Sol en Capricornio: El Templo de la Montaña',
    subtitle: 'El Dominio del Tiempo y la Maestría de la Voluntad',
    summary: 'Comprendes como nadie el valor de la paciencia, el esfuerzo sostenido y la herencia que trasciende generaciones. Eres el constructor de catedrales.',
    esotericMeaning: 'Correspondencia con El Diablo liberado (Pan) y El Mundo. La soberanía de quien ha dominado las ilusiones de la materia.',
    counsel: 'No cargues con el peso del mundo en tus hombros. Concédete el derecho a la ligereza, al juego y a celebrar tus triunfos en el presente.',
  },
  Acuario: {
    title: 'Sol en Acuario: El Aguador Cósmico',
    subtitle: 'La Vanguardia de la Consciencia y la Hermandad Universal',
    summary: 'Tus pensamientos viajan décadas por delante de tu tiempo. Eres el catalizador de nuevas libertades y el heraldo de la evolución colectiva.',
    esotericMeaning: 'Correspondencia con La Estrella. El cántaro que derrama las aguas de la inspiración pura sobre la humanidad sedienta.',
    counsel: 'No te aísles en la frialdad del intelecto teórico. Recuerda que la verdadera revolución de Acuario empieza abrazando con calidez al prójimo.',
  },
  Piscis: {
    title: 'Sol en Piscis: El Océano de la Unidad',
    subtitle: 'El Místico Cósmico y el Amor Trascendente',
    summary: 'Tu ser disuelve las fronteras entre el sueño y la vigilia. Posees una empatía ilimitada y una conexión directa con las corrientes del inconsciente colectivo.',
    esotericMeaning: 'Correspondencia con El Colgado y La Luna. El sacrificio del ego personal para fundirse con la sinfonía de la creación entera.',
    counsel: 'Establece anclas energéticas claras para no extraviarte en el dolor ajeno. Tu don sagrado requiere un canal limpio y protegido.',
  },
};

export const MOON_INTERPRETATIONS: Record<ZodiacSignName, InterpretationBlock> = {
  Aries: {
    title: 'Luna en Aries: El Impulso Emocional',
    subtitle: 'Reacciones Viscerales y Necesidad de Autonomía',
    summary: 'Procesas tus sentimientos con inmediatez y vehemencia. Necesitas libertad absoluta para expresar lo que sientes sin filtros represivos.',
    esotericMeaning: 'El niño interior intrépido que requiere desafíos constantes para sentirse vivo y seguro.',
    counsel: 'Aprende a respirar antes de reaccionar. El fuego emocional es poderoso para iniciar, pero la calma es indispensable para sanar.',
  },
  Tauro: {
    title: 'Luna en Tauro: El Refugio de Paz',
    subtitle: 'Estabilidad Sensorial y Seguridad Emocional Inquebrantable',
    summary: 'Tu mundo interno encuentra reposo en la calma, la naturaleza y la consistencia de los afectos. Eres el ancla emocional en momentos de tormenta.',
    esotericMeaning: 'La exaltación de la Luna: la nutrición sagrada que florece en la tierra fértil y serena.',
    counsel: 'Cuidado con el apego al confort o el miedo al cambio. Tu paz verdadera no depende de lo externo, sino de tu santuario interno.',
  },
  Géminis: {
    title: 'Luna en Géminis: La Mente Sentiente',
    subtitle: 'Verbalización de los Afectos y Curiosidad Psíquica',
    summary: 'Para procesar tus emociones necesitas ponerlas en palabras, analizarlas y compartirlas. Tu seguridad afectiva nace de la comunicación y el entendimiento.',
    esotericMeaning: 'Las alas del alma que exploran múltiples paisajes emocionales antes de posarse.',
    counsel: 'No intelectualices tus dolores para evitar sentirlos en el cuerpo. Deja que el corazón hable sin la mediación del análisis lógico.',
  },
  Cáncer: {
    title: 'Luna en Cáncer: El Océano Primordial',
    subtitle: 'Sensibilidad Suprema, Intuición y Raíz Ancestral',
    summary: 'La Luna en su propio domicilio. Posees una receptividad psíquica que siente los cambios de marea del entorno con exactitud de brújula.',
    esotericMeaning: 'El arquetipo de la Madre Cósmica, depositaria de la sabiduría afectiva de generaciones.',
    counsel: 'Aprende a despojarte de caparazones defensivos. Tu mayor protección es tu propia autenticidad y el autocuidado consciente.',
  },
  Leo: {
    title: 'Luna en Leo: El Corazón Noble',
    subtitle: 'Generosidad Emocional y Deseo de Ser Celebrado',
    summary: 'Amas con dramatismo regio, lealtad incondicional y orgullo de protector. Necesitas sentir que tus afectos son valorados y admirados.',
    esotericMeaning: 'El niño divino que ilumina el hogar interior con creatividad y ternura majestuosa.',
    counsel: 'No dependas de la validación externa para sentirte digno de amor. Coronar tu propio corazón es el primer acto de soberanía.',
  },
  Virgo: {
    title: 'Luna en Virgo: El Cuidado Devoto',
    subtitle: 'Amor Demostrado a través del Servicio y la Utilidad',
    summary: 'Demuestras tu afecto resolviendo problemas concretos, cuidando la salud y procurando que todo funcione con armonía impecable.',
    esotericMeaning: 'La sacerdotisa del templo cotidiano que encuentra santidad en la sencillez del servicio.',
    counsel: 'Trata a tus propias debilidades con la misma ternura que ofreces a los demás. La auto-crítica no es sinónimo de evolución.',
  },
  Libra: {
    title: 'Luna en Libra: La Gracia Relacional',
    subtitle: 'Búsqueda de Paz, Diplomacia y Vínculos Espejo',
    summary: 'Tu bienestar anímico depende de un entorno estético, pacífico y de relaciones donde reine la reciprocidad justa y respetuosa.',
    esotericMeaning: 'El arte de la comunión de almas a través del respeto reverente y la elegancia del trato.',
    counsel: 'Atrévete a manifestar tu disconformidad cuando algo rompa tu verdad interior. La armonía ficticia solo alimenta resentimientos mudos.',
  },
  Escorpio: {
    title: 'Luna en Escorpio: La Alquimia Afectiva',
    subtitle: 'Intensidad Oculta, Fusión Total y Transformación',
    summary: 'Vives las emociones al borde del abismo y con una entrega sin tibiezas. Posees un radar infalible para detectar la mentira y lo oculto.',
    esotericMeaning: 'La caída de la Luna que obliga al alma a convertirse en su propia fuente inagotable de regeneración mística.',
    counsel: 'Aprende el arte de soltar y confiar. La vulnerabilidad honesta es el escudo más impenetrable que jamás podrás vestir.',
  },
  Sagitario: {
    title: 'Luna en Sagitario: El Alma Libre',
    subtitle: 'Optimismo Vital, Ansia de Aventura y Búsqueda de Verdad',
    summary: 'Tus emociones se expanden con los viajes, el estudio profundo y la libertad sin ataduras. Necesitas que tus vínculos compartan tu visión de futuro.',
    esotericMeaning: 'El buscador nómada que encuentra su hogar en cualquier rincón del universo que le inspire asombro.',
    counsel: 'No huyas de las situaciones complejas refugiándote en dogmas o promesas lejanas. La verdad también se encuentra en lo inmediato.',
  },
  Capricornio: {
    title: 'Luna en Capricornio: La Fortaleza Íntima',
    subtitle: 'Contención Madura, Resiliencia y Autosuficiencia',
    summary: 'Desde temprana edad aprendiste a sostenerte por ti mismo. Expresas el amor a través de la responsabilidad, la fidelidad y la presencia sólida.',
    esotericMeaning: 'El cristal que se pule bajo la presión del tiempo hasta convertirse en diamante de sabiduría.',
    counsel: 'Permítete pedir ayuda y mostrarte vulnerable. Quienes te aman de verdad anhelan abrazar a la persona frágil, no solo a la fortaleza de piedra.',
  },
  Acuario: {
    title: 'Luna en Acuario: El Vínculo Espacial',
    subtitle: 'Amistad Universal, Desapego Sabio y Originalidad',
    summary: 'Procesas tus sentimientos desde una perspectiva panorámica y comprensiva. Amas sin asfixiar y valoras por encima de todo la autenticidad.',
    esotericMeaning: 'La consciencia planetaria que trasciende los apegos posesivos para fundar lazos fraternos.',
    counsel: 'No te refugies en la frialdad cuando las emociones se vuelvan caóticas. Habitar el cuerpo y la pasión es parte de la experiencia humana.',
  },
  Piscis: {
    title: 'Luna en Piscis: El Océano de la Compasión',
    subtitle: 'Empatía Mística, Porosidad Psíquica y Conexión Espiritual',
    summary: 'Sientes los dolores y alegrías de todo lo que te rodea. Tu mundo emocional es rico en imágenes, sueños proféticos y poesía trascendental.',
    esotericMeaning: 'El regreso a las aguas matrices de la creación donde todo es Uno y no existe separación.',
    counsel: 'Aprende a limpiar energéticamente tu campo áurico con frecuencia. Necesitas soledad sagrada para discernir qué sientes tú y qué absorbiste de otros.',
  },
};

export const ASCENDANT_INTERPRETATIONS: Record<ZodiacSignName, InterpretationBlock> = {
  Aries: {
    title: 'Ascendente Aries: La Puerta del Guerrero',
    subtitle: 'La Máscara del Iniciador y el Liderazgo Frontal',
    summary: 'El mundo te percibe como una fuerza dinámica, directa y valiente. Tu presencia imprime ritmo y acción en cualquier espacio que pisas.',
    esotericMeaning: 'Tu propósito evolutivo es aprender a manifestar el coraje individual sin atropellar a los demás.',
    counsel: 'Usa tu espada para abrir senderos de luz, no para combatir molinos de viento.',
  },
  Tauro: {
    title: 'Ascendente Tauro: La Presencia Telúrica',
    subtitle: 'La Calma Magnética y el Porte de Serenidad',
    summary: 'Proyectas una sensación inmediata de solidez, buen gusto y calma inmutable. La gente se siente reconfortada y segura a tu lado.',
    esotericMeaning: 'Tu misión es anclar el espíritu en la materia y enseñar el valor de la constancia sabia.',
    counsel: 'No te resistas a las necesarias renovaciones que la vida te presenta.',
  },
  Géminis: {
    title: 'Ascendente Géminis: La Mirada Despierta',
    subtitle: 'El Ingenio Ágil y la Eterna Juventud',
    summary: 'Entras a los lugares con ligereza, simpatía y una curiosidad chispeante. Tus ojos transmiten avidez por comprenderlo todo.',
    esotericMeaning: 'Tu sendero es ser el mensajero de ideas que despiertan y conectan voluntades.',
    counsel: 'Alinea tu palabra con tu corazón para que tu mensaje tenga peso y trascendencia.',
  },
  Cáncer: {
    title: 'Ascendente Cáncer: El Aura Protectora',
    subtitle: 'La Mirada Empática y el Refugio Acogedor',
    summary: 'Tu energía emana dulzura, contención y un toque de misterio reservado. La gente percibe en ti una figura maternal o un confidente sagrado.',
    esotericMeaning: 'Has venido a sanar linajes familiares y a crear espacios de comunión afectiva real.',
    counsel: 'Aprende a poner límites amorosos pero firmes para preservar tu paz íntima.',
  },
  Leo: {
    title: 'Ascendente Leo: El Porte Majestuoso',
    subtitle: 'El Magnetismo Natural y la Calidez Luminosa',
    summary: 'Es imposible que pases desapercibido. Tu forma de vestir, moverte y expresarte posee una distinción regia que atrae las miradas.',
    esotericMeaning: 'Tu tarea del alma es ser faro de inspiración y generosidad creadora para tu comunidad.',
    counsel: 'Recuerda que la verdadera grandeza se mide por cuántas personas logras empoderar a tu paso.',
  },
  Virgo: {
    title: 'Ascendente Virgo: La Mirada Lúcida',
    subtitle: 'La Pulcritud Elegante y el Criterio Agudo',
    summary: 'Transmites orden, modestia inteligente y una capacidad inmediata para resolver cualquier caos práctico con precisión quirúrgica.',
    esotericMeaning: 'Tu destino es refinar el mundo material para convertirlo en reflejo del orden divino.',
    counsel: 'Acepta que la gracia muchas veces florece en medio del desorden.',
  },
  Libra: {
    title: 'Ascendente Libra: El Espejo de la Armonía',
    subtitle: 'La Elegancia Innata y el Don de Gentes',
    summary: 'Tu presencia destila encanto, diplomacia y proporción estética. Tienes la habilidad innata de hacer que cada persona se sienta escuchada y bella.',
    esotericMeaning: 'Tu reto evolutivo es encarnar la justicia y la complementariedad sin perder tu propia identidad.',
    counsel: 'Toma partido por tu propia verdad, aun cuando eso genere olas momentáneas.',
  },
  Escorpio: {
    title: 'Ascendente Escorpio: El Ojo de la Esfinge',
    subtitle: 'La Mirada Penetrante y el Misterio Magnético',
    summary: 'Posees un aura enigmática e intensa que desata fascinación o respeto reverencial. Tienes la facultad de ver más allá de las máscaras sociales.',
    esotericMeaning: 'Eres un catalizador de transformación: tu sola presencia precipita crisis que purifican y despiertan.',
    counsel: 'Usa tu poder psicológico para sanar y liberar, nunca para manipular o castigar.',
  },
  Sagitario: {
    title: 'Ascendente Sagitario: La Sonrisa del Buscador',
    subtitle: 'El Espíritu Libre y el Entusiasmo Contagioso',
    summary: 'Irradias optimismo, franqueza y un espíritu aventurero que invita a soñar en grande. La gente siente que contigo el mundo se expande.',
    esotericMeaning: 'Tu camino es mostrar que la vida es una peregrinación sagrada colmada de gracia y sentido.',
    counsel: 'Acompaña tus grandes visiones con la disciplina indispensable para materializarlas.',
  },
  Capricornio: {
    title: 'Ascendente Capricornio: La Autoridad Silenciosa',
    subtitle: 'La Madurez Sobria y el Respeto Incondicional',
    summary: 'Pareces mayor de lo que eres en tu juventud y rejuveneces con los años. Transmites solvencia, confiabilidad y determinación inquebrantable.',
    esotericMeaning: 'Tu aprendizaje es construir legados que perduren a la prueba del tiempo.',
    counsel: 'Aprende a sonreír y a desarmar la coraza de seriedad cuando estés entre amigos.',
  },
  Acuario: {
    title: 'Ascendente Acuario: La Chispa Singular',
    subtitle: 'La Mirada Extraterrestre y la Autenticidad Radical',
    summary: 'Te distingues de inmediato por tu estilo singular, tus ideas disruptivas y tu negativa a encajar en moldes convencionales.',
    esotericMeaning: 'Eres una antena del futuro anclada en el presente para romper ataduras anacrónicas.',
    counsel: 'Recuerda que para transformar un sistema primero debes amarlo y comprenderlo.',
  },
  Piscis: {
    title: 'Ascendente Piscis: El Aura de Niebla Mística',
    subtitle: 'La Mirada Soñadora y la Gracia Sutil',
    summary: 'Tu presencia tiene algo etéreo e inasible. Pareces deslizarte entre planos con una dulzura y compasión que desarma cualquier hostilidad.',
    esotericMeaning: 'Has venido a recordar al mundo la existencia de lo invisible y la fuerza sanadora de la fe.',
    counsel: 'Construye límites claros para que tu sensibilidad sea un templo y no una plaza abierta.',
  },
};

// INTERPRETACIONES DE MERCURIO (LA MENTE Y LA PALABRA)
export const MERCURY_INTERPRETATIONS: Record<ZodiacSignName, { title: string; mentalProcess: string; communicationStyle: string }> = {
  Aries: {
    title: 'Mercurio en Aries: El Pensamiento Incisivo',
    mentalProcess: 'Pensamiento rápido como el rayo, deductivo y orientado a la acción inmediata. Aprendes resolviendo problemas sobre la marcha.',
    communicationStyle: 'Directa, frontal y sin rodeos. Dices la verdad sin anestesia y defiendes tus ideas con pasión bélica.',
  },
  Tauro: {
    title: 'Mercurio en Tauro: La Mente Pragmática',
    mentalProcess: 'Procesamiento lento pero indeleble. Necesitas verificar las ideas en la realidad física antes de aceptarlas como válidas.',
    communicationStyle: 'Pausada, serena, transmitiendo seguridad y sensatez. Tu palabra tiene peso de roca.',
  },
  Géminis: {
    title: 'Mercurio en Géminis: El Intelecto Relampagueante',
    mentalProcess: 'Mercurio en domicilio supremo: agilidad mental extraordinaria, capacidad multitarea y hambre insaciable de datos.',
    communicationStyle: 'Elocuente, ingeniosa, adaptable y chispeante. Eres el narrador y difusor natural.',
  },
  Cáncer: {
    title: 'Mercurio en Cáncer: La Mente Poética e Intuitiva',
    mentalProcess: 'Piensas a través de sensaciones y recuerdos. Tu memoria fotográfica está ligada al tono emocional de lo vivido.',
    communicationStyle: 'Empática, protectora y afectuosa. Sabes escuchar entre líneas y consolar con la voz.',
  },
  Leo: {
    title: 'Mercurio en Leo: La Oratoria Majestuosa',
    mentalProcess: 'Pensamiento creativo, dramático y orientado a la gran imagen. Concibes ideas como proyectos artísticos o gestas nobles.',
    communicationStyle: 'Carismática, persuasiva y teatral. Hablas desde el corazón y con convicción de líder.',
  },
  Virgo: {
    title: 'Mercurio en Virgo: El Discernimiento Quirúrgico',
    mentalProcess: 'Mercurio en exaltación y domicilio: análisis impecable, categorización precisa y detección instantánea de inconsistencias.',
    communicationStyle: 'Clara, detallada, metódica y orientada a la utilidad práctica y el servicio.',
  },
  Libra: {
    title: 'Mercurio en Libra: El Pensamiento Diplomático',
    mentalProcess: 'Sopesas todos los puntos de vista antes de emitir juicio. Capacidad innata para comprender la perspectiva del interlocutor.',
    communicationStyle: 'Elegante, conciliadora, cortés y persuasiva a través de la armonía y la justicia.',
  },
  Escorpio: {
    title: 'Mercurio en Escorpio: La Mente Psicoanalítica',
    mentalProcess: 'Investigador nato: nada escapa a tu radar psicológico. Quieres saber el porqué oculto detrás de cada conducta humana.',
    communicationStyle: 'Penetrante, reservada, magnética y capaz de pronunciar verdades que transforman o sacuden.',
  },
  Sagitario: {
    title: 'Mercurio en Sagitario: La Mente Filosófica',
    mentalProcess: 'Pensamiento abstracto, profético y expansivo. Te interesan las grandes leyes de la vida, la teología y la filosofía.',
    communicationStyle: 'Entusiasta, franca, inspiradora y a veces carente de filtros en pos de la verdad.',
  },
  Capricornio: {
    title: 'Mercurio en Capricornio: El Intelecto Estratégico',
    mentalProcess: 'Pensamiento sobrio, estructurado y de largo plazo. Desprecias la verborrea y buscas la eficiencia de resultados.',
    communicationStyle: 'Seria, concisa, autorizada y prudente. Tu palabra es un compromiso inquebrantable.',
  },
  Acuario: {
    title: 'Mercurio en Acuario: El Genio Visionario',
    mentalProcess: 'Pensamiento lateral, disruptivo y adelantado a su época. Recibes chispazos de lucidez e inventiva casi telepática.',
    communicationStyle: 'Original, desapegada, conceptual y orientada a despertar la consciencia colectiva.',
  },
  Piscis: {
    title: 'Mercurio en Piscis: La Mente Holística y Telepática',
    mentalProcess: 'Pensamiento no lineal guiado por símbolos, arquetipos y sueños. Captas la totalidad antes que los fragmentos.',
    communicationStyle: 'Poética, compasiva, metafórica y capaz de conectar con lo inefable del alma.',
  },
};

// INTERPRETACIONES DE VENUS (EL AMOR Y EL GOZO)
export const VENUS_INTERPRETATIONS: Record<ZodiacSignName, { title: string; loveLanguage: string; aestheticSense: string }> = {
  Aries: {
    title: 'Venus en Aries: La Pasión Conquistadora',
    loveLanguage: 'Amas con fuego e ímpetu. Te seduce la iniciativa, el desafío y la pasión frontal sin rodeos.',
    aestheticSense: 'Estilo audaz, enérgico, de contrastes vivos y belleza rebelde.',
  },
  Tauro: {
    title: 'Venus en Tauro: El Deleite de los Sentidos',
    loveLanguage: 'Venus en domicilio: amor físico, caricias lentas, estabilidad afectiva y lealtad a prueba de tormentas.',
    aestheticSense: 'Gusto exquisito por la naturaleza, texturas nobles, confort y armonía orgánica.',
  },
  Géminis: {
    title: 'Venus en Géminis: La Seducción Mental',
    loveLanguage: 'Te enamoras del cerebro del otro. Necesitas conversación brillante, complicidad, risas y libertad de movimiento.',
    aestheticSense: 'Estilo ecléctico, ligero, juvenil y lleno de detalles curiosos.',
  },
  Cáncer: {
    title: 'Venus en Cáncer: El Nido Sagrado',
    loveLanguage: 'Afecto tierno, nutricio y de profunda devoción. Amas creando un hogar cálido y protegiendo a los tuyos.',
    aestheticSense: 'Atracción por lo vintage, los recuerdos sentimentales y la belleza íntima.',
  },
  Leo: {
    title: 'Venus en Leo: El Amor Regio',
    loveLanguage: 'Amas a lo grande: regalos majestuosos, lealtad de león y orgullo en pareja. Necesitas admirar a quien amas.',
    aestheticSense: 'Elegancia dorada, dramatismo radiante, lujo bien entendido y presencia deslumbrante.',
  },
  Virgo: {
    title: 'Venus en Virgo: La Devoción Discreta',
    loveLanguage: 'Expresas el amor a través del cuidado de la salud, el orden y la ayuda práctica cotidiana.',
    aestheticSense: 'Minimalismo pulcro, líneas puras, telas naturales y armonía sin ostentación.',
  },
  Libra: {
    title: 'Venus en Libra: La Gracia de la Armonía',
    loveLanguage: 'Venus en domicilio: romance clásico, diplomacia, cortesía exquisita y búsqueda del equilibrio de pareja.',
    aestheticSense: 'Ojo clínico para el arte, el diseño, la simetría y la alta elegancia.',
  },
  Escorpio: {
    title: 'Venus en Escorpio: La Fusión de Almas',
    loveLanguage: 'Amor visceral y transformador. No buscas relaciones tibias sino una comunión total donde nada quede oculto.',
    aestheticSense: 'Estilo magnético, misterioso, tonos oscuros y belleza hipnótica.',
  },
  Sagitario: {
    title: 'Venus en Sagitario: El Amor Aventurero',
    loveLanguage: 'Amas a través de la aventura, los viajes y la libertad compartida. Tu pareja debe ser tu cómplice de horizontes.',
    aestheticSense: 'Estilo bohemio, internacional, étnico y desinhibido.',
  },
  Capricornio: {
    title: 'Venus en Capricornio: El Pacto Inmortal',
    loveLanguage: 'Afecto sobrio pero indestructible. Tu amor se demuestra en la presencia leal, el respeto y la construcción a largo plazo.',
    aestheticSense: 'Clasicismo atemporal, calidad artesanal y sobriedad de alta alcurnia.',
  },
  Acuario: {
    title: 'Venus en Acuario: La Hermandad Cósmica',
    loveLanguage: 'Amor libre y sin moldes posesivos. Tu pareja debe ser antes que nada tu mejor amigo y camarada de causas.',
    aestheticSense: 'Vanguardista, futurista, andrógino y fuera de las modas convencionales.',
  },
  Piscis: {
    title: 'Venus en Piscis: El Éxtasis del Amor Sagrado',
    loveLanguage: 'Venus en exaltación suprema: amor incondicional, místico y devoto que ve lo divino en los ojos del amado.',
    aestheticSense: 'Belleza etérea, poética, acuática, de transparencias y magia sutil.',
  },
};

// INTERPRETACIONES DE MARTE (LA VOLUNTAD Y EL CORAJE)
export const MARTE_INTERPRETATIONS: Record<ZodiacSignName, { title: string; drive: string; conflictResolution: string }> = {
  Aries: {
    title: 'Marte en Aries: La Carga del Guerrero',
    drive: 'Marte en domicilio: energía volcánica, coraje puro y liderazgo pionero. Vas directo a por tus metas sin vacilar.',
    conflictResolution: 'Combate frontal y fulminante; no guardas rencor tras descargar la tormenta.',
  },
  Tauro: {
    title: 'Marte en Tauro: La Fuerza de la Tierra',
    drive: 'Resistencia sobrehumana. Una vez fijado un objetivo, no hay fuerza sobre la faz de la tierra que te haga retroceder.',
    conflictResolution: 'Paciencia infinita hasta que se colma el vaso; entonces tu ira es una fuerza telúrica imparable.',
  },
  Géminis: {
    title: 'Marte en Géminis: La Espada de la Inteligencia',
    drive: 'Tu energía se canaliza a través de las ideas, el debate y la estrategia táctica. Eres veloz y multifacético.',
    conflictResolution: 'Ironía afilada, elocuencia aplastante y agilidad dialéctica.',
  },
  Cáncer: {
    title: 'Marte en Cáncer: El Protector Feroz',
    drive: 'Tu motivación es emocional: actúas movido por el deseo de salvaguardar a tus afectos y tu santuario.',
    conflictResolution: 'Estrategia defensiva indirecta; puedes retirarte a tu concha o atacar con tenacidad implacable si tocan lo tuyo.',
  },
  Leo: {
    title: 'Marte en Leo: El Campeón del Honor',
    drive: 'Actúas con dignidad regia y grandeza de espíritu. Buscas el triunfo noble y dejas huella en todo lo que emprendes.',
    conflictResolution: 'Orgullo inquebrantable; prefieres una salida digna antes que una victoria mezquina.',
  },
  Virgo: {
    title: 'Marte en Virgo: La Precisión Quirúrgica',
    drive: 'Tu fuerza radica en la técnica impecable, la eficiencia y el método. No gastas ni un gramo de energía en vano.',
    conflictResolution: 'Desmontas los argumentos del adversario con frialdad analítica e inapelable.',
  },
  Libra: {
    title: 'Marte en Libra: El Estratega de la Justicia',
    drive: 'Tu acción se despierta ante la injusticia. Sabes usar la mediación y las alianzas estratégicas para vencer.',
    conflictResolution: 'Buscas el acuerdo ecuánime pero defiendes los principios éticos con firmeza educada.',
  },
  Escorpio: {
    title: 'Marte en Escorpio: El Poder del Iniciado',
    drive: 'Marte en domicilio tradicional: determinación férrea, autocontrol absoluto y capacidad de regeneración total.',
    conflictResolution: 'Estrategia silenciosa y paciente; esperas el momento idóneo para actuar de forma definitiva.',
  },
  Sagitario: {
    title: 'Marte en Sagitario: La Flecha del Entusiasmo',
    drive: 'Fuerza expansiva guiada por ideales elevados. Luchas por la verdad, la libertad y la justicia con fe desbordante.',
    conflictResolution: 'Franqueza aplastante; defiendes tus ideales éticos con vigor y pasión.',
  },
  Capricornio: {
    title: 'Marte en Capricornio: El General Implacable',
    drive: 'Marte en exaltación suprema: disciplina de hierro, ambición templada por el tiempo y ejecución perfecta.',
    conflictResolution: 'Frialdad pragmática; vences por desgaste, resistencia y superioridad estratégica.',
  },
  Acuario: {
    title: 'Marte en Acuario: El Rebelde con Causa',
    drive: 'Luchas por la innovación, las libertades colectivas y el progreso. Tu método es romper paradigmas anquilosados.',
    conflictResolution: 'Desapego implacable; combates las estructuras injustas con originalidad y trabajo de red.',
  },
  Piscis: {
    title: 'Marte en Piscis: El Guerrero Espiritual',
    drive: 'Tu fuerza es sutil y fluye como el agua. Actúas guiado por la intuición, la devoción mística y la compasión.',
    conflictResolution: 'Disolución del conflicto mediante la comprensión empática o la retirada estratégica sabia.',
  },
};

// INTERPRETACIONES DE NODOS, QUIRÓN Y LILITH
export const KARMIC_INTERPRETATIONS = {
  northNode: (sign: ZodiacSignName): { title: string; mission: string; pastComfort: string } => {
    const data: Record<ZodiacSignName, { mission: string; pastComfort: string }> = {
      Aries: {
        mission: 'Aprender la sana individualidad, el coraje de abrir camino y confiar en tu propia fuerza sin depender de la aprobación ajena.',
        pastComfort: 'La tendencia a complacer en exceso a otros (Nodo Sur en Libra) perdiendo tu identidad.',
      },
      Tauro: {
        mission: 'Aprender a habitar la paz, valorar tu propio cuerpo, enraizarte en la abundancia material y generar estabilidad.',
        pastComfort: 'El apego al drama emocional, crisis constantes o guerras de poder (Nodo Sur en Escorpio).',
      },
      Géminis: {
        mission: 'Aprender la escucha atenta, la curiosidad humilde, el intercambio de ideas cotidiano y la adaptabilidad.',
        pastComfort: 'El apego a dogmas morales rígidos o verdades absolutas (Nodo Sur en Sagitario).',
      },
      Cáncer: {
        mission: 'Aprender a honrar tu mundo emocional íntimo, nutrir a los tuyos y permitirte la vulnerabilidad.',
        pastComfort: 'La rigidez del éxito profesional frío y la obsesión por el control (Nodo Sur en Capricornio).',
      },
      Leo: {
        mission: 'Aprender a brillar en el centro de tu vida, irradiar tu creatividad única y reclamar tu soberanía personal.',
        pastComfort: 'Refugiarte en el anonimato de grupos o diluirte en causas ajenas (Nodo Sur en Acuario).',
      },
      Virgo: {
        mission: 'Aprender el orden práctico, el discernimiento cotidiano y la devoción en los pequeños actos tangibles.',
        pastComfort: 'La desconexión etérea, el victimismo o la evasión de la realidad física (Nodo Sur en Piscis).',
      },
      Libra: {
        mission: 'Aprender el arte de la cooperación mutua, la diplomacia y el compromiso de caminar en pareja.',
        pastComfort: 'El individualismo solitario o el egoísmo defensivo (Nodo Sur en Aries).',
      },
      Escorpio: {
        mission: 'Aprender la transmutación psicológica profunda, soltar apegos materiales y entregarte a la regeneración.',
        pastComfort: 'La complacencia en zonas de confort rutinarias y el miedo al cambio (Nodo Sur en Tauro).',
      },
      Sagitario: {
        mission: 'Aprender a tener fe en un propósito superior, expandir tu visión del mundo y cultivar la sabiduría filosófica.',
        pastComfort: 'La dispersión en chismes, datos superficiales o indecisión crónica (Nodo Sur en Géminis).',
      },
      Capricornio: {
        mission: 'Aprender la madurez, la autosuficiencia, la construcción de metas duraderas y la autoridad interna.',
        pastComfort: 'La dependencia infantil o el refugio temeroso en el nido protector (Nodo Sur en Cáncer).',
      },
      Acuario: {
        mission: 'Aprender a poner tus talentos al servicio de la comunidad, cultivar la visión colectiva y la libertad.',
        pastComfort: 'La necesidad constante de atención exclusiva y drama de ego personal (Nodo Sur en Leo).',
      },
      Piscis: {
        mission: 'Aprender la rendición confiada al universo, la compasión infinita y la conexión con lo invisible.',
        pastComfort: 'La obsesión por el control meticuloso, la ansiedad y la hiper-crítica (Nodo Sur en Virgo).',
      },
    };
    return {
      title: `Nodo Norte en ${sign}: La Misión Evolutiva del Alma`,
      ...data[sign],
    };
  },

  chiron: (sign: ZodiacSignName): { title: string; wound: string; medicine: string } => {
    const data: Record<ZodiacSignName, { wound: string; medicine: string }> = {
      Aries: {
        wound: 'Herida en el derecho básico a existir, a afirmar el "Yo Soy" o a sentirte suficiente.',
        medicine: 'Don de despertar el coraje heroico en otros y ser pionero de la auto-sanación.',
      },
      Tauro: {
        wound: 'Sensación de escasez interna, miedo a no valer o no poseer lo suficiente para estar seguro.',
        medicine: 'Capacidad de conectar a otros con la abundancia de la tierra y enseñar el valor sagrado del cuerpo.',
      },
      Géminis: {
        wound: 'Sentimiento de no ser comprendido, escuchado o considerado inteligente.',
        medicine: 'Don de la palabra sanadora, el puente comunicativo y la pedagogía empática.',
      },
      Cáncer: {
        wound: 'Herida de orfandad emocional, desarraigo o falta de nutrición afectiva en la infancia.',
        medicine: 'Capacidad suprema para crear refugios emocionales y sanar heridas del linaje materno.',
      },
      Leo: {
        wound: 'Sentimiento de que tu creatividad o brillo natural fue apagado o ridiculizado.',
        medicine: 'Don de encender la chispa divina y la confianza creadora en el corazón de los demás.',
      },
      Virgo: {
        wound: 'Obsesión con la imperfección, sensación de estar "roto" o no ser lo bastante limpio/útil.',
        medicine: 'El arte de la medicina holística, la alquimia corporal y la compasión con el error humano.',
      },
      Libra: {
        wound: 'Herida en los vínculos: vivencia de relaciones dolorosas o fracturas en la armonía.',
        medicine: 'Don de pacificador supremo, mediador de almas y maestro del amor consciente.',
      },
      Escorpio: {
        wound: 'Encuentro temprano con la pérdida, la traición, el abuso de poder o la muerte.',
        medicine: 'Chamán de las profundidades: don para acompañar a otros a través del inframundo y el renacimiento.',
      },
      Sagitario: {
        wound: 'Crisis de fe, desilusión con dogmas espirituales o pérdida del sentido de la vida.',
        medicine: 'Farero espiritual capaz de devolver la esperanza y la conexión con la verdad universal.',
      },
      Capricornio: {
        wound: 'Sensación de una carga de responsabilidad prematura y falta de reconocimiento social.',
        medicine: 'Maestro de la resiliencia ética, guía para construir legados con autenticidad.',
      },
      Acuario: {
        wound: 'Sentimiento de ser un paria cósmico, inadaptado o rechazado por la sociedad.',
        medicine: 'Sanador de la conciencia de grupo, pionero de nuevas comunidades inclusivas.',
      },
      Piscis: {
        wound: 'Sensación de dolor existencial, desilusión con la densidad del mundo terrenal.',
        medicine: 'Canal de compasión cósmica, arte visionario y sanación mística trascendental.',
      },
    };
    return {
      title: `Quirón en ${sign}: La Herida Sagrada y el Don Sanador`,
      ...data[sign],
    };
  },

  lilith: (sign: ZodiacSignName): { title: string; wildPower: string; shadowToTransmute: string } => {
    const data: Record<ZodiacSignName, { wildPower: string; shadowToTransmute: string }> = {
      Aries: {
        wildPower: 'Furia indomable y autonomía sexual y personal radical que no acepta el sometimiento.',
        shadowToTransmute: 'La rabia destructiva o la necesidad de provocar batallas innecesarias.',
      },
      Tauro: {
        wildPower: 'Soberanía del placer carnal y desprecio por las normas moralistas sobre el gozo y el dinero.',
        shadowToTransmute: 'La voracidad material o el apego visceral como defensa contra la pérdida.',
      },
      Géminis: {
        wildPower: 'Palabra subversiva y rebelde; capacidad de desafiar cualquier tabú intelectual.',
        shadowToTransmute: 'El uso del cinismo o la manipulación verbal como escudo.',
      },
      Cáncer: {
        wildPower: 'Instinto maternal salvaje que protege a su manada sin acatar los mandatos del patriarcado.',
        shadowToTransmute: 'El chantaje emocional o el resentimiento por sacrificios no reconocidos.',
      },
      Leo: {
        wildPower: 'Soberanía escénica deslumbrante que rehúsa ser domesticada para complacer a reyes ajenos.',
        shadowToTransmute: 'El orgullo herido y el desprecio hacia quienes no se postran ante tu luz.',
      },
      Virgo: {
        wildPower: 'Sabiduría de la bruja herbolaria y del conocimiento del cuerpo al margen de la norma oficial.',
        shadowToTransmute: 'El desprecio por la vulnerabilidad o la frialdad implacable hacia el error ajeno.',
      },
      Libra: {
        wildPower: 'Seducción hipnótica y ruptura con los matrimonios por conveniencia o sumisión.',
        shadowToTransmute: 'El juego de poder en la seducción para no entregarte nunca de verdad.',
      },
      Escorpio: {
        wildPower: 'Lilith en su trono de sombra: magnetismo sexual y psíquico absoluto, contacto con el misterio.',
        shadowToTransmute: 'La venganza rencorosa o el deseo de destruir lo que no puedes controlar.',
      },
      Sagitario: {
        wildPower: 'Búsqueda herética de la verdad que desenmascara la hipocresía de falsos profetas y dogmas.',
        shadowToTransmute: 'El fanatismo de la rebeldía o la huida crónica de todo compromiso.',
      },
      Capricornio: {
        wildPower: 'Ambición gélida y capacidad de derrocar a las autoridades patriarcales y corruptas.',
        shadowToTransmute: 'La coraza de insensibilidad emocional por miedo a ser dominado.',
      },
      Acuario: {
        wildPower: 'Anarquía sagrada y originalidad extrema que abre las jaulas mentales de la humanidad.',
        shadowToTransmute: 'El aislamiento arrogante sintiéndote superior a la masa dormida.',
      },
      Piscis: {
        wildPower: 'Misticismo extático y contacto directo con las corrientes ocultas del éter.',
        shadowToTransmute: 'La adicción al caos, el papel de mártir o la autodestrucción por hipersensibilidad.',
      },
    };
    return {
      title: `Lilith en ${sign}: La Sombra Sagrada y la Fuerza Indómita`,
      ...data[sign],
    };
  },
};

export function generateNatalReport(chart: NatalChartData): {
  bigThree: {
    sun: InterpretationBlock;
    moon: InterpretationBlock;
    ascendant: InterpretationBlock;
  };
  innerGods: {
    mercury: { title: string; mentalProcess: string; communicationStyle: string; house: number };
    venus: { title: string; loveLanguage: string; aestheticSense: string; house: number };
    mars: { title: string; drive: string; conflictResolution: string; house: number };
  };
  karmicAxes: {
    northNode: { title: string; mission: string; pastComfort: string; house: number };
    chiron: { title: string; wound: string; medicine: string; house: number };
    lilith: { title: string; wildPower: string; shadowToTransmute: string; house: number };
  };
  elementOverview: string;
  modalityOverview: string;
  destinySummary: string;
  topAspects: Array<{
    title: string;
    nature: 'harmonic' | 'tense' | 'neutral' | 'variable';
    description: string;
    orb: number;
  }>;
} {
  const sunPos = chart.positions.find(p => p.body === 'Sol');
  const moonPos = chart.positions.find(p => p.body === 'Luna');
  const mercPos = chart.positions.find(p => p.body === 'Mercurio');
  const venPos = chart.positions.find(p => p.body === 'Venus');
  const marPos = chart.positions.find(p => p.body === 'Marte');
  const nnPos = chart.positions.find(p => p.body === 'Nodo Norte');
  const chirPos = chart.positions.find(p => p.body === 'Quirón');
  const lilPos = chart.positions.find(p => p.body === 'Lilith');

  const sunSign = sunPos ? sunPos.sign : 'Aries';
  const moonSign = moonPos ? moonPos.sign : 'Tauro';
  const ascSign = chart.angles.ascSign;

  const sunInterpretation = SUN_INTERPRETATIONS[sunSign] || SUN_INTERPRETATIONS['Aries'];
  const moonInterpretation = MOON_INTERPRETATIONS[moonSign] || MOON_INTERPRETATIONS['Tauro'];
  const ascInterpretation = ASCENDANT_INTERPRETATIONS[ascSign] || ASCENDANT_INTERPRETATIONS['Aries'];

  // Inner Gods
  const mercSign = mercPos ? mercPos.sign : 'Aries';
  const venSign = venPos ? venPos.sign : 'Tauro';
  const marSign = marPos ? marPos.sign : 'Aries';

  const mercuryInterp = {
    ...MERCURY_INTERPRETATIONS[mercSign],
    house: mercPos ? mercPos.house : 1,
  };
  const venusInterp = {
    ...VENUS_INTERPRETATIONS[venSign],
    house: venPos ? venPos.house : 2,
  };
  const marsInterp = {
    ...MARTE_INTERPRETATIONS[marSign],
    house: marPos ? marPos.house : 1,
  };

  // Karmic points
  const nnSign = nnPos ? nnPos.sign : 'Aries';
  const chirSign = chirPos ? chirPos.sign : 'Aries';
  const lilSign = lilPos ? lilPos.sign : 'Escorpio';

  const northNodeInterp = {
    ...KARMIC_INTERPRETATIONS.northNode(nnSign),
    house: nnPos ? nnPos.house : 1,
  };
  const chironInterp = {
    ...KARMIC_INTERPRETATIONS.chiron(chirSign),
    house: chirPos ? chirPos.house : 12,
  };
  const lilithInterp = {
    ...KARMIC_INTERPRETATIONS.lilith(lilSign),
    house: lilPos ? lilPos.house : 8,
  };

  // Top Aspects interpretation (Take the 4 tightest aspects with orb < 4°)
  const topAspects = chart.aspects
    .filter(a => a.orb <= 4.5)
    .slice(0, 4)
    .map(a => {
      const typeLabel =
        a.aspectType === 'conjunction'
          ? 'Conjunción'
          : a.aspectType === 'trine'
          ? 'Trígono'
          : a.aspectType === 'sextile'
          ? 'Sextil'
          : a.aspectType === 'square'
          ? 'Cuadratura'
          : a.aspectType === 'opposition'
          ? 'Oposición'
          : 'Quincuncio';

      let desc = '';
      if (a.nature === 'harmonic') {
        desc = `Flujo armónico y de gracia natural entre las facultades de **${a.body1}** y **${a.body2}**. Representa un don innato que puedes poner en marcha con facilidad.`;
      } else if (a.nature === 'tense') {
        desc = `Tensión dinámica y catalizadora de crecimiento entre **${a.body1}** y **${a.body2}**. Te impulsa a superar bloqueos para alcanzar una maestría superior en tu vida.`;
      } else {
        desc = `Poderosa fusión de principios arquetípicos donde **${a.body1}** y **${a.body2}** operan como una sola fuerza indivisible.`;
      }

      return {
        title: `${a.body1} en ${typeLabel} a ${a.body2}`,
        nature: a.nature,
        description: desc,
        orb: a.orb,
      };
    });

  // Synthesis of elements
  const el = chart.elementBalance;
  let elementOverview = '';
  if (el.dominantElement === 'Fuego') {
    elementOverview = `Tu carta está impregnada por la llama del **Fuego** (${el.fuego} pts). Te mueve el entusiasmo, la fe en tus proyectos y la necesidad indómita de actuar y crear.`;
  } else if (el.dominantElement === 'Tierra') {
    elementOverview = `Tu carta está anclada en el elemento **Tierra** (${el.tierra} pts). Eres un estratega pragmático, capaz de materializar ideas abstractas en realidades tangibles y duraderas.`;
  } else if (el.dominantElement === 'Aire') {
    elementOverview = `Tu carta está gobernada por el elemento **Aire** (${el.aire} pts). Tu mayor don es la lucidez mental, la comunicación elocuente y la capacidad de conectar personas e ideas.`;
  } else {
    elementOverview = `Tu carta nada en las profundidades del **Agua** (${el.agua} pts). Posees una empatía sobrehumana, intuición certera y un contacto directo con el misterio del alma.`;
  }

  // Synthesis of modalities
  const mod = chart.modalityBalance;
  let modalityOverview = '';
  if (mod.dominantModality === 'Cardinal') {
    modalityOverview = `Tu modalidad primordial es **Cardinal** (${mod.cardinal} pts): tienes la madera de los pioneros, naciste para liderar, iniciar ciclos y encender la mecha de los acontecimientos.`;
  } else if (mod.dominantModality === 'Fijo') {
    modalityOverview = `Tu modalidad primordial es **Fija** (${mod.fijo} pts): eres el guardián de la perseverancia, leal a tus principios y capaz de sostener proyectos cuando todos los demás abandonan.`;
  } else {
    modalityOverview = `Tu modalidad primordial es **Mutable** (${mod.mutable} pts): tu virtud suprema es la adaptabilidad, la flexibilidad camaleónica y el ingenio para encontrar soluciones donde otros ven callejones sin salida.`;
  }

  const destinySummary = `Con tu **Sol en ${sunSign}**, tu energía vital brilla a través de ${SIGN_ESSENCE[sunSign].archetype}. Tu **Luna en ${moonSign}** te pide nutrir tu mundo emocional con ${SIGN_ESSENCE[moonSign].mantra.toLowerCase()}, mientras que tu **Ascendente en ${ascSign}** es la brújula y la máscara sagrada con la que conquistas tu destino en este plano terrenal.`;

  return {
    bigThree: {
      sun: sunInterpretation,
      moon: moonInterpretation,
      ascendant: ascInterpretation,
    },
    innerGods: {
      mercury: mercuryInterp,
      venus: venusInterp,
      mars: marsInterp,
    },
    karmicAxes: {
      northNode: northNodeInterp,
      chiron: chironInterp,
      lilith: lilithInterp,
    },
    elementOverview,
    modalityOverview,
    destinySummary,
    topAspects,
  };
}
