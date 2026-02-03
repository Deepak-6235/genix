'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useServices } from '@/hooks/useServices';
import Link from 'next/link';

export default function HomePage() {
  const { language, dir } = useLanguage();
  const { services, loading } = useServices();

  return (
    <></>
  );
}
