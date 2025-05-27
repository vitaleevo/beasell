
import { useAdmin } from '@/context/AdminContext';
import { AdminUser } from '@/types/admin';

export const useAuth = () => {
  const { state, dispatch } = useAdmin();

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication - in real app, this would call an API
    if (username === 'admin' && password === 'beasell2024') {
      const user: AdminUser = {
        id: '1',
        username: 'admin',
        email: 'admin@beasell.ao',
        role: 'admin',
      };
      
      localStorage.setItem('beasell-admin-user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('beasell-admin-user');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };
};
