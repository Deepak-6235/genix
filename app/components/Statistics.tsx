"use client";

import { useHeroTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Statistics Component
 * 
 * Displays key metrics and achievements in a modern banner format.
 * Supports two visual styles:
 * - Dark banner with icons (variant="dark")
 * - White cards (variant="light")
 */

interface StatisticsProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Statistics({ variant = "light", className = "" }: StatisticsProps) {
  const t = useHeroTranslations();
  const { dir } = useLanguage();

  const stats = variant === "dark" 
    ? [
        // Dark variant - matches the UI exactly
        {
          number: "12+",
          label: t.stats.years,
          numberColor: "text-blue-500",
        },
        {
          number: "1230+",
          label: t.stats.clients,
          numberColor: "text-emerald-500",
        },
        {
          number: "1500+",
          label: t.stats.homes,
          numberColor: "text-purple-500",
        },
        {
          number: "45+",
          label: t.stats.technicians,
          numberColor: "text-orange-500",
        },
      ]
    : [
        // Light variant - matches second image
        {
          number: "1+",
          label: t.stats.years,
          color: "text-blue-600",
        },
        {
          number: "10k+",
          label: t.stats.clients,
          color: "text-emerald-600",
        },
        {
          number: "1+",
          label: t.stats.homes,
          color: "text-purple-600",
        },
        {
          number: "1+",
          label: t.stats.technicians,
          color: "text-orange-600",
        },
      ];

  if (variant === "dark") {
    return (
      <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${className}`}>
        {/* Plain Dark Background */}
        <div className="absolute inset-0 bg-slate-900"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const darkStat = stat as { number: string; label: string; numberColor: string };
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 sm:gap-6 group"
                >
                  {/* Number and Label */}
                  <div className="flex-1">
                    {/* Number with Plus Sign (colored) */}
                    <div className={`${darkStat.numberColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2`}>
                      {darkStat.number}
                    </div>

                    {/* Label */}
                    <div className="text-white text-xs sm:text-sm md:text-base font-medium">
                      {darkStat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Light variant (white cards)
  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const lightStat = stat as { number: string; label: string; color: string };
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl text-center transition-all duration-300 border border-slate-100 hover:-translate-y-1"
              >
                {/* Number */}
                <div className={`${lightStat.color} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3`}>
                  {lightStat.number}
                </div>

                {/* Label */}
                <div className="text-slate-600 text-xs sm:text-sm md:text-base font-medium">
                  {lightStat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
