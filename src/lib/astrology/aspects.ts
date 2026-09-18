import { Aspect, CelestialBodyName, PlanetaryPosition } from './types';
import { ASPECT_DEFINITIONS } from './constants';

export function normalizeDegrees(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

export function angularDifference(deg1: number, deg2: number): number {
  let diff = Math.abs(deg1 - deg2) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

export function calculateAspects(positions: PlanetaryPosition[]): Aspect[] {
  const aspects: Aspect[] = [];
  const aspectKeys = Object.keys(ASPECT_DEFINITIONS) as Array<keyof typeof ASPECT_DEFINITIONS>;

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const p1 = positions[i];
      const p2 = positions[j];

      // Don't calculate aspect between Node and South Node (they are always in opposition)
      if (
        (p1.body === 'Nodo Norte' && p2.body === 'Nodo Sur') ||
        (p1.body === 'Nodo Sur' && p2.body === 'Nodo Norte')
      ) {
        continue;
      }

      const diff = angularDifference(p1.longitude, p2.longitude);

      for (const key of aspectKeys) {
        const def = ASPECT_DEFINITIONS[key];
        const orb = Math.abs(diff - def.angle);

        // Slightly wider orbs for Sun and Moon (lumiaries)
        const isLuminary = p1.body === 'Sol' || p1.body === 'Luna' || p2.body === 'Sol' || p2.body === 'Luna';
        const allowedOrb = isLuminary ? def.maxOrb + 1.5 : def.maxOrb;

        if (orb <= allowedOrb) {
          // Determine if aspect is applying or separating
          // In simpler terms: if faster planet is moving towards exact aspect
          const speed1 = p1.speed;
          const speed2 = p2.speed;
          // Relative motion
          const relSpeed = speed1 - speed2;
          // Check position in next hour
          const nextP1 = normalizeDegrees(p1.longitude + speed1 / 24);
          const nextP2 = normalizeDegrees(p2.longitude + speed2 / 24);
          const nextDiff = angularDifference(nextP1, nextP2);
          const nextOrb = Math.abs(nextDiff - def.angle);
          const isApplying = nextOrb < orb;

          aspects.push({
            body1: p1.body,
            body2: p2.body,
            aspectType: def.type,
            angle: def.angle,
            diff: Number(diff.toFixed(2)),
            orb: Number(orb.toFixed(2)),
            isApplying,
            nature: def.nature,
          });
          break; // Avoid matching two aspect types for the same pair
        }
      }
    }
  }

  // Sort by tightness of orb
  return aspects.sort((a, b) => a.orb - b.orb);
}
