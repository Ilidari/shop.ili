
"use client"; 
import React, { useEffect } from 'react'; // Removed useState
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAdmin, status } = useAuth(); 
  const router = useRouter();
  const { t, language } = useLocalization();
  
  useEffect(() => {
    if (status === 'loading') {
      return; // Wait for auth status to be determined
    }

    if (!isAuthenticated) {
      router.push('/login?redirect=/admin/dashboard');
    } else if (!isAdmin && status === 'authenticated') { 
      // If authenticated but not admin, the content below will show access denied.
      // No explicit redirect here to allow the "Access Denied" message to show.
    }
  }, [isAuthenticated, isAdmin, router, status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated && status === 'unauthenticated') {
    // This case is primarily handled by the redirect in useEffect,
    // but this is a fallback rendering state.
    return (
      <div className="flex items-center justify-center min-h-screen">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-2">{language === 'en' ? "Redirecting to login..." : "در حال انتقال به صفحه ورود..."}</p>
      </div>
    );
  }
  
  if (isAuthenticated && !isAdmin) { // Check after loading and authentication
    return (
       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">{t('admin.accessDenied')}</h1>
        <p className="text-muted-foreground">
            {language === 'en' ? "You must be an administrator to access this area." : "برای دسترسی به این بخش باید مدیر باشید."}
        </p>
        <button onClick={() => router.push('/')} className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            {language === 'en' ? "Go to Homepage" : "رفتن به صفحه اصلی"}
        </button>
      </div>
    );
  }

  // If authenticated and is admin
  if (isAuthenticated && isAdmin) {
    return (
      <div className="flex flex-col md:flex-row gap-8 items-start py-8">
        <AdminSidebar />
        <main className="flex-1 bg-card p-6 sm:p-8 rounded-lg shadow-lg min-h-[calc(100vh-15rem)]">
          {children}
        </main>
      </div>
    );
  }

  // Fallback for any other state (e.g. if somehow isAuthenticated is false but status is not 'unauthenticated' yet)
  // This usually means it's still effectively loading or in an indeterminate state before redirection.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
