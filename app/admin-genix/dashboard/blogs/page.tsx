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

function BlogItem({ blog, onDelete, onView, onEdit, t }: {
  blog: Blog;
  onDelete: (id: string) => void;
  onView: (blog: Blog) => void;
  onEdit: (slug: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{blog.name}</h3>
              <p className="text-sm text-gray-600">By {blog.author}</p>
              {blog.detailedBlogs && blog.detailedBlogs.length > 0 && (
                <p className="text-xs text-purple-600 mt-1">{blog.detailedBlogs.length} detailed sections</p>
              )}
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                blog.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {blog.isActive ? t('status.active') : t('status.inactive')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.shortDescription}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(blog)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              {t('button.view')}
            </button>
            <button
              onClick={() => onEdit(blog.slug)}
              className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              {t('button.edit')}
            </button>
            <button
              onClick={() => onDelete(blog.slug)}
              className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              {t('button.delete')}
            </button>
          </div>
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
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);

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
    if (!confirm('Are you sure you want to delete this blog?')) return;

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('blogs.title')}</h1>
          <p className="mt-2 text-gray-600">{t('blogs.subtitle')}</p>
        </div>
        <button
          onClick={() => router.push('/admin-genix/dashboard/blogs/new')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {t('blogs.addBlog')}
        </button>
      </div>

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
            t={t}
            onView={(blog) => {
              setViewingBlog(blog);
              setShowViewModal(true);
            }}
            onEdit={(slug) => router.push(`/admin-genix/dashboard/blogs/edit/${slug}`)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">{t('blogs.noBlogs')}</p>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{viewingBlog.name}</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {viewingBlog.imageUrl && (
                <img
                  src={viewingBlog.imageUrl}
                  alt={viewingBlog.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}

              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>By {viewingBlog.author}</p>
                {viewingBlog.publishedAt && (
                  <p>Published: {new Date(viewingBlog.publishedAt).toLocaleDateString()}</p>
                )}
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-bold text-purple-900 mb-2">Short Description</h3>
                <p className="text-gray-700">{viewingBlog.shortDescription}</p>
              </div>

              {viewingBlog.detailedBlogs && viewingBlog.detailedBlogs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                    Detailed Sections ({viewingBlog.detailedBlogs.length})
                  </h3>
                  {viewingBlog.detailedBlogs.map((section, index) => (
                    <div key={section.id} className="border-l-4 border-purple-500 pl-4 py-2">
                      {section.imageUrl && (
                        <img
                          src={section.imageUrl}
                          alt={section.title}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h4 className="font-bold text-gray-900 mb-2">
                        {index + 1}. {section.title}
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{section.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {t('button.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
