
import { useState } from 'react';
import { useStudent } from '@/shared/context/StudentContext';
import { Student } from '@/shared/types/student';

export const useStudentAuth = () => {
  const { state, dispatch } = useStudent();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      // Mock login - em produção seria uma chamada à API
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@exemplo.com',
          enrolledCourses: ['1', '2'], // Garantir que é array
          favoriteCourses: ['1'], // Garantir que é array
          wishlistCourses: [], // Garantir que é array
          progress: {
            '1': {
              courseId: '1',
              completedLessons: ['l1'],
              completedQuizzes: [],
              progressPercentage: 25,
              startedAt: '2024-01-01',
              lastAccessedAt: '2024-01-15',
              timeSpent: 3600,
              notes: [],
              quizAttempts: []
            }
          },
          points: 1250,
          badges: [],
          certificates: [],
          settings: {
            emailNotifications: true,
            pushNotifications: true,
            autoplay: true,
            playbackSpeed: 1,
            language: 'pt',
            theme: 'light',
            privacy: {
              showProgress: true,
              showCertificates: true,
              showBadges: true
            }
          },
          createdAt: '2024-01-01',
          lastLoginAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Pedro Oliveira',
          email: 'pedro@exemplo.com',
          enrolledCourses: ['2'], // Garantir que é array
          favoriteCourses: [], // Garantir que é array
          wishlistCourses: ['1'], // Garantir que é array
          progress: {
            '2': {
              courseId: '2',
              completedLessons: [],
              completedQuizzes: [],
              progressPercentage: 0,
              startedAt: '2024-02-01',
              lastAccessedAt: '2024-02-01',
              timeSpent: 0,
              notes: [],
              quizAttempts: []
            }
          },
          points: 750,
          badges: [],
          certificates: [],
          settings: {
            emailNotifications: true,
            pushNotifications: true,
            autoplay: true,
            playbackSpeed: 1,
            language: 'pt',
            theme: 'light',
            privacy: {
              showProgress: true,
              showCertificates: true,
              showBadges: true
            }
          },
          createdAt: '2024-02-01',
          lastLoginAt: new Date().toISOString()
        }
      ];

      const student = mockStudents.find(s => s.email === email);

      if (student && password === 'student123') {
        // Garantir que todas as propriedades de array existem
        const validatedStudent: Student = {
          ...student,
          enrolledCourses: student.enrolledCourses || [],
          favoriteCourses: student.favoriteCourses || [],
          wishlistCourses: student.wishlistCourses || [],
          progress: student.progress || {},
          badges: student.badges || [],
          certificates: student.certificates || []
        };

        dispatch({ type: 'LOGIN', payload: validatedStudent });
        localStorage.setItem('beasell-student', JSON.stringify(validatedStudent));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('beasell-student');
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { courseId, lessonId } });

    // Update localStorage with the new progress
    if (state.student) {
      const updatedStudent = { ...state.student };
      localStorage.setItem('beasell-student', JSON.stringify(updatedStudent));
    }
  };

  return {
    isAuthenticated: state.isAuthenticated,
    student: state.student,
    loading,
    login,
    logout,
    markLessonCompleted
  };
};

