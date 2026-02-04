"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAboutUsContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * About Us Content Component
 *
 * This component displays the "Who We Are" page with:
 * - A hero section with breadcrumb navigation
 * - Company information and history
 * - Why choose us section
 * - Services overview
 * - Statistics section
 * - Company description and contact information
 *
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Statistics cards
 * - Service cards with icons
 */

interface StatisticData {
  id: string;
  key: string;
  value: number;
  suffix: string | null;
  color: string | null;
  order: number;
}

interface AboutUsData {
  email: string | null;
  phoneNumber1: string | null;
  phoneNumber2: string | null;
  workingHours: string | null;
  address: string | null;
}

export default function AboutUsContent() {
  const t = useAboutUsContentTranslations();
  const { language } = useLanguage();
  const [statistics, setStatistics] = useState<StatisticData[]>([]);
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch statistics and about us data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch statistics
        const statsResponse = await fetch('/api/statistics');
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStatistics(statsData.statistics);
        }

        // Fetch about us
        const aboutResponse = await fetch(`/api/about-us?lang=${language}`);
        const aboutData = await aboutResponse.json();
        if (aboutData.success) {
          setAboutUs(aboutData.aboutUs);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  // Get color class for statistic card based on key
  const getColorClass = (key: string) => {
    switch (key) {
      case 'satisfied_customers':
        return 'from-primary-600 to-primary-700';
      case 'work_team':
        return 'from-success-600 to-success-700';
      case 'houses':
        return 'from-accent-purple-600 to-accent-purple-700';
      case 'years_experience':
        return 'from-secondary-600 to-secondary-700';
      default:
        return 'from-primary-600 to-primary-700';
    }
  };

  // Map database keys to translation labels
  const getLabelForKey = (key: string) => {
    switch (key) {
      case 'satisfied_customers':
        return t.stats.satisfiedClients;
      case 'work_team':
        return t.stats.team;
      case 'houses':
        return t.stats.homes;
      case 'years_experience':
        return t.stats.yearsExperience;
      default:
        return key;
    }
  };

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-4 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 sm:mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center">
                <li>
                  <Link href="/" className="hover:text-primary-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbAbout}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600">
                  {t.companyName}
                </h2>
                <span className="text-lg sm:text-xl md:text-2xl text-slate-600 font-semibold">
                  {t.experience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT SECTION
          ============================================ */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Why Choose Us Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  {t.whyChooseTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
                {/* Content */}
                <div>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    {t.description1}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    {t.description2}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                    {t.description3}
                  </p>
                </div>

                {/* Image */}
                <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/about-us.jpg"
                    alt="About Rukn Al-Nakheel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Search and Contact Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-center border border-slate-100 shadow-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-tertiary-600">
                  {t.searchAndContactTitle}
                </h3>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 text-slate-600">
                  {t.searchAndContactDescription}
                </p>
                <Link
                  href="/contact"
                  className="btn-view-more text-white px-8 py-4 rounded-xl font-bold text-lg inline-block"
                >
                  {t.contactUsNow}
                </Link>
              </div>
            </div>

            {/* Best Services Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  {t.bestServicesTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Service 1 - Disinfection */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t.services.disinfection.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{t.services.disinfection.description}</p>
                </div>

                {/* Service 2 - Painting */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t.services.paints.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{t.services.paints.description}</p>
                </div>

                {/* Service 3 - AC Maintenance */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-accent-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t.services.acMaintenance.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{t.services.acMaintenance.description}</p>
                </div>

                {/* Service 4 - Waterfalls */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t.services.waterfalls.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{t.services.waterfalls.description}</p>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse bg-gradient-to-br from-gray-300 to-gray-400 p-6 sm:p-8 rounded-xl shadow-lg text-center">
                      <div className="h-12 bg-gray-400 rounded mb-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-3/4 mx-auto"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {statistics.map((stat) => (
                    <div
                      key={stat.id}
                      className={`bg-gradient-to-br ${getColorClass(stat.key)} p-6 sm:p-8 rounded-xl shadow-lg text-white text-center`}
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                        {stat.value}{stat.suffix || ''}
                      </div>
                      <div className="text-sm sm:text-base md:text-lg">
                        {getLabelForKey(stat.key)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Company Description Section */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
                  {t.companyTitle}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  {t.companyDescription}
                </p>

                {/* Contact Information */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {/* Address */}
                    {aboutUs?.address && (
                      <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-2">{t.contactInfo.address}</p>
                          <p className="text-base text-slate-700">{aboutUs.address}</p>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {(aboutUs?.phoneNumber1 || aboutUs?.phoneNumber2) && (
                      <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-2">{t.contactInfo.phone}</p>
                          <div className="space-y-1">
                            {aboutUs?.phoneNumber1 && (
                              <a
                                href={`tel:+966${aboutUs.phoneNumber1}`}
                                className="block text-base text-slate-700 hover:text-primary-600 transition-colors font-medium"
                              >
                                {aboutUs.phoneNumber1}
                              </a>
                            )}
                            {aboutUs?.phoneNumber2 && (
                              <a
                                href={`tel:+966${aboutUs.phoneNumber2}`}
                                className="block text-base text-slate-700 hover:text-primary-600 transition-colors font-medium"
                              >
                                {aboutUs.phoneNumber2}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {aboutUs?.email && (
                      <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-2">{t.contactInfo.email}</p>
                          <a
                            href={`mailto:${aboutUs.email}`}
                            className="text-base text-slate-700 hover:text-primary-600 transition-colors break-all font-medium"
                          >
                            {aboutUs.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Working Hours */}
                    {aboutUs?.workingHours && (
                      <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-2">{t.contactInfo.hours}</p>
                          <p className="text-base text-slate-700">{aboutUs.workingHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
