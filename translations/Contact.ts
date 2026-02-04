import { LanguageCode } from '@/lib/languages';

export const contactTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  city: string;
  hours: string;
  hoursValue: string;
  offers: string;
  offersDescription: string;
  whatsappMessage: string;
  whatsappButton: string;
  sendMessage: string;
}> = {
  ar: {
    title: 'ننتظر اتصالك',
    subtitle: 'نريد مشاركة موقعنا لتجدنا بسهولة',
    phone: 'رقم الهاتف',
    email: 'الايميل',
    address: 'العنوان',
    location: 'السعودية',
    city: 'الرياض',
    hours: 'أوقات العمل',
    hoursValue: 'الأحد - الجمعة: 24/7',
    offers: 'العروض',
    offersDescription: 'يمكنك إرسال رسالة على الواتساب واستقبال عرض سعر مخصص لك',
    whatsappMessage: 'مرحباً، أريد الاستفسار عن الخدمات',
    whatsappButton: 'ارسل لنا رسالة على الواتساب',
    sendMessage: 'أرسل لنا رسالة',
  },
  en: {
    title: 'We\'re Waiting for Your Call',
    subtitle: 'We want to share our location so you can find us easily',
    phone: 'Phone Number',
    email: 'Email',
    address: 'Address',
    location: 'Saudi Arabia',
    city: 'Riyadh',
    hours: 'Working Hours',
    hoursValue: 'Sunday - Friday: 24h/7',
    offers: 'Offers',
    offersDescription: 'You can send a message on WhatsApp and receive a customized price quote',
    whatsappMessage: 'Hello, I would like to inquire about the services',
    whatsappButton: 'Send us a WhatsApp Message',
    sendMessage: 'Send us a Message',
  },
  pt: {
    title: 'Estamos Esperando Sua Ligação',
    subtitle: 'Queremos compartilhar nossa localização para que você possa nos encontrar facilmente',
    phone: 'Número de Telefone',
    email: 'Email',
    address: 'Endereço',
    location: 'Arábia Saudita',
    city: 'Riade',
    hours: 'Horário de Funcionamento',
    hoursValue: 'Domingo - Sexta: 24h/7',
    offers: 'Ofertas',
    offersDescription: 'Você pode enviar uma mensagem no WhatsApp e receber uma cotação de preço personalizada',
    whatsappMessage: 'Olá, gostaria de saber mais sobre os serviços',
    whatsappButton: 'Envie-nos uma Mensagem no WhatsApp',
    sendMessage: 'Envie-nos uma Mensagem',
  },
  zh: {
    title: '我们等待您的来电',
    subtitle: '我们想分享我们的位置，以便您轻松找到我们',
    phone: '电话号码',
    email: '电子邮件',
    address: '地址',
    location: '沙特阿拉伯',
    city: '利雅得',
    hours: '工作时间',
    hoursValue: '星期日 - 星期五: 24小时/7天',
    offers: '优惠',
    offersDescription: '您可以在WhatsApp上发送消息并接收定制价格报价',
    whatsappMessage: '你好，我想咨询一下服务',
    whatsappButton: '在WhatsApp上给我们发消息',
    sendMessage: '给我们发消息',
  },
  ja: {
    title: 'お電話をお待ちしています',
    subtitle: '簡単に見つけられるように場所を共有したいと思います',
    phone: '電話番号',
    email: 'メール',
    address: '住所',
    location: 'サウジアラビア',
    city: 'リヤド',
    hours: '営業時間',
    hoursValue: '日曜日 - 金曜日: 24時間/7日',
    offers: 'オファー',
    offersDescription: 'WhatsAppでメッセージを送信し、カスタマイズされた価格見積もりを受信できます',
    whatsappMessage: 'こんにちは、サービスについてお問い合わせしたいです',
    whatsappButton: 'WhatsAppでメッセージを送信',
    sendMessage: 'メッセージを送信',
  },
  de: {
    title: 'Wir Warten auf Ihren Anruf',
    subtitle: 'Wir möchten unseren Standort teilen, damit Sie uns leicht finden können',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    address: 'Adresse',
    location: 'Saudi-Arabien',
    city: 'Riad',
    hours: 'Arbeitszeiten',
    hoursValue: 'Sonntag - Freitag: 24h/7',
    offers: 'Angebote',
    offersDescription: 'Sie können eine Nachricht auf WhatsApp senden und ein personalisiertes Preisangebot erhalten',
    whatsappMessage: 'Hallo, ich möchte mich über die Dienstleistungen informieren',
    whatsappButton: 'Senden Sie uns eine WhatsApp-Nachricht',
    sendMessage: 'Senden Sie uns eine Nachricht',
  },
  fr: {
    title: 'Nous Attendons Votre Appel',
    subtitle: 'Nous voulons partager notre emplacement pour que vous puissiez nous trouver facilement',
    phone: 'Numéro de Téléphone',
    email: 'Email',
    address: 'Adresse',
    location: 'Arabie Saoudite',
    city: 'Riyad',
    hours: 'Heures de Travail',
    hoursValue: 'Dimanche - Vendredi: 24h/7',
    offers: 'Offres',
    offersDescription: 'Vous pouvez envoyer un message sur WhatsApp et recevoir un devis personnalisé',
    whatsappMessage: 'Bonjour, je voudrais me renseigner sur les services',
    whatsappButton: 'Envoyez-nous un Message WhatsApp',
    sendMessage: 'Envoyez-nous un Message',
  },
};
