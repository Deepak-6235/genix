'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

interface Review {
  id: string;
  name: string;
  text: string;
  isActive: boolean;
  order: number;
}

export default function ReviewsPage() {
  const { t } = useAdminLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({});
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  const CHAR_LIMITS = {
    text: 260,
  };

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
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

  const validateField = (field: string, value: string): string => {
    const limits = CHAR_LIMITS as Record<string, number>;
    const charLimit = limits[field];

    if (!charLimit) return '';

    if (value.length > charLimit) {
      return `Exceeds limit of ${charLimit} characters. Current: ${value.length}`;
    }
    return '';
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setFormData({ ...review });
    setShowForm(true);
    setFieldErrors({});
    setError('');
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ isActive: true, order: reviews.length });
    setShowForm(true);
    setFieldErrors({});
    setError('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setFieldErrors({});

      if (!formData.name || !formData.text) {
        setError('Name and review text are required');
        setSaving(false);
        return;
      }

      // Validate character limit
      const textError = validateField('text', formData.text);
      if (textError) {
        setFieldErrors({ text: textError });
        setError('Please fix character limit errors before submitting');
        setSaving(false);
        return;
      }

      const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchReviews();
        setShowForm(false);
        setFormData({});
        setEditingId(null);
      } else {
        alert(data.message || 'Failed to save review');
      }
    } catch (error) {
      console.error('Failed to save review:', error);
      alert('Failed to save review');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${id}`, {
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
          <p className="mt-4 text-gray-600">{t('loading.please')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{t('reviews.title')}</h1>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          {t('reviews.addReview')}
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  review.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {review.isActive ? t('status.active') : t('status.inactive')}
              </span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">{review.text}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                {t('button.edit')}
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                {t('button.delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">{t('reviews.noReviews')}</p>
        </div>
      )}

      {/* Edit/Add Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? t('modal.editReview') : t('modal.addReview')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('reviews.reviewerName')}</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('placeholder.enterDescription')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('reviews.reviewText')}
                  <span className={`ml-2 text-xs ${(formData.text?.length ?? 0) > CHAR_LIMITS.text ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                    {formData.text?.length ?? 0}/{CHAR_LIMITS.text}
                  </span>
                </label>
                <textarea
                  value={formData.text || ''}
                  maxLength={CHAR_LIMITS.text}
                  onChange={(e) => {
                    setFormData({ ...formData, text: e.target.value });
                    const error = validateField('text', e.target.value);
                    if (error) {
                      setFieldErrors({ text: error });
                    } else {
                      setFieldErrors({});
                    }
                  }}
                  placeholder={t('placeholder.enterDescription')}
                  rows={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                    fieldErrors.text ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.text && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.text}</p>
                )}
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{t('form.isActive')}</span>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({});
                  setEditingId(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                {t('button.cancel')}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? t('modal.saving') : t('button.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
