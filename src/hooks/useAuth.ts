import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (userData: Partial<User>, password: string) => {
    const newUser = await authService.register(userData, password);
    setUser(newUser);
    return newUser;
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    hasRole: (role: string) => user?.role === role
  };
}