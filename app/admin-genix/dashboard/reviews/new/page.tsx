'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { translateContent } from '@/lib/translate';
import Link from 'next/link';

interface ReviewTranslation {
  name: string;
  position: string;
  company: string;
  text: string;
}

export default function NewReviewPage() {
  const router = useRouter();
  const { t } = useAdminLanguage();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state
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

  const handleSave = async () => {
    setSaving(true);
    setError('');

    // Validation
    if (!formData.name || !formData.position || !formData.company || !formData.text) {
      setError(t('message.required'));
      setSaving(false);
      return;
    }

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

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isActive: formData.isActive,
          rating: formData.rating,
          translations,
          order: 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create review');
      }

      if (data.success) {
        router.push('/admin-genix/dashboard/reviews');
      } else {
        setError(data.message || 'Failed to create review');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

            {/* Edit Mode Notice */}
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
              {t('reviews.creatingInEnglish')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('reviews.newReview')}</h1>
              <p className="mt-2 text-gray-600">{t('reviews.newReviewSubtitle')}</p>
            </div>

            {error && (
              <div className={`border px-4 py-3 rounded-lg text-sm ${
                error.includes('Translating')
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {error}
              </div>
            )}

            {/* Active Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('form.status')}</h3>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded mr-2"
                />
                <span className="text-sm font-medium text-gray-700">{t('status.active')}</span>
              </label>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('reviews.rating')} *</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                    type="button"
                  >
                    <svg
                      className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:scale-110 transition`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">({formData.rating} {t('reviews.stars')})</span>
              </div>
            </div>

            {/* Customer Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.customerName')} *
                <span className="ml-2 text-xs text-gray-400">
                  {formData.name.length}/{CHAR_LIMITS.name}
                </span>
              </h3>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={CHAR_LIMITS.name}
                className="w-full text-xl font-bold text-gray-900 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Ahmed Al-Maliki"
                required
              />
            </div>

            {/* Position */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.position')} *
                <span className="ml-2 text-xs text-gray-400">
                  {formData.position.length}/{CHAR_LIMITS.position}
                </span>
              </h3>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                maxLength={CHAR_LIMITS.position}
                className="w-full text-lg text-gray-800 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Facilities Manager"
                required
              />
            </div>

            {/* Company */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.company')} *
                <span className="ml-2 text-xs text-gray-400">
                  {formData.company.length}/{CHAR_LIMITS.company}
                </span>
              </h3>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                maxLength={CHAR_LIMITS.company}
                className="w-full text-lg text-blue-600 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Elite Trading Company"
                required
              />
            </div>

            {/* Review Text */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('reviews.reviewText')} *
                <span className="ml-2 text-xs text-gray-400">
                  {formData.text.length}/{CHAR_LIMITS.text}
                </span>
              </h3>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                maxLength={CHAR_LIMITS.text}
                rows={6}
                className="w-full text-base text-gray-700 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Excellent and highly professional service. The team is committed and professional in their dealings. I highly recommend dealing with them."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                href="/admin-genix/dashboard/reviews"
                className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
              >
                {saving ? 'Creating Review...' : 'Create Review'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
