'use client';

import { useState, useEffect } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

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
  const { t } = useAdminLanguage();
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
        <h2 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h2>
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



      {/* Account Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('settings.accountInfo')}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium text-gray-600">{t('settings.role')}</span>
            <span className="text-sm text-gray-900 font-semibold">{t('settings.admin')}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium text-gray-600">{t('settings.status')}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {t('status.active')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
