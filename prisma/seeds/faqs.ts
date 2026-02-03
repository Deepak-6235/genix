// Load environment variables FIRST
import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Sample FAQ data - some with answers, some without
const faqsData = [
  {
    question: 'What services do you provide?',
    answer: 'We provide comprehensive pest control, cleaning, AC maintenance, painting, and plumbing services across Riyadh. Our team of certified professionals ensures high-quality service delivery.',
    isActive: true,
  },
  {
    question: 'How can I book your services?',
    answer: 'You can book our services through our website, mobile app, or by calling our 24/7 customer service hotline. We offer flexible scheduling to fit your needs.',
    isActive: true,
  },
  {
    question: 'Do you offer emergency services?',
    answer: 'Yes, we provide 24/7 emergency services for urgent issues like plumbing leaks, AC breakdowns, and pest infestations. Contact us anytime for immediate assistance.',
    isActive: true,
  },
  {
    question: 'What are your payment methods?',
    answer: null, // Unanswered question
    isActive: true,
  },
  {
    question: 'Do you provide warranties on your services?',
    answer: 'Yes, we provide warranties on all our services. The warranty period varies depending on the type of service. Please contact us for specific warranty details.',
    isActive: true,
  },
  {
    question: 'Are your technicians certified?',
    answer: 'All our technicians are fully certified, trained, and insured. They undergo regular training to stay updated with the latest industry standards and techniques.',
    isActive: true,
  },
  {
    question: 'What areas do you serve?',
    answer: null, // Unanswered question
    isActive: true,
  },
  {
    question: 'How long does a typical service take?',
    answer: null, // Unanswered question
    isActive: true,
  },
];

