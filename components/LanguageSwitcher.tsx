'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGE_CODES } from '@/lib/languages';

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        aria-label="Select language"
      >
        <span className="text-xl">{languages[language].flag}</span>
        <span className="font-medium text-gray-700">{languages[language].nativeName}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="py-2">
            {LANGUAGE_CODES.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition ${
                  language === lang ? 'bg-accent-purple-50 text-accent-purple-700' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{languages[lang].flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{languages[lang].nativeName}</div>
                  <div className="text-xs text-gray-500">{languages[lang].name}</div>
                </div>
                {language === lang && (
                  <svg className="w-5 h-5 text-accent-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
