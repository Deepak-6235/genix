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
        // Dark variant - matches first image
        {
          number: "45",
          label: t.stats.technicians,
          icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          color: "text-emerald-400",
        },
        {
          number: "12",
          label: t.stats.years,
          icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          ),
          color: "text-emerald-400",
        },
        {
          number: "1230",
          label: t.stats.clients,
          icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          color: "text-emerald-400",
        },
        {
          number: "1500",
          label: t.stats.homes,
          icon: (
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          color: "text-emerald-400",
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
        {/* Dark Background with Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 bottom-0 w-1/2 h-full bg-gradient-to-r from-slate-700/50 to-transparent" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
            }}></div>
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle, rgba(34,197,94,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                {/* Number with Plus Sign */}
                <div className="flex items-center justify-center gap-1 mb-3 sm:mb-4">
                  <span className="text-blue-500 text-sm sm:text-base font-semibold">+</span>
                  <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {stat.number}
                  </span>
                </div>

                {/* Icon */}
                <div className={`${stat.color} mb-3 sm:mb-4 flex justify-center`}>
                  {stat.icon}
                </div>

                {/* Label */}
                <div className="text-white text-xs sm:text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
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
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl text-center transition-all duration-300 border border-slate-100 hover:-translate-y-1"
            >
              {/* Number */}
              <div className={`${stat.color} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3`}>
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-slate-600 text-xs sm:text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
