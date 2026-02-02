'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, type LanguageCode } from '@/lib/languages';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languages: typeof LANGUAGES;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage or browser preference
    const savedLang = localStorage.getItem('preferred-language') as LanguageCode;
    if (savedLang && LANGUAGES[savedLang]) {
      setLanguageState(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (LANGUAGES[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = LANGUAGES[lang].dir;
    document.documentElement.lang = lang;
  };

  // Update dir on language change
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = LANGUAGES[language].dir;
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const value = {
    language,
    setLanguage,
    languages: LANGUAGES,
    dir: LANGUAGES[language].dir,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
