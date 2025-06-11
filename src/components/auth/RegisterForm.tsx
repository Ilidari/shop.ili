"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { User, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const { t, language } = useLocalization();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(language === 'en' ? 'Passwords do not match.' : 'رمزهای عبور مطابقت ندارند.');
      return;
    }
    // Basic validation
    if (!name || !email || !password) {
      alert(language === 'en' ? 'Please fill in all fields.' : 'لطفا تمام فیلدها را پر کنید.');
      return;
    }
    register(name, email); // Mock register
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">{t('register.title')}</CardTitle>
        <CardDescription>
            {language === 'en' ? 'Join ili shop to access exclusive deals and services.' : 'به ایلی شاپ بپیوندید تا به معاملات و خدمات انحصاری دسترسی پیدا کنید.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('register.name')}</Label>
             <div className="relative">
                <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('register.email')}</Label>
            <div className="relative">
                <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('register.password')}</Label>
             <div className="relative">
                <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
            <div className="relative">
                <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg">
            {t('register.button')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('register.hasAccount')}{' '}
          <Button variant="link" asChild className="p-0 h-auto text-primary">
            <Link href="/login">{t('register.loginLink')}</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
