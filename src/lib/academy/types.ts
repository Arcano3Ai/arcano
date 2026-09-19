export type UserRole = 'student' | 'instructor' | 'admin';

export interface StudentProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export type CourseCategory = 'tarot' | 'astrologia' | 'numerologia' | 'reiki';

export interface LMSLesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  durationMinutes: number;
  videoProvider: 'youtube' | 'vimeo' | 'cloudflare';
  videoId: string; // ej: ID de YouTube o URL
  summaryMarkdown?: string;
  resources?: {
    name: string;
    url: string;
    type: 'pdf' | 'audio' | 'link';
  }[];
  order: number;
  isFreePreview?: boolean;
}

export interface LMSModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: LMSLesson[];
}

export interface LMSCourse {
  id: string;
  slug: string;
  category: CourseCategory;
  categoryName: string;
  level: number;
  romanLevel: string;
  title: string;
  subtitle: string;
  description: string;
  priceMxn: number;
  originalPriceMxn?: number;
  isFreePromotion?: boolean;
  formattedPrice: string;
  durationHours: string;
  totalLessons: number;
  thumbnailUrl: string;
  glyph: string;
  countsForPromotion: boolean;
  modules: LMSModule[];
}

export interface LMSLessonProgress {
  lessonId: string;
  isCompleted: boolean;
  lastWatchedSeconds?: number;
  completedAt?: string;
}

export interface LMSEnrollment {
  id: string;
  userId: string;
  courseId: string;
  course: LMSCourse;
  status: 'active' | 'completed' | 'expired' | 'pending';
  enrolledAt: string;
  completedAt?: string;
  progressPercentage: number;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
}

export interface LMSCertificate {
  id: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  verificationCode: string;
  issuedAt: string;
  pdfUrl?: string;
}
