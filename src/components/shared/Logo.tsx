"use client";
import Link from 'next/link';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Zap } from 'lucide-react'; // Example icon

export default function Logo({ className }: { className?: string }) {
  const { t } = useLocalization();
  return (
    <Link href="/" className={`flex items-center text-2xl font-bold font-headline text-primary hover:text-primary/90 transition-colors ${className}`}>
      <Zap className="h-7 w-7 mr-2 rtl:ml-2 rtl:mr-0 text-accent" />
      <span>{t('appName')}</span>
    </Link>
  );
}
