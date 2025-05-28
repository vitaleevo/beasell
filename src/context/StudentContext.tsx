
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Student, Course, CourseProgress } from '@/types/student';

interface StudentState {
  student: Student | null;
  isAuthenticated: boolean;
  courses: Course[];
  enrolledCourses: Course[];
  currentCourse: Course | null;
  progress: { [courseId: string]: CourseProgress };
  loading: boolean;
}

type StudentAction =
  | { type: 'LOGIN'; payload: Student }
  | { type: 'LOGOUT' }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'SET_CURRENT_COURSE'; payload: Course | null }
  | { type: 'UPDATE_PROGRESS'; payload: { courseId: string; lessonId: string } }
  | { type: 'SET_LOADING'; payload: boolean };

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Técnicas Avançadas de Vendas',
    description: 'Aprenda as técnicas mais eficazes para aumentar suas vendas',
    thumbnail: '/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png',
    instructor: 'João Silva',
    duration: '8 horas',
    level: 'Avançado',
    category: 'Vendas',
    price: 250000,
    currency: 'AOA',
    published: true,
    createdAt: '2024-01-15',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos das Vendas',
        description: 'Base teórica essencial',
        order: 1,
        lessons: [
          {
            id: 'l1',
            title: 'Introdução às Vendas Modernas',
            description: 'Visão geral do mercado atual',
            videoUrl: 'dQw4w9WgXcQ',
            videoType: 'youtube',
            duration: '15:30',
            order: 1
          },
          {
            id: 'l2',
            title: 'Perfil do Vendedor de Sucesso',
            description: 'Características essenciais',
            videoUrl: 'dQw4w9WgXcQ',
            videoType: 'youtube',
            duration: '12:45',
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Técnicas de Negociação',
        description: 'Estratégias avançadas de negociação',
        order: 2,
        lessons: [
          {
            id: 'l3',
            title: 'Preparação para Negociação',
            description: 'Como se preparar adequadamente',
            videoUrl: '123456789',
            videoType: 'vimeo',
            duration: '18:20',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Atendimento ao Cliente Excelente',
    description: 'Desenvolva habilidades de atendimento excepcional',
    thumbnail: '/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png',
    instructor: 'Maria Santos',
    duration: '6 horas',
    level: 'Intermediário',
    category: 'Atendimento',
    price: 180000,
    currency: 'AOA',
    published: true,
    createdAt: '2024-02-01',
    modules: [
      {
        id: 'm3',
        title: 'Princípios do Atendimento',
        description: 'Fundamentos básicos',
        order: 1,
        lessons: [
          {
            id: 'l4',
            title: 'A Importância do Atendimento',
            description: 'Por que o atendimento é crucial',
            videoUrl: 'dQw4w9WgXcQ',
            videoType: 'youtube',
            duration: '10:15',
            order: 1
          }
        ]
      }
    ]
  }
];

const initialState: StudentState = {
  student: null,
  isAuthenticated: false,
  courses: mockCourses,
  enrolledCourses: [],
  currentCourse: null,
  progress: {},
  loading: false
};

const studentReducer = (state: StudentState, action: StudentAction): StudentState => {
  switch (action.type) {
    case 'LOGIN':
      const enrolledCourses = state.courses.filter(course => 
        action.payload.enrolledCourses.includes(course.id)
      );
      return { 
        ...state, 
        student: action.payload, 
        isAuthenticated: true,
        enrolledCourses,
        progress: action.payload.progress
      };
    case 'LOGOUT':
      return { 
        ...state, 
        student: null, 
        isAuthenticated: false, 
        enrolledCourses: [],
        currentCourse: null,
        progress: {}
      };
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'SET_CURRENT_COURSE':
      return { ...state, currentCourse: action.payload };
    case 'UPDATE_PROGRESS':
      const { courseId, lessonId } = action.payload;
      const currentProgress = state.progress[courseId] || {
        courseId,
        completedLessons: [],
        progressPercentage: 0,
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString()
      };
      
      const updatedProgress = {
        ...currentProgress,
        completedLessons: currentProgress.completedLessons.includes(lessonId) 
          ? currentProgress.completedLessons
          : [...currentProgress.completedLessons, lessonId],
        lastAccessedLesson: lessonId,
        lastAccessedAt: new Date().toISOString()
      };

      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
        updatedProgress.progressPercentage = Math.round((updatedProgress.completedLessons.length / totalLessons) * 100);
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          [courseId]: updatedProgress
        }
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const StudentContext = createContext<{
  state: StudentState;
  dispatch: React.Dispatch<StudentAction>;
} | null>(null);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  useEffect(() => {
    const savedStudent = localStorage.getItem('beasell-student');
    if (savedStudent) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedStudent) });
    }
  }, []);

  return (
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
