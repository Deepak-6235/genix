import { LanguageCode } from '@/lib/languages';

export const blogContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  pageTitle: string;
  readMore: string;
  posts: Array<{
    title: string;
    date: string;
    excerpt: string;
  }>;
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbBlog: 'المدونة',
    pageTitle: 'المدونة',
    readMore: 'اقرأ المزيد',
    posts: [
      {
        title: 'أفضل شركات تنظيف منازل في الرياض',
        date: 'أبريل 9, 2022',
        excerpt: 'دليل شامل لأفضل شركات التنظيف في الرياض مع نصائح لاختيار الشركة المناسبة لاحتياجاتك.',
      },
      {
        title: 'شركة ركن النخيل لتصميم شلالات جدارية',
        date: 'أبريل 7, 2022',
        excerpt: 'اكتشف كيف يمكن لشلالات جدارية أن تضيف لمسة جمالية فريدة لمنزلك أو مكتبك.',
      },
      {
        title: 'شركة تصليح مكيف سبلت بالرياض',
        date: 'أبريل 6, 2022',
        excerpt: 'دليل شامل لصيانة وإصلاح مكيفات السبليت مع أهم النصائح للحفاظ على كفاءة المكيف.',
      },
      {
        title: 'اشهر شركات الدهانات بالرياض باحدث التقنيات المستخدمه',
        date: 'أبريل 4, 2022',
        excerpt: 'تعرف على أحدث تقنيات الدهانات والديكورات المستخدمة في الرياض وأهم الاتجاهات الحديثة.',
      },
      {
        title: 'التعرف على كيفية تصليح مكيفات سبليت واكثر المشاكل شيوعاً',
        date: 'أبريل 4, 2022',
        excerpt: 'دليل شامل لأكثر مشاكل مكيفات السبليت شيوعاً وكيفية إصلاحها بطرق احترافية.',
      },
      {
        title: 'شركة عزل الاسطح بالاسمنت الأبيض بأفضل الاسعار',
        date: 'أبريل 3, 2022',
        excerpt: 'كل ما تحتاج معرفته عن عزل الأسطح بالأسمنت الأبيض وأهميته في حماية المباني.',
      },
    ],
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Read More',
    posts: [
      {
        title: 'Best Home Cleaning Companies in Riyadh',
        date: 'April 9, 2022',
        excerpt: 'Comprehensive guide to the best cleaning companies in Riyadh with tips for choosing the right company for your needs.',
      },
      {
        title: 'Rukn Al-Nakheel Company for Wall Waterfall Design',
        date: 'April 7, 2022',
        excerpt: 'Discover how wall waterfalls can add a unique aesthetic touch to your home or office.',
      },
      {
        title: 'Split AC Repair Company in Riyadh',
        date: 'April 6, 2022',
        excerpt: 'Comprehensive guide to maintaining and repairing split air conditioners with the most important tips for maintaining AC efficiency.',
      },
      {
        title: 'Most Famous Paint Companies in Riyadh with Latest Technologies Used',
        date: 'April 4, 2022',
        excerpt: 'Learn about the latest paint and decoration technologies used in Riyadh and the most important modern trends.',
      },
      {
        title: 'Learn How to Repair Split ACs and Most Common Problems',
        date: 'April 4, 2022',
        excerpt: 'Comprehensive guide to the most common split AC problems and how to fix them professionally.',
      },
      {
        title: 'Roof Insulation Company with White Cement at Best Prices',
        date: 'April 3, 2022',
        excerpt: 'Everything you need to know about white cement roof insulation and its importance in protecting buildings.',
      },
    ],
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Ler Mais',
    posts: [
      {
        title: 'Melhores Empresas de Limpeza Doméstica em Riade',
        date: '09 de Abril de 2022',
        excerpt: 'Guia abrangente das melhores empresas de limpeza em Riade com dicas para escolher a empresa certa para suas necessidades.',
      },
      {
        title: 'Empresa Rukn Al-Nakheel para Design de Cascata de Parede',
        date: '07 de Abril de 2022',
        excerpt: 'Descubra como cascatas de parede podem adicionar um toque estético único à sua casa ou escritório.',
      },
      {
        title: 'Empresa de Reparo de Ar Condicionado Split em Riade',
        date: '06 de Abril de 2022',
        excerpt: 'Guia abrangente para manter e reparar aparelhos de ar condicionado split com as dicas mais importantes para manter a eficiência do AC.',
      },
      {
        title: 'Empresas de Tinta Mais Famosas em Riade com Últimas Tecnologias Usadas',
        date: '04 de Abril de 2022',
        excerpt: 'Saiba mais sobre as últimas tecnologias de tinta e decoração usadas em Riade e as tendências modernas mais importantes.',
      },
      {
        title: 'Aprenda Como Reparar ACs Split e Problemas Mais Comuns',
        date: '04 de Abril de 2022',
        excerpt: 'Guia abrangente para os problemas mais comuns de AC split e como consertá-los profissionalmente.',
      },
      {
        title: 'Empresa de Isolamento de Telhado com Cimento Branco a Melhores Preços',
        date: '03 de Abril de 2022',
        excerpt: 'Tudo o que você precisa saber sobre isolamento de telhado com cimento branco e sua importância na proteção de edifícios.',
      },
    ],
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbBlog: '博客',
    pageTitle: '博客',
    readMore: '阅读更多',
    posts: [
      {
        title: '利雅得最佳家庭清洁公司',
        date: '2022年4月9日',
        excerpt: '利雅得最佳清洁公司的综合指南，以及为您的需求选择合适公司的提示。',
      },
      {
        title: '棕榈角公司墙面瀑布设计',
        date: '2022年4月7日',
        excerpt: '了解墙面瀑布如何为您的家庭或办公室增添独特的美感。',
      },
      {
        title: '利雅得分体式空调维修公司',
        date: '2022年4月6日',
        excerpt: '维护和修理分体式空调的综合指南，以及保持空调效率的最重要提示。',
      },
      {
        title: '利雅得最著名的油漆公司，使用最新技术',
        date: '2022年4月4日',
        excerpt: '了解利雅得使用的最新油漆和装饰技术以及最重要的现代趋势。',
      },
      {
        title: '了解如何修理分体式空调和最常见的问题',
        date: '2022年4月4日',
        excerpt: '分体式空调最常见问题的综合指南以及如何专业地修复它们。',
      },
      {
        title: '以最佳价格提供白水泥屋顶隔热公司',
        date: '2022年4月3日',
        excerpt: '关于白水泥屋顶隔热及其在保护建筑物中的重要性，您需要了解的一切。',
      },
    ],
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbBlog: 'ブログ',
    pageTitle: 'ブログ',
    readMore: '続きを読む',
    posts: [
      {
        title: 'リヤドの最高の家庭清掃会社',
        date: '2022年4月9日',
        excerpt: 'リヤドの最高の清掃会社の包括的なガイドと、あなたのニーズに合った会社を選択するためのヒント。',
      },
      {
        title: '壁の滝デザインのルクン・アルナキール会社',
        date: '2022年4月7日',
        excerpt: '壁の滝があなたの家やオフィスに独特の美的タッチを追加する方法を発見してください。',
      },
      {
        title: 'リヤドのスプリットAC修理会社',
        date: '2022年4月6日',
        excerpt: 'AC効率を維持するための最も重要なヒントとともに、スプリットエアコンの維持と修理の包括的なガイド。',
      },
      {
        title: '最新技術を使用したリヤドで最も有名な塗装会社',
        date: '2022年4月4日',
        excerpt: 'リヤドで使用されている最新の塗装と装飾技術、および最も重要な現代のトレンドについて学びます。',
      },
      {
        title: 'スプリットACの修理方法と最も一般的な問題を学ぶ',
        date: '2022年4月4日',
        excerpt: '最も一般的なスプリットACの問題とそれらを専門的に修正する方法の包括的なガイド。',
      },
      {
        title: '最高の価格で白セメント屋根断熱会社',
        date: '2022年4月3日',
        excerpt: '白セメント屋根断熱と建物の保護におけるその重要性について知っておく必要があるすべて。',
      },
    ],
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Mehr Lesen',
    posts: [
      {
        title: 'Beste Hausreinigungsunternehmen in Riad',
        date: '09. April 2022',
        excerpt: 'Umfassender Leitfaden zu den besten Reinigungsunternehmen in Riad mit Tipps zur Auswahl des richtigen Unternehmens für Ihre Bedürfnisse.',
      },
      {
        title: 'Rukn Al-Nakheel Unternehmen für Wandwasserfall-Design',
        date: '07. April 2022',
        excerpt: 'Entdecken Sie, wie Wandwasserfälle Ihrem Zuhause oder Büro eine einzigartige ästhetische Note verleihen können.',
      },
      {
        title: 'Split-Klimaanlagen-Reparaturunternehmen in Riad',
        date: '06. April 2022',
        excerpt: 'Umfassender Leitfaden zur Wartung und Reparatur von Split-Klimaanlagen mit den wichtigsten Tipps zur Aufrechterhaltung der AC-Effizienz.',
      },
      {
        title: 'Berühmteste Farbunternehmen in Riad mit Neuesten Verwendeten Technologien',
        date: '04. April 2022',
        excerpt: 'Erfahren Sie mehr über die neuesten Farb- und Dekorationstechnologien, die in Riad verwendet werden, und die wichtigsten modernen Trends.',
      },
      {
        title: 'Erfahren Sie, Wie Sie Split-ACs Reparieren und Häufigste Probleme',
        date: '04. April 2022',
        excerpt: 'Umfassender Leitfaden zu den häufigsten Split-AC-Problemen und wie man sie professionell behebt.',
      },
      {
        title: 'Dachisolierungsunternehmen mit Weißzement zu Besten Preisen',
        date: '03. April 2022',
        excerpt: 'Alles, was Sie über Weißzement-Dachisolierung und ihre Bedeutung beim Schutz von Gebäuden wissen müssen.',
      },
    ],
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Lire Plus',
    posts: [
      {
        title: 'Meilleures Entreprises de Nettoyage Domestique à Riyad',
        date: '09 Avril 2022',
        excerpt: 'Guide complet des meilleures entreprises de nettoyage à Riyad avec des conseils pour choisir la bonne entreprise pour vos besoins.',
      },
      {
        title: 'Société Rukn Al-Nakheel pour la Conception de Cascades Murales',
        date: '07 Avril 2022',
        excerpt: 'Découvrez comment les cascades murales peuvent ajouter une touche esthétique unique à votre maison ou bureau.',
      },
      {
        title: 'Entreprise de Réparation de Climatiseur Split à Riyad',
        date: '06 Avril 2022',
        excerpt: 'Guide complet pour entretenir et réparer les climatiseurs split avec les conseils les plus importants pour maintenir l\'efficacité du climatiseur.',
      },
      {
        title: 'Entreprises de Peinture Les Plus Célèbres à Riyad avec Dernières Technologies Utilisées',
        date: '04 Avril 2022',
        excerpt: 'Découvrez les dernières technologies de peinture et de décoration utilisées à Riyad et les tendances modernes les plus importantes.',
      },
      {
        title: 'Apprenez Comment Réparer les Climatiseurs Split et Problèmes Les Plus Courants',
        date: '04 Avril 2022',
        excerpt: 'Guide complet des problèmes les plus courants des climatiseurs split et comment les réparer professionnellement.',
      },
      {
        title: 'Entreprise d\'Isolation de Toit avec Ciment Blanc aux Meilleurs Prix',
        date: '03 Avril 2022',
        excerpt: 'Tout ce que vous devez savoir sur l\'isolation de toit en ciment blanc et son importance dans la protection des bâtiments.',
      },
    ],
  },
};
