"use client";

import Link from "next/link";
import Image from "next/image";

export default function PaintsDecorationsContent() {
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
                <li className="text-slate-900 font-semibold">دهانات وديكورات</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-right">
                  دهانات وديكورات
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center lg:text-right">
                  في شركة ركن النخيل للدهانات والديكورات لدينا خبرة واسعة في قطاع الطلاء والديكور. 
                  في شركة الدهانات الخاصة بنا في الرياض، ستتمكن من العثور على ما تبحث عنه، مما يمنح منزلك أو عملك لمسة مميزة، 
                  دائمًا في أيدي أفضل المحترفين.
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-3.jpg"
                  alt="دهانات وديكورات"
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
                شركة النخيل للدهانات والديكورات
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                خدمات احترافية في الطلاء والديكور
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  تعني تجربة فريق الرسامين لدينا أننا اليوم مكلفون بمشاريع كبيرة، حيث قمنا بتنفيذ الأعمال لجميع أنواع الأعمال، 
                  من الأفراد إلى شركات المقاولات الكبيرة، والكيانات المالية، والشركات الخاصة، والمؤسسات والهيئات الرسمية. 
                  نحن شركة طلاء صناعية معيارية في الرياض. بالإضافة إلى ذلك، نحن متخصصون في الرسم للمنازل.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  دهانات وديكورات احترافية: يتم تنفيذ كل عمل من أعمالنا، بدءًا من الديكور الداخلي إلى الطلاء الصناعي، 
                  بأقصى قدر من الاحتراف، والسعي دائمًا لتحقيق أفضل النتائج الجمالية، وإرضاء عملائنا وحماية مناطق العمل ونظافتها، 
                  والحفاظ على السلامة المثلى والنظافة. نحن لا نعمل باحتراف فحسب، بل نتكيف مع جميع الأوقات، ونقدم التشطيبات التقليدية، 
                  نطبق أحدث اتجاهات الديكور الحالية. ولكن إذا كان ما تبحث عنه إصلاحات شاملة في المنزل أو في شركة فيمكننا أيضًا مساعدتك، 
                  نظرًا لأن لدينا أفضل الخدمات في وضع الأرضيات أو إصلاح المطابخ والحمامات.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  عملاء شركة ركن النخيل هم المسؤولون عن كوننا مرجعًا واضحًا عند القيام بأي عمل متعلق بالطلاء والديكور، 
                  بغض النظر عن حجم المشروع أو نطاقه. في ركن النخيل، نقدم خدمات تصميم داخلي عالية الجودة وخدمات تجديد شاملة في المجتمعات، 
                  مما يضمن عملاً آمناً ودائماً. نتعاون مع العلامات التجارية الرائدة لتحقيق أفضل النتائج ونقدم ضمان رضا كامل لجميع عملائنا. 
                  تقدم شركتنا أيضًا تمويلًا بدون فوائد. لدينا تحت تصرفك مجموعة كبيرة من الدهانات الزخرفية والدهانات الصناعية والأرضيات الصناعية. 
                  نقدم أسعارًا تنافسية ونتعامل مع أفضل جودة. لراحة عملائنا، لدينا موظفون مدربون تدريباً عالياً سيعالجون جميع مخاوفك. 
                  تحقق من أسعارنا بدون التزام؛ سنكون سعداء لمساعدتك.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  لماذا تختارنا: نحن نتميز عن المنافسة لأننا شركة ذات خبرة في هذا القطاع منذ سنوات كثيرة. 
                  لدينا قسم تقني لديه معرفة واسعة في المجال الصناعي والديكور. نحن على دراية بأحدث الاتجاهات في الديكور. 
                  نحن شركة ركن النخيل نقدم خدمات الطلاء للمنازل والشركات والأعمال الصناعية، إلخ. في القطاع الصناعي، يشمل عملنا تطبيق الطلاء المانع للحريق، 
                  واللافتات، والحروف، والأرضيات، ولكننا أيضًا نطبق الطلاء المضاد للرطوبة والطلاء الزخرفي. 
                  في شركة ركن النخيل نستخدم تقنيات احترافية لإزالة اللوحات الجدارية واللوحات القديمة، وكذلك لتنعيم الأسطح وتجهيزها للطلاء بالمنتجات المناسبة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  شركة الدهانات الخاصة بنا في الرياض مؤهلة تمامًا لإجراء أي تغيير وتجديد جمالي للطلاء ونسيج السطح الذي يطلبه عملاؤنا. 
                  في شركتنا، نهتم بتقديم أفضل خدمة لعملائنا. عندما تبدأ في التخطيط لمشروع جديد، فإننا نتكيف مع مواصفاتك؛ 
                  من حيث اللون والملمس والعلامات التجارية المستخدمة وكل ما يمكنك تخيله فيما يتعلق بلوحة المكان الذي تريده. 
                  كل هذا باستخدام أفضل التقنيات والمواد. وبالمثل، ندمج توصيات واقتراحات العميل. بفضل الجهد الذي نبذله في كل مشروع، 
                  نحقق باستمرار تقييمات خدمة إيجابية ورضاك. هدفنا هو تزويدك بفهم شامل لمشروعك وأعلى جودة للنتائج. 
                  طوال العملية، نضمن موافقة العميل على العمل الذي نقوم به لضمان الرضا التام بالمنتج النهائي.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  بمجرد الانتهاء من أعمال الدهان، نقوم دائمًا بجمع جميع المواد التي تم تركها للتخلص منها وتنظيف المنطقة تمامًا، 
                  وبهذه الطريقة نتجنب أي إزعاج للعميل ولا يمكنهم القلق بشأن التنظيف في نهاية العمل. خدماتنا بأسعار معقولة، ولكن دون المساس بالجودة والتميز. 
                  في كثير من الحالات لا يتعلق الأمر فقط بأداء خدمة طلاء، ولكن أيضًا المشورة المهنية من العلامات التجارية الأكثر ملاءمة، والألوان المناسبة... 
                  باختصار، ما يمكن أن يكون أفضل نتيجة لمشروع كل عميل ضروري أيضًا للعميل.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  نحن نشجعك على الحصول على خدمات الطلاء لدينا، بالإضافة إلى خبرتنا ونصائحنا، لأنه عندما تريد لوحة بدون أخطاء، 
                  حيث يكون كل سنتيمتر أخير من الجدار لا تشوبه شائبة، يجب أن يكون لديك خبراء سيفعلون ذلك تمامًا كما توقعت 
                  وفي أقل وقت ممكن بنفس الطريقة التي تكون فيها التكلفة معقولة وممكنة لجيبك. يقوم خدمة العملاء الخاصين في شركتنا، سعياً منهم لحل جميع الأسئلة التي قد تكون لديهم قبل التعاقد معنا. 
                  سوف نلبي أي نوع من الاحتياجات، من أعمال الدهان الصغيرة إلى الإصلاحات الشاملة التي يحتاجها منزلك. 
                  سيقوم القسم الفني لدينا بإرشادك والإجابة على جميع أسئلتك حتى تكون النتيجة النهائية مرضية تمامًا. 
                  نصنع ميزانيات للأفراد دون التزام. نحن نقدم ضمان الرضا التام. لدينا قسم تجاري وفني، هدفه الرئيسي هو الرد على أي نوع من الاستفسار أو الشك من المستخدمين، 
                  كل ذلك دون أي نوع من الالتزام أو التكلفة. لأي سؤال تواصل معنا، نحن شركة الدهانات والديكورات الخاصة بك في الرياض.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
