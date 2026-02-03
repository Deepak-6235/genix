"use client";

import Link from "next/link";

/**
 * Waterfalls and Fountains Content Component
 * 
 * This component displays the waterfalls and fountains design and construction service page with:
 * - A hero section with breadcrumb navigation
 * - Introduction about waterfalls and fountains services
 * - Company expertise section
 * - Why choose Rukn Al-Nakheel section
 * - Types of fountains section
 * - Waterfall construction section
 * - Features and benefits
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with gradient backgrounds
 * - Service cards with icons
 */

export default function WaterfallsAndFountainsContent() {
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
                <li className="text-slate-900 font-semibold">تصميم وإنشاء الشلالات والنوافير</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                تصميم وإنشاء الشلالات والنوافير
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
                  شركة ركن النخيل لـ تصميم وإنشاء الشلالات والنوافير في الرياض، تجتمع الخبرة والتكنولوجيا معًا لإنشاء نوافير تدهش وتثير الإثارة. 
                  من خلال الجمع بين الإيقاع والماء والضوء، نريد إعادة التناغم بين عمل فني ومفاجأة مع نوافير رائعة تعمل بكامل طاقتها وسهلة الاستخدام.
                </p>
              </div>
            </div>

            {/* Company Expertise Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  شركة تصميم وإنشاء الشلالات والنوافير
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  النوافير والمسطحات المائية: شركة ركن النخيل هي متخصصة في تصميم وإنشاء الشلالات والنوافير والمعالم المائية للهيئات العامة والشركات والأفراد. 
                  نحن نقدم حلولاً كاملة وجاهزة للديكور العام والخاص، مع إضاءة LED وجهاز تحكم عن بعد من الكمبيوتر الشخصي والكمبيوتر اللوحي والهاتف الذكي.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  تقنية سهلة الاستخدام: نقوم بتطوير حلول الأجهزة والبرامج للإدارة الكاملة للنوافير الصغيرة والمتوسطة والكبيرة والمتنزهات المائية. 
                  واجهات بديهية لإدارة النوافير وخصائص المياه قادرة على ضمان كفاءة عالية للنظام وأقل استهلاك للطاقة.
                </p>
              </div>
            </div>

            {/* Why Choose Rukn Al-Nakheel Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  لماذا شركة ركن النخيل؟
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Experience */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-md border border-blue-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الخبرة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    الخبرة المكتسبة في مجال تصميم وإنشاء الشلالات والنوافير الصغيرة والمتوسطة والكبيرة.
                  </p>
                </div>

                {/* Innovation */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-xl shadow-md border border-green-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الابتكار</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    البحث المستمر في تطوير المنتجات والمكونات التي تسهل بناء وصيانة وإدارة النوافير وخصائص المياه.
                  </p>
                </div>

                {/* Quality */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-xl shadow-md border border-purple-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">جودة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نستخدم الفولاذ المقاوم للصدأ والمكونات الكهربائية وفقًا للقانون لنقدم لك أكبر قدر من الكفاءة في ميزات المياه وأكبر توفير للطاقة.
                  </p>
                </div>
              </div>
            </div>

            {/* Rukn Al-Nakheel Fountains Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  نوافير شركة ركن النخيل
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  تضفي النافورة دائمًا لمسة من الأناقة وتساعد في جعل حديقتك أكثر سحراً. يمكنك تأثيث البيئة وتحسينها وتحويلها بإدخال بسيط لميزة مائية. 
                  نفاثات أو شلالات من الماء تتلألأ في ضوء الشمس أو مضاءة في الليل تجذب انتباهنا وتريحنا.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  لطالما كانت الألعاب المائية تمثل رموزًا للجمال ونوعية الحياة: نوافير الحدائق، النوافير العامة أو السكنية، النوافير الحديثة، النوافير الضخمة، 
                  النوافير الخارجية أو الداخلية، نوافير الزينة، النوافير الفنية، النوافير الموسيقية أو الراقصة. هناك أنواع لا حصر لها من الألعاب المائية الممكنة، 
                  يمكن احتواؤها في أحواض أو برك، ويمكن بناؤها من الحجر والرخام والحديد الزهر، ويمكن تجهيزها بنفاثات وفوهات وشفرات من المياه وأجهزة أكسجين، 
                  يمكن أن تضيء بمصابيح هالوجين أو متوهجة، بألياف بصرية أو مصابيح LED.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  تقوم شركة ركن النخيل بتصميم النوافير لسنوات وتستفيد من تعاون شركات التركيب المتخصصة القادرة على تنفيذ بنائها بأساليب حديثة ومهنية. 
                  تعد صيانة النوافير والبرك عنصرًا أساسيًا للحفاظ على الجمال الذي يتخيله المصمم دون تغيير، ولهذا السبب من الضروري أن تكون أتمتة النافورة مناسبة 
                  وأن الرعاية والتنظيف يعهد بها إلى خبراء ومؤهلين. ستجد في هذا الموقع الكثير من المعلومات المفيدة لإنشاء نافورة وأيضًا: مخططات النوافير، ورسومات النوافير.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  نحن قادرون على إنشاء نوافير بالقرب من المسبح أو مستقلة عنه وكذلك الشلالات والألعاب المائية الأخرى.
                </p>
              </div>
            </div>

            {/* Types of Fountains Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  انواع النوافير
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {/* Urban Fountains */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 text-center">نوافير للمساحات العمرانية</h4>
                  <p className="text-sm sm:text-base text-slate-600 text-center">
                    تقوم شركة ركن النخيل بتصميم وتصنيع أنواع مختلفة من النوافير لمساحات المدينة، وتقدم كل كفاءة الحلول المتقدمة تقنيًا وباستخدام مواد عالية الجودة. 
                    نوفر لك كل جمال الألعاب المائية والتأثيرات التي تمنح الجمهور عرضًا فريدًا ومثيرًا، جنبًا إلى جنب مع إعادة تطوير وتعزيز وتكامل السياق الحضري والمعماري المحيط.
                  </p>
                </div>

                {/* Corporate and Individual Fountains */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 text-center">نوافير للشركات والأفراد</h4>
                  <p className="text-sm sm:text-base text-slate-600 text-center">
                    عنصر أساسي لا يمكن الاستغناء عنه في كوكبنا، الماء له معنى رمزي يرى أنه بطل الرواية في المتنزهات والحدائق وأماكن الاجتماع. 
                    بالنسبة للشركات والأفراد، تقوم شركة ركن النخيل بإنشاء نوافير صغيرة ومتوسطة الحجم مع أنظمة إضاءة وإدارة ذكية لعمل ميزات المياه، 
                    مما يخلق أشكالًا وألوانًا مائية ذات تأثير بصري وجمالي قوي.
                  </p>
                </div>

                {/* Water Garden Fountains */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 text-center">نوافير حدائق مائية</h4>
                  <p className="text-sm sm:text-base text-slate-600 text-center">
                    متعة، وأكثر متعة! إنها الكلمة الأساسية لحديقة مائية ناجحة. لا تقدم لك شركة ركن النخيل أنواعًا مختلفة من النوافير وخصائص المياه الديناميكية فحسب، 
                    بل تقدم لك كل خبرتها والتكنولوجيا الأكثر ابتكارًا لبرمجة إدارة الحدائق المائية الكبيرة بكل بساطة وبأقصى قدر من توفير الطاقة.
                  </p>
                </div>
              </div>
            </div>

            {/* Waterfall Construction Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  إنشاء الشلالات
                </h2>
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  تعتبر الشلالات وبرك الحدائق من العناصر الجذابة التي تحظى بتقدير كبير ولكن يمكن تحقيقها أيضًا بتكلفة معقولة، لتعزيز المساحات السكنية في الهواء الطلق.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نتبع جميع أنواع النوافير والشلالات، للأثاث الحضري أو للمناطق الخاصة، من قبلنا في كل مرحلة: المساعدة في التصميم، والتزويد المحتمل للمكونات، 
                  والمساعدة في التثبيت مع إجابات فورية على الهاتف وإرسال أي تعليمات أخرى، وكذلك الرسومات أو الصور التفصيلية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
                {/* Movement */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-md border border-blue-100">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">الحركة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نتعامل بشكل خاص مع النوافير الموسيقية المتحركة والديناميكية والتفاعلية والمتسلسلة والرقص والانعكاس أو مع التحول النهائي للأنظمة الحالية.
                  </p>
                </div>

                {/* Lighting */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 sm:p-8 rounded-xl shadow-md border border-yellow-100">
                  <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 text-center">إضاءة</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                    نتابع باستمرار التطورات في قطاع أجهزة الإسقاط الضوئي LED للحصول على أحدث الحلول، سواء مع الألوان الثابتة أو اللونية الديناميكية باستخدام أجهزة عرض RGB، 
                    نقوم بتنفيذ البرمجة من أبسطها إلى أكثرها تعقيدًا لتغييرات الألوان أو ظلال اللون، والتي تتعلق أيضًا بحركة.
                  </p>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-blue-50 rounded-xl p-6 sm:p-8 md:p-10 border border-blue-100">
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                    في شركة ركن النخيل لـ تصميم وإنشاء الشلالات والنوافير ترتكز مهاراتنا الفنية على الهندسة. لذلك نحن قادرون على تصميم وتنفيذ حلول تقنية بسيطة وعملية 
                    لحل حتى أكثر المشاكل تعقيدًا. بفضل خبرتنا التي امتدت ل 10 سنوات في قطاع النافورات، يمكننا تصميم أي نوع من الأنظمة، بكل التفاصيل، مع احترام اللوائح المعمول بها.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                احصل على خدمة تصميم وإنشاء الشلالات والنوافير الآن
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
                اتصل بنا اليوم للاستفادة من خبرتنا في مجال تصميم وإنشاء الشلالات والنوافير. 
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
