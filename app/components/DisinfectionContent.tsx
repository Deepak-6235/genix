"use client";

import Link from "next/link";

/**
 * Disinfection Against Viruses Content Component
 * 
 * This component displays the disinfection service page with:
 * - A hero section with breadcrumb navigation
 * - Service description and benefits
 * - Process information
 * - Business sectors
 * - Recommendations
 */

export default function DisinfectionContent() {
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
                  <Link href="/#services" className="hover:text-blue-600 transition-colors">
                    الخدمات
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">تعقيم ضد الفيروسات</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              تعقيم ضد الفيروسات
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              في ركن النخيل نقدم خدمة التنظيف والتعقيم ضد الفيروسات. في عملية عملنا، نقوم بالتنظيف والتعقيم بمطهرات واسعة النطاق. خلال خدمة التطهير والتنظيف لدينا، نمنع انتشار فيروس كورونا.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT SECTION
          ============================================ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Company Disinfection Services */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                شركة تعقيم ضد الفيروسات في مراكز العمل والمكاتب
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                في ركن النخيل نحن متخصصون في تنظيف وتعقيم فيروس كورونا في الشركات. نحن نعمل على تطهير مراكز العمل والمكاتب لمنع انتشار COVID-19 وفي الشركات التي ثبتت إصابتها بفيروس كورونا.
              </p>
            </div>

            {/* Company Disinfection in Riyadh */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                تعقيم الشركات في الرياض
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                قمنا بتنظيف وتطهير الشركات الناجحة بنسبة مائة بالمائة من قطاعات مختلفة في الرياض.
              </p>
            </div>

            {/* Vehicle Disinfection */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                تطهير سيارات النقل والشرطة وسيارات الإسعاف
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                في شركتنا الخاصة بتنظيف وتعقيم الفيروسات والآفات، نحن متخصصون في تعقيم السيارات.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                نجحنا حتى الآن في تطهير وسائل النقل التالية من فيروس كورونا أو كوفيد -19:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4 mb-4">
                <li>سيارات الشرطة</li>
                <li>سيارات الاسعاف</li>
                <li>كبائن الشاحنات</li>
              </ul>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                في ركن النخيل، ندرك الأهمية الكبيرة لاستخدام الشاحنات لنقل المنتجات الأساسية في الوضع الحالي. خاصة السيارات التي تضمن سلامتنا والتي تساعد الناس على علاج أنفسهم من فيروس كورونا. لهذا السبب، من المهم جدًا تطهير وتنظيف الكائنات الحية الدقيقة من الأسطح التي كانت على اتصال بالأشخاص والتي تنقل البضائع أو الأشخاص وسيارات الإسعاف والشرطة.
              </p>
            </div>

            {/* Home Disinfection */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                هل ترغب في الحصول على بيئة نظيفة ومعقمة في المنزل؟
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                مع هذه الخدمة تكافح الفيروسات والجراثيم والبكتيريا والفطريات بفاعلية 99.9٪. التطهير مع الخبرة.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                إذا كان منزلك يعرض حالة مرض كوفيد، فيجب عليك الحصول على عناصر حماية خاصة. موظفونا متخصصون في التعقيم ضد الفيروسات ويتم حمايتهم من القدم إلى الرقبة ببدلة خاصة للسلامة البيولوجية وقناع نصف وجه مزود بفلتر بخار، بالإضافة إلى تنفيذ بروتوكول تطهير قبل دخول منزلك.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                كلما زادت مرات التطهير، قل خطر الإصابة بالفيروسات والبكتيريا والجراثيم في أماكنك.
              </p>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                بعض التوصيات
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">قبل:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4">
                    <li>لا حاجة لإخلاء المساحات</li>
                    <li>يجب ألا تغطي أي سطح أو عنصر</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">خلال:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4">
                    <li>نوصي بأن يرافق العملية فرد واحد فقط من الأسرة. سنرتدي أقنعة الوجه لحمايتك</li>
                    <li>لا يولد الروائح أو الحساسية. كما أنه لا يسبب آثارًا جانبية عند الأطفال أو كبار السن أو الحيوانات الأليفة</li>
                    <li>قد يتم تنشيط أجهزة كشف الدخان</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">ثم:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4">
                    <li>يجب ألا تكون في منزلك خلال الساعة التي تلي التطهير</li>
                    <li>ليس من الضروري التجفيف أو التنظيف أو المسح بعد التطهير</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits of Home Disinfection */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                فوائد تطهير منزلي
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                هل تريدين الحفاظ على منزلك خالي من الجراثيم والبكتيريا؟ من خلال خدمة التطهير المنزلية التي نقدمها، يمكنك أن تكون هادئًا في المنزل، مع بيئة نظيفة ومعقمة. تم تصميم هذه الخدمة من أجل رفاهيتك ورفاهية عائلتك.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                سيضمن إجراء التطهير الصحيح للمنازل توفير مساحة صحية تمامًا لك ولعائلتك.
              </p>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">صفات خبراء التطهير لدينا</h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                يتميز ركن النخيل بكونهم خبراء في ما يفعلونه. سيصلون إلى منزلك في الوقت المحدد وبسلوك إيجابي ومحترم سوف يمتثلون للخدمة. سوف يتركون جميع المساحات في منزلك مطهرة تمامًا ولا تقلق، فجميع ركن النخيل لدينا تلبي معايير الاختيار العالية. بالإضافة إلى ذلك، سوف يذهبون إلى منزلك مع جميع بروتوكولات الأمن البيولوجي لدخول منزلك أو شقتك.
              </p>
            </div>

            {/* Disinfection Process */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                عملية التعقيم ضد الفيروسات
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                الضباب هو تقنية تتكون من تشتيت الجزيئات الدقيقة التي تبقى معلقة في الهواء بآلة، وترسبها على جميع أسطح السيارة أو الصناعة أو المكتب.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                من خلال هذه العملية نحصل على مساحة لترطيب، مما يسمح للمطهر بالتصرف ضد فيروس كورونا.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                بهذه الطريقة، يمكن للمنتج المستخدم في تطهير وتنظيف COVID-19 الوصول إلى جميع المناطق، حتى تلك التي يصعب الوصول إليها، وبالتالي تدمير جميع الكائنات الحية الفيروسية.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                في عملية تطهير فيروس كورونا، نستخدم مطهرًا واسع النطاق يمكننا، جنبًا إلى جنب مع عملية الرذاذ، الوصول إلى جميع المناطق والزوايا التي يصعب الوصول إليها.
              </p>
            </div>

            {/* Business Sectors */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                قطاعات الأعمال حيث يتم فيها التعقيم ضد الفيروسات
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4">
                  <li>مكاتب</li>
                  <li>غرف الراحة</li>
                  <li>غرف الطعام</li>
                  <li>المطارات</li>
                  <li>مولات</li>
                  <li>مراكز رياضية</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 mr-4">
                  <li>مراكز ترفيهية</li>
                  <li>محطات النقل</li>
                  <li>الفنادق</li>
                  <li>أرض المعارض</li>
                  <li>أكشاك الأمن</li>
                  <li>الصناعات</li>
                </ul>
              </div>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-6">
                هذه قطاعات بها تدفق كبير من الناس، خاصة في الأماكن ذات الزيارات في جميع أنحاء العالم.
              </p>
            </div>

            {/* Peace of Mind */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                راحة البال لك ولعائلتك
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                لم يعد لديك ما يدعو للقلق بشأن تعقيم ضد الفيروسات لمنزلك او شركات ونسيان البحث عن شركات تطهير مختلفة. مع ركن النخيل يمكنك أن تكون هادئًا وآمنًا، لأننا نعتني بكل شيء باستخدام المطهرات المتخصصة من خلال البخاخات، بدون روائح أو آثار جانبية وليست سامة.
              </p>
            </div>

            {/* Recommendations for Disinfection */}
            <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                توصيات عند تطهير منزلك
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                عندما يصل أخصائي التطهير إلى منزلك، يجب أن تتحقق من أنه محمي ببدلة خاصة للسلامة البيولوجية وقناع نصف وجه مزود بفلتر بخار. تذكر أنه لا يجب إخلاء المساحات أثناء التطهير. ويجب ألا تكون في منزلك لمدة ساعة بعد التطهير.
              </p>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">كيف تتأكد من أن العمل قد تم بشكل صحيح؟</h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                في نهاية الخدمة، ستقوم ركن النخيل بإعلامك بإنهاء الخدمة، يجب عليك التحقق من أن كل شيء في حالة ممتازة وشكر محترفنا. خلاف ذلك، يمكنك أن تطلب منه من فضلك مساعدتك في تطهير المنطقة المفقودة. تذكر أنه في نهاية الخدمة يمكنك تقييمها وتقديم اقتراحات وتعليقات.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                إذا كنت تريد أن يكون كل ركن من أركان منزلك خاليًا من الفيروسات والجراثيم والبكتيريا، فنحن نساعدك على القيام بذلك. سيذهب أحد خبرائنا إلى منزلك لإجراء تطهير البخاخات، والذي سيتم تطبيقه في بيئة كل مساحة.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 sm:p-10 md:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                احصل على خدمة التعقيم الآن
              </h2>
              <p className="text-lg sm:text-xl mb-6 opacity-90">
                تواصل معنا للحصول على عرض سعر مخصص لخدمة التعقيم ضد الفيروسات
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
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
