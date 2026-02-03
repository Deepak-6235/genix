'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  services: number;
  blogs: number;
  reviews: number;
  faqs: number;
  statistics: number;
}

interface Service {
  id: string;
  title: string;
  isActive: boolean;
}

interface Blog {
  id: string;
  title: string;
  isActive: boolean;
}

interface Review {
  id: string;
  name: string;
  isActive: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    blogs: 0,
    reviews: 0,
    faqs: 0,
    statistics: 0,
  });
  const [recentServices, setRecentServices] = useState<Service[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Single API call for all dashboard data
      const response = await fetch('/api/dashboard');
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        setRecentServices(data.recentContent.services || []);
        setRecentBlogs(data.recentContent.blogs || []);
        setRecentReviews(data.recentContent.reviews || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Services', value: stats.services, icon: '🔧', color: 'bg-blue-500', path: '/admin-genix/dashboard/services' },
    { name: 'Blog Posts', value: stats.blogs, icon: '📝', color: 'bg-green-500', path: '/admin-genix/dashboard/blogs' },
    { name: 'Reviews', value: stats.reviews, icon: '⭐', color: 'bg-yellow-500', path: '/admin-genix/dashboard/reviews' },
    { name: 'FAQs', value: stats.faqs, icon: '❓', color: 'bg-purple-500', path: '/admin-genix/dashboard/faqs' },
    { name: 'Statistics', value: stats.statistics, icon: '📈', color: 'bg-red-500', path: '/admin-genix/dashboard/statistics' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">Welcome to your admin panel - manage your website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.path}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Link
            href="/admin-genix/dashboard/services"
            className="flex items-center space-x-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
          >
            <span className="text-xl">🔧</span>
            <span>Add Service</span>
          </Link>
          <Link
            href="/admin-genix/dashboard/blogs"
            className="flex items-center space-x-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-medium"
          >
            <span className="text-xl">📝</span>
            <span>Add Blog</span>
          </Link>
          <Link
            href="/admin-genix/dashboard/reviews"
            className="flex items-center space-x-3 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition font-medium"
          >
            <span className="text-xl">⭐</span>
            <span>Add Review</span>
          </Link>
          <Link
            href="/admin-genix/dashboard/faqs"
            className="flex items-center space-x-3 px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium"
          >
            <span className="text-xl">❓</span>
            <span>Add FAQ</span>
          </Link>
          <Link
            href="/admin-genix/dashboard/about-us"
            className="flex items-center space-x-3 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
          >
            <span className="text-xl">📋</span>
            <span>Edit About Us</span>
          </Link>
        </div>
      </div>

      {/* Recent Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Services</h3>
            <Link href="/admin-genix/dashboard/services" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentServices.length > 0 ? (
              recentServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{service.title}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium ${
                      service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No services yet</p>
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Blogs</h3>
            <Link href="/admin-genix/dashboard/blogs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium ${
                      blog.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {blog.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No blogs yet</p>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Reviews</h3>
            <Link href="/admin-genix/dashboard/reviews" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">By {review.name}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium ${
                      review.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {review.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Content Status Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.services}</p>
            <p className="text-sm text-gray-600 mt-1">Services</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.blogs}</p>
            <p className="text-sm text-gray-600 mt-1">Blog Posts</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.reviews}</p>
            <p className="text-sm text-gray-600 mt-1">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{stats.faqs}</p>
            <p className="text-sm text-gray-600 mt-1">FAQs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{stats.statistics}</p>
            <p className="text-sm text-gray-600 mt-1">Statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
