import { PrismaClient } from '@prisma/client';

export const servicesData = [
  {
    slug: 'pest-control',
    order: 1,
    en: {
      title: 'Pest Control',
      shortDescription: 'We provide pest control services in Riyadh with the highest levels of quality and effectiveness',
      fullDescription: 'Maintaining a clean environment free from harmful insects is essential for health and safety. We use advanced techniques focused on environmental and human health safety.',
      servicesProvided: 'Complete pest elimination services using safe and effective methods',
      targetInsects: 'Cockroaches, Ants, Mice',
      methodsTitle: 'Methods of Insect Extermination',
      methodsDescription: 'We use multiple safe and effective methods for pest control',
      advancedTechnologies: 'Thermal technology, Biological pesticides, Biological control methods',
      safeUseDescription: 'All our methods are safe for the environment and human health, using approved materials',
      serviceGuarantee: 'Effectiveness guarantee, Complete satisfaction guarantee, Privacy guarantee, After-sales service',
    },
    ar: {
      title: 'مكافحة الحشرات',
      shortDescription: 'نقدم خدمات ابادة الحشرات في الرياض بأعلى مستويات الجودة والفعالية',
      fullDescription: 'الحفاظ على بيئة نظيفة خالية من الحشرات الضارة أمر ضروري للصحة والسلامة. نستخدم تقنيات متقدمة تركز على سلامة البيئة وصحة الإنسان.',
      servicesProvided: 'خدمات القضاء الكامل على الحشرات باستخدام طرق آمنة وفعالة',
      targetInsects: 'صراصير، نمل، فئران',
      methodsTitle: 'طرق إبادة الحشرات',
      methodsDescription: 'نستخدم طرقًا متعددة آمنة وفعالة لمكافحة الآفات',
      advancedTechnologies: 'التقنية الحرارية، المبيدات الحيوية، طرق المكافحة البيولوجية',
      safeUseDescription: 'جميع طرقنا آمنة للبيئة وصحة الإنسان، باستخدام مواد معتمدة',
      serviceGuarantee: 'ضمان الفعالية، ضمان الرضا التام، ضمان الخصوصية، خدمة ما بعد البيع',
    },
    pt: {
      title: 'Controle de Pragas',
      shortDescription: 'Fornecemos serviços de controle de pragas em Riade com os mais altos níveis de qualidade e eficácia',
      fullDescription: 'Manter um ambiente limpo e livre de insetos nocivos é essencial para a saúde e segurança. Usamos técnicas avançadas focadas na segurança ambiental e da saúde humana.',
      servicesProvided: 'Serviços completos de eliminação de pragas usando métodos seguros e eficazes',
      targetInsects: 'Baratas, Formigas, Ratos',
      methodsTitle: 'Métodos de Exterminação de Insetos',
      methodsDescription: 'Usamos múltiplos métodos seguros e eficazes para controle de pragas',
      advancedTechnologies: 'Tecnologia térmica, Pesticidas biológicos, Métodos de controle biológico',
      safeUseDescription: 'Todos os nossos métodos são seguros para o meio ambiente e saúde humana, usando materiais aprovados',
      serviceGuarantee: 'Garantia de eficácia, Garantia de satisfação completa, Garantia de privacidade, Serviço pós-venda',
    },
    zh: {
      title: '害虫防治',
      shortDescription: '我们在利雅得提供最高质量和最有效的害虫防治服务',
      fullDescription: '保持清洁无害虫的环境对健康和安全至关重要。我们使用专注于环境和人类健康安全的先进技术。',
      servicesProvided: '使用安全有效的方法提供完整的害虫消灭服务',
      targetInsects: '蟑螂、蚂蚁、老鼠',
      methodsTitle: '害虫灭除方法',
      methodsDescription: '我们使用多种安全有效的害虫防治方法',
      advancedTechnologies: '热技术、生物农药、生物防治方法',
      safeUseDescription: '我们所有的方法对环境和人类健康都是安全的，使用经过批准的材料',
      serviceGuarantee: '效果保证、完全满意保证、隐私保证、售后服务',
    },
    ja: {
      title: '害虫駆除',
      shortDescription: 'リヤドで最高レベルの品質と効果的な害虫駆除サービスを提供します',
      fullDescription: '有害な昆虫のない清潔な環境を維持することは、健康と安全にとって不可欠です。環境と人間の健康の安全に焦点を当てた高度な技術を使用しています。',
      servicesProvided: '安全で効果的な方法を使用した完全な害虫駆除サービス',
      targetInsects: 'ゴキブリ、アリ、ネズミ',
      methodsTitle: '害虫駆除の方法',
      methodsDescription: '害虫駆除のための複数の安全で効果的な方法を使用します',
      advancedTechnologies: '熱技術、生物農薬、生物的防除方法',
      safeUseDescription: '承認された材料を使用し、すべての方法は環境と人間の健康に安全です',
      serviceGuarantee: '効果保証、完全満足保証、プライバシー保証、アフターサービス',
    },
  },
  {
    slug: 'disinfection-against-viruses',
    order: 2,
    en: {
      title: 'Disinfection Against Viruses',
      shortDescription: 'Through our disinfection and cleaning service, we prevent the spread of coronavirus',
      fullDescription: 'Company disinfection services for work centers and offices, vehicle disinfection including police vehicles, ambulances, and truck cabins.',
      servicesProvided: 'Home disinfection with 99.9% effectiveness against viruses, germs, bacteria, and fungi',
      targetInsects: 'Viruses, Germs, Bacteria, Fungi',
      methodsTitle: 'Disinfection Methods',
      methodsDescription: 'Disinfection process uses fogging technique with specialized wide-range disinfectants',
      advancedTechnologies: 'Fogging technique, Specialized disinfectants, Professional spraying equipment',
      safeUseDescription: 'Recommendations provided before, during, and after disinfection to ensure maximum safety',
      serviceGuarantee: 'Clean, germ-free environment, 99.9% effectiveness, Professional service for offices, airports, malls, hotels, and more',
    },
    ar: {
      title: 'تعقيم ضد الفيروسات',
      shortDescription: 'خلال خدمة التطهير والتنظيف لدينا، نمنع انتشار فيروس كورونا',
      fullDescription: 'خدمات تعقيم الشركات لمراكز العمل والمكاتب، وتعقيم المركبات بما في ذلك مركبات الشرطة والإسعاف وكبائن الشاحنات.',
      servicesProvided: 'تعقيم المنازل بفعالية 99.9٪ ضد الفيروسات والجراثيم والبكتيريا والفطريات',
      targetInsects: 'الفيروسات، الجراثيم، البكتيريا، الفطريات',
      methodsTitle: 'طرق التعقيم',
      methodsDescription: 'تستخدم عملية التعقيم تقنية الرذاذ مع مطهرات متخصصة واسعة النطاق',
      advancedTechnologies: 'تقنية الرذاذ، مطهرات متخصصة، معدات رش احترافية',
      safeUseDescription: 'توصيات مقدمة قبل وأثناء وبعد التعقيم لضمان أقصى قدر من السلامة',
      serviceGuarantee: 'بيئة نظيفة خالية من الجراثيم، فعالية 99.9٪، خدمة احترافية للمكاتب والمطارات والمولات والفنادق والمزيد',
    },
    pt: {
      title: 'Desinfecção Contra Vírus',
      shortDescription: 'Através do nosso serviço de desinfecção e limpeza, prevenimos a propagação do coronavírus',
      fullDescription: 'Serviços de desinfecção de empresas para centros de trabalho e escritórios, desinfecção de veículos incluindo viaturas policiais, ambulâncias e cabines de caminhões.',
      servicesProvided: 'Desinfecção residencial com 99,9% de eficácia contra vírus, germes, bactérias e fungos',
      targetInsects: 'Vírus, Germes, Bactérias, Fungos',
      methodsTitle: 'Métodos de Desinfecção',
      methodsDescription: 'O processo de desinfecção usa técnica de nebulização com desinfetantes especializados de amplo espectro',
      advancedTechnologies: 'Técnica de nebulização, Desinfetantes especializados, Equipamento de pulverização profissional',
      safeUseDescription: 'Recomendações fornecidas antes, durante e após a desinfecção para garantir máxima segurança',
      serviceGuarantee: 'Ambiente limpo e livre de germes, 99,9% de eficácia, Serviço profissional para escritórios, aeroportos, shopping centers, hotéis e mais',
    },
    zh: {
      title: '病毒消毒',
      shortDescription: '通过我们的消毒和清洁服务，我们防止冠状病毒的传播',
      fullDescription: '为工作中心和办公室提供公司消毒服务，车辆消毒包括警车、救护车和卡车驾驶室。',
      servicesProvided: '家庭消毒对病毒、细菌、细菌和真菌的有效性达99.9%',
      targetInsects: '病毒、细菌、细菌、真菌',
      methodsTitle: '消毒方法',
      methodsDescription: '消毒过程使用雾化技术和专业的广谱消毒剂',
      advancedTechnologies: '雾化技术、专业消毒剂、专业喷涂设备',
      safeUseDescription: '在消毒前、中、后提供建议，以确保最大安全性',
      serviceGuarantee: '清洁无菌环境，99.9%有效性，为办公室、机场、商场、酒店等提供专业服务',
    },
    ja: {
      title: 'ウイルスに対する消毒',
      shortDescription: '私たちの消毒および清掃サービスを通じて、コロナウイルスの拡散を防ぎます',
      fullDescription: 'ワークセンターやオフィス向けの企業消毒サービス、警察車両、救急車、トラックのキャビンを含む車両の消毒。',
      servicesProvided: 'ウイルス、細菌、バクテリア、真菌に対して99.9%の効果がある家庭用消毒',
      targetInsects: 'ウイルス、細菌、バクテリア、真菌',
      methodsTitle: '消毒方法',
      methodsDescription: '消毒プロセスは、専門の広範囲消毒剤を使用したフォギング技術を使用します',
      advancedTechnologies: 'フォギング技術、専門消毒剤、プロ用噴霧装置',
      safeUseDescription: '最大の安全性を確保するために、消毒前、中、後に推奨事項が提供されます',
      serviceGuarantee: '清潔で無菌の環境、99.9%の効果、オフィス、空港、ショッピングモール、ホテルなどのプロフェッショナルサービス',
    },
  },
  {
    slug: 'paints-and-decorations',
    order: 3,
    en: {
      title: 'Paints and Decorations',
      shortDescription: 'Always in the hands of the best professionals',
      fullDescription: 'Rukn Al-Nakheel for Paints and Decorations with wide experience in painting and decoration sector.',
      servicesProvided: 'Interior Decoration, Industrial Painting, Comprehensive Repairs, Flooring installation, Kitchen and bathroom repairs',
      targetInsects: '',
      methodsTitle: 'Our Professional Services',
      methodsDescription: 'Professional execution that adapts to all trends with comprehensive repairs available',
      advancedTechnologies: 'Fire-resistant paint, Moisture-resistant paint, Decorative painting, Professional removal techniques',
      safeUseDescription: 'Customizable solutions with cleanup included and professional advice provided',
      serviceGuarantee: 'Perfect execution without flaws, Free budgets without commitment, Full satisfaction guarantee',
    },
    ar: {
      title: 'دهانات وديكورات',
      shortDescription: 'دائمًا في أيدي أفضل المحترفين',
      fullDescription: 'ركن النخيل للدهانات والديكورات بخبرة واسعة في قطاع الدهانات والديكور.',
      servicesProvided: 'ديكور داخلي، الطلاء الصناعي، إصلاحات شاملة، تركيب الأرضيات، إصلاحات المطابخ والحمامات',
      targetInsects: '',
      methodsTitle: 'خدماتنا المهنية',
      methodsDescription: 'تنفيذ احترافي يتكيف مع جميع الاتجاهات مع توفر إصلاحات شاملة',
      advancedTechnologies: 'طلاء مقاوم للحريق، طلاء مقاوم للرطوبة، طلاء زخرفي، تقنيات إزالة احترافية',
      safeUseDescription: 'حلول قابلة للتخصيص مع تنظيف مدرج ومشورة احترافية مقدمة',
      serviceGuarantee: 'تنفيذ مثالي بدون عيوب، ميزانيات مجانية بدون التزام، ضمان الرضا التام',
    },
    pt: {
      title: 'Pinturas e Decorações',
      shortDescription: 'Sempre nas mãos dos melhores profissionais',
      fullDescription: 'Rukn Al-Nakheel para Pinturas e Decorações com vasta experiência no setor de pintura e decoração.',
      servicesProvided: 'Decoração de Interiores, Pintura Industrial, Reparos Abrangentes, Instalação de pisos, Reparos de cozinha e banheiro',
      targetInsects: '',
      methodsTitle: 'Nossos Serviços Profissionais',
      methodsDescription: 'Execução profissional que se adapta a todas as tendências com reparos abrangentes disponíveis',
      advancedTechnologies: 'Tinta resistente ao fogo, Tinta resistente à umidade, Pintura decorativa, Técnicas de remoção profissional',
      safeUseDescription: 'Soluções personalizáveis com limpeza incluída e consultoria profissional fornecida',
      serviceGuarantee: 'Execução perfeita sem falhas, Orçamentos gratuitos sem compromisso, Garantia de satisfação total',
    },
    zh: {
      title: '油漆和装饰',
      shortDescription: '始终掌握在最优秀的专业人士手中',
      fullDescription: 'Rukn Al-Nakheel油漆和装饰公司在油漆和装饰领域拥有丰富的经验。',
      servicesProvided: '室内装饰、工业涂装、全面维修、地板安装、厨房和浴室维修',
      targetInsects: '',
      methodsTitle: '我们的专业服务',
      methodsDescription: '适应所有趋势的专业执行，提供全面的维修',
      advancedTechnologies: '防火涂料、防潮涂料、装饰涂料、专业去除技术',
      safeUseDescription: '可定制的解决方案，包括清洁和提供专业建议',
      serviceGuarantee: '无瑕疵的完美执行，无承诺的免费预算，完全满意保证',
    },
    ja: {
      title: '塗装と装飾',
      shortDescription: '常に最高の専門家の手に',
      fullDescription: 'Rukn Al-Nakheel塗装装飾は、塗装および装飾分野で豊富な経験を持っています。',
      servicesProvided: 'インテリア装飾、工業塗装、包括的な修理、床材の設置、キッチンとバスルームの修理',
      targetInsects: '',
      methodsTitle: '当社の専門サービス',
      methodsDescription: 'すべてのトレンドに適応するプロフェッショナルな実行と包括的な修理が利用可能',
      advancedTechnologies: '耐火塗料、防湿塗料、装飾塗装、専門的な除去技術',
      safeUseDescription: 'クリーンアップが含まれ、専門的なアドバイスが提供されるカスタマイズ可能なソリューション',
      serviceGuarantee: '欠陥のない完璧な実行、コミットメントなしの無料見積もり、完全満足保証',
    },
  },
  {
    slug: 'air-conditioner-maintenance',
    order: 4,
    en: {
      title: 'Air Conditioner Maintenance',
      shortDescription: 'Rukn Al-Nakheel specialized in installation, repair, and maintenance of air conditioning units',
      fullDescription: 'Specialized in installation, repair, and maintenance of residential, industrial, and office AC units with 24-hour service and annual contract options.',
      servicesProvided: 'Preventive Maintenance: Cleaning, sterilization, lubrication, painting. Corrective Maintenance: Repair or replacement of damaged parts',
      targetInsects: '',
      methodsTitle: 'Maintenance Services',
      methodsDescription: 'Comprehensive AC maintenance to prevent bacteria accumulation, leaks, odors, and reduce noise',
      advancedTechnologies: '3-month warranty, Payment facilities, Specialized technicians, Service scheduling, Feasibility study',
      safeUseDescription: 'Improves air quality and health, saves energy up to 5%, extends equipment lifespan',
      serviceGuarantee: 'Brand warranty, Free technical advice, 24-hour service, Payment facilities, Fast service',
    },
    ar: {
      title: 'صيانة المكيفات',
      shortDescription: 'ركن النخيل متخصصة في تركيب وإصلاح وصيانة أجهزة تكييف الهواء',
      fullDescription: 'متخصصون في تركيب وإصلاح وصيانة وحدات التكييف السكنية والصناعية والمكتبية مع خدمة 24 ساعة وخيارات عقود سنوية.',
      servicesProvided: 'الصيانة الوقائية: التنظيف، التعقيم، التزييت، الطلاء. الصيانة التصحيحية: إصلاح أو استبدال الأجزاء التالفة',
      targetInsects: '',
      methodsTitle: 'خدمات الصيانة',
      methodsDescription: 'صيانة شاملة للمكيفات لمنع تراكم البكتيريا والتسربات والروائح وتقليل الضوضاء',
      advancedTechnologies: 'ضمان 3 أشهر، تسهيلات في الدفع، فنيون متخصصون، جدولة الخدمة، دراسة الجدوى',
      safeUseDescription: 'يحسن جودة الهواء والصحة، يوفر الطاقة حتى 5٪، يطيل عمر المعدات',
      serviceGuarantee: 'ضمان العلامة التجارية، مشورة فنية مجانية، خدمة 24 ساعة، تسهيلات في الدفع، خدمة سريعة',
    },
    pt: {
      title: 'Manutenção de Ar Condicionado',
      shortDescription: 'Rukn Al-Nakheel especializada em instalação, reparo e manutenção de unidades de ar condicionado',
      fullDescription: 'Especializada em instalação, reparo e manutenção de unidades de AC residenciais, industriais e de escritório com serviço 24 horas e opções de contrato anual.',
      servicesProvided: 'Manutenção Preventiva: Limpeza, esterilização, lubrificação, pintura. Manutenção Corretiva: Reparo ou substituição de peças danificadas',
      targetInsects: '',
      methodsTitle: 'Serviços de Manutenção',
      methodsDescription: 'Manutenção abrangente de AC para prevenir acúmulo de bactérias, vazamentos, odores e reduzir ruído',
      advancedTechnologies: 'Garantia de 3 meses, Facilidades de pagamento, Técnicos especializados, Agendamento de serviço, Estudo de viabilidade',
      safeUseDescription: 'Melhora a qualidade do ar e saúde, economiza energia até 5%, prolonga a vida útil do equipamento',
      serviceGuarantee: 'Garantia da marca, Consultoria técnica gratuita, Serviço 24 horas, Facilidades de pagamento, Serviço rápido',
    },
    zh: {
      title: '空调维护',
      shortDescription: 'Rukn Al-Nakheel专门从事空调设备的安装、维修和保养',
      fullDescription: '专门从事住宅、工业和办公室空调设备的安装、维修和保养，提供24小时服务和年度合同选项。',
      servicesProvided: '预防性维护：清洁、消毒、润滑、喷漆。纠正性维护：修理或更换损坏的部件',
      targetInsects: '',
      methodsTitle: '维护服务',
      methodsDescription: '全面的空调维护，防止细菌积累、泄漏、气味并降低噪音',
      advancedTechnologies: '3个月保修、付款便利、专业技术人员、服务安排、可行性研究',
      safeUseDescription: '改善空气质量和健康，节省能源高达5%，延长设备使用寿命',
      serviceGuarantee: '品牌保修、免费技术咨询、24小时服务、付款便利、快速服务',
    },
    ja: {
      title: 'エアコンメンテナンス',
      shortDescription: 'Rukn Al-Nakheelはエアコンユニットの設置、修理、メンテナンスを専門としています',
      fullDescription: '24時間サービスと年間契約オプションを備えた住宅、産業、オフィスのACユニットの設置、修理、メンテナンスを専門としています。',
      servicesProvided: '予防メンテナンス：清掃、滅菌、潤滑、塗装。修正メンテナンス：損傷した部品の修理または交換',
      targetInsects: '',
      methodsTitle: 'メンテナンスサービス',
      methodsDescription: 'バクテリアの蓄積、漏れ、臭いを防ぎ、騒音を減らすための包括的なACメンテナンス',
      advancedTechnologies: '3ヶ月保証、支払い施設、専門技術者、サービススケジューリング、実現可能性調査',
      safeUseDescription: '空気の質と健康を改善し、最大5%のエネルギーを節約し、機器の寿命を延ばします',
      serviceGuarantee: 'ブランド保証、無料の技術アドバイス、24時間サービス、支払い施設、迅速なサービス',
    },
  },
  {
    slug: 'interior-exterior-restoration',
    order: 5,
    en: {
      title: 'Interior and Exterior Restoration',
      shortDescription: 'Best home and villa restoration company in Riyadh for interior and exterior restoration',
      fullDescription: 'Comprehensive restoration services for homes, commercial, and industrial buildings.',
      servicesProvided: 'Interior Restoration: Wall and ceiling repair, Floor restoration, Electrical and plumbing repairs. Exterior Restoration: Facade restoration, Surface repairs, Waterproofing and thermal insulation',
      targetInsects: '',
      methodsTitle: 'Restoration Services',
      methodsDescription: 'Structural restoration including strengthening structures and repairing cracks',
      advancedTechnologies: 'High-quality materials, Modern equipment, Professional techniques',
      safeUseDescription: 'Paints and finishing, Waterproofing, Regular maintenance services',
      serviceGuarantee: 'Extensive experience, High-quality materials, Punctuality, Competitive pricing',
    },
    ar: {
      title: 'الترميم الداخلي والخارجي',
      shortDescription: 'أفضل شركة ترميم منازل وفلل بالرياض نقوم بالترميم الداخلي والخارجي',
      fullDescription: 'خدمات ترميم شاملة للمنازل والمباني التجارية والصناعية.',
      servicesProvided: 'الترميم الداخلي: إصلاح الجدران والأسقف، ترميم الأرضيات، إصلاحات كهربائية وسباكة. الترميم الخارجي: ترميم الواجهات، إصلاح الأسطح، العزل المائي والحراري',
      targetInsects: '',
      methodsTitle: 'خدمات الترميم',
      methodsDescription: 'الترميم الهيكلي بما في ذلك تقوية الهياكل وإصلاح الشقوق',
      advancedTechnologies: 'مواد عالية الجودة، معدات حديثة، تقنيات احترافية',
      safeUseDescription: 'الدهانات والتشطيبات، العزل المائي، خدمات الصيانة الدورية',
      serviceGuarantee: 'خبرة واسعة، مواد عالية الجودة، الالتزام بالمواعيد، أسعار تنافسية',
    },
    pt: {
      title: 'Restauração Interior e Exterior',
      shortDescription: 'Melhor empresa de restauração de casas e vilas em Riade para restauração interior e exterior',
      fullDescription: 'Serviços de restauração abrangentes para residências, edifícios comerciais e industriais.',
      servicesProvided: 'Restauração Interior: Reparo de paredes e tetos, Restauração de pisos, Reparos elétricos e hidráulicos. Restauração Exterior: Restauração de fachadas, Reparos de superfície, Impermeabilização e isolamento térmico',
      targetInsects: '',
      methodsTitle: 'Serviços de Restauração',
      methodsDescription: 'Restauração estrutural incluindo fortalecimento de estruturas e reparo de rachaduras',
      advancedTechnologies: 'Materiais de alta qualidade, Equipamentos modernos, Técnicas profissionais',
      safeUseDescription: 'Pinturas e acabamento, Impermeabilização, Serviços regulares de manutenção',
      serviceGuarantee: 'Vasta experiência, Materiais de alta qualidade, Pontualidade, Preços competitivos',
    },
    zh: {
      title: '室内外修复',
      shortDescription: '利雅得最好的房屋和别墅修复公司，提供室内外修复',
      fullDescription: '为住宅、商业和工业建筑提供全面的修复服务。',
      servicesProvided: '室内修复：墙壁和天花板修复、地板修复、电气和管道维修。外部修复：外墙修复、表面修复、防水和隔热',
      targetInsects: '',
      methodsTitle: '修复服务',
      methodsDescription: '结构修复，包括加固结构和修复裂缝',
      advancedTechnologies: '高质量材料、现代设备、专业技术',
      safeUseDescription: '油漆和装饰、防水、定期维护服务',
      serviceGuarantee: '丰富的经验、高质量材料、准时、有竞争力的价格',
    },
    ja: {
      title: '内装・外装修復',
      shortDescription: 'リヤドで最高の住宅および別荘修復会社、内装および外装修復',
      fullDescription: '住宅、商業、産業用建物の包括的な修復サービス。',
      servicesProvided: '内装修復：壁と天井の修理、床の修復、電気および配管の修理。外装修復：ファサードの修復、表面の修理、防水および断熱',
      targetInsects: '',
      methodsTitle: '修復サービス',
      methodsDescription: '構造の強化とひび割れの修理を含む構造修復',
      advancedTechnologies: '高品質の材料、最新の機器、プロフェッショナルな技術',
      safeUseDescription: '塗装と仕上げ、防水、定期的なメンテナンスサービス',
      serviceGuarantee: '豊富な経験、高品質の材料、時間厳守、競争力のある価格',
    },
  },
  {
    slug: 'swimming-pools-construction-maintenance',
    order: 6,
    en: {
      title: 'Swimming Pools Construction and Maintenance',
      shortDescription: 'Providing comprehensive pool maintenance and cleaning service throughout the year',
      fullDescription: 'Leading company for pool creation, design, and maintenance in Saudi Arabia.',
      servicesProvided: 'Construction: Design and Planning, Excavation and Construction, Finishing and Installation. Types: Residential, Commercial, Sports, Therapeutic pools',
      targetInsects: '',
      methodsTitle: 'Pool Services',
      methodsDescription: 'Maintenance Services: Regular Cleaning, Equipment Maintenance, Water Treatment, Repairs and Renovations',
      advancedTechnologies: 'Modern equipment, High-quality materials, Latest technology',
      safeUseDescription: 'Ensures durability and aesthetics using the latest equipment and materials',
      serviceGuarantee: 'Extensive experience, Quality guarantee, Modern technology, Outstanding customer service',
    },
    ar: {
      title: 'إنشاء وصيانة المسابح',
      shortDescription: 'توفير خدمة صيانة وتنظيف شاملة للمسبح على مدار العام',
      fullDescription: 'شركة رائدة في إنشاء وتصميم وصيانة المسابح في المملكة العربية السعودية.',
      servicesProvided: 'الإنشاء: التصميم والتخطيط، الحفر والبناء، التشطيب والتركيب. الأنواع: مسابح سكنية، تجارية، رياضية، علاجية',
      targetInsects: '',
      methodsTitle: 'خدمات المسابح',
      methodsDescription: 'خدمات الصيانة: التنظيف المنتظم، صيانة المعدات، معالجة المياه، الإصلاحات والتجديدات',
      advancedTechnologies: 'معدات حديثة، مواد عالية الجودة، أحدث التقنيات',
      safeUseDescription: 'يضمن المتانة والجماليات باستخدام أحدث المعدات والمواد',
      serviceGuarantee: 'خبرة واسعة، ضمان الجودة، تكنولوجيا حديثة، خدمة عملاء متميزة',
    },
    pt: {
      title: 'Construção e Manutenção de Piscinas',
      shortDescription: 'Fornecendo serviço abrangente de manutenção e limpeza de piscinas durante todo o ano',
      fullDescription: 'Empresa líder em criação, design e manutenção de piscinas na Arábia Saudita.',
      servicesProvided: 'Construção: Design e Planejamento, Escavação e Construção, Acabamento e Instalação. Tipos: Piscinas residenciais, comerciais, esportivas, terapêuticas',
      targetInsects: '',
      methodsTitle: 'Serviços de Piscina',
      methodsDescription: 'Serviços de Manutenção: Limpeza Regular, Manutenção de Equipamentos, Tratamento de Água, Reparos e Renovações',
      advancedTechnologies: 'Equipamentos modernos, Materiais de alta qualidade, Tecnologia mais recente',
      safeUseDescription: 'Garante durabilidade e estética usando os equipamentos e materiais mais recentes',
      serviceGuarantee: 'Vasta experiência, Garantia de qualidade, Tecnologia moderna, Atendimento ao cliente excepcional',
    },
    zh: {
      title: '游泳池建设和维护',
      shortDescription: '全年提供全面的泳池维护和清洁服务',
      fullDescription: '沙特阿拉伯领先的泳池创建、设计和维护公司。',
      servicesProvided: '建设：设计和规划、挖掘和建设、完成和安装。类型：住宅、商业、体育、治疗池',
      targetInsects: '',
      methodsTitle: '泳池服务',
      methodsDescription: '维护服务：定期清洁、设备维护、水处理、维修和翻新',
      advancedTechnologies: '现代设备、高质量材料、最新技术',
      safeUseDescription: '使用最新的设备和材料确保耐久性和美观性',
      serviceGuarantee: '丰富的经验、质量保证、现代技术、卓越的客户服务',
    },
    ja: {
      title: 'プール建設とメンテナンス',
      shortDescription: '年間を通じて包括的なプールメンテナンスとクリーニングサービスを提供',
      fullDescription: 'サウジアラビアでプールの作成、設計、メンテナンスを行う大手企業。',
      servicesProvided: '建設：設計と計画、掘削と建設、仕上げと設置。タイプ：住宅用、商業用、スポーツ用、治療用プール',
      targetInsects: '',
      methodsTitle: 'プールサービス',
      methodsDescription: 'メンテナンスサービス：定期清掃、機器メンテナンス、水処理、修理と改修',
      advancedTechnologies: '最新の機器、高品質の材料、最新技術',
      safeUseDescription: '最新の機器と材料を使用して耐久性と美観を確保',
      serviceGuarantee: '豊富な経験、品質保証、最新技術、優れた顧客サービス',
    },
  },
  {
    slug: 'waterfalls-and-fountains',
    order: 7,
    en: {
      title: 'Waterfalls and Fountains',
      shortDescription: 'Design and construction of waterfalls and fountains in Riyadh, where experience and technology meet',
      fullDescription: 'Company specializes in design and construction of waterfalls and fountains, combining experience and technology to create stunning water features.',
      servicesProvided: 'Types of Fountains: Urban fountains, Corporate and individual fountains, Water garden fountains',
      targetInsects: '',
      methodsTitle: 'Fountain Features',
      methodsDescription: 'Movement: Musical, dynamic, interactive, sequential fountains. Lighting: LED projectors with static or dynamic RGB color changes',
      advancedTechnologies: 'LED lighting, Remote control from PC/tablet/smartphone, Easy-to-use technology for managing all fountain sizes',
      safeUseDescription: 'Uses stainless steel and approved electrical components for durability and safety',
      serviceGuarantee: '10+ years of experience in fountain sector, Technical expertise in designing complex systems, Innovation and quality',
    },
    ar: {
      title: 'تصميم وانشاء الشلالات والنوافير',
      shortDescription: 'تصميم وإنشاء الشلالات والنوافير في الرياض، تجتمع الخبرة والتكنولوجيا معًا',
      fullDescription: 'شركة متخصصة في تصميم وإنشاء الشلالات والنوافير، تجمع بين الخبرة والتكنولوجيا لإنشاء معالم مائية مذهلة.',
      servicesProvided: 'أنواع النوافير: النوافير الحضرية، نوافير الشركات والأفراد، نوافير حدائق المياه',
      targetInsects: '',
      methodsTitle: 'مميزات النوافير',
      methodsDescription: 'الحركة: نوافير موسيقية، ديناميكية، تفاعلية، متسلسلة. الإضاءة: أجهزة عرض LED مع تغييرات ألوان RGB ثابتة أو ديناميكية',
      advancedTechnologies: 'إضاءة LED، التحكم عن بعد من الكمبيوتر/الجهاز اللوحي/الهاتف الذكي، تقنية سهلة الاستخدام لإدارة جميع أحجام النوافير',
      safeUseDescription: 'يستخدم الفولاذ المقاوم للصدأ والمكونات الكهربائية المعتمدة للمتانة والأمان',
      serviceGuarantee: 'أكثر من 10 سنوات من الخبرة في قطاع النوافير، خبرة فنية في تصميم الأنظمة المعقدة، الابتكار والجودة',
    },
    pt: {
      title: 'Cascatas e Fontes',
      shortDescription: 'Design e construção de cascatas e fontes em Riade, onde experiência e tecnologia se encontram',
      fullDescription: 'Empresa especializada em design e construção de cascatas e fontes, combinando experiência e tecnologia para criar características aquáticas deslumbrantes.',
      servicesProvided: 'Tipos de Fontes: Fontes urbanas, Fontes corporativas e individuais, Fontes de jardim aquático',
      targetInsects: '',
      methodsTitle: 'Características da Fonte',
      methodsDescription: 'Movimento: Fontes musicais, dinâmicas, interativas, sequenciais. Iluminação: Projetores LED com mudanças de cor RGB estáticas ou dinâmicas',
      advancedTechnologies: 'Iluminação LED, Controle remoto de PC/tablet/smartphone, Tecnologia fácil de usar para gerenciar todos os tamanhos de fontes',
      safeUseDescription: 'Usa aço inoxidável e componentes elétricos aprovados para durabilidade e segurança',
      serviceGuarantee: 'Mais de 10 anos de experiência no setor de fontes, Especialização técnica no design de sistemas complexos, Inovação e qualidade',
    },
    zh: {
      title: '瀑布和喷泉',
      shortDescription: '在利雅得设计和建造瀑布和喷泉，经验与技术相结合',
      fullDescription: '公司专门从事瀑布和喷泉的设计和建造，结合经验和技术创造令人惊叹的水景。',
      servicesProvided: '喷泉类型：城市喷泉、企业和个人喷泉、水上花园喷泉',
      targetInsects: '',
      methodsTitle: '喷泉特点',
      methodsDescription: '运动：音乐喷泉、动态喷泉、互动喷泉、连续喷泉。照明：静态或动态RGB颜色变化的LED投影仪',
      advancedTechnologies: 'LED照明、从PC/平板电脑/智能手机远程控制、易于使用的技术管理所有喷泉尺寸',
      safeUseDescription: '使用不锈钢和经过批准的电气组件以确保耐用性和安全性',
      serviceGuarantee: '在喷泉行业拥有10多年的经验、设计复杂系统的技术专长、创新和质量',
    },
    ja: {
      title: '滝と噴水',
      shortDescription: 'リヤドでの滝と噴水の設計と建設、経験と技術が出会う場所',
      fullDescription: '滝と噴水の設計と建設を専門とする会社で、経験と技術を組み合わせて素晴らしい水の特徴を作り出します。',
      servicesProvided: '噴水の種類：都市噴水、企業および個人噴水、水庭園噴水',
      targetInsects: '',
      methodsTitle: '噴水の特徴',
      methodsDescription: '動き：音楽、ダイナミック、インタラクティブ、シーケンシャル噴水。照明：静的または動的なRGBカラーチェンジを備えたLEDプロジェクター',
      advancedTechnologies: 'LED照明、PC/タブレット/スマートフォンからのリモートコントロール、すべての噴水サイズを管理するための使いやすい技術',
      safeUseDescription: '耐久性と安全性のためにステンレス鋼と承認された電気部品を使用',
      serviceGuarantee: '噴水セクターで10年以上の経験、複雑なシステムの設計における技術的専門知識、革新と品質',
    },
  },
];

