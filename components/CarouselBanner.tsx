"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/utils/trpc";

/**
 * Carousel Banner Component
 * Features:
 * - Auto-rotating slides
 * - Manual navigation with arrows
 * - Dot indicators
 * - Fetches banner data from tRPC API
 */
export default function CarouselBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // This is where tRPC magic happens!
  // We call the backend API with full type safety
  const { data: banners, isLoading } = trpc.getBanners.useQuery();

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (!banners) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  const nextSlide = () => {
    if (!banners) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (!banners) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (isLoading) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative h-96 overflow-hidden">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {banner.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
              <button className="px-8 py-3 bg-white text-white-600 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
