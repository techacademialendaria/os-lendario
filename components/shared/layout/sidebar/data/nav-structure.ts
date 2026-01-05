import { Section } from '../../../../../types';
import type { NavItem } from '../types';

export const navStructure: NavItem[] = [
  // ═══════════════════════════════════════════════════════════════
  // USER SECTION - Public access (no auth required)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'library',
    icon: 'book-open',
    section: Section.APP_BOOKS_LIBRARY,
    status: 'active',
    group: 'user',
  },
  {
    key: 'learn_lms',
    icon: 'play-circle',
    section: Section.APP_LMS_HOME,
    status: 'active',
    group: 'user',
  },
  {
    key: 'learn_challenges',
    icon: 'trophy',
    section: Section.EXTERNAL_CHALLENGES,
    status: 'active',
    group: 'user',
  },

  // ═══════════════════════════════════════════════════════════════
  // TEAM SECTION - Auth required
  // ═══════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════
  // 1. LEARN STUDIO - Educational Hub (Blue #3B82F6)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_learn',
    icon: 'graduation-cap',
    status: 'active',
    group: 'team',
    children: [
      {
        key: 'learn_courses',
        icon: 'book-open-cover',
        section: Section.APP_CREATOR_COURSES,
        status: 'active',
      },
      {
        key: 'learn_groups',
        icon: 'chat-bubble',
        section: Section.APP_LEARN_GROUPS,
        status: 'active',
      },
      { key: 'learn_programs', icon: 'sitemap', section: Section.STUDIO_LEARN, status: 'soon' },
      { key: 'learn_journey', icon: 'route', section: Section.STUDIO_LEARN, status: 'soon' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. CLONE STUDIO - Identity & AI Clones (Purple #A855F7)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_clone',
    icon: 'brain',
    status: 'active',
    section: Section.APP_MINDS_GALLERY,
    group: 'team',
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. BRAND STUDIO - Visual Identity & Design System (Pink #EC4899)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_brand',
    icon: 'palette',
    status: 'active',
    group: 'team',
    children: [
      {
        key: 'brand_design_system',
        icon: 'layout-fluid',
        section: Section.CONCEPT,
        status: 'active',
      },
      { key: 'brand_branding', icon: 'crown', section: Section.STUDIO_BRAND, status: 'soon' },
      { key: 'brand_hall', icon: 'star', section: Section.STUDIO_BRAND, status: 'soon' },
      { key: 'brand_media', icon: 'photo-video', section: Section.STUDIO_BRAND, status: 'soon' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. CONTENT STUDIO - Content Production (Orange #F97316)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_content',
    icon: 'pen-nib',
    status: 'soon',
    group: 'team',
    children: [
      { key: 'content_ops', icon: 'edit', section: Section.STUDIO_CONTENT, status: 'soon' },
      { key: 'content_video', icon: 'video', section: Section.STUDIO_CONTENT, status: 'soon' },
      { key: 'content_social', icon: 'share', section: Section.STUDIO_CONTENT, status: 'soon' },
      {
        key: 'content_newsletter',
        icon: 'envelope',
        section: Section.STUDIO_CONTENT,
        status: 'soon',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. MARKETING STUDIO - Traffic & Ads (Green #22C55E)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_marketing',
    icon: 'chart-histogram',
    status: 'soon',
    group: 'team',
    children: [
      {
        key: 'marketing_ads',
        icon: 'megaphone',
        section: Section.STUDIO_MARKETING,
        status: 'soon',
      },
      { key: 'marketing_dashboard', icon: 'chart-pie', section: Section.CHARTS, status: 'soon' },
      {
        key: 'marketing_intelligence',
        icon: 'lightbulb',
        section: Section.STUDIO_MARKETING,
        status: 'soon',
      },
      {
        key: 'marketing_landing',
        icon: 'browser',
        section: Section.TEMPLATE_LANDING,
        status: 'active',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. SALES STUDIO - Sales & Conversion (Yellow #EAB308)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_sales',
    icon: 'coins',
    status: 'active',
    group: 'team',
    children: [
      {
        key: 'sales_ai',
        icon: 'robot',
        section: Section.TEMPLATE_SALES_DASHBOARD,
        status: 'active',
      },
      { key: 'sales_launch', icon: 'rocket', section: Section.STUDIO_SALES, status: 'soon' },
      {
        key: 'sales_crm',
        icon: 'users',
        section: Section.TEMPLATE_SALES_CALLS,
        status: 'active',
      },
      {
        key: 'sales_churn',
        icon: 'chart-line-down',
        section: Section.STUDIO_SALES,
        status: 'soon',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. PEOPLE STUDIO - Culture & Team (Cyan #06B6D4)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_people',
    icon: 'users-alt',
    status: 'soon',
    group: 'team',
    children: [
      {
        key: 'people_comms',
        icon: 'comment-alt',
        section: Section.TEMPLATE_COMMUNITY_EMAILS,
        status: 'soon',
      },
      {
        key: 'people_nexial',
        icon: 'network-cloud',
        section: Section.STUDIO_PEOPLE,
        status: 'soon',
      },
      {
        key: 'people_onboarding',
        icon: 'user-add',
        section: Section.STUDIO_PEOPLE,
        status: 'soon',
      },
      {
        key: 'people_performance',
        icon: 'chart-line',
        section: Section.STUDIO_PEOPLE,
        status: 'soon',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. OPS STUDIO - Infrastructure & Security (Slate #64748B)
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'studio_ops',
    icon: 'settings-sliders',
    status: 'active',
    group: 'team',
    children: [
      {
        key: 'ops_llm',
        icon: 'microchip-ai',
        section: Section.EXTERNAL_PROMPT_OPS,
        status: 'active',
      },
      {
        key: 'ops_prd',
        icon: 'clipboard-list',
        section: Section.STUDIO_PRD_DASHBOARD,
        status: 'active',
      },
      { key: 'ops_data', icon: 'chart-network', section: Section.STUDIO_OPS, status: 'soon' },
      { key: 'ops_security', icon: 'shield', section: Section.STUDIO_OPS, status: 'soon' },
      { key: 'ops_integrations', icon: 'link', section: Section.STUDIO_OPS, status: 'soon' },
      { key: 'ops_vault', icon: 'lock', section: Section.EXTERNAL_VAULT, status: 'active' },
      {
        key: 'ops_users',
        icon: 'users',
        section: Section.STUDIO_OPS_USERS,
        status: 'active',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Main Menu: Database
  // ═══════════════════════════════════════════════════════════════
  { key: 'ops_db', icon: 'database', section: Section.STUDIO_OPS_DB, status: 'active', group: 'team' },
];

// Design system sections for checking if sidebar item is active
export const designSystemSections = [
  'concept',
  'identity',
  'colors',
  'typography',
  'spacing',
  'icons',
  'motion',
  'buttons',
  'components',
  'cards',
  'forms',
  'tables',
  'lists',
  'states',
  'feedback',
  'advanced',
  'graphs',
  'charts',
  'tokens',
  'docs',
  'ai_manual',
  'legendary_vs_mediocre',
  'marketing_guide',
];
