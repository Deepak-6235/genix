'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, type LanguageCode } from '@/lib/languages';
import { t } from '@/lib/admin-translations';

interface AdminLanguageContextType {
  adminLanguage: LanguageCode;
  setAdminLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  languages: typeof LANGUAGES;
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined);

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [adminLanguage, setAdminLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load admin language preference from localStorage
    const savedLang = localStorage.getItem('admin-language') as LanguageCode;
    if (savedLang && LANGUAGES[savedLang]) {
      setAdminLanguageState(savedLang);
    }
  }, []);

  const setAdminLanguage = (lang: LanguageCode) => {
    setAdminLanguageState(lang);
    localStorage.setItem('admin-language', lang);
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = LANGUAGES[lang].dir;
  };

  // Update dir on language change
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = LANGUAGES[adminLanguage].dir;
    }
  }, [adminLanguage, mounted]);

  const translate = (key: string) => t(key, adminLanguage);

  const value = {
    adminLanguage,
    setAdminLanguage,
    t: translate,
    dir: LANGUAGES[adminLanguage].dir,
    languages: LANGUAGES,
  };

  return (
    <AdminLanguageContext.Provider value={value}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext);
  if (context === undefined) {
    throw new Error('useAdminLanguage must be used within an AdminLanguageProvider');
  }
  return context;
}
