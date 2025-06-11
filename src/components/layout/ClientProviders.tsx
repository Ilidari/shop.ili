
"use client";

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import MainAppLayout from '@/components/layout/MainAppLayout';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LocalizationProvider>
        <AuthProvider>
          <CartProvider>
            {/* MainAppLayout already contains Header, Footer, Toaster and the main content area */}
            {/* It will receive the page children from RootLayout via ClientProviders */}
            <MainAppLayout>{children}</MainAppLayout>
          </CartProvider>
        </AuthProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}
