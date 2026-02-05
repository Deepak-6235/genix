import { PrismaClient } from '@prisma/client';
import { uploadToS3 } from '../lib/s3';
import * as fs from 'fs';
import * as path from 'path';

const serviceImages: Record<string, string> = {
  'pest-control': 'service-1.jpg',
  'disinfection-against-viruses': 'service-2.jpg',
  'paints-and-decorations': 'service-3.webp',
  'air-conditioner-maintenance': 'service-4.jpg',
  'interior-exterior-restoration': 'service-5.webp',
  'swimming-pools-construction-maintenance': 'service-6.webp',
  'waterfalls-and-fountains': 'service-7.jpg',
};

async function uploadServiceImage(imageName: string): Promise<string | null> {
  try {
    const imagePath = path.join(process.cwd(), 'public', 'images', imageName);
    if (!fs.existsSync(imagePath)) {
      console.log(`   ⚠️  Image not found: ${imageName}`);
      return null;
    }

    const stats = fs.statSync(imagePath);
    const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`   📁 File size: ${fileSizeMB} MB`);

    const fileBuffer = fs.readFileSync(imagePath);
    const mimeType = imageName.endsWith('.jpg') || imageName.endsWith('.jpeg')
      ? 'image/jpeg'
      : imageName.endsWith('.png')
        ? 'image/png'
        : 'image/webp';

    const imageUrl = await uploadToS3(fileBuffer, imageName, mimeType, 'services');
    return imageUrl;
  } catch (error: any) {
    console.error(`   ❌ Failed to upload ${imageName}:`, error.message);
    return null;
  }
}

