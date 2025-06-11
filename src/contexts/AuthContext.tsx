
"use client";
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';
import type { User } from '@/types'; // Ensure your User type includes id and isAdmin
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@ilishop.com';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated'; // Expose status
  login: (email: string, password?: string) => Promise<void>; // name removed, will come from session
  logout: () => void;
  register: (name: string, email: string, password?: string) => Promise<void>;
  updateAdminPassword: (currentPasswordAttempt: string, newPassword?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status: nextAuthStatus } = useSession(); 
  const { toast } = useToast();
  const { t, language } = useLocalization();
  const router = useRouter();

  const isAuthenticated = nextAuthStatus === 'authenticated';
  
  const user: User | null = isAuthenticated && session?.user ? {
    id: (session.user as any).id as string, 
    name: session.user.name || 'User',
    email: session.user.email || '',
    isAdmin: (session.user as any).isAdmin || false, 
    image: session.user.image || undefined,
  } : null;
  
  const isAdmin = isAuthenticated && user?.isAdmin === true;

  const login = async (email: string, password?: string) => {
    const result = await signIn('credentials', {
      redirect: false, // We will handle redirect in LoginForm's useEffect based on session status
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
      // Session will be updated by NextAuth, LoginForm's useEffect will handle redirection.
      // Toasting success here is fine. Name will be available from the session object.
      toast({
        title: t('login.successTitle'),
        description: language === 'en' ? `Welcome back!` : `خوش آمدید!`, // General welcome, name will be in dashboard
        variant: 'default',
      });
    }
  };

  const logout = () => {
    signOut({ redirect: true, callbackUrl: '/' }); 
    toast({
      title: t('logout.title'),
      description: t('logout.description'),
      variant: 'default',
    });
  };
  
  const register = async (name: string, email: string, password?: string) => {
    // Mock registration: In a real app, this would call an API endpoint
    // For NextAuth, registration usually involves creating a user in your DB
    // that CredentialsProvider can then authenticate against.
    // For now, we'll just redirect to login and show a success message.
    toast({
      title: t('register.successTitle'),
      description: language === 'en' ? `Welcome, ${name}! Proceed to login.` : `خوش آمدید، ${name}! لطفا وارد شوید.`,
      variant: 'default',
    });
    router.push('/login'); 
  };

  const updateAdminPassword = (currentPasswordAttempt: string, newPassword?: string): boolean => {
    // This is a mock function. In a real NextAuth setup with CredentialsProvider,
    // password changes would need to update the hashed password in your database.
    // This client-side mock won't persist for actual NextAuth login.
    if (!isAdmin) return false;
    
    toast({
      title: language === 'en' ? "Feature Info" : "اطلاعات ویژگی",
      description: language === 'en' ? "Admin password change is mocked and doesn't persist for NextAuth login in this demo." : "تغییر رمز عبور ادمین در این دمو شبیه‌سازی شده و برای ورود NextAuth پایدار نیست.",
    });
    // This check is purely illustrative as it's not connected to NextAuth's actual credential check
    if (currentPasswordAttempt === "Miladabi666@" && newPassword && newPassword.length >=6) {
        // console.log("Mock admin password updated to:", newPassword); // This doesn't actually change the password NextAuth uses
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
    <AuthContext.Provider value={{ isAuthenticated, user, isAdmin, status: nextAuthStatus, login, logout, register, updateAdminPassword }}>
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
