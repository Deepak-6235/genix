'use client';

import { useServices } from '@/hooks/useServices';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ServicesPage() {
  const { services, loading, error } = useServices();
  const { dir } = useLanguage();

  return (
    <div dir={dir}>
      {/* Header with Language Switcher */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    shortDescription: string;
    icon: string | null;
    slug: string;
    isActive: boolean;
  };
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a
      href={`/services/${service.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="p-6">
        {service.icon && (
          <div className="text-5xl mb-4">{service.icon}</div>
        )}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex items-center text-purple-600 font-medium group-hover:gap-2 transition-all">
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
