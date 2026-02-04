"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function BlogContent() {
  const t = useBlogContentTranslations();
  const { dir } = useLanguage();
  
  const blogPosts = t.posts.map((post, index) => ({
    id: index + 1,
    title: post.title,
    date: post.date,
    author: "admin",
    image: `/images/blog-${index + 1}.jpg`,
    excerpt: post.excerpt,
  }));
  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-4 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 sm:mb-4" aria-label="Breadcrumb">
              <ol className={`flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbBlog}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              {t.pageTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* ============================================
          BLOG GRID SECTION
          ============================================ */}
      <section className="pt-6 sm:pt-10 md:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
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
                      href={`/blog/${post.id}`}
                      className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group/link text-sm sm:text-base ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      <span>{t.readMore}</span>
                      <svg className={`w-4 h-4 transition-transform ${dir === 'rtl' ? 'group-hover/link:-translate-x-1 rotate-180' : 'group-hover/link:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                aria-label={dir === 'rtl' ? 'Previous Page' : 'Previous Page'}
              >
                <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
                1
              </button>
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
                2
              </button>
              <span className="px-2 text-slate-500">…</span>
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
                6
              </button>

              {/* Next Button */}
              <button 
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                aria-label={dir === 'rtl' ? 'Next Page' : 'Next Page'}
              >
                <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
