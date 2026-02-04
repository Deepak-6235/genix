"use client";

import { useEffect, useState } from "react";
import { useTestimonialsTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

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
    const { language } = useLanguage();
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

    return (
        <section className="py-10 sm:py-16 md:py-20 bg-white">
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
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
                                <p className="text-slate-700 mb-6 leading-relaxed italic">
                                    "{review.text}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                                        <p className="text-sm text-slate-600">{review.position}</p>
                                        <p className="text-xs text-slate-500">{review.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
