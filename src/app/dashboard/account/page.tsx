"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { user, login } = useAuth(); // Using login to update user details for mock
  const { t, language } = useLocalization();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || ''); // Email usually not changeable or needs verification
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
        login(user.email, name); // Mock update
        toast({ title: t('account.save') + (language === 'en' ? 'd!' : ' شد!'), description: language === 'en' ? 'Account details updated.' : 'جزئیات حساب به‌روزرسانی شد.' });
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({ title: language === 'en' ? 'Error' : 'خطا', description: language === 'en' ? 'New passwords do not match.' : 'رمزهای عبور جدید مطابقت ندارند.', variant: 'destructive' });
      return;
    }
    if (!currentPassword || !newPassword) {
      toast({ title: language === 'en' ? 'Error' : 'خطا', description: language === 'en' ? 'Please fill all password fields.' : 'لطفاً تمام فیلدهای رمز عبور را پر کنید.', variant: 'destructive' });
      return;
    }
    // Mock password change
    console.log('Password change submitted:', { currentPassword, newPassword });
    toast({ title: t('account.changePassword') + (language === 'en' ? ' Successful!' : ' با موفقیت انجام شد!'), description: language === 'en' ? 'Your password has been changed.' : 'رمز عبور شما تغییر کرد.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-headline font-bold">{t('account.title')}</h1>

      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">{language === 'en' ? 'Personal Information' : 'اطلاعات شخصی'}</CardTitle>
          <CardDescription>{language === 'en' ? 'Update your name and email address.' : 'نام و آدرس ایمیل خود را به‌روز کنید.'}</CardDescription>
        </CardHeader>
        <form onSubmit={handleDetailsSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">{t('account.name')}</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="email">{t('account.email')}</Label>
              <Input id="email" type="email" value={email} disabled className="mt-1 h-11 bg-muted/50" /> {/* Usually email is not directly editable */}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-11">
              {t('account.save')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">{t('account.changePassword')}</CardTitle>
           <CardDescription>{language === 'en' ? 'Choose a strong new password.' : 'یک رمز عبور قوی جدید انتخاب کنید.'}</CardDescription>
        </CardHeader>
        <form onSubmit={handleChangePasswordSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{t('account.currentPassword')}</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="newPassword">{t('account.newPassword')}</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">{t('account.confirmNewPassword')}</Label>
              <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="mt-1 h-11" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-11">
              {t('account.changePassword')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
