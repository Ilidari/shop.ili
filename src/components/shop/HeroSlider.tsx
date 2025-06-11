"use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSlide } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RadioButtonChecked, RadioButton } from 'lucide-react';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const { language, t } = useLocalization();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] rounded-lg overflow-hidden shadow-xl group">
      <div className="w-full h-full relative">
        <Image
          src={currentSlide.imageUrl}
          alt={currentSlide.title[language]}
          fill
          priority={currentIndex === 0} // Prioritize loading the first slide image
          className="object-cover transition-opacity duration-1000 ease-in-out"
          data-ai-hint={currentSlide.dataAiHint || "hero image"}
          key={currentSlide.id} // Force re-render for transition
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rtl:bg-gradient-to-l p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-white mb-4 max-w-xl">
            {currentSlide.title[language]}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-lg">
            {currentSlide.subtitle[language]}
          </p>
          <Button size="lg" variant="default" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
            <Link href={currentSlide.link}>
              {currentSlide.cta[language]}
            </Link>
          </Button>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={language === 'en' ? "Previous Slide" : "اسلاید قبلی"}
          >
            {language === 'en' ? <ChevronLeft /> : <ChevronRight /> }
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={language === 'en' ? "Next Slide" : "اسلاید بعدی"}
          >
            {language === 'en' ? <ChevronRight /> : <ChevronLeft /> }
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => setCurrentIndex(slideIndex)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex ? 'bg-accent scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`${language === 'en' ? "Go to slide" : "رفتن به اسلاید"} ${slideIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
