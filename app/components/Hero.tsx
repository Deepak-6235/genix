"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeroTranslations } from "@/hooks/useTranslations";

export default function Hero() {
  const t = useHeroTranslations();
  return (
    <section
      id="home"
      className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-5rem)] flex items-center py-20 overflow-hidden"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t.title}
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-secondary-300 to-primary-400 bg-clip-text text-transparent">{t.subtitle}</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-5 leading-relaxed px-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t.description}
          </p>

          {/* Services List */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-5 leading-relaxed px-2"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t.services}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              href="/contact"
              className="hero-gradient-btn text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto inline-block"
            >
              {t.ctaContact}
            </Link>
            <Link
              href="/services"
              className="hero-gradient-btn text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto inline-block"
            >
              {t.ctaServices}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
