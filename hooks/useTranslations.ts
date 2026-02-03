import { useLanguage } from '@/contexts/LanguageContext';
import { topBarTranslations } from '@/translations/TopBar';
import { headerTranslations } from '@/translations/Header';
import { heroTranslations } from '@/translations/Hero';
import { aboutUsTranslations } from '@/translations/AboutUs';
import { servicesTranslations } from '@/translations/Services';
import { whyChooseUsTranslations } from '@/translations/WhyChooseUs';
import { contactTranslations } from '@/translations/Contact';
import { footerTranslations } from '@/translations/Footer';
import { faqTranslations } from '@/translations/FAQ';
import { testimonialsTranslations } from '@/translations/Testimonials';
import { whatsAppSectionTranslations } from '@/translations/WhatsAppSection';
import { blogTranslations } from '@/translations/Blog';
import { blogContentTranslations } from '@/translations/BlogContent';
import { servicesContentTranslations } from '@/translations/ServicesContent';
import { aboutUsContentTranslations } from '@/translations/AboutUsContent';
import { faqContentTranslations } from '@/translations/FAQContent';
import { contactContentTranslations } from '@/translations/ContactContent';
import { metadataTranslations } from '@/translations/Metadata';

export function useMetadataTranslations() {
  const { language } = useLanguage();
  return metadataTranslations[language];
}

export function useTopBarTranslations() {
  const { language } = useLanguage();
  return topBarTranslations[language];
}

export function useHeaderTranslations() {
  const { language } = useLanguage();
  return headerTranslations[language];
}

export function useHeroTranslations() {
  const { language } = useLanguage();
  return heroTranslations[language];
}

export function useAboutUsTranslations() {
  const { language } = useLanguage();
  return aboutUsTranslations[language];
}

export function useServicesTranslations() {
  const { language } = useLanguage();
  return servicesTranslations[language];
}

export function useWhyChooseUsTranslations() {
  const { language } = useLanguage();
  return whyChooseUsTranslations[language];
}

export function useContactTranslations() {
  const { language } = useLanguage();
  return contactTranslations[language];
}

export function useFooterTranslations() {
  const { language } = useLanguage();
  return footerTranslations[language];
}

export function useFAQTranslations() {
  const { language } = useLanguage();
  return faqTranslations[language];
}

export function useTestimonialsTranslations() {
  const { language } = useLanguage();
  return testimonialsTranslations[language];
}

export function useWhatsAppSectionTranslations() {
  const { language } = useLanguage();
  return whatsAppSectionTranslations[language];
}

export function useBlogTranslations() {
  const { language } = useLanguage();
  return blogTranslations[language];
}

export function useBlogContentTranslations() {
  const { language } = useLanguage();
  return blogContentTranslations[language];
}

export function useServicesContentTranslations() {
  const { language } = useLanguage();
  return servicesContentTranslations[language];
}

export function useAboutUsContentTranslations() {
  const { language } = useLanguage();
  return aboutUsContentTranslations[language];
}

export function useFAQContentTranslations() {
  const { language } = useLanguage();
  return faqContentTranslations[language];
}

export function useContactContentTranslations() {
  const { language } = useLanguage();
  return contactContentTranslations[language];
}
