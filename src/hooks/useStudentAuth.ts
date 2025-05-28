
import { useStudent } from '@/context/StudentContext';
import { Student } from '@/types/student';

export const useStudentAuth = () => {
  const { state, dispatch } = useStudent();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação - em app real, seria uma API
    const mockStudents = [
      {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@exemplo.com',
        enrolledCourses: ['1', '2'],
        progress: {},
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'Pedro Santos',
        email: 'pedro@exemplo.com',
        enrolledCourses: ['1'],
        progress: {},
        createdAt: '2024-01-15'
      }
    ];

    const student = mockStudents.find(s => s.email === email);
    if (student && password === 'student123') {
      localStorage.setItem('beasell-student', JSON.stringify(student));
      dispatch({ type: 'LOGIN', payload: student });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('beasell-student');
    dispatch({ type: 'LOGOUT' });
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { courseId, lessonId } });
    
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
    markLessonCompleted
  };
};
