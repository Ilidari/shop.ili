import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import MainAppLayout from '@/components/layout/MainAppLayout';

export const metadata: Metadata = {
  title: 'ili shop - Software Licenses & VPS',
  description: 'Your one-stop shop for premium software licenses and high-performance VPS services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The LocalizationProvider will set lang and dir on <html>
    // Initial values here are just fallbacks before client-side hydration.
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LocalizationProvider>
          <AuthProvider>
            <CartProvider> {/* CartProvider needs Localization for toasts */}
              <MainAppLayout>{children}</MainAppLayout>
            </CartProvider>
          </AuthProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
