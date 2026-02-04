"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useServicesContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Services Content Component
 *
 * This component displays the services page with:
 * - A hero section with breadcrumb navigation
 * - All available services with descriptions
 * - Links to individual service pages
 *
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Service cards with icons and images
 */

interface Service {
  id: string;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string | null;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
}

export default function ServicesContent() {
  const t = useServicesContentTranslations();
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [language]);

  // Fallback image if service doesn't have one
  const getServiceImagePath = (imageUrl: string | null): string => {
    return imageUrl || "/images/service-1.jpg";
  };

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-6 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbServices}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                {t.pageSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES GRID SECTION
          ============================================ */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-gray-200 h-48"></div>
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Service Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={getServiceImagePath(service.imageUrl)}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 sm:p-8 md:p-10">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
                        {service.shortDescription}
                      </p>

                      {/* Read More Button */}
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                      >
                        <span>{t.readMore}</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          REVIEWS SECTION
          ============================================ */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                {t.reviews.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                {t.reviews.subtitle}
              </p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {t.reviews.reviews.map((review, index) => {
                const colors = [
                  "from-blue-500 to-cyan-500",
                  "from-emerald-500 to-emerald-600",
                  "from-purple-500 to-purple-600",
                  "from-orange-500 to-orange-600",
                ];
                const initials = review.name.charAt(0);
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 leading-relaxed text-base sm:text-lg">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {t.cta.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span suppressHydrationWarning>{t.cta.button}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
