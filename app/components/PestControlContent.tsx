"use client";

import Link from "next/link";
import Image from "next/image";

export default function PestControlContent() {
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
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center">
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

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-right">
                  مكافحة الحشرات
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center lg:text-right">
                  ببساطة، يعتبر الحفاظ على بيئة نظيفة وخالية من الحشرات الضارة أمراً أساسياً لضمان سلامة وصحة الأفراد والمجتمعات. 
                  تعتبر خدمة ابادة الحشرات أحد الوسائل الفعالة للتحكم في الأفرازات الضارة والحد من تأثيرها الضار على البيئة والصحة العامة. 
                  تتسبب الحشرات المتواجدة في المنازل والمؤسسات في انتقال الأمراض وتلويث البيئة، مما يجعل ابادتها أمراً ضرورياً لضمان بيئة صحية ومستدامة. 
                  بالإضافة إلى ذلك، يتم التركيز في هذه الخدمة على استخدام تقنيات آمنة للبيئة وللصحة البشرية، مما يساهم في الحفاظ على التوازن البيئي وضمان سلامة العائلات والمجتمعات.
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-1.jpg"
                  alt="مكافحة الحشرات"
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
                خدمات ابادة الحشرات في الرياض
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                الخدمات المقدمة
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نحن في شركة ركن النخيل نفتخر بتقديم خدمات ابادة الحشرات المتخصصة في مدينة الرياض، ملتزمون بتوفير حلول فعّالة للحفاظ على بيئة نظيفة وصحية في منازلكم ومؤسساتكم. 
                  نقدم باقة شاملة من الخدمات للتحكم في الحشرات والتخلص منها بشكل دائم. نحن نتعامل مع مجموعة واسعة من الحشرات الضارة التي قد تكون مصدر إزعاج وتهديد للبيئة المحيطة بكم. 
                  تشمل هذه الحشرات ولكن لا تقتصر عليها: صراصير - تعد صراصير من الحشرات الشائعة التي تتسبب في انتشار الأمراض وتلويث المساحات. نمل - يمكن أن يكون وجود النمل مزعجاً ومدمراً للطعام والممتلكات. 
                  فئران - نقدم حلولاً فعّالة للتحكم في الفئران والوقاية من انتشارها. تعتمد خدماتنا على أحدث التقنيات في مجال ابادة الحشرات، مع التركيز على السلامة والكفاءة لضمان حماية منازلكم ومكاتبكم.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  طرق ابادة الحشرات - التقنيات المتقدمة: نحن في شركة ركن النخيل نتبنى أحدث التقنيات في عمليات ابادة الحشرات لضمان فعالية وكفاءة النتائج. 
                  التقنية الحراري: نستخدم البخار الحار لتفتيت الحشرات في جميع مراحل حياتها، مما يؤدي إلى تدميرها بشكل فعّال دون التأثير على البيئة. 
                  المبيدات البيولوجية: نعتمد على المبيدات الطبيعية والآمنة للبيئة التي تستهدف الحشرات بدقة دون التسبب في آثار جانبية على الصحة البشرية. 
                  أساليب الترابط الحيوي: نستخدم أساليب الترابط الحيوي للتحكم في الحشرات عبر استخدام عوامل طبيعية مثل الأعداء الطبيعيين لها دون الحاجة إلى مواد كيميائية ضارة. 
                  الاستخدام الآمن: نحرص على استخدام تقنيات ابادة الحشرات بشكل آمن للبيئة وللصحة البشرية. نقوم بتحديد الكميات المناسبة من المواد ونوفر تدابير وقائية لحماية السكان والبيئة. 
                  كما نلتزم بالتقيد بأعلى معايير السلامة والصحة في جميع عملياتنا لضمان سلامة العملاء والبيئة المحيطة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  ضمان الخدمة: نحن في شركة ركن النخيل نلتزم بتقديم خدمات ابادة الحشرات بأعلى مستويات الجودة، ونهدف إلى راحة ورضا عملائنا. 
                  لذلك، نقدم ضمانات قوية لضمان استمرار الحماية والتأكد من راحتكم بعد إجراء عمليات ابادة الحشرات. ضمان الفعالية: نؤكد على فعالية خدماتنا في التخلص من الحشرات بشكل دائم. 
                  إذا كان هناك أي استمرار في وجود الحشرات بعد الخدمة، سنعيد التدخل مجانًا. ضمان الرضا الكامل: نسعى لتحقيق رضا تام لعملائنا. إذا لم تكونوا راضين عن الخدمة في أي نقطة، فلا تترددوا في الاتصال بنا، وسنعمل جاهدين لتحقيق توقعاتكم. 
                  ضمان سرية المعلومات: نحرص على سرية المعلومات الخاصة بكم. لا نشارك أو نكشف عن معلومات عملائنا لأي طرف ثالث، ونحترم خصوصية كل عميل. خدمة ما بعد البيع: نقدم دعماً مستمرًا بعد إجراء عمليات الابادة. 
                  يمكنكم الاتصال بنا في أي وقت للإبلاغ عن أي مشكلة أو طلب استفسار، وسنقوم بالرد بسرعة. نعتبر ضماناتنا استثمارًا في راحة عقول عملائنا، ونهدف إلى بناء علاقات قوية ومستدامة معكم. 
                  اختر خدمات ابادة الحشرات من شركة ركن النخيل واستمتع ببيئة نظيفة وآمنة دائمًا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
