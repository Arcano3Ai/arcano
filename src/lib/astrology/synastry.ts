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

  // Fallbacks if lists are empty
  if (strengths.length === 0) {
    strengths.push('Complementariedad elemental que invita al aprendizaje mutuo.');
    strengths.push('Independencia sana que permite a cada uno conservar su espacio individual.');
  }
  if (challenges.length === 0) {
    challenges.push('Evitar la rutina cultivando espacios de sorpresa y renovación compartida.');
  }

  const overview = `El cruce entre las cartas de **${chartA.birthData.name}** (Sol en ${sunA?.sign}) y **${chartB.birthData.name}** (Sol en ${sunB?.sign}) revela una afinidad relacional del **${overall}%**. Existe una sinergia vibrante entre sus temperamentos que les invita a evolucionar juntos y transformar cualquier fricción en sabiduría madura.`;

  const arcanumCounsel = `En el Tarot, su vínculo resuena con **Los Enamorados (Arcano VI)** y **La Templanza (Arcano XIV)**: la unión no consiste en fundirse ciegamente hasta anularse, sino en mezclar con reverencia las aguas sagradas de dos almas soberanas.`;

  return {
    chartA,
    chartB,
    crossAspects,
    scores,
    overview,
    strengths: strengths.slice(0, 3),
    challenges: challenges.slice(0, 2),
    arcanumCounsel,
  };
}
