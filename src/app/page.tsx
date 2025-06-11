"use client";
import HeroSlider from '@/components/shop/HeroSlider';
import ProductCard from '@/components/shop/ProductCard';
import AISuggestions from '@/components/shop/AISuggestions';
import { mockProducts, mockHeroSlides } from '@/data/products';
import { useLocalization } from '@/contexts/LocalizationContext';

export default function HomePage() {
  const { t, language } = useLocalization();
  
  // Select a few products as popular, e.g., first 3-4
  const popularProducts = mockProducts.slice(0, 4);

  return (
    <div className="space-y-12">
      <section aria-labelledby="hero-section-title">
         <h2 id="hero-section-title" className="sr-only">{t('hero.mainTitle')}</h2>
        <HeroSlider slides={mockHeroSlides} />
      </section>

      <section aria-labelledby="popular-products-title">
        <h2 id="popular-products-title" className="text-3xl font-headline font-semibold mb-8 text-center">
          {t('popularProducts')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section aria-labelledby="ai-recommendations-title">
        <h2 id="ai-recommendations-title" className="sr-only">{t('aiRecommendations')}</h2>
        {/* Example: using IDs of first two popular products as browsing history seed */}
        <AISuggestions browsingHistorySeed={popularProducts.slice(0,2).map(p => p.id)} />
      </section>
    </div>
  );
}
