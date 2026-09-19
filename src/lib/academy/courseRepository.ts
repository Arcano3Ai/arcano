import { LMSCourse, LMSModule, LMSLesson } from './types';
import { academyCourses } from '@/data/academy';

// Generador de módulos y lecciones a partir del temario existente en academyCourses
function buildModulesForCourse(courseId: string, contentList: string[]): LMSModule[] {
  // Dividimos el temario en 2 o 3 módulos temáticos
  const half = Math.ceil(contentList.length / 2);
  const part1 = contentList.slice(0, half);
  const part2 = contentList.slice(half);

  const sampleVideos = [
    'dQw4w9WgXcQ', // ID de muestra
    'L_LUpnjgPso',
    '3JZ_D3ELwOQ',
    '2Vv-BfVoq4g',
  ];

  const createLessons = (titles: string[], modulePrefix: string, startIdx: number): LMSLesson[] => {
    return titles.map((title, i) => {
      const idx = startIdx + i;
      return {
        id: `${courseId}-lesson-${idx + 1}`,
        moduleId: `${courseId}-${modulePrefix}`,
        title: title.replace(/^[✦•\-]\s*/, '').trim(),
        description: `Lección fundamental para comprender y dominar ${title.toLowerCase()}.`,
        durationMinutes: 15 + ((idx * 7) % 25),
        videoProvider: 'youtube',
        videoId: sampleVideos[idx % sampleVideos.length],
        summaryMarkdown: `### Objetivos de la Lección\n\nEn esta clase profundizamos en **${title}**, analizando sus arquetipos, aplicación práctica y la resonancia con tu propia energía.\n\n- Fundamentos y simbolismo sagrado.\n- Práctica guiada paso a paso.\n- Errores comunes y cómo evitarlos en tus lecturas y sesiones.`,
        resources: [
          {
            name: `Guía de Estudio en PDF — ${title.slice(0, 30)}`,
            url: '#',
            type: 'pdf',
          },
          {
            name: 'Plantilla de Práctica Imprimible',
            url: '#',
            type: 'pdf',
          },
        ],
        order: idx + 1,
        isFreePreview: idx === 0, // La primera lección es vista previa gratuita
      };
    });
  };

  return [
    {
      id: `${courseId}-mod-1`,
      courseId,
      title: 'Módulo 1: Fundamentos, Arquetipos y Filosofía Sagrada',
      description: 'Bases esenciales, historia y apertura energética de la disciplina.',
      order: 1,
      lessons: createLessons(part1, 'mod-1', 0),
    },
    {
      id: `${courseId}-mod-2`,
      courseId,
      title: 'Módulo 2: Interpretación, Aplicación Práctica y Casos Reales',
      description: 'Lecturas, consultas, integración de símbolos y dominio del método.',
      order: 2,
      lessons: createLessons(part2, 'mod-2', part1.length),
    },
  ];
}

// Catálogo completo de cursos LMS
export const LMS_COURSES: LMSCourse[] = academyCourses.map((c) => {
  const modules = buildModulesForCourse(c.id, c.content);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return {
    id: c.id,
    slug: c.id,
    category: c.category as any,
    categoryName: c.categoryName,
    level: c.level,
    romanLevel: c.romanLevel,
    title: c.title,
    subtitle: c.subtitle || `Formación Sagrada Nivel ${c.romanLevel}`,
    description: c.description,
    priceMxn: c.price,
    formattedPrice: c.formattedPrice,
    durationHours: c.duration,
    totalLessons,
    thumbnailUrl: c.cardImage,
    glyph: c.glyph,
    countsForPromotion: c.countsForPromotion,
    modules,
  };
});

// Helper para encontrar un curso por slug/id
export function getLMSCourseBySlug(slug: string): LMSCourse | undefined {
  return LMS_COURSES.find((c) => c.slug === slug || c.id === slug);
}

// Helper para encontrar una lección específica
export function getLMSLesson(courseSlug: string, lessonId: string): {
  course: LMSCourse;
  module: LMSModule;
  lesson: LMSLesson;
  prevLesson?: LMSLesson;
  nextLesson?: LMSLesson;
} | null {
  const course = getLMSCourseBySlug(courseSlug);
  if (!course) return null;

  const allLessons: { module: LMSModule; lesson: LMSLesson }[] = [];
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      allLessons.push({ module: mod, lesson: les });
    }
  }

  const currentIdx = allLessons.findIndex((item) => item.lesson.id === lessonId);
  if (currentIdx === -1) {
    // Si no se encuentra el ID exacto, devolvemos la primera lección por defecto
    if (allLessons.length > 0) {
      return {
        course,
        module: allLessons[0].module,
        lesson: allLessons[0].lesson,
        nextLesson: allLessons[1]?.lesson,
      };
    }
    return null;
  }

  return {
    course,
    module: allLessons[currentIdx].module,
    lesson: allLessons[currentIdx].lesson,
    prevLesson: currentIdx > 0 ? allLessons[currentIdx - 1].lesson : undefined,
    nextLesson: currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1].lesson : undefined,
  };
}
