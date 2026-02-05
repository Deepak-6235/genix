'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';

interface ContactSubmission {
  id: string;
  contactId: string;
  name: string;
  email: string;
  phone: string | null;
  serviceSlug: string;
  serviceName?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  language: {
    code: string;
    name: string;
  };
}

function SubmissionCard({
  submission,
  onMarkAsRead,
  currentLang,
  t
}: {
  submission: ContactSubmission;
  onMarkAsRead: (id: string) => void;
  currentLang: LanguageCode;
  t: (key: string) => string;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-lg transition ${
      submission.isRead ? 'border-gray-200' : 'border-primary-400 bg-primary-50'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{submission.name}</h3>
            <p className="text-sm text-gray-500">{formatDate(submission.createdAt)}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          submission.isRead ? 'bg-gray-100 text-gray-800' : 'bg-primary-100 text-primary-800'
        }`}>
          {submission.isRead ? t('status.read') || 'Read' : t('status.unread') || 'Unread'}
        </span>
      </div>

      {/* Contact Details */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href={`mailto:${submission.email}`} className="text-primary-600 hover:text-primary-700">
            {submission.email}
          </a>
        </div>
        {submission.phone && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${submission.phone}`} className="text-primary-600 hover:text-primary-700">
              {submission.phone}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-600">Service: <span className="font-medium">{submission.serviceName || submission.serviceSlug}</span></span>
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('message') || 'Message'}:</h4>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line" dir={LANGUAGES[currentLang]?.dir}>
          {submission.message}
        </p>
      </div>

      {/* Actions */}
      {!submission.isRead && (
        <div className="flex justify-end">
          <button
            onClick={() => onMarkAsRead(submission.id)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
          >
            {t('markAsRead') || 'Mark as Read'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ContactSubmissionsPage() {
  const { t, adminLanguage, dir } = useAdminLanguage();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const { toast, showToast, closeToast } = useToast();

  const fetchSubmissions = async () => {
    if (!adminLanguage) return; // Wait for language to be set

    try {
      setLoading(true);
      const response = await fetch(`/api/contact-form-submissions?lang=${adminLanguage}`);
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.submissions);
      } else {
        showToast(data.message || 'Failed to load contact submissions', 'error');
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
      showToast('Failed to load contact submissions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [adminLanguage]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact-form-submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Marked as read', 'success');
        fetchSubmissions();
      } else {
        showToast(data.message || 'Failed to update', 'error');
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
      showToast('Failed to update submission', 'error');
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'unread') return !sub.isRead;
    if (filter === 'read') return sub.isRead;
    return true;
  });

  const unreadCount = submissions.filter(sub => !sub.isRead).length;

  return (
    <div className="p-6" dir={dir}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('contactSubmissions.title') || 'Contact Form Submissions'}
        </h1>
        <p className="text-gray-600">
          {t('contactSubmissions.subtitle') || 'Manage and respond to contact form submissions'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('filter.all') || 'All'} ({submissions.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'unread'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('filter.unread') || 'Unread'} ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === 'read'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('filter.read') || 'Read'} ({submissions.length - unreadCount})
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('noSubmissions') || 'No contact submissions'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'unread'
              ? (t('noUnreadSubmissions') || 'No unread submissions')
              : filter === 'read'
              ? (t('noReadSubmissions') || 'No read submissions')
              : (t('noSubmissionsYet') || 'No submissions yet')
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onMarkAsRead={handleMarkAsRead}
              currentLang={adminLanguage}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}
