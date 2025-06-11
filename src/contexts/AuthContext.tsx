"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';
import type { User } from '@/types'; // Import User type

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password?: string, name?: string) => void; // Added password
  logout: () => void;
  register: (name: string, email: string) => void;
  updateAdminPassword: (currentPasswordAttempt: string, newPassword?: string) => boolean; // Added
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@ilishop.com';
const INITIAL_ADMIN_PASSWORD = 'Miladabi666@'; // Store initial admin password

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState(INITIAL_ADMIN_PASSWORD); // State for admin password
  const { toast } = useToast();
  const { t, language } = useLocalization();

  useEffect(() => {
    const storedAuth = localStorage.getItem('ili-shop-auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData && authData.isAuthenticated && authData.user) {
          setIsAuthenticated(true);
          setUser(authData.user);
          setIsAdmin(authData.isAdmin || false);
          if (authData.isAdmin && authData.adminPassword) {
            setAdminPassword(authData.adminPassword);
          }
        }
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem('ili-shop-auth');
      }
    }
  }, []);

  const login = (email: string, password?: string, name: string = "Demo User") => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL;

    if (isAdminUser) {
      if (password !== adminPassword) {
        toast({
          title: t('login.errorTitle'),
          description: t('login.invalidCredentials'),
          variant: 'destructive',
        });
        return;
      }
    }
    
    // For non-admin users or successful admin login, proceed as before (mocked)
    const userData: User = { name, email, isAdmin: isAdminUser };
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(isAdminUser);
    
    const authDataToStore: any = { isAuthenticated: true, user: userData, isAdmin: isAdminUser };
    if (isAdminUser) {
      authDataToStore.adminPassword = adminPassword; // Persist current admin password
    }
    localStorage.setItem('ili-shop-auth', JSON.stringify(authDataToStore));

    toast({
      title: t('login.successTitle'),
      description: language === 'en' ? `Welcome back, ${name}!` : `خوش آمدید، ${name}!`,
      variant: 'default',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('ili-shop-auth');
    // Do not reset adminPassword here to persist it across sessions if needed for demo purposes
    // or reset it if a full "logout means reset initial password" is desired:
    // setAdminPassword(INITIAL_ADMIN_PASSWORD); 
    toast({
      title: t('logout.title'),
      description: t('logout.description'),
      variant: 'default',
    });
  };
  
  const register = (name: string, email: string) => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL; 
    const userData: User = { name, email, isAdmin: isAdminUser };
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(isAdminUser);
    
    const authDataToStore: any = { isAuthenticated: true, user: userData, isAdmin: isAdminUser };
    if (isAdminUser) {
      authDataToStore.adminPassword = adminPassword; // Persist current admin password
    }
    localStorage.setItem('ili-shop-auth', JSON.stringify(authDataToStore));

    toast({
      title: t('register.successTitle'),
      description: language === 'en' ? `Welcome, ${name}! Your account has been created.` : `خوش آمدید، ${name}! حساب شما ایجاد شد.`,
      variant: 'default',
    });
  };

  const updateAdminPassword = (currentPasswordAttempt: string, newPassword?: string): boolean => {
    if (!isAdmin || !user || user.email !== ADMIN_EMAIL) {
      // Should not happen if called from admin settings
      return false;
    }
    if (currentPasswordAttempt !== adminPassword) {
      toast({ title: t('admin.passwordUpdateErrorCurrent'), variant: 'destructive' });
      return false;
    }
    if (!newPassword || newPassword.length < 6) { // Basic validation for new password
      toast({ title: t('admin.passwordNewInvalid'), variant: 'destructive'});
      return false;
    }
    setAdminPassword(newPassword);
    // Update localStorage if user is still considered "logged in"
    const storedAuth = localStorage.getItem('ili-shop-auth');
    if (storedAuth) {
        try {
            const authData = JSON.parse(storedAuth);
            if (authData && authData.isAuthenticated && authData.user?.email === ADMIN_EMAIL) {
                authData.adminPassword = newPassword;
                localStorage.setItem('ili-shop-auth', JSON.stringify(authData));
            }
        } catch (e) { console.error(e); }
    }
    toast({ title: t('admin.passwordUpdateSuccess') });
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isAdmin, login, logout, register, updateAdminPassword }}>
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
