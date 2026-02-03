"use client";

import Link from "next/link";

/**
 * Pest Control Content Component
 * 
 * This component displays the pest control service page with:
 * - A hero section with breadcrumb navigation
 * - Introduction about pest control
 * - Services offered section
 * - Target pests information
 * - Methods of pest control
 * - Service guarantees section
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Service cards with icons
 */

export default function PestControlContent() {
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
                <li className="text-slate-900 font-semibold">مكافحة الحشرات</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                مكافحة الحشرات
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
                  ببساطة، يعتبر الحفاظ على بيئة نظيفة وخالية من الحشرات الضارة أمراً أساسياً لضمان سلامة وصحة الأفراد والمجتمعات. 
                  تعتبر خدمة ابادة الحشرات أحد الوسائل الفعالة للتحكم في الأفرازات الضارة والحد من تأثيرها الضار على البيئة والصحة العامة. 
                  تتسبب الحشرات المتواجدة في المنازل والمؤسسات في انتقال الأمراض وتلويث البيئة، مما يجعل ابادتها أمراً ضرورياً لضمان بيئة صحية ومستدامة. 
                  بالإضافة إلى ذلك، يتم التركيز في هذه الخدمة على استخدام تقنيات آمنة للبيئة وللصحة البشرية، مما يساهم في الحفاظ على التوازن البيئي وضمان سلامة العائلات والمجتمعات.
                </p>
              </div>
            </div>

            {/* Services Offered Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  خدمات ابادة الحشرات في الرياض
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
                  الخدمات المقدمة:
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نفتخر بتقديم خدمات ابادة الحشرات المتخصصة في مدينة الرياض، ملتزمون بتوفير حلول فعّالة للحفاظ على بيئة نظيفة وصحية في منازلكم ومؤسساتكم. 
                  نقدم باقة شاملة من الخدمات للتحكم في الحشرات والتخلص منها بشكل دائم.
                </p>
              </div>

              {/* Target Pests Section */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
                  الحشرات المستهدفة:
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن نتعامل مع مجموعة واسعة من الحشرات الضارة التي قد تكون مصدر إزعاج وتهديد للبيئة المحيطة بكم. تشمل هذه الحشرات ولكن لا تقتصر عليها:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10">
                  {/* Cockroaches */}
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">صراصير</h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      تعد صراصير من الحشرات الشائعة التي تتسبب في انتشار الأمراض وتلويث المساحات.
                    </p>
                  </div>

                  {/* Ants */}
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">نمل</h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      يمكن أن يكون وجود النمل مزعجاً ومدمراً للطعام والممتلكات.
                    </p>
                  </div>

                  {/* Mice */}
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">فئران</h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      نقدم حلولاً فعّالة للتحكم في الفئران والوقاية من انتشارها.
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-10 text-center">
                  تعتمد خدماتنا على أحدث التقنيات في مجال ابادة الحشرات، مع التركيز على السلامة والكفاءة لضمان حماية منازلكم ومكاتبكم. 
                  اتصلوا بنا اليوم للاستفادة من خبرتنا في هذا المجال والتخلص من الحشرات وبشكل دائم.
                </p>
              </div>
            </div>

            {/* Methods of Pest Control Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  طرق ابادة الحشرات
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
                  التقنيات المتقدمة:
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نتبنى أحدث التقنيات في عمليات ابادة الحشرات لضمان فعالية وكفاءة النتائج. 
                  إليك لمحة عن بعض التقنيات التي نستخدمها:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Thermal Technology */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8 rounded-xl shadow-md border border-red-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">التقنية الحراري</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نستخدم البخار الحار لتفتيت الحشرات في جميع مراحل حياتها، مما يؤدي إلى تدميرها بشكل فعّال دون التأثير على البيئة.
                  </p>
                </div>

                {/* Biological Pesticides */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-xl shadow-md border border-green-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">المبيدات البيولوجية</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نعتمد على المبيدات الطبيعية والآمنة للبيئة التي تستهدف الحشرات بدقة دون التسبب في آثار جانبية على الصحة البشرية.
                  </p>
                </div>

                {/* Biological Control Methods */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-md border border-blue-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">أساليب الترابط الحيوي</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نستخدم أساليب الترابط الحيوي للتحكم في الحشرات عبر استخدام عوامل طبيعية مثل الأعداء الطبيعيين لها دون الحاجة إلى مواد كيميائية ضارة.
                  </p>
                </div>
              </div>

              {/* Safe Usage Section */}
              <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-blue-50 rounded-xl p-6 sm:p-8 md:p-10 border border-blue-100">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الاستخدام الآمن</h4>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center">
                    نحرص على استخدام تقنيات ابادة الحشرات بشكل آمن للبيئة وللصحة البشرية. نقوم بتحديد الكميات المناسبة من المواد ونوفر تدابير وقائية لحماية السكان والبيئة. 
                    كما نلتزم بالتقيد بأعلى معايير السلامة والصحة في جميع عملياتنا لضمان سلامة العملاء والبيئة المحيطة.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Guarantees Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  ضمان الخدمة
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نلتزم بتقديم خدمات ابادة الحشرات بأعلى مستويات الجودة، ونهدف إلى راحة ورضا عملائنا. 
                  لذلك، نقدم ضمانات قوية لضمان استمرار الحماية والتأكد من راحتكم بعد إجراء عمليات ابادة الحشرات.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Effectiveness Guarantee */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">ضمان الفعالية</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نؤكد على فعالية خدماتنا في التخلص من الحشرات بشكل دائم. إذا كان هناك أي استمرار في وجود الحشرات بعد الخدمة، سنعيد التدخل مجانًا.
                  </p>
                </div>

                {/* Satisfaction Guarantee */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">ضمان الرضا الكامل</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نسعى لتحقيق رضا تام لعملائنا. إذا لم تكونوا راضين عن الخدمة في أي نقطة، فلا تترددوا في الاتصال بنا، وسنعمل جاهدين لتحقيق توقعاتكم.
                  </p>
                </div>

                {/* Privacy Guarantee */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">ضمان سرية المعلومات</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نحرص على سرية المعلومات الخاصة بكم. لا نشارك أو نكشف عن معلومات عملائنا لأي طرف ثالث، ونحترم خصوصية كل عميل.
                  </p>
                </div>

                {/* After-Sales Service */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">خدمة ما بعد البيع</h4>
                  <p className="text-base text-slate-700 leading-relaxed">
                    نقدم دعماً مستمرًا بعد إجراء عمليات الابادة. يمكنكم الاتصال بنا في أي وقت للإبلاغ عن أي مشكلة أو طلب استفسار، وسنقوم بالرد بسرعة.
                  </p>
                </div>
              </div>

              <div className="max-w-4xl mx-auto mt-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  نعتبر ضماناتنا استثمارًا في راحة عقول عملائنا، ونهدف إلى بناء علاقات قوية ومستدامة معكم. 
                  اختر خدمات ابادة الحشرات من شركة ركن النخيل واستمتع ببيئة نظيفة وآمنة دائمًا.
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                احصل على خدمة مكافحة الحشرات الآن
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
                اتصل بنا اليوم للاستفادة من خبرتنا في مجال ابادة الحشرات والتخلص منها بشكل دائم. 
                نقدم خدمات متخصصة في مدينة الرياض مع ضمانات قوية وخدمة عملاء متميزة.
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
