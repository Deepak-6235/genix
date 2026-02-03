"use client";

import Link from "next/link";
import Image from "next/image";
import { useServicesContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SwimmingPoolsContent() {
  const t = useServicesContentTranslations();
  const { dir } = useLanguage();
  const service = t.services.pools;
  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          SERVICE NAME, DESCRIPTION AND IMAGE (SIDE BY SIDE)
          ============================================ */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className={`flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li>
                  <span className="text-slate-600">{t.breadcrumbServices}</span>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{service.title}</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center ${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'}`}>
                  {service.title}
                </h1>
                <p className={`text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center ${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'}`}>
                  {service.description}
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-6.jpg"
                  alt={service.title}
                  fill
                  className="object-cover rounded-xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TITLE, SUBTITLE AND DESCRIPTION SECTION
          ============================================ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 text-center leading-tight">
                شركة إنشاء وصيانة المسابح
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                حلول متكاملة لإنشاء وصيانة المسابح
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نفتخر بأننا الشركة الرائدة في مجال إنشاء وصيانة المسابح في المملكة العربية السعودية. 
                  نقدم حلولاً متكاملة وشاملة لجميع احتياجات المسابح، من التصميم والإنشاء إلى الصيانة الدورية والإصلاحات. 
                  مع سنوات من الخبرة في هذا المجال، أصبحنا الخيار الأول للعديد من العملاء في المملكة العربية السعودية. 
                  نستخدم أحدث التقنيات والمواد عالية الجودة لضمان متانة المسابح وجمالها، مع الالتزام بأعلى معايير السلامة والجودة. 
                  فريقنا من المهندسين والفنيين المتخصصين يعملون بجد لضمان تحقيق أفضل النتائج لعملائنا. 
                  نستخدم أحدث المعدات والتقنيات في جميع مراحل العمل، مما يضمن جودة عالية ومتانة طويلة الأمد.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  خدمات إنشاء المسابح: نقدم خدمات إنشاء المسابح الكاملة من التصميم إلى التنفيذ، مع ضمان أعلى معايير الجودة والسلامة. 
                  تشمل خدماتنا جميع أنواع المسابح: المسابح السكنية، المسابح التجارية، المسابح الرياضية، والمسابح العلاجية. 
                  التصميم والتخطيط: نقدم خدمات التصميم والتخطيط المتخصصة لمسابحكم، مع مراعاة جميع المتطلبات والتفاصيل لضمان تحقيق رؤيتكم. 
                  الحفر والإنشاء: نقوم بعمليات الحفر والإنشاء بدقة عالية باستخدام أحدث المعدات والتقنيات لضمان جودة البناء. 
                  الإنهاء والتركيب: نقدم خدمات الإنهاء والتركيب المتخصصة لجميع أنظمة المسابح والمعدات المرتبطة بها. 
                  أنواع المسابح: ننشئ جميع أنواع المسابح: السكنية، التجارية، الرياضية، والعلاجية، مع تلبية جميع المتطلبات الخاصة. 
                  المعدات الحديثة: نستخدم أحدث المعدات والتقنيات في جميع مراحل إنشاء المسابح لضمان الجودة والمتانة. 
                  مواد عالية الجودة: نستخدم فقط المواد عالية الجودة والمعتمدة لضمان متانة المسابح وجمالها على المدى الطويل.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  خدمات صيانة المسابح: نقدم خدمات صيانة شاملة ومتكاملة للمسابح لضمان استمرار عملها بكفاءة عالية. 
                  تشمل خدمات الصيانة: التنظيف الدوري، فحص وصيانة المعدات، معالجة المياه، والإصلاحات اللازمة. 
                  التنظيف الدوري: نقدم خدمات التنظيف الدوري الشاملة للمسابح، بما في ذلك تنظيف الجدران والأرضيات، وإزالة الأوساخ والطحالب. 
                  صيانة المعدات: نقوم بفحص وصيانة جميع معدات المسابح بانتظام، بما في ذلك المضخات، الفلاتر، وأنظمة التدفئة والتبريد. 
                  معالجة المياه: نقدم خدمات معالجة المياه المتخصصة لضمان نظافة وسلامة مياه المسابح، مع فحص مستويات الكلور والمواد الكيميائية. 
                  الإصلاحات والتجديدات: نقدم خدمات الإصلاح والتجديد للمسابح القائمة، بما في ذلك إصلاح التشققات، استبدال البلاط، وتحديث الأنظمة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  لماذا تختار شركة ركن النخيل؟ خبرة واسعة: سنوات من الخبرة في مجال إنشاء وصيانة المسابح، مع فريق من المهندسين والفنيين المتخصصين. 
                  ضمان الجودة: نضمن أعلى معايير الجودة في جميع خدماتنا، مع استخدام مواد ومعدات عالية الجودة ومعتمدة. 
                  تقنيات حديثة: نستخدم أحدث التقنيات والمعدات في جميع مراحل العمل لضمان الكفاءة والجودة العالية. 
                  خدمة عملاء متميزة: نقدم خدمة عملاء متميزة مع متابعة مستمرة ودعم فني متواصل لضمان رضاكم التام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
