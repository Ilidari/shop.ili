"use client"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext'; // Import useLocalization

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const router = useRouter();
  const { t, language } = useLocalization(); // Get t and language
  
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/login?redirect=/admin/dashboard');
      } else if (!isAdmin) {
        // Non-admin users are redirected or shown an access denied message.
        // For now, let's keep them on this page but show a message.
        // Or redirect: router.push('/'); 
      }
      setAuthChecked(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, router]);


  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the redirect in useEffect,
    // but as a fallback or if redirect hasn't happened yet:
    return (
      <div className="flex items-center justify-center min-h-screen">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-2">{language === 'en' ? "Redirecting to login..." : "در حال انتقال به صفحه ورود..."}</p>
      </div>
    );
  }
  
  if (!isAdmin) {
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


  return (
    <div className="flex flex-col md:flex-row gap-8 items-start py-8">
      <AdminSidebar />
      <main className="flex-1 bg-card p-6 sm:p-8 rounded-lg shadow-lg min-h-[calc(100vh-15rem)]">
        {children}
      </main>
    </div>
  );
}
