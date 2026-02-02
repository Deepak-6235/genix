'use client';

import { useService } from '@/hooks/useServices';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { service, loading, error } = useService(params.slug);
  const { dir } = useLanguage();

  return (
    <div dir={dir}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/services" className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading service details...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && !service && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Service not found.</p>
            <Link href="/services" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
              Go back to services
            </Link>
          </div>
        )}

        {!loading && !error && service && (
          <article className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8">
              <div className="flex items-start gap-6">
                {service.icon && (
                  <div className="text-6xl flex-shrink-0">{service.icon}</div>
                )}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{service.title}</h1>
                  <p className="text-xl text-gray-700">{service.shortDescription}</p>
                </div>
              </div>
            </div>

            {/* Full Description */}
            {service.fullDescription && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>
            )}

            {/* Services Provided */}
            {service.servicesProvided && (
              <section className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Provided</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.servicesProvided}
                </div>
              </section>
            )}

            {/* Target Insects */}
            {service.targetInsects && (
              <section className="bg-green-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Target Insects & Pests</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.targetInsects}
                </div>
              </section>
            )}

            {/* Methods */}
            {(service.methodsTitle || service.methodsDescription) && (
              <section className="border-l-4 border-purple-500 pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.methodsTitle || 'Our Methods'}
                </h2>
                {service.methodsDescription && (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {service.methodsDescription}
                  </p>
                )}
              </section>
            )}

            {/* Advanced Technologies */}
            {service.advancedTechnologies && (
              <section className="bg-indigo-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Technologies</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.advancedTechnologies}
                </div>
              </section>
            )}

            {/* Safe Use */}
            {service.safeUseDescription && (
              <section className="bg-yellow-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety & Environmental Impact</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.safeUseDescription}
                </div>
              </section>
            )}

            {/* Guarantee */}
            {service.serviceGuarantee && (
              <section className="bg-purple-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Guarantee</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {service.serviceGuarantee}
                </div>
              </section>
            )}

            {/* Back Link */}
            <div className="pt-8 border-t border-gray-200">
              <Link href="/services" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Services
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
