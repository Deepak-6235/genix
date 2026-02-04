"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useServicesTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

import 'swiper/css';
import 'swiper/css/pagination';

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

export default function Services() {
  const t = useServicesTranslations();
  const { dir, language } = useLanguage();
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
    <section id="services" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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

                  <div className="p-4 sm:p-6 md:p-8">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Learn More Button */}
                    <div
                      className={`inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      <span>{t.cta}</span>
                      <svg className={`w-4 h-4 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
