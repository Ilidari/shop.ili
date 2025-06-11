"use client";
import { useLocalization } from '@/contexts/LocalizationContext';
import { KeyRound, Server, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for licenses/services
const mockUserLicenses = [
  { id: 'lic_001', name: { en: 'Ultimate OS License - Annual', fa: 'لایسنس سیستم عامل نهایی - سالانه' }, type: 'license', expiryDate: '2024-12-31', status: 'Active', downloadLink: '#', productSlug: 'ultimate-os-license' },
  { id: 'vps_serv_001', name: { en: 'Basic VPS Plan', fa: 'پلن VPS پایه' }, type: 'vps', expiryDate: '2024-11-30', status: 'Active', manageLink: '#', productSlug: 'basic-vps-plan' },
  { id: 'lic_002', name: { en: 'Pro Design Suite - Expired', fa: 'مجموعه طراحی حرفه‌ای - منقضی شده' }, type: 'license', expiryDate: '2023-08-15', status: 'Expired', downloadLink: '#', productSlug: 'pro-design-suite' },
];


export default function LicensesPage() {
  const { t, language } = useLocalization();

  const getStatusBadge = (status: string) => {
    if (language === 'fa') {
        status = status === 'Active' ? 'فعال' : status === 'Expired' ? 'منقضی شده' : status;
    }
    return (
        <Badge variant={status === (language === 'fa' ? 'فعال' : 'Active') ? 'default' : 'destructive'} 
               className={status === (language === 'fa' ? 'فعال' : 'Active') ? 'bg-green-500 text-white' : ''}>
            {status}
        </Badge>
    );
  };


  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-headline font-bold">{t('dashboard.licenses')}</h1>

      {mockUserLicenses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <KeyRound className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            {language === 'en' ? 'You have no active licenses or services.' : 'شما هیچ لایسنس یا سرویس فعالی ندارید.'}
          </p>
           <Button asChild variant="link" className="mt-2 text-primary">
            <Link href="/products">{t('continueShopping')}</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {mockUserLicenses.map(item => (
            <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow rounded-lg">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-headline">{item.name[language]}</CardTitle>
                  <CardDescription className="capitalize">
                    {item.type === 'license' ? t('nav.licenses') : t('nav.vps')}
                  </CardDescription>
                </div>
                {getStatusBadge(item.status)}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Expiry Date: ' : 'تاریخ انقضا: '} 
                  {new Date(item.expiryDate).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                {item.type === 'license' && item.status === 'Active' && (
                  <Button variant="outline" asChild>
                    <a href={item.downloadLink} download>
                      <Download className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                      {language === 'en' ? 'Download License' : 'دانلود لایسنس'}
                    </a>
                  </Button>
                )}
                {item.type === 'vps' && item.status === 'Active' && (
                  <Button variant="outline" asChild>
                    <a href={item.manageLink}>
                      <Server className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                      {language === 'en' ? 'Manage Service' : 'مدیریت سرویس'}
                    </a>
                  </Button>
                )}
                 <Button variant="link" asChild className="text-primary">
                  <Link href={`/products/${item.productSlug}`}>
                    <FileText className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                    {language === 'en' ? 'View Product Details' : 'مشاهده جزئیات محصول'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Added import
import Link from 'next/link';
