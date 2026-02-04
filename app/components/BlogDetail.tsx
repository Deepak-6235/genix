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

interface Comment {
  id: number;
  userName: string;
  email?: string;
  website?: string;
  comment: string;
  date: string;
}

// Get mock comments from translations
const getMockComments = (blogId: number, translations: any): Comment[] => {
  const blogComments = translations.mockComments.find((mc: any) => mc.blogId === blogId);
  if (!blogComments) return [];
  
  return blogComments.comments.map((comment: any, index: number) => ({
    id: index + 1,
    userName: comment.userName,
    comment: comment.comment,
    date: comment.date,
  }));
};

export default function BlogDetail({ blogId }: { blogId: string }) {
  const t = useBlogContentTranslations();
  const { dir } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  
  const blogIdNum = parseInt(blogId, 10);
  
  // Initialize comments when component mounts
  useEffect(() => {
    if (!isNaN(blogIdNum) && blogIdNum >= 1 && blogIdNum <= 6) {
      setComments(getMockComments(blogIdNum, t));
    }
  }, [blogIdNum, t]);
  
  if (isNaN(blogIdNum) || blogIdNum < 1 || blogIdNum > t.posts.length) {
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
  
  const post = t.posts[blogIdNum - 1];
  const imageId = getBlogImageId(blogIdNum);
  const imagePath = `/images/blog-${blogIdNum}.jpg`;
  
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
                <li className="text-slate-900 font-semibold line-clamp-1">{post.title}</li>
              </ol>
            </nav>

            {/* Hero Section with Title and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 mb-6 text-sm sm:text-base text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Image in Aside */}
              <aside className="lg:col-span-1">
                <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={`https://images.unsplash.com/photo-${imageId}?w=800&h=500&fit=crop&q=80`}
                    alt={post.title}
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
          DESCRIPTION CONTENT
          ============================================ */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-line">
                {post.description || post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

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
