import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LMS_COURSES, getLMSCourseBySlug } from '@/lib/academy/courseRepository';
import CourseClassroomView from '@/components/academy/CourseClassroomView';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return LMS_COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getLMSCourseBySlug(params.slug);
  if (!course) {
    return { title: 'Curso no encontrado | ARCANO' };
  }

  return {
    title: `Aula Virtual: ${course.title} (Nivel ${course.romanLevel}) | Academia ARCANO`,
    description: `Aprende ${course.title} en el aula virtual de ARCANO. Lecciones en video, guías PDF y acompañamiento ceremonial.`,
  };
}

export default function CourseLearningPage({ params }: Props) {
  const course = getLMSCourseBySlug(params.slug);
  if (!course) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05070E] flex items-center justify-center text-amber-200 font-serif">
          <div className="flex items-center gap-3">
            <span className="animate-spin text-2xl">✦</span>
            <span>Abriendo el Aula Virtual...</span>
          </div>
        </div>
      }
    >
      <CourseClassroomView slug={params.slug} />
    </Suspense>
  );
}
