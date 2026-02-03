'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { translateContent } from '@/lib/translate';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceTranslation {
  name: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
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
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>(adminLanguage as LanguageCode);
  const [isEditMode, setIsEditMode] = useState(searchParams.get('edit') === 'true');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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

      setError('Translating content to all languages...');
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
      } else {
        setError(data.message || 'Failed to update service');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Service not found</p>
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
                <span className="text-sm text-gray-600 hidden sm:inline">{t('services.viewLanguage')}:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(service.translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setViewLanguage(lang as LanguageCode)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        viewLanguage === lang
                          ? 'bg-purple-600 text-white'
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
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                Editing in English - Will auto-translate to all languages
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
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
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <div className="text-6xl">🔧</div>
                </div>
              )}
            </div>

            {/* Image Upload in Edit Mode */}
            {isEditMode && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Service Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
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
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              ) : (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
                Service Name
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
                  className="w-full text-2xl font-bold text-gray-900 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
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
                Title
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
                  className="w-full text-2xl font-bold text-gray-900 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
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
                Subtitle
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
                  className="w-full text-xl font-semibold text-gray-800 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
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
                Short Description
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
                  className="w-full text-base text-gray-700 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
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
                Full Description
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
                  className="w-full text-base text-gray-700 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  placeholder="Detailed description of the service"
                />
              ) : currentData.fullDescription ? (
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap" dir={LANGUAGES[viewLanguage]?.dir}>
                  {currentData.fullDescription}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">No full description provided</p>
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
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/admin-genix/dashboard/services`}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
                  >
                    {t('button.back') || 'Back to Services'}
                  </Link>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                  >
                    {t('button.edit') || 'Edit Service'}
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
