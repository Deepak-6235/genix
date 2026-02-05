"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useServicesTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  if (loading) {
    return (
      <section id="services" className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-4 sm:mb-6">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
          </div>

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
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-4 sm:mb-6">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="relative group/swiper px-10 sm:px-14 md:px-20 lg:px-24">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.services-button-next',
              prevEl: '.services-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
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
            className="!pt-12 !pb-16"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id} className="py-4 px-2 !h-auto">
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full flex flex-col group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Service Image */}
                  <div className="relative h-48 w-full overflow-hidden shrink-0">
                    <Image
                      src={getServiceImagePath(service.imageUrl)}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-tertiary-600 mb-2 sm:mb-3 line-clamp-2">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Learn More Button */}
                    <div
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors flex items-center gap-1"
                    >
                      {t.cta}
                      <span className="inline-block transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:left-4 sm:right-4 z-20 flex justify-between pointer-events-none">
            <button className="services-button-prev p-2 rounded-full bg-white shadow-lg border border-slate-100 text-primary-600 hover:bg-primary-50 transition-all pointer-events-auto opacity-100 rtl:rotate-180">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="services-button-next p-2 rounded-full bg-white shadow-lg border border-slate-100 text-primary-600 hover:bg-primary-50 transition-all pointer-events-auto opacity-100 rtl:rotate-180">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

