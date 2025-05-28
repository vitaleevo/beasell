
import { useStudent } from '@/context/StudentContext';
import { Student } from '@/types/student';
import { validateEmail, generateToken } from '@/utils/validation';

export const useStudentAuth = () => {
  const { state, dispatch } = useStudent();

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; message: string }> => {
    // Validar email
    if (!validateEmail(email)) {
      return { success: false, message: 'Email inválido' };
    }

    // Simulação de autenticação com dados completos
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@exemplo.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400',
        enrolledCourses: ['1', '2'],
        favoriteCourses: ['1'],
        wishlistCourses: ['2'],
        progress: {
          '1': {
            courseId: '1',
            completedLessons: ['l1'],
            completedQuizzes: [],
            progressPercentage: 25,
            startedAt: '2024-01-01',
            lastAccessedAt: '2024-01-15',
            timeSpent: 1800,
            notes: [],
            quizAttempts: []
          }
        },
        points: 150,
        badges: [
          {
            id: 'b1',
            title: 'Primeiro Passo',
            description: 'Completou sua primeira aula',
            icon: 'trophy',
            color: 'gold',
            earnedAt: '2024-01-02',
            type: 'completion'
          }
        ],
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
        lastLoginAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Pedro Santos',
        email: 'pedro@exemplo.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        enrolledCourses: ['1'],
        favoriteCourses: [],
        wishlistCourses: ['2'],
        progress: {
          '1': {
            courseId: '1',
            completedLessons: [],
            completedQuizzes: [],
            progressPercentage: 0,
            startedAt: '2024-01-10',
            lastAccessedAt: '2024-01-10',
            timeSpent: 0,
            notes: [],
            quizAttempts: []
          }
        },
        points: 50,
        badges: [],
        certificates: [],
        settings: {
          emailNotifications: false,
          pushNotifications: true,
          autoplay: false,
          playbackSpeed: 1.25,
          language: 'pt',
          theme: 'dark',
          privacy: {
            showProgress: false,
            showCertificates: true,
            showBadges: false
          }
        },
        createdAt: '2024-01-15',
        lastLoginAt: '2024-01-16'
      }
    ];

    const student = mockStudents.find(s => s.email === email);
    if (student && password === 'student123') {
      // Verificar status de subscrição (simulação)
      const subscription = {
        status: 'ativo',
        endDate: '2024-12-31'
      };
      
      if (subscription.status !== 'ativo') {
        return { success: false, message: 'Sua subscrição expirou. Entre em contato com o suporte.' };
      }

      // Gerar token de sessão
      const token = generateToken();
      const sessionData = {
        ...student,
        token,
        subscription,
        lastLoginAt: new Date().toISOString()
      };

      // Salvar sessão
      const storageKey = rememberMe ? 'beasell-student' : 'beasell-student-session';
      localStorage.setItem(storageKey, JSON.stringify(sessionData));
      
      dispatch({ type: 'LOGIN', payload: student });
      return { success: true, message: 'Login realizado com sucesso!' };
    }
    
    return { success: false, message: 'Email ou senha incorretos' };
  };

  const logout = () => {
    localStorage.removeItem('beasell-student');
    localStorage.removeItem('beasell-student-session');
    dispatch({ type: 'LOGOUT' });
  };

  const checkSubscriptionStatus = () => {
    // Simulação de verificação de status de subscrição
    return {
      isActive: true,
      expiresAt: '2024-12-31',
      planType: 'premium'
    };
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { courseId, lessonId } });
    
    // Adicionar pontos por completar aula
    dispatch({ type: 'ADD_POINTS', payload: 10 });
    
    // Salvar progresso no localStorage
    if (state.student) {
      const updatedStudent = {
        ...state.student,
        progress: {
          ...state.progress,
          [courseId]: {
            ...state.progress[courseId],
            completedLessons: [...(state.progress[courseId]?.completedLessons || []), lessonId]
          }
        }
      };
      localStorage.setItem('beasell-student', JSON.stringify(updatedStudent));
    }
  };

  return {
    student: state.student,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    logout,
    markLessonCompleted,
    checkSubscriptionStatus
  };
};
