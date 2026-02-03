'use client';

import { useEffect, useState } from 'react';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import ConfirmModal from '@/components/ConfirmModal';
import Toast from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';

interface Statistic {
  id: string;
  label: string;
  value: number;
  icon: string;
  order: number;
}

export default function StatisticsPage() {
  const { t } = useAdminLanguage();
  const { toast, showToast, closeToast } = useToast();
  const { confirmModal, openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [valueError, setValueError] = useState('');

  // Fetch statistics
  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/statistics');
      const data = await response.json();
      if (data.success) {
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateValue = (value: number): string => {
    if (value < 0) {
      return t('statistics.valueError');
    }
    if (value.toString().startsWith('0') && value !== 0) {
      return t('validation.noLeadingZero');
    }
    return '';
  };

  const handleEdit = (statistic: Statistic) => {
    setEditingId(statistic.id);
    setEditValue(statistic.value);
    setValueError('');
  };

  const handleSave = async (id: string) => {
    try {
      setSaving(true);

      // Validate value
      const error = validateValue(editValue);
      if (error) {
        setValueError(error);
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/statistics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: editValue }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchStatistics();
        setEditingId(null);
        setEditValue(0);
        setValueError('');
        showToast('Statistic updated successfully', 'success');
      } else {
        showToast(data.message || 'Failed to save', 'error');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      showToast('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(0);
    setValueError('');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('statistics.title')}</h1>

        {/* Statistics Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{t('statistics.icon')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{t('statistics.label')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{t('statistics.count')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{t('statistics.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {statistics.map((stat) => (
              <tr key={stat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-2xl">{stat.icon}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{stat.label}</td>
                <td className="px-6 py-4">
                  {editingId === stat.id ? (
                    <div>
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          setEditValue(value);
                          const error = validateValue(value);
                          setValueError(error);
                        }}
                        className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                          valueError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        autoFocus
                        min="0"
                      />
                      {valueError && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{valueError}</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-900 font-bold text-lg">{stat.value}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === stat.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleSave(stat.id)}
                        disabled={saving || !!valueError}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? t('modal.saving') : t('button.save')}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
                      >
                        {t('button.cancel')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(stat)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      {t('button.edit')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}
