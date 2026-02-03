'use client';

import { useState, useEffect } from 'react';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import { translateContent } from '@/lib/translate';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

interface ServiceTranslation {
  title: string;
  shortDescription: string;
  fullDescription: string;
  servicesProvided: string;
  targetInsects: string;
  methodsTitle: string;
  methodsDescription: string;
  advancedTechnologies: string;
  safeUseDescription: string;
  serviceGuarantee: string;
}

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  fullDescription: string | null;
  servicesProvided: string | null;
  targetInsects: string | null;
  methodsTitle: string | null;
  methodsDescription: string | null;
  advancedTechnologies: string | null;
  safeUseDescription: string | null;
  serviceGuarantee: string | null;
  isActive: boolean;
  order: number;
  translations?: Record<string, ServiceTranslation>;
}

function ServiceItem({ service, onEdit, onDelete, onView, t, currentLang }: {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onView: (service: Service) => void;
  t: (key: string) => string;
  currentLang: LanguageCode;
}) {
  // Get the title and description in the current language, fallback to English
  const displayTitle = service.translations?.[currentLang]?.title || service.title;
  const displayDescription = service.translations?.[currentLang]?.shortDescription || service.shortDescription;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900" dir={LANGUAGES[currentLang]?.dir}>{displayTitle}</h3>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {service.isActive ? t('status.active') : t('status.inactive')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3" dir={LANGUAGES[currentLang]?.dir}>{displayDescription}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(service)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              {t('button.view')}
            </button>
            <button
              onClick={() => onEdit(service)}
              className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              {t('button.edit')}
            </button>
            <button
              onClick={() => onDelete(service.slug)}
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

export default function ServicesPage() {
  const { t, adminLanguage } = useAdminLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>('en');
  const [formData, setFormData] = useState({
    slug: '',
    isActive: true,
    title: '',
    shortDescription: '',
    fullDescription: '',
    servicesProvided: '',
    targetInsects: '',
    methodsTitle: '',
    methodsDescription: '',
    advancedTechnologies: '',
    safeUseDescription: '',
    serviceGuarantee: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Character limits for each field
  const CHAR_LIMITS = {
    title: 52,
    shortDescription: 140,
    fullDescription: 745,
    servicesProvided: 644,
    targetInsects: 60,
    methodsTitle: 43,
    methodsDescription: 314,
    advancedTechnologies: 223,
    safeUseDescription: 314,
    serviceGuarantee: 192,
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Fetch services with all translations but trigger on language change
      console.log(`Fetching services for language: ${adminLanguage}`);
      const response = await fetch(`/api/services?allLangs=true&lang=${adminLanguage}`);
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [adminLanguage]);

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      const englishTranslation = service.translations?.en;
      setFormData({
        slug: service.slug,
        isActive: service.isActive,
        title: englishTranslation?.title || '',
        shortDescription: englishTranslation?.shortDescription || '',
        fullDescription: englishTranslation?.fullDescription || '',
        servicesProvided: englishTranslation?.servicesProvided || '',
        targetInsects: englishTranslation?.targetInsects || '',
        methodsTitle: englishTranslation?.methodsTitle || '',
        methodsDescription: englishTranslation?.methodsDescription || '',
        advancedTechnologies: englishTranslation?.advancedTechnologies || '',
        safeUseDescription: englishTranslation?.safeUseDescription || '',
        serviceGuarantee: englishTranslation?.serviceGuarantee || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        slug: '',
        isActive: true,
        title: '',
        shortDescription: '',
        fullDescription: '',
        servicesProvided: '',
        targetInsects: '',
        methodsTitle: '',
        methodsDescription: '',
        advancedTechnologies: '',
        safeUseDescription: '',
        serviceGuarantee: '',
      });
    }
    setActiveTab('basic');
    setShowModal(true);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setActiveTab('basic');
    setError('');
    setFieldErrors({});
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
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

  const updateFormData = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title (always)
      if (field === 'title' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      return updated;
    });

    // Validate field if it's a string
    if (typeof value === 'string') {
      const fieldError = validateField(field, value);
      setFieldErrors(prev => {
        const updated = { ...prev };
        if (fieldError) {
          updated[field] = fieldError;
        } else {
          delete updated[field];
        }
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    // Validate English fields (required)
    if (!formData.title || !formData.shortDescription) {
      setError('Title and short description are required');
      setFormLoading(false);
      return;
    }

    // Validate character limits for all fields
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([field, value]) => {
      if (typeof value === 'string') {
        const error = validateField(field, value);
        if (error) {
          errors[field] = error;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix character limit errors before submitting');
      setFormLoading(false);
      return;
    }

    try {
      // Create English content object
      const englishContent: ServiceTranslation = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        servicesProvided: formData.servicesProvided,
        targetInsects: formData.targetInsects,
        methodsTitle: formData.methodsTitle,
        methodsDescription: formData.methodsDescription,
        advancedTechnologies: formData.advancedTechnologies,
        safeUseDescription: formData.safeUseDescription,
        serviceGuarantee: formData.serviceGuarantee,
      };

      // Auto-translate to all 5 languages
      setError('Translating content to all languages...');
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja'];
      const translations = await translateContent(englishContent, targetLanguages);

      // Clear the translating message
      setError('');

      const url = editingService ? `/api/services/${encodeURIComponent(editingService.slug)}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: formData.slug,
          isActive: formData.isActive,
          translations,
          order: editingService ? editingService.order : services.length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      if (data.success) {
        await fetchServices();
        closeModal();
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        await fetchServices();
      } else {
        alert(data.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t('services.title')}</h2>
          <p className="mt-2 text-gray-600">{t('services.subtitle')}</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          + {t('services.addService')}
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            t={t}
            currentLang={adminLanguage as LanguageCode}
            onView={(service) => {
              setViewingService(service);
              setViewLanguage(adminLanguage as LanguageCode);
              setShowViewModal(true);
            }}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">{t('services.noServices')}</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingService ? t('modal.editService') : t('modal.addService')}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{t('services.fillEnglishContent')}</p>
            </div>

            {/* Main Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4 px-6">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'basic'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('services.basicInfo')}
                </button>
                <button
                  onClick={() => setActiveTab('detailed')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'detailed'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('services.detailedContent')}
                </button>
                <button
                  onClick={() => setActiveTab('methods')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'methods'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('services.methodsGuarantee')}
                </button>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => updateFormData('isActive', e.target.checked)}
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t('form.isActive')}</span>
                    </label>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-xs text-blue-700 font-medium">{t('services.autoTranslateNote')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('form.title')} *
                        <span className={`ml-2 text-xs ${formData.title.length > CHAR_LIMITS.title ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          {formData.title.length}/{CHAR_LIMITS.title}
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={CHAR_LIMITS.title}
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                          fieldErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Pest Control"
                      />
                      {fieldErrors.title && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('form.shortDescription')} *
                        <span className={`ml-2 text-xs ${formData.shortDescription.length > CHAR_LIMITS.shortDescription ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          {formData.shortDescription.length}/{CHAR_LIMITS.shortDescription}
                        </span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        maxLength={CHAR_LIMITS.shortDescription}
                        value={formData.shortDescription}
                        onChange={(e) => updateFormData('shortDescription', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                          fieldErrors.shortDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Brief description shown on services page"
                      />
                      {fieldErrors.shortDescription && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.shortDescription}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Content Tab */}
              {activeTab === 'detailed' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-blue-700 font-medium">{t('services.autoTranslateNote')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.fullDescription')}
                      <span className={`ml-2 text-xs ${formData.fullDescription.length > CHAR_LIMITS.fullDescription ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.fullDescription.length}/{CHAR_LIMITS.fullDescription}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.fullDescription}
                      value={formData.fullDescription}
                      onChange={(e) => updateFormData('fullDescription', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.fullDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Detailed introduction paragraph"
                    />
                    {fieldErrors.fullDescription && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.fullDescription}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.servicesProvided')}
                      <span className={`ml-2 text-xs ${formData.servicesProvided.length > CHAR_LIMITS.servicesProvided ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.servicesProvided.length}/{CHAR_LIMITS.servicesProvided}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.servicesProvided}
                      value={formData.servicesProvided}
                      onChange={(e) => updateFormData('servicesProvided', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.servicesProvided ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="List of services provided"
                    />
                    {fieldErrors.servicesProvided && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.servicesProvided}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.targetInsects')}
                      <span className={`ml-2 text-xs ${formData.targetInsects.length > CHAR_LIMITS.targetInsects ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.targetInsects.length}/{CHAR_LIMITS.targetInsects}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.targetInsects}
                      value={formData.targetInsects}
                      onChange={(e) => updateFormData('targetInsects', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.targetInsects ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Types of insects targeted (Cockroaches, Rats, etc.)"
                    />
                    {fieldErrors.targetInsects && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.targetInsects}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Methods & Guarantee Tab */}
              {activeTab === 'methods' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-blue-700 font-medium">{t('services.autoTranslateNote')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.methodsTitle')}
                      <span className={`ml-2 text-xs ${formData.methodsTitle.length > CHAR_LIMITS.methodsTitle ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.methodsTitle.length}/{CHAR_LIMITS.methodsTitle}
                      </span>
                    </label>
                    <input
                      type="text"
                      maxLength={CHAR_LIMITS.methodsTitle}
                      value={formData.methodsTitle}
                      onChange={(e) => updateFormData('methodsTitle', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.methodsTitle ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Methods of insect extermination"
                    />
                    {fieldErrors.methodsTitle && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.methodsTitle}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.methodsDescription')}
                      <span className={`ml-2 text-xs ${formData.methodsDescription.length > CHAR_LIMITS.methodsDescription ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.methodsDescription.length}/{CHAR_LIMITS.methodsDescription}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.methodsDescription}
                      value={formData.methodsDescription}
                      onChange={(e) => updateFormData('methodsDescription', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.methodsDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Description of methods used"
                    />
                    {fieldErrors.methodsDescription && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.methodsDescription}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.advancedTechnologies')}
                      <span className={`ml-2 text-xs ${formData.advancedTechnologies.length > CHAR_LIMITS.advancedTechnologies ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.advancedTechnologies.length}/{CHAR_LIMITS.advancedTechnologies}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.advancedTechnologies}
                      value={formData.advancedTechnologies}
                      onChange={(e) => updateFormData('advancedTechnologies', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.advancedTechnologies ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Technologies used (Thermal, Biological, Bio-radiation)"
                    />
                    {fieldErrors.advancedTechnologies && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.advancedTechnologies}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.safeUseDescription')}
                      <span className={`ml-2 text-xs ${formData.safeUseDescription.length > CHAR_LIMITS.safeUseDescription ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.safeUseDescription.length}/{CHAR_LIMITS.safeUseDescription}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.safeUseDescription}
                      value={formData.safeUseDescription}
                      onChange={(e) => updateFormData('safeUseDescription', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.safeUseDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Safety measures and environmental considerations"
                    />
                    {fieldErrors.safeUseDescription && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.safeUseDescription}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('services.serviceGuarantee')}
                      <span className={`ml-2 text-xs ${formData.serviceGuarantee.length > CHAR_LIMITS.serviceGuarantee ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        {formData.serviceGuarantee.length}/{CHAR_LIMITS.serviceGuarantee}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={CHAR_LIMITS.serviceGuarantee}
                      value={formData.serviceGuarantee}
                      onChange={(e) => updateFormData('serviceGuarantee', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 ${
                        fieldErrors.serviceGuarantee ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Guarantee details (Effectiveness, Refund policy, etc.)"
                    />
                    {fieldErrors.serviceGuarantee && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.serviceGuarantee}</p>
                    )}
                  </div>
                </div>
              )}

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
                  {formLoading ? t('modal.saving') : editingService ? t('button.update') : t('button.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && viewingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{t('services.serviceDetails')}</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Language Selector for View */}
              {viewingService.translations && Object.keys(viewingService.translations).length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('services.viewLanguage')}: <span className="text-purple-600">{LANGUAGES[viewLanguage].nativeName}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(viewingService.translations).map((lang) => (
                      <button
                        key={lang}
                        type="button"
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
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900" dir={LANGUAGES[viewLanguage].dir}>
                        {viewingService.translations?.[viewLanguage]?.title || viewingService.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          viewingService.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {viewingService.isActive ? t('status.active') : t('status.inactive')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Slug:</span> {viewingService.slug}
                    </p>
                    <p className="text-gray-700" dir={LANGUAGES[viewLanguage].dir}>
                      {viewingService.translations?.[viewLanguage]?.shortDescription || viewingService.shortDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              {(viewingService.translations?.[viewLanguage]?.fullDescription || viewingService.fullDescription) && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Full Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.fullDescription || viewingService.fullDescription}
                  </p>
                </div>
              )}

              {/* Services Provided */}
              {(viewingService.translations?.[viewLanguage]?.servicesProvided || viewingService.servicesProvided) && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Services Provided</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.servicesProvided || viewingService.servicesProvided}
                  </p>
                </div>
              )}

              {/* Target Insects */}
              {(viewingService.translations?.[viewLanguage]?.targetInsects || viewingService.targetInsects) && (
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Target Insects/Pests</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.targetInsects || viewingService.targetInsects}
                  </p>
                </div>
              )}

              {/* Methods Section */}
              {(viewingService.translations?.[viewLanguage]?.methodsTitle || viewingService.methodsTitle ||
                viewingService.translations?.[viewLanguage]?.methodsDescription || viewingService.methodsDescription) && (
                <div className="border rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.methodsTitle || viewingService.methodsTitle || 'Methods & Approach'}
                  </h4>
                  {(viewingService.translations?.[viewLanguage]?.methodsDescription || viewingService.methodsDescription) && (
                    <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                      {viewingService.translations?.[viewLanguage]?.methodsDescription || viewingService.methodsDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Advanced Technologies */}
              {(viewingService.translations?.[viewLanguage]?.advancedTechnologies || viewingService.advancedTechnologies) && (
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Advanced Technologies</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.advancedTechnologies || viewingService.advancedTechnologies}
                  </p>
                </div>
              )}

              {/* Safe Use Description */}
              {(viewingService.translations?.[viewLanguage]?.safeUseDescription || viewingService.safeUseDescription) && (
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Safe Use & Environmental Impact</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.safeUseDescription || viewingService.safeUseDescription}
                  </p>
                </div>
              )}

              {/* Service Guarantee */}
              {(viewingService.translations?.[viewLanguage]?.serviceGuarantee || viewingService.serviceGuarantee) && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Service Guarantee</h4>
                  <p className="text-gray-700 whitespace-pre-wrap" dir={LANGUAGES[viewLanguage].dir}>
                    {viewingService.translations?.[viewLanguage]?.serviceGuarantee || viewingService.serviceGuarantee}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openModal(viewingService);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {t('button.edit')}
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {t('button.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
