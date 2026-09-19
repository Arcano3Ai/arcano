import { LMSCourse, LMSModule, LMSLesson } from './types';
import { academyCourses } from '@/data/academy';

// Generador de módulos y lecciones a partir del temario enriquecido en academyCourses
function buildModulesForCourse(courseId: string, contentList: string[]): LMSModule[] {
  const sampleVideos = [
    'dQw4w9WgXcQ', // IDs de demostración configurables
    'L_LUpnjgPso',
    '3JZ_D3ELwOQ',
    '2Vv-BfVoq4g',
    '7wtfhZwyrcc',
  ];

  // Distribuir en 3 módulos equilibrados
  const total = contentList.length;
  const chunk1 = Math.ceil(total / 3);
  const chunk2 = Math.ceil((total - chunk1) / 2);

  const part1 = contentList.slice(0, chunk1);
  const part2 = contentList.slice(chunk1, chunk1 + chunk2);
  const part3 = contentList.slice(chunk1 + chunk2);

  const createLessons = (titles: string[], modulePrefix: string, startIdx: number): LMSLesson[] => {
    return titles.map((title, i) => {
      const idx = startIdx + i;
      const cleanTitle = title.replace(/^[✦•\-]\s*/, '').trim();

      return {
        id: `${courseId}-lesson-${idx + 1}`,
        moduleId: `${courseId}-${modulePrefix}`,
        title: cleanTitle,
        description: `Lección ${idx + 1}: Análisis pedagógico y profundización en ${cleanTitle.toLowerCase()}.`,
        durationMinutes: 20 + ((idx * 6) % 25),
        videoProvider: 'youtube',
        videoId: sampleVideos[idx % sampleVideos.length],
        summaryMarkdown: `### ✦ Propósito y Claves Sagradas\n\nEn esta lección profundizamos en **${cleanTitle}**, examinando su estructura arquetípica, sus correspondencias simbólicas y su aplicación en la práctica real.\n\n#### 📜 Puntos Clave de la Clase:\n- Fundamentos teóricos, origen histórico y vibración elemental.\n- Reconocimiento de patrones en luz y en sombra.\n- Señales de alerta y errores comunes a evitar en la consulta.\n\n#### 🧘 Ejercicio de Integración Personal:\nToma tu libreta o diario de estudiante y anota las 3 revelaciones principales de esta clase. Realiza la práctica sugerida en el video antes de marcar la lección como completada.`,
        resources: [
          {
            name: `Manual Ceremonial en PDF — ${cleanTitle.slice(0, 32)}`,
            url: '#',
            type: 'pdf',
          },
          {
            name: 'Guía de Práctica & Ficha Imprimible',
            url: '#',
            type: 'pdf',
          },
        ],
        order: idx + 1,
        isFreePreview: idx === 0, // La primera lección siempre es vista previa gratuita
      };
    });
  };

  const modules: LMSModule[] = [
    {
      id: `${courseId}-mod-1`,
      courseId,
      title: 'Módulo 1: Fundamentos Teóricos y Arquetipos Sagrados',
      description: 'Apertura iniciática, conceptos esenciales y bases filosóficas.',
      order: 1,
      lessons: createLessons(part1, 'mod-1', 0),
    },
    {
      id: `${courseId}-mod-2`,
      courseId,
      title: 'Módulo 2: Simbología Aplicada y Dinámica Práctica',
      description: 'Estructuras, combinaciones, correspondencias y métodos de interpretación.',
      order: 2,
      lessons: createLessons(part2, 'mod-2', part1.length),
    },
  ];

  if (part3.length > 0) {
    modules.push({
      id: `${courseId}-mod-3`,
      courseId,
      title: 'Módulo 3: Práctica Avanzada, Casos Reales e Integración Ética',
      description: 'Tiradas complejas, consulta con clientes y consolidación del conocimiento.',
      order: 3,
      lessons: createLessons(part3, 'mod-3', part1.length + part2.length),
    });
  }

  return modules;
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
    originalPriceMxn: c.originalPrice || (c.price === 0 ? 799 : undefined),
    isFreePromotion: c.price === 0,
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
