import { LanguageCode } from '@/lib/languages';

export const servicesContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbServices: string;
  pageTitle: string;
  pageSubtitle: string;
  readMore: string;
  services: {
    pestControl: { title: string; description: string };
    disinfection: { title: string; description: string };
    paints: { title: string; description: string };
    acMaintenance: { title: string; description: string };
    waterfalls: { title: string; description: string };
    pools: { title: string; description: string };
    restoration: { title: string; description: string };
  };
  reviews: {
    title: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      text: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbServices: 'الخدمات',
    pageTitle: 'الخدمات',
    pageSubtitle: 'نقدم مجموعة شاملة من الخدمات عالية الجودة لتلبية جميع احتياجاتك',
    readMore: 'اقرأ المزيد',
    services: {
      pestControl: {
        title: 'مكافحة الحشرات',
        description: 'نقدم خدمات ابادة الحشرات في الرياض بأعلى مستويات الجودة والفعالية.',
      },
      disinfection: {
        title: 'تعقيم ضد الفيروسات',
        description: 'خلال خدمة التطهير والتنظيف لدينا، نمنع انتشار فيروس كورونا',
      },
      paints: {
        title: 'دهانات وديكورات',
        description: 'دائمًا في أيدي أفضل المحترفين.',
      },
      acMaintenance: {
        title: 'صيانة المكيفات',
        description: 'ركن النخيل متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء والتبريد المنزلية والصناعية والمكتبية',
      },
      waterfalls: {
        title: 'تصميم وانشاء الشلالات والنوافير',
        description: 'تصميم وإنشاء الشلالات والنوافير في الرياض، تجتمع الخبرة والتكنولوجيا معًا لإنشاء نوافير تدهش وتثير الإثارة',
      },
      pools: {
        title: 'إنشاء وصيانة المسابح',
        description: 'توفير خدمة صيانة وتنظيف شاملة للمسبح على مدار العام تشمل الصيانة والإنشاء والمشورة',
      },
      restoration: {
        title: 'الترميم الداخلي والخارجي',
        description: 'أفضل شركة ترميم منازل وفلل بالرياض نقوم بالترميم الداخلي والخارجي للمنزل بجودة وكفاءة عالية',
      },
    },
    reviews: {
      title: 'أفضل مراجعة',
      subtitle: 'نحن سعداء للغاية للحصول على مراجعة جيدة. نحن نقدر التجريب وإصلاح الرسالة والحوافز الذكية.',
      reviews: [
        {
          name: 'سعد',
          text: 'انا جربتهم بصراحة ممتازين جدا جدا ناس فعلا مدربين ونظافة و أمانة ويكفى انهم تابع لشركة معروف عنوانها بجد شكرا',
        },
        {
          name: 'سالم',
          text: 'انا بشكركم جدا علي مستوي الخدمه في تنظيف المفروشات وكمان الالتزام بالمواعيد والاحترام في التعامل .. بجد حاجه فوق الممتاز وان شاء الله مش هتكون اخر مره ليا ولكل عيلتي .',
        },
        {
          name: 'علي',
          text: 'لكم منى جزيل اﻻحترام والتقدير لمجهوداتكم 👏👏👏👏',
        },
        {
          name: 'صالح',
          text: 'انا طلبت منهم خدمة فنى تكييف وجه حد محترم جدا وهما محترمين جدا وبيتابعوا معاكى',
        },
      ],
    },
    cta: {
      title: 'هل تحتاج إلى مساعدة في اختيار الخدمة المناسبة؟',
      subtitle: 'يمكنك إرسال رسالة على الواتساب واستقبال عرض سعر مخصص لك',
      button: 'اتصل بنا الآن',
    },
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Services',
    pageTitle: 'Services',
    pageSubtitle: 'We provide a comprehensive range of high-quality services to meet all your needs',
    readMore: 'Read More',
    services: {
      pestControl: {
        title: 'Pest Control',
        description: 'We provide pest extermination services in Riyadh with the highest levels of quality and effectiveness.',
      },
      disinfection: {
        title: 'Disinfection Against Viruses',
        description: 'Through our disinfection and cleaning service, we prevent the spread of the Corona virus',
      },
      paints: {
        title: 'Paints and Decorations',
        description: 'Always in the hands of the best professionals.',
      },
      acMaintenance: {
        title: 'Air Conditioner Maintenance',
        description: 'Rukn Al-Nakheel specializes in installing, repairing and maintaining residential, industrial and office air conditioning and cooling systems',
      },
      waterfalls: {
        title: 'Waterfalls and Fountains Design',
        description: 'Design and construction of waterfalls and fountains in Riyadh, where experience and technology come together to create fountains that amaze and excite',
      },
      pools: {
        title: 'Swimming Pools Construction & Maintenance',
        description: 'Providing comprehensive pool maintenance and cleaning services throughout the year, including maintenance, construction and consultation',
      },
      restoration: {
        title: 'Interior & Exterior Restoration',
        description: 'The best home and villa restoration company in Riyadh, we carry out internal and external home restoration with high quality and efficiency',
      },
    },
    reviews: {
      title: 'Best Reviews',
      subtitle: 'We are very happy to get a good review. We appreciate experimentation, message repair and smart incentives.',
      reviews: [
        {
          name: 'Saad',
          text: 'I tried them honestly, they are excellent, really trained people, cleanliness and honesty, and it is enough that they belong to a well-known company with a known address, really thank you',
        },
        {
          name: 'Salem',
          text: 'I thank you very much for the level of service in cleaning furniture and also commitment to appointments and respect in dealing... really something above excellent and God willing, it will not be the last time for me and for all my family.',
        },
        {
          name: 'Ali',
          text: 'To you from me, great respect and appreciation for your efforts 👏👏👏👏',
        },
        {
          name: 'Saleh',
          text: 'I requested an air conditioning technician service from them and met a very professional person, and they are very professional and follow up with you',
        },
      ],
    },
    cta: {
      title: 'Do You Need Help Choosing the Right Service?',
      subtitle: 'You can send a message on WhatsApp and receive a customized price quote',
      button: 'Contact Us Now',
    },
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbServices: 'Serviços',
    pageTitle: 'Serviços',
    pageSubtitle: 'Fornecemos uma gama abrangente de serviços de alta qualidade para atender todas as suas necessidades',
    readMore: 'Ler Mais',
    services: {
      pestControl: {
        title: 'Controle de Pragas',
        description: 'Fornecemos serviços de extermínio de pragas em Riade com os mais altos níveis de qualidade e eficácia.',
      },
      disinfection: {
        title: 'Desinfecção Contra Vírus',
        description: 'Através do nosso serviço de desinfecção e limpeza, prevenimos a propagação do vírus Corona',
      },
      paints: {
        title: 'Tintas e Decorações',
        description: 'Sempre nas mãos dos melhores profissionais.',
      },
      acMaintenance: {
        title: 'Manutenção de Ar Condicionado',
        description: 'Rukn Al-Nakheel é especializada em instalação, reparo e manutenção de sistemas de ar condicionado e refrigeração residenciais, industriais e comerciais',
      },
      waterfalls: {
        title: 'Design de Cascatas e Fontes',
        description: 'Design e construção de cascatas e fontes em Riade, onde experiência e tecnologia se unem para criar fontes que impressionam e emocionam',
      },
      pools: {
        title: 'Construção e Manutenção de Piscinas',
        description: 'Fornecendo serviços abrangentes de manutenção e limpeza de piscinas durante todo o ano, incluindo manutenção, construção e consultoria',
      },
      restoration: {
        title: 'Restauração Interior e Exterior',
        description: 'A melhor empresa de restauração de casas e vilas em Riade, realizamos restauração interna e externa de casas com alta qualidade e eficiência',
      },
    },
    reviews: {
      title: 'Melhores Avaliações',
      subtitle: 'Estamos muito felizes em receber uma boa avaliação. Apreciamos experimentação, reparo de mensagens e incentivos inteligentes.',
      reviews: [
        {
          name: 'Saad',
          text: 'Eu os experimentei honestamente, eles são excelentes, pessoas realmente treinadas, limpeza e honestidade, e é suficiente que pertençam a uma empresa conhecida com um endereço conhecido, realmente obrigado',
        },
        {
          name: 'Salem',
          text: 'Agradeço muito pelo nível de serviço na limpeza de móveis e também pelo compromisso com os compromissos e respeito no tratamento... realmente algo acima do excelente e, se Deus quiser, não será a última vez para mim e para toda a minha família.',
        },
        {
          name: 'Ali',
          text: 'Para você de mim, grande respeito e apreciação por seus esforços 👏👏👏👏',
        },
        {
          name: 'Saleh',
          text: 'Solicitei um serviço de técnico de ar condicionado deles e conheci uma pessoa muito profissional, e eles são muito profissionais e acompanham você',
        },
      ],
    },
    cta: {
      title: 'Você Precisa de Ajuda para Escolher o Serviço Certo?',
      subtitle: 'Você pode enviar uma mensagem no WhatsApp e receber uma cotação de preço personalizada',
      button: 'Entre em Contato Agora',
    },
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbServices: '服务',
    pageTitle: '服务',
    pageSubtitle: '我们提供全面的高质量服务以满足您的所有需求',
    readMore: '阅读更多',
    services: {
      pestControl: {
        title: '害虫防治',
        description: '我们在利雅得以最高质量和有效性提供害虫消灭服务。',
      },
      disinfection: {
        title: '病毒消毒',
        description: '通过我们的消毒和清洁服务，我们防止冠状病毒的传播',
      },
      paints: {
        title: '油漆和装饰',
        description: '始终掌握在最优秀的专业人士手中。',
      },
      acMaintenance: {
        title: '空调维护',
        description: '棕榈角专门从事住宅、工业和办公空调和制冷系统的安装、维修和维护',
      },
      waterfalls: {
        title: '瀑布和喷泉设计',
        description: '在利雅得设计和建造瀑布和喷泉，经验和技术相结合，创造出令人惊叹和兴奋的喷泉',
      },
      pools: {
        title: '游泳池建造和维护',
        description: '全年提供全面的游泳池维护和清洁服务，包括维护、建造和咨询',
      },
      restoration: {
        title: '内外修复',
        description: '利雅得最好的房屋和别墅修复公司，我们以高质量和效率进行房屋的内部和外部修复',
      },
    },
    reviews: {
      title: '最佳评价',
      subtitle: '我们很高兴获得好评。我们赞赏实验、信息修复和智能激励。',
      reviews: [
        {
          name: '萨阿德',
          text: '我诚实地尝试了他们，他们非常优秀，真正训练有素的人员，清洁和诚实，他们属于一家知名公司，地址已知，真的谢谢',
        },
        {
          name: '萨利姆',
          text: '我非常感谢您在清洁家具方面的服务水平，以及遵守预约和尊重处理...真的超出了优秀，如果上帝愿意，这不会是我和我所有家人的最后一次。',
        },
        {
          name: '阿里',
          text: '向您致以我最大的尊重和感谢您的努力 👏👏👏👏',
        },
        {
          name: '萨利赫',
          text: '我向他们请求了空调技术员服务，遇到了一个非常专业的人，他们非常专业并会跟进您',
        },
      ],
    },
    cta: {
      title: '您需要帮助选择正确的服务吗？',
      subtitle: '您可以在WhatsApp上发送消息并接收定制价格报价',
      button: '立即联系我们',
    },
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbServices: 'サービス',
    pageTitle: 'サービス',
    pageSubtitle: 'すべてのニーズを満たす包括的な高品質サービスを提供します',
    readMore: '続きを読む',
    services: {
      pestControl: {
        title: '害虫駆除',
        description: 'リヤドで最高レベルの品質と有効性で害虫駆除サービスを提供しています。',
      },
      disinfection: {
        title: 'ウイルス消毒',
        description: '消毒と清掃サービスを通じて、コロナウイルスの拡散を防ぎます',
      },
      paints: {
        title: '塗装と装飾',
        description: '常に最高の専門家の手に。',
      },
      acMaintenance: {
        title: 'エアコン保守',
        description: 'ルクン・アルナキールは、住宅、産業、オフィスの空調および冷却システムの設置、修理、保守を専門としています',
      },
      waterfalls: {
        title: '滝と噴水の設計',
        description: 'リヤドでの滝と噴水の設計と建設、経験と技術が融合して驚きと興奮を呼ぶ噴水を作り出します',
      },
      pools: {
        title: 'プール建設と保守',
        description: '保守、建設、コンサルティングを含む年間を通じた包括的なプール保守と清掃サービスを提供',
      },
      restoration: {
        title: '内外装修復',
        description: 'リヤドで最高の住宅および別荘改築会社、高品質と効率で住宅の内部および外部改築を実施',
      },
    },
    reviews: {
      title: '最高のレビュー',
      subtitle: '良いレビューをいただき、大変嬉しく思います。実験、メッセージ修復、スマートなインセンティブに感謝します。',
      reviews: [
        {
          name: 'サアド',
          text: '正直に試してみましたが、彼らは優秀で、本当に訓練された人々、清潔さと誠実さ、そして既知の住所を持つよく知られた会社に属しているだけで十分です、本当にありがとう',
        },
        {
          name: 'サレム',
          text: '家具の清掃におけるサービスのレベル、約束の遵守、扱いにおける尊重について、本当に感謝しています...本当に優秀を超えたもので、神が望むなら、それは私と私の家族全員にとって最後の時間ではありません。',
        },
        {
          name: 'アリ',
          text: 'あなたへの私からの最大の敬意と感謝 👏👏👏👏',
        },
        {
          name: 'サレハ',
          text: 'エアコンの技術者サービスを依頼し、非常にプロフェッショナルな人に会い、彼らは非常にプロフェッショナルで、あなたをフォローアップします',
        },
      ],
    },
    cta: {
      title: '適切なサービスを選択するのに助けが必要ですか？',
      subtitle: 'WhatsAppでメッセージを送信し、カスタマイズされた価格見積もりを受信できます',
      button: '今すぐお問い合わせ',
    },
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbServices: 'Dienstleistungen',
    pageTitle: 'Dienstleistungen',
    pageSubtitle: 'Wir bieten eine umfassende Palette hochwertiger Dienstleistungen, um alle Ihre Bedürfnisse zu erfüllen',
    readMore: 'Mehr Lesen',
    services: {
      pestControl: {
        title: 'Schädlingsbekämpfung',
        description: 'Wir bieten Schädlingsvernichtungsdienste in Riad mit den höchsten Qualitäts- und Effektivitätsniveaus.',
      },
      disinfection: {
        title: 'Desinfektion gegen Viren',
        description: 'Durch unseren Desinfektions- und Reinigungsservice verhindern wir die Ausbreitung des Corona-Virus',
      },
      paints: {
        title: 'Farben und Dekorationen',
        description: 'Immer in den Händen der besten Fachleute.',
      },
      acMaintenance: {
        title: 'Klimaanlagenwartung',
        description: 'Rukn Al-Nakheel ist spezialisiert auf die Installation, Reparatur und Wartung von Wohn-, Industrie- und Büroklima- und Kühlsystemen',
      },
      waterfalls: {
        title: 'Wasserfall- und Brunnendesign',
        description: 'Design und Bau von Wasserfällen und Brunnen in Riad, wo Erfahrung und Technologie zusammenkommen, um Brunnen zu schaffen, die erstaunen und begeistern',
      },
      pools: {
        title: 'Schwimmbadbau und -wartung',
        description: 'Bereitstellung umfassender Schwimmbadwartungs- und Reinigungsdienste das ganze Jahr über, einschließlich Wartung, Bau und Beratung',
      },
      restoration: {
        title: 'Innen- und Außenrestaurierung',
        description: 'Das beste Haus- und Villenrenovierungsunternehmen in Riad, wir führen interne und externe Hausrenovierungen mit hoher Qualität und Effizienz durch',
      },
    },
    reviews: {
      title: 'Beste Bewertungen',
      subtitle: 'Wir sind sehr glücklich, eine gute Bewertung zu erhalten. Wir schätzen Experimente, Nachrichtenreparatur und intelligente Anreize.',
      reviews: [
        {
          name: 'Saad',
          text: 'Ich habe sie ehrlich ausprobiert, sie sind ausgezeichnet, wirklich geschulte Menschen, Sauberkeit und Ehrlichkeit, und es reicht aus, dass sie zu einem bekannten Unternehmen mit einer bekannten Adresse gehören, wirklich danke',
        },
        {
          name: 'Salem',
          text: 'Ich danke Ihnen sehr für das Serviceniveau bei der Möbelreinigung und auch für die Einhaltung von Terminen und Respekt im Umgang... wirklich etwas über dem Ausgezeichneten und wenn Gott will, wird es nicht das letzte Mal für mich und für meine ganze Familie sein.',
        },
        {
          name: 'Ali',
          text: 'An Sie von mir, großer Respekt und Wertschätzung für Ihre Bemühungen 👏👏👏👏',
        },
        {
          name: 'Saleh',
          text: 'Ich habe einen Klimaanlagentechnikerservice von ihnen angefordert und eine sehr professionelle Person getroffen, und sie sind sehr professionell und folgen Ihnen',
        },
      ],
    },
    cta: {
      title: 'Benötigen Sie Hilfe bei der Auswahl des richtigen Dienstes?',
      subtitle: 'Sie können eine Nachricht auf WhatsApp senden und ein personalisiertes Preisangebot erhalten',
      button: 'Jetzt Kontaktieren',
    },
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbServices: 'Services',
    pageTitle: 'Services',
    pageSubtitle: 'Nous fournissons une gamme complète de services de haute qualité pour répondre à tous vos besoins',
    readMore: 'Lire Plus',
    services: {
      pestControl: {
        title: 'Lutte contre les Nuisibles',
        description: 'Nous fournissons des services d\'extermination de nuisibles à Riyad avec les plus hauts niveaux de qualité et d\'efficacité.',
      },
      disinfection: {
        title: 'Désinfection contre les Virus',
        description: 'Grâce à notre service de désinfection et de nettoyage, nous empêchons la propagation du virus Corona',
      },
      paints: {
        title: 'Peintures et Décoration',
        description: 'Toujours entre les mains des meilleurs professionnels.',
      },
      acMaintenance: {
        title: 'Maintenance Climatisation',
        description: 'Rukn Al-Nakheel est spécialisée dans l\'installation, la réparation et la maintenance de systèmes de climatisation et de refroidissement résidentiels, industriels et de bureau',
      },
      waterfalls: {
        title: 'Conception de Cascades et Fontaines',
        description: 'Conception et construction de cascades et fontaines à Riyad, où l\'expérience et la technologie se réunissent pour créer des fontaines qui étonnent et excitent',
      },
      pools: {
        title: 'Construction et Maintenance de Piscines',
        description: 'Fourniture de services complets de maintenance et de nettoyage de piscines tout au long de l\'année, y compris la maintenance, la construction et la consultation',
      },
      restoration: {
        title: 'Restauration Intérieure et Extérieure',
        description: 'La meilleure entreprise de rénovation de maisons et villas à Riyad, nous effectuons la rénovation interne et externe des maisons avec une qualité et une efficacité élevées',
      },
    },
    reviews: {
      title: 'Meilleures Avis',
      subtitle: 'Nous sommes très heureux d\'obtenir un bon avis. Nous apprécions l\'expérimentation, la réparation des messages et les incitations intelligentes.',
      reviews: [
        {
          name: 'Saad',
          text: 'Je les ai essayés honnêtement, ils sont excellents, des personnes vraiment formées, la propreté et l\'honnêteté, et il suffit qu\'ils appartiennent à une entreprise bien connue avec une adresse connue, vraiment merci',
        },
        {
          name: 'Salem',
          text: 'Je vous remercie beaucoup pour le niveau de service dans le nettoyage des meubles et aussi l\'engagement aux rendez-vous et le respect dans le traitement... vraiment quelque chose au-dessus de l\'excellent et si Dieu le veut, ce ne sera pas la dernière fois pour moi et pour toute ma famille.',
        },
        {
          name: 'Ali',
          text: 'À vous de ma part, grand respect et appréciation pour vos efforts 👏👏👏👏',
        },
        {
          name: 'Saleh',
          text: 'J\'ai demandé un service de technicien en climatisation et j\'ai rencontré une personne très professionnelle, et ils sont très professionnels et vous suivent',
        },
      ],
    },
    cta: {
      title: 'Avez-vous Besoin d\'Aide pour Choisir le Bon Service?',
      subtitle: 'Vous pouvez envoyer un message sur WhatsApp et recevoir un devis personnalisé',
      button: 'Contactez-nous Maintenant',
    },
  },
};
