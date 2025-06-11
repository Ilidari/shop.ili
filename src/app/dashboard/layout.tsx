
"use client"; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Loader2 } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, status } = useAuth(); 
  const router = useRouter();
  const { language } = useLocalization(); 
  
  useEffect(() => {
    if (status === 'loading') {
      return; 
    }

    if (!isAuthenticated && status === 'unauthenticated') { // Only redirect if definitively unauthenticated
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, router, status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAuthenticated && status === 'unauthenticated') {
     return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">{language === 'en' ? "Redirecting to login..." : "در حال انتقال به صفحه ورود..."}</p>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return (
      <div className="flex flex-col md:flex-row gap-8 items-start py-8">
        <DashboardSidebar />
        <main className="flex-1 bg-card p-6 sm:p-8 rounded-lg shadow-lg min-h-[calc(100vh-15rem)]">
          {children}
        </main>
      </div>
    );
  }

  // Fallback loading state if status is not yet 'unauthenticated' but not 'authenticated' either.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
