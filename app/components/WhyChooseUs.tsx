"use client";

import { useWhyChooseUsTranslations } from "@/hooks/useTranslations";

export default function WhyChooseUs() {
    const t = useWhyChooseUsTranslations();
    
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.features.trusted.title,
            description: t.features.trusted.description,
            color: "blue"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: t.features.professional.title,
            description: t.features.professional.description,
            color: "cyan"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.features.service24.title,
            description: t.features.service24.description,
            color: "emerald"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: t.features.punctual.title,
            description: t.features.punctual.description,
            color: "purple"
        }
    ];

    const colorClasses: { [key: string]: string } = {
        blue: "from-blue-500 to-blue-600",
        cyan: "from-cyan-500 to-cyan-600",
        emerald: "from-emerald-500 to-emerald-600",
        purple: "from-purple-500 to-purple-600"
    };

    return (
        <section className="py-20 sm:py-32 md:py-40 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16 md:mb-24">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                        {t.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
                        >
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colorClasses[feature.color]} rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg flex-shrink-0`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 flex-shrink-0">
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-grow">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
