'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceTranslation {
  title: string;
  shortDescription: string;
  fullDescription: string;
  servicesProvided: string;
  targetInsects: string;
  methodsTitle: string;
  methodsDescription: string;
  advancedTechnologies: string;
  safeUseDescription: string;
  serviceGuarantee: string;
}

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  fullDescription: string | null;
  servicesProvided: string | null;
  targetInsects: string | null;
  methodsTitle: string | null;
  methodsDescription: string | null;
  advancedTechnologies: string | null;
  safeUseDescription: string | null;
  serviceGuarantee: string | null;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
  translations?: Record<string, ServiceTranslation>;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, adminLanguage } = useAdminLanguage();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>(adminLanguage as LanguageCode);

  useEffect(() => {
    setViewLanguage(adminLanguage as LanguageCode);
  }, [adminLanguage]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services?allLangs=true`);
        const data = await response.json();

        if (data.success) {
          const foundService = data.services.find((s: Service) => s.slug === params.slug);
          if (foundService) {
            setService(foundService);
          } else {
            router.push('/admin-genix/dashboard/services');
          }
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchService();
    }
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Service not found</p>
      </div>
    );
  }

  const currentData = service.translations?.[viewLanguage] || {
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription || '',
    servicesProvided: service.servicesProvided || '',
    targetInsects: service.targetInsects || '',
    methodsTitle: service.methodsTitle || '',
    methodsDescription: service.methodsDescription || '',
    advancedTechnologies: service.advancedTechnologies || '',
    safeUseDescription: service.safeUseDescription || '',
    serviceGuarantee: service.serviceGuarantee || '',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button and Language Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('button.back') || 'Back'}
              </button>
              <h1 className="text-xl font-bold text-gray-900">{t('services.serviceDetails')}</h1>
            </div>

            {/* Language Selector */}
            {service.translations && Object.keys(service.translations).length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{t('services.viewLanguage')}:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(service.translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setViewLanguage(lang as LanguageCode)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        viewLanguage === lang
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {LANGUAGES[lang as LanguageCode]?.flag || ''} {LANGUAGES[lang as LanguageCode]?.name || lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Service Image */}
            {service.imageUrl && (
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
                <Image
                  src={service.imageUrl}
                  alt={currentData.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-4" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.shortDescription}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.isActive ? t('status.active') : t('status.inactive')}
                </span>
                <span>•</span>
                <span>Slug: {service.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Introduction Section */}
            {currentData.fullDescription && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="max-w-4xl mx-auto">
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-6 text-center" dir={LANGUAGES[viewLanguage]?.dir}>
                    {currentData.fullDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Services Provided Section */}
            {currentData.servicesProvided && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" dir={LANGUAGES[viewLanguage]?.dir}>
                    {t('services.servicesProvided') || 'Services Provided'}
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 sm:p-8 md:p-10 border border-blue-100">
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.servicesProvided}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Target Insects/Pests Section */}
            {currentData.targetInsects && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" dir={LANGUAGES[viewLanguage]?.dir}>
                    {t('services.targetInsects') || 'Target Insects/Pests'}
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 sm:p-8 md:p-10 border border-green-100">
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.targetInsects}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Methods Section */}
            {(currentData.methodsTitle || currentData.methodsDescription || currentData.advancedTechnologies) && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                {currentData.methodsTitle && (
                  <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.methodsTitle}
                    </h2>
                  </div>
                )}

                {currentData.methodsDescription && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.methodsDescription}
                    </p>
                  </div>
                )}

                {currentData.advancedTechnologies && (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 sm:p-8 md:p-10 border border-purple-100">
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center" dir={LANGUAGES[viewLanguage]?.dir}>
                        {t('services.advancedTechnologies') || 'Advanced Technologies'}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                        {currentData.advancedTechnologies}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Safe Use Section */}
            {currentData.safeUseDescription && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-yellow-50 rounded-xl p-6 sm:p-8 md:p-10 border border-yellow-100">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center" dir={LANGUAGES[viewLanguage]?.dir}>
                      {t('services.safeUseDescription') || 'Safe Use & Environmental Impact'}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.safeUseDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Service Guarantee Section */}
            {currentData.serviceGuarantee && (
              <div className="mb-16 sm:mb-20 md:mb-24">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" dir={LANGUAGES[viewLanguage]?.dir}>
                    {t('services.serviceGuarantee') || 'Service Guarantee'}
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 sm:p-8 md:p-10 border border-indigo-100">
                    <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                      {currentData.serviceGuarantee}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link
                href={`/admin-genix/dashboard/services`}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                {t('button.back') || 'Back to Services'}
              </Link>
              <button
                onClick={() => router.push(`/admin-genix/dashboard/services?edit=${service.slug}`)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
              >
                {t('button.edit') || 'Edit Service'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
