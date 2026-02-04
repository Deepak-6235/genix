"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useBlogTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Blog {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
  isActive: boolean;
}

export default function Blog() {
  const t = useBlogTranslations();
  const { dir, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?lang=${language}`);
        const data = await response.json();
        if (data.success && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs);
        } else {
          // Fallback to static blog posts from translations if no database blogs
          const staticBlogs: Blog[] = t.posts.map((post, index) => ({
            id: `static-${index + 1}`,
            slug: `blog-${index + 1}`,
            name: post.title,
            shortDescription: post.excerpt,
            author: 'admin',
            imageUrl: `/images/blog-${index + 1}.jpg`,
            publishedAt: post.date,
            isActive: true,
          }));
          setBlogs(staticBlogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        // Fallback to static blog posts from translations on error
        const staticBlogs: Blog[] = t.posts.map((post, index) => ({
          id: `static-${index + 1}`,
          slug: `blog-${index + 1}`,
          name: post.title,
          shortDescription: post.excerpt,
          author: 'admin',
          imageUrl: `/images/blog-${index + 1}.jpg`,
          publishedAt: post.date,
          isActive: true,
        }));
        setBlogs(staticBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [language, t.posts]);

  // Format date
  const formatDate = (dateString: string) => {
    // If the date is already formatted (from static posts), return as is
    // Database dates are ISO strings (contain 'T' or 'Z'), static dates are formatted strings
    if (dateString && !dateString.includes('T') && !dateString.includes('Z')) {
      return dateString;
    }

    // Format database dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-10 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary-600 mb-4 sm:mb-6">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-200 h-40 sm:h-48"></div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.blog-button-next',
                prevEl: '.blog-button-prev',
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="!pt-4 !px-4 !pb-14"
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id} className="pt-2 pb-2 !h-auto">
                  <article
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col"
                  >
                    {/* Blog Image */}
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden shrink-0">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 sm:px-3 py-1 rounded-full">
                          {blog.author}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500">{formatDate(blog.publishedAt)}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-tertiary-600 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {blog.name}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {blog.shortDescription}
                      </p>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className={`text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors ${dir === 'rtl' ? '' : ''}`}
                      >
                        {t.readMore} →
                      </Link>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8 px-4">
          <Link
            href="/blog"
            className={`btn-view-more text-white px-6 sm:px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2 text-sm sm:text-base ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <span>{t.viewMore}</span>
            <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
