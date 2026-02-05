"use client";

import { useEffect, useState } from "react";
import { useTestimonialsTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Review {
    id: string;
    slug: string;
    name: string;
    position: string;
    company: string;
    text: string;
    rating: number;
    isActive: boolean;
    order: number;
}

export default function Testimonials() {
    const t = useTestimonialsTranslations();
    const { dir, language } = useLanguage();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch reviews from database
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews?lang=${language}`);
                const data = await response.json();
                if (data.success) {
                    setReviews(data.reviews);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [language]);

    if (loading) {
        return (
            <section id="testimonials" className="py-10 sm:py-16 md:py-20 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-3">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-3">
                            {t.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((j) => (
                                        <div key={j} className="w-5 h-5 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                                <div className="space-y-2 mb-6">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="testimonials" className="py-10 sm:py-16 md:py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-3" data-aos="fade-up">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-3">
                        {t.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                        {t.subtitle}
                    </p>
                </div>

                <div className="relative group max-w-7xl mx-auto px-10 sm:px-14 md:px-20 lg:px-24" data-aos="fade-up" data-aos-delay="200">
                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        navigation={
                            {
                                nextEl: '.testimonials-button-next',
                                prevEl: '.testimonials-button-prev',
                            }
                        }
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
                        className="!pt-4 !pb-14"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id} className="pt-2 pb-2 !h-auto">
                                <div
                                    className="h-full bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-slate-100 flex flex-col"
                                >
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 text-warning-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <p className="text-slate-700 mb-6 leading-relaxed italic flex-1">
                                        "{review.text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl shrink-0">
                                            👤
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-tertiary-600 line-clamp-1">{review.name}</h4>
                                            <p className="text-sm text-slate-600 line-clamp-1">{review.position}</p>
                                            <p className="text-xs text-slate-500 line-clamp-1">{review.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:left-4 sm:right-4 z-20 flex justify-between pointer-events-none">
                        <button className="testimonials-button-prev p-2 rounded-full bg-white shadow-lg border border-slate-100 text-primary-600 hover:bg-primary-50 transition-all pointer-events-auto opacity-100 rtl:rotate-180">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="testimonials-button-next p-2 rounded-full bg-white shadow-lg border border-slate-100 text-primary-600 hover:bg-primary-50 transition-all pointer-events-auto opacity-100 rtl:rotate-180">
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
