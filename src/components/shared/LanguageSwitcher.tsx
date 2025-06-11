"use client";
import { useLocalization } from '@/contexts/LocalizationContext';
import type { Language } from '@/types';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLocalization();

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Switch language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'en' ? "end" : "start"}>
        <DropdownMenuItem onClick={() => switchLanguage('en')} disabled={language === 'en'}>
          {t('lang.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('fa')} disabled={language === 'fa'}>
          {t('lang.fa')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