export const servicesData = [
  {
    slug: 'pest-control',
    order: 1,
    en: {
      name: 'Pest Control',
      shortDescription: 'We provide pest control services in Riyadh with the highest levels of quality and effectiveness',
      title: 'Pest Control Services in Riyadh',
      subtitle: 'Services Provided',
      fullDescription: 'Maintaining a clean environment free from harmful insects is essential for health and safety. We use advanced techniques focused on environmental and human health safety. Complete pest elimination services using safe and effective methods.',
    },
    ar: {
      name: 'مكافحة الحشرات',
      shortDescription: 'نقدم خدمات ابادة الحشرات في الرياض بأعلى مستويات الجودة والفعالية',
      title: 'خدمات ابادة الحشرات في الرياض',
      subtitle: 'الخدمات المقدمة',
      fullDescription: 'ببساطة، يعتبر الحفاظ على بيئة نظيفة وخالية من الحشرات الضارة أمراً أساسياً لضمان سلامة وصحة الأفراد والمجتمعات. تعتبر خدمة ابادة الحشرات أحد الوسائل الفعالة للتحكم في الأفرازات الضارة والحد من تأثيرها الضار على البيئة والصحة العامة. تتسبب الحشرات المتواجدة في المنازل والمؤسسات في انتقال الأمراض وتلويث البيئة، مما يجعل ابادتها أمراً ضرورياً لضمان بيئة صحية ومستدامة.',
    },
    pt: {
      name: 'Controle de Pragas',
      shortDescription: 'Fornecemos serviços de controle de pragas em Riade com os mais altos níveis de qualidade e eficácia',
      title: 'Serviços de Controle de Pragas em Riade',
      subtitle: 'Serviços Fornecidos',
      fullDescription: 'Manter um ambiente limpo e livre de insetos nocivos é essencial para a saúde e segurança. Usamos técnicas avançadas focadas na segurança ambiental e da saúde humana. Serviços completos de eliminação de pragas usando métodos seguros e eficazes.',
    },
    zh: {
      name: '害虫防治',
      shortDescription: '我们在利雅得提供最高质量和最有效的害虫防治服务',
      title: '利雅得的害虫防治服务',
      subtitle: '提供的服务',
      fullDescription: '保持清洁无害虫的环境对健康和安全至关重要。我们使用专注于环境和人类健康安全的先进技术。使用安全有效的方法提供完整的害虫消灭服务。',
    },
    ja: {
      name: '害虫駆除',
      shortDescription: 'リヤドで最高レベルの品質と効果的な害虫駆除サービスを提供します',
      title: 'リヤドの害虫駆除サービス',
      subtitle: '提供するサービス',
      fullDescription: '有害な昆虫のない清潔な環境を維持することは、健康と安全にとって不可欠です。環境と人間の健康の安全に焦点を当てた高度な技術を使用しています。安全で効果的な方法を使用した完全な害虫駆除サービス。',
    },
  },
  {
    slug: 'disinfection-against-viruses',
    order: 2,
    en: {
      name: 'Disinfection Against Viruses',
      shortDescription: 'Through our disinfection and cleaning service, we prevent the spread of coronavirus',
      title: 'Company Disinfection Services for Work Centers and Offices',
      subtitle: 'Company Disinfection in Riyadh',
      fullDescription: 'Company disinfection services for work centers and offices, vehicle disinfection including police vehicles, ambulances, and truck cabins. Home disinfection with 99.9% effectiveness against viruses, germs, bacteria, and fungi.',
    },
    ar: {
      name: 'تعقيم ضد الفيروسات',
      shortDescription: 'خلال خدمة التطهير والتنظيف لدينا، نمنع انتشار فيروس كورونا',
      title: 'شركة تعقيم ضد الفيروسات في مراكز العمل والمكاتب',
      subtitle: 'تعقيم الشركات في الرياض',
      fullDescription: 'في ركن النخيل نقدم خدمة التنظيف والتعقيم ضد الفيروسات. في عملية عملنا، نقوم بالتنظيف والتعقيم بمطهرات واسعة النطاق. خلال خدمة التطهير والتنظيف لدينا، نمنع انتشار فيروس كورونا.',
    },
    pt: {
      name: 'Desinfecção Contra Vírus',
      shortDescription: 'Através do nosso serviço de desinfecção e limpeza, prevenimos a propagação do coronavírus',
      title: 'Serviços de Desinfecção de Empresas para Centros de Trabalho e Escritórios',
      subtitle: 'Desinfecção de Empresas em Riade',
      fullDescription: 'Serviços de desinfecção de empresas para centros de trabalho e escritórios, desinfecção de veículos incluindo viaturas policiais, ambulâncias e cabines de caminhões. Desinfecção residencial com 99,9% de eficácia contra vírus, germes, bactérias e fungos.',
    },
    zh: {
      name: '病毒消毒',
      shortDescription: '通过我们的消毒和清洁服务，我们防止冠状病毒的传播',
      title: '为工作中心和办公室提供公司消毒服务',
      subtitle: '在利雅得的公司消毒',
      fullDescription: '为工作中心和办公室提供公司消毒服务，车辆消毒包括警车、救护车和卡车驾驶室。家庭消毒对病毒、细菌、细菌和真菌的有效性达99.9%。',
    },
    ja: {
      name: 'ウイルスに対する消毒',
      shortDescription: '私たちの消毒および清掃サービスを通じて、コロナウイルスの拡散を防ぎます',
      title: 'ワークセンターやオフィス向けの企業消毒サービス',
      subtitle: 'リヤドでの企業消毒',
      fullDescription: 'ワークセンターやオフィス向けの企業消毒サービス、警察車両、救急車、トラックのキャビンを含む車両の消毒。ウイルス、細菌、バクテリア、真菌に対して99.9%の効果がある家庭用消毒。',
    },
  },
  {
    slug: 'paints-and-decorations',
    order: 3,
    en: {
      name: 'Paints and Decorations',
      shortDescription: 'Always in the hands of the best professionals',
      title: 'Al-Nakheel Company for Paints and Decorations',
      subtitle: 'Professional Paints and Decorations',
      fullDescription: 'Rukn Al-Nakheel for Paints and Decorations with wide experience in painting and decoration sector. Interior Decoration, Industrial Painting, Comprehensive Repairs, Flooring installation, Kitchen and bathroom repairs.',
    },
    ar: {
      name: 'دهانات وديكورات',
      shortDescription: 'دائمًا في أيدي أفضل المحترفين',
      title: 'شركة النخيل للدهانات والديكورات',
      subtitle: 'دهانات وديكورات احترافية',
      fullDescription: 'في شركة ركن النخيل للدهانات والديكورات لدينا خبرة واسعة في قطاع الطلاء والديكور. في شركة الدهانات الخاصة بنا في الرياض، ستتمكن من العثور على ما تبحث عنه، مما يمنح منزلك أو عملك لمسة مميزة، دائمًا في أيدي أفضل المحترفين.',
    },
    pt: {
      name: 'Pinturas e Decorações',
      shortDescription: 'Sempre nas mãos dos melhores profissionais',
      title: 'Empresa Al-Nakheel para Pinturas e Decorações',
      subtitle: 'Pinturas e Decorações Profissionais',
      fullDescription: 'Rukn Al-Nakheel para Pinturas e Decorações com vasta experiência no setor de pintura e decoração. Decoração de Interiores, Pintura Industrial, Reparos Abrangentes, Instalação de pisos, Reparos de cozinha e banheiro.',
    },
    zh: {
      name: '油漆和装饰',
      shortDescription: '始终掌握在最优秀的专业人士手中',
      title: 'Al-Nakheel油漆和装饰公司',
      subtitle: '专业油漆和装饰',
      fullDescription: 'Rukn Al-Nakheel油漆和装饰公司在油漆和装饰领域拥有丰富的经验。室内装饰、工业涂装、全面维修、地板安装、厨房和浴室维修。',
    },
    ja: {
      name: '塗装と装飾',
      shortDescription: '常に最高の専門家の手に',
      title: 'Al-Nakheel塗装装飾会社',
      subtitle: 'プロフェッショナルな塗装と装飾',
      fullDescription: 'Rukn Al-Nakheel塗装装飾は、塗装および装飾分野で豊富な経験を持っています。インテリア装飾、工業塗装、包括的な修理、床材の設置、キッチンとバスルームの修理。',
    },
  },
  {
    slug: 'air-conditioner-maintenance',
    order: 4,
    en: {
      name: 'Air Conditioner Maintenance',
      shortDescription: 'Specialized in installation, repair, and maintenance of air conditioning units',
      title: 'What is Preventive AC Maintenance?',
      subtitle: 'What Makes Us Special',
      fullDescription: 'Rukn Al-Nakheel specialized in installation, repair, and maintenance of residential, industrial, and office AC units with 24-hour service and annual contract options. Preventive Maintenance: Cleaning, sterilization, lubrication, painting.',
    },
    ar: {
      name: 'صيانة المكيفات',
      shortDescription: 'متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء',
      title: 'ما هي الصيانة الوقائية للمكيفات؟',
      subtitle: 'ما يميزنا',
      fullDescription: 'نحن شركة ركن النخيل متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء والتبريد المنزلية والصناعية والمكتبية، والتي كرست لسنوات عديدة لتقديم خدمات عالية الجودة لتلبية احتياجات عملائنا.',
    },
    pt: {
      name: 'Manutenção de Ar Condicionado',
      shortDescription: 'Especializada em instalação, reparo e manutenção de unidades de ar condicionado',
      title: 'O que é Manutenção Preventiva de AC?',
      subtitle: 'O que Nos Torna Especiais',
      fullDescription: 'Rukn Al-Nakheel especializada em instalação, reparo e manutenção de unidades de AC residenciais, industriais e de escritório com serviço 24 horas e opções de contrato anual. Manutenção Preventiva: Limpeza, esterilização, lubrificação, pintura.',
    },
    zh: {
      name: '空调维护',
      shortDescription: '专门从事空调设备的安装、维修和保养',
      title: '什么是空调预防性维护？',
      subtitle: '我们的特色',
      fullDescription: 'Rukn Al-Nakheel专门从事住宅、工业和办公室空调设备的安装、维修和保养，提供24小时服务和年度合同选项。预防性维护：清洁、消毒、润滑、喷漆。',
    },
    ja: {
      name: 'エアコンメンテナンス',
      shortDescription: 'エアコンユニットの設置、修理、メンテナンスを専門としています',
      title: 'AC予防メンテナンスとは何ですか？',
      subtitle: '私たちの特別な点',
      fullDescription: 'Rukn Al-Nakheelは、24時間サービスと年間契約オプションを備えた住宅、産業、オフィスのACユニットの設置、修理、メンテナンスを専門としています。予防メンテナンス：清掃、滅菌、潤滑、塗装。',
    },
  },
  {
    slug: 'interior-exterior-restoration',
    order: 5,
    en: {
      name: 'Interior and Exterior Restoration',
      shortDescription: 'Best home and villa restoration company in Riyadh',
      title: 'Comprehensive Restoration Services',
      subtitle: 'Interior Restoration',
      fullDescription: 'Comprehensive restoration services for homes, commercial, and industrial buildings. Interior Restoration: Wall and ceiling repair, Floor restoration. Exterior Restoration: Facade restoration, Surface repairs, Waterproofing and thermal insulation.',
    },
    ar: {
      name: 'الترميم الداخلي والخارجي',
      shortDescription: 'أفضل شركة ترميم منازل وفلل بالرياض',
      title: 'خدمات الترميم الشاملة',
      subtitle: 'الترميم الداخلي',
      fullDescription: 'الترميم الداخلي والخارجي هو عملية شاملة لإعادة تأهيل وتجديد المباني والمساحات لاستعادة جمالها ووظائفها الأصلية. نحن في شركة ركن النخيل نقدم خدمات ترميم متخصصة وشاملة للمنازل والمباني التجارية والصناعية، مع الحفاظ على القيمة التاريخية والجمالية للمباني.',
    },
    pt: {
      name: 'Restauração Interior e Exterior',
      shortDescription: 'Melhor empresa de restauração de casas e vilas em Riade',
      title: 'Serviços de Restauração Abrangentes',
      subtitle: 'Restauração Interior',
      fullDescription: 'Serviços de restauração abrangentes para residências, edifícios comerciais e industriais. Restauração Interior: Reparo de paredes e tetos, Restauração de pisos. Restauração Exterior: Restauração de fachadas, Reparos de superfície, Impermeabilização e isolamento térmico.',
    },
    zh: {
      name: '室内外修复',
      shortDescription: '利雅得最好的房屋和别墅修复公司',
      title: '全面的修复服务',
      subtitle: '室内修复',
      fullDescription: '为住宅、商业和工业建筑提供全面的修复服务。室内修复：墙壁和天花板修复、地板修复。外部修复：外墙修复、表面修复、防水和隔热。',
    },
    ja: {
      name: '内装・外装修復',
      shortDescription: 'リヤドで最高の住宅および別荘修復会社',
      title: '包括的な修復サービス',
      subtitle: '内装修復',
      fullDescription: '住宅、商業、産業用建物の包括的な修復サービス。内装修復：壁と天井の修理、床の修復。外装修復：ファサードの修復、表面の修理、防水および断熱。',
    },
  },
  {
    slug: 'swimming-pools-construction-maintenance',
    order: 6,
    en: {
      name: 'Swimming Pools Construction and Maintenance',
      shortDescription: 'Leading company for pool creation, design, and maintenance',
      title: 'Pool Construction and Maintenance Company',
      subtitle: 'Pool Construction Services',
      fullDescription: 'Leading company for pool creation, design, and maintenance in Saudi Arabia. Construction: Design and Planning, Excavation and Construction, Finishing and Installation. Types: Residential, Commercial, Sports, Therapeutic pools.',
    },
    ar: {
      name: 'إنشاء وصيانة المسابح',
      shortDescription: 'الشركة الرائدة في إنشاء وتصميم وصيانة المسابح',
      title: 'شركة إنشاء وصيانة المسابح',
      subtitle: 'خدمات إنشاء المسابح',
      fullDescription: 'تعتبر شركتنا الرائدة والأولى في إنشاء وتصميم وصيانة المسابح بالمملكة العربية السعودية. نحن نقدم خدمات شاملة ومتكاملة لإنشاء وصيانة المسابح بأعلى معايير الجودة والكفاءة. من التصميم الأولي إلى التنفيذ والصيانة الدورية، نضمن لكم حوض سباحة مثالي يلبي جميع احتياجاتكم وتطلعاتكم.',
    },
    pt: {
      name: 'Construção e Manutenção de Piscinas',
      shortDescription: 'Empresa líder em criação, design e manutenção de piscinas',
      title: 'Empresa de Construção e Manutenção de Piscinas',
      subtitle: 'Serviços de Construção de Piscinas',
      fullDescription: 'Empresa líder em criação, design e manutenção de piscinas na Arábia Saudita. Construção: Design e Planejamento, Escavação e Construção, Acabamento e Instalação. Tipos: Piscinas residenciais, comerciais, esportivas, terapêuticas.',
    },
    zh: {
      name: '游泳池建设和维护',
      shortDescription: '泳池创建、设计和维护的领先公司',
      title: '泳池建设和维护公司',
      subtitle: '泳池建设服务',
      fullDescription: '沙特阿拉伯领先的泳池创建、设计和维护公司。建设：设计和规划、挖掘和建设、完成和安装。类型：住宅、商业、体育、治疗池。',
    },
    ja: {
      name: 'プール建設とメンテナンス',
      shortDescription: 'プールの作成、設計、メンテナンスを行う大手企業',
      title: 'プール建設とメンテナンス会社',
      subtitle: 'プール建設サービス',
      fullDescription: 'サウジアラビアでプールの作成、設計、メンテナンスを行う大手企業。建設：設計と計画、掘削と建設、仕上げと設置。タイプ：住宅用、商業用、スポーツ用、治療用プール。',
    },
  },
  {
    slug: 'waterfalls-and-fountains',
    order: 7,
    en: {
      name: 'Waterfalls and Fountains',
      shortDescription: 'Design and construction of waterfalls and fountains in Riyadh',
      title: 'Waterfalls and Fountains Design and Construction Company',
      subtitle: 'Why Rukn Al-Nakheel Company?',
      fullDescription: 'Company specializes in design and construction of waterfalls and fountains, combining experience and technology to create stunning water features. Types of Fountains: Urban fountains, Corporate and individual fountains, Water garden fountains.',
    },
    ar: {
      name: 'تصميم وإنشاء الشلالات والنوافير',
      shortDescription: 'تصميم وإنشاء الشلالات والنوافير في الرياض',
      title: 'شركة تصميم وإنشاء الشلالات والنوافير',
      subtitle: 'لماذا شركة ركن النخيل؟',
      fullDescription: 'شركة ركن النخيل لـ تصميم وإنشاء الشلالات والنوافير في الرياض، تجتمع الخبرة والتكنولوجيا معًا لإنشاء نوافير تدهش وتثير الإثارة. من خلال الجمع بين الإيقاع والماء والضوء، نريد إعادة التناغم بين عمل فني ومفاجأة مع نوافير رائعة تعمل بكامل طاقتها وسهلة الاستخدام.',
    },
    pt: {
      name: 'Cascatas e Fontes',
      shortDescription: 'Design e construção de cascatas e fontes em Riade',
      title: 'Empresa de Design e Construção de Cascatas e Fontes',
      subtitle: 'Por que a Empresa Rukn Al-Nakheel?',
      fullDescription: 'Empresa especializada em design e construção de cascatas e fontes, combinando experiência e tecnologia para criar características aquáticas deslumbrantes. Tipos de Fontes: Fontes urbanas, Fontes corporativas e individuais, Fontes de jardim aquático.',
    },
    zh: {
      name: '瀑布和喷泉',
      shortDescription: '在利雅得设计和建造瀑布和喷泉',
      title: '瀑布和喷泉设计和建造公司',
      subtitle: '为什么选择Rukn Al-Nakheel公司？',
      fullDescription: '公司专门从事瀑布和喷泉的设计和建造，结合经验和技术创造令人惊叹的水景。喷泉类型：城市喷泉、企业和个人喷泉、水上花园喷泉。',
    },
    ja: {
      name: '滝と噴水',
      shortDescription: 'リヤドでの滝と噴水の設計と建設',
      title: '滝と噴水の設計と建設会社',
      subtitle: 'なぜRukn Al-Nakheel会社なのか？',
      fullDescription: '滝と噴水の設計と建設を専門とする会社で、経験と技術を組み合わせて素晴らしい水の特徴を作り出します。噴水の種類：都市噴水、企業および個人噴水、水庭園噴水。',
    },
  },
];

