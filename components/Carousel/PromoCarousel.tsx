"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  badge?: string;
}

interface PromoCarouselProps {
  items: PromoItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function PromoCarousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
}: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-brand-gray/90 backdrop-blur-md border border-brand-light/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-brand-gray/90 backdrop-blur-md border border-brand-light/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {currentItem.href ? (
                <Link href={currentItem.href}>
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-brand-gray border border-brand-light/20 group cursor-pointer">
                    {currentItem.badge && (
                      <div className="absolute top-4 right-4 z-10 bg-brand-red px-4 py-2 rounded-lg">
                        <span className="text-white font-bold text-sm uppercase">
                          {currentItem.badge}
                        </span>
                      </div>
                    )}
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-gray-400 dark:text-gray-300 text-sm uppercase mb-2">
                      {currentItem.subtitle}
                    </div>
                    <h3 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold group-hover:text-brand-red transition-colors">
                      {currentItem.title}
                    </h3>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-brand-gray border border-brand-light/20">
                  {currentItem.badge && (
                    <div className="absolute top-4 right-4 z-10 bg-brand-red px-4 py-2 rounded-lg">
                      <span className="text-white font-bold text-sm uppercase">
                        {currentItem.badge}
                      </span>
                    </div>
                  )}
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-gray-400 text-sm uppercase mb-2">
                      {currentItem.subtitle}
                    </div>
                    <h3 className="text-white text-3xl md:text-4xl font-bold">
                      {currentItem.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-brand-red w-8"
                    : "bg-brand-light w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

