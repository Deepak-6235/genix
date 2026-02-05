"use client";

import Image from "next/image";
import { useAboutUsTranslations } from "@/hooks/useTranslations";

export default function AboutUs() {
  const t = useAboutUsTranslations();
  return (
    <section id="about" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-3">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
          </div>


          {/* Why Choose Our Services Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-tertiary-600">
                  {t.whyChoose}
                </h3>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-slate-600">
                  {t.description1}
                </p>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600">
                  {t.description2}
                </p>
              </div>

              {/* Image Content */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl order-first lg:order-last">
                <Image
                  src="/images/choose-us.webp"
                  alt="Rukn Al-Nakheel Services"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto text-center pt-10 sm:pt-14 mt-10 sm:mt-14">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-tertiary-600">
              {t.missionTitle}
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
              {t.missionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
