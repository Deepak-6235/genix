"use client";

import { useEffect, useState, useRef } from "react";
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

// CountUp Component
function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      setCount(Math.floor(easeOutQuart(percentage) * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure final value is exact
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
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
    // User requested all numbers to be green
    return "text-primary-600";
  };

  // Build stats array from database data
  const stats = statistics.map(stat => ({
    value: stat.value,
    suffix: stat.suffix || '',
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
      <section
        className={`py-12 sm:py-16 md:py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat ${className}`}
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-slate-900/50"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const darkStat = stat as { value: number; suffix: string; label: string; numberColor: string };
              return (
                <div
                  key={index}
                  className="text-center"
                >
                  {/* Number with Plus Sign (colored) */}
                  <div className={`${darkStat.numberColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3`}>
                    <CountUp end={darkStat.value} suffix={darkStat.suffix} />
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
            const lightStat = stat as { value: number; suffix: string; label: string; color: string };
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl text-center transition-all duration-300 border border-slate-100 hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {/* Number */}
                <div className={`${lightStat.color} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3`}>
                  <CountUp end={lightStat.value} suffix={lightStat.suffix} />
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
