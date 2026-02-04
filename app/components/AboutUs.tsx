"use client";

import { useAboutUsTranslations } from "@/hooks/useTranslations";

export default function AboutUs() {
  const t = useAboutUsTranslations();
  return (
    <section id="about" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
          </div>

          {/* Single Blue Gradient Card with All Information */}
          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-white shadow-xl">
            {/* Features Section */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl text-center border border-white/20">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.features.prices}</div>
                  <div className="text-sm sm:text-base text-white/90">{t.features.pricesSub}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl text-center border border-white/20">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.features.warranty}</div>
                  <div className="text-sm sm:text-base text-white/90">{t.features.warrantySub}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl text-center border border-white/20">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.features.chooseTime}</div>
                  <div className="text-sm sm:text-base text-white/90">{t.features.chooseTimeSub}</div>
                </div>
              </div>
            </div>

            {/* Why Choose Our Services Section */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                {t.whyChoose}
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-white/95">
                {t.description1}
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95">
                {t.description2}
              </p>
            </div>

            {/* Mission Statement */}
            <div className="border-t border-white/20 pt-6 sm:pt-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
                {t.missionTitle}
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center text-white/95">
                {t.missionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
