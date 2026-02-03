import { LanguageCode } from '@/lib/languages';

export const aboutUsContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbAbout: string;
  pageTitle: string;
  companyName: string;
  experience: string;
  whyChooseTitle: string;
  description1: string;
  description2: string;
  description3: string;
  searchAndContactTitle: string;
  searchAndContactDescription: string;
  contactUsNow: string;
  bestServicesTitle: string;
  services: {
    disinfection: { title: string; description: string; };
    paints: { title: string; description: string; };
    acMaintenance: { title: string; description: string; };
    waterfalls: { title: string; description: string; };
  };
  stats: {
    satisfiedClients: string;
    team: string;
    homes: string;
    yearsExperience: string;
  };
  companyTitle: string;
  companyDescription: string;
  contactInfo: {
    address: string;
    addressValue: string;
    phone: string;
    email: string;
    emailValue: string;
    hours: string;
    hoursValue: string;
  };
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbAbout: 'من نحن',
    pageTitle: 'من نحن',
    companyName: 'ركن النخيل',
    experience: '12+ عام خبرة',
    whyChooseTitle: 'لماذا تختار خدماتنا؟',
    description1: 'يتيح ركن النخيل لك طلب خدمات الصيانة والعناية لمنزلك وكذلك خدمات مكافحة وإبادة الحشرات.',
    description2: 'الطريقة الأفضل لإتمام جميع أعمال منزلك! إن كنت تبحث عن فني محترف، فأنت في المكان الصحيح.',
    description3: 'سوف نعمل على توفير الراحة في كافة خدماتنا ونقوم بتنفيذ جميع الخدمات وتنظيف ما قمنا بفعله حتى لا تشعر منا بأي إزعاج. نعمل دائماً من أجل سعادتك ورضاك.',
    searchAndContactTitle: 'ابحث في منزلك واتصل بنا',
    searchAndContactDescription: 'نحن متخصصون في تقديم جميع خدمات التنظيف والصيانة والتشغيل ومكافحة وإبادة الحشرات داخل المملكة العربية السعودية. نعمل طوال أيام الأسبوع لخدمتك.',
    contactUsNow: 'اتصل بنا الآن',
    bestServicesTitle: 'أفضل خدمة قدمناها',
    services: {
      disinfection: { title: 'تعقيم ضد الفيروسات', description: 'خدمات تعقيم شاملة باستخدام أفضل المواد المعتمدة' },
      paints: { title: 'دهانات وديكورات', description: 'أحدث تقنيات الدهان والديكورات العصرية' },
      acMaintenance: { title: 'صيانة المكيفات', description: 'صيانة شاملة للمكيفات بقطع غيار أصلية' },
      waterfalls: { title: 'تصميم وإنشاء الشلالات والنوافير', description: 'تصاميم عصرية للشلالات والنوافير مع الإضاءة' },
    },
    stats: {
      satisfiedClients: 'عملاء راضون',
      team: 'فريق العمل',
      homes: 'منزل',
      yearsExperience: 'سنوات خبرة',
    },
    companyTitle: 'مؤسسة ركن النخيل',
    companyDescription: 'مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وإبادة الحشرات داخل المملكة العربية السعودية. نعمل طوال أيام الأسبوع لخدمتك وتلبية احتياجاتك.',
    contactInfo: {
      address: 'العنوان:',
      addressValue: 'السعودية، الرياض',
      phone: 'الهاتف:',
      email: 'البريد الإلكتروني:',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: 'ساعات العمل:',
      hoursValue: 'نعمل طوال أيام الأسبوع',
    },
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'About Us',
    pageTitle: 'About Us',
    companyName: 'Rukn Al-Nakheel',
    experience: '12+ Years Experience',
    whyChooseTitle: 'Why Choose Our Services?',
    description1: 'Rukn Al-Nakheel allows you to request maintenance and care services for your home as well as pest control and extermination services.',
    description2: 'The best way to complete all your home work! If you are looking for a professional technician, you are in the right place.',
    description3: 'We will work to provide comfort in all our services and carry out all services and clean up what we have done so that you do not feel any inconvenience from us. We always work for your happiness and satisfaction.',
    searchAndContactTitle: 'Search in Your Home and Contact Us',
    searchAndContactDescription: 'We specialize in providing all cleaning, maintenance, operation, and pest control and extermination services within the Kingdom of Saudi Arabia. We work throughout the week to serve you.',
    contactUsNow: 'Contact Us Now',
    bestServicesTitle: 'Best Services We Provided',
    services: {
      disinfection: { title: 'Disinfection Against Viruses', description: 'Comprehensive disinfection services using the best approved materials' },
      paints: { title: 'Paints and Decorations', description: 'Latest painting techniques and modern decorations' },
      acMaintenance: { title: 'Air Conditioner Maintenance', description: 'Comprehensive AC maintenance with original spare parts' },
      waterfalls: { title: 'Waterfalls and Fountains Design and Construction', description: 'Modern designs for waterfalls and fountains with lighting' },
    },
    stats: {
      satisfiedClients: 'Satisfied Clients',
      team: 'Team',
      homes: 'Homes',
      yearsExperience: 'Years Experience',
    },
    companyTitle: 'Rukn Al-Nakheel Establishment',
    companyDescription: 'Rukn Al-Nakheel Establishment for cleaning, maintenance, operation, and pest control and extermination services within the Kingdom of Saudi Arabia. We work throughout the week to serve you and meet your needs.',
    contactInfo: {
      address: 'Address:',
      addressValue: 'Saudi Arabia, Riyadh',
      phone: 'Phone:',
      email: 'Email:',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: 'Working Hours:',
      hoursValue: 'We work throughout the week',
    },
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbAbout: 'Sobre Nós',
    pageTitle: 'Sobre Nós',
    companyName: 'Rukn Al-Nakheel',
    experience: '12+ Anos de Experiência',
    whyChooseTitle: 'Por Que Escolher Nossos Serviços?',
    description1: 'O Rukn Al-Nakheel permite que você solicite serviços de manutenção e cuidados para sua casa, bem como serviços de controle e extermínio de pragas.',
    description2: 'A melhor maneira de concluir todo o trabalho da sua casa! Se você está procurando um técnico profissional, está no lugar certo.',
    description3: 'Trabalharemos para fornecer conforto em todos os nossos serviços e realizar todos os serviços e limpar o que fizemos para que você não sinta nenhum inconveniente de nós. Sempre trabalhamos para sua felicidade e satisfação.',
    searchAndContactTitle: 'Pesquise em Sua Casa e Entre em Contato',
    searchAndContactDescription: 'Somos especializados em fornecer todos os serviços de limpeza, manutenção, operação e controle e extermínio de pragas dentro do Reino da Arábia Saudita. Trabalhamos durante toda a semana para atendê-lo.',
    contactUsNow: 'Entre em Contato Agora',
    bestServicesTitle: 'Melhores Serviços que Fornecemos',
    services: {
      disinfection: { title: 'Desinfecção Contra Vírus', description: 'Serviços abrangentes de desinfecção usando os melhores materiais aprovados' },
      paints: { title: 'Tintas e Decorações', description: 'Últimas técnicas de pintura e decorações modernas' },
      acMaintenance: { title: 'Manutenção de Ar Condicionado', description: 'Manutenção abrangente de AC com peças originais' },
      waterfalls: { title: 'Projeto e Construção de Cascatas e Fontes', description: 'Projetos modernos para cascatas e fontes com iluminação' },
    },
    stats: {
      satisfiedClients: 'Clientes Satisfeitos',
      team: 'Equipe',
      homes: 'Casas',
      yearsExperience: 'Anos de Experiência',
    },
    companyTitle: 'Estabelecimento Rukn Al-Nakheel',
    companyDescription: 'Estabelecimento Rukn Al-Nakheel para serviços de limpeza, manutenção, operação e controle e extermínio de pragas dentro do Reino da Arábia Saudita. Trabalhamos durante toda a semana para atendê-lo e atender às suas necessidades.',
    contactInfo: {
      address: 'Endereço:',
      addressValue: 'Arábia Saudita, Riade',
      phone: 'Telefone:',
      email: 'Email:',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: 'Horário de Funcionamento:',
      hoursValue: 'Trabalhamos durante toda a semana',
    },
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbAbout: '关于我们',
    pageTitle: '关于我们',
    companyName: '棕榈角',
    experience: '12+ 年经验',
    whyChooseTitle: '为什么选择我们的服务？',
    description1: '棕榈角允许您为您的家申请维护和护理服务，以及害虫控制和消灭服务。',
    description2: '完成所有家庭工作的最佳方式！如果您正在寻找专业技术人员，那么您来对地方了。',
    description3: '我们将努力在所有服务中提供舒适，执行所有服务并清理我们所做的工作，这样您就不会感到任何不便。我们始终为您的幸福和满意而努力。',
    searchAndContactTitle: '在您家中搜索并联系我们',
    searchAndContactDescription: '我们专门在沙特阿拉伯王国境内提供所有清洁、维护、运营以及害虫控制和消灭服务。我们整周工作为您服务。',
    contactUsNow: '立即联系我们',
    bestServicesTitle: '我们提供的最佳服务',
    services: {
      disinfection: { title: '抗病毒消毒', description: '使用最佳批准材料的全面消毒服务' },
      paints: { title: '油漆和装饰', description: '最新的绘画技术和现代装饰' },
      acMaintenance: { title: '空调维护', description: '使用原装配件的全面空调维护' },
      waterfalls: { title: '瀑布和喷泉设计与施工', description: '带照明的瀑布和喷泉现代设计' },
    },
    stats: {
      satisfiedClients: '满意客户',
      team: '团队',
      homes: '家庭',
      yearsExperience: '年经验',
    },
    companyTitle: '棕榈角机构',
    companyDescription: '棕榈角机构在沙特阿拉伯王国境内提供清洁、维护、运营以及害虫控制和消灭服务。我们整周工作为您服务并满足您的需求。',
    contactInfo: {
      address: '地址：',
      addressValue: '沙特阿拉伯，利雅得',
      phone: '电话：',
      email: '电子邮件：',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: '工作时间：',
      hoursValue: '我们整周工作',
    },
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbAbout: '私たちについて',
    pageTitle: '私たちについて',
    companyName: 'ルクン・アルナキール',
    experience: '12年以上の経験',
    whyChooseTitle: 'なぜ私たちのサービスを選ぶのか？',
    description1: 'ルクン・アルナキールでは、ご自宅のメンテナンスとケアサービス、および害虫駆除サービスをリクエストできます。',
    description2: 'すべての家庭作業を完了する最良の方法！プロの技術者をお探しの場合は、正しい場所にいます。',
    description3: '私たちはすべてのサービスで快適さを提供し、すべてのサービスを実行し、行ったことをクリーンアップして、私たちから不便を感じないようにします。私たちは常にあなたの幸福と満足のために働きます。',
    searchAndContactTitle: 'ご自宅で検索してご連絡ください',
    searchAndContactDescription: '私たちは、サウジアラビア王国内で、すべての清掃、メンテナンス、運営、害虫駆除サービスを提供することを専門としています。週を通じてお客様にサービスを提供します。',
    contactUsNow: '今すぐお問い合わせ',
    bestServicesTitle: '提供した最高のサービス',
    services: {
      disinfection: { title: 'ウイルスに対する消毒', description: '最高の承認された材料を使用した包括的な消毒サービス' },
      paints: { title: 'ペイントと装飾', description: '最新のペイント技術とモダンな装飾' },
      acMaintenance: { title: 'エアコン保守', description: '純正部品を使用した包括的なAC保守' },
      waterfalls: { title: '滝と噴水の設計と建設', description: '照明付きの滝と噴水のモダンなデザイン' },
    },
    stats: {
      satisfiedClients: '満足したクライアント',
      team: 'チーム',
      homes: '家',
      yearsExperience: '年の経験',
    },
    companyTitle: 'ルクン・アルナキール機関',
    companyDescription: 'ルクン・アルナキール機関は、サウジアラビア王国内で清掃、メンテナンス、運営、害虫駆除サービスを提供しています。週を通じてお客様にサービスを提供し、ニーズを満たします。',
    contactInfo: {
      address: '住所：',
      addressValue: 'サウジアラビア、リヤド',
      phone: '電話：',
      email: 'メール：',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: '営業時間：',
      hoursValue: '週を通じて働いています',
    },
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbAbout: 'Über Uns',
    pageTitle: 'Über Uns',
    companyName: 'Rukn Al-Nakheel',
    experience: '12+ Jahre Erfahrung',
    whyChooseTitle: 'Warum Unsere Dienste Wählen?',
    description1: 'Rukn Al-Nakheel ermöglicht es Ihnen, Wartungs- und Pflegedienste für Ihr Zuhause sowie Schädlingsbekämpfungs- und Vernichtungsdienste anzufordern.',
    description2: 'Der beste Weg, um alle Ihre Hausarbeiten zu erledigen! Wenn Sie nach einem professionellen Techniker suchen, sind Sie hier richtig.',
    description3: 'Wir werden daran arbeiten, Komfort in all unseren Dienstleistungen zu bieten und alle Dienstleistungen durchzuführen und aufzuräumen, was wir getan haben, damit Sie sich von uns nicht unwohl fühlen. Wir arbeiten immer für Ihr Glück und Ihre Zufriedenheit.',
    searchAndContactTitle: 'Suchen Sie in Ihrem Zuhause und Kontaktieren Sie Uns',
    searchAndContactDescription: 'Wir sind spezialisiert auf die Bereitstellung aller Reinigungs-, Wartungs-, Betriebs- und Schädlingsbekämpfungs- und Vernichtungsdienste innerhalb des Königreichs Saudi-Arabien. Wir arbeiten die ganze Woche, um Ihnen zu dienen.',
    contactUsNow: 'Kontaktieren Sie Uns Jetzt',
    bestServicesTitle: 'Beste Dienste, die Wir Bereitgestellt Haben',
    services: {
      disinfection: { title: 'Desinfektion Gegen Viren', description: 'Umfassende Desinfektionsdienste mit den besten zugelassenen Materialien' },
      paints: { title: 'Farben und Dekorationen', description: 'Neueste Maltechniken und moderne Dekorationen' },
      acMaintenance: { title: 'Klimaanlagenwartung', description: 'Umfassende AC-Wartung mit Original-Ersatzteilen' },
      waterfalls: { title: 'Wasserfälle und Brunnen Design und Bau', description: 'Moderne Designs für Wasserfälle und Brunnen mit Beleuchtung' },
    },
    stats: {
      satisfiedClients: 'Zufriedene Kunden',
      team: 'Team',
      homes: 'Häuser',
      yearsExperience: 'Jahre Erfahrung',
    },
    companyTitle: 'Rukn Al-Nakheel Einrichtung',
    companyDescription: 'Rukn Al-Nakheel Einrichtung für Reinigungs-, Wartungs-, Betriebs- und Schädlingsbekämpfungs- und Vernichtungsdienste innerhalb des Königreichs Saudi-Arabien. Wir arbeiten die ganze Woche, um Ihnen zu dienen und Ihre Bedürfnisse zu erfüllen.',
    contactInfo: {
      address: 'Adresse:',
      addressValue: 'Saudi-Arabien, Riad',
      phone: 'Telefon:',
      email: 'E-Mail:',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: 'Arbeitszeiten:',
      hoursValue: 'Wir arbeiten die ganze Woche',
    },
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbAbout: 'À Propos de Nous',
    pageTitle: 'À Propos de Nous',
    companyName: 'Rukn Al-Nakheel',
    experience: '12+ Ans d\'Expérience',
    whyChooseTitle: 'Pourquoi Choisir Nos Services?',
    description1: 'Rukn Al-Nakheel vous permet de demander des services de maintenance et de soins pour votre maison ainsi que des services de lutte contre les nuisibles et d\'extermination.',
    description2: 'La meilleure façon de terminer tout votre travail à la maison! Si vous cherchez un technicien professionnel, vous êtes au bon endroit.',
    description3: 'Nous travaillerons à fournir le confort dans tous nos services et à effectuer tous les services et à nettoyer ce que nous avons fait afin que vous ne ressentiez aucun inconvénient de notre part. Nous travaillons toujours pour votre bonheur et votre satisfaction.',
    searchAndContactTitle: 'Recherchez dans Votre Maison et Contactez-Nous',
    searchAndContactDescription: 'Nous sommes spécialisés dans la fourniture de tous les services de nettoyage, de maintenance, d\'exploitation et de lutte contre les nuisibles et d\'extermination au sein du Royaume d\'Arabie Saoudite. Nous travaillons toute la semaine pour vous servir.',
    contactUsNow: 'Contactez-Nous Maintenant',
    bestServicesTitle: 'Meilleurs Services que Nous Avons Fournis',
    services: {
      disinfection: { title: 'Désinfection Contre les Virus', description: 'Services de désinfection complets utilisant les meilleurs matériaux approuvés' },
      paints: { title: 'Peintures et Décoration', description: 'Dernières techniques de peinture et décorations modernes' },
      acMaintenance: { title: 'Maintenance de Climatisation', description: 'Maintenance complète de la climatisation avec pièces d\'origine' },
      waterfalls: { title: 'Conception et Construction de Cascades et Fontaines', description: 'Conceptions modernes pour cascades et fontaines avec éclairage' },
    },
    stats: {
      satisfiedClients: 'Clients Satisfaits',
      team: 'Équipe',
      homes: 'Maisons',
      yearsExperience: 'Ans d\'Expérience',
    },
    companyTitle: 'Établissement Rukn Al-Nakheel',
    companyDescription: 'Établissement Rukn Al-Nakheel pour les services de nettoyage, de maintenance, d\'exploitation et de lutte contre les nuisibles et d\'extermination au sein du Royaume d\'Arabie Saoudite. Nous travaillons toute la semaine pour vous servir et répondre à vos besoins.',
    contactInfo: {
      address: 'Adresse:',
      addressValue: 'Arabie Saoudite, Riyad',
      phone: 'Téléphone:',
      email: 'Email:',
      emailValue: 'ruknalnakhil@gmail.com',
      hours: 'Heures de Travail:',
      hoursValue: 'Nous travaillons toute la semaine',
    },
  },
};
