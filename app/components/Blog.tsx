"use client";

import Image from "next/image";

// Placeholder image IDs for Unsplash
const getBlogImageId = (id: number): string => {
  const imageIds: { [key: number]: string } = {
    1: "1564013799919-ab608027fe79", // Cleaning - home cleaning
    2: "1600585154340-be6161a56a0c", // Waterfall - landscape design
    3: "1621906116683-7a4c85a3a8c1", // AC Repair - maintenance
    4: "1581578731548-c64695cc6952", // Painting - interior design
    5: "1621906116683-7a4c85a3a8c1", // AC Maintenance - repair
    6: "1564013799919-ab608027fe79", // Building - construction
  };
  return imageIds[id] || "1564013799919-ab608027fe79";
};

const blogPosts = [
  {
    id: 1,
    title: "أفضل شركات تنظيف منازل في الرياض",
    date: "09 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "دليل شامل لأفضل شركات التنظيف في الرياض مع نصائح لاختيار الشركة المناسبة لاحتياجاتك.",
    image: "🧹"
  },
  {
    id: 2,
    title: "شركة ركن النخيل لتصميم شلالات جدارية",
    date: "07 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "اكتشف كيف يمكن لشلالات جدارية أن تضيف لمسة جمالية فريدة لمنزلك أو مكتبك.",
    image: "💧"
  },
  {
    id: 3,
    title: "شركة تصليح مكيف سبلت بالرياض",
    date: "06 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "دليل شامل لصيانة وإصلاح مكيفات السبليت مع أهم النصائح للحفاظ على كفاءة المكيف.",
    image: "❄️"
  },
  {
    id: 4,
    title: "اشهر شركات الدهانات بالرياض باحدث التقنيات المستخدمه",
    date: "04 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "تعرف على أحدث تقنيات الدهانات والديكورات المستخدمة في الرياض وأهم الاتجاهات الحديثة.",
    image: "🎨"
  },
  {
    id: 5,
    title: "التعرف على كيفية تصليح مكيفات سبليت واكثر المشاكل شيوعاً",
    date: "04 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "دليل شامل لأكثر مشاكل مكيفات السبليت شيوعاً وكيفية إصلاحها بطرق احترافية.",
    image: "🔧"
  },
  {
    id: 6,
    title: "شركة عزل الاسطح بالاسمنت الأبيض بأفضل الاسعار",
    date: "03 أبريل 2022",
    category: "مقالات عامة ركن النخيل",
    excerpt: "كل ما تحتاج معرفته عن عزل الأسطح بالأسمنت الأبيض وأهميته في حماية المباني.",
    image: "🏗️"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 sm:py-32 md:py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            مقالات منزلية تهمك
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            نصائح ومعلومات مفيدة حول الصيانة والتحسينات المنزلية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Blog Image */}
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${getBlogImageId(post.id)}?w=800&h=500&fit=crop&q=80`}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500">{post.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  اقرأ المزيد
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-slate-200 transition-colors"
          >
            مشاهدة المزيد
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
