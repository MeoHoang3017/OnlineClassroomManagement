import React, { createContext, useState, useEffect, useContext } from 'react';
import authAPI from '../api/authAPI';
import userAPI from '../api/userAPI';
import { LoginRequest, RegisterRequest, User } from '../types/AuthTypes';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => void;
  register: (credentials: RegisterRequest) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('refreshToken');
        if (token) {
          const data = await authAPI.refreshToken(token);
          setUser(data);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      await authAPI.login(credentials);
      const userData = await userAPI.getCurrentUser();
      setUser(userData);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (credentials: RegisterRequest) => {
    try {
      const data = await authAPI.register(credentials);
      setUser(data.user);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);