"use client";

import Link from "next/link";

/**
 * Air Conditioner Maintenance Content Component
 * 
 * This component displays the air conditioner maintenance service page with:
 * - A hero section with breadcrumb navigation
 * - Introduction about AC maintenance services
 * - Preventive maintenance information
 * - Benefits of AC maintenance
 * - Why maintain ACs section
 * - Why choose Rukn Al-Nakheel section
 * - Service guarantees and features
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Service cards with icons
 */

export default function AirConditionerMaintenanceContent() {
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
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li>
                  <span className="text-slate-600">الخدمات</span>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">صيانة المكيفات</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                صيانة المكيفات
              </h1>
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
            
            {/* Introduction Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-6 text-center">
                  نحن شركة ركن النخيل متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء والتبريد المنزلية والصناعية والمكتبية، 
                  والتي كرست لسنوات عديدة لتقديم خدمات عالية الجودة لتلبية احتياجات عملائنا.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  يجب إجراء صيانة لمكيفات الهواء لتجنب الأمراض، والاستهلاك الكهربائي العالي، وسوء أداء المعدات، 
                  وسيعتمد تكرار كل خدمة على ساعات الاستخدام، وبيئة العمل وعوامل أخرى. كما نقدم افضل خدمات تركيب وصيانة واصلاح مكيفات الهواء.
                </p>
              </div>
            </div>

            {/* Preventive Maintenance Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  ما هي الصيانة الوقائية للمكيفات؟
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 sm:p-10 rounded-2xl">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                    الصيانة الوقائية
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    في الوقائي، نقوم بالتنظيف والتطهير والتشحيم والطلاء للحفاظ على الحالة الجيدة للمعدات.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-10 rounded-2xl">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                    التصحيحات
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    في التصحيحات نقوم بإصلاح أو استبدال الأجزاء التالفة في معدات تكييف الهواء.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 rounded-2xl p-8 sm:p-10">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                  نقوم بتنفيذ الخطط والعقود السنوية وفقًا لاحتياجاتك، مع الاهتمام على مدار 24 ساعة في اليوم وفي أي يوم من أيام السنة.
                </p>
              </div>
            </div>

            {/* What Makes Us Special Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  ما يميزنا
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">ضمان 3 أشهر</h3>
                  <p className="text-sm sm:text-base text-slate-600">ضمان 3 أشهر على الخدمة</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">تسهيلات الدفع</h3>
                  <p className="text-sm sm:text-base text-slate-600">تسهيلات الدفع المتاحة</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">فنيون متخصصون</h3>
                  <p className="text-sm sm:text-base text-slate-600">الفنيين والمهندسين المتخصصين</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">جدولة الخدمة</h3>
                  <p className="text-sm sm:text-base text-slate-600">جدولة خدمة الصيانة</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">دراسة الجدوى</h3>
                  <p className="text-sm sm:text-base text-slate-600">زيارة دراسة الجدوى الفنية</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">خدمة سريعة</h3>
                  <p className="text-sm sm:text-base text-slate-600">خدمة سريعة وفعالة</p>
                </div>
              </div>
            </div>

            {/* Benefits of AC Maintenance Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  مزايا صيانة التكييفات
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">منع تراكم البكتيريا</h3>
                  <p className="text-blue-50">يمنع تراكم البكتيريا والفطريات والعث في الجهاز</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">منع التسرب</h3>
                  <p className="text-emerald-50">يمنع التسرب والرائحة الكريهة</p>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">تقليل الضوضاء</h3>
                  <p className="text-purple-50">يقلل الضوضاء</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">توفير الطاقة</h3>
                  <p className="text-cyan-50">يقلل من استهلاك الطاقة الكهربائية</p>
                </div>

                <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 sm:p-8 rounded-xl shadow-lg text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">إطالة العمر</h3>
                  <p className="text-rose-50">يمنع أكسدة الأجزاء وتآكلها، مما يطيل العمر الإنتاجي للجهاز</p>
                </div>
              </div>
            </div>

            {/* Why Maintain ACs Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
                    لماذا تتم صيانة التكييفات؟
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-center">
                    بمجرد التثبيت، تبدأ دورة حياة الجهاز بإعادة تدوير كميات كبيرة من الهواء كل يوم لتبريد أو تدفئة البيئة.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-center">
                    المعدات التي لا تحتاج إلى صيانة تتراكم فيها الفطريات في علبة المكثفات والأجزاء المبللة، وتمتلئ المرشحات بالغبار، 
                    وتبدأ في الانفصال وتحركها المروحة، وتنتشر في جميع أنحاء البيئة. التسبب في أمراض الجهاز التنفسي وعدم الراحة لدى الأشخاص 
                    المتواجدين في البيئات لساعات، مما يساهم في ما نسميه متلازمة بناء المريض.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-center">
                    هناك العديد من الفوائد التي يقدمها، مثل توفير الطاقة، وتوفير التكاليف للإصلاحات، وقلة التوقفات بسبب الأعطال، 
                    وزيادة العمر الإنتاجي للمعدات، وتحسين جودة الهواء والصحة.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Benefits Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  فوائد صيانة التكييفات
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">يحسن جودة الهواء والصحة</h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    إذا احتفظت بالمعدات في أفضل الظروف، فسيكون الهواء نظيفًا وخالٍ من الجزيئات التي يمكن أن تضر بالصحة أو تعقد أمراض الجهاز التنفسي.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">توفير الطاقة</h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    يساعدك تغيير المرشحات بشكل متكرر على توفير ما يصل إلى 5٪ من فاتورة الطاقة، نظرًا لأن هذه المعدات مسؤولة عن حوالي 30٪. شيء يترجم إلى توفير كبير في الطاقة.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">يزيد من عمر المعدات</h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    يزداد العمر الإنتاجي للمعدات من خلال الصيانة الوقائية، حيث تقوم بإطلاق جزيئات العناصر الداخلية واكتشاف الأعطال وتصحيحها.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Rukn Al-Nakheel Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  لماذا شركة ركن النخيل لصيانة التكييفات؟
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">ضمان</h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        لدينا ضمان من العلامات التجارية المشهورة عالميًا.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">نصيحة فنية مجانية</h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        نحن نقدم المشورة المتخصصة مع أفضل المهنيين في الرياض.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">خدمة 24 ساعة</h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        نضع في خدمتك فريق المهندسين والفنيين لدينا لتقديم المشورة لك في أي وقت من السنة.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">تسهيلات الدفع</h3>
                      <p className="text-base text-slate-700 leading-relaxed">
                        نقدم أسعارًا تنافسية وتسهيلات دفع لعملائنا.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Description Section */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
                  ركن النخيل
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن شركة متخصصة في صيانة التكييفات، تم إنشاء شركة ركن النخيل لتوفير حلول الراحة لمنزلك او شركتك في الرياض. 
                  لدينا قسم من الهندسة والفنيين المتخصصين، الذين يقدمون المشورة، ندرك أن قوتنا تكمن في موظفينا، 
                  الذين نحافظ من أجلهم على ثقافة التحسين المستمر من خلال التدريب لتزويد عملائنا بخدمة عالية الجودة وجديرة بالثقة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وابادة الحشرات داخل المملكة العربية السعودية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
