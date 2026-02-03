import { LanguageCode } from './languages';

export const adminTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.services': 'Services',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',

    // Services Page
    'services.title': 'Services',
    'services.addNew': 'Add New Service',
    'services.noServices': 'No services found. Add your first service!',
    'services.loading': 'Loading services...',
    'services.error': 'Failed to load services',

    // Service Card
    'service.status.active': 'Active',
    'service.status.inactive': 'Inactive',
    'service.button.viewDetails': 'View Details',
    'service.button.edit': 'Edit',
    'service.button.delete': 'Delete',
    'service.deleteConfirm': 'Are you sure you want to delete this service?',

    // Modal - General
    'modal.addService': 'Add New Service',
    'modal.editService': 'Edit Service',
    'modal.cancel': 'Cancel',
    'modal.save': 'Save',
    'modal.update': 'Update Service',
    'modal.create': 'Create Service',
    'modal.saving': 'Saving...',
    'modal.language': 'Editing Language',
    'modal.selectLanguage': 'Select Language to Edit',
    'modal.englishRequired': 'English is required. Green indicates translations exist for that language.',

    // Form Fields - Basic Info
    'form.title': 'Title',
    'form.slug': 'Slug',
    'form.icon': 'Icon',
    'form.shortDescription': 'Short Description',
    'form.isActive': 'Is Active',
    'form.status': 'Status',

    // Form Fields - Detailed Content
    'form.fullDescription': 'Full Description',
    'form.servicesProvided': 'Services Provided',
    'form.targetInsects': 'Target Insects',

    // Form Fields - Methods
    'form.methodsTitle': 'Methods Title',
    'form.methodsDescription': 'Methods Description',
    'form.advancedTechnologies': 'Advanced Technologies',
    'form.safeUseDescription': 'Safe Use Description',
    'form.serviceGuarantee': 'Service Guarantee',

    // Tabs
    'tabs.basic': 'Basic Info',
    'tabs.detailed': 'Detailed Content',
    'tabs.methods': 'Methods & Guarantee',

    // Validation & Messages
    'validation.required': 'This field is required',
    'validation.titleRequired': 'English title and short description are required',
    'validation.invalidData': 'Invalid data format',
    'validation.fieldRequired': '{field} is required',

    // Success/Error Messages
    'message.createSuccess': 'Service created successfully',
    'message.updateSuccess': 'Service updated successfully',
    'message.deleteSuccess': 'Service deleted successfully',
    'message.reorderSuccess': 'Order updated successfully',
    'message.error': 'An error occurred. Please try again.',
    'message.failedCreate': 'Failed to create service',
    'message.failedUpdate': 'Failed to update service',
    'message.failedDelete': 'Failed to delete service',
    'message.failedReorder': 'Failed to update order',

    // Service Details Modal
    'details.title': 'Service Details',
    'details.viewLanguage': 'View Language',
    'details.overview': 'Overview',
    'details.close': 'Close',
    'details.editService': 'Edit Service',
    'details.slug': 'Slug',

    // Drag and Drop
    'dnd.dragToReorder': 'Drag to reorder services',

    // Placeholders
    'placeholder.title': 'Pest Control',
    'placeholder.slug': 'pest-control',
    'placeholder.description': 'Brief description shown on services page',
    'placeholder.fullDescription': 'Detailed introduction paragraph',
    'placeholder.servicesProvided': 'List of services provided',
    'placeholder.targetInsects': 'Types of insects targeted (Cockroaches, Rats, etc.)',
    'placeholder.methodsTitle': 'Methods of insect extermination',
    'placeholder.methodsDescription': 'Description of methods used',
    'placeholder.technologies': 'Technologies used (Thermal, Biological, Bio-radiation)',
    'placeholder.safeUse': 'Safety measures and environmental considerations',
    'placeholder.guarantee': 'Guarantee details (Effectiveness, Refund policy, etc.)',
  },

  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.services': 'الخدمات',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',

    // Services Page
    'services.title': 'الخدمات',
    'services.addNew': 'إضافة خدمة جديدة',
    'services.noServices': 'لم يتم العثور على خدمات. أضف خدمتك الأولى!',
    'services.loading': 'جاري تحميل الخدمات...',
    'services.error': 'فشل تحميل الخدمات',

    // Service Card
    'service.status.active': 'نشطة',
    'service.status.inactive': 'غير نشطة',
    'service.button.viewDetails': 'عرض التفاصيل',
    'service.button.edit': 'تعديل',
    'service.button.delete': 'حذف',
    'service.deleteConfirm': 'هل أنت متأكد من رغبتك في حذف هذه الخدمة؟',

    // Modal - General
    'modal.addService': 'إضافة خدمة جديدة',
    'modal.editService': 'تعديل الخدمة',
    'modal.cancel': 'إلغاء',
    'modal.save': 'حفظ',
    'modal.update': 'تحديث الخدمة',
    'modal.create': 'إنشاء الخدمة',
    'modal.saving': 'جاري الحفظ...',
    'modal.language': 'لغة التحرير',
    'modal.selectLanguage': 'اختر اللغة للتحرير',
    'modal.englishRequired': 'اللغة الإنجليزية مطلوبة. يشير اللون الأخضر إلى وجود ترجمات لتلك اللغة.',

    // Form Fields - Basic Info
    'form.title': 'العنوان',
    'form.slug': 'الرابط',
    'form.icon': 'الرمز',
    'form.shortDescription': 'وصف قصير',
    'form.isActive': 'نشطة',
    'form.status': 'الحالة',

    // Form Fields - Detailed Content
    'form.fullDescription': 'الوصف الكامل',
    'form.servicesProvided': 'الخدمات المقدمة',
    'form.targetInsects': 'الآفات المستهدفة',

    // Form Fields - Methods
    'form.methodsTitle': 'عنوان الطرق',
    'form.methodsDescription': 'وصف الطرق',
    'form.advancedTechnologies': 'التقنيات المتقدمة',
    'form.safeUseDescription': 'وصف الاستخدام الآمن',
    'form.serviceGuarantee': 'ضمان الخدمة',

    // Tabs
    'tabs.basic': 'المعلومات الأساسية',
    'tabs.detailed': 'المحتوى التفصيلي',
    'tabs.methods': 'الطرق والضمان',

    // Validation & Messages
    'validation.required': 'هذا الحقل مطلوب',
    'validation.titleRequired': 'العنوان والوصف القصير باللغة الإنجليزية مطلوبان',
    'validation.invalidData': 'صيغة البيانات غير صحيحة',
    'validation.fieldRequired': '{field} مطلوب',

    // Success/Error Messages
    'message.createSuccess': 'تم إنشاء الخدمة بنجاح',
    'message.updateSuccess': 'تم تحديث الخدمة بنجاح',
    'message.deleteSuccess': 'تم حذف الخدمة بنجاح',
    'message.reorderSuccess': 'تم تحديث الترتيب بنجاح',
    'message.error': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    'message.failedCreate': 'فشل إنشاء الخدمة',
    'message.failedUpdate': 'فشل تحديث الخدمة',
    'message.failedDelete': 'فشل حذف الخدمة',
    'message.failedReorder': 'فشل تحديث الترتيب',

    // Service Details Modal
    'details.title': 'تفاصيل الخدمة',
    'details.viewLanguage': 'لغة العرض',
    'details.overview': 'نظرة عامة',
    'details.close': 'إغلاق',
    'details.editService': 'تعديل الخدمة',
    'details.slug': 'الرابط',

    // Drag and Drop
    'dnd.dragToReorder': 'اسحب لإعادة ترتيب الخدمات',

    // Placeholders
    'placeholder.title': 'مكافحة الآفات',
    'placeholder.slug': 'مكافحة-الآفات',
    'placeholder.description': 'وصف قصير يظهر على صفحة الخدمات',
    'placeholder.fullDescription': 'فقرة تقديم مفصلة',
    'placeholder.servicesProvided': 'قائمة الخدمات المقدمة',
    'placeholder.targetInsects': 'أنواع الآفات المستهدفة (الصراصير، الفئران، إلخ)',
    'placeholder.methodsTitle': 'طرق مكافحة الآفات',
    'placeholder.methodsDescription': 'وصف الطرق المستخدمة',
    'placeholder.technologies': 'التقنيات المستخدمة (الحرارية، البيولوجية، الإشعاعية البيولوجية)',
    'placeholder.safeUse': 'تدابير السلامة والاعتبارات البيئية',
    'placeholder.guarantee': 'تفاصيل الضمان (الفعالية، سياسة الاسترداد، إلخ)',
  },

  pt: {
    // Navigation
    'nav.dashboard': 'Painel de Controle',
    'nav.services': 'Serviços',
    'nav.settings': 'Configurações',
    'nav.logout': 'Sair',

    // Services Page
    'services.title': 'Serviços',
    'services.addNew': 'Adicionar Novo Serviço',
    'services.noServices': 'Nenhum serviço encontrado. Adicione seu primeiro serviço!',
    'services.loading': 'Carregando serviços...',
    'services.error': 'Falha ao carregar serviços',

    // Service Card
    'service.status.active': 'Ativo',
    'service.status.inactive': 'Inativo',
    'service.button.viewDetails': 'Ver Detalhes',
    'service.button.edit': 'Editar',
    'service.button.delete': 'Excluir',
    'service.deleteConfirm': 'Tem certeza de que deseja excluir este serviço?',

    // Modal - General
    'modal.addService': 'Adicionar Novo Serviço',
    'modal.editService': 'Editar Serviço',
    'modal.cancel': 'Cancelar',
    'modal.save': 'Salvar',
    'modal.update': 'Atualizar Serviço',
    'modal.create': 'Criar Serviço',
    'modal.saving': 'Salvando...',
    'modal.language': 'Idioma de Edição',
    'modal.selectLanguage': 'Selecione o Idioma para Editar',
    'modal.englishRequired': 'Inglês é obrigatório. Verde indica que existem traduções para esse idioma.',

    // Form Fields - Basic Info
    'form.title': 'Título',
    'form.slug': 'URL',
    'form.icon': 'Ícone',
    'form.shortDescription': 'Descrição Curta',
    'form.isActive': 'Ativo',
    'form.status': 'Status',

    // Form Fields - Detailed Content
    'form.fullDescription': 'Descrição Completa',
    'form.servicesProvided': 'Serviços Fornecidos',
    'form.targetInsects': 'Insetos Alvo',

    // Form Fields - Methods
    'form.methodsTitle': 'Título dos Métodos',
    'form.methodsDescription': 'Descrição dos Métodos',
    'form.advancedTechnologies': 'Tecnologias Avançadas',
    'form.safeUseDescription': 'Descrição de Uso Seguro',
    'form.serviceGuarantee': 'Garantia do Serviço',

    // Tabs
    'tabs.basic': 'Informações Básicas',
    'tabs.detailed': 'Conteúdo Detalhado',
    'tabs.methods': 'Métodos e Garantia',

    // Validation & Messages
    'validation.required': 'Este campo é obrigatório',
    'validation.titleRequired': 'Título e descrição curta em inglês são obrigatórios',
    'validation.invalidData': 'Formato de dados inválido',
    'validation.fieldRequired': '{field} é obrigatório',

    // Success/Error Messages
    'message.createSuccess': 'Serviço criado com sucesso',
    'message.updateSuccess': 'Serviço atualizado com sucesso',
    'message.deleteSuccess': 'Serviço excluído com sucesso',
    'message.reorderSuccess': 'Ordem atualizada com sucesso',
    'message.error': 'Ocorreu um erro. Tente novamente.',
    'message.failedCreate': 'Falha ao criar serviço',
    'message.failedUpdate': 'Falha ao atualizar serviço',
    'message.failedDelete': 'Falha ao excluir serviço',
    'message.failedReorder': 'Falha ao atualizar ordem',

    // Service Details Modal
    'details.title': 'Detalhes do Serviço',
    'details.viewLanguage': 'Idioma de Visualização',
    'details.overview': 'Visão Geral',
    'details.close': 'Fechar',
    'details.editService': 'Editar Serviço',
    'details.slug': 'URL',

    // Drag and Drop
    'dnd.dragToReorder': 'Arraste para reordenar serviços',

    // Placeholders
    'placeholder.title': 'Controle de Pragas',
    'placeholder.slug': 'controle-de-pragas',
    'placeholder.description': 'Descrição breve mostrada na página de serviços',
    'placeholder.fullDescription': 'Parágrafo de introdução detalhado',
    'placeholder.servicesProvided': 'Lista de serviços fornecidos',
    'placeholder.targetInsects': 'Tipos de insetos visados (Baratas, Ratos, etc.)',
    'placeholder.methodsTitle': 'Métodos de controle de pragas',
    'placeholder.methodsDescription': 'Descrição dos métodos usados',
    'placeholder.technologies': 'Tecnologias usadas (Térmica, Biológica, Bio-radiação)',
    'placeholder.safeUse': 'Medidas de segurança e considerações ambientais',
    'placeholder.guarantee': 'Detalhes da garantia (Eficácia, política de reembolso, etc.)',
  },

  zh: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.services': '服务',
    'nav.settings': '设置',
    'nav.logout': '登出',

    // Services Page
    'services.title': '服务',
    'services.addNew': '添加新服务',
    'services.noServices': '未找到服务。添加你的第一个服务！',
    'services.loading': '正在加载服务...',
    'services.error': '加载服务失败',

    // Service Card
    'service.status.active': '活跃',
    'service.status.inactive': '非活跃',
    'service.button.viewDetails': '查看详情',
    'service.button.edit': '编辑',
    'service.button.delete': '删除',
    'service.deleteConfirm': '确定要删除此服务吗？',

    // Modal - General
    'modal.addService': '添加新服务',
    'modal.editService': '编辑服务',
    'modal.cancel': '取消',
    'modal.save': '保存',
    'modal.update': '更新服务',
    'modal.create': '创建服务',
    'modal.saving': '正在保存...',
    'modal.language': '编辑语言',
    'modal.selectLanguage': '选择要编辑的语言',
    'modal.englishRequired': '英语是必需的。绿色表示该语言存在翻译。',

    // Form Fields - Basic Info
    'form.title': '标题',
    'form.slug': '网址',
    'form.icon': '图标',
    'form.shortDescription': '简短描述',
    'form.isActive': '活跃',
    'form.status': '状态',

    // Form Fields - Detailed Content
    'form.fullDescription': '完整描述',
    'form.servicesProvided': '提供的服务',
    'form.targetInsects': '目标昆虫',

    // Form Fields - Methods
    'form.methodsTitle': '方法标题',
    'form.methodsDescription': '方法描述',
    'form.advancedTechnologies': '先进技术',
    'form.safeUseDescription': '安全使用说明',
    'form.serviceGuarantee': '服务保证',

    // Tabs
    'tabs.basic': '基本信息',
    'tabs.detailed': '详细内容',
    'tabs.methods': '方法和保证',

    // Validation & Messages
    'validation.required': '此字段为必填项',
    'validation.titleRequired': '英文标题和简短描述是必需的',
    'validation.invalidData': '数据格式无效',
    'validation.fieldRequired': '{field} 为必需项',

    // Success/Error Messages
    'message.createSuccess': '服务创建成功',
    'message.updateSuccess': '服务更新成功',
    'message.deleteSuccess': '服务删除成功',
    'message.reorderSuccess': '顺序更新成功',
    'message.error': '发生错误。请重试。',
    'message.failedCreate': '创建服务失败',
    'message.failedUpdate': '更新服务失败',
    'message.failedDelete': '删除服务失败',
    'message.failedReorder': '更新顺序失败',

    // Service Details Modal
    'details.title': '服务详情',
    'details.viewLanguage': '查看语言',
    'details.overview': '概述',
    'details.close': '关闭',
    'details.editService': '编辑服务',
    'details.slug': '网址',

    // Drag and Drop
    'dnd.dragToReorder': '拖动以重新排序服务',

    // Placeholders
    'placeholder.title': '害虫控制',
    'placeholder.slug': '害虫控制',
    'placeholder.description': '服务页面上显示的简短描述',
    'placeholder.fullDescription': '详细的介绍段落',
    'placeholder.servicesProvided': '提供的服务列表',
    'placeholder.targetInsects': '目标昆虫类型（蟑螂、老鼠等）',
    'placeholder.methodsTitle': '害虫防治方法',
    'placeholder.methodsDescription': '使用方法的描述',
    'placeholder.technologies': '使用的技术（热能、生物、生物辐射）',
    'placeholder.safeUse': '安全措施和环境考虑',
    'placeholder.guarantee': '保证详情（效果、退款政策等）',
  },

  ja: {
    // Navigation
    'nav.dashboard': 'ダッシュボード',
    'nav.services': 'サービス',
    'nav.settings': '設定',
    'nav.logout': 'ログアウト',

    // Services Page
    'services.title': 'サービス',
    'services.addNew': '新しいサービスを追加',
    'services.noServices': 'サービスが見つかりません。最初のサービスを追加してください！',
    'services.loading': 'サービスを読み込み中...',
    'services.error': 'サービスの読み込みに失敗しました',

    // Service Card
    'service.status.active': 'アクティブ',
    'service.status.inactive': '非アクティブ',
    'service.button.viewDetails': '詳細を表示',
    'service.button.edit': '編集',
    'service.button.delete': '削除',
    'service.deleteConfirm': 'このサービスを削除してもよろしいですか？',

    // Modal - General
    'modal.addService': '新しいサービスを追加',
    'modal.editService': 'サービスを編集',
    'modal.cancel': 'キャンセル',
    'modal.save': '保存',
    'modal.update': 'サービスを更新',
    'modal.create': 'サービスを作成',
    'modal.saving': '保存中...',
    'modal.language': '編集言語',
    'modal.selectLanguage': '編集する言語を選択',
    'modal.englishRequired': '英語は必須です。緑色は、その言語に翻訳が存在することを示します。',

    // Form Fields - Basic Info
    'form.title': 'タイトル',
    'form.slug': 'URL',
    'form.icon': 'アイコン',
    'form.shortDescription': '簡単な説明',
    'form.isActive': 'アクティブ',
    'form.status': 'ステータス',

    // Form Fields - Detailed Content
    'form.fullDescription': '完全な説明',
    'form.servicesProvided': '提供されるサービス',
    'form.targetInsects': 'ターゲット昆虫',

    // Form Fields - Methods
    'form.methodsTitle': 'メソッドタイトル',
    'form.methodsDescription': 'メソッドの説明',
    'form.advancedTechnologies': '高度なテクノロジー',
    'form.safeUseDescription': '安全な使用説明',
    'form.serviceGuarantee': 'サービス保証',

    // Tabs
    'tabs.basic': '基本情報',
    'tabs.detailed': '詳細コンテンツ',
    'tabs.methods': 'メソッドと保証',

    // Validation & Messages
    'validation.required': 'このフィールドは必須です',
    'validation.titleRequired': '英語のタイトルと簡短な説明が必須です',
    'validation.invalidData': 'データ形式が無効です',
    'validation.fieldRequired': '{field} は必須です',

    // Success/Error Messages
    'message.createSuccess': 'サービスが正常に作成されました',
    'message.updateSuccess': 'サービスが正常に更新されました',
    'message.deleteSuccess': 'サービスが正常に削除されました',
    'message.reorderSuccess': '順序が正常に更新されました',
    'message.error': 'エラーが発生しました。もう一度お試しください。',
    'message.failedCreate': 'サービスの作成に失敗しました',
    'message.failedUpdate': 'サービスの更新に失敗しました',
    'message.failedDelete': 'サービスの削除に失敗しました',
    'message.failedReorder': '順序の更新に失敗しました',

    // Service Details Modal
    'details.title': 'サービス詳細',
    'details.viewLanguage': '表示言語',
    'details.overview': '概要',
    'details.close': '閉じる',
    'details.editService': 'サービスを編集',
    'details.slug': 'URL',

    // Drag and Drop
    'dnd.dragToReorder': 'ドラッグしてサービスを並べ替える',

    // Placeholders
    'placeholder.title': '害虫管理',
    'placeholder.slug': '害虫管理',
    'placeholder.description': 'サービスページに表示される簡単な説明',
    'placeholder.fullDescription': '詳細な紹介段落',
    'placeholder.servicesProvided': '提供されるサービスのリスト',
    'placeholder.targetInsects': 'ターゲット害虫の種類（ゴキブリ、ネズミなど）',
    'placeholder.methodsTitle': '害虫管理方法',
    'placeholder.methodsDescription': '使用される方法の説明',
    'placeholder.technologies': '使用される技術（熱、生物、生物放射)',
    'placeholder.safeUse': '安全対策と環境上の考慮事項',
    'placeholder.guarantee': '保証の詳細（効果、払い戻しポリシーなど）',
  },

  de: {
    // Navigation
    'nav.dashboard': 'Armaturenbrett',
    'nav.services': 'Dienstleistungen',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',

    // Services Page
    'services.title': 'Dienstleistungen',
    'services.addNew': 'Neue Dienstleistung hinzufügen',
    'services.noServices': 'Keine Dienstleistungen gefunden. Fügen Sie Ihre erste Dienstleistung hinzu!',
    'services.loading': 'Dienstleistungen werden geladen...',
    'services.error': 'Fehler beim Laden von Dienstleistungen',

    // Service Card
    'service.status.active': 'Aktiv',
    'service.status.inactive': 'Inaktiv',
    'service.button.viewDetails': 'Details anzeigen',
    'service.button.edit': 'Bearbeiten',
    'service.button.delete': 'Löschen',
    'service.deleteConfirm': 'Sind Sie sicher, dass Sie diese Dienstleistung löschen möchten?',

    // Modal - General
    'modal.addService': 'Neue Dienstleistung hinzufügen',
    'modal.editService': 'Dienstleistung bearbeiten',
    'modal.cancel': 'Abbrechen',
    'modal.save': 'Speichern',
    'modal.update': 'Dienstleistung aktualisieren',
    'modal.create': 'Dienstleistung erstellen',
    'modal.saving': 'Wird gespeichert...',
    'modal.language': 'Bearbeitungssprache',
    'modal.selectLanguage': 'Wählen Sie die Sprache zum Bearbeiten',
    'modal.englishRequired': 'Englisch ist erforderlich. Grün zeigt an, dass Übersetzungen für diese Sprache vorhanden sind.',

    // Form Fields - Basic Info
    'form.title': 'Titel',
    'form.slug': 'URL',
    'form.icon': 'Symbol',
    'form.shortDescription': 'Kurze Beschreibung',
    'form.isActive': 'Aktiv',
    'form.status': 'Status',

    // Form Fields - Detailed Content
    'form.fullDescription': 'Vollständige Beschreibung',
    'form.servicesProvided': 'Erbrachte Dienstleistungen',
    'form.targetInsects': 'Zielinsekten',

    // Form Fields - Methods
    'form.methodsTitle': 'Methoden Titel',
    'form.methodsDescription': 'Methodenbeschreibung',
    'form.advancedTechnologies': 'Fortgeschrittene Technologien',
    'form.safeUseDescription': 'Sichere Verwendungsbeschreibung',
    'form.serviceGuarantee': 'Dienstgarantie',

    // Tabs
    'tabs.basic': 'Grundinformation',
    'tabs.detailed': 'Detaillierter Inhalt',
    'tabs.methods': 'Methoden und Garantie',

    // Validation & Messages
    'validation.required': 'Dieses Feld ist erforderlich',
    'validation.titleRequired': 'Englischer Titel und Kurzbeschreibung sind erforderlich',
    'validation.invalidData': 'Ungültiges Datenformat',
    'validation.fieldRequired': '{field} ist erforderlich',

    // Success/Error Messages
    'message.createSuccess': 'Dienstleistung erfolgreich erstellt',
    'message.updateSuccess': 'Dienstleistung erfolgreich aktualisiert',
    'message.deleteSuccess': 'Dienstleistung erfolgreich gelöscht',
    'message.reorderSuccess': 'Reihenfolge erfolgreich aktualisiert',
    'message.error': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    'message.failedCreate': 'Fehler beim Erstellen der Dienstleistung',
    'message.failedUpdate': 'Fehler beim Aktualisieren der Dienstleistung',
    'message.failedDelete': 'Fehler beim Löschen der Dienstleistung',
    'message.failedReorder': 'Fehler beim Aktualisieren der Reihenfolge',

    // Service Details Modal
    'details.title': 'Dienstleistungsdetails',
    'details.viewLanguage': 'Anzeigesprache',
    'details.overview': 'Überblick',
    'details.close': 'Schließen',
    'details.editService': 'Dienstleistung bearbeiten',
    'details.slug': 'URL',

    // Drag and Drop
    'dnd.dragToReorder': 'Ziehen Sie, um Dienstleistungen neu zu ordnen',

    // Placeholders
    'placeholder.title': 'Insektenbekämpfung',
    'placeholder.slug': 'insektenbekämpfung',
    'placeholder.description': 'Kurzbeschreibung auf der Dienstleistungsseite angezeigt',
    'placeholder.fullDescription': 'Detaillierter Einleitungsabsatz',
    'placeholder.servicesProvided': 'Liste der erbrachten Dienstleistungen',
    'placeholder.targetInsects': 'Arten von Zielinsekten (Kakerlaken, Ratten usw.)',
    'placeholder.methodsTitle': 'Insektenbekämpfungsmethoden',
    'placeholder.methodsDescription': 'Beschreibung der verwendeten Methoden',
    'placeholder.technologies': 'Verwendete Technologien (Thermisch, Biologisch, Bio-Strahlung)',
    'placeholder.safeUse': 'Sicherheitsmaßnahmen und Umweltaspekte',
    'placeholder.guarantee': 'Garantiedetails (Wirksamkeit, Rückgaberichtlinie usw.)',
  },

  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.services': 'Services',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',

    // Services Page
    'services.title': 'Services',
    'services.addNew': 'Ajouter un nouveau service',
    'services.noServices': 'Aucun service trouvé. Ajoutez votre premier service !',
    'services.loading': 'Chargement des services...',
    'services.error': 'Échec du chargement des services',

    // Service Card
    'service.status.active': 'Actif',
    'service.status.inactive': 'Inactif',
    'service.button.viewDetails': 'Voir les détails',
    'service.button.edit': 'Modifier',
    'service.button.delete': 'Supprimer',
    'service.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer ce service ?',

    // Modal - General
    'modal.addService': 'Ajouter un nouveau service',
    'modal.editService': 'Modifier le service',
    'modal.cancel': 'Annuler',
    'modal.save': 'Enregistrer',
    'modal.update': 'Mettre à jour le service',
    'modal.create': 'Créer le service',
    'modal.saving': 'Enregistrement...',
    'modal.language': 'Langue de modification',
    'modal.selectLanguage': 'Sélectionnez la langue à modifier',
    'modal.englishRequired': 'L\'anglais est obligatoire. Le vert indique que des traductions existent pour cette langue.',

    // Form Fields - Basic Info
    'form.title': 'Titre',
    'form.slug': 'URL',
    'form.icon': 'Icône',
    'form.shortDescription': 'Courte description',
    'form.isActive': 'Actif',
    'form.status': 'Statut',

    // Form Fields - Detailed Content
    'form.fullDescription': 'Description complète',
    'form.servicesProvided': 'Services fournis',
    'form.targetInsects': 'Insectes cibles',

    // Form Fields - Methods
    'form.methodsTitle': 'Titre des méthodes',
    'form.methodsDescription': 'Description des méthodes',
    'form.advancedTechnologies': 'Technologies avancées',
    'form.safeUseDescription': 'Description d\'utilisation sûre',
    'form.serviceGuarantee': 'Garantie du service',

    // Tabs
    'tabs.basic': 'Informations de base',
    'tabs.detailed': 'Contenu détaillé',
    'tabs.methods': 'Méthodes et garantie',

    // Validation & Messages
    'validation.required': 'Ce champ est obligatoire',
    'validation.titleRequired': 'Le titre et la courte description en anglais sont obligatoires',
    'validation.invalidData': 'Format de données invalide',
    'validation.fieldRequired': '{field} est obligatoire',

    // Success/Error Messages
    'message.createSuccess': 'Service créé avec succès',
    'message.updateSuccess': 'Service mis à jour avec succès',
    'message.deleteSuccess': 'Service supprimé avec succès',
    'message.reorderSuccess': 'Ordre mis à jour avec succès',
    'message.error': 'Une erreur s\'est produite. Veuillez réessayer.',
    'message.failedCreate': 'Échec de la création du service',
    'message.failedUpdate': 'Échec de la mise à jour du service',
    'message.failedDelete': 'Échec de la suppression du service',
    'message.failedReorder': 'Échec de la mise à jour de l\'ordre',

    // Service Details Modal
    'details.title': 'Détails du service',
    'details.viewLanguage': 'Langue d\'affichage',
    'details.overview': 'Aperçu',
    'details.close': 'Fermer',
    'details.editService': 'Modifier le service',
    'details.slug': 'URL',

    // Drag and Drop
    'dnd.dragToReorder': 'Faites glisser pour réorganiser les services',

    // Placeholders
    'placeholder.title': 'Lutte antiparasitaire',
    'placeholder.slug': 'lutte-antiparasitaire',
    'placeholder.description': 'Courte description affichée sur la page des services',
    'placeholder.fullDescription': 'Paragraphe d\'introduction détaillé',
    'placeholder.servicesProvided': 'Liste des services fournis',
    'placeholder.targetInsects': 'Types d\'insectes ciblés (Cafards, Rats, etc.)',
    'placeholder.methodsTitle': 'Méthodes de lutte antiparasitaire',
    'placeholder.methodsDescription': 'Description des méthodes utilisées',
    'placeholder.technologies': 'Technologies utilisées (Thermique, Biologique, Bio-radiation)',
    'placeholder.safeUse': 'Mesures de sécurité et considérations environnementales',
    'placeholder.guarantee': 'Détails de la garantie (Efficacité, politique de remboursement, etc.)',
  },
};

export function t(key: string, lang: LanguageCode): string {
  return adminTranslations[lang][key] || adminTranslations.en[key] || key;
}
