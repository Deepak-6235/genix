'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceTranslation {
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
}

interface Service {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  slug: string;
  fullDescription: string | null;
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
    name: service.name,
    title: service.title,
    subtitle: service.subtitle,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription || '',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button and Language Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
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
            </div>

            {/* Language Selector */}
            {service.translations && Object.keys(service.translations).length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">{t('services.viewLanguage')}:</span>
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

      {/* Hero Section */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
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

            {/* Status Badge */}
            <div className="text-center mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {service.isActive ? t('status.active') : t('status.inactive')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Service Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Service Name</h3>
              <p className="text-2xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.name}
              </p>
            </div>

            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Title</h3>
              <p className="text-2xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.title}
              </p>
            </div>

            {/* Subtitle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Subtitle</h3>
              <p className="text-xl font-semibold text-gray-800" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.subtitle}
              </p>
            </div>

            {/* Short Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Short Description</h3>
              <p className="text-base text-gray-700 leading-relaxed" dir={LANGUAGES[viewLanguage]?.dir}>
                {currentData.shortDescription}
              </p>
            </div>

            {/* Full Description */}
            {currentData.fullDescription && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Full Description</h3>
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.fullDescription}
                </p>
              </div>
            )}



            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                href={`/admin-genix/dashboard/services`}
                className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
              >
                {t('button.back') || 'Back to Services'}
              </Link>
              <button
                onClick={() => router.push(`/admin-genix/dashboard/services`)}
                className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
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
