"use client";

import Link from "next/link";
import Image from "next/image";

export default function AirConditionerMaintenanceContent() {
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
                <li className="text-slate-900 font-semibold">صيانة المكيفات</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-right">
                  صيانة المكيفات
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center lg:text-right">
                  نحن شركة ركن النخيل متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء والتبريد المنزلية والصناعية والمكتبية، 
                  والتي كرست لسنوات عديدة لتقديم خدمات عالية الجودة لتلبية احتياجات عملائنا. يجب إجراء صيانة لمكيفات الهواء لتجنب الأمراض، 
                  والاستهلاك الكهربائي العالي، وسوء أداء المعدات.
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-4.jpg"
                  alt="صيانة المكيفات"
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
                ما هي الصيانة الوقائية للمكيفات؟
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                خدمات صيانة شاملة ومتكاملة لمكيفات الهواء
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  ما هي الصيانة الوقائية للمكيفات؟ في الوقائي، نقوم بالتنظيف والتطهير والتشحيم والطلاء للحفاظ على الحالة الجيدة للمعدات. 
                  في التصحيحات نقوم بإصلاح أو استبدال الأجزاء التالفة في معدات تكييف الهواء. سيعتمد تكرار كل خدمة على ساعات الاستخدام، 
                  وبيئة العمل وعوامل أخرى. كما نقدم افضل خدمات تركيب وصيانة واصلاح مكيفات الهواء. نقوم بتنفيذ الخطط والعقود السنوية وفقًا لاحتياجاتك، 
                  مع الاهتمام على مدار 24 ساعة في اليوم وفي أي يوم من أيام السنة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  ما يميزنا: ضمان 3 أشهر على الخدمة، تسهيلات الدفع المتاحة، الفنيين والمهندسين المتخصصين، جدولة خدمة الصيانة، 
                  زيارة دراسة الجدوى الفنية، خدمة سريعة وفعالة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  مزايا صيانة التكييفات: منع تراكم البكتيريا والفطريات والعث في الجهاز، منع التسرب والرائحة الكريهة، تقليل الضوضاء، 
                  يقلل من استهلاك الطاقة الكهربائية، يمنع أكسدة الأجزاء وتآكلها مما يطيل العمر الإنتاجي للجهاز.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  لماذا تتم صيانة التكييفات؟ بمجرد التثبيت، تبدأ دورة حياة الجهاز بإعادة تدوير كميات كبيرة من الهواء كل يوم لتبريد أو تدفئة البيئة. 
                  المعدات التي لا تحتاج إلى صيانة تتراكم فيها الفطريات في علبة المكثفات والأجزاء المبللة، وتمتلئ المرشحات بالغبار، 
                  وتبدأ في الانفصال وتحركها المروحة، وتنتشر في جميع أنحاء البيئة. التسبب في أمراض الجهاز التنفسي وعدم الراحة لدى الأشخاص 
                  المتواجدين في البيئات لساعات، مما يساهم في ما نسميه متلازمة بناء المريض. هناك العديد من الفوائد التي يقدمها، مثل توفير الطاقة، 
                  وتوفير التكاليف للإصلاحات، وقلة التوقفات بسبب الأعطال، وزيادة العمر الإنتاجي للمعدات، وتحسين جودة الهواء والصحة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  فوائد صيانة التكييفات: يحسن جودة الهواء والصحة - إذا احتفظت بالمعدات في أفضل الظروف، فسيكون الهواء نظيفًا وخالٍ من الجزيئات التي يمكن أن تضر بالصحة أو تعقد أمراض الجهاز التنفسي. 
                  توفير الطاقة - يساعدك تغيير المرشحات بشكل متكرر على توفير ما يصل إلى 5٪ من فاتورة الطاقة، نظرًا لأن هذه المعدات مسؤولة عن حوالي 30٪. شيء يترجم إلى توفير كبير في الطاقة. 
                  يزيد من عمر المعدات - يزداد العمر الإنتاجي للمعدات من خلال الصيانة الوقائية، حيث تقوم بإطلاق جزيئات العناصر الداخلية واكتشاف الأعطال وتصحيحها.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  لماذا شركة ركن النخيل لصيانة التكييفات؟ ضمان - لدينا ضمان من العلامات التجارية المشهورة عالميًا. نصيحة فنية مجانية - نحن نقدم المشورة المتخصصة مع أفضل المهنيين في الرياض. 
                  خدمة 24 ساعة - نضع في خدمتك فريق المهندسين والفنيين لدينا لتقديم المشورة لك في أي وقت من السنة. تسهيلات الدفع - نقدم أسعارًا تنافسية وتسهيلات دفع لعملائنا. 
                  نحن شركة متخصصة في صيانة التكييفات، تم إنشاء شركة ركن النخيل لتوفير حلول الراحة لمنزلك او شركتك في الرياض. 
                  لدينا قسم من الهندسة والفنيين المتخصصين، الذين يقدمون المشورة، ندرك أن قوتنا تكمن في موظفينا، 
                  الذين نحافظ من أجلهم على ثقافة التحسين المستمر من خلال التدريب لتزويد عملائنا بخدمة عالية الجودة وجديرة بالثقة. 
                  مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وابادة الحشرات داخل المملكة العربية السعودية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
