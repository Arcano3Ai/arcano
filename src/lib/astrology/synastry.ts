import { BirthDataInput, CelestialBodyName, SynastryAspect, SynastryReport, SynastryScores } from './types';
import { calculateNatalChart } from './engine';
import { angularDifference } from './aspects';
import { ASPECT_DEFINITIONS } from './constants';

export function calculateCrossAspects(chartA: ReturnType<typeof calculateNatalChart>, chartB: ReturnType<typeof calculateNatalChart>): SynastryAspect[] {
  const crossAspects: SynastryAspect[] = [];
  const aspectKeys = Object.keys(ASPECT_DEFINITIONS) as Array<keyof typeof ASPECT_DEFINITIONS>;

  for (const posA of chartA.positions) {
    for (const posB of chartB.positions) {
      const diff = angularDifference(posA.longitude, posB.longitude);

      for (const key of aspectKeys) {
        const def = ASPECT_DEFINITIONS[key];
        const isLuminary = posA.body === 'Sol' || posA.body === 'Luna' || posB.body === 'Sol' || posB.body === 'Luna';
        const allowedOrb = isLuminary ? def.maxOrb + 1.5 : def.maxOrb;
        const orb = Math.abs(diff - def.angle);

        if (orb <= allowedOrb) {
          crossAspects.push({
            bodyA: posA.body,
            bodyB: posB.body,
            aspectType: def.type,
            angle: def.angle,
            diff: Number(diff.toFixed(2)),
            orb: Number(orb.toFixed(2)),
            nature: def.nature,
          });
          break;
        }
      }
    }
  }

  return crossAspects.sort((a, b) => a.orb - b.orb);
}

