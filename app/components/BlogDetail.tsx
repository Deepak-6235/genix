"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBlogContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Blog Detail Component
 *
 * This component displays a detailed blog post with:
 * - A hero section with title and description
 * - An image in the aside
 * - Full description content below
 *
 * Features:
 * - Responsive design for all screen sizes
 * - Modern UI with proper layout
 * - Breadcrumb navigation
 */

interface DetailedBlog {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
}

interface Blog {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
  detailedBlogs: DetailedBlog[];
}

interface Comment {
  id: number;
  userName: string;
  email?: string;
  website?: string;
  comment: string;
  date: string;
}

export default function BlogDetail({ blogSlug }: { blogSlug: string }) {
  const t = useBlogContentTranslations();
  const { dir, language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${blogSlug}?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setBlog(data.blog);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogSlug, language]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && userName.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        userName: userName.trim(),
        email: email.trim() || undefined,
        website: website.trim() || undefined,
        comment: newComment.trim(),
        date: t.now,
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setUserName("");
      setEmail("");
      setWebsite("");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
              <ol className={`flex items-center gap-2 text-sm sm:text-base text-slate-600 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
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
                <li>
                  <Link href="/blog" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbBlog}
                  </Link>
                </li>
                <li>
                  <svg className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold line-clamp-1">{blog.name}</li>
              </ol>
            </nav>

            {/* Hero Section with Title and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                  {blog.name}
                </h1>
                <div className="flex items-center gap-3 mb-6 text-sm sm:text-base text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{blog.author}</span>
                  <span>•</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                  {blog.shortDescription}
                </p>
              </div>

              {/* Image in Aside */}
              <aside className="lg:col-span-1">
                <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          DETAILED BLOG SECTIONS
          ============================================ */}
      {blog.detailedBlogs && blog.detailedBlogs.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {blog.detailedBlogs.map((section) => (
                <div key={section.id} className="space-y-6">
                  {/* Section Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                    {section.title}
                  </h2>

                  {/* Section Image (if exists) */}
                  {section.imageUrl && (
                    <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={section.imageUrl}
                        alt={section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 896px"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Section Description */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          COMMENTS SECTION
          ============================================ */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Comments Header */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 sm:mb-8">
              {t.commentsTitle} ({comments.length})
            </h2>

            {/* Add Comment Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                {t.addComment}
              </h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.websiteLabel}
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    placeholder={t.websitePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.commentLabel}
                  </label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 resize-none"
                    placeholder={t.commentPlaceholder}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t.submitComment}
                </button>
              </form>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4 sm:space-y-6">
              {comments.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                  <p className="text-slate-600 text-base sm:text-lg">
                    {t.noCommentsYet}
                  </p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                            {comment.userName}
                          </h4>
                          <span className="text-sm text-slate-500">{comment.date}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
