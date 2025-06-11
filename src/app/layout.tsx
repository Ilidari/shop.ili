
import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/layout/ClientProviders'; // Import the new component

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
    // LocalizationProvider, now inside ClientProviders, will handle setting lang and dir on <html>
    // Initial values here are fallbacks before client-side hydration.
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
