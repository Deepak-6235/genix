"use client";

import Link from "next/link";
import Image from "next/image";
import { useServicesContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InteriorExteriorRestorationContent() {
  const t = useServicesContentTranslations();
  const { dir } = useLanguage();
  const service = t.services.restoration;
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
                  src="/images/service-7.jpg"
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
                خدمات الترميم الشاملة
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                حلول متكاملة لترميم المباني والمساحات
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نقدم مجموعة واسعة من خدمات الترميم الداخلي والخارجي التي تغطي جميع احتياجات المباني والمساحات. 
                  من الترميمات البسيطة إلى المشاريع الكبيرة والمعقدة، نحن هنا لمساعدتكم في إعادة الحياة إلى ممتلكاتكم. 
                  نستخدم أحدث التقنيات والمواد عالية الجودة لضمان نتائج دائمة ومقاومة للعوامل الجوية، مع الالتزام بأعلى معايير الجودة والسلامة في جميع أعمال الترميم.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  خدماتنا المقدمة: الترميم الداخلي - ترميم الجدران والأسقف والأرضيات، إصلاح الأعمال الكهربائية والسباكة، تجديد الديكورات الداخلية. 
                  الترميم الخارجي - ترميم الواجهات الخارجية، إصلاح الأسطح والجدران، معالجة التسريبات والعزل المائي والحراري. 
                  الترميم الإنشائي - تقوية الهياكل، إصلاح الشقوق والتصدعات، معالجة مشاكل الأساسات والجدران الحاملة. 
                  الدهانات والتشطيبات - دهانات داخلية وخارجية عالية الجودة، تشطيبات نهائية متقنة، معالجة الأسطح قبل الدهان. 
                  العزل المائي - عزل الأسطح والجدران والأساسات ضد الرطوبة والمياه، استخدام مواد عزل حديثة ومقاومة. 
                  خدمات الصيانة - صيانة دورية للمباني، فحص شامل للهياكل، إصلاحات سريعة وطارئة، خطط صيانة وقائية.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  الترميم الداخلي: نقدم خدمات ترميم داخلي شاملة لإعادة تأهيل المساحات الداخلية للمباني. نعمل على تحسين الجمالية والوظائف مع الحفاظ على الطابع الأصلي للمكان. 
                  ترميم الجدران والأسقف: إصلاح الشقوق والتصدعات في الجدران، ترميم الأسقف المتضررة، معالجة الرطوبة والعفن، تجديد الدهانات والتشطيبات. 
                  ترميم الأرضيات: إصلاح الأرضيات الخرسانية والبلاط، ترميم الأرضيات الخشبية، تركيب أرضيات جديدة عالية الجودة، معالجة التسويات والانحناءات.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  الترميم الخارجي: نقدم خدمات ترميم خارجي متخصصة لحماية وتحسين مظهر المباني الخارجية. نستخدم مواد عالية الجودة مقاومة للعوامل الجوية لضمان نتائج دائمة. 
                  ترميم الواجهات: ترميم الواجهات الحجرية والخرسانية، تنظيف وترميم الواجهات الزجاجية، إصلاح الشقوق والتلف في الواجهات، دهانات خارجية مقاومة للطقس. 
                  ترميم الأسطح: إصلاح تسريبات الأسطح، عزل مائي وحراري للأسطح، ترميم الأسطح الخرسانية، صيانة أنظمة الصرف والتصريف.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  لماذا تختار ركن النخيل؟ خبرة واسعة: فريق من الخبراء المحترفين مع سنوات من الخبرة في مجال الترميم والصيانة، قادرون على التعامل مع جميع أنواع المشاريع. 
                  مواد عالية الجودة: نستخدم فقط المواد والمنتجات عالية الجودة والمقاومة للعوامل الجوية لضمان نتائج دائمة ومقاومة. 
                  التزام بالمواعيد: نلتزم بمواعيد التسليم المتفق عليها ونكمل المشاريع في الوقت المحدد دون تأخير. 
                  أسعار تنافسية: نقدم خدمات عالية الجودة بأسعار تنافسية وعادلة مع ضمان أفضل قيمة مقابل المال.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
