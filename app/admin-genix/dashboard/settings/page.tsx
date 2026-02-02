'use client';

import { useState, useEffect } from 'react';

interface Language {
  id: string;
  code: string;
  name: string;
}

interface FAQ {
  id: string;
  languageId: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
  language?: Language;
}

export default function SettingsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    languageId: '',
    question: '',
    answer: '',
    isActive: true,
    order: 0,
  });
  
  // Accordion state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
    fetchLanguages();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/admin/faqs');
      const data = await response.json();
      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/admin/languages');
      const data = await response.json();
      if (data.success) {
        setLanguages(data.languages);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.languageId || !formData.question || !formData.answer) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingFaq 
        ? `/api/admin/faqs/${editingFaq.id}` 
        : '/api/admin/faqs';
      
      const method = editingFaq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingFaq ? 'FAQ updated successfully' : 'FAQ created successfully');
        fetchFaqs();
        resetForm();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      languageId: faq.languageId,
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
      order: faq.order,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('FAQ deleted successfully');
        fetchFaqs();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setError('An unexpected error occurred');
    }
  };

  const resetForm = () => {
    setFormData({
      languageId: '',
      question: '',
      answer: '',
      isActive: true,
      order: 0,
    });
    setEditingFaq(null);
    setIsFormOpen(false);
  };

  const toggleAccordion = (faqId: string) => {
    setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* FAQ Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {isFormOpen ? 'Cancel' : '+ Add FAQ'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {isFormOpen && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <h4 className="font-semibold text-gray-900">
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language *
              </label>
              <select
                value={formData.languageId}
                onChange={(e) => setFormData({ ...formData, languageId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                required
              >
                <option value="">Select a language</option>
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question *
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                rows={2}
                required
                placeholder="Enter the question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                rows={4}
                required
                placeholder="Enter the answer"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                  min="0"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {editingFaq ? 'Update FAQ' : 'Create FAQ'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* FAQ List */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* FAQ Header */}
                <div
                  className="flex items-center justify-between p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 text-base">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-blue-600 mt-1">
                      {faq.language?.name || 'Unknown Language'}
                      {!faq.isActive && ' • Inactive'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(faq);
                      }}
                      className="px-3 py-1 text-sm bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(faq.id);
                      }}
                      className="px-3 py-1 text-sm bg-white text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                    <svg
                      className={`w-5 h-5 text-blue-900 transition-transform ${
                        expandedFaqId === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* FAQ Answer (Expandable) */}
                {expandedFaqId === faq.id && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium text-gray-600">Role</span>
            <span className="text-sm text-gray-900 font-semibold">Admin</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
