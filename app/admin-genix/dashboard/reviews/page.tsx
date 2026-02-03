'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { useRouter } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';

interface ReviewTranslation {
  name: string;
  position: string;
  company: string;
  text: string;
}

interface Review {
  id: string;
  slug: string;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  isActive: boolean;
  order: number;
  translations?: Record<string, ReviewTranslation>;
}

function ReviewCard({ review, onEdit, onDelete, currentLang }: {
  review: Review;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
  currentLang: LanguageCode;
}) {
  const displayData = review.translations?.[currentLang] || {
    name: review.name,
    position: review.position,
    company: review.company,
    text: review.text,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
      {/* Status Badge - Top Right */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1"></div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          review.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {review.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 italic mb-6 leading-relaxed" dir={LANGUAGES[currentLang]?.dir}>
        " {displayData.text} "
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Name, Position, Company */}
        <div className="flex-1" dir={LANGUAGES[currentLang]?.dir}>
          <h3 className="font-bold text-gray-900">{displayData.name}</h3>
          <p className="text-sm text-gray-600">{displayData.position}</p>
          <p className="text-sm text-blue-600">{displayData.company}</p>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(review.slug)}
          className="p-1 text-gray-600 hover:text-blue-600 transition"
          title="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(review.slug)}
          className="p-1 text-red-600 hover:text-red-700 transition"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const router = useRouter();
  const { t, adminLanguage } = useAdminLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [adminLanguage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?allLangs=true`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchReviews();
      } else {
        alert(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('reviews.title') || 'Reviews'}</h2>
          <p className="mt-1 text-sm text-gray-600">Manage customer reviews and testimonials</p>
        </div>
        <button
          onClick={() => router.push('/admin-genix/dashboard/reviews/new')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          + Add Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            currentLang={adminLanguage as LanguageCode}
            onEdit={(slug) => router.push(`/admin-genix/dashboard/reviews/${slug}?edit=true`)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No reviews found</p>
        </div>
      )}
    </div>
  );
}
