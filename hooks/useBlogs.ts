'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string | null;
  imageUrl: string | null;
  slug: string;
  isActive: boolean;
  publishedAt: string | null;
  order: number;
}

export function useBlogs() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/blogs?lang=${language}`);
        const data = await response.json();

        if (data.success) {
          // Filter only active blogs for public view
          setBlogs(data.blogs.filter((b: Blog) => b.isActive));
        } else {
          setError(data.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [language]);

  return { blogs, loading, error };
}

export function useBlog(slug: string) {
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/blogs/${slug}?lang=${language}`);
        const data = await response.json();

        if (data.success) {
          setBlog(data.blog);
        } else {
          setError(data.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError('Failed to fetch blog');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug, language]);

  return { blog, loading, error };
}
