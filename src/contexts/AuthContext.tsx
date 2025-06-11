"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void; // Added register
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { language } = useLocalization();

  useEffect(() => {
    const storedAuth = localStorage.getItem('ili-shop-auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData && authData.isAuthenticated && authData.user) {
          setIsAuthenticated(true);
          setUser(authData.user);
        }
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem('ili-shop-auth');
      }
    }
  }, []);

  const login = (email: string, name: string = "Demo User") => {
    const userData = { name, email };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('ili-shop-auth', JSON.stringify({ isAuthenticated: true, user: userData }));
    toast({
      title: language === 'en' ? 'Login Successful' : 'ورود موفقیت آمیز بود',
      description: language === 'en' ? `Welcome back, ${name}!` : `خوش آمدید، ${name}!`,
      variant: 'default',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('ili-shop-auth');
    toast({
      title: language === 'en' ? 'Logged Out' : 'خروج از سیستم',
      description: language === 'en' ? 'You have been successfully logged out.' : 'شما با موفقیت از سیستم خارج شدید.',
      variant: 'default',
    });
  };
  
  const register = (name: string, email: string) => {
    // In a real app, this would involve an API call.
    // For this mock, we'll just log the user in.
    login(email, name);
    toast({
      title: language === 'en' ? 'Registration Successful' : 'ثبت نام موفقیت آمیز بود',
      description: language === 'en' ? `Welcome, ${name}! Your account has been created.` : `خوش آمدید، ${name}! حساب شما ایجاد شد.`,
      variant: 'default',
    });
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
