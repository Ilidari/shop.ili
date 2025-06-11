"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t, language } = useLocalization();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation, replace with Zod or similar for production
    if (!email || !password) {
      alert(language === 'en' ? 'Please fill in all fields.' : 'لطفا تمام فیلدها را پر کنید.');
      return;
    }
    login(email, 'Demo User'); // Mock login with a demo name
    router.push(redirectPath);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">{t('login.title')}</CardTitle>
        <CardDescription>
            {language === 'en' ? 'Access your account to manage your licenses and services.' : 'برای مدیریت لایسنس‌ها و سرویس‌های خود وارد حساب کاربری شوید.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{t('login.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={language === 'en' ? "you@example.com" : "you@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('login.password')}</Label>
            <div className="relative">
               <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg">
            {t('login.button')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('login.noAccount')}{' '}
          <Button variant="link" asChild className="p-0 h-auto text-primary">
             <Link href="/register">{t('login.registerLink')}</Link>
          </Button>
        </p>
        {/* Social login placeholders */}
        <p className="text-xs text-muted-foreground mt-4">{language === 'en' ? 'Or login with' : 'یا ورود با'}</p>
        <div className="flex space-x-2 rtl:space-x-reverse mt-2">
            <Button variant="outline" className="flex-1 h-11">Google</Button>
            <Button variant="outline" className="flex-1 h-11">Facebook</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
