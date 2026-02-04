import { LanguageCode } from '@/lib/languages';

export const blogContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  pageTitle: string;
  readMore: string;
  commentsTitle: string;
  addComment: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  websiteLabel: string;
  websitePlaceholder: string;
  commentLabel: string;
  commentPlaceholder: string;
  submitComment: string;
  noCommentsYet: string;
  now: string;
  daysAgo: string;
  weekAgo: string;
  mockComments: Array<{
    blogId: number;
    comments: Array<{
      userName: string;
      comment: string;
      date: string;
    }>;
  }>;
  posts: Array<{
    title: string;
    date: string;
    excerpt: string;
    description: string;
  }>;
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbBlog: 'المدونة',
    pageTitle: 'المدونة',
    readMore: 'اقرأ المزيد',
    commentsTitle: 'التعليقات',
    addComment: 'أضف تعليقاً',
    nameLabel: 'الاسم',
    namePlaceholder: 'أدخل اسمك',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    websiteLabel: 'الموقع الإلكتروني',
    websitePlaceholder: 'أدخل موقعك الإلكتروني (اختياري)',
    commentLabel: 'التعليق',
    commentPlaceholder: 'أدخل تعليقك هنا...',
    submitComment: 'إرسال التعليق',
    noCommentsYet: 'لا توجد تعليقات بعد. كن أول من يعلق!',
    now: 'الآن',
    daysAgo: 'منذ',
    weekAgo: 'منذ أسبوع',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "أحمد محمد", comment: "مقال رائع ومفيد جداً. شكراً على المعلومات القيمة.", date: "منذ يومين" },
          { userName: "فاطمة علي", comment: "استفدت كثيراً من هذا المقال. أنصح الجميع بقراءته.", date: "منذ 5 أيام" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "محمد خالد", comment: "تصميم الشلالات الجدارية رائع جداً. أريد تطبيقه في منزلي.", date: "منذ 3 أيام" },
          { userName: "سارة أحمد", comment: "معلومات مفيدة عن الشلالات الجدارية. شكراً لكم.", date: "منذ أسبوع" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "خالد عبدالله", comment: "مقال شامل عن صيانة المكيفات. استفدت كثيراً.", date: "منذ يوم" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "نورا سعيد", comment: "أحدث تقنيات الدهانات رائعة. شكراً على المعلومات.", date: "منذ 4 أيام" },
          { userName: "عبدالرحمن", comment: "مقال مفيد جداً عن الدهانات والديكورات.", date: "منذ أسبوع" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "يوسف أحمد", comment: "مشاكل المكيفات وطرق إصلاحها موضحة بشكل جيد.", date: "منذ يومين" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "ليلى محمد", comment: "عزل الأسطح مهم جداً. شكراً على النصائح.", date: "منذ 6 أيام" },
        ],
      },
    ],
    posts: [
      {
        title: 'أفضل شركات تنظيف منازل في الرياض',
        date: 'أبريل 9, 2022',
        excerpt: 'دليل شامل لأفضل شركات التنظيف في الرياض مع نصائح لاختيار الشركة المناسبة لاحتياجاتك.',
        description: 'في هذا المقال، سنستكشف أفضل شركات التنظيف في الرياض التي تقدم خدمات عالية الجودة. سنقدم لك دليلاً شاملاً يتضمن معايير اختيار الشركة المناسبة، أهم الخدمات المتاحة، ونصائح عملية للحصول على أفضل النتائج. كما سنتطرق إلى أهمية اختيار شركة موثوقة ومعتمدة تضمن لك منزلاً نظيفاً وصحياً.',
      },
      {
        title: 'شركة ركن النخيل لتصميم شلالات جدارية',
        date: 'أبريل 7, 2022',
        excerpt: 'اكتشف كيف يمكن لشلالات جدارية أن تضيف لمسة جمالية فريدة لمنزلك أو مكتبك.',
        description: 'شلالات جدارية هي إضافة رائعة لأي مساحة، سواء كانت منزلاً أو مكتباً. في هذا المقال، سنتعرف على كيفية تصميم وتركيب الشلالات الجدارية، المواد المستخدمة، وأهم النصائح للعناية بها. شركة ركن النخيل تقدم حلولاً مبتكرة تجمع بين الجمال والوظيفية، مما يجعل مساحتك أكثر جاذبية وهدوءاً.',
      },
      {
        title: 'شركة تصليح مكيف سبلت بالرياض',
        date: 'أبريل 6, 2022',
        excerpt: 'دليل شامل لصيانة وإصلاح مكيفات السبليت مع أهم النصائح للحفاظ على كفاءة المكيف.',
        description: 'مكيفات السبليت تحتاج إلى صيانة دورية لضمان عملها بكفاءة عالية. في هذا الدليل الشامل، سنتعرف على أكثر المشاكل شيوعاً في مكيفات السبليت وكيفية إصلاحها، بالإضافة إلى نصائح الصيانة الوقائية التي تساعد في إطالة عمر المكيف وتقليل استهلاك الطاقة. سنقدم أيضاً معلومات عن أفضل الشركات المتخصصة في إصلاح المكيفات في الرياض.',
      },
      {
        title: 'اشهر شركات الدهانات بالرياض باحدث التقنيات المستخدمه',
        date: 'أبريل 4, 2022',
        excerpt: 'تعرف على أحدث تقنيات الدهانات والديكورات المستخدمة في الرياض وأهم الاتجاهات الحديثة.',
        description: 'تطورت تقنيات الدهانات والديكورات بشكل كبير في السنوات الأخيرة. في هذا المقال، سنستعرض أحدث التقنيات المستخدمة في مجال الدهانات، بما في ذلك الدهانات الذكية، الدهانات المقاومة للماء، والتقنيات الصديقة للبيئة. كما سنتعرف على أهم الاتجاهات الحديثة في التصميم والديكور التي تحظى بشعبية في الرياض.',
      },
      {
        title: 'التعرف على كيفية تصليح مكيفات سبليت واكثر المشاكل شيوعاً',
        date: 'أبريل 4, 2022',
        excerpt: 'دليل شامل لأكثر مشاكل مكيفات السبليت شيوعاً وكيفية إصلاحها بطرق احترافية.',
        description: 'في هذا الدليل التفصيلي، سنغطي أكثر المشاكل شيوعاً التي تواجه مكيفات السبليت مثل تسريب المياه، عدم التبريد الكافي، الضوضاء العالية، ومشاكل الفلتر. سنقدم حلولاً عملية لكل مشكلة مع شرح خطوات الإصلاح بالتفصيل. كما سنتطرق إلى متى يجب استدعاء فني متخصص ومتى يمكنك إصلاح المشكلة بنفسك.',
      },
      {
        title: 'شركة عزل الاسطح بالاسمنت الأبيض بأفضل الاسعار',
        date: 'أبريل 3, 2022',
        excerpt: 'كل ما تحتاج معرفته عن عزل الأسطح بالأسمنت الأبيض وأهميته في حماية المباني.',
        description: 'عزل الأسطح بالأسمنت الأبيض هو حل فعال لحماية المباني من التسربات والحرارة. في هذا المقال، سنتعرف على فوائد عزل الأسطح، أنواع المواد المستخدمة، خطوات التنفيذ، وأهم النصائح لاختيار الشركة المناسبة. سنقدم أيضاً معلومات عن الأسعار المتوقعة والعوامل التي تؤثر على التكلفة.',
      },
    ],
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Read More',
    commentsTitle: 'Comments',
    addComment: 'Add a Comment',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    websiteLabel: 'Website',
    websitePlaceholder: 'Enter your website (optional)',
    commentLabel: 'Comment',
    commentPlaceholder: 'Enter your comment here...',
    submitComment: 'Submit Comment',
    noCommentsYet: 'No comments yet. Be the first to comment!',
    now: 'Now',
    daysAgo: 'days ago',
    weekAgo: 'a week ago',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "Ahmed Mohammed", comment: "Great and very useful article. Thank you for the valuable information.", date: "2 days ago" },
          { userName: "Fatima Ali", comment: "I benefited a lot from this article. I recommend everyone to read it.", date: "5 days ago" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "Mohammed Khalid", comment: "Wall waterfall design is amazing. I want to apply it in my home.", date: "3 days ago" },
          { userName: "Sarah Ahmed", comment: "Useful information about wall waterfalls. Thank you.", date: "a week ago" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "Khalid Abdullah", comment: "Comprehensive article about AC maintenance. I benefited a lot.", date: "1 day ago" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "Nora Saeed", comment: "Latest paint technologies are amazing. Thank you for the information.", date: "4 days ago" },
          { userName: "Abdulrahman", comment: "Very useful article about paints and decorations.", date: "a week ago" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "Youssef Ahmed", comment: "AC problems and repair methods are well explained.", date: "2 days ago" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "Layla Mohammed", comment: "Roof insulation is very important. Thank you for the tips.", date: "6 days ago" },
        ],
      },
    ],
    posts: [
      {
        title: 'Best Home Cleaning Companies in Riyadh',
        date: 'April 9, 2022',
        excerpt: 'Comprehensive guide to the best cleaning companies in Riyadh with tips for choosing the right company for your needs.',
        description: 'In this article, we will explore the best cleaning companies in Riyadh that offer high-quality services. We will provide you with a comprehensive guide that includes criteria for choosing the right company, the most important services available, and practical tips for getting the best results. We will also discuss the importance of choosing a trusted and certified company that ensures you have a clean and healthy home.',
      },
      {
        title: 'Rukn Al-Nakheel Company for Wall Waterfall Design',
        date: 'April 7, 2022',
        excerpt: 'Discover how wall waterfalls can add a unique aesthetic touch to your home or office.',
        description: 'Wall waterfalls are a wonderful addition to any space, whether it\'s a home or office. In this article, we will learn about how to design and install wall waterfalls, the materials used, and the most important tips for maintaining them. Rukn Al-Nakheel Company offers innovative solutions that combine beauty and functionality, making your space more attractive and peaceful.',
      },
      {
        title: 'Split AC Repair Company in Riyadh',
        date: 'April 6, 2022',
        excerpt: 'Comprehensive guide to maintaining and repairing split air conditioners with the most important tips for maintaining AC efficiency.',
        description: 'Split air conditioners require regular maintenance to ensure they operate at high efficiency. In this comprehensive guide, we will learn about the most common problems with split air conditioners and how to fix them, in addition to preventive maintenance tips that help extend the life of the AC and reduce energy consumption. We will also provide information about the best companies specialized in AC repair in Riyadh.',
      },
      {
        title: 'Most Famous Paint Companies in Riyadh with Latest Technologies Used',
        date: 'April 4, 2022',
        excerpt: 'Learn about the latest paint and decoration technologies used in Riyadh and the most important modern trends.',
        description: 'Paint and decoration technologies have developed significantly in recent years. In this article, we will review the latest technologies used in the field of paints, including smart paints, waterproof paints, and environmentally friendly technologies. We will also learn about the most important modern trends in design and decoration that are popular in Riyadh.',
      },
      {
        title: 'Learn How to Repair Split ACs and Most Common Problems',
        date: 'April 4, 2022',
        excerpt: 'Comprehensive guide to the most common split AC problems and how to fix them professionally.',
        description: 'In this detailed guide, we will cover the most common problems facing split air conditioners such as water leakage, insufficient cooling, high noise, and filter problems. We will provide practical solutions for each problem with detailed repair steps. We will also discuss when to call a specialized technician and when you can fix the problem yourself.',
      },
      {
        title: 'Roof Insulation Company with White Cement at Best Prices',
        date: 'April 3, 2022',
        excerpt: 'Everything you need to know about white cement roof insulation and its importance in protecting buildings.',
        description: 'Roof insulation with white cement is an effective solution for protecting buildings from leaks and heat. In this article, we will learn about the benefits of roof insulation, types of materials used, implementation steps, and the most important tips for choosing the right company. We will also provide information about expected prices and factors that affect the cost.',
      },
    ],
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Ler Mais',
    commentsTitle: 'Comentários',
    addComment: 'Adicionar um Comentário',
    nameLabel: 'Nome',
    namePlaceholder: 'Digite seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Digite seu e-mail',
    websiteLabel: 'Site',
    websitePlaceholder: 'Digite seu site (opcional)',
    commentLabel: 'Comentário',
    commentPlaceholder: 'Digite seu comentário aqui...',
    submitComment: 'Enviar Comentário',
    noCommentsYet: 'Ainda não há comentários. Seja o primeiro a comentar!',
    now: 'Agora',
    daysAgo: 'dias atrás',
    weekAgo: 'uma semana atrás',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "Ahmed Mohammed", comment: "Artigo excelente e muito útil. Obrigado pelas informações valiosas.", date: "2 dias atrás" },
          { userName: "Fatima Ali", comment: "Me beneficiei muito deste artigo. Recomendo a todos que leiam.", date: "5 dias atrás" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "Mohammed Khalid", comment: "O design de cascata de parede é incrível. Quero aplicá-lo em minha casa.", date: "3 dias atrás" },
          { userName: "Sarah Ahmed", comment: "Informações úteis sobre cascatas de parede. Obrigado.", date: "uma semana atrás" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "Khalid Abdullah", comment: "Artigo abrangente sobre manutenção de AC. Me beneficiei muito.", date: "1 dia atrás" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "Nora Saeed", comment: "As mais recentes tecnologias de tinta são incríveis. Obrigado pelas informações.", date: "4 dias atrás" },
          { userName: "Abdulrahman", comment: "Artigo muito útil sobre tintas e decorações.", date: "uma semana atrás" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "Youssef Ahmed", comment: "Problemas de AC e métodos de reparo são bem explicados.", date: "2 dias atrás" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "Layla Mohammed", comment: "O isolamento do telhado é muito importante. Obrigado pelas dicas.", date: "6 dias atrás" },
        ],
      },
    ],
    posts: [
      {
        title: 'Melhores Empresas de Limpeza Doméstica em Riade',
        date: '09 de Abril de 2022',
        excerpt: 'Guia abrangente das melhores empresas de limpeza em Riade com dicas para escolher a empresa certa para suas necessidades.',
        description: 'Neste artigo, exploraremos as melhores empresas de limpeza em Riade que oferecem serviços de alta qualidade. Forneceremos um guia abrangente que inclui critérios para escolher a empresa certa, os serviços mais importantes disponíveis e dicas práticas para obter os melhores resultados. Também discutiremos a importância de escolher uma empresa confiável e certificada que garanta uma casa limpa e saudável.',
      },
      {
        title: 'Empresa Rukn Al-Nakheel para Design de Cascata de Parede',
        date: '07 de Abril de 2022',
        excerpt: 'Descubra como cascatas de parede podem adicionar um toque estético único à sua casa ou escritório.',
        description: 'Cascatas de parede são uma adição maravilhosa a qualquer espaço, seja uma casa ou escritório. Neste artigo, aprenderemos sobre como projetar e instalar cascatas de parede, os materiais usados e as dicas mais importantes para mantê-las. A empresa Rukn Al-Nakheel oferece soluções inovadoras que combinam beleza e funcionalidade, tornando seu espaço mais atraente e tranquilo.',
      },
      {
        title: 'Empresa de Reparo de Ar Condicionado Split em Riade',
        date: '06 de Abril de 2022',
        excerpt: 'Guia abrangente para manter e reparar aparelhos de ar condicionado split com as dicas mais importantes para manter a eficiência do AC.',
        description: 'Aparelhos de ar condicionado split requerem manutenção regular para garantir que operem com alta eficiência. Neste guia abrangente, aprenderemos sobre os problemas mais comuns com aparelhos de ar condicionado split e como consertá-los, além de dicas de manutenção preventiva que ajudam a estender a vida útil do AC e reduzir o consumo de energia. Também forneceremos informações sobre as melhores empresas especializadas em reparo de AC em Riade.',
      },
      {
        title: 'Empresas de Tinta Mais Famosas em Riade com Últimas Tecnologias Usadas',
        date: '04 de Abril de 2022',
        excerpt: 'Saiba mais sobre as últimas tecnologias de tinta e decoração usadas em Riade e as tendências modernas mais importantes.',
        description: 'As tecnologias de tinta e decoração se desenvolveram significativamente nos últimos anos. Neste artigo, revisaremos as mais recentes tecnologias usadas no campo de tintas, incluindo tintas inteligentes, tintas à prova d\'água e tecnologias ecologicamente corretas. Também aprenderemos sobre as tendências modernas mais importantes em design e decoração que são populares em Riade.',
      },
      {
        title: 'Aprenda Como Reparar ACs Split e Problemas Mais Comuns',
        date: '04 de Abril de 2022',
        excerpt: 'Guia abrangente para os problemas mais comuns de AC split e como consertá-los profissionalmente.',
        description: 'Neste guia detalhado, cobriremos os problemas mais comuns enfrentados por aparelhos de ar condicionado split, como vazamento de água, resfriamento insuficiente, ruído alto e problemas de filtro. Forneceremos soluções práticas para cada problema com etapas de reparo detalhadas. Também discutiremos quando chamar um técnico especializado e quando você pode consertar o problema sozinho.',
      },
      {
        title: 'Empresa de Isolamento de Telhado com Cimento Branco a Melhores Preços',
        date: '03 de Abril de 2022',
        excerpt: 'Tudo o que você precisa saber sobre isolamento de telhado com cimento branco e sua importância na proteção de edifícios.',
        description: 'O isolamento de telhado com cimento branco é uma solução eficaz para proteger edifícios de vazamentos e calor. Neste artigo, aprenderemos sobre os benefícios do isolamento de telhado, tipos de materiais usados, etapas de implementação e as dicas mais importantes para escolher a empresa certa. Também forneceremos informações sobre preços esperados e fatores que afetam o custo.',
      },
    ],
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbBlog: '博客',
    pageTitle: '博客',
    readMore: '阅读更多',
    commentsTitle: '评论',
    addComment: '添加评论',
    nameLabel: '姓名',
    namePlaceholder: '请输入您的姓名',
    emailLabel: '电子邮件',
    emailPlaceholder: '请输入您的电子邮件',
    websiteLabel: '网站',
    websitePlaceholder: '请输入您的网站（可选）',
    commentLabel: '评论',
    commentPlaceholder: '请输入您的评论...',
    submitComment: '提交评论',
    noCommentsYet: '还没有评论。成为第一个评论的人！',
    now: '现在',
    daysAgo: '天前',
    weekAgo: '一周前',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "艾哈迈德·穆罕默德", comment: "很棒且非常有用的文章。感谢您提供的有价值的信息。", date: "2天前" },
          { userName: "法蒂玛·阿里", comment: "我从这篇文章中受益匪浅。我建议每个人都读一读。", date: "5天前" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "穆罕默德·哈立德", comment: "墙面瀑布设计太棒了。我想在我家里应用它。", date: "3天前" },
          { userName: "萨拉·艾哈迈德", comment: "关于墙面瀑布的有用信息。谢谢。", date: "一周前" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "哈立德·阿卜杜拉", comment: "关于空调维护的全面文章。我受益匪浅。", date: "1天前" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "诺拉·赛义德", comment: "最新的油漆技术太棒了。感谢您提供的信息。", date: "4天前" },
          { userName: "阿卜杜勒拉赫曼", comment: "关于油漆和装饰的非常有用的文章。", date: "一周前" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "优素福·艾哈迈德", comment: "空调问题和维修方法解释得很好。", date: "2天前" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "莱拉·穆罕默德", comment: "屋顶隔热非常重要。感谢您的提示。", date: "6天前" },
        ],
      },
    ],
    posts: [
      {
        title: '利雅得最佳家庭清洁公司',
        date: '2022年4月9日',
        excerpt: '利雅得最佳清洁公司的综合指南，以及为您的需求选择合适公司的提示。',
        description: '在本文中，我们将探索利雅得提供高质量服务的最佳清洁公司。我们将为您提供一份综合指南，包括选择合适公司的标准、最重要的可用服务以及获得最佳结果的实用提示。我们还将讨论选择值得信赖和认证的公司的重要性，确保您拥有一个干净健康的家。',
      },
      {
        title: '棕榈角公司墙面瀑布设计',
        date: '2022年4月7日',
        excerpt: '了解墙面瀑布如何为您的家庭或办公室增添独特的美感。',
        description: '墙面瀑布是任何空间的绝佳补充，无论是家庭还是办公室。在本文中，我们将了解如何设计和安装墙面瀑布、使用的材料以及维护它们的最重要提示。棕榈角公司提供结合美观和功能性的创新解决方案，使您的空间更具吸引力和宁静。',
      },
      {
        title: '利雅得分体式空调维修公司',
        date: '2022年4月6日',
        excerpt: '维护和修理分体式空调的综合指南，以及保持空调效率的最重要提示。',
        description: '分体式空调需要定期维护以确保高效运行。在这份综合指南中，我们将了解分体式空调最常见的问题以及如何修复它们，此外还有有助于延长空调寿命和降低能耗的预防性维护提示。我们还将提供有关利雅得专业空调维修最佳公司的信息。',
      },
      {
        title: '利雅得最著名的油漆公司，使用最新技术',
        date: '2022年4月4日',
        excerpt: '了解利雅得使用的最新油漆和装饰技术以及最重要的现代趋势。',
        description: '油漆和装饰技术近年来发展迅速。在本文中，我们将回顾油漆领域使用的最新技术，包括智能油漆、防水油漆和环保技术。我们还将了解利雅得流行的设计和装饰中最重要的现代趋势。',
      },
      {
        title: '了解如何修理分体式空调和最常见的问题',
        date: '2022年4月4日',
        excerpt: '分体式空调最常见问题的综合指南以及如何专业地修复它们。',
        description: '在这份详细指南中，我们将涵盖分体式空调面临的最常见问题，如漏水、冷却不足、噪音大和过滤器问题。我们将为每个问题提供实用的解决方案，并详细说明维修步骤。我们还将讨论何时应该致电专业技术人员以及何时可以自己解决问题。',
      },
      {
        title: '以最佳价格提供白水泥屋顶隔热公司',
        date: '2022年4月3日',
        excerpt: '关于白水泥屋顶隔热及其在保护建筑物中的重要性，您需要了解的一切。',
        description: '白水泥屋顶隔热是保护建筑物免受泄漏和热量的有效解决方案。在本文中，我们将了解屋顶隔热的好处、使用的材料类型、实施步骤以及选择合适公司的最重要提示。我们还将提供有关预期价格和影响成本的因素的信息。',
      },
    ],
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbBlog: 'ブログ',
    pageTitle: 'ブログ',
    readMore: '続きを読む',
    commentsTitle: 'コメント',
    addComment: 'コメントを追加',
    nameLabel: '名前',
    namePlaceholder: 'お名前を入力してください',
    emailLabel: 'メール',
    emailPlaceholder: 'メールアドレスを入力してください',
    websiteLabel: 'ウェブサイト',
    websitePlaceholder: 'ウェブサイトを入力してください（任意）',
    commentLabel: 'コメント',
    commentPlaceholder: 'コメントを入力してください...',
    submitComment: 'コメントを送信',
    noCommentsYet: 'まだコメントがありません。最初のコメントを投稿してください！',
    now: '今',
    daysAgo: '日前',
    weekAgo: '1週間前',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "アーメド・モハメド", comment: "素晴らしく、非常に有用な記事です。貴重な情報をありがとうございます。", date: "2日前" },
          { userName: "ファティマ・アリ", comment: "この記事から多くの恩恵を受けました。皆さんに読むことをお勧めします。", date: "5日前" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "モハメド・ハリド", comment: "壁の滝のデザインは素晴らしいです。自宅に適用したいです。", date: "3日前" },
          { userName: "サラ・アーメド", comment: "壁の滝に関する有用な情報。ありがとうございます。", date: "1週間前" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "ハリド・アブドラ", comment: "ACメンテナンスに関する包括的な記事。多くの恩恵を受けました。", date: "1日前" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "ノラ・サイード", comment: "最新の塗装技術は素晴らしいです。情報をありがとうございます。", date: "4日前" },
          { userName: "アブドゥルラフマン", comment: "塗装と装飾に関する非常に有用な記事。", date: "1週間前" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "ユセフ・アーメド", comment: "ACの問題と修理方法がよく説明されています。", date: "2日前" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "ライラ・モハメド", comment: "屋根の断熱は非常に重要です。ヒントをありがとうございます。", date: "6日前" },
        ],
      },
    ],
    posts: [
      {
        title: 'リヤドの最高の家庭清掃会社',
        date: '2022年4月9日',
        excerpt: 'リヤドの最高の清掃会社の包括的なガイドと、あなたのニーズに合った会社を選択するためのヒント。',
        description: 'この記事では、高品質なサービスを提供するリヤドの最高の清掃会社を探ります。適切な会社を選択するための基準、利用可能な最も重要なサービス、最良の結果を得るための実用的なヒントを含む包括的なガイドを提供します。また、清潔で健康的な家を保証する信頼できる認定会社を選択することの重要性についても説明します。',
      },
      {
        title: '壁の滝デザインのルクン・アルナキール会社',
        date: '2022年4月7日',
        excerpt: '壁の滝があなたの家やオフィスに独特の美的タッチを追加する方法を発見してください。',
        description: '壁の滝は、家庭でもオフィスでも、あらゆるスペースに素晴らしい追加となります。この記事では、壁の滝の設計と設置方法、使用される材料、それらを維持するための最も重要なヒントについて学びます。ルクン・アルナキール会社は、美しさと機能性を組み合わせた革新的なソリューションを提供し、あなたのスペースをより魅力的で平和なものにします。',
      },
      {
        title: 'リヤドのスプリットAC修理会社',
        date: '2022年4月6日',
        excerpt: 'AC効率を維持するための最も重要なヒントとともに、スプリットエアコンの維持と修理の包括的なガイド。',
        description: 'スプリットエアコンは、高効率で動作するために定期的なメンテナンスが必要です。この包括的なガイドでは、スプリットエアコンの最も一般的な問題とそれらを修正する方法、ACの寿命を延ばし、エネルギー消費を減らすのに役立つ予防的メンテナンスのヒントについて学びます。また、リヤドでAC修理に特化した最高の会社に関する情報も提供します。',
      },
      {
        title: '最新技術を使用したリヤドで最も有名な塗装会社',
        date: '2022年4月4日',
        excerpt: 'リヤドで使用されている最新の塗装と装飾技術、および最も重要な現代のトレンドについて学びます。',
        description: '塗装と装飾技術は近年大きく発展しました。この記事では、スマートペイント、防水ペイント、環境に優しい技術を含む、塗装分野で使用されている最新技術をレビューします。また、リヤドで人気のあるデザインと装飾の最も重要な現代のトレンドについても学びます。',
      },
      {
        title: 'スプリットACの修理方法と最も一般的な問題を学ぶ',
        date: '2022年4月4日',
        excerpt: '最も一般的なスプリットACの問題とそれらを専門的に修正する方法の包括的なガイド。',
        description: 'この詳細なガイドでは、水漏れ、冷却不足、高いノイズ、フィルターの問題など、スプリットエアコンが直面する最も一般的な問題をカバーします。各問題に対する実用的なソリューションを詳細な修理手順とともに提供します。また、専門技術者を呼ぶべきタイミングと、自分で問題を修正できるタイミングについても説明します。',
      },
      {
        title: '最高の価格で白セメント屋根断熱会社',
        date: '2022年4月3日',
        excerpt: '白セメント屋根断熱と建物の保護におけるその重要性について知っておく必要があるすべて。',
        description: '白セメント屋根断熱は、建物を漏れや熱から保護するための効果的なソリューションです。この記事では、屋根断熱の利点、使用される材料の種類、実装手順、適切な会社を選択するための最も重要なヒントについて学びます。また、予想される価格とコストに影響を与える要因に関する情報も提供します。',
      },
    ],
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Mehr Lesen',
    commentsTitle: 'Kommentare',
    addComment: 'Einen Kommentar hinzufügen',
    nameLabel: 'Name',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
    websiteLabel: 'Website',
    websitePlaceholder: 'Geben Sie Ihre Website ein (optional)',
    commentLabel: 'Kommentar',
    commentPlaceholder: 'Geben Sie Ihren Kommentar hier ein...',
    submitComment: 'Kommentar absenden',
    noCommentsYet: 'Noch keine Kommentare. Seien Sie der Erste, der kommentiert!',
    now: 'Jetzt',
    daysAgo: 'Tage vor',
    weekAgo: 'vor einer Woche',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "Ahmed Mohammed", comment: "Großartiger und sehr nützlicher Artikel. Vielen Dank für die wertvollen Informationen.", date: "vor 2 Tagen" },
          { userName: "Fatima Ali", comment: "Ich habe sehr von diesem Artikel profitiert. Ich empfehle jedem, ihn zu lesen.", date: "vor 5 Tagen" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "Mohammed Khalid", comment: "Wandwasserfall-Design ist fantastisch. Ich möchte es in meinem Zuhause anwenden.", date: "vor 3 Tagen" },
          { userName: "Sarah Ahmed", comment: "Nützliche Informationen über Wandwasserfälle. Vielen Dank.", date: "vor einer Woche" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "Khalid Abdullah", comment: "Umfassender Artikel über AC-Wartung. Ich habe sehr profitiert.", date: "vor 1 Tag" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "Nora Saeed", comment: "Neueste Farbtechnologien sind fantastisch. Vielen Dank für die Informationen.", date: "vor 4 Tagen" },
          { userName: "Abdulrahman", comment: "Sehr nützlicher Artikel über Farben und Dekorationen.", date: "vor einer Woche" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "Youssef Ahmed", comment: "AC-Probleme und Reparaturmethoden sind gut erklärt.", date: "vor 2 Tagen" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "Layla Mohammed", comment: "Dachisolierung ist sehr wichtig. Vielen Dank für die Tipps.", date: "vor 6 Tagen" },
        ],
      },
    ],
    posts: [
      {
        title: 'Beste Hausreinigungsunternehmen in Riad',
        date: '09. April 2022',
        excerpt: 'Umfassender Leitfaden zu den besten Reinigungsunternehmen in Riad mit Tipps zur Auswahl des richtigen Unternehmens für Ihre Bedürfnisse.',
        description: 'In diesem Artikel werden wir die besten Reinigungsunternehmen in Riad erkunden, die hochwertige Dienstleistungen anbieten. Wir bieten Ihnen einen umfassenden Leitfaden, der Kriterien für die Auswahl des richtigen Unternehmens, die wichtigsten verfügbaren Dienstleistungen und praktische Tipps für die besten Ergebnisse enthält. Wir werden auch die Bedeutung der Auswahl eines vertrauenswürdigen und zertifizierten Unternehmens diskutieren, das Ihnen ein sauberes und gesundes Zuhause garantiert.',
      },
      {
        title: 'Rukn Al-Nakheel Unternehmen für Wandwasserfall-Design',
        date: '07. April 2022',
        excerpt: 'Entdecken Sie, wie Wandwasserfälle Ihrem Zuhause oder Büro eine einzigartige ästhetische Note verleihen können.',
        description: 'Wandwasserfälle sind eine wunderbare Ergänzung für jeden Raum, ob Zuhause oder Büro. In diesem Artikel erfahren wir, wie man Wandwasserfälle entwirft und installiert, welche Materialien verwendet werden und die wichtigsten Tipps für ihre Wartung. Das Unternehmen Rukn Al-Nakheel bietet innovative Lösungen, die Schönheit und Funktionalität kombinieren und Ihren Raum attraktiver und friedlicher machen.',
      },
      {
        title: 'Split-Klimaanlagen-Reparaturunternehmen in Riad',
        date: '06. April 2022',
        excerpt: 'Umfassender Leitfaden zur Wartung und Reparatur von Split-Klimaanlagen mit den wichtigsten Tipps zur Aufrechterhaltung der AC-Effizienz.',
        description: 'Split-Klimaanlagen erfordern regelmäßige Wartung, um einen hohen Wirkungsgrad zu gewährleisten. In diesem umfassenden Leitfaden erfahren wir mehr über die häufigsten Probleme bei Split-Klimaanlagen und wie man sie behebt, sowie vorbeugende Wartungstipps, die dazu beitragen, die Lebensdauer der Klimaanlage zu verlängern und den Energieverbrauch zu reduzieren. Wir werden auch Informationen über die besten Unternehmen bereitstellen, die auf AC-Reparaturen in Riad spezialisiert sind.',
      },
      {
        title: 'Berühmteste Farbunternehmen in Riad mit Neuesten Verwendeten Technologien',
        date: '04. April 2022',
        excerpt: 'Erfahren Sie mehr über die neuesten Farb- und Dekorationstechnologien, die in Riad verwendet werden, und die wichtigsten modernen Trends.',
        description: 'Farb- und Dekorationstechnologien haben sich in den letzten Jahren erheblich weiterentwickelt. In diesem Artikel werden wir die neuesten Technologien im Bereich der Farben überprüfen, einschließlich intelligenter Farben, wasserdichter Farben und umweltfreundlicher Technologien. Wir werden auch die wichtigsten modernen Trends im Design und in der Dekoration kennenlernen, die in Riad beliebt sind.',
      },
      {
        title: 'Erfahren Sie, Wie Sie Split-ACs Reparieren und Häufigste Probleme',
        date: '04. April 2022',
        excerpt: 'Umfassender Leitfaden zu den häufigsten Split-AC-Problemen und wie man sie professionell behebt.',
        description: 'In diesem detaillierten Leitfaden behandeln wir die häufigsten Probleme bei Split-Klimaanlagen wie Wasseraustritt, unzureichende Kühlung, hohe Geräusche und Filterprobleme. Wir bieten praktische Lösungen für jedes Problem mit detaillierten Reparaturschritten. Wir werden auch diskutieren, wann ein spezialisierter Techniker gerufen werden sollte und wann Sie das Problem selbst beheben können.',
      },
      {
        title: 'Dachisolierungsunternehmen mit Weißzement zu Besten Preisen',
        date: '03. April 2022',
        excerpt: 'Alles, was Sie über Weißzement-Dachisolierung und ihre Bedeutung beim Schutz von Gebäuden wissen müssen.',
        description: 'Dachisolierung mit Weißzement ist eine effektive Lösung zum Schutz von Gebäuden vor Lecks und Hitze. In diesem Artikel erfahren wir mehr über die Vorteile der Dachisolierung, die verwendeten Materialtypen, die Umsetzungsschritte und die wichtigsten Tipps zur Auswahl des richtigen Unternehmens. Wir werden auch Informationen über erwartete Preise und Faktoren bereitstellen, die die Kosten beeinflussen.',
      },
    ],
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbBlog: 'Blog',
    pageTitle: 'Blog',
    readMore: 'Lire Plus',
    commentsTitle: 'Commentaires',
    addComment: 'Ajouter un commentaire',
    nameLabel: 'Nom',
    namePlaceholder: 'Entrez votre nom',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Entrez votre e-mail',
    websiteLabel: 'Site Web',
    websitePlaceholder: 'Entrez votre site Web (optionnel)',
    commentLabel: 'Commentaire',
    commentPlaceholder: 'Entrez votre commentaire ici...',
    submitComment: 'Soumettre le commentaire',
    noCommentsYet: 'Pas encore de commentaires. Soyez le premier à commenter !',
    now: 'Maintenant',
    daysAgo: 'il y a',
    weekAgo: 'il y a une semaine',
    mockComments: [
      {
        blogId: 1,
        comments: [
          { userName: "Ahmed Mohammed", comment: "Excellent article et très utile. Merci pour les informations précieuses.", date: "il y a 2 jours" },
          { userName: "Fatima Ali", comment: "J'ai beaucoup bénéficié de cet article. Je recommande à tous de le lire.", date: "il y a 5 jours" },
        ],
      },
      {
        blogId: 2,
        comments: [
          { userName: "Mohammed Khalid", comment: "Le design de cascade murale est incroyable. Je veux l'appliquer dans ma maison.", date: "il y a 3 jours" },
          { userName: "Sarah Ahmed", comment: "Informations utiles sur les cascades murales. Merci.", date: "il y a une semaine" },
        ],
      },
      {
        blogId: 3,
        comments: [
          { userName: "Khalid Abdullah", comment: "Article complet sur l'entretien de la climatisation. J'ai beaucoup bénéficié.", date: "il y a 1 jour" },
        ],
      },
      {
        blogId: 4,
        comments: [
          { userName: "Nora Saeed", comment: "Les dernières technologies de peinture sont incroyables. Merci pour les informations.", date: "il y a 4 jours" },
          { userName: "Abdulrahman", comment: "Article très utile sur les peintures et décorations.", date: "il y a une semaine" },
        ],
      },
      {
        blogId: 5,
        comments: [
          { userName: "Youssef Ahmed", comment: "Les problèmes de climatisation et les méthodes de réparation sont bien expliqués.", date: "il y a 2 jours" },
        ],
      },
      {
        blogId: 6,
        comments: [
          { userName: "Layla Mohammed", comment: "L'isolation du toit est très importante. Merci pour les conseils.", date: "il y a 6 jours" },
        ],
      },
    ],
    posts: [
      {
        title: 'Meilleures Entreprises de Nettoyage Domestique à Riyad',
        date: '09 Avril 2022',
        excerpt: 'Guide complet des meilleures entreprises de nettoyage à Riyad avec des conseils pour choisir la bonne entreprise pour vos besoins.',
        description: 'Dans cet article, nous explorerons les meilleures entreprises de nettoyage à Riyad qui offrent des services de haute qualité. Nous vous fournirons un guide complet qui comprend des critères pour choisir la bonne entreprise, les services les plus importants disponibles et des conseils pratiques pour obtenir les meilleurs résultats. Nous discuterons également de l\'importance de choisir une entreprise de confiance et certifiée qui vous garantit une maison propre et saine.',
      },
      {
        title: 'Société Rukn Al-Nakheel pour la Conception de Cascades Murales',
        date: '07 Avril 2022',
        excerpt: 'Découvrez comment les cascades murales peuvent ajouter une touche esthétique unique à votre maison ou bureau.',
        description: 'Les cascades murales sont un merveilleux ajout à tout espace, que ce soit une maison ou un bureau. Dans cet article, nous apprendrons comment concevoir et installer des cascades murales, les matériaux utilisés et les conseils les plus importants pour les entretenir. La société Rukn Al-Nakheel offre des solutions innovantes qui combinent beauté et fonctionnalité, rendant votre espace plus attrayant et paisible.',
      },
      {
        title: 'Entreprise de Réparation de Climatiseur Split à Riyad',
        date: '06 Avril 2022',
        excerpt: 'Guide complet pour entretenir et réparer les climatiseurs split avec les conseils les plus importants pour maintenir l\'efficacité du climatiseur.',
        description: 'Les climatiseurs split nécessitent un entretien régulier pour garantir un fonctionnement à haute efficacité. Dans ce guide complet, nous apprendrons les problèmes les plus courants des climatiseurs split et comment les réparer, en plus des conseils d\'entretien préventif qui aident à prolonger la durée de vie du climatiseur et à réduire la consommation d\'énergie. Nous fournirons également des informations sur les meilleures entreprises spécialisées dans la réparation de climatiseurs à Riyad.',
      },
      {
        title: 'Entreprises de Peinture Les Plus Célèbres à Riyad avec Dernières Technologies Utilisées',
        date: '04 Avril 2022',
        excerpt: 'Découvrez les dernières technologies de peinture et de décoration utilisées à Riyad et les tendances modernes les plus importantes.',
        description: 'Les technologies de peinture et de décoration se sont considérablement développées ces dernières années. Dans cet article, nous examinerons les dernières technologies utilisées dans le domaine de la peinture, y compris les peintures intelligentes, les peintures étanches et les technologies respectueuses de l\'environnement. Nous apprendrons également les tendances modernes les plus importantes en design et décoration qui sont populaires à Riyad.',
      },
      {
        title: 'Apprenez Comment Réparer les Climatiseurs Split et Problèmes Les Plus Courants',
        date: '04 Avril 2022',
        excerpt: 'Guide complet des problèmes les plus courants des climatiseurs split et comment les réparer professionnellement.',
        description: 'Dans ce guide détaillé, nous couvrirons les problèmes les plus courants rencontrés par les climatiseurs split tels que les fuites d\'eau, le refroidissement insuffisant, le bruit élevé et les problèmes de filtre. Nous fournirons des solutions pratiques pour chaque problème avec des étapes de réparation détaillées. Nous discuterons également du moment où appeler un technicien spécialisé et du moment où vous pouvez réparer le problème vous-même.',
      },
      {
        title: 'Entreprise d\'Isolation de Toit avec Ciment Blanc aux Meilleurs Prix',
        date: '03 Avril 2022',
        excerpt: 'Tout ce que vous devez savoir sur l\'isolation de toit en ciment blanc et son importance dans la protection des bâtiments.',
        description: 'L\'isolation de toit en ciment blanc est une solution efficace pour protéger les bâtiments des fuites et de la chaleur. Dans cet article, nous apprendrons les avantages de l\'isolation de toit, les types de matériaux utilisés, les étapes de mise en œuvre et les conseils les plus importants pour choisir la bonne entreprise. Nous fournirons également des informations sur les prix attendus et les facteurs qui affectent le coût.',
      },
    ],
  },
};