export function calculateSynastry(inputA: BirthDataInput, inputB: BirthDataInput): SynastryReport {
  const chartA = calculateNatalChart(inputA);
  const chartB = calculateNatalChart(inputB);
  const crossAspects = calculateCrossAspects(chartA, chartB);

  // Scoring engine (0 to 100)
  let chemistryPts = 50;
  let commsPts = 50;
  let stabilityPts = 50;
  let soulPts = 50;

  const strengths: string[] = [];
  const challenges: string[] = [];

  const sunA = chartA.positions.find(p => p.body === 'Sol');
  const sunB = chartB.positions.find(p => p.body === 'Sol');
  const moonA = chartA.positions.find(p => p.body === 'Luna');
  const moonB = chartB.positions.find(p => p.body === 'Luna');
  const venA = chartA.positions.find(p => p.body === 'Venus');
  const venB = chartB.positions.find(p => p.body === 'Venus');
  const marA = chartA.positions.find(p => p.body === 'Marte');
  const marB = chartB.positions.find(p => p.body === 'Marte');

  // Element affinity between Suns
  const sunElemA = chartA.positions.find(p => p.body === 'Sol')?.sign;
  const sunElemB = chartB.positions.find(p => p.body === 'Sol')?.sign;

  for (const asp of crossAspects) {
    const isHarmonic = asp.nature === 'harmonic' || asp.aspectType === 'conjunction';
    const isTense = asp.nature === 'tense';
    const weight = Math.max(1, 10 - asp.orb * 1.5);

    // Chemistry (Venus - Mars, Sun - Mars, Venus - Pluto)
    if (
      (asp.bodyA === 'Venus' && asp.bodyB === 'Marte') ||
      (asp.bodyA === 'Marte' && asp.bodyB === 'Venus')
    ) {
      if (isHarmonic) {
        chemistryPts += 15 * weight;
        strengths.push(`Atracción magnética irresistible: Venus de ${asp.bodyA === 'Venus' ? chartA.birthData.name : chartB.birthData.name} en armonía con Marte de ${asp.bodyA === 'Venus' ? chartB.birthData.name : chartA.birthData.name}.`);
      } else if (isTense) {
        chemistryPts += 10 * weight; // Passionate friction!
        challenges.push(`Fricción pasional: Choque de deseos o celos en la intimidad.`);
      }
    }

    // Communication (Mercury - Mercury, Mercury - Sun, Mercury - Jupiter)
    if (
      (asp.bodyA === 'Mercurio' && asp.bodyB === 'Mercurio') ||
      (asp.bodyA === 'Mercurio' && asp.bodyB === 'Júpiter') ||
      (asp.bodyA === 'Júpiter' && asp.bodyB === 'Mercurio')
    ) {
      if (isHarmonic) {
        commsPts += 12 * weight;
        strengths.push(`Complicidad intelectual y diálogo fluido: comparten cosmovisiones que enriquecen su entendimiento.`);
      } else if (isTense) {
        commsPts -= 6 * weight;
        challenges.push(`Diferencias de criterio o desacuerdos verbales al interpretar situaciones complejas.`);
      }
    }

    // Stability (Saturn - Sun, Saturn - Moon, Saturn - Venus)
    if (
      (asp.bodyA === 'Saturno' && (asp.bodyB === 'Sol' || asp.bodyB === 'Luna' || asp.bodyB === 'Venus')) ||
      (asp.bodyB === 'Saturno' && (asp.bodyA === 'Sol' || asp.bodyA === 'Luna' || asp.bodyA === 'Venus'))
    ) {
      if (isHarmonic) {
        stabilityPts += 14 * weight;
        strengths.push(`Compromiso sólido como roca: lealtad profunda y madurez para construir proyectos a largo plazo.`);
      } else if (isTense) {
        stabilityPts += 5 * weight;
        challenges.push(`Sensación de exigencia, frialdad emocional o peso de responsabilidades.`);
      }
    }

    // Soul & Karmic Connection (Sun - Moon, Nodes, Chiron)
    if (
      (asp.bodyA === 'Sol' && asp.bodyB === 'Luna') ||
      (asp.bodyA === 'Luna' && asp.bodyB === 'Sol')
    ) {
      if (isHarmonic) {
        soulPts += 16 * weight;
        chemistryPts += 8 * weight;
        strengths.push(`El matrimonio sagrado alquímico: el Sol de uno fecunda espiritualmente a la Luna del otro.`);
      }
    }

    if (
      (asp.bodyA === 'Nodo Norte' || asp.bodyB === 'Nodo Norte') &&
      ['Sol', 'Luna', 'Venus', 'Ascendente'].includes(asp.bodyA === 'Nodo Norte' ? asp.bodyB : asp.bodyA)
    ) {
      soulPts += 18 * weight;
      strengths.push(`Vínculo de vidas pasadas: un encuentro sincrónico destinado a acelerar el despertar evolutivo mutuo.`);
    }
  }

  // Categorized cross aspects
  const conjunctions: SynastryAspect[] = [];
  const harmonics: SynastryAspect[] = [];
  const tensions: SynastryAspect[] = [];

  for (const asp of crossAspects) {
    if (asp.aspectType === 'conjunction') {
      asp.interpretation = `Fusión directa y sinergia indisoluble entre ${asp.bodyA} de ${chartA.birthData.name} y ${asp.bodyB} de ${chartB.birthData.name}. Actúan como un catalizador unificado.`;
      conjunctions.push(asp);
    } else if (asp.nature === 'harmonic') {
      asp.interpretation = `Canal de gracia y entendimiento fluido entre ${asp.bodyA} y ${asp.bodyB}. Representa un talento conjunto y facilidad para resolver desacuerdos.`;
      harmonics.push(asp);
    } else if (asp.nature === 'tense') {
      asp.interpretation = `Polaridad dinámica entre ${asp.bodyA} y ${asp.bodyB}. Requiere consciencia para no proyectar inseguridades, transformando la tensión en evolución.`;
      tensions.push(asp);
    }
  }

  // Normalize scores to [40, 98]
  const clamp = (val: number) => Math.min(98, Math.max(42, Math.round(val)));
  const chemistry = clamp(chemistryPts);
  const communication = clamp(commsPts);
  const stability = clamp(stabilityPts);
  const soulConnection = clamp(soulPts);
  const overall = Math.round((chemistry * 0.3) + (communication * 0.25) + (stability * 0.25) + (soulConnection * 0.2));

  const scores: SynastryScores = {
    overall,
    chemistry,
    communication,
    stability,
    soulConnection,
  };

  // 1. DINÁMICA SOLAR (PROPÓSITO E IDENTIDAD)
  const signA = sunA?.sign || 'Aries';
  const signB = sunB?.sign || 'Leo';
  const elemMap: Record<string, 'Fuego' | 'Tierra' | 'Aire' | 'Agua'> = {
    Aries: 'Fuego', Leo: 'Fuego', Sagitario: 'Fuego',
    Tauro: 'Tierra', Virgo: 'Tierra', Capricornio: 'Tierra',
    Géminis: 'Aire', Libra: 'Aire', Acuario: 'Aire',
    Cáncer: 'Agua', Escorpio: 'Agua', Piscis: 'Agua',
  };
  const elemA = elemMap[signA] || 'Fuego';
  const elemB = elemMap[signB] || 'Fuego';

  let sunVerdict = 'Complementariedad Creativa';
  let sunDesc = `La unión del Sol en ${signA} (${elemA}) de ${chartA.birthData.name} con el Sol en ${signB} (${elemB}) de ${chartB.birthData.name} establece un diálogo entre dos motores vitales distintos pero magnéticos.`;

  if (elemA === elemB) {
    sunVerdict = `Resonancia Elemental Pura (${elemA})`;
    sunDesc = `Al compartir la misma matriz elemental de **${elemA}**, comprenden instintivamente las motivaciones y el ritmo vital del otro. No necesitan justificarse: comparten el mismo combustible vital y visión del mundo.`;
  } else if ((elemA === 'Fuego' && elemB === 'Aire') || (elemA === 'Aire' && elemB === 'Fuego')) {
    sunVerdict = 'Fuego y Viento: Expansión e Inspiración';
    sunDesc = `El Aire aviva la llama del Fuego y el Fuego aporta pasión y coraje al intelecto del Aire. Juntos son imparables en creatividad, proyectos compartidos y aventuras intelectuales.`;
  } else if ((elemA === 'Tierra' && elemB === 'Agua') || (elemA === 'Agua' && elemB === 'Tierra')) {
    sunVerdict = 'Tierra y Agua: Fecundidad y Enraizamiento';
    sunDesc = `La Tierra ofrece un cauce seguro, confiable y tangible a las profundas aguas emocionales, mientras que el Agua nutre y sensibiliza el pragmatismo de la Tierra. Una unión fértil y duradera.`;
  } else {
    sunVerdict = 'Polaridad Evolutiva';
    sunDesc = `La combinación entre **${elemA}** y **${elemB}** desafía a ambos a salir de su zona de confort. La riqueza de este lazo radica en que ninguno puede dar por sentado al otro: cada uno es maestro de lo que al otro le falta integrar.`;
  }

  const sunDynamic = {
    title: 'Danza de los Soles: Identidad y Propósito Vital',
    subtitle: `${signA} (${chartA.birthData.name}) & ${signB} (${chartB.birthData.name})`,
    verdict: sunVerdict,
    description: sunDesc,
  };

  // 2. DINÁMICA LUNAR (MUNDO EMOCIONAL Y APEGO)
  const moonSignA = moonA?.sign || 'Tauro';
  const moonSignB = moonB?.sign || 'Virgo';
  const moonElemA = elemMap[moonSignA] || 'Tierra';
  const moonElemB = elemMap[moonSignB] || 'Tierra';

  let moonVerdict = 'Refugio Emocional en Sintonía';
  let moonDesc = `La Luna en ${moonSignA} de ${chartA.birthData.name} y la Luna en ${moonSignB} de ${chartB.birthData.name} revelan cómo se cuidan, cómo reaccionan ante el dolor y qué atmósfera hogareña necesitan para sentirse en paz.`;

  if (moonElemA === moonElemB) {
    moonVerdict = 'Comunión de Aguas Psíquicas';
    moonDesc = `Ambas almas procesan la intimidad bajo la misma frecuencia de **${moonElemA}**. Existe una empatía tácita donde las palabras sobran para percibir la vulnerabilidad o la necesidad de abrazo del otro.`;
  } else if ((moonElemA === 'Agua' && moonElemB === 'Tierra') || (moonElemA === 'Tierra' && moonElemB === 'Agua')) {
    moonVerdict = 'Nutrición Serena y Estabilidad Afectiva';
    moonDesc = `Un refugio de gran contención mutua: uno aporta la calidez y empatía sanadora, mientras el otro ofrece el suelo firme y la certeza de que ningún temporal destruirá el hogar.`;
  } else {
    moonVerdict = 'Aprendizaje de Lenguajes de Apego';
    moonDesc = `Uno tiende a procesar la emoción desde ${moonElemA} (más reactivo o conceptual) mientras el otro lo hace desde ${moonElemB}. El don de esta unión es aprender a no juzgar la forma en que el otro busca consuelo.`;
  }

  const moonDynamic = {
    title: 'El Santuario Lunar: Intimidad, Afecto y Vulnerabilidad',
    subtitle: `Luna en ${moonSignA} & Luna en ${moonSignB}`,
    verdict: moonVerdict,
    description: moonDesc,
  };

  // 3. QUÍMICA ERÓTICA Y DESEO (VENUS Y MARTE)
  const venSignA = venA?.sign || 'Piscis';
  const marSignB = marB?.sign || 'Escorpio';
  const venSignB = venB?.sign || 'Tauro';
  const marSignA = marA?.sign || 'Cáncer';

  const eroticChemistry = {
    title: 'Alquimia del Deseo: Venus, Marte y Magnetismo Físico',
    subtitle: `Venus en ${venSignA} / Marte en ${marSignA} ✦ Venus en ${venSignB} / Marte en ${marSignB}`,
    verdict: chemistry >= 75 ? 'Magnetismo Magnético Arrollador' : 'Atracción Sutil y Creciente',
    description: `La polaridad erótica entre el arquetipo femenino/receptivo (Venus) y el arquetipo masculino/asertivo (Marte) genera un campo de atracción con un puntaje del **${chemistry}%**. ${
      chemistry >= 75
        ? 'Existe una tensión erótica palpable donde el juego de seducción y la entrega física son intensos y renovadores.'
        : 'La atracción física se sustenta en la complicidad, la ternura y la admiración mutua más que en arrebatos impulsivos.'
    }`,
  };

  // 4. DESTINO KÁRMICO Y COMPROMISO (SATURNO Y NODOS)
  const karmicDestiny = {
    title: 'Ejes Kármicos y Sabiduría del Tiempo (Saturno y Nodos)',
    subtitle: 'El Propósito Evolutivo de este Encuentro',
    verdict: soulConnection >= 70 ? 'Pacto de Almas y Deuda Trascendida' : 'Vínculo de Maduración Presente',
    description: `Con un Lazo Álmico del **${soulConnection}%** y una Estabilidad de **${stability}%**, este encuentro no es fortuito. Los planetas pesados indican que están juntos para consolidar lealtades firmes, sanar patrones de relaciones pasadas y madurar su capacidad de amar con soberanía y sin apegos infantiles.`,
  };

  // 5. ARCANO RELACIONAL (CÁLCULO NUMEROLÓGICO CONJUNTO)
  const numA = (chartA.birthData.day + chartA.birthData.month + chartA.birthData.year) % 22 || 22;
  const numB = (chartB.birthData.day + chartB.birthData.month + chartB.birthData.year) % 22 || 22;
  const pairCardNum = ((numA + numB) % 22) || 22;

  const ARCANA_MAP: Record<number, { name: string; archetype: string; element: string; message: string; counsel: string }> = {
    1: { name: 'El Mago', archetype: 'La Manifestación Conjunta', element: 'Aire', message: 'Tienen todas las herramientas en la mesa para materializar cualquier sueño que imaginen juntos.', counsel: 'Canalicen su energía en proyectos tangibles sin competir por el protagonismo.' },
    2: { name: 'La Sacerdotisa', archetype: 'El Misterio y la Telepatía', element: 'Agua', message: 'Un vínculo impregnado de intuición silenciosa, códigos secretos y complicidad espiritual.', counsel: 'Honren los silencios y no teman hablar de lo invisible que ambos perciben.' },
    3: { name: 'La Emperatriz', archetype: 'La Fecundidad y el Deleite', element: 'Tierra', message: 'La relación es un vergel fértil de placer, abundancia, creación de belleza y calidez hogareña.', counsel: 'Cultiven la gratitud y gocen de los frutos de su amor en el plano terrenal.' },
    4: { name: 'El Emperador', archetype: 'La Estructura y la Protección', element: 'Fuego', message: 'Una alianza sólida como piedra angular, protectora, orientada al orden y la seguridad familiar.', counsel: 'Eviten luchas de poder; ejerzan el liderazgo de forma compartida y generosa.' },
    5: { name: 'El Hierofante', archetype: 'El Pacto Sagrado y los Valores', element: 'Tierra', message: 'Unión bendecida por una ética común, respeto a los ancestros y búsqueda de trascendencia.', counsel: 'Creen sus propios rituales sagrados como pareja más allá de mandatos ajenos.' },
    6: { name: 'Los Enamorados', archetype: 'La Elección del Alma', element: 'Aire', message: 'El arquetipo cumbre del amor consciente: la decisión diaria de elegirse en verdad y libertad.', counsel: 'Que su amor sea un puente hacia su mejor versión, no una cárcel de dependencia.' },
    7: { name: 'El Carro', archetype: 'El Avance Victorioso', element: 'Agua', message: 'Juntos tienen una dirección indomable; superan cualquier obstáculo si coordinan sus fuerzas.', counsel: 'Definan una meta compartida clara para que sus impulsos marchen al unísono.' },
    8: { name: 'La Justicia', archetype: 'El Equilibrio Kármico', element: 'Aire', message: 'Claridad mental, acuerdos transparentes y balance impecable entre dar y recibir.', counsel: 'Mantengan la honestidad total; los secretos o desequilibrios desgastan la confianza.' },
    9: { name: 'El Ermitaño', archetype: 'La Madurez y la Sabiduría', element: 'Tierra', message: 'Una relación profunda que no necesita aprobación social; faro de luz en medio de la niebla.', counsel: 'Respeten la soledad sagrada de cada uno para que el reencuentro sea siempre luminoso.' },
    10: { name: 'La Rueda de la Fortuna', archetype: 'Los Ciclos del Destino', element: 'Fuego', message: 'Encuentro sincrónico orquestado por el cosmos para marcar un antes y un después en sus vidas.', counsel: 'Fluyan con las etapas de la vida juntos; la adaptabilidad es su mayor talismán.' },
    11: { name: 'La Fuerza', archetype: 'La Dulzura que Domina la Pasión', element: 'Fuego', message: 'Amor capaz de amansar las fieras internas con ternura, paciencia y coraje compasivo.', counsel: 'Resuelvan cualquier diferencia con caricias de verdad y no con imposición o soberbia.' },
    12: { name: 'El Colgado', archetype: 'La Nueva Mirada y la Entrega', element: 'Agua', message: 'Invita a soltar el control egocéntrico y mirar el amor desde una perspectiva desapegada y pura.', counsel: 'No confundan entrega con sacrificio involuntario; elijan desde la paz interior.' },
    13: { name: 'La Muerte', archetype: 'La Transformación Inmortal', element: 'Agua', message: 'Un amor que incinera las versiones viejas de ambos para dar a luz a una unión renacida.', counsel: 'No teman a las crisis de renovación; son el preludio de un renacimiento sublime.' },
    14: { name: 'La Templanza', archetype: 'La Alquimia del Elixir Dorado', element: 'Fuego', message: 'El arte de mezclar con paciencia infinita las esencias de dos almas hasta lograr la armonía.', counsel: 'Practiquen la moderación y la escucha empática; son los alquimistas de su propia paz.' },
    15: { name: 'El Diablo', archetype: 'La Pasión Primordial y la Sombra', element: 'Tierra', message: 'Atracción sexual ardiente, magnetismo visceral y confronting con los apegos profundos.', counsel: 'Canalicen la pasión hacia el deleite lúdico sin caer en celos, posesión o manipulación.' },
    16: { name: 'La Torre', archetype: 'La Revelación Liberadora', element: 'Fuego', message: 'Ruptura de falsas máscaras e ilusiones para edificar un amor cimentado en la verdad desnuda.', counsel: 'Acojan la honestidad radical; lo que es genuino jamás podrá ser derribado.' },
    17: { name: 'La Estrella', archetype: 'La Esperanza y la Gracia Cósmica', element: 'Aire', message: 'Unión bendecida por la serenidad, la belleza, la confianza en el porvenir y la transparencia.', counsel: 'Nutran sus sueños conjuntos con fe pura; son un manantial de luz para su entorno.' },
    18: { name: 'La Luna', archetype: 'El Océano Psíquico y los Sueños', element: 'Agua', message: 'Lazo de hipnótica atracción psíquica, sueños compartidos y acceso al inconsciente profundo.', counsel: 'Cuiden no caer en malentendidos o sombras imaginadas; dialoguen con luz clara.' },
    19: { name: 'El Sol', archetype: 'La Dicha, la Verdad y la Celebración', element: 'Fuego', message: 'El arquetipo de la plenitud absoluta: alegría de vivir, calidez, generosidad y éxito mutuo.', counsel: 'Celebren su felicidad a viva voz y sean generosos derramando esa luz en los demás.' },
    20: { name: 'El Juicio', archetype: 'El Despertar de la Vocación Compartida', element: 'Fuego', message: 'Llamado cósmico a resurgir juntos; un vínculo que despierta talentos dormidos en ambos.', counsel: 'Perdonen el pasado definitivamente; están llamados a una vida de mayor consciencia.' },
    21: { name: 'El Mundo', archetype: 'La Integración Total y el Triunfo', element: 'Tierra', message: 'El cierre de ciclos sagrados y la coronación del amor en su expresión más elevada y completa.', counsel: 'Honren la totalidad de su viaje; han conquistado un santuario de amor maduro.' },
    22: { name: 'El Loco', archetype: 'La Libertad y el Salto Cuántico', element: 'Aire', message: 'Amor espontáneo, jovial, sin dogmas rígidos, dispuesto a lanzarse al misterio con fe inocente.', counsel: 'Mantengan la frescura del principiante; no dejen que las rutinas marchiten el asombro.' },
  };

  const relationalArcanum = ARCANA_MAP[pairCardNum]
    ? { cardNumber: pairCardNum, ...ARCANA_MAP[pairCardNum] }
    : {
        cardNumber: 6,
        name: 'Los Enamorados',
        archetype: 'La Elección Consciente del Alma',
        element: 'Aire',
        message: 'Unión destinada a aprender el arte sagrado de elegirse diariamente en libertad.',
        counsel: 'Que su amor sea un espacio de crecimiento y respeto a la soberanía individual.',
      };

  // Fallbacks if lists are empty
  if (strengths.length === 0) {
    strengths.push('Complementariedad elemental que invita al aprendizaje mutuo.');
    strengths.push('Independencia sana que permite a cada uno conservar su espacio individual.');
    strengths.push('Respeto mutuo y capacidad para encontrar acuerdos constructivos.');
  }
  if (challenges.length === 0) {
    challenges.push('Evitar la rutina cultivando espacios de sorpresa y renovación compartida.');
    challenges.push('Comunicar las necesidades emocionales antes de que se acumulen tensiones.');
  }

  const overview = `El cruce entre las cartas de **${chartA.birthData.name}** (Sol en ${sunA?.sign}, Luna en ${moonA?.sign}) y **${chartB.birthData.name}** (Sol en ${sunB?.sign}, Luna en ${moonB?.sign}) revela una afinidad relacional global del **${overall}%**. Con ${crossAspects.length} aspectos cruzados detectados, su mapa relacional dibuja una trama dinámica de atracción magnética (${chemistry}%), entendimiento mental (${communication}%) y aprendizaje kármico profundo (${soulConnection}%).`;

  const arcanumCounsel = `Bajo la regencia del **Arcano ${relationalArcanum.cardNumber}: ${relationalArcanum.name}** (${relationalArcanum.archetype}), su vínculo está consagrado a: ${relationalArcanum.message} **Clave de Maestría:** ${relationalArcanum.counsel}`;

  return {
    chartA,
    chartB,
    crossAspects,
    scores,
    overview,
    strengths: strengths.slice(0, 4),
    challenges: challenges.slice(0, 3),
    arcanumCounsel,
    sunDynamic,
    moonDynamic,
    eroticChemistry,
    karmicDestiny,
    categorizedAspects: {
      harmonics: harmonics.slice(0, 8),
      tensions: tensions.slice(0, 8),
      conjunctions: conjunctions.slice(0, 6),
    },
    relationalArcanum,
  };
}
