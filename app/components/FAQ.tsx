"use client";

import Link from "next/link";
import { useFAQTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const t = useFAQTranslations();
  const { dir } = useLanguage();
  return (
    <section id="faq" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4 mb-8">
              {t.subtitle}
            </p>
            <Link
              href="/faq"
              className={`btn-view-more text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg inline-flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              {t.viewAll}
              <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
