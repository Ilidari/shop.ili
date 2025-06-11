"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { user, updateAdminPassword } = useAuth();
  const { t, language } = useLocalization();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({ title: t('admin.passwordUpdateErrorMatch'), variant: 'destructive' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast({ title: t('admin.passwordNewInvalid'), variant: 'destructive' });
      return;
    }
    
    const success = updateAdminPassword(currentPassword, newPassword);
    if (success) {
      // Toast is handled in updateAdminPassword for success/specific errors
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
    // If updateAdminPassword returns false and hasn't shown a toast, it might be an unknown error
    // or permission issue not covered by specific toasts there.
  };

  if (!user || !user.isAdmin) {
    // This page should be protected by AdminLayout, but as a fallback:
    return (
      <div>
        <h1 className="text-2xl font-bold text-destructive">{t('admin.accessDenied')}</h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-headline font-bold">{t('admin.settings')}</h1>

      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">{t('account.changePassword')}</CardTitle>
          <CardDescription>{t('admin.settingsDescription')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleChangePasswordSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{t('admin.currentPassword')}</Label>
              <Input 
                id="currentPassword" 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required
                className="mt-1 h-11" 
              />
            </div>
            <div>
              <Label htmlFor="newPassword">{t('admin.newPassword')}</Label>
              <Input 
                id="newPassword" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required
                className="mt-1 h-11" 
              />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">{t('admin.confirmNewPassword')}</Label>
              <Input 
                id="confirmNewPassword" 
                type="password" 
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)} 
                required
                className="mt-1 h-11" 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-11">
              {t('admin.updatePasswordButton')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
