
export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  progress: { [courseId: string]: CourseProgress };
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  modules: CourseModule[];
  price: number;
  currency: string;
  published: boolean;
  createdAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoType: 'youtube' | 'vimeo';
  duration: string;
  order: number;
  materials?: LessonMaterial[];
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'link';
  url: string;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  lastAccessedLesson?: string;
  progressPercentage: number;
  startedAt: string;
  lastAccessedAt: string;
}
