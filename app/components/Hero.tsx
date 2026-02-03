"use client";

import Image from "next/image";
import { useHeroTranslations } from "@/hooks/useTranslations";

export default function Hero() {
  const t = useHeroTranslations();
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 to-white py-20 sm:py-32 md:py-48 overflow-hidden">
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
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">{t.subtitle}</span>
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 sm:mb-24 px-4">
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              {t.ctaContact}
            </a>
            <a
              href="#services"
              className="bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto"
            >
              {t.ctaServices}
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mt-12 sm:mt-16 px-4">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg text-center transition-all duration-300 border border-slate-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">
              1+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">{t.stats.years}</div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg text-center transition-all duration-300 border border-slate-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-600 mb-1 sm:mb-2">
              10k+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">{t.stats.clients}</div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg text-center transition-all duration-300 border border-slate-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-1 sm:mb-2">
              1+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">{t.stats.homes}</div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg text-center transition-all duration-300 border border-slate-100">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-1 sm:mb-2">
              1+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-600 font-medium">{t.stats.technicians}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
