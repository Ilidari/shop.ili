"use client";
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CartItemDisplay from '@/components/shop/CartItemDisplay';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const { t, language, currencySymbol } = useLocalization();

  if (getItemCount() === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-semibold mb-4">{t('shoppingCart')}</h1>
        <p className="text-xl text-muted-foreground mb-2">{t('emptyCart')}</p>
        <p className="text-md text-muted-foreground mb-8">{t('emptyCartSuggestion')}</p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/products">{t('continueShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">{t('shoppingCart')}</h1>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              {language === 'en' ? `Your Items (${getItemCount()})` : `اقلام شما (${getItemCount()})`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y">
            {cartItems.map(item => (
              <CartItemDisplay key={item.id} item={item} />
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 sticky top-24 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('checkout.orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>{t('subtotal')}</span>
              <span>{currencySymbol}{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>{t('total')}</span>
              <span>{currencySymbol}{getCartTotal().toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-4">
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" asChild>
              <Link href="/checkout">{t('checkout')}</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={clearCart} className="w-full text-destructive border-destructive hover:bg-destructive/10">
              {language === 'en' ? 'Clear Cart' : 'خالی کردن سبد'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
