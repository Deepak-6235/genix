import { PrismaClient } from '@prisma/client';

export async function seedReviews(prisma: PrismaClient) {
  console.log('🌱 Seeding reviews...');

  // Get all language records
  const languages = await prisma.language.findMany();
  const languageMap = new Map(languages.map(lang => [lang.code, lang.id]));

  const reviews = [
    {
      slug: 'ahmed-al-maliki',
      order: 1,
      rating: 5,
      en: {
        name: 'Ahmed Al-Maliki',
        position: 'Facilities Manager',
        company: 'Elite Trading Company',
        text: 'Excellent and highly professional service. The team is committed and professional in their dealings. I highly recommend dealing with them.',
      },
      ar: {
        name: 'أحمد المالكي',
        position: 'مدير المرافق',
        company: 'شركة النخبة التجارية',
        text: 'خدمة ممتازة واحترافية عالية. الفريق ملتزم ومحترف في تعاملاته. أوصي بشدة بالتعامل معهم.',
      },
      pt: {
        name: 'Ahmed Al-Maliki',
        position: 'Gerente de Instalações',
        company: 'Elite Trading Company',
        text: 'Serviço excelente e altamente profissional. A equipe é comprometida e profissional em suas negociações. Eu recomendo fortemente lidar com eles.',
      },
      zh: {
        name: 'Ahmed Al-Maliki',
        position: '设施经理',
        company: '精英贸易公司',
        text: '优秀且高度专业的服务。团队在处理事务时非常敬业和专业。我强烈推荐与他们合作。',
      },
      ja: {
        name: 'Ahmed Al-Maliki',
        position: '施設管理者',
        company: 'エリートトレーディングカンパニー',
        text: '優れた、非常にプロフェッショナルなサービス。チームは献身的でプロフェッショナルな対応をしてくれます。強くお勧めします。',
      },
    },
    {
      slug: 'fahad-al-otaibi',
      order: 2,
      rating: 5,
      en: {
        name: 'Fahad Al-Otaibi',
        position: 'Property owner',
        company: 'Al Fahad Residential Complex',
        text: 'I dealt with them for building maintenance and the result was fantastic. Speed in completion and quality of work.',
      },
      ar: {
        name: 'فهد العتيبي',
        position: 'مالك عقار',
        company: 'مجمع الفهد السكني',
        text: 'تعاملت معهم في صيانة المبنى وكانت النتيجة رائعة. سرعة في الإنجاز وجودة في العمل.',
      },
      pt: {
        name: 'Fahad Al-Otaibi',
        position: 'Proprietário de imóvel',
        company: 'Complexo Residencial Al Fahad',
        text: 'Lidei com eles para manutenção de edifícios e o resultado foi fantástico. Rapidez na conclusão e qualidade do trabalho.',
      },
      zh: {
        name: 'Fahad Al-Otaibi',
        position: '房产所有者',
        company: 'Al Fahad住宅区',
        text: '我与他们合作进行建筑维护，结果非常棒。完成速度快，工作质量高。',
      },
      ja: {
        name: 'Fahad Al-Otaibi',
        position: '不動産所有者',
        company: 'アルファハド住宅複合施設',
        text: '建物のメンテナンスを依頼しましたが、結果は素晴らしかったです。完成までのスピードと作業の質が優れていました。',
      },
    },
    {
      slug: 'khaled-al-saeed',
      order: 3,
      rating: 5,
      en: {
        name: 'Khaled Al-Saeed',
        position: 'General Manager',
        company: 'Medical Care Hospital',
        text: 'A reliable and cooperative company. Excellent customer service and very reasonable prices.',
      },
      ar: {
        name: 'خالد السعيد',
        position: 'المدير العام',
        company: 'مستشفى الرعاية الطبية',
        text: 'شركة موثوقة ومتعاونة. خدمة عملاء ممتازة وأسعار معقولة جداً.',
      },
      pt: {
        name: 'Khaled Al-Saeed',
        position: 'Gerente Geral',
        company: 'Hospital Medical Care',
        text: 'Uma empresa confiável e cooperativa. Excelente atendimento ao cliente e preços muito razoáveis.',
      },
      zh: {
        name: 'Khaled Al-Saeed',
        position: '总经理',
        company: '医疗护理医院',
        text: '一家可靠且合作的公司。优秀的客户服务和非常合理的价格。',
      },
      ja: {
        name: 'Khaled Al-Saeed',
        position: 'ゼネラルマネージャー',
        company: 'メディカルケア病院',
        text: '信頼できる協力的な会社です。優れたカスタマーサービスと非常にリーズナブルな価格。',
      },
    },
  ];

  console.log(`📝 Creating ${reviews.length} reviews in 5 languages...`);

  let createdCount = 0;
  let updatedCount = 0;

  for (const review of reviews) {
    console.log(`\n📋 Processing review: ${review.slug}`);

    for (const langCode of ['en', 'ar', 'pt', 'zh', 'ja']) {
      const languageId = languageMap.get(langCode);
      if (!languageId) {
        console.warn(`⚠️  Language ${langCode} not found, skipping...`);
        continue;
      }

      const content = review[langCode as keyof typeof review] as any;
      if (!content || typeof content !== 'object') {
        console.warn(`⚠️  No content for ${langCode}, skipping...`);
        continue;
      }

      try {
        const existingReview = await prisma.review.findUnique({
          where: {
            slug_languageId: {
              slug: review.slug,
              languageId: languageId,
            },
          },
        });

        if (existingReview) {
          await prisma.review.update({
            where: { id: existingReview.id },
            data: {
              name: content.name,
              position: content.position,
              company: content.company,
              text: content.text,
              rating: review.rating,
              order: review.order,
              isActive: true,
            },
          });
          updatedCount++;
          console.log(`   ✅ Updated ${langCode}: ${content.name}`);
        } else {
          await prisma.review.create({
            data: {
              slug: review.slug,
              languageId: languageId,
              name: content.name,
              position: content.position,
              company: content.company,
              text: content.text,
              rating: review.rating,
              order: review.order,
              isActive: true,
            },
          });
          createdCount++;
          console.log(`   ✅ Created ${langCode}: ${content.name}`);
        }
      } catch (error) {
        console.error(`   ❌ Error processing ${langCode} for ${review.slug}:`, error);
      }
    }
  }

  console.log(`\n✨ Review seeding completed!`);
  console.log(`   📊 Created: ${createdCount} reviews`);
  console.log(`   📊 Updated: ${updatedCount} reviews`);
  console.log(`   📊 Total: ${createdCount + updatedCount} review records across all languages`);
}
