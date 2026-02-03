"use client";

import Link from "next/link";

/**
 * Swimming Pools Construction and Maintenance Content Component
 * 
 * This component displays the swimming pool construction and maintenance service page with:
 * - A hero section with breadcrumb navigation
 * - Introduction about swimming pool services
 * - Company expertise section
 * - Construction services section
 * - Maintenance services section
 * - Features and benefits
 * - Service guarantees section
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Service cards with icons
 */

export default function SwimmingPoolsContent() {
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
                <li className="text-slate-900 font-semibold">إنشاء وصيانة المسابح</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                إنشاء وصيانة المسابح
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
                  تعتبر شركتنا الرائدة والأولى في إنشاء وتصميم وصيانة المسابح بالمملكة العربية السعودية. 
                  نحن نقدم خدمات شاملة ومتكاملة لإنشاء وصيانة المسابح بأعلى معايير الجودة والكفاءة. 
                  من التصميم الأولي إلى التنفيذ والصيانة الدورية، نضمن لكم حوض سباحة مثالي يلبي جميع احتياجاتكم وتطلعاتكم.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  مع سنوات من الخبرة في هذا المجال، أصبحنا الخيار الأول للعديد من العملاء في المملكة العربية السعودية. 
                  نستخدم أحدث التقنيات والمواد عالية الجودة لضمان متانة المسابح وجمالها، مع الالتزام بأعلى معايير السلامة والجودة.
                </p>
              </div>
            </div>

            {/* Company Expertise Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  شركة إنشاء وصيانة المسابح
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نفتخر بأننا الشركة الرائدة في مجال إنشاء وصيانة المسابح في المملكة العربية السعودية. 
                  نقدم حلولاً متكاملة وشاملة لجميع احتياجات المسابح، من التصميم والإنشاء إلى الصيانة الدورية والإصلاحات.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  فريقنا من المهندسين والفنيين المتخصصين يعملون بجد لضمان تحقيق أفضل النتائج لعملائنا. 
                  نستخدم أحدث المعدات والتقنيات في جميع مراحل العمل، مما يضمن جودة عالية ومتانة طويلة الأمد.
                </p>
              </div>
            </div>

            {/* Construction Services Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  خدمات إنشاء المسابح
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نقدم خدمات إنشاء المسابح الكاملة من التصميم إلى التنفيذ، مع ضمان أعلى معايير الجودة والسلامة. 
                  تشمل خدماتنا جميع أنواع المسابح: المسابح السكنية، المسابح التجارية، المسابح الرياضية، والمسابح العلاجية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Design and Planning */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-md border border-blue-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">التصميم والتخطيط</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نقدم خدمات التصميم والتخطيط المتخصصة لمسابحكم، مع مراعاة جميع المتطلبات والتفاصيل لضمان تحقيق رؤيتكم.
                  </p>
                </div>

                {/* Excavation and Construction */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 sm:p-8 rounded-xl shadow-md border border-orange-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الحفر والإنشاء</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نقوم بعمليات الحفر والإنشاء بدقة عالية باستخدام أحدث المعدات والتقنيات لضمان جودة البناء.
                  </p>
                </div>

                {/* Finishing and Installation */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-xl shadow-md border border-green-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الإنهاء والتركيب</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نقدم خدمات الإنهاء والتركيب المتخصصة لجميع أنظمة المسابح والمعدات المرتبطة بها.
                  </p>
                </div>

                {/* Pool Types */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-xl shadow-md border border-purple-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">أنواع المسابح</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    ننشئ جميع أنواع المسابح: السكنية، التجارية، الرياضية، والعلاجية، مع تلبية جميع المتطلبات الخاصة.
                  </p>
                </div>

                {/* Modern Equipment */}
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 sm:p-8 rounded-xl shadow-md border border-cyan-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">المعدات الحديثة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نستخدم أحدث المعدات والتقنيات في جميع مراحل إنشاء المسابح لضمان الجودة والمتانة.
                  </p>
                </div>

                {/* Quality Materials */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 sm:p-8 rounded-xl shadow-md border border-indigo-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">مواد عالية الجودة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نستخدم فقط المواد عالية الجودة والمعتمدة لضمان متانة المسابح وجمالها على المدى الطويل.
                  </p>
                </div>
              </div>
            </div>

            {/* Maintenance Services Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  خدمات صيانة المسابح
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نقدم خدمات صيانة شاملة ومتكاملة للمسابح لضمان استمرار عملها بكفاءة عالية. 
                  تشمل خدمات الصيانة: التنظيف الدوري، فحص وصيانة المعدات، معالجة المياه، والإصلاحات اللازمة.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Regular Cleaning */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">التنظيف الدوري</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقدم خدمات التنظيف الدوري الشاملة للمسابح، بما في ذلك تنظيف الجدران والأرضيات، وإزالة الأوساخ والطحالب.
                  </p>
                </div>

                {/* Equipment Maintenance */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">صيانة المعدات</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقوم بفحص وصيانة جميع معدات المسابح بانتظام، بما في ذلك المضخات، الفلاتر، وأنظمة التدفئة والتبريد.
                  </p>
                </div>

                {/* Water Treatment */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">معالجة المياه</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقدم خدمات معالجة المياه المتخصصة لضمان نظافة وسلامة مياه المسابح، مع فحص مستويات الكلور والمواد الكيميائية.
                  </p>
                </div>

                {/* Repairs and Renovations */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">الإصلاحات والتجديدات</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقدم خدمات الإصلاح والتجديد للمسابح القائمة، بما في ذلك إصلاح التشققات، استبدال البلاط، وتحديث الأنظمة.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  لماذا تختار شركة ركن النخيل؟
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Experience */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-md border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">خبرة واسعة</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    سنوات من الخبرة في مجال إنشاء وصيانة المسابح، مع فريق من المهندسين والفنيين المتخصصين.
                  </p>
                </div>

                {/* Quality Guarantee */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-xl shadow-md border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">ضمان الجودة</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نضمن أعلى معايير الجودة في جميع خدماتنا، مع استخدام مواد ومعدات عالية الجودة ومعتمدة.
                  </p>
                </div>

                {/* Modern Technology */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-xl shadow-md border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">تقنيات حديثة</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نستخدم أحدث التقنيات والمعدات في جميع مراحل العمل لضمان الكفاءة والجودة العالية.
                  </p>
                </div>

                {/* Customer Service */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 sm:p-8 rounded-xl shadow-md border border-orange-100">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">خدمة عملاء متميزة</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقدم خدمة عملاء متميزة مع متابعة مستمرة ودعم فني متواصل لضمان رضاكم التام.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                احصل على خدمة إنشاء وصيانة المسابح الآن
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
                اتصل بنا اليوم للاستفادة من خبرتنا في مجال إنشاء وصيانة المسابح. 
                نقدم خدمات متخصصة في المملكة العربية السعودية مع ضمانات قوية وخدمة عملاء متميزة.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                اتصل بنا الآن
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
