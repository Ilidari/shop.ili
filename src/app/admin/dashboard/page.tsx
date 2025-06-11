"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingBag, Users, BarChart3 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { t, language } = useLocalization();

  if (!user) return null;

  const overviewCards = [
    { titleKey: 'admin.products', icon: Package, link: '/admin/products', description: language === 'en' ? 'Manage all products, categories, and inventory.' : 'مدیریت تمامی محصولات، دسته‌بندی‌ها و موجودی.'},
    { titleKey: 'admin.orders', icon: ShoppingBag, link: '/admin/orders', description: language === 'en' ? 'View and process customer orders.' : 'مشاهده و پردازش سفارشات مشتریان.'},
    { titleKey: 'admin.users', icon: Users, link: '/admin/users', description: language === 'en' ? 'Manage user accounts and roles.' : 'مدیریت حساب‌های کاربری و نقش‌ها.'},
    // { titleKey: 'admin.reports', icon: BarChart3, link: '/admin/reports', description: language === 'en' ? 'View sales reports and analytics.' : 'مشاهده گزارشات فروش و تحلیل‌ها.' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">
        {t('admin.welcome', { name: user.name })}
      </h1>
      
      <Card className="bg-primary/5 border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">{language === 'en' ? 'Quick Start' : 'شروع سریع'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {language === 'en' ? 'Use the sidebar to navigate through different management sections. You can manage products, view orders, and oversee user accounts.' : 'از سایدبار برای پیمایش در بخش‌های مختلف مدیریتی استفاده کنید. می‌توانید محصولات را مدیریت کنید، سفارشات را مشاهده کنید و بر حساب‌های کاربری نظارت داشته باشید.'}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewCards.map(card => (
          <Card key={card.titleKey} className="shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold font-headline">{t(card.titleKey)}</CardTitle>
              <card.icon className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 h-12">{card.description}</p>
              <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/5">
                <Link href={card.link}>
                  {language === 'en' ? 'Go to ' : 'رفتن به '} {t(card.titleKey)}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
