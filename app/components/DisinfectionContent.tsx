"use client";

import Link from "next/link";
import Image from "next/image";

export default function DisinfectionContent() {
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
                <li className="text-slate-900 font-semibold">تعقيم ضد الفيروسات</li>
              </ol>
            </nav>

            {/* Grid Layout: Service Name/Description and Image Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side: Service Name and Description */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center lg:text-right">
                  تعقيم ضد الفيروسات
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center lg:text-right">
                  في ركن النخيل نقدم خدمة التنظيف والتعقيم ضد الفيروسات. خلال عملنا، نقوم بالتنظيف والتعقيم بمطهرات واسعة النطاق. من خلال خدمة التنظيف والتعقيم لدينا، نمنع انتشار فيروس كورونا. شركة متخصصة في تعقيم الفيروسات في أماكن العمل والمكاتب. في ركن النخيل، نحن متخصصون في تنظيف وتعقيم الشركات لمنع انتشار كوفيد-19. نعمل على تطهير أماكن العمل والمكاتب لمنع انتشار الفيروس، بما في ذلك الشركات التي تم تأكيد حالات كوفيد-19 فيها.
                </p>
              </div>

              {/* Right Side: Service Image */}
              <div className="order-1 lg:order-2 relative w-full min-h-[256px] h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg bg-slate-200">
                <Image
                  src="/images/service-2.jpg"
                  alt="تعقيم ضد الفيروسات"
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
                شركة تعقيم ضد الفيروسات في مراكز العمل والمكاتب
              </h2>
            </div>

            {/* Subtitle Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 text-center">
                تعقيم الشركات في الرياض
              </h3>
            </div>

            {/* Description Section */}
            <div className="mb-16 sm:mb-20 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  لقد قمنا بتنظيف وتطهير شركات ناجحة بنسبة 100% من قطاعات مختلفة في الرياض. تطهير مركبات النقل وسيارات الشرطة وسيارات الإسعاف. 
                  في شركتنا المتخصصة في تنظيف وتعقيم الفيروسات والآفات، نحن متخصصون أيضًا في تعقيم السيارات. لقد نجحنا حتى الآن في تطهير وسائل النقل التالية من فيروس كورونا أو كوفيد-19: سيارات الشرطة، سيارات الإسعاف، كبائن الشاحنات. 
                  في ركن النخيل، ندرك الأهمية الكبيرة لاستخدام الشاحنات لنقل المنتجات الأساسية في الوضع الحالي. خاصة السيارات التي تضمن سلامتنا وتساعد الناس على علاج أنفسهم من فيروس كورونا. 
                  لهذا السبب، من المهم جدًا تطهير وتنظيف الكائنات الدقيقة من الأسطح التي كانت على اتصال بالأشخاص والتي تنقل البضائع أو الأشخاص، وسيارات الإسعاف، ومركبات الشرطة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  هل تريد بيئة منزلية نظيفة ومعقمة؟ هذه الخدمة تكافح الفيروسات والجراثيم والبكتيريا والفطريات بفعالية 99.9%. تطهير على يد خبراء. 
                  إذا كان منزلك يظهر علامات كوفيد-19، يجب عليك الحصول على أدوات حماية خاصة. موظفونا متخصصون في التعقيم ضد الفيروسات ومحمون من الرأس إلى أخمص القدمين ببدلة أمان بيولوجي خاصة وقناع نصف وجه مزود بفلتر بخار، بالإضافة إلى تطبيق بروتوكول تطهير قبل دخول منزلك. 
                  كلما زادت مرات التطهير، قل خطر وجود الفيروسات والبكتيريا والجراثيم في منزلك. بعض التوصيات: قبل: لا حاجة لإخلاء المساحات، يجب ألا تغطي أي سطح أو عنصر. خلال: نوصي بأن يرافق العملية فرد واحد فقط من الأسرة. سنرتدي أقنعة الوجه لحمايتك. 
                  لا يولد روائح أو يسبب حساسية. كما أنه لا يسبب آثارًا جانبية عند الأطفال أو كبار السن أو الحيوانات الأليفة. قد يتم تنشيط أجهزة كشف الدخان. ثم: يجب ألا تكون في منزلك خلال الساعة التي تلي التطهير. ليس من الضروري التجفيف أو التنظيف أو المسح بعد التطهير.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  فوائد تطهير المنزل. هل تريد الحفاظ على منزلك خاليًا من الجراثيم والبكتيريا؟ من خلال خدمة تطهير المنزل التي نقدمها، يمكنك أن تنعم براحة البال في المنزل، مع بيئة نظيفة ومعقمة. 
                  هذه الخدمة مصممة لرفاهيتك ورفاهية عائلتك. التطهير الصحيح للمنزل سيضمن بيئة صحية تمامًا لك ولعائلتك. خبراء التطهير لدينا في ركن النخيل خبراء فيما يفعلونه. 
                  سيصلون إلى منزلك في الوقت المحدد، وبسلوك إيجابي ومحترم، سيقدمون الخدمة. سيتركون جميع مناطق منزلك معقمة تمامًا، ولا تقلق، فجميع أركان النخيل لدينا تلبي معايير الاختيار العالية. 
                  علاوة على ذلك، سيدخلون منزلك مع جميع بروتوكولات الأمان البيولوجي اللازمة لدخول منزلك أو شقتك.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  عملية التعقيم ضد الفيروسات. الضباب هو تقنية تتكون من تشتيت الجزيئات الدقيقة التي تبقى معلقة في الهواء بواسطة آلة، وترسيبها على جميع أسطح السيارة أو الصناعة أو المكتب. 
                  من خلال هذه العملية نحصل على مساحة للترطيب، مما يسمح للمطهر بالعمل ضد فيروس كورونا. بهذه الطريقة، يمكن للمنتج المستخدم في تطهير وتنظيف كوفيد-19 الوصول إلى جميع المناطق، حتى تلك التي يصعب الوصول إليها، وبالتالي تدمير جميع الكائنات الفيروسية. 
                  في عملية تطهير فيروس كورونا، نستخدم مطهرًا واسع الطيف يمكننا، جنبًا إلى جنب مع عملية الرش، الوصول إلى جميع المناطق والزوايا التي يصعب الوصول إليها.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-center">
                  قطاعات الأعمال التي يتم فيها التعقيم ضد الفيروسات: المكاتب، غرف الاستراحة، غرف الطعام، المطارات، المراكز التجارية، المراكز الرياضية، مراكز الترفيه، محطات النقل، الفنادق، أرض المعارض، أكشاك الأمن، الصناعات. 
                  هذه قطاعات بها تدفق كبير من الناس، خاصة في الأماكن التي تشهد زيارات من جميع أنحاء العالم. راحة البال لك ولعائلتك. لم يعد لديك ما يدعو للقلق بشأن تعقيم منزلك أو عملك ضد الفيروسات، ويمكنك نسيان البحث عن شركات تطهير مختلفة. 
                  مع ركن النخيل، يمكنك أن تنعم براحة البال وتشعر بالأمان، لأننا نعتني بكل شيء باستخدام المطهرات المتخصصة التي يتم تطبيقها عبر الرشاشات، بدون روائح أو آثار جانبية وليست سامة.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                  توصيات عند تطهير منزلك: عندما يصل أخصائي التطهير إلى منزلك، يجب أن تتأكد من أنه يرتدي بدلة أمان بيولوجي خاصة وقناع نصف وجه مزود بفلتر بخار. تذكر أنه لا يجب إخلاء المساحات أثناء التطهير، ويجب ألا تكون في منزلك لمدة ساعة بعد ذلك. 
                  كيف تتأكد من أن العمل قد تم بشكل صحيح؟ في نهاية الخدمة، سيبلغك ركن النخيل بأن الخدمة قد اكتملت. يجب عليك التحقق من أن كل شيء في حالة ممتازة وشكر محترفنا. بخلاف ذلك، يمكنك أن تطلب منه مساعدتك في تطهير المنطقة المفقودة. 
                  تذكر أنه في نهاية الخدمة، يمكنك تقييمها وتقديم الاقتراحات والتعليقات. إذا كنت تريد أن يكون كل ركن من أركان منزلك خاليًا من الفيروسات والجراثيم والبكتيريا، فنحن نساعدك على تحقيق ذلك. 
                  سيذهب أحد خبرائنا إلى منزلك لإجراء تطهير بالرش، والذي سيتم تطبيقه في بيئة كل مساحة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
