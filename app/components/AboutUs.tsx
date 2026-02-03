"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about" className="py-20 sm:py-32 md:py-40 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              تعرف على ركن النخيل
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              شركة رائدة في مجال خدمات التشغيل والصيانة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Content */}
            <div className="order-2 md:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                لماذا تختار خدماتنا؟
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
                يتيح ركن النخيل لك طلب خدمات الصيانة والعناية لمنزلك وكذلك خدمات مكافحة وإبادة الحشرات. 
                نحن من أفضل محترفي الخدمات في منطقتك، لتختار أنسب من يخدمك بناء على نظام تقييم ومراجعات 
                لكل محترف خدمة ونظام حجز فوري وضمان على الخدمات وبأفضل الأسعار والعروض.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
                الطريقة الأفضل لإتمام جميع أعمال منزلك! إن كنت تبحث عن فني محترف، فأنت في المكان الصحيح.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden order-1 md:order-2 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab608027fe79?w=800&h=600&fit=crop&q=80"
                alt="About Rukn Al-Nakheel"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">أسعار رهيبة</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">وعروض دائمة</div>
              </div>
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">ضمان</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">يصل حتى 30 يوم</div>
              </div>
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-slate-100 text-center col-span-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">اختر الوقت</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600">الذي يناسبك</div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-16 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              ركن النخيل أفضل اختيار لك
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4">
              سوف نعمل على توفير الراحة في كافة خدماتنا ونقوم بتنفيذ جميع الخدمات وتنظيف ما قمنا بفعله 
              حتى لا تشعر منا بأي إزعاج. نعمل دائماً من أجل سعادتك ورضاك.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
