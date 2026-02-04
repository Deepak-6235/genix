"use client";

import { useEffect, useState } from "react";
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

interface StatisticData {
  id: string;
  key: string;
  value: number;
  suffix: string | null;
  color: string | null;
  order: number;
}

export default function Statistics({ variant = "light", className = "" }: StatisticsProps) {
  const t = useHeroTranslations();
  const { dir } = useLanguage();
  const [statistics, setStatistics] = useState<StatisticData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch statistics from database
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics');
        const data = await response.json();
        if (data.success) {
          setStatistics(data.statistics);
        }
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Map database keys to translation labels
  const getLabelForKey = (key: string) => {
    switch (key) {
      case 'years_experience':
        return t.stats.years;
      case 'satisfied_customers':
        return t.stats.clients;
      case 'houses':
        return t.stats.homes;
      case 'work_team':
        return t.stats.technicians;
      default:
        return key;
    }
  };

  // Map database keys to colors based on variant
  const getColorForKey = (key: string, dbColor: string | null) => {
    if (variant === "dark") {
      switch (key) {
        case 'years_experience':
          return "text-blue-500";
        case 'satisfied_customers':
          return "text-emerald-500";
        case 'houses':
          return "text-purple-500";
        case 'work_team':
          return "text-orange-500";
        default:
          return "text-blue-500";
      }
    } else {
      switch (key) {
        case 'years_experience':
          return "text-blue-600";
        case 'satisfied_customers':
          return "text-emerald-600";
        case 'houses':
          return "text-purple-600";
        case 'work_team':
          return "text-orange-600";
        default:
          return "text-blue-600";
      }
    }
  };

  // Build stats array from database data
  const stats = statistics.map(stat => ({
    number: `${stat.value}${stat.suffix || ''}`,
    label: getLabelForKey(stat.key),
    numberColor: getColorForKey(stat.key, stat.color),
    color: getColorForKey(stat.key, stat.color),
  }));

  // Loading state
  if (loading) {
    return (
      <section className={`py-12 sm:py-16 md:py-20 ${variant === "dark" ? "bg-slate-900" : "bg-white"} ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className={`h-20 ${variant === "dark" ? "bg-slate-800" : "bg-gray-200"} rounded-lg`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                  className="text-center"
                >
                  {/* Number with Plus Sign (colored) */}
                  <div className={`${darkStat.numberColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2`}>
                    {darkStat.number}
                  </div>

                  {/* Label */}
                  <div className="text-white text-xs sm:text-sm md:text-base font-medium">
                    {darkStat.label}
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
