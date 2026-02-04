"use client";

import Image from "next/image";
import { useHeroTranslations } from "@/hooks/useTranslations";

export default function Hero() {
  const t = useHeroTranslations();
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 to-white py-10 sm:py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab608027fe79?w=1920&h=1080&fit=crop&q=80"
          alt="Hero Background"
          fill
          className="object-cover opacity-10"
          priority
          unoptimized
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            {t.title}
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent">{t.subtitle}</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-3 sm:mb-4 leading-relaxed px-2">
            {t.description}
          </p>

          {/* Services List */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 mb-8 sm:mb-12 leading-relaxed px-2">
            {t.services}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <a
              href="#contact"
              className="hero-gradient-btn text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              {t.ctaContact}
            </a>
            <a
              href="#services"
              className="hero-gradient-btn text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              {t.ctaServices}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
