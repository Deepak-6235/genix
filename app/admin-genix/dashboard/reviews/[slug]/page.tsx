'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { translateContent } from '@/lib/translate';
import Link from 'next/link';

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

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, adminLanguage } = useAdminLanguage();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>(adminLanguage as LanguageCode);
  const [isEditMode, setIsEditMode] = useState(searchParams.get('edit') === 'true');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    text: '',
    rating: 5,
    isActive: true,
  });

  const CHAR_LIMITS = {
    name: 100,
    position: 100,
    company: 150,
    text: 500,
  };

  useEffect(() => {
    setViewLanguage(adminLanguage as LanguageCode);
  }, [adminLanguage]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews?allLangs=true`);
        const data = await response.json();

        if (data.success) {
          const foundReview = data.reviews.find((r: Review) => r.slug === params.slug);
          if (foundReview) {
            setReview(foundReview);
            // Initialize form data with English content
            const englishData = foundReview.translations?.en || {
              name: foundReview.name,
              position: foundReview.position,
              company: foundReview.company,
              text: foundReview.text,
            };
            setFormData({
              name: englishData.name,
              position: englishData.position,
              company: englishData.company,
              text: englishData.text,
              rating: foundReview.rating,
              isActive: foundReview.isActive,
            });
          } else {
            router.push('/admin-genix/dashboard/reviews');
          }
        }
      } catch (error) {
        console.error('Failed to fetch review:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchReview();
    }
  }, [params.slug, router]);

  const handleSave = async () => {
    if (!review) return;

    setSaving(true);
    setError('');

    try {
      // Translate content to all languages
      const englishContent: ReviewTranslation = {
        name: formData.name,
        position: formData.position,
        company: formData.company,
        text: formData.text,
      };

      setError(t('message.translating'));
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja'];
      const translations = await translateContent(englishContent, targetLanguages);

      setError('');

      const response = await fetch(`/api/reviews/${encodeURIComponent(review.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: review.slug,
          isActive: formData.isActive,
          rating: formData.rating,
          translations,
          order: review.order,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update review');
      }

      if (data.success) {
        // Refresh review data
        const refreshResponse = await fetch(`/api/reviews?allLangs=true`);
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          const updatedReview = refreshData.reviews.find((r: Review) => r.slug === review.slug);
          if (updatedReview) {
            setReview(updatedReview);
          }
        }
        setIsEditMode(false);
      } else {
        setError(data.message || 'Failed to update review');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!review) return;
    // Reset form data
    const englishData = review.translations?.en || {
      name: review.name,
      position: review.position,
      company: review.company,
      text: review.text,
    };
    setFormData({
      name: englishData.name,
      position: englishData.position,
      company: englishData.company,
      text: englishData.text,
      rating: review.rating,
      isActive: review.isActive,
    });
    setIsEditMode(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple-600"></div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('reviews.reviewNotFound')}</p>
      </div>
    );
  }

  const currentData = review.translations?.[viewLanguage] || {
    name: review.name,
    position: review.position,
    company: review.company,
    text: review.text,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button and Language Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('button.back') || 'Back'}
              </button>
            </div>

            {/* Language Selector - Only show in view mode */}
            {!isEditMode && review.translations && Object.keys(review.translations).length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">{t('reviews.viewLanguage')}:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(review.translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setViewLanguage(lang as LanguageCode)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        viewLanguage === lang
                          ? 'bg-accent-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {LANGUAGES[lang as LanguageCode]?.flag || ''} {LANGUAGES[lang as LanguageCode]?.name || lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Edit Mode Notice */}
            {isEditMode && (
              <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-lg text-sm font-medium">
                {t('services.autoTranslateNote')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Active Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('form.status')}</h3>
              {isEditMode ? (
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-accent-purple-600 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{t('status.active')}</span>
                </label>
              ) : (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  review.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {review.isActive ? t('status.active') : t('status.inactive')}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('reviews.rating')}</h3>
              {isEditMode ? (
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${star <= formData.rating ? 'text-warning-400 fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({formData.rating} {t('reviews.stars')})</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-6 h-6 ${index < review.rating ? 'text-warning-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.customerName')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.name.length}/{CHAR_LIMITS.name}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={CHAR_LIMITS.name}
                  className="w-full text-xl font-bold text-gray-900 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Ahmed Al-Maliki"
                />
              ) : (
                <p className="text-xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.name}
                </p>
              )}
            </div>

            {/* Position */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.position')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.position.length}/{CHAR_LIMITS.position}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  maxLength={CHAR_LIMITS.position}
                  className="w-full text-lg text-gray-800 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Facilities Manager"
                />
              ) : (
                <p className="text-lg text-gray-800" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.position}
                </p>
              )}
            </div>

            {/* Company */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.company')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.company.length}/{CHAR_LIMITS.company}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  maxLength={CHAR_LIMITS.company}
                  className="w-full text-lg text-primary-600 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Elite Trading Company"
                />
              ) : (
                <p className="text-lg text-primary-600" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.company}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.reviewText')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.text.length}/{CHAR_LIMITS.text}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  maxLength={CHAR_LIMITS.text}
                  rows={6}
                  className="w-full text-base text-gray-700 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Excellent and highly professional service..."
                />
              ) : (
                <p className="text-base text-gray-700 leading-relaxed italic" dir={LANGUAGES[viewLanguage]?.dir}>
                  " {currentData.text} "
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
                  >
                    {t('button.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full sm:w-auto px-8 py-3 bg-accent-purple-600 text-white rounded-lg hover:bg-accent-purple-700 transition font-medium disabled:opacity-50"
                  >
                    {saving ? t('message.savingChanges') : t('button.save')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/admin-genix/dashboard/reviews`}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
                  >
                    {t('reviews.backToReviews')}
                  </Link>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="w-full sm:w-auto px-8 py-3 bg-accent-purple-600 text-white rounded-lg hover:bg-accent-purple-700 transition font-medium"
                  >
                    {t('reviews.editReview')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