// Translations for questions and answers
const translations: Record<string, Record<string, { question: string; answer: string | null }>> = {
  en: {
    '0': { question: 'What services do you provide?', answer: 'We provide comprehensive pest control, cleaning, AC maintenance, painting, and plumbing services across Riyadh. Our team of certified professionals ensures high-quality service delivery.' },
    '1': { question: 'How can I book your services?', answer: 'You can book our services through our website, mobile app, or by calling our 24/7 customer service hotline. We offer flexible scheduling to fit your needs.' },
    '2': { question: 'Do you offer emergency services?', answer: 'Yes, we provide 24/7 emergency services for urgent issues like plumbing leaks, AC breakdowns, and pest infestations. Contact us anytime for immediate assistance.' },
    '3': { question: 'What are your payment methods?', answer: null },
    '4': { question: 'Do you provide warranties on your services?', answer: 'Yes, we provide warranties on all our services. The warranty period varies depending on the type of service. Please contact us for specific warranty details.' },
    '5': { question: 'Are your technicians certified?', answer: 'All our technicians are fully certified, trained, and insured. They undergo regular training to stay updated with the latest industry standards and techniques.' },
    '6': { question: 'What areas do you serve?', answer: null },
    '7': { question: 'How long does a typical service take?', answer: null },
  },
  ar: {
    '0': { question: 'ما هي الخدمات التي تقدمونها؟', answer: 'نقدم خدمات شاملة لمكافحة الآفات والتنظيف وصيانة المكيفات والطلاء والسباكة في جميع أنحاء الرياض. فريقنا من المحترفين المعتمدين يضمن تقديم خدمة عالية الجودة.' },
    '1': { question: 'كيف يمكنني حجز خدماتكم؟', answer: 'يمكنك حجز خدماتنا من خلال موقعنا الإلكتروني أو تطبيق الهاتف المحمول أو الاتصال بخط خدمة العملاء المتاح على مدار 24/7. نوفر جدولة مرنة لتلبية احتياجاتك.' },
    '2': { question: 'هل تقدمون خدمات طوارئ؟', answer: 'نعم، نقدم خدمات طوارئ على مدار 24/7 للمشاكل العاجلة مثل تسربات السباكة وأعطال المكيفات والإصابة بالآفات. اتصل بنا في أي وقت للحصول على مساعدة فورية.' },
    '3': { question: 'ما هي طرق الدفع المتاحة؟', answer: null },
    '4': { question: 'هل تقدمون ضمانات على خدماتكم؟', answer: 'نعم، نقدم ضمانات على جميع خدماتنا. تختلف فترة الضمان حسب نوع الخدمة. يرجى الاتصال بنا للحصول على تفاصيل الضمان المحددة.' },
    '5': { question: 'هل الفنيون لديكم معتمدون؟', answer: 'جميع الفنيين لدينا معتمدون ومدربون ومؤمنون بالكامل. يخضعون لتدريب منتظم للبقاء على اطلاع بأحدث معايير وتقنيات الصناعة.' },
    '6': { question: 'ما هي المناطق التي تخدمونها؟', answer: null },
    '7': { question: 'كم من الوقت تستغرق الخدمة عادة؟', answer: null },
  },
  pt: {
    '0': { question: 'Quais serviços vocês fornecem?', answer: 'Fornecemos controle abrangente de pragas, limpeza, manutenção de AC, pintura e serviços de encanamento em toda Riad. Nossa equipe de profissionais certificados garante entrega de serviço de alta qualidade.' },
    '1': { question: 'Como posso reservar seus serviços?', answer: 'Você pode reservar nossos serviços através do nosso site, aplicativo móvel ou ligando para nossa linha de atendimento ao cliente 24/7. Oferecemos agendamento flexível para atender suas necessidades.' },
    '2': { question: 'Vocês oferecem serviços de emergência?', answer: 'Sim, fornecemos serviços de emergência 24/7 para problemas urgentes como vazamentos de encanamento, quebras de AC e infestações de pragas. Entre em contato conosco a qualquer momento para assistência imediata.' },
    '3': { question: 'Quais são seus métodos de pagamento?', answer: null },
    '4': { question: 'Vocês fornecem garantias em seus serviços?', answer: 'Sim, fornecemos garantias em todos os nossos serviços. O período de garantia varia dependendo do tipo de serviço. Entre em contato conosco para detalhes específicos de garantia.' },
    '5': { question: 'Seus técnicos são certificados?', answer: 'Todos os nossos técnicos são totalmente certificados, treinados e segurados. Eles passam por treinamento regular para se manterem atualizados com os padrões e técnicas mais recentes da indústria.' },
    '6': { question: 'Quais áreas vocês atendem?', answer: null },
    '7': { question: 'Quanto tempo leva um serviço típico?', answer: null },
  },
  zh: {
    '0': { question: '你们提供什么服务？', answer: '我们在利雅得提供全面的害虫控制、清洁、空调维护、油漆和管道服务。我们的认证专业团队确保高质量的服务交付。' },
    '1': { question: '我如何预订你们的服务？', answer: '您可以通过我们的网站、移动应用程序预订我们的服务，或致电我们的24/7客户服务热线。我们提供灵活的时间安排以满足您的需求。' },
    '2': { question: '你们提供紧急服务吗？', answer: '是的，我们为管道泄漏、空调故障和害虫侵扰等紧急问题提供24/7紧急服务。随时联系我们以获得即时帮助。' },
    '3': { question: '你们的付款方式有哪些？', answer: null },
    '4': { question: '你们的服务提供保修吗？', answer: '是的，我们为所有服务提供保修。保修期根据服务类型而异。请联系我们了解具体的保修详情。' },
    '5': { question: '你们的技术人员有资质吗？', answer: '我们所有的技术人员都经过全面认证、培训并投保。他们定期接受培训以跟上最新的行业标准和技术。' },
    '6': { question: '你们服务哪些地区？', answer: null },
    '7': { question: '典型服务需要多长时间？', answer: null },
  },
  ja: {
    '0': { question: 'どのようなサービスを提供していますか？', answer: 'リヤドで包括的な害虫駆除、清掃、エアコンメンテナンス、塗装、配管サービスを提供しています。認定された専門家チームが高品質なサービス提供を保証します。' },
    '1': { question: 'サービスの予約方法は？', answer: 'ウェブサイト、モバイルアプリ、または24時間年中無休のカスタマーサービスホットラインへの電話でサービスを予約できます。お客様のニーズに合わせて柔軟なスケジュール設定を提供します。' },
    '2': { question: '緊急サービスは提供していますか？', answer: 'はい、配管漏れ、エアコン故障、害虫侵入などの緊急問題に対して24時間年中無休の緊急サービスを提供しています。いつでもお問い合わせください。' },
    '3': { question: '支払い方法は何ですか？', answer: null },
    '4': { question: 'サービスに保証はありますか？', answer: 'はい、すべてのサービスに保証を提供しています。保証期間はサービスの種類によって異なります。具体的な保証の詳細についてはお問い合わせください。' },
    '5': { question: '技術者は認定されていますか？', answer: 'すべての技術者は完全に認定され、訓練を受け、保険に加入しています。最新の業界標準と技術について常に更新されるよう定期的なトレーニングを受けています。' },
    '6': { question: 'どの地域にサービスを提供していますか？', answer: null },
    '7': { question: '通常のサービスにどのくらい時間がかかりますか？', answer: null },
  },
  de: {
    '0': { question: 'Welche Dienstleistungen bieten Sie an?', answer: 'Wir bieten umfassende Schädlingsbekämpfung, Reinigung, Klimaanlagen-Wartung, Malerarbeiten und Installationsdienstleistungen in ganz Riad. Unser Team zertifizierter Fachleute gewährleistet hochwertige Serviceleistungen.' },
    '1': { question: 'Wie kann ich Ihre Dienstleistungen buchen?', answer: 'Sie können unsere Dienstleistungen über unsere Website, mobile App oder durch Anruf unserer 24/7-Kundenservice-Hotline buchen. Wir bieten flexible Terminvereinbarungen nach Ihren Bedürfnissen.' },
    '2': { question: 'Bieten Sie Notdienste an?', answer: 'Ja, wir bieten 24/7-Notdienste für dringende Probleme wie Rohrlecks, Klimaanlagenausfälle und Schädlingsbefälle. Kontaktieren Sie uns jederzeit für sofortige Hilfe.' },
    '3': { question: 'Was sind Ihre Zahlungsmethoden?', answer: null },
    '4': { question: 'Bieten Sie Garantien auf Ihre Dienstleistungen?', answer: 'Ja, wir bieten Garantien auf alle unsere Dienstleistungen. Die Garantiezeit variiert je nach Art der Dienstleistung. Bitte kontaktieren Sie uns für spezifische Garantiedetails.' },
    '5': { question: 'Sind Ihre Techniker zertifiziert?', answer: 'Alle unsere Techniker sind vollständig zertifiziert, geschult und versichert. Sie durchlaufen regelmäßige Schulungen, um mit den neuesten Industriestandards und -techniken auf dem Laufenden zu bleiben.' },
    '6': { question: 'Welche Gebiete bedienen Sie?', answer: null },
    '7': { question: 'Wie lange dauert eine typische Dienstleistung?', answer: null },
  },
  fr: {
    '0': { question: 'Quels services fournissez-vous ?', answer: 'Nous fournissons un contrôle complet des nuisibles, un nettoyage, une maintenance AC, une peinture et des services de plomberie à travers Riyad. Notre équipe de professionnels certifiés garantit une prestation de service de haute qualité.' },
    '1': { question: 'Comment puis-je réserver vos services ?', answer: 'Vous pouvez réserver nos services via notre site web, notre application mobile ou en appelant notre ligne d\'assistance client 24/7. Nous offrons une planification flexible pour répondre à vos besoins.' },
    '2': { question: 'Offrez-vous des services d\'urgence ?', answer: 'Oui, nous fournissons des services d\'urgence 24/7 pour les problèmes urgents comme les fuites de plomberie, les pannes AC et les infestations de nuisibles. Contactez-nous à tout moment pour une assistance immédiate.' },
    '3': { question: 'Quels sont vos méthodes de paiement ?', answer: null },
    '4': { question: 'Fournissez-vous des garanties sur vos services ?', answer: 'Oui, nous fournissons des garanties sur tous nos services. La période de garantie varie selon le type de service. Veuillez nous contacter pour des détails spécifiques de garantie.' },
    '5': { question: 'Vos techniciens sont-ils certifiés ?', answer: 'Tous nos techniciens sont entièrement certifiés, formés et assurés. Ils suivent une formation régulière pour rester à jour avec les dernières normes et techniques de l\'industrie.' },
    '6': { question: 'Quelles zones desservez-vous ?', answer: null },
    '7': { question: 'Combien de temps prend un service typique ?', answer: null },
  },
};

export async function seedFAQs(prisma: PrismaClient) {
  console.log('📋 Seeding FAQs...');

  try {
    // Get all languages
    const languages = await prisma.language.findMany();

    if (languages.length === 0) {
      throw new Error('No languages found. Please seed languages first.');
    }

    console.log(`Found ${languages.length} languages`);

    // Seed each FAQ
    for (let i = 0; i < faqsData.length; i++) {
      const faqData = faqsData[i];
      const faqId = uuidv4();

      console.log(`\nCreating FAQ ${i + 1}/${faqsData.length}: "${faqData.question}"`);

      // Create FAQ in all languages
      for (const lang of languages) {
        const translation = translations[lang.code]?.[i.toString()];

        if (!translation) {
          console.log(`  ⚠️  No translation for ${lang.code}, using English`);
          continue;
        }

        await prisma.fAQ.create({
          data: {
            faqId,
            languageId: lang.id,
            question: translation.question,
            answer: translation.answer,
            isActive: faqData.isActive,
            order: i,
          },
        });

        const status = translation.answer ? '✓ (answered)' : '○ (pending)';
        console.log(`  ${status} ${lang.code}`);
      }
    }

    console.log('\n✅ FAQ seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  seedFAQs(prisma)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
}
