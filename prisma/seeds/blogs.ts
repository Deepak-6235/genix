import { PrismaClient } from '@prisma/client';

// Blog data from static webpage with translations to all 5 languages
const blogsData = [
  {
    slug: 'best-house-cleaning-companies-in-riyadh',
    author: 'admin',
    imageUrl: '/images/blog-1.jpg',
    publishedAt: new Date('2022-04-09'),
    isActive: true,
    order: 0,
    translations: {
      en: {
        name: 'Best house cleaning companies in Riyadh',
        shortDescription: 'A comprehensive guide to the best cleaning companies in Riyadh with tips for choosing the right company for your needs.',
      },
      ar: {
        name: 'أفضل شركات تنظيف منازل في الرياض',
        shortDescription: 'دليل شامل لأفضل شركات التنظيف في الرياض مع نصائح لاختيار الشركة المناسبة لاحتياجاتك.',
      },
      pt: {
        name: 'Melhores empresas de limpeza de casas em Riade',
        shortDescription: 'Um guia completo para as melhores empresas de limpeza em Riade com dicas para escolher a empresa certa para suas necessidades.',
      },
      zh: {
        name: '利雅得最佳房屋清洁公司',
        shortDescription: '利雅得最佳清洁公司综合指南，并提供选择适合您需求的公司的建议。',
      },
      ja: {
        name: 'リヤドの最高のハウスクリーニング会社',
        shortDescription: 'リヤドの最高の清掃会社の総合ガイドと、ニーズに合った会社を選ぶためのヒント。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Why Choose Professional Cleaning Companies?',
            description: 'Professional cleaning companies provide specialized equipment and trained staff to ensure your home is thoroughly cleaned. They save you time and effort while delivering exceptional results that are difficult to achieve with regular cleaning.',
          },
          ar: {
            title: 'لماذا تختار شركات التنظيف المحترفة؟',
            description: 'توفر شركات التنظيف المحترفة معدات متخصصة وموظفين مدربين لضمان تنظيف منزلك بشكل شامل. فهي توفر لك الوقت والجهد مع تقديم نتائج استثنائية يصعب تحقيقها بالتنظيف العادي.',
          },
          pt: {
            title: 'Por que escolher empresas de limpeza profissionais?',
            description: 'As empresas de limpeza profissionais fornecem equipamentos especializados e pessoal treinado para garantir que sua casa seja completamente limpa. Eles economizam seu tempo e esforço, ao mesmo tempo em que oferecem resultados excepcionais que são difíceis de alcançar com a limpeza regular.',
          },
          zh: {
            title: '为什么选择专业清洁公司？',
            description: '专业清洁公司提供专业设备和训练有素的员工，确保您的家彻底清洁。他们为您节省时间和精力，同时提供常规清洁难以实现的卓越效果。',
          },
          ja: {
            title: 'なぜプロの清掃会社を選ぶのか？',
            description: 'プロの清掃会社は専門的な機器と訓練されたスタッフを提供し、あなたの家が徹底的に清掃されることを保証します。彼らはあなたの時間と労力を節約し、通常の清掃では達成が難しい優れた結果を提供します。',
          },
        },
      },
      {
        order: 1,
        imageUrl: null,
        translations: {
          en: {
            title: 'Services Offered by Top Cleaning Companies',
            description: 'The best cleaning companies in Riyadh offer comprehensive services including deep cleaning, sanitization, carpet cleaning, window cleaning, and post-construction cleaning. They use eco-friendly products and modern techniques to ensure your satisfaction.',
          },
          ar: {
            title: 'الخدمات التي تقدمها أفضل شركات التنظيف',
            description: 'تقدم أفضل شركات التنظيف في الرياض خدمات شاملة تشمل التنظيف العميق والتعقيم وتنظيف السجاد وتنظيف النوافذ والتنظيف بعد البناء. يستخدمون منتجات صديقة للبيئة وتقنيات حديثة لضمان رضاك.',
          },
          pt: {
            title: 'Serviços oferecidos pelas principais empresas de limpeza',
            description: 'As melhores empresas de limpeza em Riade oferecem serviços abrangentes, incluindo limpeza profunda, higienização, limpeza de carpetes, limpeza de janelas e limpeza pós-construção. Eles usam produtos ecológicos e técnicas modernas para garantir sua satisfação.',
          },
          zh: {
            title: '顶级清洁公司提供的服务',
            description: '利雅得最好的清洁公司提供全面的服务，包括深度清洁、消毒、地毯清洁、窗户清洁和建筑后清洁。他们使用环保产品和现代技术来确保您的满意度。',
          },
          ja: {
            title: 'トップクリーニング会社が提供するサービス',
            description: 'リヤドの最高の清掃会社は、ディープクリーニング、消毒、カーペットクリーニング、窓掃除、建設後の清掃を含む包括的なサービスを提供しています。彼らは環境に優しい製品と最新技術を使用して、あなたの満足を保証します。',
          },
        },
      },
    ],
  },
  {
    slug: 'wall-fountains-design-company',
    author: 'admin',
    imageUrl: '/images/blog-2.jpg',
    publishedAt: new Date('2022-04-07'),
    isActive: true,
    order: 1,
    translations: {
      en: {
        name: 'Rokan Al-Nakheel Company for designing wall fountains',
        shortDescription: 'Discover how wall fountains can add a unique aesthetic touch to your home or office.',
      },
      ar: {
        name: 'شركة ركن النخيل لتصميم شلالات جدارية',
        shortDescription: 'اكتشف كيف يمكن لشلالات جدارية أن تضيف لمسة جمالية فريدة لمنزلك أو مكتبك.',
      },
      pt: {
        name: 'Empresa Rokan Al-Nakheel para design de fontes de parede',
        shortDescription: 'Descubra como as fontes de parede podem adicionar um toque estético único à sua casa ou escritório.',
      },
      zh: {
        name: 'Rokan Al-Nakheel 墙壁喷泉设计公司',
        shortDescription: '了解墙壁喷泉如何为您的家或办公室增添独特的美学触感。',
      },
      ja: {
        name: 'ロカン・アル・ナヒール壁噴水デザイン会社',
        shortDescription: '壁の噴水があなたの家やオフィスにユニークな美的タッチを加える方法を発見してください。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Benefits of Wall Fountains',
            description: 'Wall fountains create a relaxing atmosphere with the soothing sound of flowing water. They improve air quality, add humidity to dry environments, and serve as stunning focal points in interior design.',
          },
          ar: {
            title: 'فوائد الشلالات الجدارية',
            description: 'تخلق الشلالات الجدارية أجواء مريحة مع صوت الماء المتدفق المهدئ. فهي تحسن جودة الهواء وتضيف الرطوبة إلى البيئات الجافة وتعمل كنقاط محورية مذهلة في التصميم الداخلي.',
          },
          pt: {
            title: 'Benefícios das fontes de parede',
            description: 'As fontes de parede criam uma atmosfera relaxante com o som suave da água corrente. Eles melhoram a qualidade do ar, adicionam umidade a ambientes secos e servem como pontos focais deslumbrantes no design de interiores.',
          },
          zh: {
            title: '墙壁喷泉的好处',
            description: '墙壁喷泉通过流水的舒缓声音营造出轻松的氛围。它们改善空气质量，为干燥环境增加湿度，并作为室内设计中令人惊叹的焦点。',
          },
          ja: {
            title: '壁噴水の利点',
            description: '壁の噴水は、流れる水の心地よい音でリラックスした雰囲気を作り出します。空気の質を改善し、乾燥した環境に湿度を加え、インテリアデザインの素晴らしい焦点として機能します。',
          },
        },
      },
    ],
  },
  {
    slug: 'split-ac-repair-company-riyadh',
    author: 'admin',
    imageUrl: '/images/blog-3.jpg',
    publishedAt: new Date('2022-04-06'),
    isActive: true,
    order: 2,
    translations: {
      en: {
        name: 'Split AC repair company in Riyadh',
        shortDescription: 'Comprehensive guide to maintaining and repairing split air conditioners with important tips for maintaining AC efficiency.',
      },
      ar: {
        name: 'شركة تصليح مكيف سبلت بالرياض',
        shortDescription: 'دليل شامل لصيانة وإصلاح مكيفات السبليت مع أهم النصائح للحفاظ على كفاءة المكيف.',
      },
      pt: {
        name: 'Empresa de reparo de ar condicionado split em Riade',
        shortDescription: 'Guia completo para manutenção e reparo de ar condicionado split com dicas importantes para manter a eficiência do AC.',
      },
      zh: {
        name: '利雅得分体式空调维修公司',
        shortDescription: '维护和维修分体式空调的综合指南，以及保持空调效率的重要提示。',
      },
      ja: {
        name: 'リヤドのスプリットエアコン修理会社',
        shortDescription: 'スプリットエアコンのメンテナンスと修理の包括的なガイドと、エアコン効率を維持するための重要なヒント。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Common Split AC Problems',
            description: 'Split air conditioners may experience issues such as refrigerant leaks, clogged filters, electrical problems, or compressor failures. Regular maintenance and timely repairs can prevent these issues and extend the lifespan of your unit.',
          },
          ar: {
            title: 'مشاكل مكيفات السبليت الشائعة',
            description: 'قد تواجه مكيفات السبليت مشاكل مثل تسرب غاز التبريد، أو انسداد الفلاتر، أو المشاكل الكهربائية، أو فشل الضاغط. الصيانة الدورية والإصلاحات في الوقت المناسب يمكن أن تمنع هذه المشاكل وتطيل عمر الوحدة.',
          },
          pt: {
            title: 'Problemas comuns de AC split',
            description: 'Os aparelhos de ar condicionado split podem apresentar problemas como vazamentos de refrigerante, filtros entupidos, problemas elétricos ou falhas no compressor. A manutenção regular e os reparos oportunos podem prevenir esses problemas e prolongar a vida útil da sua unidade.',
          },
          zh: {
            title: '常见的分体式空调问题',
            description: '分体式空调可能会遇到制冷剂泄漏、过滤器堵塞、电气问题或压缩机故障等问题。定期维护和及时维修可以防止这些问题并延长设备的使用寿命。',
          },
          ja: {
            title: '一般的なスプリットエアコンの問題',
            description: 'スプリットエアコンは、冷媒漏れ、フィルターの詰まり、電気的問題、またはコンプレッサーの故障などの問題が発生する可能性があります。定期的なメンテナンスとタイムリーな修理により、これらの問題を防ぎ、ユニットの寿命を延ばすことができます。',
          },
        },
      },
    ],
  },
  {
    slug: 'famous-painting-companies-riyadh',
    author: 'admin',
    imageUrl: '/images/blog-4.jpg',
    publishedAt: new Date('2022-04-04'),
    isActive: true,
    order: 3,
    translations: {
      en: {
        name: 'The most famous painting companies in Riyadh with the latest technologies used',
        shortDescription: 'Learn about the latest painting and decoration techniques used in Riyadh and the most important modern trends.',
      },
      ar: {
        name: 'اشهر شركات الدهانات بالرياض باحدث التقنيات المستخدمه',
        shortDescription: 'تعرف على أحدث تقنيات الدهانات والديكورات المستخدمة في الرياض وأهم الاتجاهات الحديثة.',
      },
      pt: {
        name: 'As empresas de pintura mais famosas em Riade com as mais recentes tecnologias utilizadas',
        shortDescription: 'Aprenda sobre as mais recentes técnicas de pintura e decoração utilizadas em Riade e as tendências modernas mais importantes.',
      },
      zh: {
        name: '利雅得最著名的油漆公司采用最新技术',
        shortDescription: '了解利雅得使用的最新涂料和装饰技术以及最重要的现代趋势。',
      },
      ja: {
        name: 'リヤドで最も有名な最新技術を使用した塗装会社',
        shortDescription: 'リヤドで使用されている最新の塗装と装飾技術、および最も重要な現代のトレンドについて学びます。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Modern Painting Techniques',
            description: 'Modern painting companies use advanced techniques such as spray painting, textured finishes, eco-friendly paints, and digital color matching. These technologies ensure perfect results, durability, and minimal environmental impact.',
          },
          ar: {
            title: 'تقنيات الدهانات الحديثة',
            description: 'تستخدم شركات الدهانات الحديثة تقنيات متقدمة مثل الرش، والتشطيبات الملمسية، والدهانات الصديقة للبيئة، ومطابقة الألوان الرقمية. تضمن هذه التقنيات نتائج مثالية ومتانة وتأثير بيئي ضئيل.',
          },
          pt: {
            title: 'Técnicas modernas de pintura',
            description: 'As empresas de pintura modernas usam técnicas avançadas, como pintura a spray, acabamentos texturizados, tintas ecológicas e combinação de cores digitais. Essas tecnologias garantem resultados perfeitos, durabilidade e impacto ambiental mínimo.',
          },
          zh: {
            title: '现代涂装技术',
            description: '现代涂料公司使用先进技术，如喷涂、纹理饰面、环保涂料和数字配色。这些技术确保完美的效果、耐用性和最小的环境影响。',
          },
          ja: {
            title: '現代の塗装技術',
            description: '現代の塗装会社は、スプレー塗装、テクスチャー仕上げ、環境に優しい塗料、デジタルカラーマッチングなどの高度な技術を使用しています。これらの技術は、完璧な結果、耐久性、そして最小限の環境への影響を保証します。',
          },
        },
      },
    ],
  },
  {
    slug: 'how-to-repair-split-air-conditioners',
    author: 'admin',
    imageUrl: '/images/blog-5.jpg',
    publishedAt: new Date('2022-04-04'),
    isActive: true,
    order: 4,
    translations: {
      en: {
        name: 'Learn how to repair split air conditioners and the most common problems',
        shortDescription: 'A comprehensive guide to the most common split air conditioner problems and how to fix them professionally.',
      },
      ar: {
        name: 'التعرف على كيفية تصليح مكيفات سبليت واكثر المشاكل شيوعاً',
        shortDescription: 'دليل شامل لأكثر مشاكل مكيفات السبليت شيوعاً وكيفية إصلاحها بطرق احترافية.',
      },
      pt: {
        name: 'Aprenda a reparar aparelhos de ar condicionado split e os problemas mais comuns',
        shortDescription: 'Um guia completo para os problemas mais comuns de ar condicionado split e como corrigi-los profissionalmente.',
      },
      zh: {
        name: '了解如何修理分体式空调以及最常见的问题',
        shortDescription: '最常见的分体式空调问题以及如何专业修复的综合指南。',
      },
      ja: {
        name: 'スプリットエアコンの修理方法と最も一般的な問題を学ぶ',
        shortDescription: '最も一般的なスプリットエアコンの問題とそれらを専門的に修正する方法の包括的なガイド。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Troubleshooting Guide',
            description: 'Learn to diagnose and fix common issues like poor cooling, water leaks, unusual noises, and error codes. Understanding these problems can help you decide when to call a professional and when you can handle repairs yourself.',
          },
          ar: {
            title: 'دليل استكشاف الأخطاء وإصلاحها',
            description: 'تعلم تشخيص وإصلاح المشاكل الشائعة مثل التبريد الضعيف، وتسرب الماء، والأصوات غير العادية، ورموز الخطأ. فهم هذه المشاكل يمكن أن يساعدك في تحديد متى تتصل بمحترف ومتى يمكنك التعامل مع الإصلاحات بنفسك.',
          },
          pt: {
            title: 'Guia de solução de problemas',
            description: 'Aprenda a diagnosticar e corrigir problemas comuns, como resfriamento insuficiente, vazamentos de água, ruídos incomuns e códigos de erro. Compreender esses problemas pode ajudá-lo a decidir quando chamar um profissional e quando você pode lidar com reparos sozinho.',
          },
          zh: {
            title: '故障排除指南',
            description: '学习诊断和修复常见问题，如冷却不佳、漏水、异常噪音和错误代码。了解这些问题可以帮助您决定何时致电专业人员以及何时可以自己处理维修。',
          },
          ja: {
            title: 'トラブルシューティングガイド',
            description: '冷却不良、水漏れ、異常な音、エラーコードなどの一般的な問題を診断して修正する方法を学びます。これらの問題を理解することで、専門家に電話するタイミングと自分で修理を処理できるタイミングを判断できます。',
          },
        },
      },
    ],
  },
  {
    slug: 'roof-insulation-white-cement',
    author: 'admin',
    imageUrl: '/images/blog-6.jpg',
    publishedAt: new Date('2022-04-03'),
    isActive: true,
    order: 5,
    translations: {
      en: {
        name: 'Roof insulation company with white cement at the best prices',
        shortDescription: 'Everything you need to know about roof insulation with white cement and its importance in protecting buildings.',
      },
      ar: {
        name: 'شركة عزل الاسطح بالاسمنت الأبيض بأفضل الاسعار',
        shortDescription: 'كل ما تحتاج معرفته عن عزل الأسطح بالأسمنت الأبيض وأهميته في حماية المباني.',
      },
      pt: {
        name: 'Empresa de isolamento de telhados com cimento branco aos melhores preços',
        shortDescription: 'Tudo o que você precisa saber sobre isolamento de telhado com cimento branco e sua importância na proteção de edifícios.',
      },
      zh: {
        name: '白水泥屋顶保温公司，价格最优',
        shortDescription: '您需要了解的有关白水泥屋顶保温及其在保护建筑物方面的重要性的所有信息。',
      },
      ja: {
        name: '最高の価格で白セメントの屋根断熱会社',
        shortDescription: '白セメントによる屋根断熱と、建物の保護におけるその重要性について知っておくべきすべて。',
      },
    },
    detailedSections: [
      {
        order: 0,
        imageUrl: null,
        translations: {
          en: {
            title: 'Benefits of White Cement Insulation',
            description: 'White cement insulation provides excellent protection against heat and moisture. It reflects sunlight, reduces energy costs, prevents water damage, and extends the life of your roof. This cost-effective solution is ideal for the hot climate of Riyadh.',
          },
          ar: {
            title: 'فوائد عزل الأسمنت الأبيض',
            description: 'يوفر عزل الأسمنت الأبيض حماية ممتازة ضد الحرارة والرطوبة. فهو يعكس ضوء الشمس، ويقلل من تكاليف الطاقة، ويمنع أضرار المياه، ويطيل عمر السطح. هذا الحل الفعال من حيث التكلفة مثالي للمناخ الحار في الرياض.',
          },
          pt: {
            title: 'Benefícios do isolamento com cimento branco',
            description: 'O isolamento de cimento branco fornece excelente proteção contra calor e umidade. Ele reflete a luz solar, reduz os custos de energia, evita danos causados ​​pela água e prolonga a vida útil do seu telhado. Esta solução econômica é ideal para o clima quente de Riade.',
          },
          zh: {
            title: '白水泥保温的好处',
            description: '白水泥保温可提供出色的隔热和防潮保护。它反射阳光，降低能源成本，防止水损害，并延长屋顶的使用寿命。这种具有成本效益的解决方案非常适合利雅得的炎热气候。',
          },
          ja: {
            title: '白セメント断熱の利点',
            description: '白セメント断熱は、熱と湿気に対する優れた保護を提供します。日光を反射し、エネルギーコストを削減し、水害を防ぎ、屋根の寿命を延ばします。この費用対効果の高いソリューションは、リヤドの暑い気候に理想的です。',
          },
        },
      },
    ],
  },
];

