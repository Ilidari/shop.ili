"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemDisplayProps {
  item: CartItem;
}

export default function CartItemDisplay({ item }: CartItemDisplayProps) {
  const { language, t, currencySymbol } = useLocalization();
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b">
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border">
          <Image
            src={item.image}
            alt={item.name[language]}
            fill
            className="object-cover"
            data-ai-hint={item.dataAiHint || "product cart"}
            sizes="(max-width: 640px) 96px, 128px"
          />
        </div>
      </Link>

      <div className="flex-grow text-center sm:text-left">
        <Link href={`/products/${item.slug}`} className="hover:text-primary transition-colors">
          <h3 className="text-lg font-semibold font-headline">{item.name[language]}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {item.category === 'license' ? t('nav.licenses') : t('nav.vps')}
        </p>
        <p className="text-md font-semibold text-primary mt-1">
          {currencySymbol}{item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1} aria-label={language === "en" ? "Decrease quantity" : "کاهش تعداد"}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="w-16 h-10 text-center"
          min="1"
          aria-label={language === "en" ? "Quantity" : "تعداد"}
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)} aria-label={language === "en" ? "Increase quantity" : "افزایش تعداد"}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-md font-semibold w-24 text-center sm:text-right">
        {currencySymbol}{(item.price * item.quantity).toFixed(2)}
      </p>

      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80" aria-label={language === "en" ? "Remove item" : "حذف آیتم"}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
