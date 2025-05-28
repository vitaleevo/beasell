
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  favoriteCourses: string[];
  wishlistCourses: string[];
  progress: { [courseId: string]: CourseProgress };
  points: number;
  badges: Badge[];
  certificates: Certificate[];
  settings: StudentSettings;
  createdAt: string;
  lastLoginAt: string;
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
  rating: number;
  reviewsCount: number;
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
  quiz?: Quiz;
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
  notes?: StudentNote[];
  completed?: boolean;
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'link' | 'video' | 'audio';
  url: string;
  size?: string;
}

export interface StudentNote {
  id: string;
  lessonId: string;
  timestamp: string;
  content: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: { [questionId: string]: string | number };
  score: number;
  completedAt: string;
  timeSpent: number;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  lastAccessedLesson?: string;
  progressPercentage: number;
  startedAt: string;
  lastAccessedAt: string;
  timeSpent: number;
  notes: StudentNote[];
  quizAttempts: QuizAttempt[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  type: 'completion' | 'streak' | 'performance' | 'special';
}

export interface Certificate {
  id: string;
  courseId: string;
  studentId: string;
  issuedAt: string;
  certificateUrl: string;
  verificationCode: string;
}

export interface CourseReview {
  id: string;
  courseId: string;
  studentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface StudentSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoplay: boolean;
  playbackSpeed: number;
  language: string;
  theme: 'light' | 'dark' | 'auto';
  privacy: {
    showProgress: boolean;
    showCertificates: boolean;
    showBadges: boolean;
  };
}

export interface Activity {
  id: string;
  type: 'lesson_completed' | 'quiz_passed' | 'course_started' | 'certificate_earned' | 'badge_earned';
  description: string;
  timestamp: string;
  metadata?: any;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  estimatedDuration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
}
