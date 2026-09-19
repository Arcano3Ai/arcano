// ==============================================================================
// ARCANO ACADEMIA ESOTÉRICA — REPOSITORIO CENTRAL DE GUÍAS DE ESTUDIO
// Nivel 1 de las 4 Rutas Sagradas:
// 1. Tarot (tarot-01)
// 2. Astrología (astrologia-01)
// 3. Numerología (numerologia-01)
// 4. Reiki y Energía (reiki-01)
//
// Correo Oficial de Tutorías y Consultas: consultas@arcanosolutions.com
// ==============================================================================

import { LessonStudyGuide, TAROT_LEVEL_1_STUDY_GUIDES } from './academyStudyLevel1';
import { ASTROLOGY_LEVEL_1_STUDY_GUIDES } from './academyStudyAstrologyLevel1';
import { NUMEROLOGY_LEVEL_1_STUDY_GUIDES } from './academyStudyNumerologyLevel1';
import { REIKI_LEVEL_1_STUDY_GUIDES } from './academyStudyReikiLevel1';

export type { LessonStudyGuide };

export const ALL_LEVEL_1_STUDY_GUIDES: Record<string, LessonStudyGuide> = {
  ...TAROT_LEVEL_1_STUDY_GUIDES,
  ...ASTROLOGY_LEVEL_1_STUDY_GUIDES,
  ...NUMEROLOGY_LEVEL_1_STUDY_GUIDES,
  ...REIKI_LEVEL_1_STUDY_GUIDES,
};

/**
 * Obtiene la guía de estudio desarrollada para una lección específica.
 */
export function getLessonStudyGuide(lessonId: string): LessonStudyGuide | undefined {
  return ALL_LEVEL_1_STUDY_GUIDES[lessonId];
}

/**
 * Comprueba si existe una guía desarrollada para una lección.
 */
export function hasStudyGuide(lessonId: string): boolean {
  return Boolean(ALL_LEVEL_1_STUDY_GUIDES[lessonId]);
}
