import { LanguageCode } from '@/lib/languages';

export const servicesTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  services: {
    disinfection: { title: string; description: string };
    paints: { title: string; description: string };
    acMaintenance: { title: string; description: string };
    renovation: { title: string; description: string };
    pools: { title: string; description: string };
    waterfalls: { title: string; description: string };
    pestControl: { title: string; description: string };
  };
  cta: string;
}> = {
  ar: {
    title: 'كافة الخدمات',
    subtitle: 'اطلع خدمات منزلك بأقل من دقيقة وأبشر',
    services: {
      disinfection: {
        title: 'تعقيم ضد الفيروسات',
        description: 'نعمل على تعقيم وتطهير الأماكن الداخلية والخارجية ضد الأمراض والفيروسات بمستوى أوروبي كمطهر يقضي على فيروس الكورونا ومسجل في وزارة الصحة',
      },
      paints: {
        title: 'دهانات وديكورات',
        description: 'شركة ركن النخيل للديكور والدهانات بالرياض تعد من أفضل الشركات في تقديم أعمال كل من الديكورات والدهانات لجميع المنشآت والمنازل والفلل',
      },
      acMaintenance: {
        title: 'صيانة المكيفات',
        description: 'صيانة مكيفات فريق صيانة جاهز ومدرب على أعلى مستوى ضمان كامل على الصيانة وقطع الغيار أفضل العروض والأسعار',
      },
      renovation: {
        title: 'ترميم منازل',
        description: 'أفضل شركة ترميم منازل وفلل بالرياض نقوم بالترميم الداخلي والخارجي للمنزل بجودة وكفاءة عالية',
      },
      pools: {
        title: 'إنشاء وصيانة المسابح',
        description: 'تعتبر شركتنا الرائدة والأولى في إنشاء وتصميم وصيانة المسابح بالمملكة العربية السعودية',
      },
      waterfalls: {
        title: 'إنشاء الشلالات والنوافير',
        description: 'خدمة تصميم النوافير العصرية والحديثة والمزودة بكافة الكماليات التي تحتاج إليها خدمة تصميم جميع أنواع الشلالات ووضعها في أي مكان يريده العميل',
      },
      pestControl: {
        title: 'مكافحة الحشرات',
        description: 'في شركة ركن النخيل، نقدم خدمات إبادة الحشرات في الرياض بأعلى مستويات الجودة والفعالية. نعتمد على تقنيات حديثة في عملياتنا لضمان تخليصكم من الحشرات بشكل دائم',
      },
    },
    cta: 'اطلب الخدمة',
  },
  en: {
    title: 'All Services',
    subtitle: 'Browse your home services in less than a minute',
    services: {
      disinfection: {
        title: 'Disinfection Against Viruses',
        description: 'We work on disinfecting and sterilizing indoor and outdoor areas against diseases and viruses at a European level as a disinfectant that eliminates the Corona virus and is registered with the Ministry of Health',
      },
      paints: {
        title: 'Paints and Decorations',
        description: 'Rukn Al-Nakheel Company for Decoration and Paints in Riyadh is one of the best companies in providing both decoration and painting works for all facilities, homes and villas',
      },
      acMaintenance: {
        title: 'Air Conditioner Maintenance',
        description: 'Air conditioner maintenance with a ready and highly trained maintenance team, full warranty on maintenance and spare parts, best offers and prices',
      },
      renovation: {
        title: 'Home Renovation',
        description: 'The best home and villa renovation company in Riyadh, we carry out internal and external home renovation with high quality and efficiency',
      },
      pools: {
        title: 'Swimming Pools Construction & Maintenance',
        description: 'Our company is the leading and first in the construction, design and maintenance of swimming pools in the Kingdom of Saudi Arabia',
      },
      waterfalls: {
        title: 'Waterfalls and Fountains Construction',
        description: 'Modern and contemporary fountain design service equipped with all the amenities you need, service for designing all types of waterfalls and placing them anywhere the customer wants',
      },
      pestControl: {
        title: 'Pest Control',
        description: 'At Rukn Al-Nakheel Company, we provide pest extermination services in Riyadh with the highest levels of quality and effectiveness. We rely on modern techniques in our operations to ensure permanent elimination of pests',
      },
    },
    cta: 'Request Service',
  },
  pt: {
    title: 'Todos os Serviços',
    subtitle: 'Navegue pelos serviços da sua casa em menos de um minuto',
    services: {
      disinfection: {
        title: 'Desinfecção Contra Vírus',
        description: 'Trabalhamos na desinfecção e esterilização de áreas internas e externas contra doenças e vírus em nível europeu como desinfetante que elimina o vírus Corona e está registrado no Ministério da Saúde',
      },
      paints: {
        title: 'Tintas e Decorações',
        description: 'A empresa Rukn Al-Nakheel de Decoração e Tintas em Riade é uma das melhores empresas em fornecer trabalhos de decoração e pintura para todas as instalações, casas e vilas',
      },
      acMaintenance: {
        title: 'Manutenção de Ar Condicionado',
        description: 'Manutenção de ar condicionado com equipe de manutenção pronta e altamente treinada, garantia completa em manutenção e peças de reposição, melhores ofertas e preços',
      },
      renovation: {
        title: 'Renovação de Casas',
        description: 'A melhor empresa de renovação de casas e vilas em Riade, realizamos renovação interna e externa de casas com alta qualidade e eficiência',
      },
      pools: {
        title: 'Construção e Manutenção de Piscinas',
        description: 'Nossa empresa é líder e primeira na construção, design e manutenção de piscinas no Reino da Arábia Saudita',
      },
      waterfalls: {
        title: 'Construção de Cascatas e Fontes',
        description: 'Serviço de design de fontes modernas e contemporâneas equipado com todas as comodidades que você precisa, serviço para projetar todos os tipos de cascatas e colocá-las em qualquer lugar que o cliente desejar',
      },
      pestControl: {
        title: 'Controle de Pragas',
        description: 'Na empresa Rukn Al-Nakheel, fornecemos serviços de extermínio de pragas em Riade com os mais altos níveis de qualidade e eficácia. Confiamos em técnicas modernas em nossas operações para garantir a eliminação permanente de pragas',
      },
    },
    cta: 'Solicitar Serviço',
  },
  zh: {
    title: '所有服务',
    subtitle: '在不到一分钟的时间内浏览您的家庭服务',
    services: {
      disinfection: {
        title: '病毒消毒',
        description: '我们以欧洲标准对室内和室外区域进行消毒和灭菌，以对抗疾病和病毒，作为消除冠状病毒的消毒剂，并在卫生部注册',
      },
      paints: {
        title: '油漆和装饰',
        description: '利雅得的棕榈角装饰和油漆公司是为所有设施、住宅和别墅提供装饰和油漆工作的最佳公司之一',
      },
      acMaintenance: {
        title: '空调维护',
        description: '空调维护，拥有准备充分且训练有素的维护团队，对维护和备件提供全面保修，最佳报价和价格',
      },
      renovation: {
        title: '房屋翻新',
        description: '利雅得最好的房屋和别墅翻新公司，我们以高质量和效率进行房屋的内部和外部翻新',
      },
      pools: {
        title: '游泳池建造和维护',
        description: '我们公司是沙特阿拉伯王国游泳池建造、设计和维护的领先和第一公司',
      },
      waterfalls: {
        title: '瀑布和喷泉建造',
        description: '现代和当代喷泉设计服务，配备您所需的所有便利设施，设计各种类型瀑布并将其放置在客户想要的任何地方的服务',
      },
      pestControl: {
        title: '害虫防治',
        description: '在棕榈角公司，我们在利雅得提供最高质量和有效性的害虫消灭服务。我们在运营中依靠现代技术来确保永久消除害虫',
      },
    },
    cta: '请求服务',
  },
  ja: {
    title: 'すべてのサービス',
    subtitle: '1分以内でホームサービスを閲覧',
    services: {
      disinfection: {
        title: 'ウイルス消毒',
        description: 'ヨーロッパレベルで、コロナウイルスを排除する消毒剤として、疾病やウイルスに対して屋内および屋外エリアを消毒および滅菌し、保健省に登録されています',
      },
      paints: {
        title: '塗装と装飾',
        description: 'リヤドのルクン・アルナキール装飾および塗装会社は、すべての施設、住宅、別荘に装飾と塗装の両方の作業を提供する最高の会社の一つです',
      },
      acMaintenance: {
        title: 'エアコン保守',
        description: '準備が整い、高度に訓練された保守チームによるエアコン保守、保守とスペアパーツの完全な保証、最高のオファーと価格',
      },
      renovation: {
        title: '住宅改築',
        description: 'リヤドで最高の住宅および別荘改築会社、高品質と効率で住宅の内部および外部改築を実施',
      },
      pools: {
        title: 'プール建設と保守',
        description: '当社はサウジアラビア王国でプールの建設、設計、保守においてリーディングで最初の会社です',
      },
      waterfalls: {
        title: '滝と噴水の建設',
        description: '必要なすべての設備を備えたモダンで現代的な噴水デザインサービス、あらゆる種類の滝を設計し、顧客が望む場所に配置するサービス',
      },
      pestControl: {
        title: '害虫駆除',
        description: 'ルクン・アルナキール会社では、リヤドで最高レベルの品質と有効性で害虫駆除サービスを提供しています。運用で現代技術に依存し、害虫の永久的な排除を保証します',
      },
    },
    cta: 'サービスをリクエスト',
  },
  de: {
    title: 'Alle Dienstleistungen',
    subtitle: 'Durchsuchen Sie Ihre Hausdienste in weniger als einer Minute',
    services: {
      disinfection: {
        title: 'Desinfektion gegen Viren',
        description: 'Wir arbeiten an der Desinfektion und Sterilisierung von Innen- und Außenbereichen gegen Krankheiten und Viren auf europäischem Niveau als Desinfektionsmittel, das das Corona-Virus eliminiert und beim Gesundheitsministerium registriert ist',
      },
      paints: {
        title: 'Farben und Dekorationen',
        description: 'Die Rukn Al-Nakheel Firma für Dekoration und Farben in Riad ist eine der besten Firmen bei der Bereitstellung von Dekorations- und Malarbeiten für alle Einrichtungen, Häuser und Villen',
      },
      acMaintenance: {
        title: 'Klimaanlagenwartung',
        description: 'Klimaanlagenwartung mit einem bereiten und hochqualifizierten Wartungsteam, vollständige Garantie auf Wartung und Ersatzteile, beste Angebote und Preise',
      },
      renovation: {
        title: 'Hausrenovierung',
        description: 'Das beste Haus- und Villenrenovierungsunternehmen in Riad, wir führen interne und externe Hausrenovierungen mit hoher Qualität und Effizienz durch',
      },
      pools: {
        title: 'Schwimmbadbau und -wartung',
        description: 'Unser Unternehmen ist führend und das erste im Bau, Design und der Wartung von Schwimmbädern im Königreich Saudi-Arabien',
      },
      waterfalls: {
        title: 'Wasserfall- und Brunnenbau',
        description: 'Moderner und zeitgenössischer Brunnendesign-Service mit allen Annehmlichkeiten, die Sie benötigen, Service zum Entwerfen aller Arten von Wasserfällen und zum Platzieren an jedem Ort, den der Kunde wünscht',
      },
      pestControl: {
        title: 'Schädlingsbekämpfung',
        description: 'Bei der Rukn Al-Nakheel Firma bieten wir Schädlingsvernichtungsdienste in Riad mit den höchsten Qualitäts- und Effektivitätsniveaus. Wir verlassen uns auf moderne Techniken in unseren Operationen, um eine dauerhafte Beseitigung von Schädlingen zu gewährleisten',
      },
    },
    cta: 'Service Anfordern',
  },
  fr: {
    title: 'Tous les Services',
    subtitle: 'Parcourez les services de votre maison en moins d\'une minute',
    services: {
      disinfection: {
        title: 'Désinfection contre les Virus',
        description: 'Nous travaillons à la désinfection et à la stérilisation des zones intérieures et extérieures contre les maladies et les virus au niveau européen comme désinfectant qui élimine le virus Corona et est enregistré auprès du ministère de la Santé',
      },
      paints: {
        title: 'Peintures et Décoration',
        description: 'La société Rukn Al-Nakheel pour la Décoration et les Peintures à Riyad est l\'une des meilleures sociétés dans la fourniture de travaux de décoration et de peinture pour toutes les installations, maisons et villas',
      },
      acMaintenance: {
        title: 'Maintenance Climatisation',
        description: 'Maintenance de climatisation avec une équipe de maintenance prête et hautement formée, garantie complète sur la maintenance et les pièces de rechange, meilleures offres et prix',
      },
      renovation: {
        title: 'Rénovation de Maisons',
        description: 'La meilleure entreprise de rénovation de maisons et villas à Riyad, nous effectuons la rénovation interne et externe des maisons avec une qualité et une efficacité élevées',
      },
      pools: {
        title: 'Construction et Maintenance de Piscines',
        description: 'Notre entreprise est leader et première dans la construction, la conception et la maintenance de piscines au Royaume d\'Arabie Saoudite',
      },
      waterfalls: {
        title: 'Construction de Cascades et Fontaines',
        description: 'Service de conception de fontaines modernes et contemporaines équipé de tous les équipements dont vous avez besoin, service pour concevoir tous les types de cascades et les placer n\'importe où le client le souhaite',
      },
      pestControl: {
        title: 'Lutte contre les Nuisibles',
        description: 'Chez la société Rukn Al-Nakheel, nous fournissons des services d\'extermination de nuisibles à Riyad avec les plus hauts niveaux de qualité et d\'efficacité. Nous nous appuyons sur des techniques modernes dans nos opérations pour assurer l\'élimination permanente des nuisibles',
      },
    },
    cta: 'Demander un Service',
  },
};
