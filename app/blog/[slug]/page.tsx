'use client';

import { useBlog } from '@/hooks/useBlogs';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { blog, loading, error } = useBlog(params.slug);
  const { dir } = useLanguage();

  return (
    <div dir={dir}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/blog" className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && !blog && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Blog post not found.</p>
            <Link href="/blog" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
              Go back to blog
            </Link>
          </div>
        )}

        {!loading && !error && blog && (
          <article className="space-y-8">
            {/* Hero Section with Image */}
            {blog.imageUrl && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Title and Meta */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b pb-4">
                {blog.publishedAt && (
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {blog.author && (
                  <>
                    <span>•</span>
                    <span>By {blog.author}</span>
                  </>
                )}
              </div>
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {blog.content}
              </div>
            </div>

            {/* Back Link */}
            <div className="pt-8 border-t border-gray-200">
              <Link href="/blog" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Posts
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
