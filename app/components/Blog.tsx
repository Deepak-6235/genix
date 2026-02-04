"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function Blog() {
  const t = useBlogTranslations();
  const { dir } = useLanguage();

  const blogPosts = t.posts.map((post, index) => ({
    id: index + 1,
    title: post.title,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
  }));

  return (
    <section id="blog" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
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
              <div className="p-4 sm:p-6">
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

                <Link
                  href={`/blog/${post.id}`}
                  className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <span>{t.readMore}</span>
                  <svg className={`w-4 h-4 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 px-4">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <span>{t.viewMore}</span>
            <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
