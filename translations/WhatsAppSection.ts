import { LanguageCode } from '@/lib/languages';

export const whatsAppSectionTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  description: string;
  button: string;
  message: string;
}> = {
  ar: {
    title: 'استقبل عرض خاص بك',
    subtitle: 'ارسل لنا رسالة على الواتساب',
    description: 'ببساطة قولنا على تفاصيل الخدمة اللي انت محتاجها. وهنبعتلك عروض الأسعار في خلال 24-48 ساعة. قارن بينها واختار الأفضل.',
    button: 'ابدأ المحادثة الآن',
    message: 'مرحباً، أريد الاستفسار عن الخدمات',
  },
  en: {
    title: 'Receive a Custom Quote',
    subtitle: 'Send us a WhatsApp Message',
    description: 'Simply tell us the details of the service you need. We\'ll send you price quotes within 24-48 hours. Compare them and choose the best.',
    button: 'Start Conversation Now',
    message: 'Hello, I would like to inquire about the services',
  },
  pt: {
    title: 'Receba uma Cotação Personalizada',
    subtitle: 'Envie-nos uma Mensagem no WhatsApp',
    description: 'Simplesmente nos diga os detalhes do serviço que você precisa. Enviaremos cotações de preços em 24-48 horas. Compare e escolha o melhor.',
    button: 'Iniciar Conversa Agora',
    message: 'Olá, gostaria de saber mais sobre os serviços',
  },
  zh: {
    title: '接收定制报价',
    subtitle: '在WhatsApp上给我们发消息',
    description: '只需告诉我们您需要的服务详情。我们将在24-48小时内向您发送价格报价。比较它们并选择最好的。',
    button: '立即开始对话',
    message: '你好，我想咨询一下服务',
  },
  ja: {
    title: 'カスタム見積もりを受信',
    subtitle: 'WhatsAppでメッセージを送信',
    description: '必要なサービスの詳細を教えてください。24-48時間以内に価格見積もりをお送りします。それらを比較して最良のものを選択してください。',
    button: '今すぐ会話を開始',
    message: 'こんにちは、サービスについてお問い合わせしたいです',
  },
  de: {
    title: 'Erhalten Sie ein Individuelles Angebot',
    subtitle: 'Senden Sie uns eine WhatsApp-Nachricht',
    description: 'Teilen Sie uns einfach die Details des benötigten Dienstes mit. Wir senden Ihnen innerhalb von 24-48 Stunden Preisangebote. Vergleichen Sie sie und wählen Sie das Beste.',
    button: 'Jetzt Gespräch Starten',
    message: 'Hallo, ich möchte mich über die Dienstleistungen informieren',
  },
  fr: {
    title: 'Recevez un Devis Personnalisé',
    subtitle: 'Envoyez-nous un Message WhatsApp',
    description: 'Dites-nous simplement les détails du service dont vous avez besoin. Nous vous enverrons des devis dans les 24-48 heures. Comparez-les et choisissez le meilleur.',
    button: 'Commencer la Conversation Maintenant',
    message: 'Bonjour, je voudrais me renseigner sur les services',
  },
};
