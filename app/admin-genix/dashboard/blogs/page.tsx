'use client';

import { useState, useEffect } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { useRouter } from 'next/navigation';

interface DetailedBlog {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  order: number;
}

interface Blog {
  id: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  slug: string;
  isActive: boolean;
  publishedAt: string | null;
  order: number;
  detailedBlogs?: DetailedBlog[];
}

function BlogCard({ blog, onDelete, onView, onEdit, t }: {
  blog: Blog;
  onDelete: (slug: string) => void;
  onView: (slug: string) => void;
  onEdit: (slug: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div
      onClick={() => onView(blog.slug)}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      {/* Blog Image with Status Badge */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            blog.isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {blog.isActive ? t('status.active') : t('status.inactive')}
        </span>
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {blog.name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <span>{t('blogs.author')} {blog.author}</span>
          {blog.detailedBlogs && blog.detailedBlogs.length > 0 && (
            <>
              <span>•</span>
              <span className="text-purple-600 font-medium">
                {blog.detailedBlogs.length} {t('blogs.sections')}
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {blog.shortDescription}
        </p>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(blog.slug);
            }}
            className="p-1 text-gray-600 hover:text-blue-600 transition"
            title={t('button.edit')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(blog.slug);
            }}
            className="p-1 text-red-600 hover:text-red-700 transition"
            title={t('button.delete')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const router = useRouter();
  const { t, adminLanguage } = useAdminLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log(`Fetching blogs for language: ${adminLanguage}`);
      const response = await fetch(`/api/blogs?lang=${adminLanguage}`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [adminLanguage]);

  const handleDelete = async (slug: string) => {
    if (!confirm(t('message.deleteConfirm'))) return;

    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      await fetchBlogs();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">{t('loading.please')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('blogs.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('blogs.subtitle')}</p>
        </div>
        <button
          onClick={() => router.push('/admin-genix/dashboard/blogs/new')}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('blogs.addNew')}
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            t={t}
            onView={(slug) => router.push(`/admin-genix/dashboard/blogs/view/${slug}`)}
            onEdit={(slug) => router.push(`/admin-genix/dashboard/blogs/view/${slug}?edit=true`)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg font-medium text-gray-900 mb-1">{t('blogs.noBlogs')}</p>
          <p className="text-sm text-gray-500">Get started by creating your first blog post</p>
        </div>
      )}
    </div>
  );
}
