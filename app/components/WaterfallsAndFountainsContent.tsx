"use client";

import Link from "next/link";
import Image from "next/image";

export default function WaterfallsAndFountainsContent() {
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
                <li className="text-slate-900 font-semibold">تصميم وإنشاء الشلالات والنوافير</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-right">
                  تصميم وإنشاء الشلالات والنوافير
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center lg:text-right">
                  شركة ركن النخيل لـ تصميم وإنشاء الشلالات والنوافير في الرياض، تجتمع الخبرة والتكنولوجيا معًا لإنشاء نوافير تدهش وتثير الإثارة. 
                  من خلال الجمع بين الإيقاع والماء والضوء، نريد إعادة التناغم بين عمل فني ومفاجأة مع نوافير رائعة تعمل بكامل طاقتها وسهلة الاستخدام.
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-5.jpg"
                  alt="تصميم وإنشاء الشلالات والنوافير"
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
                شركة تصميم وإنشاء الشلالات والنوافير
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                حلول متكاملة لتصميم وإنشاء الشلالات والنوافير
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  النوافير والمسطحات المائية: شركة ركن النخيل هي متخصصة في تصميم وإنشاء الشلالات والنوافير والمعالم المائية للهيئات العامة والشركات والأفراد. 
                  نحن نقدم حلولاً كاملة وجاهزة للديكور العام والخاص، مع إضاءة LED وجهاز تحكم عن بعد من الكمبيوتر الشخصي والكمبيوتر اللوحي والهاتف الذكي. 
                  تقنية سهلة الاستخدام: نقوم بتطوير حلول الأجهزة والبرامج للإدارة الكاملة للنوافير الصغيرة والمتوسطة والكبيرة والمتنزهات المائية. 
                  واجهات بديهية لإدارة النوافير وخصائص المياه قادرة على ضمان كفاءة عالية للنظام وأقل استهلاك للطاقة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  لماذا شركة ركن النخيل؟ الخبرة: الخبرة المكتسبة في مجال تصميم وإنشاء الشلالات والنوافير الصغيرة والمتوسطة والكبيرة. 
                  الابتكار: البحث المستمر في تطوير المنتجات والمكونات التي تسهل بناء وصيانة وإدارة النوافير وخصائص المياه. 
                  الجودة: نستخدم الفولاذ المقاوم للصدأ والمكونات الكهربائية وفقًا للقانون لنقدم لك أكبر قدر من الكفاءة في ميزات المياه وأكبر توفير للطاقة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  نوافير شركة ركن النخيل: تضفي النافورة دائمًا لمسة من الأناقة وتساعد في جعل حديقتك أكثر سحراً. يمكنك تأثيث البيئة وتحسينها وتحويلها بإدخال بسيط لميزة مائية. 
                  نفاثات أو شلالات من الماء تتلألأ في ضوء الشمس أو مضاءة في الليل تجذب انتباهنا وتريحنا. لطالما كانت الألعاب المائية تمثل رموزًا للجمال ونوعية الحياة: 
                  نوافير الحدائق، النوافير العامة أو السكنية، النوافير الحديثة، النوافير الضخمة، النوافير الخارجية أو الداخلية، نوافير الزينة، النوافير الفنية، النوافير الموسيقية أو الراقصة. 
                  هناك أنواع لا حصر لها من الألعاب المائية الممكنة، يمكن احتواؤها في أحواض أو برك، ويمكن بناؤها من الحجر والرخام والحديد الزهر، ويمكن تجهيزها بنفاثات وفوهات وشفرات من المياه وأجهزة أكسجين، 
                  يمكن أن تضيء بمصابيح هالوجين أو متوهجة، بألياف بصرية أو مصابيح LED.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  تقوم شركة ركن النخيل بتصميم النوافير لسنوات وتستفيد من تعاون شركات التركيب المتخصصة القادرة على تنفيذ بنائها بأساليب حديثة ومهنية. 
                  تعد صيانة النوافير والبرك عنصرًا أساسيًا للحفاظ على الجمال الذي يتخيله المصمم دون تغيير، ولهذا السبب من الضروري أن تكون أتمتة النافورة مناسبة 
                  وأن الرعاية والتنظيف يعهد بها إلى خبراء ومؤهلين. نحن قادرون على إنشاء نوافير بالقرب من المسبح أو مستقلة عنه وكذلك الشلالات والألعاب المائية الأخرى.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  انواع النوافير: نوافير للمساحات العمرانية - تقوم شركة ركن النخيل بتصميم وتصنيع أنواع مختلفة من النوافير لمساحات المدينة، وتقدم كل كفاءة الحلول المتقدمة تقنيًا وباستخدام مواد عالية الجودة. 
                  نوفر لك كل جمال الألعاب المائية والتأثيرات التي تمنح الجمهور عرضًا فريدًا ومثيرًا، جنبًا إلى جنب مع إعادة تطوير وتعزيز وتكامل السياق الحضري والمعماري المحيط. 
                  نوافير للشركات والأفراد - عنصر أساسي لا يمكن الاستغناء عنه في كوكبنا، الماء له معنى رمزي يرى أنه بطل الرواية في المتنزهات والحدائق وأماكن الاجتماع. 
                  بالنسبة للشركات والأفراد، تقوم شركة ركن النخيل بإنشاء نوافير صغيرة ومتوسطة الحجم مع أنظمة إضاءة وإدارة ذكية لعمل ميزات المياه، مما يخلق أشكالًا وألوانًا مائية ذات تأثير بصري وجمالي قوي. 
                  نوافير حدائق مائية - متعة، وأكثر متعة! إنها الكلمة الأساسية لحديقة مائية ناجحة. لا تقدم لك شركة ركن النخيل أنواعًا مختلفة من النوافير وخصائص المياه الديناميكية فحسب، 
                  بل تقدم لك كل خبرتها والتكنولوجيا الأكثر ابتكارًا لبرمجة إدارة الحدائق المائية الكبيرة بكل بساطة وبأقصى قدر من توفير الطاقة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  إنشاء الشلالات: تعتبر الشلالات وبرك الحدائق من العناصر الجذابة التي تحظى بتقدير كبير ولكن يمكن تحقيقها أيضًا بتكلفة معقولة، لتعزيز المساحات السكنية في الهواء الطلق. 
                  نتبع جميع أنواع النوافير والشلالات، للأثاث الحضري أو للمناطق الخاصة، من قبلنا في كل مرحلة: المساعدة في التصميم، والتزويد المحتمل للمكونات، 
                  والمساعدة في التثبيت مع إجابات فورية على الهاتف وإرسال أي تعليمات أخرى، وكذلك الرسومات أو الصور التفصيلية. 
                  الحركة: نتعامل بشكل خاص مع النوافير الموسيقية المتحركة والديناميكية والتفاعلية والمتسلسلة والرقص والانعكاس أو مع التحول النهائي للأنظمة الحالية. 
                  إضاءة: نتابع باستمرار التطورات في قطاع أجهزة الإسقاط الضوئي LED للحصول على أحدث الحلول، سواء مع الألوان الثابتة أو اللونية الديناميكية باستخدام أجهزة عرض RGB، 
                  نقوم بتنفيذ البرمجة من أبسطها إلى أكثرها تعقيدًا لتغييرات الألوان أو ظلال اللون، والتي تتعلق أيضًا بحركة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  في شركة ركن النخيل لـ تصميم وإنشاء الشلالات والنوافير ترتكز مهاراتنا الفنية على الهندسة. لذلك نحن قادرون على تصميم وتنفيذ حلول تقنية بسيطة وعملية 
                  لحل حتى أكثر المشاكل تعقيدًا. بفضل خبرتنا التي امتدت ل 10 سنوات في قطاع النافورات، يمكننا تصميم أي نوع من الأنظمة، بكل التفاصيل، مع احترام اللوائح المعمول بها.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
