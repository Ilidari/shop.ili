"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t, currencySymbol } = useLocalization();
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg h-full">
      <Link href={`/products/${product.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-[3/2] relative w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name[language]}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAiHint || "product image"}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`} className="block">
          <CardTitle className="text-lg font-headline mb-1 hover:text-primary transition-colors truncate">
            {product.name[language]}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden text-ellipsis">
          {product.description[language].substring(0, 70)}...
        </CardDescription>
        <p className="text-xl font-semibold text-primary">
          {currencySymbol}{product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <Button
          onClick={() => addToCart(product)}
          className="w-full sm:w-auto flex-grow bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={`${t('addToCart')} ${product.name[language]}`}
        >
          <ShoppingCart className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          {t('addToCart')}
        </Button>
        <Button
          variant="outline"
          asChild
          className="w-full sm:w-auto flex-grow"
        >
          <Link href={`/products/${product.slug}`}>
            <Eye className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
            {t('viewDetails')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
