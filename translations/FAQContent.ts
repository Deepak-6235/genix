import { LanguageCode } from '@/lib/languages';

export const faqContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbFAQ: string;
  pageTitle: string;
  sectionTitle: string;
  form: {
    title: string;
    subtitle: string;
    contactInfo: string;
    address: string;
    addressValue: string;
    communication: string;
    email: string;
    emailValue: string;
    name: string;
    namePlaceholder: string;
    selectService: string;
    chooseServices: string;
    mailAddress: string;
    mailAddressPlaceholder: string;
    question: string;
    questionPlaceholder: string;
    submit: string;
    servicesOptions: {
      disinfection: string;
      painting: string;
      acMaintenance: string;
      renovation: string;
      pool: string;
      waterfall: string;
      pestControl: string;
    };
  };
  alertMessage: string;
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbFAQ: 'اسئلة شائعة',
    pageTitle: 'الأسئلة الشائعة',
    sectionTitle: 'يمكنك العثور على مزيد من المعلومات حول الأسئلة الشائعة',
    form: {
      title: 'تواصل معنا',
      subtitle: 'أرسل لنا رسالة وسنعود إليك في أقرب وقت ممكن',
      contactInfo: 'معلومات الاتصال',
      address: 'العنوان:',
      addressValue: 'الرياض، المملكة العربية السعودية',
      communication: 'الاتصال:',
      email: 'البريد الإلكتروني:',
      emailValue: 'roknakheel@gmail.com',
      name: 'الاسم',
      namePlaceholder: 'اكتب اسمك',
      selectService: 'اختر خدمة للحصول على المساعدة',
      chooseServices: 'اختر الخدمات',
      mailAddress: 'عنوان بريدك الإلكتروني',
      mailAddressPlaceholder: 'اكتب عنوان البريد الإلكتروني',
      question: 'السؤال',
      questionPlaceholder: 'اكتب سؤالك',
      submit: 'إرسال الآن',
      servicesOptions: {
        disinfection: 'تعقيم ضد الفيروسات',
        painting: 'دهانات وديكورات',
        acMaintenance: 'صيانة المكيفات',
        renovation: 'ترميم منازل',
        pool: 'إنشاء وصيانة المسابح',
        waterfall: 'إنشاء الشلالات والنوافير',
        pestControl: 'مكافحة الحشرات',
      },
    },
    alertMessage: 'شكراً لرسالتك! سنعود إليك قريباً.',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbFAQ: 'FAQ',
    pageTitle: 'Frequently Asked Questions',
    sectionTitle: 'You can find more information on frequently asked questions',
    form: {
      title: 'Get in Touch',
      subtitle: 'Send us a message and we\'ll get back to you as soon as possible',
      contactInfo: 'Contact Information',
      address: 'Address:',
      addressValue: 'Riyadh, Saudi Arabia',
      communication: 'Communication:',
      email: 'Email:',
      emailValue: 'roknakheel@gmail.com',
      name: 'Name',
      namePlaceholder: 'Type your name',
      selectService: 'Select a service to get help',
      chooseServices: 'Choose services',
      mailAddress: 'Your mail address',
      mailAddressPlaceholder: 'Type mail address',
      question: 'Question',
      questionPlaceholder: 'Type your question',
      submit: 'Submit now',
      servicesOptions: {
        disinfection: 'Virus Disinfection',
        painting: 'Painting and Decoration',
        acMaintenance: 'AC Maintenance',
        renovation: 'Home Renovation',
        pool: 'Pool Construction and Maintenance',
        waterfall: 'Waterfall and Fountain Construction',
        pestControl: 'Pest Control',
      },
    },
    alertMessage: 'Thank you for your message! We will get back to you soon.',
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbFAQ: 'FAQ',
    pageTitle: 'Perguntas Frequentes',
    sectionTitle: 'Você pode encontrar mais informações sobre perguntas frequentes',
    form: {
      title: 'Entre em Contato',
      subtitle: 'Envie-nos uma mensagem e retornaremos o mais breve possível',
      contactInfo: 'Informações de Contato',
      address: 'Endereço:',
      addressValue: 'Riade, Arábia Saudita',
      communication: 'Comunicação:',
      email: 'Email:',
      emailValue: 'roknakheel@gmail.com',
      name: 'Nome',
      namePlaceholder: 'Digite seu nome',
      selectService: 'Selecione um serviço para obter ajuda',
      chooseServices: 'Escolher serviços',
      mailAddress: 'Seu endereço de email',
      mailAddressPlaceholder: 'Digite o endereço de email',
      question: 'Pergunta',
      questionPlaceholder: 'Digite sua pergunta',
      submit: 'Enviar agora',
      servicesOptions: {
        disinfection: 'Desinfecção de Vírus',
        painting: 'Pintura e Decorações',
        acMaintenance: 'Manutenção de AC',
        renovation: 'Renovação de Casa',
        pool: 'Construção e Manutenção de Piscinas',
        waterfall: 'Construção de Cascatas e Fontes',
        pestControl: 'Controle de Pragas',
      },
    },
    alertMessage: 'Obrigado pela sua mensagem! Retornaremos em breve.',
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbFAQ: '常见问题',
    pageTitle: '常见问题',
    sectionTitle: '您可以找到有关常见问题的更多信息',
    form: {
      title: '联系我们',
      subtitle: '给我们发送消息，我们会尽快回复您',
      contactInfo: '联系信息',
      address: '地址：',
      addressValue: '沙特阿拉伯，利雅得',
      communication: '联系方式：',
      email: '电子邮件：',
      emailValue: 'roknakheel@gmail.com',
      name: '姓名',
      namePlaceholder: '输入您的姓名',
      selectService: '选择服务以获得帮助',
      chooseServices: '选择服务',
      mailAddress: '您的邮件地址',
      mailAddressPlaceholder: '输入邮件地址',
      question: '问题',
      questionPlaceholder: '输入您的问题',
      submit: '立即提交',
      servicesOptions: {
        disinfection: '病毒消毒',
        painting: '油漆和装饰',
        acMaintenance: '空调维护',
        renovation: '房屋翻新',
        pool: '游泳池建设和维护',
        waterfall: '瀑布和喷泉建设',
        pestControl: '害虫防治',
      },
    },
    alertMessage: '感谢您的消息！我们会尽快回复您。',
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbFAQ: 'よくある質問',
    pageTitle: 'よくある質問',
    sectionTitle: 'よくある質問に関する詳細情報を見つけることができます',
    form: {
      title: 'お問い合わせ',
      subtitle: 'メッセージを送信していただければ、できるだけ早く返信いたします',
      contactInfo: '連絡先情報',
      address: '住所：',
      addressValue: 'サウジアラビア、リヤド',
      communication: '連絡先：',
      email: 'メール：',
      emailValue: 'roknakheel@gmail.com',
      name: '名前',
      namePlaceholder: '名前を入力してください',
      selectService: 'ヘルプを受けるサービスを選択',
      chooseServices: 'サービスを選択',
      mailAddress: 'メールアドレス',
      mailAddressPlaceholder: 'メールアドレスを入力',
      question: '質問',
      questionPlaceholder: '質問を入力',
      submit: '今すぐ送信',
      servicesOptions: {
        disinfection: 'ウイルス消毒',
        painting: '塗装と装飾',
        acMaintenance: 'エアコンのメンテナンス',
        renovation: '家のリフォーム',
        pool: 'プールの建設とメンテナンス',
        waterfall: '滝と噴水の建設',
        pestControl: '害虫駆除',
      },
    },
    alertMessage: 'メッセージありがとうございます！すぐに返信いたします。',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbFAQ: 'FAQ',
    pageTitle: 'Häufig Gestellte Fragen',
    sectionTitle: 'Sie können weitere Informationen zu häufig gestellten Fragen finden',
    form: {
      title: 'Kontaktieren Sie Uns',
      subtitle: 'Senden Sie uns eine Nachricht und wir melden uns so schnell wie möglich bei Ihnen',
      contactInfo: 'Kontaktinformationen',
      address: 'Adresse:',
      addressValue: 'Riad, Saudi-Arabien',
      communication: 'Kommunikation:',
      email: 'E-Mail:',
      emailValue: 'roknakheel@gmail.com',
      name: 'Name',
      namePlaceholder: 'Geben Sie Ihren Namen ein',
      selectService: 'Wählen Sie einen Service, um Hilfe zu erhalten',
      chooseServices: 'Dienste auswählen',
      mailAddress: 'Ihre E-Mail-Adresse',
      mailAddressPlaceholder: 'E-Mail-Adresse eingeben',
      question: 'Frage',
      questionPlaceholder: 'Geben Sie Ihre Frage ein',
      submit: 'Jetzt absenden',
      servicesOptions: {
        disinfection: 'Virusdesinfektion',
        painting: 'Malerarbeiten und Dekorationen',
        acMaintenance: 'Wartung von Klimaanlagen',
        renovation: 'Hausrenovierung',
        pool: 'Bau und Wartung von Schwimmbädern',
        waterfall: 'Bau von Wasserfällen und Brunnen',
        pestControl: 'Schädlingsbekämpfung',
      },
    },
    alertMessage: 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.',
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbFAQ: 'FAQ',
    pageTitle: 'Questions Fréquemment Posées',
    sectionTitle: 'Vous pouvez trouver plus d\'informations sur les questions fréquemment posées',
    form: {
      title: 'Contactez-Nous',
      subtitle: 'Envoyez-nous un message et nous vous répondrons dans les plus brefs délais',
      contactInfo: 'Informations de Contact',
      address: 'Adresse:',
      addressValue: 'Riyad, Arabie Saoudite',
      communication: 'Communication:',
      email: 'Email:',
      emailValue: 'roknakheel@gmail.com',
      name: 'Nom',
      namePlaceholder: 'Tapez votre nom',
      selectService: 'Sélectionnez un service pour obtenir de l\'aide',
      chooseServices: 'Choisir les services',
      mailAddress: 'Votre adresse email',
      mailAddressPlaceholder: 'Tapez l\'adresse email',
      question: 'Question',
      questionPlaceholder: 'Tapez votre question',
      submit: 'Soumettre maintenant',
      servicesOptions: {
        disinfection: 'Désinfection Virus',
        painting: 'Peinture et Décorations',
        acMaintenance: 'Entretien de Climatisation',
        renovation: 'Rénovation de Maison',
        pool: 'Construction et Entretien de Piscines',
        waterfall: 'Construction de Cascades et Fontaines',
        pestControl: 'Lutte Contre les Nuisibles',
      },
    },
    alertMessage: 'Merci pour votre message! Nous vous répondrons bientôt.',
  },
};
