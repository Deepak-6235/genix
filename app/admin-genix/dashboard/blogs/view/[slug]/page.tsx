'use client';

import { useState, useEffect } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { type LanguageCode } from '@/lib/languages';
import { translateContent } from '@/lib/translate';

interface DetailedSection {
  id?: string;
  title: string;
  description: string;
  imageFile?: File | null;
  imagePreview?: string | null;
  imageUrl?: string | null;
  order: number;
}

interface DetailedBlog {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  order: number;
}

interface BlogTranslation {
  name: string;
  shortDescription: string;
  detailedSections: {
    title: string;
    description: string;
  }[];
}

interface Blog {
  id: string;
  name: string;
  shortDescription: string;
  author: string;
  imageUrl: string;
  slug: string;
  isActive: boolean;
  publishedAt: string | null;
  order: number;
  detailedBlogs?: DetailedBlog[];
  translations?: Record<string, BlogTranslation>;
}

export default function BlogViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, adminLanguage } = useAdminLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState(searchParams.get('edit') === 'true');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    author: '',
    isActive: true,
    publishedAt: '',
  });

  const [detailedSections, setDetailedSections] = useState<DetailedSection[]>([]);

  const CHAR_LIMITS = {
    name: 200,
    shortDescription: 500,
    author: 100,
    sectionTitle: 200,
    sectionDescription: 2000,
  };

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);

        // Fetch all languages for translations
        const allLangsResponse = await fetch(`/api/blogs?allLangs=true`);
        const allLangsData = await allLangsResponse.json();

        // Fetch current language for detailed sections display
        const currentLangResponse = await fetch(`/api/blogs/${encodeURIComponent(slug)}?lang=${adminLanguage}`);
        const currentLangData = await currentLangResponse.json();

        if (allLangsData.success && currentLangData.success) {
          const foundBlog = allLangsData.blogs.find((b: Blog) => b.slug === slug);
          const currentBlog = currentLangData.blog;

          if (foundBlog && currentBlog) {
            // Merge translations from all languages with current language detailed sections
            const mergedBlog = {
              ...currentBlog,
              translations: foundBlog.translations,
            };

            setBlog(mergedBlog);
            setImagePreview(currentBlog.imageUrl || '');

            // Initialize form data with English content (for editing)
            const englishData = foundBlog.translations?.en || {
              name: foundBlog.name,
              shortDescription: foundBlog.shortDescription,
              detailedSections: [],
            };

            setFormData({
              name: englishData.name,
              shortDescription: englishData.shortDescription,
              author: currentBlog.author,
              isActive: currentBlog.isActive,
              publishedAt: currentBlog.publishedAt ? currentBlog.publishedAt.split('T')[0] : '',
            });

            // Initialize detailed sections from current language
            if (currentBlog.detailedBlogs && currentBlog.detailedBlogs.length > 0) {
              const sections = currentBlog.detailedBlogs.map((section: DetailedBlog) => ({
                id: section.id,
                title: section.title,
                description: section.description,
                imageUrl: section.imageUrl,
                imagePreview: section.imageUrl,
                order: section.order,
              }));
              setDetailedSections(sections);
            } else {
              setDetailedSections([]);
            }
          } else {
            router.push('/admin-genix/dashboard/blogs');
          }
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, router, adminLanguage]);

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

  const handleSectionImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...detailedSections];
        updated[index].imageFile = file;
        updated[index].imagePreview = reader.result as string;
        setDetailedSections(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSection = () => {
    setDetailedSections([
      ...detailedSections,
      {
        title: '',
        description: '',
        order: detailedSections.length,
        imagePreview: null,
      },
    ]);
  };

  const removeSection = (index: number) => {
    const updated = detailedSections.filter((_, i) => i !== index);
    // Reorder remaining sections
    updated.forEach((section, i) => {
      section.order = i;
    });
    setDetailedSections(updated);
  };

  const updateSection = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...detailedSections];
    updated[index][field] = value;
    setDetailedSections(updated);
  };

  const uploadImage = async (file: File, endpoint: string): Promise<string | null> => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch(endpoint, {
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
    if (!blog) return;

    setSaving(true);
    setError('');

    try {
      // Upload main blog image if new file selected
      let imageUrl = blog.imageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, '/api/upload/blog-image');
        if (!uploadedUrl) {
          setSaving(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      // Translate blog content to all languages
      const englishContent: BlogTranslation = {
        name: formData.name,
        shortDescription: formData.shortDescription,
        detailedSections: detailedSections.map((s) => ({
          title: s.title,
          description: s.description,
        })),
      };

      setError(t('blogs.translating'));
      const targetLanguages: LanguageCode[] = ['ar', 'pt', 'zh', 'ja', 'de', 'fr'];
      const translations = await translateContent(englishContent, targetLanguages);

      setError(t('blogs.uploadingImages'));

      // Upload section images
      const sectionsWithUrls = await Promise.all(
        detailedSections.map(async (section, index) => {
          let sectionImageUrl = section.imageUrl || null;

          if (section.imageFile) {
            const uploadedUrl = await uploadImage(section.imageFile, '/api/upload/blog-image');
            if (uploadedUrl) {
              sectionImageUrl = uploadedUrl;
            }
          }

          return {
            order: index,
            imageUrl: sectionImageUrl,
          };
        })
      );

      setError(t('blogs.saving'));

      const response = await fetch(`/api/blogs/${encodeURIComponent(blog.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: blog.slug,
          author: formData.author,
          isActive: formData.isActive,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
          imageUrl,
          translations,
          detailedSections: sectionsWithUrls,
          order: blog.order,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update blog');
      }

      if (data.success) {
        // Refresh blog data
        const refreshResponse = await fetch(`/api/blogs?allLangs=true`);
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          const updatedBlog = refreshData.blogs.find((b: Blog) => b.slug === blog.slug);
          if (updatedBlog) {
            setBlog(updatedBlog);
            setImagePreview(updatedBlog.imageUrl || '');

            // Update detailed sections
            if (updatedBlog.detailedBlogs && updatedBlog.detailedBlogs.length > 0) {
              const sections = updatedBlog.detailedBlogs.map((section: DetailedBlog) => ({
                id: section.id,
                title: section.title,
                description: section.description,
                imageUrl: section.imageUrl,
                imagePreview: section.imageUrl,
                order: section.order,
              }));
              setDetailedSections(sections);
            }
          }
        }
        setIsEditMode(false);
        setImageFile(null);
        setError('');
      } else {
        setError(data.message || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!blog) return;

    // Reset form data
    const englishData = blog.translations?.en || {
      name: blog.name,
      shortDescription: blog.shortDescription,
      detailedSections: [],
    };

    setFormData({
      name: englishData.name,
      shortDescription: englishData.shortDescription,
      author: blog.author,
      isActive: blog.isActive,
      publishedAt: blog.publishedAt ? blog.publishedAt.split('T')[0] : '',
    });

    // Reset detailed sections
    if (blog.detailedBlogs && blog.detailedBlogs.length > 0) {
      const sections = blog.detailedBlogs.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        imageUrl: section.imageUrl,
        imagePreview: section.imageUrl,
        order: section.order,
      }));
      setDetailedSections(sections);
    } else {
      setDetailedSections([]);
    }

    setImageFile(null);
    setImagePreview(blog.imageUrl || '');
    setIsEditMode(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">{t('loading.please')}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('blogs.noBlogs')}</p>
        <button
          onClick={() => router.push('/admin-genix/dashboard/blogs')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {t('button.back')}
        </button>
      </div>
    );
  }

  // Get display content based on admin language
  const displayContent = isEditMode
    ? {
        name: formData.name,
        shortDescription: formData.shortDescription,
      }
    : blog.translations?.[adminLanguage] || {
        name: blog.name,
        shortDescription: blog.shortDescription,
      };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section with Breadcrumb */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-slate-600">
                <li>
                  <button
                    onClick={() => router.push('/admin-genix/dashboard')}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {t('nav.dashboard')}
                  </button>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/admin-genix/dashboard/blogs')}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {t('blogs.title')}
                  </button>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">
                  {isEditMode ? t('button.edit') : t('button.view')}
                </li>
              </ol>
            </nav>

            {/* Edit Mode Notification */}
            {isEditMode && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  📝 {t('blogs.editingNotice')}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${error.includes(t('blogs.translating')) || error.includes(t('blogs.uploadingImages')) || error.includes(t('blogs.saving')) ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm ${error.includes(t('blogs.translating')) || error.includes(t('blogs.uploadingImages')) || error.includes(t('blogs.saving')) ? 'text-blue-800' : 'text-red-800'}`}>
                  {error}
                </p>
              </div>
            )}

            {/* Page Title */}
            {isEditMode ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blogs.name')} ({formData.name.length}/{CHAR_LIMITS.name})
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    if (e.target.value.length <= CHAR_LIMITS.name) {
                      setFormData({ ...formData, name: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-3 text-3xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('blogs.name')}
                />
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {displayContent.name}
              </h1>
            )}

            {/* Blog Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              {isEditMode ? (
                <>
                  <div className="flex items-center gap-2">
                    <label>{t('blogs.author')}:</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => {
                        if (e.target.value.length <= CHAR_LIMITS.author) {
                          setFormData({ ...formData, author: e.target.value });
                        }
                      }}
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={t('blogs.author.field')}
                    />
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <label>{t('blogs.publishedDateField')}:</label>
                    <input
                      type="date"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <span>•</span>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span>{t('blogs.active')}</span>
                  </label>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{t('blogs.author')} {blog.author}</span>
                  </div>
                  {blog.publishedAt && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{t('blogs.published')}: {new Date(blog.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                  <span>•</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {blog.isActive ? t('status.active') : t('status.inactive')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {isEditMode ? (
              <div className="mb-8 sm:mb-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blogs.featuredImage')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 mb-4"
                />
                {imagePreview && (
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                    />
                  </div>
                )}
              </div>
            ) : (
              blog.imageUrl && (
                <div className="mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={blog.imageUrl}
                    alt={displayContent.name}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </div>
              )
            )}

            {/* Short Description */}
            {isEditMode ? (
              <div className="mb-8 sm:mb-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blogs.shortDescription')} ({formData.shortDescription.length}/{CHAR_LIMITS.shortDescription})
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => {
                    if (e.target.value.length <= CHAR_LIMITS.shortDescription) {
                      setFormData({ ...formData, shortDescription: e.target.value });
                    }
                  }}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('blogs.shortDescription')}
                />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-purple-200 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-4">{t('blogs.overview')}</h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{displayContent.shortDescription}</p>
              </div>
            )}

            {/* Detailed Sections */}
            <div className="space-y-8 sm:space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {t('blogs.detailedContent')} {!isEditMode && `(${blog.detailedBlogs?.length || 0} ${t('blogs.sections')})`}
                </h2>
                {isEditMode && (
                  <button
                    onClick={addSection}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    + {t('blogs.addSection')}
                  </button>
                )}
              </div>

              {isEditMode ? (
                <div className="space-y-6">
                  {detailedSections.map((section, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{t('blogs.section')} {index + 1}</h3>
                        <button
                          onClick={() => removeSection(index)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                        >
                          {t('blogs.remove')}
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('blogs.sectionImage')}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSectionImageChange(index, e)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                          {section.imagePreview && (
                            <img
                              src={section.imagePreview}
                              alt="Section preview"
                              className="mt-3 w-full h-48 object-cover rounded-lg"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('blogs.sectionTitle')} ({section.title.length}/{CHAR_LIMITS.sectionTitle})
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => {
                              if (e.target.value.length <= CHAR_LIMITS.sectionTitle) {
                                updateSection(index, 'title', e.target.value);
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={t('blogs.sectionTitle')}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('blogs.sectionDescription')} ({section.description.length}/{CHAR_LIMITS.sectionDescription})
                          </label>
                          <textarea
                            value={section.description}
                            onChange={(e) => {
                              if (e.target.value.length <= CHAR_LIMITS.sectionDescription) {
                                updateSection(index, 'description', e.target.value);
                              }
                            }}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={t('blogs.sectionDescription')}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {detailedSections.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <p className="text-gray-500">{t('blogs.noSections')}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {blog.detailedBlogs && blog.detailedBlogs.length > 0 ? (
                    blog.detailedBlogs.map((section, index) => (
                      <div
                        key={section.id}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        {section.imageUrl && (
                          <div className="w-full h-48 sm:h-64 overflow-hidden">
                            <img
                              src={section.imageUrl}
                              alt={section.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="p-6 sm:p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {index + 1}
                            </div>
                            <h3 className="flex-1 text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                              {section.title}
                            </h3>
                          </div>

                          <div className="pl-16">
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {section.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-gray-500">{t('blogs.noSectionsAvailable')}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex-1 min-w-[200px] px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold disabled:opacity-50"
                  >
                    {t('button.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition font-semibold shadow-lg disabled:opacity-50"
                  >
                    {saving ? t('message.saving') : t('blogs.saveChanges')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/admin-genix/dashboard/blogs')}
                    className="flex-1 min-w-[200px] px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
                  >
                    {t('button.back')}
                  </button>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition font-semibold shadow-lg"
                  >
                    {t('button.edit')}
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
