import { LanguageCode } from '@/lib/languages';

export const topBarTranslations: Record<LanguageCode, {
  phone: string;
  email: string;
  operatingHours: string;
  hours24: string;
  location: string;
  city: string;
}> = {
  ar: {
    phone: 'الهاتف',
    email: 'roknalnakheel@gmail.com',
    operatingHours: 'الأحد - الجمعة',
    hours24: '24/7',
    location: 'المملكة العربية السعودية',
    city: 'الرياض',
  },
  en: {
    phone: 'Phone',
    email: 'roknalnakheel@gmail.com',
    operatingHours: 'Sunday - Friday',
    hours24: '24h/7',
    location: 'Saudi Arabia',
    city: 'Riyadh',
  },
  pt: {
    phone: 'Telefone',
    email: 'roknalnakheel@gmail.com',
    operatingHours: 'Domingo - Sexta',
    hours24: '24h/7',
    location: 'Arábia Saudita',
    city: 'Riade',
  },
  zh: {
    phone: '电话',
    email: 'roknalnakheel@gmail.com',
    operatingHours: '星期日 - 星期五',
    hours24: '24小时/7天',
    location: '沙特阿拉伯',
    city: '利雅得',
  },
  ja: {
    phone: '電話',
    email: 'roknalnakheel@gmail.com',
    operatingHours: '日曜日 - 金曜日',
    hours24: '24時間/7日',
    location: 'サウジアラビア',
    city: 'リヤド',
  },
  de: {
    phone: 'Telefon',
    email: 'roknalnakheel@gmail.com',
    operatingHours: 'Sonntag - Freitag',
    hours24: '24h/7',
    location: 'Saudi-Arabien',
    city: 'Riad',
  },
  fr: {
    phone: 'Téléphone',
    email: 'roknalnakheel@gmail.com',
    operatingHours: 'Dimanche - Vendredi',
    hours24: '24h/7',
    location: 'Arabie Saoudite',
    city: 'Riyad',
  },
};
