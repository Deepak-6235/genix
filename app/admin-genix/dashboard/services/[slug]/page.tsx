'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { translateContent } from '@/lib/translate';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';

interface ServiceTranslation {
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
}

interface DetailedServiceTranslation {
  title: string;
  subtitle: string;
  fullDescription: string;
}

interface DetailedService {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  fullDescription: string;
  imageUrl?: string | null;
  translations?: Record<string, DetailedServiceTranslation>;
}

interface Service {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  slug: string;
  fullDescription: string | null;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
  translations?: Record<string, ServiceTranslation>;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, adminLanguage } = useAdminLanguage();
  const { toast, showToast, closeToast } = useToast();
  const { confirmModal, openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>(adminLanguage as LanguageCode);
  const [isEditMode, setIsEditMode] = useState(searchParams.get('edit') === 'true');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Detailed services state
  const [detailedServices, setDetailedServices] = useState<DetailedService[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState<DetailedService | null>(null);
  const [detailImageFile, setDetailImageFile] = useState<File | null>(null);
  const [detailImagePreview, setDetailImagePreview] = useState<string>('');
  const [detailFormData, setDetailFormData] = useState({
    title: '',
    subtitle: '',
    fullDescription: '',
  });
  const [detailErrors, setDetailErrors] = useState<Record<string, string>>({});

  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    shortDescription: '',
    fullDescription: '',
    isActive: true,
  });

  const CHAR_LIMITS = {
    name: 50,
    title: 100,
    subtitle: 100,
    shortDescription: 300,
    fullDescription: 1000,
  };

  const DETAIL_CHAR_LIMITS = {
    title: 100,
    subtitle: 100,
    fullDescription: 2000,
  };

  const fetchDetailedServices = async () => {
    if (!params.slug) return;
    try {
      setLoadingDetails(true);
      const response = await fetch(`/api/services/${encodeURIComponent(params.slug as string)}/detailed?allLangs=true`);
      const data = await response.json();
      if (data.success) {
        setDetailedServices(data.detailedServices || []);
      }
    } catch (error) {
      console.error('Failed to fetch detailed services:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    setViewLanguage(adminLanguage as LanguageCode);
  }, [adminLanguage]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services?allLangs=true`);
        const data = await response.json();

        if (data.success) {
          const foundService = data.services.find((s: Service) => s.slug === params.slug);
          if (foundService) {
            setService(foundService);
            setImagePreview(foundService.imageUrl || '');
            // Initialize form data with English content
            const englishData = foundService.translations?.en || {
              name: foundService.name,
              title: foundService.title,
              subtitle: foundService.subtitle,
              shortDescription: foundService.shortDescription,
              fullDescription: foundService.fullDescription || '',
            };
            setFormData({
              name: englishData.name,
              title: englishData.title,
              subtitle: englishData.subtitle,
              shortDescription: englishData.shortDescription,
              fullDescription: englishData.fullDescription,
              isActive: foundService.isActive,
            });
          } else {
            router.push('/admin-genix/dashboard/services');
          }
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchService();
      fetchDetailedServices();
    }
  }, [params.slug, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return service?.imageUrl || null;

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', imageFile);

      const response = await fetch('/api/upload/service-image', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload image');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
      return null;
    }
  };

  // Detailed Services Functions
  const handleDetailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDetailImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetailImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadDetailImage = async (): Promise<string | null> => {
    if (!detailImageFile) return editingDetail?.imageUrl || null;

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', detailImageFile);

      const response = await fetch('/api/upload/service-image', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload image');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
      return null;
    }
  };

  const openDetailModal = (detail?: DetailedService) => {
    if (detail) {
      setEditingDetail(detail);
      const currentTranslation = detail.translations?.[adminLanguage] || detail.translations?.en;
      setDetailFormData({
        title: currentTranslation?.title || detail.title || '',
        subtitle: currentTranslation?.subtitle || detail.subtitle || '',
        fullDescription: currentTranslation?.fullDescription || detail.fullDescription || '',
      });
      setDetailImagePreview(detail.imageUrl || '');
    } else {
      setEditingDetail(null);
      setDetailFormData({
        title: '',
        subtitle: '',
        fullDescription: '',
      });
      setDetailImagePreview('');
    }
    setDetailImageFile(null);
    setShowDetailModal(true);
    setDetailErrors({});
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setEditingDetail(null);
    setDetailFormData({ title: '', subtitle: '', fullDescription: '' });
    setDetailImageFile(null);
    setDetailImagePreview('');
    setDetailErrors({});
  };

  const validateDetailField = (field: string, value: string): string => {
    const limits = DETAIL_CHAR_LIMITS as Record<string, number>;
    const charLimit = limits[field];

    if (!charLimit) return '';

    if (value.length > charLimit) {
      return `Exceeds limit of ${charLimit} characters. Current: ${value.length}`;
    }
    return '';
  };

  const updateDetailFormData = (field: keyof typeof detailFormData, value: string) => {
    setDetailFormData(prev => ({ ...prev, [field]: value }));

    const fieldError = validateDetailField(field, value);
    setDetailErrors(prev => {
      const updated = { ...prev };
      if (fieldError) {
        updated[field] = fieldError;
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setSaving(true);
    setError('');

    try {
      if (!detailFormData.title || !detailFormData.subtitle || !detailFormData.fullDescription) {
        setError('Title, subtitle, and full description are required');
        setSaving(false);
        return;
      }

      // Validate all fields
      const errors: Record<string, string> = {};
      Object.entries(detailFormData).forEach(([field, value]) => {
        const error = validateDetailField(field, value);
        if (error) {
          errors[field] = error;
        }
      });

      if (Object.keys(errors).length > 0) {
        setDetailErrors(errors);
        setError('Please fix character limit errors before submitting');
        setSaving(false);
        return;
      }

      // Upload image if needed
      let imageUrl = editingDetail?.imageUrl || null;
      if (detailImageFile) {
        const uploadedUrl = await uploadDetailImage();
        if (!uploadedUrl) {
          setSaving(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Prepare translations
      const englishContent: DetailedServiceTranslation = {
        title: detailFormData.title,
        subtitle: detailFormData.subtitle,
        fullDescription: detailFormData.fullDescription,
      };

      setError('Translating content to all languages...');
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja'];
      const translations = await translateContent(englishContent, targetLanguages);

      setError('');

      const url = editingDetail
        ? `/api/services/${encodeURIComponent(service.slug)}/detailed`
        : `/api/services/${encodeURIComponent(service.slug)}/detailed`;

      const method = editingDetail ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          detailId: editingDetail?.id,
          order: editingDetail?.order || detailedServices.length,
          imageUrl,
          translations,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      if (data.success) {
        await fetchDetailedServices();
        closeDetailModal();
        showToast(editingDetail ? 'Section updated successfully' : 'Section created successfully', 'success');
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Detail submit error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDetailDelete = (id: string) => {
    openConfirmModal(
      'Confirm Delete',
      'Are you sure you want to delete this section?',
      async () => {
        try {
          const response = await fetch(`/api/services/${encodeURIComponent(service?.slug || '')}/detailed`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ detailId: id }),
          });

          const data = await response.json();

          if (data.success) {
            await fetchDetailedServices();
            showToast('Section deleted successfully', 'success');
          } else {
            showToast(data.message || 'Failed to delete section', 'error');
          }
        } catch (error) {
          console.error('Delete error:', error);
          showToast('Failed to delete section', 'error');
        }
      },
      'Delete',
      'bg-error-600 hover:bg-error-700'
    );
  };

  const handleSave = async () => {
    if (!service) return;

    setSaving(true);
    setError('');

    try {
      // Upload image if new file selected
      let imageUrl = service.imageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          setSaving(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Translate content to all languages
      const englishContent: ServiceTranslation = {
        name: formData.name,
        title: formData.title,
        subtitle: formData.subtitle,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
      };

      setError(t('message.translating'));
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja'];
      const translations = await translateContent(englishContent, targetLanguages);

      setError('');

      const response = await fetch(`/api/services/${encodeURIComponent(service.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: service.slug,
          isActive: formData.isActive,
          imageUrl,
          translations,
          order: service.order,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update service');
      }

      if (data.success) {
        // Refresh service data
        const refreshResponse = await fetch(`/api/services?allLangs=true`);
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          const updatedService = refreshData.services.find((s: Service) => s.slug === service.slug);
          if (updatedService) {
            setService(updatedService);
            setImagePreview(updatedService.imageUrl || '');
          }
        }
        setIsEditMode(false);
        setImageFile(null);
        showToast('Service updated successfully', 'success');
      } else {
        setError(data.message || 'Failed to update service');
        showToast(data.message || 'Failed to update service', 'error');
      }
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!service) return;
    // Reset form data
    const englishData = service.translations?.en || {
      name: service.name,
      title: service.title,
      subtitle: service.subtitle,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription || '',
    };
    setFormData({
      name: englishData.name,
      title: englishData.title,
      subtitle: englishData.subtitle,
      shortDescription: englishData.shortDescription,
      fullDescription: englishData.fullDescription,
      isActive: service.isActive,
    });
    setImageFile(null);
    setImagePreview(service.imageUrl || '');
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

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('services.serviceNotFound')}</p>
      </div>
    );
  }

  const currentData = service.translations?.[viewLanguage] || {
    name: service.name,
    title: service.title,
    subtitle: service.subtitle,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription || '',
  };

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
            {!isEditMode && service.translations && Object.keys(service.translations).length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">{t('services.viewLanguage')}</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(service.translations).map((lang) => (
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

      {/* Hero Section */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Service Image */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt={currentData.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-purple-100 to-primary-100 flex items-center justify-center">
                  <div className="text-6xl">🔧</div>
                </div>
              )}
            </div>

            {/* Image Upload in Edit Mode */}
            {isEditMode && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('services.changeImage')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-purple-50 file:text-accent-purple-700 hover:file:bg-accent-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG, WebP</p>
              </div>
            )}

            {/* Status Badge */}
            <div className="text-center mb-6">
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
                  service.isActive ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.isActive ? t('status.active') : t('status.inactive')}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Service Name */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('services.serviceName')}
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
                  className="w-full text-2xl font-bold text-gray-900 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Pest Control"
                />
              ) : (
                <p className="text-2xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.name}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('form.title')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.title.length}/{CHAR_LIMITS.title}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  maxLength={CHAR_LIMITS.title}
                  className="w-full text-2xl font-bold text-gray-900 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Pest Control Services in Riyadh"
                />
              ) : (
                <p className="text-2xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.title}
                </p>
              )}
            </div>

            {/* Subtitle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('services.subtitle')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.subtitle.length}/{CHAR_LIMITS.subtitle}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  maxLength={CHAR_LIMITS.subtitle}
                  className="w-full text-xl font-semibold text-gray-800 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Services Provided"
                />
              ) : (
                <p className="text-xl font-semibold text-gray-800" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.subtitle}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('form.shortDescription')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.shortDescription.length}/{CHAR_LIMITS.shortDescription}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  maxLength={CHAR_LIMITS.shortDescription}
                  rows={3}
                  className="w-full text-base text-gray-700 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Brief description shown on services page"
                />
              ) : (
                <p className="text-base text-gray-700 leading-relaxed" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.shortDescription}
                </p>
              )}
            </div>

            {/* Full Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t('form.fullDescription')}
                {isEditMode && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.fullDescription.length}/{CHAR_LIMITS.fullDescription}
                  </span>
                )}
              </h3>
              {isEditMode ? (
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  maxLength={CHAR_LIMITS.fullDescription}
                  rows={6}
                  className="w-full text-base text-gray-700 border-2 border-accent-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple-500"
                  placeholder="Detailed description of the service"
                />
              ) : currentData.fullDescription ? (
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.fullDescription}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">{t('services.noFullDescription')}</p>
              )}
            </div>

            {/* Detailed Services Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Service Sections</h3>
                {!isEditMode && (
                  <button
                    onClick={() => openDetailModal()}
                    className="px-4 py-2 bg-accent-purple-600 text-white rounded-lg hover:bg-accent-purple-700 transition font-medium text-sm"
                  >
                    + Add Section
                  </button>
                )}
              </div>

              {loadingDetails ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple-600"></div>
                </div>
              ) : detailedServices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No sections added yet. Add your first section to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {detailedServices.map((detail) => {
                    const displayData = detail.translations?.[viewLanguage] || detail.translations?.en || detail;
                    return (
                      <div key={detail.id} className="border border-gray-200 rounded-lg p-4 hover:border-accent-purple-300 transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900" dir={LANGUAGES[viewLanguage]?.dir}>
                              {displayData.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1" dir={LANGUAGES[viewLanguage]?.dir}>
                              {displayData.subtitle}
                            </p>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Section {detail.order + 1}
                          </span>
                        </div>

                        {detail.imageUrl && (
                          <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-gray-100">
                            <Image
                              src={detail.imageUrl}
                              alt={displayData.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        <p className="text-sm text-gray-700 line-clamp-2 mb-3" dir={LANGUAGES[viewLanguage]?.dir}>
                          {displayData.fullDescription}
                        </p>

                        {!isEditMode && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => openDetailModal(detail)}
                              className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDetailDelete(detail.id)}
                              className="px-3 py-2 text-sm text-error-600 hover:text-error-700 transition"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
                    href={`/admin-genix/dashboard/services`}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
                  >
                    {t('services.backToServices')}
                  </Link>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="w-full sm:w-auto px-8 py-3 bg-accent-purple-600 text-white rounded-lg hover:bg-accent-purple-700 transition font-medium"
                  >
                    {t('services.editService')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Service Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingDetail ? 'Edit Section' : 'Add New Section'}
              </h3>
              <p className="text-sm text-gray-600 mt-2">Fill in English content and it will auto-translate to all languages</p>
            </div>

            <form onSubmit={handleDetailSubmit} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Section Image (Optional)
                </label>
                <div className="flex items-center gap-4">
                  {detailImagePreview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={detailImagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDetailImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-purple-50 file:text-accent-purple-700 hover:file:bg-accent-purple-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG, WebP</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="bg-primary-50 p-3 rounded-lg mb-4">
                  <p className="text-xs text-primary-700 font-medium">Content will be automatically translated to all 7 languages</p>
                </div>

                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title *
                    <span className={`ml-2 text-xs ${detailFormData.title.length > DETAIL_CHAR_LIMITS.title ? 'text-error-600 font-bold' : 'text-gray-500'}`}>
                      {detailFormData.title.length}/{DETAIL_CHAR_LIMITS.title}
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={DETAIL_CHAR_LIMITS.title}
                    value={detailFormData.title}
                    onChange={(e) => updateDetailFormData('title', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-purple-500 outline-none text-gray-900 ${
                      detailErrors.title ? 'border-error-500 bg-error-50' : 'border-gray-300'
                    }`}
                    placeholder="Section title"
                  />
                  {detailErrors.title && (
                    <p className="mt-1 text-xs text-error-600 font-medium">{detailErrors.title}</p>
                  )}
                </div>

                {/* Subtitle Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Subtitle *
                    <span className={`ml-2 text-xs ${detailFormData.subtitle.length > DETAIL_CHAR_LIMITS.subtitle ? 'text-error-600 font-bold' : 'text-gray-500'}`}>
                      {detailFormData.subtitle.length}/{DETAIL_CHAR_LIMITS.subtitle}
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={DETAIL_CHAR_LIMITS.subtitle}
                    value={detailFormData.subtitle}
                    onChange={(e) => updateDetailFormData('subtitle', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-purple-500 outline-none text-gray-900 ${
                      detailErrors.subtitle ? 'border-error-500 bg-error-50' : 'border-gray-300'
                    }`}
                    placeholder="Section subtitle"
                  />
                  {detailErrors.subtitle && (
                    <p className="mt-1 text-xs text-error-600 font-medium">{detailErrors.subtitle}</p>
                  )}
                </div>

                {/* Full Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Description *
                    <span className={`ml-2 text-xs ${detailFormData.fullDescription.length > DETAIL_CHAR_LIMITS.fullDescription ? 'text-error-600 font-bold' : 'text-gray-500'}`}>
                      {detailFormData.fullDescription.length}/{DETAIL_CHAR_LIMITS.fullDescription}
                    </span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    maxLength={DETAIL_CHAR_LIMITS.fullDescription}
                    value={detailFormData.fullDescription}
                    onChange={(e) => updateDetailFormData('fullDescription', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent-purple-500 outline-none text-gray-900 ${
                      detailErrors.fullDescription ? 'border-error-500 bg-error-50' : 'border-gray-300'
                    }`}
                    placeholder="Detailed description for this section"
                  />
                  {detailErrors.fullDescription && (
                    <p className="mt-1 text-xs text-error-600 font-medium">{detailErrors.fullDescription}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-accent-purple-600 text-white rounded-lg hover:bg-accent-purple-700 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingDetail ? 'Update' : 'Create'}
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
