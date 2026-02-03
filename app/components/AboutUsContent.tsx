"use client";

import Image from "next/image";
import Link from "next/link";
import { useAboutUsContentTranslations } from "@/hooks/useTranslations";

/**
 * About Us Content Component
 * 
 * This component displays the "Who We Are" page with:
 * - A hero section with breadcrumb navigation
 * - Company information and history
 * - Why choose us section
 * - Services overview
 * - Statistics section
 * - Company description and contact information
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Statistics cards
 * - Service cards with icons
 */

export default function AboutUsContent() {
  const t = useAboutUsContentTranslations();
  
  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbAbout}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                  {t.companyName}
                </h2>
                <span className="text-lg sm:text-xl md:text-2xl text-slate-600 font-semibold">
                  {t.experience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT SECTION
          ============================================ */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Why Choose Us Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  {t.whyChooseTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
                {/* Content */}
                <div>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    {t.description1}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    {t.description2}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                    {t.description3}
                  </p>
                </div>

                {/* Image */}
                <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/about-us.jpg"
                    alt="About Rukn Al-Nakheel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Search and Contact Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  ابحث في منزلك واتصل بنا
                </h3>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
                  نحن متخصصون في تقديم جميع خدمات التنظيف والصيانة والتشغيل ومكافحة وإبادة الحشرات 
                  داخل المملكة العربية السعودية. نعمل طوال أيام الأسبوع لخدمتك.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  اتصل بنا الآن
                </Link>
              </div>
            </div>

            {/* Best Services Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  أفضل خدمة قدمناها
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Service 1 - Disinfection */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">تعقيم ضد الفيروسات</h3>
                  <p className="text-sm sm:text-base text-slate-600">خدمات تعقيم شاملة باستخدام أفضل المواد المعتمدة</p>
                </div>

                {/* Service 2 - Painting */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">دهانات وديكورات</h3>
                  <p className="text-sm sm:text-base text-slate-600">أحدث تقنيات الدهان والديكورات العصرية</p>
                </div>

                {/* Service 3 - AC Maintenance */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">صيانة المكيفات</h3>
                  <p className="text-sm sm:text-base text-slate-600">صيانة شاملة للمكيفات بقطع غيار أصلية</p>
                </div>

                {/* Service 4 - Waterfalls */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">تصميم وإنشاء الشلالات والنوافير</h3>
                  <p className="text-sm sm:text-base text-slate-600">تصاميم عصرية للشلالات والنوافير مع الإضاءة</p>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-xl shadow-lg text-white text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">1000+</div>
                  <div className="text-sm sm:text-base md:text-lg">عملاء راضون</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 sm:p-8 rounded-xl shadow-lg text-white text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">50+</div>
                  <div className="text-sm sm:text-base md:text-lg">فريق العمل</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-xl shadow-lg text-white text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">1000+</div>
                  <div className="text-sm sm:text-base md:text-lg">منزل</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 sm:p-8 rounded-xl shadow-lg text-white text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">12+</div>
                  <div className="text-sm sm:text-base md:text-lg">سنوات خبرة</div>
                </div>
              </div>
            </div>

            {/* Company Description Section */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
                  مؤسسة ركن النخيل
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وإبادة الحشرات داخل المملكة العربية السعودية. 
                  نعمل طوال أيام الأسبوع لخدمتك وتلبية احتياجاتك.
                </p>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-2">العنوان:</p>
                      <p className="text-base text-slate-700">السعودية، الرياض</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-2">الهاتف:</p>
                      <a href="tel:+966582010834" className="text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                        0582010834
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-2">البريد الإلكتروني:</p>
                      <a href="mailto:ruknalnakhil@gmail.com" className="text-base text-slate-700 hover:text-blue-600 transition-colors break-all font-medium">
                        ruknalnakhil@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-2">ساعات العمل:</p>
                      <p className="text-base text-slate-700">نعمل طوال أيام الأسبوع</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
