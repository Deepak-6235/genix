import { LanguageCode } from '@/lib/languages';

export const contactContentTranslations: Record<LanguageCode, {
  breadcrumbHome: string;
  breadcrumbContact: string;
  formTitle: string;
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    services: string;
    chooseServices: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    serviceRequired: string;
    messageRequired: string;
  };
  whatsappMessage: string;
}> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbContact: 'اتصل بنا',
    formTitle: 'أرسل لنا رسالة',
    form: {
      name: 'الاسم (مطلوب)',
      namePlaceholder: 'أدخل اسمك',
      email: 'البريد الإلكتروني (مطلوب)',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phone: 'الهاتف (اختياري)',
      phonePlaceholder: 'أدخل رقم هاتفك',
      services: 'الخدمات (مطلوب)',
      chooseServices: 'اختر الخدمات',
      message: 'رسالتك*',
      messagePlaceholder: 'أدخل رسالتك',
      sendMessage: 'إرسال الرسالة',
    },
    errors: {
      nameRequired: 'الاسم مطلوب',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'البريد الإلكتروني غير صحيح',
      serviceRequired: 'الخدمة مطلوبة',
      messageRequired: 'الرسالة مطلوبة',
    },
    whatsappMessage: 'مرحباً، أريد الاستفسار عن الخدمات',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact Us',
    formTitle: 'Send us a Message',
    form: {
      name: 'Name (required)',
      namePlaceholder: 'Enter your name',
      email: 'Email address (required)',
      emailPlaceholder: 'Enter your email',
      phone: 'Phone (optional)',
      phonePlaceholder: 'Enter your phone number',
      services: 'Services (required)',
      chooseServices: 'Choose services',
      message: 'Your message*',
      messagePlaceholder: 'Enter your message',
      sendMessage: 'Send message',
    },
    errors: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Email is invalid',
      serviceRequired: 'Service is required',
      messageRequired: 'Message is required',
    },
    whatsappMessage: 'Hello, I would like to inquire about the services',
  },
  pt: {
    breadcrumbHome: 'Início',
    breadcrumbContact: 'Entre em Contato',
    formTitle: 'Envie-nos uma Mensagem',
    form: {
      name: 'Nome (obrigatório)',
      namePlaceholder: 'Digite seu nome',
      email: 'Endereço de email (obrigatório)',
      emailPlaceholder: 'Digite seu email',
      phone: 'Telefone (opcional)',
      phonePlaceholder: 'Digite seu número de telefone',
      services: 'Serviços (obrigatório)',
      chooseServices: 'Escolher serviços',
      message: 'Sua mensagem*',
      messagePlaceholder: 'Digite sua mensagem',
      sendMessage: 'Enviar mensagem',
    },
    errors: {
      nameRequired: 'O nome é obrigatório',
      emailRequired: 'O email é obrigatório',
      emailInvalid: 'O email é inválido',
      serviceRequired: 'O serviço é obrigatório',
      messageRequired: 'A mensagem é obrigatória',
    },
    whatsappMessage: 'Olá, gostaria de saber mais sobre os serviços',
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbContact: '联系我们',
    formTitle: '给我们发消息',
    form: {
      name: '姓名（必填）',
      namePlaceholder: '输入您的姓名',
      email: '电子邮件地址（必填）',
      emailPlaceholder: '输入您的电子邮件',
      phone: '电话（可选）',
      phonePlaceholder: '输入您的电话号码',
      services: '服务（必填）',
      chooseServices: '选择服务',
      message: '您的消息*',
      messagePlaceholder: '输入您的消息',
      sendMessage: '发送消息',
    },
    errors: {
      nameRequired: '姓名是必填项',
      emailRequired: '电子邮件是必填项',
      emailInvalid: '电子邮件无效',
      serviceRequired: '服务是必填项',
      messageRequired: '消息是必填项',
    },
    whatsappMessage: '你好，我想咨询一下服务',
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbContact: 'お問い合わせ',
    formTitle: 'メッセージを送信',
    form: {
      name: '名前（必須）',
      namePlaceholder: 'お名前を入力',
      email: 'メールアドレス（必須）',
      emailPlaceholder: 'メールアドレスを入力',
      phone: '電話（任意）',
      phonePlaceholder: '電話番号を入力',
      services: 'サービス（必須）',
      chooseServices: 'サービスを選択',
      message: 'メッセージ*',
      messagePlaceholder: 'メッセージを入力',
      sendMessage: 'メッセージを送信',
    },
    errors: {
      nameRequired: '名前は必須です',
      emailRequired: 'メールアドレスは必須です',
      emailInvalid: 'メールアドレスが無効です',
      serviceRequired: 'サービスは必須です',
      messageRequired: 'メッセージは必須です',
    },
    whatsappMessage: 'こんにちは、サービスについてお問い合わせしたいです',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbContact: 'Kontaktieren Sie Uns',
    formTitle: 'Senden Sie Uns eine Nachricht',
    form: {
      name: 'Name (erforderlich)',
      namePlaceholder: 'Geben Sie Ihren Namen ein',
      email: 'E-Mail-Adresse (erforderlich)',
      emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
      phone: 'Telefon (optional)',
      phonePlaceholder: 'Geben Sie Ihre Telefonnummer ein',
      services: 'Dienste (erforderlich)',
      chooseServices: 'Dienste auswählen',
      message: 'Ihre Nachricht*',
      messagePlaceholder: 'Geben Sie Ihre Nachricht ein',
      sendMessage: 'Nachricht senden',
    },
    errors: {
      nameRequired: 'Name ist erforderlich',
      emailRequired: 'E-Mail ist erforderlich',
      emailInvalid: 'E-Mail ist ungültig',
      serviceRequired: 'Service ist erforderlich',
      messageRequired: 'Nachricht ist erforderlich',
    },
    whatsappMessage: 'Hallo, ich möchte mich über die Dienstleistungen informieren',
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbContact: 'Contactez-Nous',
    formTitle: 'Envoyez-Nous un Message',
    form: {
      name: 'Nom (obligatoire)',
      namePlaceholder: 'Entrez votre nom',
      email: 'Adresse email (obligatoire)',
      emailPlaceholder: 'Entrez votre email',
      phone: 'Téléphone (optionnel)',
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      services: 'Services (obligatoire)',
      chooseServices: 'Choisir les services',
      message: 'Votre message*',
      messagePlaceholder: 'Entrez votre message',
      sendMessage: 'Envoyer le message',
    },
    errors: {
      nameRequired: 'Le nom est obligatoire',
      emailRequired: 'L\'email est obligatoire',
      emailInvalid: 'L\'email est invalide',
      serviceRequired: 'Le service est obligatoire',
      messageRequired: 'Le message est obligatoire',
    },
    whatsappMessage: 'Bonjour, je voudrais me renseigner sur les services',
  },
};
