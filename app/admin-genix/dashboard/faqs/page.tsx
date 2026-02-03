'use client';

import { useState, useEffect } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';

interface FAQ {
  id: string;
  faqId: string;
  question: string;
  answer: string | null;
  isActive: boolean;
  order: number;
}

function FAQCard({ faq, onEdit, onDelete, onAnswer, t }: {
  faq: FAQ;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
  onAnswer: (faq: FAQ) => void;
  t: (key: string) => string;
}) {
  const hasAnswer = faq.answer && faq.answer.trim().length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
      {/* Status Badge */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              hasAnswer
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {hasAnswer ? t('faqs.answered') : t('faqs.pending')}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              faq.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {faq.isActive ? t('status.active') : t('status.inactive')}
          </span>
        </div>
      </div>

      {/* Question & Answer */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {faq.question}
        </h3>

        {hasAnswer ? (
          <p className="text-sm text-gray-600 mb-4 line-clamp-4 leading-relaxed">
            {faq.answer}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic mb-4">
            {t('faqs.noAnswerYet')}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!hasAnswer && (
            <button
              onClick={() => onAnswer(faq)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-medium"
            >
              {t('faqs.addAnswer')}
            </button>
          )}
          <button
            onClick={() => onEdit(faq)}
            className={`${hasAnswer ? 'flex-1' : 'flex-1'} px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium`}
          >
            {t('button.edit')}
          </button>
          <button
            onClick={() => onDelete(faq.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            title={t('button.delete')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const { t, adminLanguage } = useAdminLanguage();
  const { toast, showToast, closeToast } = useToast();
  const { confirmModal, openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [answeringFaq, setAnsweringFaq] = useState<FAQ | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const CHAR_LIMITS = {
    question: 200,
    answer: 500,
  };

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    isActive: true,
  });

  const [answerFormData, setAnswerFormData] = useState({
    answer: '',
  });

  useEffect(() => {
    fetchFaqs();
  }, [adminLanguage]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      console.log(`Fetching FAQs for language: ${adminLanguage}`);
      const response = await fetch(`/api/faqs?lang=${adminLanguage}`);
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
        answer: faq.answer || '',
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

  const openAnswerModal = (faq: FAQ) => {
    setAnsweringFaq(faq);
    setAnswerFormData({ answer: '' });
    setShowAnswerModal(true);
    setError('');
    setFieldErrors({});
  };

  const closeAnswerModal = () => {
    setShowAnswerModal(false);
    setAnsweringFaq(null);
    setError('');
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setFieldErrors({});

    if (!formData.question) {
      setError('Question is required');
      setFormLoading(false);
      return;
    }

    // Validate character limits
    const errors: Record<string, string> = {};
    const questionError = validateField('question', formData.question);
    if (questionError) {
      errors.question = questionError;
    }

    if (formData.answer) {
      const answerError = validateField('answer', formData.answer);
      if (answerError) {
        errors.answer = answerError;
      }
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
      showToast(editingFaq ? 'FAQ updated successfully' : 'FAQ created successfully', 'success');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      showToast(err.message || 'An error occurred', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answeringFaq) return;

    setFormLoading(true);
    setError('');
    setFieldErrors({});

    if (!answerFormData.answer || answerFormData.answer.trim().length === 0) {
      setError('Answer is required');
      setFormLoading(false);
      return;
    }

    // Validate character limit
    const answerError = validateField('answer', answerFormData.answer);
    if (answerError) {
      setFieldErrors({ answer: answerError });
      setError('Please fix character limit errors before submitting');
      setFormLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/faqs/${answeringFaq.id}/answer`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerFormData.answer }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add answer');
      }

      await fetchFaqs();
      closeAnswerModal();
      showToast('Answer added successfully', 'success');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      showToast(err.message || 'An error occurred', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    openConfirmModal(
      'Confirm Delete',
      'Are you sure you want to delete this FAQ? This will delete it from all languages.',
      async () => {
        try {
          const response = await fetch(`/api/faqs/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete');

          await fetchFaqs();
          showToast('FAQ deleted successfully', 'success');
        } catch (error) {
          console.error('Delete error:', error);
          showToast('Failed to delete FAQ', 'error');
        }
      },
      'Delete',
      'bg-red-600 hover:bg-red-700'
    );
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
    <>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={t('button.cancel')}
        confirmButtonClass={confirmModal.confirmButtonClass}
      />

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

        {/* FAQs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              t={t}
              onEdit={openModal}
              onDelete={handleDelete}
              onAnswer={openAnswerModal}
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
                <p className="text-sm text-gray-600 mt-2">
                  Content will be auto-translated to all 7 languages
                </p>
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
                    placeholder="What is your question?"
                  />
                  {fieldErrors.question && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.question}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faqs.answer')} (optional)
                    <span className={`ml-2 text-xs ${formData.answer.length > CHAR_LIMITS.answer ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                      {formData.answer.length}/{CHAR_LIMITS.answer}
                    </span>
                  </label>
                  <textarea
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
                    placeholder="Leave empty to answer later"
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

        {/* Answer Modal */}
        {showAnswerModal && answeringFaq && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Add Answer</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Answer will be auto-translated to all 7 languages
                </p>
              </div>

              <form onSubmit={handleAnswerSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {answeringFaq.question}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faqs.answer')} *
                    <span className={`ml-2 text-xs ${answerFormData.answer.length > CHAR_LIMITS.answer ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                      {answerFormData.answer.length}/{CHAR_LIMITS.answer}
                    </span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    maxLength={CHAR_LIMITS.answer}
                    value={answerFormData.answer}
                    onChange={(e) => {
                      setAnswerFormData({ answer: e.target.value });
                      const error = validateField('answer', e.target.value);
                      if (error) {
                        setFieldErrors({ answer: error });
                      } else {
                        setFieldErrors({});
                      }
                    }}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                      fieldErrors.answer ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Type your answer here..."
                  />
                  {fieldErrors.answer && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.answer}</p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeAnswerModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    {t('button.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {formLoading ? 'Saving...' : 'Save Answer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
