"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ImageIcon } from 'lucide-react';
import AISuggestions from '@/components/shop/AISuggestions';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language, t, currencySymbol } = useLocalization();
  const { addToCart } = useCart();

  const product = mockProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold">{t('productNotFound')}</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/products">{t('allProducts')}</Link>
        </Button>
      </div>
    );
  }
  
  const categoryText = product.category === 'license' ? t('nav.licenses') : t('nav.vps');

  return (
    <div className="space-y-12">
      <article>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video relative w-full rounded-lg overflow-hidden shadow-lg border">
              <Image
                src={product.image}
                alt={product.name[language]}
                fill
                priority
                className="object-contain"
                data-ai-hint={product.dataAiHint || "product detail"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.screenshots && product.screenshots.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {product.screenshots.map((ss, index) => (
                  <div key={index} className="aspect-video relative w-full rounded-md overflow-hidden border hover:opacity-80 transition-opacity">
                    <Image
                      src={ss}
                      alt={`${product.name[language]} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint="product screenshot"
                       sizes="(max-width: 768px) 30vw, 15vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <Badge variant="secondary" className="capitalize">{categoryText}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{product.name[language]}</h1>
            
            <p className="text-2xl font-semibold text-accent">
              {currencySymbol}{product.price.toFixed(2)}
            </p>

            <div className="prose prose-lg max-w-none text-foreground/90" dangerouslySetInnerHTML={{ __html: product.description[language].replace(/\n/g, '<br />') }} />

            {product.features && product.features[language] && product.features[language].length > 0 && (
              <div>
                <h2 className="text-xl font-headline font-semibold mb-2">{t('features')}</h2>
                <ul className="space-y-2">
                  {product.features[language].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 rtl:ml-2 rtl:mr-0 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button
              size="lg"
              onClick={() => addToCart(product)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-6"
              aria-label={`${t('addToCart')} ${product.name[language]}`}
            >
              <ShoppingCart className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </article>

      <section aria-labelledby="ai-recommendations-title">
         <h2 id="ai-recommendations-title" className="sr-only">{t('aiRecommendations')}</h2>
        <AISuggestions browsingHistorySeed={[product.id]} currentProductId={product.id} />
      </section>
    </div>
  );
}
