"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TopBar() {
    return (
        <div className="relative">
            {/* Thin teal strip at the top */}
            <div className="h-1 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
            
            {/* Main banner with gradient */}
            <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white py-4 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 sm:gap-6 lg:gap-8">
                        {/* Email */}
                        <a
                            href="mailto:roknalnakheel@gmail.com"
                            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm sm:text-base whitespace-nowrap">roknalnakheel@gmail.com</span>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+966582010834"
                            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm sm:text-base">0582010834</span>
                                <span className="text-xs text-white/80">Phone</span>
                            </div>
                        </a>

                        {/* Operating Hours */}
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm sm:text-base">Sunday - Friday</span>
                                <span className="text-xs text-white/80">24h/7</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm sm:text-base">Saudi Arabia</span>
                                <span className="text-xs text-white/80">Riyadh</span>
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex items-center">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
