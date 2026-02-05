"use client";

import { useEffect, useState } from "react";
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
 * - Dynamically fetches blogs from database
 */

interface Blog {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  publishedAt: string | null;
}

export default function BlogContent() {
  const t = useBlogContentTranslations();
  const { dir, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Fetch blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs?lang=${language}&page=${currentPage}&limit=6`);
        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs);
          setPagination(data.pagination);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [language, currentPage]);

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-5rem)] flex items-center py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/blog.jpg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
              <ol className={`flex items-center gap-2 text-sm sm:text-base text-white/90 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <li>
                  <Link href="/" className="hover:text-primary-400 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-white font-semibold">{t.breadcrumbBlog}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center" data-aos="fade-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-4">
                Stay updated with our latest news, home maintenance tips, and professional advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          BLOG GRID SECTION
          ============================================ */}
      <section className="pt-6 sm:pt-10 md:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-gray-200 h-48 sm:h-56"></div>
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16" data-aos="fade-up" data-aos-delay="200">
                {blogs.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={post.imageUrl || "/images/blog-1.jpg"}
                        alt={post.name}
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
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>

                      {/* Title */}
                      <h3 className="!text-lg !md:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                        {post.name}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                        {post.shortDescription}
                      </p>

                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors flex items-center gap-1"
                      >
                        {t.readMore}
                        <span className="inline-block transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ============================================
                PAGINATION
                ============================================ */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={!pagination.hasPreviousPage}
                  className="hero-gradient-btn px-4 py-2 sm:px-5 sm:py-2.5 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous Page"
                >
                  <svg className={`w-5 h-5 ${dir === 'rtl' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const shouldShow =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                  // Show ellipsis
                  const showEllipsisBefore = pageNum === currentPage - 1 && currentPage > 3;
                  const showEllipsisAfter = pageNum === currentPage + 1 && currentPage < totalPages - 2;

                  if (!shouldShow && !showEllipsisBefore && !showEllipsisAfter) {
                    return null;
                  }

                  if (showEllipsisBefore && pageNum !== 2) {
                    return <span key={`ellipsis-before-${pageNum}`} className="px-2 text-slate-500">…</span>;
                  }

                  if (showEllipsisAfter && pageNum !== totalPages - 1) {
                    return <span key={`ellipsis-after-${pageNum}`} className="px-2 text-slate-500">…</span>;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${currentPage === pageNum
                        ? 'hero-gradient-btn text-white'
                        : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-primary-400'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={!pagination.hasNextPage}
                  className="hero-gradient-btn px-4 py-2 sm:px-5 sm:py-2.5 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next Page"
                >
                  <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
