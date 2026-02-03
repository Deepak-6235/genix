"use client";

export default function PaintsDecorationsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white py-20 sm:py-32 md:py-40">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              دهانات وديكورات
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-100 leading-relaxed">
              في شركة ركن النخيل للدهانات والديكورات لدينا خبرة واسعة في قطاع الطلاء والديكور. 
              في شركة الدهانات الخاصة بنا في الرياض، ستتمكن من العثور على ما تبحث عنه، مما يمنح منزلك أو عملك لمسة مميزة، 
              دائمًا في أيدي أفضل المحترفين.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Company Introduction */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-right">
                شركة النخيل للدهانات والديكورات
              </h2>
              <div className="prose prose-lg max-w-none text-right text-slate-700 leading-relaxed space-y-4">
                <p>
                  تعني تجربة فريق الرسامين لدينا أننا اليوم مكلفون بمشاريع كبيرة، حيث قمنا بتنفيذ الأعمال لجميع أنواع الأعمال، 
                  من الأفراد إلى شركات المقاولات الكبيرة، والكيانات المالية، والشركات الخاصة، والمؤسسات والهيئات الرسمية.
                </p>
                <p>
                  نحن شركة طلاء صناعية معيارية في الرياض. بالإضافة إلى ذلك، نحن متخصصون في الرسم للمنازل.
                </p>
              </div>
            </div>

            {/* Professional Services */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-right">
                دهانات وديكورات احترافية
              </h2>
              <div className="prose prose-lg max-w-none text-right text-slate-700 leading-relaxed space-y-4">
                <p>
                  يتم تنفيذ كل عمل من أعمالنا، بدءًا من <strong>الديكور الداخلي</strong> إلى الطلاء الصناعي، 
                  بأقصى قدر من الاحتراف، والسعي دائمًا لتحقيق أفضل النتائج الجمالية، وإرضاء عملائنا وحماية مناطق العمل ونظافتها، 
                  والحفاظ على السلامة المثلى والنظافة.
                </p>
                <p>
                  نحن لا نعمل باحتراف فحسب، بل نتكيف مع جميع الأوقات، ونقدم التشطيبات التقليدية، نطبق أحدث اتجاهات الديكور الحالية.
                </p>
                <p>
                  ولكن إذا كان ما تبحث عنه <strong>إصلاحات شاملة</strong> في المنزل أو في شركة فيمكننا أيضًا مساعدتك، 
                  نظرًا لأن لدينا أفضل الخدمات في وضع الأرضيات أو إصلاح المطابخ والحمامات.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-12 sm:mb-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-right">
                لماذا تختارنا
              </h2>
              <ul className="space-y-4 text-right text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    نحن نتميز عن المنافسة لأننا شركة ذات خبرة في هذا القطاع منذ سنوات كثيرة. 
                    لدينا قسم تقني لديه معرفة واسعة في المجال الصناعي والديكور. نحن على دراية بأحدث الاتجاهات في الديكور.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    نحن شركة ركن النخيل نقدم خدمات الطلاء للمنازل والشركات والأعمال الصناعية، إلخ. 
                    في القطاع الصناعي، يشمل عملنا تطبيق الطلاء المانع للحريق، واللافتات، والحروف، والأرضيات، 
                    ولكننا أيضًا نطبق الطلاء المضاد للرطوبة والطلاء الزخرفي.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    في <strong>شركة ركن النخيل</strong> نستخدم تقنيات احترافية لإزالة اللوحات الجدارية واللوحات القديمة، 
                    وكذلك لتنعيم الأسطح وتجهيزها للطلاء بالمنتجات المناسبة.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    شركة الدهانات الخاصة بنا في الرياض مؤهلة تمامًا لإجراء أي تغيير وتجديد جمالي للطلاء ونسيج السطح الذي يطلبه عملاؤنا. 
                    في شركتنا، نهتم بتقديم أفضل خدمة لعملائنا.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    عندما تبدأ في التخطيط لمشروع جديد، فإننا نتكيف مع مواصفاتك؛ من حيث اللون والملمس والعلامات التجارية المستخدمة 
                    وكل ما يمكنك تخيله فيما يتعلق بلوحة المكان الذي تريده. كل هذا باستخدام أفضل التقنيات والمواد.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    بمجرد الانتهاء من أعمال الدهان، نقوم دائمًا بجمع جميع المواد التي تم تركها للتخلص منها وتنظيف المنطقة تمامًا، 
                    وبهذه الطريقة نتجنب أي إزعاج للعميل ولا يمكنهم القلق بشأن التنظيف في نهاية العمل.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-xl">•</span>
                  <span>
                    في كثير من الحالات لا يتعلق الأمر فقط بأداء خدمة طلاء، ولكن أيضًا المشورة المهنية من العلامات التجارية الأكثر ملاءمة، 
                    والألوان المناسبة … باختصار، ما يمكن أن يكون أفضل نتيجة لمشروع كل عميل ضروري أيضًا للعميل.
                  </span>
                </li>
              </ul>
            </div>

            {/* Services Offered */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-right">
                خدماتنا
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">الديكور الداخلي</h3>
                  <p className="text-slate-600 text-right">
                    ديكورات داخلية احترافية بأحدث الاتجاهات والتصاميم العصرية
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">الطلاء الصناعي</h3>
                  <p className="text-slate-600 text-right">
                    طلاء صناعي معياري للمصانع والمنشآت الصناعية
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">إصلاحات شاملة</h3>
                  <p className="text-slate-600 text-right">
                    إصلاحات شاملة للمنازل والشركات مع وضع الأرضيات وإصلاح المطابخ والحمامات
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">الطلاء المانع للحريق</h3>
                  <p className="text-slate-600 text-right">
                    تطبيق طلاء مانع للحريق للمنشآت الصناعية والتجارية
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">الطلاء المضاد للرطوبة</h3>
                  <p className="text-slate-600 text-right">
                    طلاء مضاد للرطوبة لحماية المباني من التلف
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-right">الطلاء الزخرفي</h3>
                  <p className="text-slate-600 text-right">
                    طلاء زخرفي بأشكال وتصاميم مميزة
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Promise */}
            <div className="mb-12 sm:mb-16 bg-slate-50 rounded-2xl p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-right">
                ضمان الجودة والرضا
              </h2>
              <div className="prose prose-lg max-w-none text-right text-slate-700 leading-relaxed space-y-4">
                <p>
                  نحن نشجعك على الحصول على خدمات الطلاء لدينا، بالإضافة إلى خبرتنا ونصائحنا، لأنه عندما تريد لوحة بدون أخطاء، 
                  حيث يكون كل سنتيمتر أخير من الجدار لا تشوبه شائبة، يجب أن يكون لديك خبراء سيفعلون ذلك تمامًا كما توقعت 
                  وفي أقل وقت ممكن بنفس الطريقة التي تكون فيها التكلفة معقولة وممكنة لجيبك.
                </p>
                <p>
                  يقوم خدمة العملاء الخاصين في شركتنا، سعياً منهم لحل جميع الأسئلة التي قد تكون لديهم قبل التعاقد معنا. 
                  سوف نلبي أي نوع من الاحتياجات، من أعمال الدهان الصغيرة إلى الإصلاحات الشاملة التي يحتاجها منزلك. 
                  سيقوم القسم الفني لدينا بإرشادك والإجابة على جميع أسئلتك حتى تكون النتيجة النهائية مرضية تمامًا. 
                  نصنع ميزانيات للأفراد دون التزام. نحن نقدم ضمان الرضا التام.
                </p>
                <p>
                  لدينا قسم تجاري وفني، هدفه الرئيسي هو الرد على أي نوع من الاستفسار أو الشك من المستخدمين، 
                  كل ذلك دون أي نوع من الالتزام أو التكلفة. لأي سؤال تواصل معنا، نحن شركة الدهانات والديكورات الخاصة بك في الرياض.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 sm:p-10 text-white text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                احصل على عرض سعر مجاني
              </h2>
              <p className="text-lg sm:text-xl mb-6 text-purple-100">
                تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  اتصل بنا
                </a>
                <a
                  href="https://wa.me/0582010834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
