"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Blog Content Component
 * 
 * This component displays the blog page with:
 * - A hero section with breadcrumb navigation
 * - Blog posts in a responsive grid layout
 * - Pagination controls
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with hover effects
 * - Blog post cards with images, dates, and excerpts
 * - Local image support
 */

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "أفضل شركات تنظيف منازل في الرياض",
    date: "أبريل 9, 2022",
    author: "admin",
    image: "/images/blog-1.jpg",
    excerpt: "دليل شامل لأفضل شركات التنظيف في الرياض مع نصائح لاختيار الشركة المناسبة لاحتياجاتك.",
  },
  {
    id: 2,
    title: "شركة ركن النخيل لتصميم شلالات جدارية",
    date: "أبريل 7, 2022",
    author: "admin",
    image: "/images/blog-2.jpg",
    excerpt: "اكتشف كيف يمكن لشلالات جدارية أن تضيف لمسة جمالية فريدة لمنزلك أو مكتبك.",
  },
  {
    id: 3,
    title: "شركة تصليح مكيف سبلت بالرياض",
    date: "أبريل 6, 2022",
    author: "admin",
    image: "/images/blog-3.jpg",
    excerpt: "دليل شامل لصيانة وإصلاح مكيفات السبليت مع أهم النصائح للحفاظ على كفاءة المكيف.",
  },
  {
    id: 4,
    title: "اشهر شركات الدهانات بالرياض باحدث التقنيات المستخدمه",
    date: "أبريل 4, 2022",
    author: "admin",
    image: "/images/blog-4.jpg",
    excerpt: "تعرف على أحدث تقنيات الدهانات والديكورات المستخدمة في الرياض وأهم الاتجاهات الحديثة.",
  },
  {
    id: 5,
    title: "التعرف على كيفية تصليح مكيفات سبليت واكثر المشاكل شيوعاً",
    date: "أبريل 4, 2022",
    author: "admin",
    image: "/images/blog-5.jpg",
    excerpt: "دليل شامل لأكثر مشاكل مكيفات السبليت شيوعاً وكيفية إصلاحها بطرق احترافية.",
  },
  {
    id: 6,
    title: "شركة عزل الاسطح بالاسمنت الأبيض بأفضل الاسعار",
    date: "أبريل 3, 2022",
    author: "admin",
    image: "/images/blog-6.jpg",
    excerpt: "كل ما تحتاج معرفته عن عزل الأسطح بالأسمنت الأبيض وأهميته في حماية المباني.",
  },
];

export default function BlogContent() {
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
                <li className="text-slate-900 font-semibold">المدونة</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                المدونة
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                نصائح ومعلومات مفيدة حول الصيانة والتحسينات المنزلية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          BLOG GRID SECTION
          ============================================ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 md:p-10">
                    {/* Date and Author */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group/link text-sm sm:text-base"
                    >
                      <span>اقرأ المزيد</span>
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* ============================================
                PAGINATION
                ============================================ */}
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              {/* Previous Button */}
              <button
                className="px-4 py-2 sm:px-5 sm:py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                aria-label="الصفحة السابقة"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                2
              </button>
              <span className="px-2 text-slate-500">…</span>
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                6
              </button>

              {/* Next Button */}
              <button 
                className="px-4 py-2 sm:px-5 sm:py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label="الصفحة التالية"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
