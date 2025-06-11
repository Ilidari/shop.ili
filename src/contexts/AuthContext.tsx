"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';
import type { User } from '@/types'; // Import User type

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean; // Added isAdmin
  login: (email: string, name?: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@ilishop.com';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Added isAdmin state
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
          setIsAdmin(authData.isAdmin || false); // Load isAdmin state
        }
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem('ili-shop-auth');
      }
    }
  }, []);

  const login = (email: string, name: string = "Demo User") => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL;
    const userData: User = { name, email, isAdmin: isAdminUser };
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(isAdminUser);
    localStorage.setItem('ili-shop-auth', JSON.stringify({ isAuthenticated: true, user: userData, isAdmin: isAdminUser }));
    toast({
      title: language === 'en' ? 'Login Successful' : 'ورود موفقیت آمیز بود',
      description: language === 'en' ? `Welcome back, ${name}!` : `خوش آمدید، ${name}!`,
      variant: 'default',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('ili-shop-auth');
    toast({
      title: language === 'en' ? 'Logged Out' : 'خروج از سیستم',
      description: language === 'en' ? 'You have been successfully logged out.' : 'شما با موفقیت از سیستم خارج شدید.',
      variant: 'default',
    });
  };
  
  const register = (name: string, email: string) => {
    // In a real app, this would involve an API call.
    // For this mock, we'll just log the user in (as non-admin).
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL; // Check if registering admin
    const userData: User = { name, email, isAdmin: isAdminUser };
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(isAdminUser);
    localStorage.setItem('ili-shop-auth', JSON.stringify({ isAuthenticated: true, user: userData, isAdmin: isAdminUser }));
    toast({
      title: language === 'en' ? 'Registration Successful' : 'ثبت نام موفقیت آمیز بود',
      description: language === 'en' ? `Welcome, ${name}! Your account has been created.` : `خوش آمدید، ${name}! حساب شما ایجاد شد.`,
      variant: 'default',
    });
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isAdmin, login, logout, register }}>
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
