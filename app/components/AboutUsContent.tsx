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
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch statistics and about us data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);


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


  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-5rem)] flex items-center py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/about-us-hero.jpg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-white/90 justify-center">
                <li>
                  <Link href="/" className="hover:text-primary-400 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white font-semibold">{t.breadcrumbAbout}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary-600 mb-6 leading-tight">
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


            {/* Company Description Section */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-tertiary-600 mb-6 text-center">
                  {t.companyTitle}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  {t.companyDescription}
                </p>


              </div>
            </div>

            {/* Best Services Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary-600 mb-6 leading-tight">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012-2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          </div>
        </div>
      </section>
    </div>
  );
}
