'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LANGUAGES, LANGUAGE_CODES, type LanguageCode } from '@/lib/languages';
import { translateContent } from '@/lib/translate';

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
  icon: string | null;
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

function SortableServiceItem({ service, onEdit, onDelete, onView }: {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onView: (service: Service) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
    >
      <div className="flex items-start gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mt-1 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              {service.icon && <div className="text-3xl mb-2">{service.icon}</div>}
              <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {service.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.shortDescription}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(service)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              View Details
            </button>
            <button
              onClick={() => onEdit(service)}
              className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(service.id)}
              className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [viewLanguage, setViewLanguage] = useState<LanguageCode>('en');
  const [formData, setFormData] = useState({
    icon: '',
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?allLangs=true');
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
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = services.findIndex((s) => s.id === active.id);
      const newIndex = services.findIndex((s) => s.id === over.id);

      const newServices = arrayMove(services, oldIndex, newIndex);
      setServices(newServices);

      // Update order in database
      try {
        const updatedServices = newServices.map((service, index) => ({
          id: service.id,
          order: index,
        }));

        await fetch('/api/services/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ services: updatedServices }),
        });
      } catch (error) {
        console.error('Failed to update order:', error);
        fetchServices(); // Revert on error
      }
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      const englishTranslation = service.translations?.en;
      setFormData({
        icon: service.icon || '',
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
        icon: '',
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
  };

  const updateFormData = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          icon: formData.icon,
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
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
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
          <h2 className="text-3xl font-bold text-gray-900">Services</h2>
          <p className="mt-2 text-gray-600">Drag to reorder services</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          + Add Service
        </button>
      </div>

      {/* Draggable Services List */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {services.map((service) => (
              <SortableServiceItem
                key={service.id}
                service={service}
                onView={(service) => {
                  setViewingService(service);
                  setViewLanguage('en');
                  setShowViewModal(true);
                }}
                onEdit={openModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No services found. Add your first service!</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <p className="text-sm text-gray-600 mt-2">Fill in English content only. Auto-translation to all 5 languages on save.</p>
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
                  Basic Info
                </button>
                <button
                  onClick={() => setActiveTab('detailed')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'detailed'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Detailed Content
                </button>
                <button
                  onClick={() => setActiveTab('methods')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'methods'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Methods & Guarantee
                </button>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => updateFormData('slug', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                        placeholder="pest-control"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => updateFormData('icon', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                        placeholder="🔧"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => updateFormData('isActive', e.target.checked)}
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active (Show on website)</span>
                    </label>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-xs text-blue-700 font-medium">All fields below are in English. They will be automatically translated to Arabic, Portuguese, Chinese, and Japanese when you save.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                        placeholder="Pest Control"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description (English) *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.shortDescription}
                        onChange={(e) => updateFormData('shortDescription', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                        placeholder="Brief description shown on services page"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Content Tab */}
              {activeTab === 'detailed' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-blue-700 font-medium">All fields below are in English. They will be automatically translated to Arabic, Portuguese, Chinese, and Japanese when you save.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Description (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription}
                      onChange={(e) => updateFormData('fullDescription', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Detailed introduction paragraph"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Services Provided (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.servicesProvided}
                      onChange={(e) => updateFormData('servicesProvided', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="List of services provided"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Insects (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.targetInsects}
                      onChange={(e) => updateFormData('targetInsects', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Types of insects targeted (Cockroaches, Rats, etc.)"
                    />
                  </div>
                </div>
              )}

              {/* Methods & Guarantee Tab */}
              {activeTab === 'methods' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-blue-700 font-medium">All fields below are in English. They will be automatically translated to Arabic, Portuguese, Chinese, and Japanese when you save.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Methods Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.methodsTitle}
                      onChange={(e) => updateFormData('methodsTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Methods of insect extermination"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Methods Description (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.methodsDescription}
                      onChange={(e) => updateFormData('methodsDescription', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Description of methods used"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Advanced Technologies (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.advancedTechnologies}
                      onChange={(e) => updateFormData('advancedTechnologies', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Technologies used (Thermal, Biological, Bio-radiation)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Safe Use Description (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.safeUseDescription}
                      onChange={(e) => updateFormData('safeUseDescription', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Safety measures and environmental considerations"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Guarantee (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.serviceGuarantee}
                      onChange={(e) => updateFormData('serviceGuarantee', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                      placeholder="Guarantee details (Effectiveness, Refund policy, etc.)"
                    />
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
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
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
                <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
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
                    View Language: <span className="text-purple-600">{LANGUAGES[viewLanguage].nativeName}</span>
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
                  {viewingService.icon && (
                    <div className="text-5xl">{viewingService.icon}</div>
                  )}
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
                        {viewingService.isActive ? 'Active' : 'Inactive'}
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
                  Edit Service
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
