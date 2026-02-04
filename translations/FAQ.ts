import { LanguageCode } from '@/lib/languages';

export const faqTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  viewAll: string;
}> = {
  ar: {
    title: 'أسئلة شائعة',
    subtitle: 'إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا',
    viewAll: 'عرض جميع الأسئلة الشائعة',
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to the most common questions about our services',
    viewAll: 'View All FAQs',
  },
  pt: {
    title: 'Perguntas Frequentes',
    subtitle: 'Respostas às perguntas mais comuns sobre nossos serviços',
    viewAll: 'Ver Todas as FAQs',
  },
  zh: {
    title: '常见问题',
    subtitle: '关于我们服务的最常见问题的答案',
    viewAll: '查看所有常见问题',
  },
  ja: {
    title: 'よくある質問',
    subtitle: '私たちのサービスに関する最も一般的な質問への回答',
    viewAll: 'すべてのFAQを表示',
  },
  de: {
    title: 'Häufig Gestellte Fragen',
    subtitle: 'Antworten auf die häufigsten Fragen zu unseren Dienstleistungen',
    viewAll: 'Alle FAQs Anzeigen',
  },
  fr: {
    title: 'Questions Fréquemment Posées',
    subtitle: 'Réponses aux questions les plus courantes sur nos services',
    viewAll: 'Voir Toutes les FAQs',
  },
};
