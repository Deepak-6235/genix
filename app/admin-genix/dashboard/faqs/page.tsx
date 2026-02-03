'use client';

import { useState, useEffect } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
}

function FAQItem({ faq, onEdit, onDelete, t }: {
  faq: FAQ;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
  t: (key: string) => string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="flex items-start gap-4 p-4">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  faq.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {faq.isActive ? t('status.active') : t('status.inactive')}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-700"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {isExpanded && (
            <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">{faq.answer}</p>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(faq)}
              className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              {t('button.edit')}
            </button>
            <button
              onClick={() => onDelete(faq.id)}
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

export default function FAQsPage() {
  const { t } = useAdminLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const CHAR_LIMITS = {
    question: 120,
    answer: 205,
  };

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    isActive: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/faqs?lang=en&admin=true');
      const data = await response.json();
      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
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

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        isActive: faq.isActive,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        isActive: true,
      });
    }
    setShowModal(true);
    setError('');
    setFieldErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setError('');
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setFieldErrors({});

    if (!formData.question || !formData.answer) {
      setError('Question and answer are required');
      setFormLoading(false);
      return;
    }

    // Validate character limits
    const errors: Record<string, string> = {};
    const questionError = validateField('question', formData.question);
    const answerError = validateField('answer', formData.answer);

    if (questionError) {
      errors.question = questionError;
    }
    if (answerError) {
      errors.answer = answerError;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix character limit errors before submitting');
      setFormLoading(false);
      return;
    }

    try {
      const url = editingFaq ? `/api/faqs/${editingFaq.id}` : '/api/faqs';
      const method = editingFaq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Operation failed');
      }

      await fetchFaqs();
      closeModal();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('message.deleteConfirm'))) return;

    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      await fetchFaqs();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete FAQ');
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
          <h1 className="text-2xl font-bold text-gray-900">{t('faqs.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('faqs.subtitle')}</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {t('faqs.addNew')}
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            t={t}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">{t('faqs.noFaqs')}</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingFaq ? t('modal.editFaq') : t('modal.addFaq')}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('faqs.question')} *
                  <span className={`ml-2 text-xs ${formData.question.length > CHAR_LIMITS.question ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                    {formData.question.length}/{CHAR_LIMITS.question}
                  </span>
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={CHAR_LIMITS.question}
                  value={formData.question}
                  onChange={(e) => {
                    setFormData({ ...formData, question: e.target.value });
                    const error = validateField('question', e.target.value);
                    if (error) {
                      setFieldErrors(prev => ({ ...prev, question: error }));
                    } else {
                      setFieldErrors(prev => {
                        const updated = { ...prev };
                        delete updated.question;
                        return updated;
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                    fieldErrors.question ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('placeholder.enterDescription')}
                />
                {fieldErrors.question && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.question}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('faqs.answer')} *
                  <span className={`ml-2 text-xs ${formData.answer.length > CHAR_LIMITS.answer ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                    {formData.answer.length}/{CHAR_LIMITS.answer}
                  </span>
                </label>
                <textarea
                  required
                  rows={6}
                  maxLength={CHAR_LIMITS.answer}
                  value={formData.answer}
                  onChange={(e) => {
                    setFormData({ ...formData, answer: e.target.value });
                    const error = validateField('answer', e.target.value);
                    if (error) {
                      setFieldErrors(prev => ({ ...prev, answer: error }));
                    } else {
                      setFieldErrors(prev => {
                        const updated = { ...prev };
                        delete updated.answer;
                        return updated;
                      });
                    }
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                    fieldErrors.answer ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('placeholder.enterDescription')}
                />
                {fieldErrors.answer && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.answer}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                  {t('form.isActive')}
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {t('button.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {formLoading ? t('modal.saving') : editingFaq ? t('button.update') : t('button.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
