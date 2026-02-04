"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContactTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutUsData {
  email: string | null;
  phoneNumber1: string | null;
  phoneNumber2: string | null;
  workingHours: string | null;
  address: string | null;
}

export default function Contact() {
  const t = useContactTranslations();
  const { language } = useLanguage();
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch about us data
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch(`/api/about-us?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setAboutUs(data.aboutUs);
        }
      } catch (error) {
        console.error('Failed to fetch about us:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [language]);

  const phoneNumber = aboutUs?.phoneNumber1 || "0582010834";
  const whatsappMessage = encodeURIComponent(t.whatsappMessage);
  const whatsappLink = `https://wa.me/966${phoneNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
          </div>

          {/* Contact Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-6 bg-gray-200 rounded w-24 ml-3"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {/* Phone Card */}
              {(aboutUs?.phoneNumber1 || aboutUs?.phoneNumber2) && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t.phone}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {aboutUs?.phoneNumber1 && (
                      <a
                        href={`tel:+966${aboutUs.phoneNumber1}`}
                        className="block text-primary-600 hover:text-primary-700 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber1}
                      </a>
                    )}
                    {aboutUs?.phoneNumber2 && (
                      <a
                        href={`tel:+966${aboutUs.phoneNumber2}`}
                        className="block text-primary-600 hover:text-primary-700 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber2}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Email Card */}
              {aboutUs?.email && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t.email}
                    </h3>
                  </div>
                  <a
                    href={`mailto:${aboutUs.email}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base md:text-lg transition-colors break-all"
                  >
                    {aboutUs.email}
                  </a>
                </div>
              )}

              {/* Location Card */}
              {aboutUs?.address && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-purple-100 rounded-lg flex items-center justify-center text-accent-purple-600">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t.address}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-base sm:text-lg font-medium">
                    {aboutUs.address}
                  </p>
                </div>
              )}

              {/* Hours Card */}
              {aboutUs?.workingHours && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-orange-100 rounded-lg flex items-center justify-center text-accent-orange-600">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t.hours}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-base sm:text-lg font-bold">
                    {aboutUs.workingHours}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center px-4 space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                {t.offers}
              </h3>
              <p className="text-slate-600 mb-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.offersDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:from-primary-700 hover:via-secondary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t.whatsappButton}
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:from-primary-700 hover:via-secondary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                {t.sendMessage}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
