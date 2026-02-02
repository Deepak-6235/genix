'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';

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
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutUsData>>({});

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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch('/api/about-us', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchAboutUs();
        alert('About Us information saved successfully');
      } else {
        alert(data.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📧 Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Phone Number 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📱 Phone Number 1</label>
            <input
              type="tel"
              value={formData.phoneNumber1 || ''}
              onChange={(e) => handleChange('phoneNumber1', e.target.value)}
              placeholder="0562000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Phone Number 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📱 Phone Number 2</label>
            <input
              type="tel"
              value={formData.phoneNumber2 || ''}
              onChange={(e) => handleChange('phoneNumber2', e.target.value)}
              placeholder="0562000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">⏰ Working Hours</label>
            <input
              type="text"
              value={formData.workingHours || ''}
              onChange={(e) => handleChange('workingHours', e.target.value)}
              placeholder="24/7 or 9:00 AM - 5:00 PM"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📍 Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Street address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🏙️ City</label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Riyadh"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
