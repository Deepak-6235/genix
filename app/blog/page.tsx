'use client';

import { useBlogs } from '@/hooks/useBlogs';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function BlogsPage() {
  const { blogs, loading, error } = useBlogs();
  const { dir } = useLanguage();

  return (
    <div dir={dir}>
      {/* Header with Language Switcher */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    author: string | null;
    imageUrl: string | null;
    slug: string;
    publishedAt: string | null;
  };
}

function BlogCard({ blog }: BlogCardProps) {
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <a
      href={`/blog/${blog.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
    >
      {blog.imageUrl && (
        <div className="relative overflow-hidden h-48 bg-gray-200">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {publishedDate && (
          <p className="text-sm text-gray-500 mb-2">{publishedDate}</p>
        )}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 flex-1">
          {blog.excerpt}
        </p>
        {blog.author && (
          <p className="text-sm text-gray-500 mt-4">By {blog.author}</p>
        )}
        <div className="mt-4 flex items-center text-purple-600 font-medium group-hover:gap-2 transition-all">
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