export async function seedServices(prisma: PrismaClient) {
  console.log('🏢 Seeding services...');

  const languages = await prisma.language.findMany();
  const langMap: Record<string, string> = {};

  for (const lang of languages) {
    langMap[lang.code] = lang.id;
  }

  const requiredLangs = ['en', 'ar', 'pt', 'zh', 'ja'];
  for (const code of requiredLangs) {
    if (!langMap[code]) {
      throw new Error(`Language '${code}' not found. Please seed languages first.`);
    }
  }

  for (const service of servicesData) {
    console.log(`\n📦 Processing service: ${service.slug}`);

    let imageUrl: string | null = null;
    const imageName = serviceImages[service.slug];
    if (imageName) {
      console.log(`📸 Uploading image: ${imageName}`);
      imageUrl = await uploadServiceImage(imageName);
      if (imageUrl) {
        console.log(`✅ Uploaded to S3: ${imageUrl}`);
      }
    }

    const languageCodes = ['en', 'ar', 'pt', 'zh', 'ja'] as const;

    for (const langCode of languageCodes) {
      const existingService = await prisma.service.findUnique({
        where: {
          slug_languageId: {
            slug: service.slug,
            languageId: langMap[langCode],
          },
        },
      });

      const serviceData = service[langCode];
      const langName = langCode === 'en' ? 'English' : langCode === 'ar' ? 'Arabic' : langCode === 'pt' ? 'Portuguese' : langCode === 'zh' ? 'Chinese' : 'Japanese';

      if (!existingService) {
        await prisma.service.create({
          data: {
            slug: service.slug,
            languageId: langMap[langCode],
            order: service.order,
            isActive: true,
            imageUrl: imageUrl,
            ...serviceData,
          },
        });
        console.log(`   ✅ Created ${langName} service: ${serviceData.name}`);
      } else {
        await prisma.service.update({
          where: {
            id: existingService.id,
          },
          data: {
            imageUrl: imageUrl,
            ...serviceData,
          },
        });
        console.log(`   🔄 Updated ${langName} service: ${serviceData.name}`);
      }
    }
  }

  console.log('\n✅ Services seeding completed!');
}
