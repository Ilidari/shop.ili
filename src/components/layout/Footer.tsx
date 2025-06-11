"use client";
import Link from 'next/link';
import { useLocalization } from '@/contexts/LocalizationContext';
import Logo from '@/components/shared/Logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLocalization();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', labelKey: 'footer.about' },
    { href: '/contact', labelKey: 'footer.contact' },
    { href: '/terms', labelKey: 'footer.terms' },
    { href: '/privacy', labelKey: 'footer.privacy' },
  ];

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border/40 text-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm">
              {language === 'en' 
                ? 'Your trusted source for software licenses and VPS solutions. We are committed to providing top-quality digital products and services.'
                : 'منبع معتبر شما برای لایسنس‌های نرم‌افزار و راهکارهای VPS. ما متعهد به ارائه محصولات و خدمات دیجیتال با کیفیت بالا هستیم.'
              }
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">{language === 'en' ? 'Quick Links' : 'دسترسی سریع'}</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.labelKey}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">{language === 'en' ? 'Follow Us' : 'ما را دنبال کنید'}</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map(social => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-foreground/60 hover:text-primary transition-colors">
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
             <p className="text-sm mt-4">{language === 'en' ? 'Stay updated with our latest offers and news.' : 'از آخرین پیشنهادات و اخبار ما مطلع شوید.'}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-border/60 pt-8 text-center text-sm">
          <p>{t('footer.copyright', { year: currentYear.toString() })}</p>
        </div>
      </div>
    </footer>
  );
}
