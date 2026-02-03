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
          icon: (
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
              {/* Trophy cup */}
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V7C19 9.76 16.76 12 14 12H13V16H17C17.55 16 18 16.45 18 17S17.55 18 17 18H7C6.45 18 6 17.55 6 17S6.45 16 7 16H11V12H10C7.24 12 5 9.76 5 7V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V7C7 8.66 8.34 10 10 10H14C15.66 10 17 8.66 17 7V6H7Z"/>
              {/* Star in center */}
              <path d="M12 8.5L12.6 10.2L14.3 10.8L12.6 11.4L12 13.1L11.4 11.4L9.7 10.8L11.4 10.2L12 8.5Z"/>
            </svg>
          ),
          iconColor: "text-lime-400",
        },
        {
          number: "1230+",
          label: t.stats.clients,
          numberColor: "text-emerald-500",
          icon: (
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
              {/* Person head and shoulders */}
              <circle cx="12" cy="7" r="3.5"/>
              <path d="M12 13C8.67 13 6 14.33 6 16V18H18V16C18 14.33 15.33 13 12 13Z"/>
              {/* Two stars below and to the right */}
              <path d="M15 19.5L15.4 20.5L16.4 20.9L15.4 21.3L15 22.3L14.6 21.3L13.6 20.9L14.6 20.5L15 19.5Z"/>
              <path d="M17.5 21.5L17.9 22.5L18.9 22.9L17.9 23.3L17.5 24.3L17.1 23.3L16.1 22.9L17.1 22.5L17.5 21.5Z"/>
            </svg>
          ),
          iconColor: "text-lime-400",
        },
        {
          number: "1500+",
          label: t.stats.homes,
          numberColor: "text-purple-500",
          icon: (
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
              {/* 3D Cube/Box */}
              <path d="M12 2L2 7L12 12L22 7L12 2Z" opacity="0.85"/>
              <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z"/>
              <path d="M2 12L12 17L22 12" opacity="0.5"/>
              {/* Circular arrows around - top */}
              <path d="M6 3C6 3 7.5 1.5 9 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 3C18 3 16.5 1.5 15 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Circular arrows around - bottom */}
              <path d="M6 21C6 21 7.5 22.5 9 21" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 21C18 21 16.5 22.5 15 21" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          iconColor: "text-lime-400",
        },
        {
          number: "45+",
          label: t.stats.technicians,
          numberColor: "text-orange-500",
          icon: (
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
              {/* Three people */}
              <circle cx="8" cy="7" r="2.5"/>
              <path d="M5 12C5 10.9 5.9 10 7 10H9C10.1 10 11 10.9 11 12V14H5V12Z"/>
              <circle cx="12" cy="7" r="2.5"/>
              <path d="M9 12C9 10.9 9.9 10 11 10H13C14.1 10 15 10.9 15 12V14H9V12Z"/>
              <circle cx="16" cy="7" r="2.5"/>
              <path d="M13 12C13 10.9 13.9 10 15 10H17C18.1 10 19 10.9 19 12V14H13V12Z"/>
              {/* Speech bubbles */}
              <ellipse cx="7" cy="4" rx="1.5" ry="1.2" opacity="0.7"/>
              <ellipse cx="9.5" cy="3" rx="1.5" ry="1.2"/>
            </svg>
          ),
          iconColor: "text-lime-400",
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
              const darkStat = stat as { number: string; label: string; numberColor: string; icon: React.ReactElement; iconColor: string };
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 sm:gap-6 group"
                >
                  {/* Left side: Number and Label */}
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

                  {/* Right side: Icon */}
                  <div className={`${darkStat.iconColor} flex-shrink-0`}>
                    {darkStat.icon}
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
