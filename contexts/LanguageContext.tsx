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

export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: React.ReactNode;
  initialLanguage?: LanguageCode;
}) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync if localStorage differs (cookie usually takes precedence)
    const savedLang = localStorage.getItem('preferred-language') as LanguageCode;
    if (savedLang && LANGUAGES[savedLang] && savedLang !== language) {
      // We don't necessarily want to force-update if the cookie was different, 
      // but for consistency we can sync to the state.
    }
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);

    // Set cookie for server-side detection (expires in 1 year)
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `NEXT_LOCALE=${lang};expires=${d.toUTCString()};path=/;SameSite=Lax`;

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
