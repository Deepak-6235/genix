import { LanguageCode } from '@/lib/languages';

export const headerTranslations: Record<LanguageCode, {
  logo: string;
  navItems: {
    home: string;
    about: string;
    services: string;
    faq: string;
    blog: string;
    contact: string;
  };
  services: {
    pestControl: string;
    disinfection: string;
    paints: string;
    acMaintenance: string;
    waterfalls: string;
    pools: string;
    restoration: string;
  };
}> = {
  ar: {
    logo: 'ركن النخيل',
    navItems: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      faq: 'اسئلة شائعة',
      blog: 'المدونة',
      contact: 'اتصل بنا',
    },
    services: {
      pestControl: 'مكافحة الحشرات',
      disinfection: 'تعقيم ضد الفيروسات',
      paints: 'دهانات وديكورات',
      acMaintenance: 'صيانة المكيفات',
      waterfalls: 'تصميم وإنشاء الشلالات والنوافير',
      pools: 'إنشاء وصيانة المسابح',
      restoration: 'الترميم الداخلي والخارجي',
    },
  },
  en: {
    logo: 'Rukn Al-Nakheel',
    navItems: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      faq: 'FAQ',
      blog: 'Blog',
      contact: 'Contact',
    },
    services: {
      pestControl: 'Pest Control',
      disinfection: 'Disinfection Against Viruses',
      paints: 'Paints and Decorations',
      acMaintenance: 'Air Conditioner Maintenance',
      waterfalls: 'Waterfalls and Fountains Design',
      pools: 'Swimming Pools Construction & Maintenance',
      restoration: 'Interior & Exterior Restoration',
    },
  },
  pt: {
    logo: 'Rukn Al-Nakheel',
    navItems: {
      home: 'Início',
      about: 'Sobre Nós',
      services: 'Serviços',
      faq: 'FAQ',
      blog: 'Blog',
      contact: 'Contato',
    },
    services: {
      pestControl: 'Controle de Pragas',
      disinfection: 'Desinfecção Contra Vírus',
      paints: 'Tintas e Decorações',
      acMaintenance: 'Manutenção de Ar Condicionado',
      waterfalls: 'Design de Cascatas e Fontes',
      pools: 'Construção e Manutenção de Piscinas',
      restoration: 'Restauração Interior e Exterior',
    },
  },
  zh: {
    logo: '棕榈角',
    navItems: {
      home: '首页',
      about: '关于我们',
      services: '服务',
      faq: '常见问题',
      blog: '博客',
      contact: '联系我们',
    },
    services: {
      pestControl: '害虫防治',
      disinfection: '病毒消毒',
      paints: '油漆和装饰',
      acMaintenance: '空调维护',
      waterfalls: '瀑布和喷泉设计',
      pools: '游泳池建造和维护',
      restoration: '内外修复',
    },
  },
  ja: {
    logo: 'ルクン・アルナキール',
    navItems: {
      home: 'ホーム',
      about: '私たちについて',
      services: 'サービス',
      faq: 'よくある質問',
      blog: 'ブログ',
      contact: 'お問い合わせ',
    },
    services: {
      pestControl: '害虫駆除',
      disinfection: 'ウイルス消毒',
      paints: '塗装と装飾',
      acMaintenance: 'エアコン保守',
      waterfalls: '滝と噴水の設計',
      pools: 'プール建設と保守',
      restoration: '内外装修復',
    },
  },
  de: {
    logo: 'Rukn Al-Nakheel',
    navItems: {
      home: 'Startseite',
      about: 'Über Uns',
      services: 'Dienstleistungen',
      faq: 'FAQ',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    services: {
      pestControl: 'Schädlingsbekämpfung',
      disinfection: 'Desinfektion gegen Viren',
      paints: 'Farben und Dekorationen',
      acMaintenance: 'Klimaanlagenwartung',
      waterfalls: 'Wasserfälle und Brunnen Design',
      pools: 'Schwimmbadbau und -wartung',
      restoration: 'Innen- und Außenrestaurierung',
    },
  },
  fr: {
    logo: 'Rukn Al-Nakheel',
    navItems: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      faq: 'FAQ',
      blog: 'Blog',
      contact: 'Contact',
    },
    services: {
      pestControl: 'Lutte contre les Nuisibles',
      disinfection: 'Désinfection contre les Virus',
      paints: 'Peintures et Décoration',
      acMaintenance: 'Maintenance Climatisation',
      waterfalls: 'Conception de Cascades et Fontaines',
      pools: 'Construction et Maintenance de Piscines',
      restoration: 'Restauration Intérieure et Extérieure',
    },
  },
};
