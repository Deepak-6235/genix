import { LanguageCode } from '@/lib/languages';

export const testimonialsTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    text: string;
  }>;
}> = {
  ar: {
    title: 'آراء عملائنا',
    subtitle: 'نفخر بثقة عملائنا ورضاهم عن خدماتنا',
    testimonials: [
      {
        name: 'أحمد المالكي',
        role: 'مدير مرافق',
        company: 'شركة النخبة التجارية',
        text: 'خدمة ممتازة واحترافية عالية. فريق العمل ملتزم ومحترف في التعامل. أنصح بالتعامل معهم بشدة.',
      },
      {
        name: 'فهد العتيبي',
        role: 'مالك عقار',
        company: 'مجمع الفهد السكني',
        text: 'تعاملت معهم في صيانة المبنى وكانت النتيجة رائعة. سرعة في الإنجاز وجودة في العمل.',
      },
      {
        name: 'خالد السعيد',
        role: 'مدير عام',
        company: 'مستشفى الرعاية الطبية',
        text: 'شركة موثوقة ومتعاونة. خدمة العملاء ممتازة والأسعار مناسبة جداً.',
      },
    ],
  },
  en: {
    title: 'Our Clients\' Opinions',
    subtitle: 'We are proud of our clients\' trust and satisfaction with our services',
    testimonials: [
      {
        name: 'Ahmed Al-Maliki',
        role: 'Facilities Manager',
        company: 'Elite Commercial Company',
        text: 'Excellent and highly professional service. The work team is committed and professional in dealing. I highly recommend dealing with them.',
      },
      {
        name: 'Fahd Al-Otaibi',
        role: 'Property Owner',
        company: 'Fahd Residential Complex',
        text: 'I dealt with them in building maintenance and the result was excellent. Speed in completion and quality in work.',
      },
      {
        name: 'Khalid Al-Saeed',
        role: 'General Manager',
        company: 'Care Medical Hospital',
        text: 'A reliable and cooperative company. Customer service is excellent and prices are very reasonable.',
      },
    ],
  },
  pt: {
    title: 'Opiniões dos Nossos Clientes',
    subtitle: 'Estamos orgulhosos da confiança e satisfação de nossos clientes com nossos serviços',
    testimonials: [
      {
        name: 'Ahmed Al-Maliki',
        role: 'Gerente de Instalações',
        company: 'Empresa Comercial Elite',
        text: 'Serviço excelente e altamente profissional. A equipe de trabalho é comprometida e profissional no atendimento. Recomendo fortemente trabalhar com eles.',
      },
      {
        name: 'Fahd Al-Otaibi',
        role: 'Proprietário',
        company: 'Complexo Residencial Fahd',
        text: 'Lidei com eles na manutenção do edifício e o resultado foi excelente. Rapidez na conclusão e qualidade no trabalho.',
      },
      {
        name: 'Khalid Al-Saeed',
        role: 'Gerente Geral',
        company: 'Hospital Médico Care',
        text: 'Uma empresa confiável e cooperativa. O atendimento ao cliente é excelente e os preços são muito razoáveis.',
      },
    ],
  },
  zh: {
    title: '我们客户的意见',
    subtitle: '我们为我们客户的信任和对我们服务的满意度感到自豪',
    testimonials: [
      {
        name: '艾哈迈德·马利基',
        role: '设施经理',
        company: '精英商业公司',
        text: '优秀且高度专业的服务。工作团队在处理方面承诺且专业。我强烈推荐与他们合作。',
      },
      {
        name: '法赫德·奥泰比',
        role: '物业所有者',
        company: '法赫德住宅综合体',
        text: '我与他们合作进行建筑维护，结果非常出色。完成速度快，工作质量高。',
      },
      {
        name: '哈立德·赛义德',
        role: '总经理',
        company: '护理医疗医院',
        text: '一家可靠且合作的公司。客户服务优秀，价格非常合理。',
      },
    ],
  },
  ja: {
    title: 'お客様の意見',
    subtitle: 'お客様の信頼と私たちのサービスへの満足度を誇りに思っています',
    testimonials: [
      {
        name: 'アハメド・アルマリキ',
        role: '施設管理者',
        company: 'エリート商業会社',
        text: '優れた高度に専門的なサービス。作業チームは取り組みがコミットされ、プロフェッショナルです。強くお勧めします。',
      },
      {
        name: 'ファハド・アルオタイビ',
        role: '不動産所有者',
        company: 'ファハド住宅複合施設',
        text: '建物のメンテナンスで彼らと取引し、結果は優れていました。完成の速度と作業の質。',
      },
      {
        name: 'ハーリド・アルサイード',
        role: 'ゼネラルマネージャー',
        company: 'ケア医療病院',
        text: '信頼できる協力的な会社。カスタマーサービスは優れており、価格は非常に合理的です。',
      },
    ],
  },
  de: {
    title: 'Meinungen Unserer Kunden',
    subtitle: 'Wir sind stolz auf das Vertrauen und die Zufriedenheit unserer Kunden mit unseren Dienstleistungen',
    testimonials: [
      {
        name: 'Ahmed Al-Maliki',
        role: 'Einrichtungsleiter',
        company: 'Elite Handelsunternehmen',
        text: 'Ausgezeichneter und hochprofessioneller Service. Das Arbeitsteam ist engagiert und professionell im Umgang. Ich empfehle dringend, mit ihnen zu arbeiten.',
      },
      {
        name: 'Fahd Al-Otaibi',
        role: 'Immobilienbesitzer',
        company: 'Fahd Wohnkomplex',
        text: 'Ich habe mit ihnen bei der Gebäudewartung zusammengearbeitet und das Ergebnis war ausgezeichnet. Geschwindigkeit bei der Fertigstellung und Qualität bei der Arbeit.',
      },
      {
        name: 'Khalid Al-Saeed',
        role: 'Geschäftsführer',
        company: 'Care Medical Hospital',
        text: 'Ein zuverlässiges und kooperatives Unternehmen. Der Kundenservice ist ausgezeichnet und die Preise sind sehr angemessen.',
      },
    ],
  },
  fr: {
    title: 'Opinions de Nos Clients',
    subtitle: 'Nous sommes fiers de la confiance et de la satisfaction de nos clients avec nos services',
    testimonials: [
      {
        name: 'Ahmed Al-Maliki',
        role: 'Directeur des Installations',
        company: 'Société Commerciale Elite',
        text: 'Service excellent et hautement professionnel. L\'équipe de travail est engagée et professionnelle dans le traitement. Je recommande fortement de travailler avec eux.',
      },
      {
        name: 'Fahd Al-Otaibi',
        role: 'Propriétaire Immobilier',
        company: 'Complexe Résidentiel Fahd',
        text: 'J\'ai travaillé avec eux pour la maintenance du bâtiment et le résultat était excellent. Rapidité dans l\'achèvement et qualité dans le travail.',
      },
      {
        name: 'Khalid Al-Saeed',
        role: 'Directeur Général',
        company: 'Hôpital Médical Care',
        text: 'Une entreprise fiable et coopérative. Le service client est excellent et les prix sont très raisonnables.',
      },
    ],
  },
};
