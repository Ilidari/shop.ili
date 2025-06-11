"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, UserCircle, KeyRound, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t, language } = useLocalization();

  if (!user) return null; // Should be handled by layout, but good practice

  const overviewCards = [
    { titleKey: 'dashboard.orders', icon: ShoppingBag, link: '/dashboard/orders', descriptionKey: 'View your recent orders and track their status.'},
    { titleKey: 'dashboard.account', icon: UserCircle, link: '/dashboard/account', descriptionKey: 'Manage your profile and password.'},
    { titleKey: 'dashboard.licenses', icon: KeyRound, link: '/dashboard/licenses', descriptionKey: 'Access your purchased software licenses and VPS details.'},
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">
        {t('dashboard.welcome', { name: user.name })}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewCards.map(card => (
          <Card key={card.titleKey} className="shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold font-headline">{t(card.titleKey)}</CardTitle>
              <card.icon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' ? card.descriptionKey : (card.titleKey === 'dashboard.orders' ? 'سفارشات اخیر خود را مشاهده و وضعیت آنها را پیگیری کنید.' : card.titleKey === 'dashboard.account' ? 'پروفایل و رمز عبور خود را مدیریت کنید.' : 'به لایسنس‌های نرم‌افزار خریداری شده و جزئیات VPS خود دسترسی پیدا کنید.')}
              </p>
              <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/5">
                <Link href={card.link}>
                  {language === 'en' ? 'Go to ' : 'رفتن به '} {t(card.titleKey)}
                  <ExternalLink className={`ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4 ${language === 'fa' ? 'transform -scale-x-100' : ''}`} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md rounded-lg">
        <CardHeader>
            <CardTitle className="text-xl font-semibold font-headline">{language === 'en' ? 'Quick Actions' : 'اقدامات سریع'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/products">{language === 'en' ? 'Browse New Products' : 'مرور محصولات جدید'}</Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/contact">{language === 'en' ? 'Contact Support' : 'تماس با پشتیبانی'}</Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