export async function seedBlogs(prisma: PrismaClient) {
  console.log('🌱 Seeding blogs...');

  try {
    // Get all languages from database
    const languages = await prisma.language.findMany();

    if (languages.length === 0) {
      console.error('No languages found in database. Please seed languages first.');
      return;
    }

    console.log(`Found ${languages.length} languages`);

    for (const blogData of blogsData) {
      console.log(`\nSeeding blog: ${blogData.slug}`);

      // Create blog for each language
      const createdBlogs = [];
      for (const lang of languages) {
        const translation = blogData.translations[lang.code as keyof typeof blogData.translations];

        if (!translation) {
          console.log(`  Skipping language ${lang.code} - no translation available`);
          continue;
        }

        const blog = await prisma.blog.create({
          data: {
            slug: blogData.slug,
            languageId: lang.id,
            name: translation.name,
            shortDescription: translation.shortDescription,
            author: blogData.author,
            imageUrl: blogData.imageUrl,
            publishedAt: blogData.publishedAt,
            isActive: blogData.isActive,
            order: blogData.order,
          },
        });

        createdBlogs.push({ blog, langCode: lang.code });
        console.log(`  ✓ Created blog for ${lang.code}`);
      }

      // Create detailed sections for each language
      if (blogData.detailedSections && blogData.detailedSections.length > 0) {
        for (const section of blogData.detailedSections) {
          for (const { blog, langCode } of createdBlogs) {
            const sectionTranslation = section.translations[langCode as keyof typeof section.translations];

            if (!sectionTranslation) {
              continue;
            }

            await prisma.detailedBlog.create({
              data: {
                blogId: blog.id,
                languageId: blog.languageId,
                title: sectionTranslation.title,
                description: sectionTranslation.description,
                imageUrl: section.imageUrl,
                order: section.order,
              },
            });
          }
        }
        console.log(`  ✓ Created ${blogData.detailedSections.length} detailed sections`);
      }
    }

    console.log('\n✅ Blog seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding blogs:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  const prisma = new PrismaClient();
  seedBlogs(prisma)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
