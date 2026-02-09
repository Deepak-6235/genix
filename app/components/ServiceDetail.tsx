"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useServicesContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  id: string;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string | null;
  imageUrl: string | null;
}

interface DetailedService {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  fullDescription: string;
  imageUrl?: string | null;
  translations?: Record<string, {
    title: string;
    subtitle: string;
    fullDescription: string;
  }>;
}

export default function ServiceDetail({ serviceSlug }: { serviceSlug: string }) {
  const t = useServicesContentTranslations();
  const { dir, language } = useLanguage();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailedServices, setDetailedServices] = useState<DetailedService[]>([]);
  const [detailedServicesLoading, setDetailedServicesLoading] = useState(true);

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/services/${serviceSlug}?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setService(data.service);
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceSlug, language]);

  // Fetch detailed services
  useEffect(() => {
    const fetchDetailedServices = async () => {
      try {
        setDetailedServicesLoading(true);
        const response = await fetch(`/api/services/${serviceSlug}/detailed?allLangs=true`);
        const data = await response.json();
        if (data.success) {
          setDetailedServices(data.detailedServices || []);
        }
      } catch (error) {
        console.error('Failed to fetch detailed services:', error);
        setDetailedServices([]);
      } finally {
        setDetailedServicesLoading(false);
      }
    };

    fetchDetailedServices();
  }, [serviceSlug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          SERVICE NAME, DESCRIPTION AND IMAGE (SIDE BY SIDE)
          ============================================ */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className={`flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <li>
                  <Link href="/" className="hover:text-primary-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary-600 transition-colors">
                    {t.breadcrumbServices}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{service.name}</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Short Description */}
              <div className="order-2 lg:order-1">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center ${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'}`}>
                  {service.name}
                </h1>
                <p className={`text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center ${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'}`}>
                  {service.shortDescription}
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src={service.imageUrl || "/images/service-1.jpg"}
                  alt={service.name}
                  fill
                  className="object-cover rounded-xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TITLE, SUBTITLE AND FULL DESCRIPTION SECTION
          ============================================ */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            {service.title && (
              <div className="mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 text-center leading-tight">
                  {service.title}
                </h2>
              </div>
            )}

            {/* Subtitle Section */}
            {service.subtitle && (
              <div className="mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                  {service.subtitle}
                </h3>
              </div>
            )}

            {/* Full Description Section */}
            {service.fullDescription && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center whitespace-pre-line">
                      {service.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          DETAILED SERVICES SECTIONS
          ============================================ */}
      {!detailedServicesLoading && detailedServices.length > 0 && (
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
              {detailedServices.map((section, index) => {
                const sectionContent = section.translations?.[language] || section.translations?.en || section;
                return (
                  <div key={section.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                    {/* Section with alternating layout */}
                    <div className={`grid grid-cols-1 ${section.imageUrl ? 'lg:grid-cols-2' : ''} gap-0`}>
                      {/* Section Image */}
                      {section.imageUrl && (
                        <div className={`relative h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                          <Image
                            src={section.imageUrl}
                            alt={sectionContent.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      )}

                      {/* Section Content */}
                      <div className={`p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div>
                          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {sectionContent.title}
                          </h3>
                          <p className={`text-lg sm:text-xl font-semibold text-primary-600 mb-4 sm:mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {sectionContent.subtitle}
                          </p>
                          <p className={`text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {sectionContent.fullDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 border border-slate-100 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-tertiary-600">
              {t.cta.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto text-slate-600">
              {t.cta.subtitle}
            </p>
            <Link
              href="/contact"
              className="btn-view-more text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto inline-block text-center"
            >
              <span suppressHydrationWarning>{t.cta.button}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
