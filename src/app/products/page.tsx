"use client";
import { useState, useMemo } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter as FilterIcon, X } from 'lucide-react';

export default function ProductsPage() {
  const { t, language } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'license' | 'vps'>('all');
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...mockProducts];

    if (searchTerm) {
      products = products.filter(p =>
        p.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      products = products.filter(p => p.category === categoryFilter);
    }

    if (priceSort === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [searchTerm, categoryFilter, priceSort, language]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriceSort('none');
  };

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-muted/30 rounded-lg shadow">
        <h1 className="text-4xl font-headline font-bold text-primary">{t('allProducts')}</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {language === 'en' ? 'Browse our extensive collection of software licenses and VPS plans.' : 'مجموعه گسترده ما از لایسنس‌های نرم‌افزار و پلن‌های VPS را مرور کنید.'}
        </p>
      </header>

      <div className="sticky top-16 z-40 bg-background py-4 shadow-sm rounded-md -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          <div className="relative md:col-span-2 lg:col-span-2">
            <Input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl:pr-10 rtl:pl-3 h-12 text-base"
            />
            <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          
          <Select value={categoryFilter} onValueChange={(value: 'all' | 'license' | 'vps') => setCategoryFilter(value)}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder={language === 'en' ? "Category" : "دسته بندی"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'en' ? "All Categories" : "همه دسته بندی ها"}</SelectItem>
              <SelectItem value="license">{t('nav.licenses')}</SelectItem>
              <SelectItem value="vps">{t('nav.vps')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={(value: 'none' | 'asc' | 'desc') => setPriceSort(value)}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder={language === 'en' ? "Sort by Price" : "مرتب سازی بر اساس قیمت"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{language === 'en' ? "Default" : "پیش فرض"}</SelectItem>
              <SelectItem value="asc">{language === 'en' ? "Price: Low to High" : "قیمت: کم به زیاد"}</SelectItem>
              <SelectItem value="desc">{language === 'en' ? "Price: High to Low" : "قیمت: زیاد به کم"}</SelectItem>
            </SelectContent>
          </Select>
          
          {(searchTerm || categoryFilter !== 'all' || priceSort !== 'none') && (
            <Button variant="ghost" onClick={clearFilters} className="md:col-start-4 h-12 text-base">
              <X className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
              {language === 'en' ? "Clear Filters" : "پاک کردن فیلترها"}
            </Button>
          )}
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FilterIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            {language === 'en' ? 'No products match your criteria.' : 'هیچ محصولی با معیارهای شما مطابقت ندارد.'}
          </p>
          <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
            {language === 'en' ? 'Try clearing filters' : 'فیلترها را پاک کنید'}
          </Button>
        </div>
      )}
    </div>
  );
}
