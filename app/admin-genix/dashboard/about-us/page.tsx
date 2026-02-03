'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';

interface AboutUsData {
  id: string;
  email: string;
  phoneNumber1: string;
  phoneNumber2: string;
  workingHours: string;
  address: string;
  city: string;
}

export default function AboutUsPage() {
  const { t } = useAdminLanguage();
  const { toast, showToast, closeToast } = useToast();
  const { confirmModal, openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutUsData>>({});
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

  // Fetch about us data
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/about-us');
      const data = await response.json();
      if (data.success) {
        setAboutUs(data.aboutUs);
        setFormData(data.aboutUs);
      }
    } catch (error) {
      console.error('Failed to fetch about us:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const validateEmail = (email: string): string => {
    if (!email) return '';

    // Standard email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return t('validation.invalidEmail');
    }
    return '';
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmailError('');
    setError('');
    // Reset form data to original
    if (aboutUs) {
      setFormData(aboutUs);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate email in real-time
    if (field === 'email') {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      // Validate email if provided
      if (formData.email) {
        const emailValidationError = validateEmail(formData.email);
        if (emailValidationError) {
          setEmailError(emailValidationError);
          setError(t('message.error'));
          setSaving(false);
          return;
        }
      }

      const response = await fetch('/api/about-us', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchAboutUs();
        setIsEditing(false);
        setEmailError('');
        setError('');
        showToast('About Us information saved successfully', 'success');
      } else {
        setError(data.message || 'Failed to save');
        showToast(data.message || 'Failed to save', 'error');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      setError('Failed to save');
      showToast('Failed to save', 'error');
    } finally {
      setSaving(false);
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

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{t('aboutUs.title')}</h1>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {t('button.edit')}
            </button>
          )}
        </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        {!isEditing ? (
          // Display Mode
          <div className="space-y-6">
            {/* Email */}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">📧 {t('aboutUs.email')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.email || '-'}</p>
            </div>

            {/* Phone Number 1 */}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">📱 {t('aboutUs.phoneNumber1')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.phoneNumber1 || '-'}</p>
            </div>

            {/* Phone Number 2 */}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">📱 {t('aboutUs.phoneNumber2')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.phoneNumber2 || '-'}</p>
            </div>

            {/* Working Hours */}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">⏰ {t('aboutUs.workingHours')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.workingHours || '-'}</p>
            </div>

            {/* Address */}
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">📍 {t('aboutUs.address')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.address || '-'}</p>
            </div>

            {/* City */}
            <div>
              <p className="text-sm text-gray-600 mb-1">🏙️ {t('aboutUs.city')}</p>
              <p className="text-lg font-medium text-gray-900">{formData.city || '-'}</p>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📧 {t('aboutUs.email')}</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={t('placeholder.enterEmail')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-600 font-medium">{emailError}</p>
              )}
            </div>

            {/* Phone Number 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📱 {t('aboutUs.phoneNumber1')}</label>
              <input
                type="tel"
                value={formData.phoneNumber1 || ''}
                onChange={(e) => handleChange('phoneNumber1', e.target.value)}
                placeholder={t('placeholder.enterPhone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Phone Number 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📱 {t('aboutUs.phoneNumber2')}</label>
              <input
                type="tel"
                value={formData.phoneNumber2 || ''}
                onChange={(e) => handleChange('phoneNumber2', e.target.value)}
                placeholder={t('placeholder.enterPhone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">⏰ {t('aboutUs.workingHours')}</label>
              <input
                type="text"
                value={formData.workingHours || ''}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                placeholder={t('placeholder.enterDescription')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📍 {t('aboutUs.address')}</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder={t('placeholder.enterDescription')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🏙️ {t('aboutUs.city')}</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder={t('placeholder.enterDescription')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? t('modal.saving') : t('button.save')}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                {t('button.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
