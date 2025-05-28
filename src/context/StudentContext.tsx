import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Student, Course, CourseProgress, Badge, Certificate, StudentNote, Activity } from '@/types/student';

interface StudentState {
  student: Student | null;
  isAuthenticated: boolean;
  courses: Course[];
  enrolledCourses: Course[];
  favoriteCourses: Course[];
  wishlistCourses: Course[];
  currentCourse: Course | null;
  progress: { [courseId: string]: CourseProgress };
  activities: Activity[];
  loading: boolean;
  searchFilters: any;
}

type StudentAction =
  | { type: 'LOGIN'; payload: Student }
  | { type: 'LOGOUT' }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'SET_CURRENT_COURSE'; payload: Course | null }
  | { type: 'UPDATE_PROGRESS'; payload: { courseId: string; lessonId: string } }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'ADD_NOTE'; payload: { courseId: string; lessonId: string; content: string } }
  | { type: 'UPDATE_NOTE'; payload: { noteId: string; content: string } }
  | { type: 'DELETE_NOTE'; payload: { noteId: string } }
  | { type: 'EARN_BADGE'; payload: Badge }
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_FILTERS'; payload: any };

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
    rating: 4.8,
    reviewsCount: 156,
    tags: ['Popular', 'Certificação', 'Prático'],
    prerequisites: ['Conhecimentos básicos de vendas'],
    learningObjectives: [
      'Dominar técnicas avançadas de closing',
      'Identificar oportunidades de upselling',
      'Construir relacionamentos duradouros com clientes'
    ],
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
            order: 1,
            materials: [
              {
                id: 'm1',
                title: 'Slides da Apresentação',
                type: 'pdf',
                url: '#',
                size: '2.5MB'
              }
            ]
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
    rating: 4.6,
    reviewsCount: 89,
    tags: ['Novo', 'Prático'],
    prerequisites: [],
    learningObjectives: [
      'Técnicas de comunicação eficaz',
      'Resolução de conflitos',
      'Fidelização de clientes'
    ],
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
  favoriteCourses: [],
  wishlistCourses: [],
  currentCourse: null,
  progress: {},
  activities: [],
  loading: false,
  searchFilters: {}
};

const studentReducer = (state: StudentState, action: StudentAction): StudentState => {
  switch (action.type) {
    case 'LOGIN':
      const enrolledCourses = state.courses.filter(course => 
        action.payload.enrolledCourses.includes(course.id)
      );
      const favoriteCourses = state.courses.filter(course => 
        action.payload.favoriteCourses.includes(course.id)
      );
      const wishlistCourses = state.courses.filter(course => 
        action.payload.wishlistCourses.includes(course.id)
      );
      return { 
        ...state, 
        student: action.payload, 
        isAuthenticated: true,
        enrolledCourses,
        favoriteCourses,
        wishlistCourses,
        progress: action.payload.progress
      };

    case 'LOGOUT':
      return { 
        ...state, 
        student: null, 
        isAuthenticated: false, 
        enrolledCourses: [],
        favoriteCourses: [],
        wishlistCourses: [],
        currentCourse: null,
        progress: {},
        activities: []
      };

    case 'ADD_FAVORITE':
      if (state.student) {
        const updatedStudent = {
          ...state.student,
          favoriteCourses: [...state.student.favoriteCourses, action.payload]
        };
        return {
          ...state,
          student: updatedStudent,
          favoriteCourses: state.courses.filter(course => 
            updatedStudent.favoriteCourses.includes(course.id)
          )
        };
      }
      return state;

    case 'REMOVE_FAVORITE':
      if (state.student) {
        const updatedStudent = {
          ...state.student,
          favoriteCourses: state.student.favoriteCourses.filter(id => id !== action.payload)
        };
        return {
          ...state,
          student: updatedStudent,
          favoriteCourses: state.courses.filter(course => 
            updatedStudent.favoriteCourses.includes(course.id)
          )
        };
      }
      return state;

    case 'ADD_NOTE':
      const { courseId, lessonId, content } = action.payload;
      const newNote: StudentNote = {
        id: `note-${Date.now()}`,
        lessonId,
        timestamp: new Date().toISOString(),
        content,
        createdAt: new Date().toISOString()
      };

      const updatedProgress = {
        ...state.progress,
        [courseId]: {
          ...state.progress[courseId],
          notes: [...(state.progress[courseId]?.notes || []), newNote]
        }
      };

      return {
        ...state,
        progress: updatedProgress
      };

    case 'EARN_BADGE':
      if (state.student) {
        return {
          ...state,
          student: {
            ...state.student,
            badges: [...state.student.badges, action.payload]
          }
        };
      }
      return state;

    case 'ADD_POINTS':
      if (state.student) {
        return {
          ...state,
          student: {
            ...state.student,
            points: state.student.points + action.payload
          }
        };
      }
      return state;

    case 'UPDATE_PROGRESS':
      const { courseId: cId, lessonId: lId } = action.payload;
      const currentProgress = state.progress[cId] || {
        courseId: cId,
        completedLessons: [],
        completedQuizzes: [],
        progressPercentage: 0,
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        timeSpent: 0,
        notes: [],
        quizAttempts: []
      };
      
      const updatedProgressData = {
        ...currentProgress,
        completedLessons: currentProgress.completedLessons.includes(lId) 
          ? currentProgress.completedLessons
          : [...currentProgress.completedLessons, lId],
        lastAccessedLesson: lId,
        lastAccessedAt: new Date().toISOString()
      };

      const course = state.courses.find(c => c.id === cId);
      if (course) {
        const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
        updatedProgressData.progressPercentage = Math.round((updatedProgressData.completedLessons.length / totalLessons) * 100);
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          [cId]: updatedProgressData
        }
      };

    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'SET_CURRENT_COURSE':
      return { ...state, currentCourse: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SEARCH_FILTERS':
      return { ...state, searchFilters: action.payload };
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
