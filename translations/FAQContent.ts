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
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    selectService: string;
    chooseServices: string;
    mailAddress: string;
    mailAddressPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
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
      firstName: 'الاسم الأول',
      firstNamePlaceholder: 'اكتب اسمك الأول',
      lastName: 'اسم العائلة',
      lastNamePlaceholder: 'اكتب اسم عائلتك',
      selectService: 'اختر خدمة للحصول على المساعدة',
      chooseServices: 'اختر الخدمات',
      mailAddress: 'عنوان بريدك الإلكتروني',
      mailAddressPlaceholder: 'اكتب عنوان البريد الإلكتروني',
      message: 'الرسالة',
      messagePlaceholder: 'اكتب الرسالة',
      submit: 'إرسال الآن',
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
      firstName: 'First name',
      firstNamePlaceholder: 'Type your first name',
      lastName: 'Last name',
      lastNamePlaceholder: 'Type your last name',
      selectService: 'Select a service to get help',
      chooseServices: 'Choose services',
      mailAddress: 'Your mail address',
      mailAddressPlaceholder: 'Type mail address',
      message: 'Message',
      messagePlaceholder: 'Type message',
      submit: 'Submit now',
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
      firstName: 'Primeiro nome',
      firstNamePlaceholder: 'Digite seu primeiro nome',
      lastName: 'Sobrenome',
      lastNamePlaceholder: 'Digite seu sobrenome',
      selectService: 'Selecione um serviço para obter ajuda',
      chooseServices: 'Escolher serviços',
      mailAddress: 'Seu endereço de email',
      mailAddressPlaceholder: 'Digite o endereço de email',
      message: 'Mensagem',
      messagePlaceholder: 'Digite a mensagem',
      submit: 'Enviar agora',
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
      firstName: '名字',
      firstNamePlaceholder: '输入您的名字',
      lastName: '姓氏',
      lastNamePlaceholder: '输入您的姓氏',
      selectService: '选择服务以获得帮助',
      chooseServices: '选择服务',
      mailAddress: '您的邮件地址',
      mailAddressPlaceholder: '输入邮件地址',
      message: '消息',
      messagePlaceholder: '输入消息',
      submit: '立即提交',
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
      firstName: '名',
      firstNamePlaceholder: '名を入力してください',
      lastName: '姓',
      lastNamePlaceholder: '姓を入力してください',
      selectService: 'ヘルプを受けるサービスを選択',
      chooseServices: 'サービスを選択',
      mailAddress: 'メールアドレス',
      mailAddressPlaceholder: 'メールアドレスを入力',
      message: 'メッセージ',
      messagePlaceholder: 'メッセージを入力',
      submit: '今すぐ送信',
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
      firstName: 'Vorname',
      firstNamePlaceholder: 'Geben Sie Ihren Vornamen ein',
      lastName: 'Nachname',
      lastNamePlaceholder: 'Geben Sie Ihren Nachnamen ein',
      selectService: 'Wählen Sie einen Service, um Hilfe zu erhalten',
      chooseServices: 'Dienste auswählen',
      mailAddress: 'Ihre E-Mail-Adresse',
      mailAddressPlaceholder: 'E-Mail-Adresse eingeben',
      message: 'Nachricht',
      messagePlaceholder: 'Nachricht eingeben',
      submit: 'Jetzt absenden',
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
      firstName: 'Prénom',
      firstNamePlaceholder: 'Tapez votre prénom',
      lastName: 'Nom de famille',
      lastNamePlaceholder: 'Tapez votre nom de famille',
      selectService: 'Sélectionnez un service pour obtenir de l\'aide',
      chooseServices: 'Choisir les services',
      mailAddress: 'Votre adresse email',
      mailAddressPlaceholder: 'Tapez l\'adresse email',
      message: 'Message',
      messagePlaceholder: 'Tapez le message',
      submit: 'Soumettre maintenant',
    },
    alertMessage: 'Merci pour votre message! Nous vous répondrons bientôt.',
  },
};
