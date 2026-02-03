"use client";

import Image from "next/image";
import { useAboutUsTranslations } from "@/hooks/useTranslations";

export default function AboutUs() {
  const t = useAboutUsTranslations();
  return (
    <section id="about" className="py-20 sm:py-32 md:py-40 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Content */}
            <div className="order-2 md:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                {t.whyChoose}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
                {t.description1}
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
                {t.description2}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden order-1 md:order-2 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab608027fe79?w=800&h=600&fit=crop&q=80"
                alt="About Rukn Al-Nakheel"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{t.features.prices}</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">{t.features.pricesSub}</div>
              </div>
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">{t.features.warranty}</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">{t.features.warrantySub}</div>
              </div>
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center col-span-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">{t.features.chooseTime}</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">{t.features.chooseTimeSub}</div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-16 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              {t.missionTitle}
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4">
              {t.missionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
