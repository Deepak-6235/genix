import { LanguageCode } from '@/lib/languages';

export const heroTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  description: string;
  services: string;
  ctaContact: string;
  ctaServices: string;
  stats: {
    years: string;
    clients: string;
    homes: string;
    technicians: string;
  };
}> = {
  ar: {
    title: 'مؤسسة ركن النخيل',
    subtitle: 'للتشغيل والصيانة',
    description: 'شركة خدمات تشغيل وصيانة المرافق في جميع أنحاء المملكة السعودية',
    services: 'نظافة عامة • مقاولات • عوازل • ترميمات • مكافحة حشرات',
    ctaContact: 'اتصل بنا الآن',
    ctaServices: 'تصفح الخدمات',
    stats: {
      years: 'عام من الخبرة',
      clients: 'عميل سعيد',
      homes: 'منزل',
      technicians: 'فني متخصص',
    },
  },
  en: {
    title: 'Rukn Al-Nakheel Foundation',
    subtitle: 'For Operations and Maintenance',
    description: 'Facility operations and maintenance services company throughout Saudi Arabia',
    services: 'General Cleaning • Contracting • Insulation • Renovations • Pest Control',
    ctaContact: 'Contact Us Now',
    ctaServices: 'Browse Services',
    stats: {
      years: 'Years of Experience',
      clients: 'Happy Clients',
      homes: 'Homes',
      technicians: 'Specialized Technicians',
    },
  },
  pt: {
    title: 'Fundação Rukn Al-Nakheel',
    subtitle: 'Para Operações e Manutenção',
    description: 'Empresa de serviços de operações e manutenção de instalações em toda a Arábia Saudita',
    services: 'Limpeza Geral • Contratação • Isolamento • Renovações • Controle de Pragas',
    ctaContact: 'Entre em Contato Agora',
    ctaServices: 'Navegar Serviços',
    stats: {
      years: 'Anos de Experiência',
      clients: 'Clientes Satisfeitos',
      homes: 'Casas',
      technicians: 'Técnicos Especializados',
    },
  },
  zh: {
    title: '棕榈角基金会',
    subtitle: '运营和维护',
    description: '在沙特阿拉伯各地提供设施运营和维护服务的公司',
    services: '一般清洁 • 承包 • 绝缘 • 翻新 • 害虫防治',
    ctaContact: '立即联系我们',
    ctaServices: '浏览服务',
    stats: {
      years: '年经验',
      clients: '满意客户',
      homes: '房屋',
      technicians: '专业技术人员',
    },
  },
  ja: {
    title: 'ルクン・アルナキール財団',
    subtitle: '運営とメンテナンス',
    description: 'サウジアラビア全土で施設運営とメンテナンスサービスを提供する会社',
    services: '一般清掃 • 請負 • 断熱 • 改築 • 害虫駆除',
    ctaContact: '今すぐお問い合わせ',
    ctaServices: 'サービスを閲覧',
    stats: {
      years: '年の経験',
      clients: '満足した顧客',
      homes: '住宅',
      technicians: '専門技術者',
    },
  },
  de: {
    title: 'Rukn Al-Nakheel Stiftung',
    subtitle: 'Für Betrieb und Wartung',
    description: 'Unternehmen für Betriebs- und Wartungsdienste in ganz Saudi-Arabien',
    services: 'Allgemeine Reinigung • Auftragsvergabe • Isolierung • Renovierungen • Schädlingsbekämpfung',
    ctaContact: 'Jetzt Kontaktieren',
    ctaServices: 'Dienstleistungen Durchsuchen',
    stats: {
      years: 'Jahre Erfahrung',
      clients: 'Zufriedene Kunden',
      homes: 'Häuser',
      technicians: 'Spezialisierte Techniker',
    },
  },
  fr: {
    title: 'Fondation Rukn Al-Nakheel',
    subtitle: 'Pour les Opérations et la Maintenance',
    description: 'Entreprise de services d\'exploitation et de maintenance d\'installations à travers l\'Arabie Saoudite',
    services: 'Nettoyage Général • Contrat • Isolation • Rénovations • Lutte contre les Nuisibles',
    ctaContact: 'Contactez-nous Maintenant',
    ctaServices: 'Parcourir les Services',
    stats: {
      years: 'Années d\'Expérience',
      clients: 'Clients Satisfaits',
      homes: 'Maisons',
      technicians: 'Techniciens Spécialisés',
    },
  },
};
