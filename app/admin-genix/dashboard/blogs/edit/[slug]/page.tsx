'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

interface DetailedSection {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  order: number;
  imageFile?: File | null;
  imagePreview?: string | null;
}

interface Blog {
  id: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  isActive: boolean;
  publishedAt: string | null;
  slug: string;
  detailedBlogs?: DetailedSection[];
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useAdminLanguage();

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<'main' | 'details'>('main');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [blogId, setBlogId] = useState<string>('');

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

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}?lang=en`);
      const data = await response.json();

      if (data.success && data.blog) {
        const blog = data.blog;
        setBlogId(blog.id);
        setFormData({
          name: blog.name,
          shortDescription: blog.shortDescription,
          author: blog.author,
          isActive: blog.isActive,
          publishedAt: blog.publishedAt ? blog.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        });
        setImagePreview(blog.imageUrl);

        // Load detailed sections
        if (blog.detailedBlogs && blog.detailedBlogs.length > 0) {
          setDetailedSections(
            blog.detailedBlogs.map((section: any) => ({
              id: section.id,
              title: section.title,
              description: section.description,
              imageUrl: section.imageUrl,
              imagePreview: section.imageUrl,
              order: section.order,
              imageFile: null,
            }))
          );
        }
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

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

  const removeDetailedSection = async (index: number) => {
    const section = detailedSections[index];

    // If section has an ID, it exists in database - delete from DB
    if (section.id && blogId) {
      if (!confirm('Are you sure you want to delete this section? This will remove it from all languages.')) {
        return;
      }

      try {
        const response = await fetch(`/api/blogs/detailed/${blogId}/${section.order}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to delete section');
        }

        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to delete section');
        return;
      }
    }

    // Remove from local state
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
      setError('Name, short description, and author are required');
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

      if (selectedFile) {
        data.append('image', selectedFile);
      }

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

      const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
        method: 'PUT',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update blog');
      }

      router.push('/admin-genix/dashboard/blogs');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

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
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
            </div>

            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
              Editing in English - Will auto-translate to all languages
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
              Main Blog Info
            </button>
            <button
              onClick={() => setCurrentTab('details')}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                currentTab === 'details'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Detailed Sections ({detailedSections.length})
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
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</h3>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                {/* Blog Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Blog Image *
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
                      />
                      <p className="text-xs text-gray-500 mt-2">Leave empty to keep current image. Recommended: 1200x630px, max 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Blog Name */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Blog Name / Title *
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
                    Short Description / Excerpt *
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
                    Author *
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
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Published Date</h3>
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
                    Next: Edit Detailed Sections →
                  </button>
                </div>
              </>
            )}

            {/* Details Tab */}
            {currentTab === 'details' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Edit detailed content sections</strong> for your blog. You can modify existing sections or add new ones.
                  </p>
                </div>

                {/* Detailed Sections List */}
                <div className="space-y-4">
                  {detailedSections.map((section, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-900">Section {index + 1}</h4>
                        <button
                          onClick={() => removeDetailedSection(index)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Section Image (Optional) */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Image (Optional)
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
                              <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image. Recommended: 800x600px, max 2MB</p>
                            </div>
                          </div>
                        </div>

                        {/* Section Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Title *
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
                            Section Description *
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
                  + Add Another Section
                </button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t">
                  <button
                    onClick={() => setCurrentTab('main')}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    ← Back to Main Info
                  </button>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => router.back()}
                      className="flex-1 sm:flex-none px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="flex-1 sm:flex-none px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                    >
                      {saving ? 'Updating Blog...' : 'Update Blog'}
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
