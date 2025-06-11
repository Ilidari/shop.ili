"use client"; // Required for useAuth and potentially other hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  // This effect will run on the client after hydration
  const [authChecked, setAuthChecked] = React.useState(false);

  useEffect(() => {
    // Give a moment for auth state to be potentially loaded from localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/login?redirect=/dashboard');
      }
      setAuthChecked(true);
    }, 100); // Small delay to allow AuthProvider to initialize
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);


  if (!authChecked || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start py-8">
      <DashboardSidebar />
      <main className="flex-1 bg-card p-6 sm:p-8 rounded-lg shadow-lg min-h-[calc(100vh-15rem)]">
        {children}
      </main>
    </div>
  );
}
