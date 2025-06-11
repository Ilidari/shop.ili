"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Lock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';


export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t, language, currencySymbol } = useLocalization();
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'creditCard',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order placement
    console.log('Order submitted:', { ...formData, items: cartItems, total: getCartTotal() });
    toast({
      title: t('checkout.placeOrder') + (language === 'en' ? ' Successful!' : ' با موفقیت انجام شد!'),
      description: language === 'en' ? 'Your order has been placed.' : 'سفارش شما ثبت شد.',
    });
    clearCart();
    router.push('/dashboard/orders'); // Redirect to orders page or a thank you page
  };

  if (getItemCount() === 0 && !isAuthenticated) { // Redirect if cart is empty and not logged in
      if (typeof window !== 'undefined') router.push('/cart');
      return <div className="text-center py-12">{language === 'en' ? "Redirecting..." : "در حال انتقال..."}</div>;
  }
  
  if (getItemCount() === 0 && isAuthenticated) { // Redirect if cart is empty but logged in
      if (typeof window !== 'undefined') router.push('/products');
      return <div className="text-center py-12">{language === 'en' ? "Your cart is empty. Redirecting to products..." : "سبد خرید شما خالی است. در حال انتقال به صفحه محصولات..."}</div>;
  }


  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">{t('checkout.title')}</h1>

      {!isAuthenticated && (
        <Card className="bg-yellow-50 border-yellow-300 shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-yellow-700">{language === 'en' ? 'Login for a smoother checkout' : 'برای تسویه حساب سریعتر وارد شوید'}</CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-600">
            <p>
              {language === 'en' ? 'Already have an account? ' : 'قبلاً حساب کاربری ایجاد کرده‌اید؟ '}
              <Link href={`/login?redirect=/checkout`} className="font-semibold underline hover:text-yellow-700">
                {t('login.button')}
              </Link>
              {language === 'en' ? ' to use your saved details.' : ' تا از اطلاعات ذخیره شده خود استفاده کنید.'}
            </p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('checkout.billingDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">{language === 'en' ? 'Full Name' : 'نام کامل'}</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">{language === 'en' ? 'Address' : 'آدرس'}</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="city">{language === 'en' ? 'City' : 'شهر'}</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
            <div>
              <Label htmlFor="postalCode">{language === 'en' ? 'Postal Code' : 'کد پستی'}</Label>
              <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="country">{language === 'en' ? 'Country' : 'کشور'}</Label>
              <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required className="mt-1 h-11" />
            </div>
          </CardContent>
          
          <CardHeader className="pt-6 border-t mt-6">
            <CardTitle className="text-2xl font-headline">{t('checkout.paymentMethod')}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="creditCard" id="creditCard" />
                <Label htmlFor="creditCard">{language === 'en' ? 'Credit Card (Mock)' : 'کارت اعتباری (نمونه)'}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">{language === 'en' ? 'PayPal (Mock)' : 'پی‌پال (نمونه)'}</Label>
              </div>
               <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="iranianGateway" id="iranianGateway" />
                <Label htmlFor="iranianGateway">{language === 'en' ? 'Iranian Payment Gateway (Mock)' : 'درگاه پرداخت ایرانی (نمونه)'}</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground mt-4 flex items-center">
              <Lock className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" /> 
              {language === 'en' ? 'Your payment information is secure.' : 'اطلاعات پرداخت شما امن است.'}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 sticky top-24 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('checkout.orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 divide-y">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center pt-3 first:pt-0">
                <div>
                  <p className="font-semibold">{item.name[language]}</p>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? `Qty: ` : `تعداد: `}{item.quantity}</p>
                </div>
                <p className="font-medium">{currencySymbol}{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between text-xl font-bold pt-4">
              <span>{t('total')}</span>
              <span>{currencySymbol}{getCartTotal().toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
              {t('checkout.placeOrder')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
