'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

interface DetailedSection {
  title: string;
  description: string;
  order: number;
  imageFile?: File | null;
  imagePreview?: string | null;
}

export default function NewBlogPage() {
  const router = useRouter();
  const { t } = useAdminLanguage();
  const [currentTab, setCurrentTab] = useState<'main' | 'details'>('main');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Main blog data
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    author: '',
    isActive: true,
    publishedAt: new Date().toISOString().split('T')[0],
  });

  // Detailed sections data
  const [detailedSections, setDetailedSections] = useState<DetailedSection[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDetailedSection = () => {
    setDetailedSections([
      ...detailedSections,
      { title: '', description: '', order: detailedSections.length, imageFile: null, imagePreview: null },
    ]);
  };

  const updateDetailedSection = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...detailedSections];
    updated[index][field] = value;
    setDetailedSections(updated);
  };

  const handleSectionImageChange = (index: number, file: File) => {
    const updated = [...detailedSections];
    updated[index].imageFile = file;

    const reader = new FileReader();
    reader.onloadend = () => {
      updated[index].imagePreview = reader.result as string;
      setDetailedSections([...updated]);
    };
    reader.readAsDataURL(file);
  };

  const removeDetailedSection = (index: number) => {
    const updated = detailedSections.filter((_, i) => i !== index);
    // Reorder
    updated.forEach((section, i) => {
      section.order = i;
    });
    setDetailedSections(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');

    // Validation
    if (!formData.name || !formData.shortDescription || !formData.author) {
      setError(t('message.required'));
      setSaving(false);
      setCurrentTab('main');
      return;
    }

    if (!selectedFile) {
      setError(t('message.imageRequired'));
      setSaving(false);
      setCurrentTab('main');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('shortDescription', formData.shortDescription);
      data.append('author', formData.author);
      data.append('isActive', formData.isActive.toString());
      data.append('publishedAt', formData.publishedAt);
      data.append('image', selectedFile);

      // Add detailed sections if any
      if (detailedSections.length > 0) {
        // Prepare sections data without image files
        const sectionsData = detailedSections.map(({ title, description, order }) => ({
          title,
          description,
          order,
        }));
        data.append('detailedSections', JSON.stringify(sectionsData));

        // Add section images separately
        detailedSections.forEach((section, index) => {
          if (section.imageFile) {
            data.append(`sectionImage_${index}`, section.imageFile);
          }
        });
      }

      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create blog');
      }

      router.push('/admin-genix/dashboard/blogs');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                {t('button.back')}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{t('blogs.addNewBlog')}</h1>
            </div>

            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
              {t('reviews.creatingInEnglish')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-[73px] z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentTab('main')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                currentTab === 'main'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('blogs.mainBlogInfo')}
            </button>
            <button
              onClick={() => setCurrentTab('details')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                currentTab === 'details'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('blogs.detailedSections')} ({detailedSections.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Main Tab */}
            {currentTab === 'main' && (
              <>
                {/* Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('form.status')}</h3>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">{t('status.active')}</span>
                  </label>
                </div>

                {/* Blog Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    {t('blogs.blogImageRequired')}
                  </h3>
                  <div className="flex gap-4 items-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 rounded-lg object-cover border-2 border-purple-300"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 1200x630px, max 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Blog Name */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {t('blogs.blogNameTitle')} *
                    <span className="ml-2 text-xs text-gray-400">{formData.name.length}/200</span>
                  </h3>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={200}
                    className="w-full text-xl font-bold text-gray-900 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Best house cleaning companies in Riyadh"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {t('blogs.shortDescriptionExcerpt')} *
                    <span className="ml-2 text-xs text-gray-400">{formData.shortDescription.length}/500</span>
                  </h3>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    maxLength={500}
                    rows={4}
                    className="w-full text-base text-gray-700 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="A comprehensive guide to the best cleaning companies in Riyadh with tips for choosing the right company for your needs."
                    required
                  />
                </div>

                {/* Author */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {t('blogs.authorField')} *
                    <span className="ml-2 text-xs text-gray-400">{formData.author.length}/100</span>
                  </h3>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    maxLength={100}
                    className="w-full text-lg text-gray-800 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Published Date */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('blogs.publishedDateLabel')}</h3>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full text-lg text-gray-800 border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentTab('details')}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                  >
                    {t('blogs.nextAddSections')} →
                  </button>
                </div>
              </>
            )}

            {/* Details Tab */}
            {currentTab === 'details' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>{t('blogs.addDetailedSections')}</strong> {t('blogs.addDetailedSectionsNote')}
                  </p>
                </div>

                {/* Detailed Sections List */}
                <div className="space-y-4">
                  {detailedSections.map((section, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-900">{t('blogs.section.number')} {index + 1}</h4>
                        <button
                          onClick={() => removeDetailedSection(index)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          {t('blogs.remove')}
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Section Image (Optional) */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('blogs.section.imageOptional')}
                          </label>
                          <div className="flex gap-4 items-center">
                            {section.imagePreview && (
                              <img
                                src={section.imagePreview}
                                alt="Section preview"
                                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-300"
                              />
                            )}
                            <div className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleSectionImageChange(index, file);
                                  }
                                }}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                              />
                              <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px, max 2MB</p>
                            </div>
                          </div>
                        </div>

                        {/* Section Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('blogs.section.titleLabel')} *
                            <span className="ml-2 text-xs text-gray-400">{section.title.length}/200</span>
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateDetailedSection(index, 'title', e.target.value)}
                            maxLength={200}
                            className="w-full text-lg font-semibold text-gray-900 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                            placeholder="Why Choose Professional Cleaning?"
                            required
                          />
                        </div>

                        {/* Section Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('blogs.section.descriptionLabel')} *
                            <span className="ml-2 text-xs text-gray-400">{section.description.length}/2000</span>
                          </label>
                          <textarea
                            value={section.description}
                            onChange={(e) => updateDetailedSection(index, 'description', e.target.value)}
                            maxLength={2000}
                            rows={6}
                            className="w-full text-base text-gray-700 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                            placeholder="Professional cleaning companies provide advanced equipment, trained staff, and quality service that ensures your home is thoroughly cleaned..."
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add More Button */}
                <button
                  onClick={addDetailedSection}
                  className="w-full px-6 py-4 border-2 border-dashed border-purple-400 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
                >
                  + {t('blogs.addAnotherSection')}
                </button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t">
                  <button
                    onClick={() => setCurrentTab('main')}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    ← {t('blogs.backToMainInfo')}
                  </button>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => router.back()}
                      className="flex-1 sm:flex-none px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      {t('button.cancel')}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="flex-1 sm:flex-none px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                    >
                      {saving ? t('blogs.creatingBlog') : t('blogs.createBlog')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
