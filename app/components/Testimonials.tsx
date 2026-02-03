"use client";

import { useTestimonialsTranslations } from "@/hooks/useTranslations";

export default function Testimonials() {
    const t = useTestimonialsTranslations();
    const testimonials = t.testimonials.map((testimonial, index) => ({
        ...testimonial,
        image: "👤",
        rating: 5,
    }));

    return (
        <section className="py-20 sm:py-32 md:py-40 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16 md:mb-24">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                        {t.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-700 mb-6 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl">
                                    {testimonial.image}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                                    <p className="text-xs text-slate-500">{testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