export async function seedServices(prisma: PrismaClient) {
  console.log('🏢 Seeding services...');

  // Get all language IDs
  const languages = await prisma.language.findMany();
  const langMap: Record<string, string> = {};

  for (const lang of languages) {
    langMap[lang.code] = lang.id;
  }

  // Check if we have all required languages
  const requiredLangs = ['en', 'ar', 'pt', 'zh', 'ja'];
  for (const code of requiredLangs) {
    if (!langMap[code]) {
      throw new Error(`Language '${code}' not found. Please seed languages first.`);
    }
  }

  for (const service of servicesData) {
    // Create English version
    const existingEnService = await prisma.service.findUnique({
      where: {
        slug_languageId: {
          slug: service.slug,
          languageId: langMap['en'],
        },
      },
    });

    if (!existingEnService) {
      await prisma.service.create({
        data: {
          slug: service.slug,
          languageId: langMap['en'],
          order: service.order,
          isActive: true,
          ...service.en,
        },
      });
      console.log(`✅ Created English service: ${service.en.title}`);
    } else {
      console.log(`⏭️  English service already exists: ${service.en.title}`);
    }

    // Create Arabic version
    const existingArService = await prisma.service.findUnique({
      where: {
        slug_languageId: {
          slug: service.slug,
          languageId: langMap['ar'],
        },
      },
    });

    if (!existingArService) {
      await prisma.service.create({
        data: {
          slug: service.slug,
          languageId: langMap['ar'],
          order: service.order,
          isActive: true,
          ...service.ar,
        },
      });
      console.log(`✅ Created Arabic service: ${service.ar.title}`);
    } else {
      console.log(`⏭️  Arabic service already exists: ${service.ar.title}`);
    }

    // Create Portuguese version
    const existingPtService = await prisma.service.findUnique({
      where: {
        slug_languageId: {
          slug: service.slug,
          languageId: langMap['pt'],
        },
      },
    });

    if (!existingPtService) {
      await prisma.service.create({
        data: {
          slug: service.slug,
          languageId: langMap['pt'],
          order: service.order,
          isActive: true,
          ...service.pt,
        },
      });
      console.log(`✅ Created Portuguese service: ${service.pt.title}`);
    } else {
      console.log(`⏭️  Portuguese service already exists: ${service.pt.title}`);
    }

    // Create Chinese version
    const existingZhService = await prisma.service.findUnique({
      where: {
        slug_languageId: {
          slug: service.slug,
          languageId: langMap['zh'],
        },
      },
    });

    if (!existingZhService) {
      await prisma.service.create({
        data: {
          slug: service.slug,
          languageId: langMap['zh'],
          order: service.order,
          isActive: true,
          ...service.zh,
        },
      });
      console.log(`✅ Created Chinese service: ${service.zh.title}`);
    } else {
      console.log(`⏭️  Chinese service already exists: ${service.zh.title}`);
    }

    // Create Japanese version
    const existingJaService = await prisma.service.findUnique({
      where: {
        slug_languageId: {
          slug: service.slug,
          languageId: langMap['ja'],
        },
      },
    });

    if (!existingJaService) {
      await prisma.service.create({
        data: {
          slug: service.slug,
          languageId: langMap['ja'],
          order: service.order,
          isActive: true,
          ...service.ja,
        },
      });
      console.log(`✅ Created Japanese service: ${service.ja.title}`);
    } else {
      console.log(`⏭️  Japanese service already exists: ${service.ja.title}`);
    }
  }

  console.log('✅ Services seeding completed!');
}
