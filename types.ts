
export enum Page {
  DASHBOARD = 'Dashboard',
  CALLS = 'Calls',
  OBJECTIONS = 'Objeções',
  MARKETING = 'Marketing',
  PRODUCT = 'Produto',
  SETTINGS = 'Configurações'
}

export type Language = 'pt' | 'en' | 'es';

export interface CallData {
  id: string;
  rep: string;
  lead: string;
  duration: string;
  date: string;
  status: 'closed' | 'negotiation' | 'lost' | 'scheduled';
  score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

export enum Section {
  // Studios (Main Navigation)
  STUDIO_LEARN = 'studio_learn',
  STUDIO_CLONE = 'studio_clone',
  STUDIO_BRAND = 'studio_brand',
  STUDIO_CONTENT = 'studio_content',
  STUDIO_MARKETING = 'studio_marketing',
  STUDIO_SALES = 'studio_sales',
  STUDIO_PEOPLE = 'studio_people',
  STUDIO_OPS = 'studio_ops',

  // Design System (under Brand)
  CONCEPT = 'concept',
  IDENTITY = 'identity',
  LEGENDARY_VS_MEDIOCRE = 'legendary_vs_mediocre',
  COLORS = 'colors',
  TYPOGRAPHY = 'typography',
  SPACING = 'spacing',
  ICONS = 'icons',
  ICONS_COMPARE = 'icons_compare',
  LISTS = 'lists',
  MOTION = 'motion',
  GRAPHS = 'graphs',
  CHARTS = 'charts',
  COMPONENTS = 'components',
  BUTTONS = 'buttons',
  ADVANCED = 'advanced',
  FEEDBACK = 'feedback',
  STATES = 'states',
  CARDS = 'cards',
  FORMS = 'forms',
  TABLES = 'tables',
  TEMPLATE_APP_CMS = 'template_app_cms',
  TEMPLATE_APP_KANBAN = 'template_app_kanban',
  TEMPLATE_APP_SETTINGS = 'template_app_settings',
  APP_CREATOR_COURSES = 'app_creator_courses',
  APP_CREATOR_CONTENT = 'app_creator_content',
  APP_CREATOR_PERSONAS = 'app_creator_personas',
  APP_CREATOR_FRAMEWORKS = 'app_creator_frameworks',
  APP_CREATOR_PERFORMANCE = 'app_creator_performance',
  APP_CREATOR_SETTINGS = 'app_creator_settings',
  APP_LEARN_GROUPS = 'app_learn_groups',
  APP_LMS_HOME = 'app_lms_home',
  TEMPLATE_SALES_DASHBOARD = 'template_sales_dashboard',
  TEMPLATE_SALES_CALLS = 'template_sales_calls',
  TEMPLATE_SALES_CALL_DETAILS = 'template_sales_call_details',
  TEMPLATE_SALES_MARKETING = 'template_sales_marketing',
  TEMPLATE_SALES_PRODUCT = 'template_sales_product',
  TEMPLATE_SALES_SETTINGS = 'template_sales_settings',
  TEMPLATE_SALES_OBJECTIONS = 'template_sales_objections',
  APP_MINDS_GALLERY = 'app_minds_gallery',
  APP_MINDS_PROFILE = 'app_minds_profile',
  APP_MINDS_MATRIX = 'app_minds_matrix',
  APP_MINDS_WIZARD = 'app_minds_wizard',
  APP_MINDS_ARENA = 'app_minds_arena',
  MARKETING_GUIDE = 'marketing_guide',
  TEMPLATE_LANDING = 'template_landing',
  TEMPLATE_ADVERTORIAL = 'template_advertorial',
  TEMPLATE_SALES = 'template_sales',
  TEMPLATE_EBOOK = 'template_ebook',
  TEMPLATE_VSL = 'template_vsl',
  TEMPLATE_WEBINAR = 'template_webinar',
  TEMPLATE_THANKYOU = 'template_thankyou',
  TEMPLATE_COMMUNITY_CAPTURE = 'template_community_capture',
  TEMPLATE_COMMUNITY_ADVERTORIAL = 'template_community_advertorial',
  TEMPLATE_COMMUNITY_SALES = 'template_community_sales',
  TEMPLATE_COMMUNITY_VSL = 'template_community_vsl',
  TEMPLATE_COMMUNITY_EMAILS = 'template_community_emails',
  TEMPLATE_SIDEBAR_LEGACY = 'template_sidebar_legacy',
  EXTERNAL_CHALLENGES = 'external_challenges',
  EXTERNAL_PROMPT_OPS = 'external_prompt_ops',
  EXTERNAL_VAULT = 'external_vault',
  TOKENS = 'tokens',
  DOCS = 'docs',
  AI_MANUAL = 'ai_manual',

  // PRD Studio
  STUDIO_PRD_DASHBOARD = 'studio_prd_dashboard',
  STUDIO_PRD_NEW = 'studio_prd_new',
  STUDIO_PRD_EDITOR = 'studio_prd_editor',
  STUDIO_PRD_EXPORT = 'studio_prd_export',

  // Ops Studio
  STUDIO_OPS_DB = 'studio_ops_db',
  STUDIO_OPS_SCHEMA = 'studio_ops_schema',
  STUDIO_OPS_VIEWS = 'studio_ops_views',
  STUDIO_OPS_TOOL_STACKS = 'studio_ops_tool_stacks',

  // Books Library
  APP_BOOKS_LIBRARY = 'app_books_library',
  APP_BOOKS_DETAIL = 'app_books_detail',
  APP_BOOKS_READER = 'app_books_reader',
  APP_BOOKS_COLLECTION = 'app_books_collection'
}

export interface TypeScale {
  label: string;
  size: string;
  px: number;
  weight: string;
}