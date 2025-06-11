"use client";
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useLocalization } from '@/contexts/LocalizationContext';

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLocalization(); // Ensures context is ready

  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
