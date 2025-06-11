"use client";
import React, { useEffect, useState } from 'react';
import { getProductRecommendations, type ProductRecommendationsInput } from '@/ai/flows/product-recommendations';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AISuggestionsProps {
  browsingHistorySeed?: string[]; // Array of product IDs
  currentProductId?: string; // To avoid recommending the current product
  maxRecommendations?: number;
}

export default function AISuggestions({ browsingHistorySeed = [], currentProductId, maxRecommendations = 3 }: AISuggestionsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLocalization();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate browsing history if not provided, or enhance it
        let historyInput = browsingHistorySeed.join(',');
        if (!historyInput && mockProducts.length > 0) {
           // Take first few products if no seed
           historyInput = mockProducts.slice(0, Math.min(3, mockProducts.length)).map(p => p.id).join(',');
        }
        
        const input: ProductRecommendationsInput = { browsingHistory: historyInput || "generic software, vps hosting" };
        const result = await getProductRecommendations(input);
        
        if (result && result.recommendations) {
          const recommendedIds = result.recommendations.split(',').map(id => id.trim());
          const suggestedProducts = mockProducts.filter(p => 
            recommendedIds.includes(p.id) && p.id !== currentProductId
          ).slice(0, maxRecommendations);
          setRecommendations(suggestedProducts);
        } else {
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Error fetching AI recommendations:", err);
        setError(language === 'en' ? "Could not load recommendations." : "بارگذاری پیشنهادات با مشکل مواجه شد.");
        setRecommendations([]); // Fallback to empty or popular items could be an option here
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [browsingHistorySeed, currentProductId, language, maxRecommendations]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 rtl:mr-2 rtl:ml-0">{language === 'en' ? 'Loading recommendations...' : 'درحال بارگذاری پیشنهادات...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>{language === 'en' ? 'Error' : 'خطا'}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (recommendations.length === 0 && !error) {
    // Optionally, show nothing or a "no recommendations" message
    // For now, returning null to keep UI clean if no specific suggestions.
    return null; 
  }


  return (
    <div className="py-8">
      <h2 className="text-2xl font-headline font-semibold mb-6 text-center">{t('aiRecommendations')}</h2>
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         !error && <p className="text-center text-muted-foreground">{language === 'en' ? 'No specific recommendations for you at the moment.' : 'در حال حاضر پیشنهاد خاصی برای شما وجود ندارد.'}</p>
      )}
    </div>
  );
}
