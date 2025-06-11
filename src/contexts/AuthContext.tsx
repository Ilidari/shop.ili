
"use client";
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';
import type { User } from '@/types';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@ilishop.com';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password?: string, name?: string) => Promise<void>; // Now async
  logout: () => void;
  register: (name: string, email: string, password?: string) => Promise<void>; // Added password, now async
  updateAdminPassword: (currentPasswordAttempt: string, newPassword?: string) => boolean; // Functionality limited
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const { t, language } = useLocalization();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || 'User',
    email: session.user.email || '',
    isAdmin: session.user.email === ADMIN_EMAIL, // Or use session.user.isAdmin if set in callback
    image: session.user.image || undefined,
  } : null;
  const isAdmin = isAuthenticated && user?.email === ADMIN_EMAIL;

  const login = async (email: string, password?: string, name?: string) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast({
        title: t('login.errorTitle'),
        description: result.error === "CredentialsSignin" ? t('login.invalidCredentials') : result.error,
        variant: 'destructive',
      });
    } else if (result?.ok) {
      toast({
        title: t('login.successTitle'),
        description: language === 'en' ? `Welcome back!` : `خوش آمدید!`,
        variant: 'default',
      });
      // Redirection is handled by LoginForm's useEffect based on session status
    }
  };

  const logout = () => {
    signOut({ redirect: true, callbackUrl: '/' }); // Redirect to home after logout
    toast({
      title: t('logout.title'),
      description: t('logout.description'),
      variant: 'default',
    });
  };
  
  const register = async (name: string, email: string, password?: string) => {
    // Mock registration: In a real app, this would call a registration API endpoint.
    // For now, we'll just try to log in the user with these details (mocked by CredentialsProvider).
    // This won't actually "create" a persistent user without a backend.
    toast({
      title: t('register.successTitle'),
      description: language === 'en' ? `Welcome, ${name}! Proceed to login.` : `خوش آمدید، ${name}! لطفا وارد شوید.`,
      variant: 'default',
    });
    // Redirect to login, as there's no real registration creating a user for CredentialsProvider to check
    router.push('/login'); 
  };

  const updateAdminPassword = (currentPasswordAttempt: string, newPassword?: string): boolean => {
    // THIS IS NOW A MOCK AND WON'T ACTUALLY CHANGE THE PASSWORD FOR NextAuth CredentialsProvider
    // The password check is hardcoded in [...nextauth]/route.ts for this demo.
    // A real implementation requires a backend and database.
    if (!isAdmin) return false;
    
    toast({
      title: language === 'en' ? "Feature Info" : "اطلاعات ویژگی",
      description: language === 'en' ? "Admin password change is mocked and doesn't persist for NextAuth login in this demo." : "تغییر رمز عبور ادمین در این دمو شبیه‌سازی شده و برای ورود NextAuth پایدار نیست.",
    });
    // Simulate success for UI purposes
    if (currentPasswordAttempt === "Miladabi666@" && newPassword && newPassword.length >=6) {
        // This would normally interact with a backend service.
        return true; 
    }
    if (currentPasswordAttempt !== "Miladabi666@") {
        toast({ title: t('admin.passwordUpdateErrorCurrent'), variant: 'destructive' });
    } else if (!newPassword || newPassword.length < 6) {
        toast({ title: t('admin.passwordNewInvalid'), variant: 'destructive' });
    }
    return false;
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
