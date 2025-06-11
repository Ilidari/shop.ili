
"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // login from our context now uses signIn('credentials')
  const { t, language } = useLocalization();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const defaultRedirectPath = '/dashboard';
  const adminRedirectPath = '/admin/dashboard';
  const redirectParam = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert(language === 'en' ? 'Please fill in all fields.' : 'لطفا تمام فیلدها را پر کنید.');
      return;
    }
    // login function in AuthContext now calls signIn from NextAuth
    // We let NextAuth handle redirection by default by not setting redirect: false here
    // or by setting appropriate callbackUrl.
    await login(email, password);
  };

  const handleGoogleSignIn = async () => {
    // Determine callbackUrl based on potential redirect or default
    let callbackUrl = defaultRedirectPath;
    if (redirectParam && !redirectParam.startsWith('/admin')) {
      callbackUrl = redirectParam;
    }
    // Note: Google sign-in won't know if a user *should* be admin based on email beforehand
    // Admin status check will happen based on session email after successful Google sign-in
    await signIn('google', { callbackUrl });
  };
  
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const isAdminUser = (session.user as any).isAdmin === true; // Ensure isAdmin is correctly accessed
      if (isAdminUser) {
        router.push(adminRedirectPath);
      } else {
        const finalRedirectPath = (redirectParam && !redirectParam.startsWith('/admin')) ? redirectParam : defaultRedirectPath;
        router.push(finalRedirectPath);
      }
    }
  }, [status, session, router, redirectParam, defaultRedirectPath, adminRedirectPath]);


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
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg" disabled={status === 'loading'}>
            {status === 'loading' ? (language === 'en' ? 'Logging in...' : 'درحال ورود...') : t('login.button')}
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
        <p className="text-xs text-muted-foreground mt-4">{language === 'en' ? 'Or login with' : 'یا ورود با'}</p>
        <div className="flex space-x-2 rtl:space-x-reverse mt-2 w-full">
            <Button variant="outline" className="flex-1 h-11" onClick={handleGoogleSignIn} disabled={status === 'loading'}>
              Google
            </Button>
            <Button variant="outline" className="flex-1 h-11" disabled={true}>
              Facebook {/* Facebook login not implemented */}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
