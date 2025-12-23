import React, { useState, useEffect } from 'react';
import { Section, Language } from '../../../types';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { THEMES, ThemeName } from '../../../lib/theme';
import { useTheme } from '../../../lib/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface SidebarProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentThemeName: ThemeName;
  setThemeName: (t: ThemeName) => void;
  currentLanguage: Language;
  setLanguage: (l: Language) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
}

interface NavItem {
  key: string; // Translation key
  icon?: string; // Optional for deeper levels
  section?: Section;
  children?: NavItem[];
  badge?: string; // Count badge like "8 cursos"
  status?: 'active' | 'soon' | 'beta'; // Status indicator
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setSection,
  isCollapsed,
  toggleCollapse,
  currentThemeName,
  setThemeName,
  currentLanguage,
  setLanguage,
  isMobileOpen,
  closeMobileMenu,
}) => {
  const { isDark, setIsDark } = useTheme();
  // Default expanded menus
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  // Translation Dictionary
  const translations: Record<Language, Record<string, string>> = {
    pt: {
      // 8 Studios (Main Navigation) - Portuguese Product Names
      studio_learn: 'Academia',
      studio_clone: 'Mentes Sintéticas',
      studio_brand: 'Identidade',
      studio_content: 'Criação & Conteúdo',
      studio_marketing: 'Tráfego & Conversão',
      studio_sales: 'Vendas & Clientes',
      studio_people: 'Equipe & Cultura',
      studio_ops: 'Operações',

      // Learn Studio Products
      learn_courses: 'Criador de Cursos',
      learn_challenges: 'Desafios',
      learn_programs: 'Programas',
      learn_journey: 'Jornada do Aluno',

      // Clone Studio Products
      clone_minds: 'Mentes Sintéticas',
      clone_voice: 'Clonagem de Voz',
      clone_humanizer: 'Humanizador',
      clone_vault: 'Cofre de Identidades',

      // Brand Studio Products
      brand_design_system: 'Design System',
      brand_branding: 'Identidade Visual',
      brand_hall: 'Hall da Fama',
      brand_media: 'Banco de Mídia',

      // Content Studio Products
      content_ops: 'Gestão de Conteúdo',
      content_video: 'Vídeos',
      content_social: 'Redes Sociais',
      content_newsletter: 'Newsletter',

      // Marketing Studio Products
      marketing_ads: 'Fábrica de Anúncios',
      marketing_dashboard: 'Dashboard de Ads',
      marketing_intelligence: 'Inteligência',
      marketing_landing: 'Landing Pages',

      // Sales Studio Products
      sales_ai: 'Sales AI',
      sales_launch: 'Lançamentos',
      sales_crm: 'CRM',
      sales_churn: 'Previsão de Churn',

      // People Studio Products
      people_comms: 'Comunicação',
      people_nexial: 'Sistema Nexial',
      people_onboarding: 'Onboarding',
      people_performance: 'Performance',

      // Ops Studio Products
      ops_llm: 'Gerenciador LLM',
      ops_prd: 'PRD Studio',
      ops_data: 'Data Lake',
      ops_security: 'Segurança',
      ops_integrations: 'Integrações',
      ops_vault: 'Senhas e Acessos',

      // Design System Subgroups (under Brand)
      ds_overview: 'Visão Geral',
      ds_identity: 'Identidade & Marca',
      ds_foundations: 'Tokens',
      ds_components: 'Biblioteca UI',
      ds_templates: 'Templates & Páginas',
      ds_docs: 'Documentação',

      // Design System Items
      overview: 'Conceito',
      verbal_identity: 'Identidade Verbal',
      identity: 'Identidade',
      legendary_vs_mediocre: 'Lendário vs Medíocre',
      colors: 'Cores & Temas',
      typography: 'Tipografia',
      spacing: 'Espaçamentos',
      icons: 'Ícones',
      lists: 'Listas',
      motion: 'Motion',
      graphs: 'Grafos (Redes)',
      charts: 'Charts (KPIs)',
      components: 'Componentes Básicos',
      buttons: 'Botões',
      advanced: 'Interações Avançadas',
      feedback: 'Feedback',
      states: 'Estados & Loading',
      cards: 'Cards & Boxes',
      forms: 'Formulários',
      tables: 'Tabelas',
      marketing_kit: 'Marketing Templates',
      community_kit: 'Comunidade Lendária',
      templates_app: 'SaaS / App',
      tpl_app_cms: 'CMS / Blog Manager',
      tpl_app_kanban: 'Kanban / Projetos',
      tpl_app_settings: 'Configurações / Perfil',
      tpl_landing: 'Landing Page',
      tpl_advertorial: 'Advertorial',
      tpl_sales: 'Página de Vendas',
      tpl_ebook: 'Baixar Ebook',
      tpl_vsl: 'Página VSL (Vídeo)',
      tpl_webinar: 'Registro Webinário',
      tpl_thankyou: 'Obrigado / Upsell',
      tpl_emails: 'Sequência de Emails',
      tpl_comm_adv: 'Advertorial Comunidade',
      tpl_comm_sales: 'PV Comunidade',
      tpl_comm_capture: 'Captura Comunidade',
      tpl_comm_vsl: 'VSL Comunidade',
      sidebar_legacy: 'Sidebar (Legacy)',
      marketing_guide: 'Guia de Copywriting',
      tokens: 'Tokens (CSS Variables)',
      technical: 'Docs Técnica',
      ai_manual: 'Manual para IA',
      lang_select: 'Selecionar Idioma',
      theme_select: 'Selecionar Cor',
    },
    en: {
      // 8 Studios
      studio_learn: 'Learn',
      studio_clone: 'Clone',
      studio_brand: 'Brand',
      studio_content: 'Content',
      studio_marketing: 'Marketing',
      studio_sales: 'Sales',
      studio_people: 'People',
      studio_ops: 'Ops',

      // Studio Products
      learn_courses: 'Course Builder',
      learn_challenges: 'Challenge Hub',
      learn_programs: 'Program Manager',
      learn_journey: 'Student Journey',
      clone_minds: 'Synthetic Minds',
      clone_voice: 'Voice Cloner',
      clone_humanizer: 'Humanizer',
      clone_vault: 'Identity Vault',
      brand_design_system: 'Design System',
      brand_branding: 'Branding OS',
      brand_hall: 'Hall of Fame',
      brand_media: 'Media Hub',
      content_ops: 'Content Ops',
      content_video: 'Video Ops',
      content_social: 'Social Ops',
      content_newsletter: 'Newsletter Ops',
      marketing_ads: 'Ads Factory',
      marketing_dashboard: 'Ads Dashboard',
      marketing_intelligence: 'Intelligence Hub',
      marketing_landing: 'Landing Pages',
      sales_ai: 'Sales AI',
      sales_launch: 'Launch Manager',
      sales_crm: 'CRM Intelligence',
      sales_churn: 'Churn Predictor',
      people_comms: 'Comms Central',
      people_nexial: 'Nexial System',
      people_onboarding: 'Onboarding Hub',
      people_performance: 'Performance Hub',
      ops_llm: 'LLM Manager',
      ops_prd: 'PRD Studio',
      ops_data: 'Data Lake',
      ops_security: 'Security Hub',
      ops_integrations: 'Integration Hub',
      ops_vault: 'Access & Passwords',

      // Design System
      ds_overview: 'Overview',
      ds_identity: 'Identity & Brand',
      ds_foundations: 'Foundations',
      ds_components: 'UI Library',
      ds_templates: 'Templates',
      ds_docs: 'Documentation',
      overview: 'Concept',
      verbal_identity: 'Verbal Identity',
      identity: 'Identity',
      legendary_vs_mediocre: 'Legendary vs Mediocre',
      colors: 'Colors & Themes',
      typography: 'Typography',
      spacing: 'Spacing',
      icons: 'Icons',
      lists: 'Lists',
      motion: 'Motion',
      graphs: 'Graphs (Network)',
      charts: 'Charts (KPIs)',
      components: 'Basic Components',
      buttons: 'Buttons',
      advanced: 'Advanced Interactions',
      feedback: 'Feedback',
      states: 'States & Loading',
      cards: 'Cards & Boxes',
      forms: 'Forms',
      tables: 'Tables',
      marketing_kit: 'Marketing Templates',
      community_kit: 'Legendary Community',
      templates_app: 'SaaS / App',
      tpl_app_cms: 'CMS / Blog Manager',
      tpl_app_kanban: 'Kanban / Projects',
      tpl_app_settings: 'Settings / Profile',
      tpl_landing: 'Landing Page',
      tpl_advertorial: 'Advertorial',
      tpl_sales: 'Sales Page',
      tpl_ebook: 'Download Ebook',
      tpl_vsl: 'VSL Page (Video)',
      tpl_webinar: 'Webinar Reg.',
      tpl_thankyou: 'Thank You / Upsell',
      tpl_emails: 'Email Sequence',
      tpl_comm_adv: 'Comm. Advertorial',
      tpl_comm_sales: 'Comm. Sales Page',
      tpl_comm_capture: 'Comm. Capture',
      tpl_comm_vsl: 'Comm. VSL',
      sidebar_legacy: 'Sidebar (Legacy)',
      marketing_guide: 'Copywriting Guide',
      tokens: 'Tokens',
      technical: 'Technical Docs',
      ai_manual: 'AI Manual',
      lang_select: 'Select Language',
      theme_select: 'Select Color',
    },
    es: {
      // 8 Studios
      studio_learn: 'Learn',
      studio_clone: 'Clone',
      studio_brand: 'Brand',
      studio_content: 'Content',
      studio_marketing: 'Marketing',
      studio_sales: 'Sales',
      studio_people: 'People',
      studio_ops: 'Ops',

      // Studio Products
      learn_courses: 'Creador de Cursos',
      learn_challenges: 'Challenge Hub',
      learn_programs: 'Program Manager',
      learn_journey: 'Student Journey',
      clone_minds: 'Mentes Sintéticas',
      clone_voice: 'Voice Cloner',
      clone_humanizer: 'Humanizer',
      clone_vault: 'Identity Vault',
      brand_design_system: 'Design System',
      brand_branding: 'Branding OS',
      brand_hall: 'Hall de la Fama',
      brand_media: 'Media Hub',
      content_ops: 'Content Ops',
      content_video: 'Video Ops',
      content_social: 'Social Ops',
      content_newsletter: 'Newsletter Ops',
      marketing_ads: 'Ads Factory',
      marketing_dashboard: 'Ads Dashboard',
      marketing_intelligence: 'Intelligence Hub',
      marketing_landing: 'Landing Pages',
      sales_ai: 'Sales AI',
      sales_launch: 'Launch Manager',
      sales_crm: 'CRM Intelligence',
      sales_churn: 'Churn Predictor',
      people_comms: 'Central de Comunicación',
      people_nexial: 'Sistema Nexial',
      people_onboarding: 'Onboarding Hub',
      people_performance: 'Performance Hub',
      ops_llm: 'LLM Manager',
      ops_prd: 'PRD Studio',
      ops_data: 'Data Lake',
      ops_security: 'Security Hub',
      ops_integrations: 'Integration Hub',
      ops_vault: 'Accesos y Contraseñas',

      // Design System
      ds_overview: 'Visión General',
      ds_identity: 'Identidad y Marca',
      ds_foundations: 'Fundamentos',
      ds_components: 'Biblioteca UI',
      ds_templates: 'Plantillas',
      ds_docs: 'Documentación',
      overview: 'Concepto',
      verbal_identity: 'Identidad Verbal',
      identity: 'Identidad',
      legendary_vs_mediocre: 'Legendario vs Mediocre',
      colors: 'Colores y Temas',
      typography: 'Tipografía',
      spacing: 'Espaciado',
      icons: 'Iconos',
      lists: 'Listas',
      motion: 'Movimiento',
      graphs: 'Grafos (Redes)',
      charts: 'Gráficos (KPIs)',
      components: 'Componentes Básicos',
      buttons: 'Botones',
      advanced: 'Interacciones Avanzadas',
      feedback: 'Feedback',
      states: 'Estados y Carga',
      cards: 'Tarjetas y Cajas',
      forms: 'Formularios',
      tables: 'Tablas',
      marketing_kit: 'Marketing Templates',
      community_kit: 'Comunidad Legendaria',
      templates_app: 'SaaS / App',
      tpl_app_cms: 'CMS / Blog Manager',
      tpl_app_kanban: 'Kanban / Proyectos',
      tpl_app_settings: 'Configuración / Perfil',
      tpl_landing: 'Landing Page',
      tpl_advertorial: 'Advertorial',
      tpl_sales: 'Página de Ventas',
      tpl_ebook: 'Descargar Ebook',
      tpl_vsl: 'Página VSL (Video)',
      tpl_webinar: 'Registro Webinario',
      tpl_thankyou: 'Gracias / Upsell',
      tpl_emails: 'Secuencia de Correos',
      tpl_comm_adv: 'Advertorial Com.',
      tpl_comm_sales: 'Ventas Com.',
      tpl_comm_capture: 'Captura Com.',
      tpl_comm_vsl: 'VSL Com.',
      sidebar_legacy: 'Sidebar (Legacy)',
      marketing_guide: 'Guía de Copywriting',
      tokens: 'Tokens',
      technical: 'Documentación Técnica',
      ai_manual: 'Manual IA',
      lang_select: 'Seleccionar Idioma',
      theme_select: 'Seleccionar Color',
    },
  };

  const t = (key: string) => translations[currentLanguage][key] || key;

  // Updated Navigation Structure - 8 Studios with badges and status
  const navStructure: NavItem[] = [
    // ═══════════════════════════════════════════════════════════════
    // 1. LEARN STUDIO - Educational Hub (Blue #3B82F6)
    // ═══════════════════════════════════════════════════════════════
    {
      key: 'studio_learn',
      icon: 'graduation-cap',
      status: 'active',
      children: [
        {
          key: 'learn_courses',
          icon: 'book-open-cover',
          section: Section.APP_CREATOR_COURSES,
          status: 'active',
        },
        {
          key: 'learn_challenges',
          icon: 'trophy',
          section: Section.EXTERNAL_CHALLENGES,
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
    },

    // ═══════════════════════════════════════════════════════════════
    // 3. BRAND STUDIO - Visual Identity & Design System (Pink #EC4899)
    // ═══════════════════════════════════════════════════════════════
    {
      key: 'studio_brand',
      icon: 'palette',
      status: 'active',
      children: [
        // Design System (link direto - navegação interna via Topbar)
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
        { key: 'ops_data', icon: 'database', section: Section.STUDIO_OPS, status: 'soon' },
        { key: 'ops_security', icon: 'shield', section: Section.STUDIO_OPS, status: 'soon' },
        { key: 'ops_integrations', icon: 'link', section: Section.STUDIO_OPS, status: 'soon' },
        { key: 'ops_vault', icon: 'lock', section: Section.EXTERNAL_VAULT, status: 'active' },
      ],
    },
  ];

  // Logic to auto-expand parent menus based on current section
  useEffect(() => {
    const findParentKeys = (
      items: NavItem[],
      targetSection: Section,
      parentKeys: string[] = []
    ): string[] | null => {
      for (const item of items) {
        if (item.section === targetSection) {
          return parentKeys;
        }
        if (item.children) {
          const result = findParentKeys(item.children, targetSection, [...parentKeys, item.key]);
          if (result) return result;
        }
      }
      return null;
    };

    const parentKeys = findParentKeys(navStructure, currentSection);
    if (parentKeys && parentKeys.length > 0) {
      setExpandedMenus((prev) => {
        const newExpanded = [...prev];
        parentKeys.forEach((key) => {
          if (!newExpanded.includes(key)) {
            newExpanded.push(key);
          }
        });
        return newExpanded;
      });
    }
  }, [currentSection]);

  const toggleSubmenu = (key: string) => {
    if (isCollapsed) {
      toggleCollapse();
      setExpandedMenus([...expandedMenus, key]);
    } else {
      setExpandedMenus((prev) =>
        prev.includes(key) ? prev.filter((l) => l !== key) : [...prev, key]
      );
    }
  };

  const isSubmenuActive = (item: NavItem): boolean => {
    if (item.section === currentSection) return true;
    // Studio-level checks for section prefixes
    if (item.key === 'studio_sales' && currentSection.startsWith('template_sales')) return true;
    if (item.key === 'studio_clone' && currentSection.startsWith('app_minds')) return true;
    if (item.key === 'studio_learn' && currentSection.startsWith('app_creator')) return true;
    if (item.key === 'studio_ops' && currentSection.startsWith('studio_prd')) return true;
    if (
      item.key === 'studio_brand' &&
      (currentSection.startsWith('template_') ||
        [
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
        ].includes(currentSection))
    )
      return true;
    if (item.children) {
      return item.children.some((child) => isSubmenuActive(child));
    }
    return false;
  };

  const handleSectionClick = (section: Section) => {
    setSection(section);
    closeMobileMenu();
  };

  // Badge component for status and counts
  const renderBadge = (item: NavItem, isRootItem: boolean) => {
    if (isCollapsed) return null;

    // For root items with badges (count badges like "8 cursos")
    if (isRootItem && item.badge) {
      return (
        <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
          {item.badge}
        </span>
      );
    }

    // For items with status 'soon' - no badge, just opacity applied via className
    if (item.status === 'soon') {
      return null;
    }

    if (item.status === 'beta') {
      return (
        <span className="ml-auto rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-medium text-amber-600 dark:text-amber-400">
          Beta
        </span>
      );
    }

    return null;
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;

    // Check if this item or its children are active
    const isActive = item.section === currentSection;

    const isExpanded = expandedMenus.includes(item.key);
    const isParentActive = isSubmenuActive(item);
    const label = t(item.key);
    const isSoon = item.status === 'soon';

    const paddingLeftClass = depth === 0 ? 'px-3' : `pl-${3 + depth * 3}`;
    const alignmentClass = isCollapsed
      ? 'justify-center px-2'
      : `justify-between ${paddingLeftClass}`;
    const isRootItem = depth === 0;

    if (hasChildren) {
      return (
        <li key={item.key} className="mb-1">
          <button
            onClick={() => toggleSubmenu(item.key)}
            className={cn(
              'group relative flex w-full items-center rounded-lg py-2.5 text-sm transition-all duration-200',
              alignmentClass,
              isRootItem
                ? 'font-semibold text-foreground hover:bg-muted/50'
                : 'text-sm text-muted-foreground hover:text-foreground',
              isParentActive && !isExpanded && !isRootItem ? 'font-medium text-primary' : '',
              isRootItem && isParentActive ? 'bg-muted/30' : '',
              isSoon && 'opacity-60'
            )}
            title={isCollapsed ? label : undefined}
          >
            <div
              className={cn('flex items-center', isCollapsed ? 'w-full justify-center' : 'gap-3')}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={isRootItem ? 'size-5' : 'size-4'}
                  className={cn(
                    isParentActive && isRootItem
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
              )}
              {!isCollapsed && <span>{label}</span>}
              {!isCollapsed && isRootItem && item.badge && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <Icon
                name="angle-small-down"
                className={cn(
                  'size-4 opacity-50 transition-transform duration-200',
                  isExpanded ? 'rotate-180' : ''
                )}
              />
            )}
          </button>

          <div
            className={cn(
              'grid transition-[grid-template-rows] duration-300 ease-in-out',
              isExpanded && !isCollapsed
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <ul className={cn('space-y-1 pb-1', isRootItem && 'mt-1')}>
                {item.children!.map((child) => renderNavItem(child, depth + 1))}
              </ul>
            </div>
          </div>
        </li>
      );
    }

    // Check if this is a Creator Studio item (learn_courses or related)
    const isCreatorItem = item.key === 'learn_courses' || item.section?.startsWith('app_creator');
    const creatorColor = '#538096'; // STUDIO_PRIMARY - Azul Petróleo

    return (
      <li key={item.key} className="mb-1">
        <button
          onClick={() => item.section && !isSoon && handleSectionClick(item.section)}
          disabled={isSoon}
          className={cn(
            'flex w-full items-center rounded-lg py-2 text-left text-sm transition-all duration-200',
            isCollapsed ? 'justify-center px-2' : `gap-3 ${paddingLeftClass}`,
            isRootItem && isActive
              ? 'bg-primary font-bold text-primary-foreground shadow-sm'
              : isRootItem
                ? 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
                : isActive && isCreatorItem
                  ? 'rounded-r-none border-r-2 border-[#538096] bg-[#538096]/10 font-medium'
                  : isActive
                    ? 'rounded-r-none border-r-2 border-primary bg-primary/5 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
            isSoon &&
              'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted-foreground'
          )}
          style={isActive && isCreatorItem ? { color: creatorColor } : {}}
          title={isCollapsed ? label : undefined}
        >
          {item.icon ? (
            <Icon
              name={item.icon}
              size={isRootItem ? 'size-5' : 'size-4'}
              className={cn(
                isRootItem && isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground group-hover:text-foreground',
                !isRootItem && isActive && !isCreatorItem && 'text-primary'
              )}
              style={!isRootItem && isActive && isCreatorItem ? { color: creatorColor } : {}}
            />
          ) : (
            <div
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                !isCollapsed && 'ml-1.5 mr-1',
                isActive && !isCreatorItem
                  ? 'bg-primary'
                  : !isActive
                    ? 'bg-border group-hover:bg-muted-foreground'
                    : ''
              )}
              style={isActive && isCreatorItem ? { backgroundColor: creatorColor } : {}}
            />
          )}

          {!isCollapsed && <span className="flex-1">{label}</span>}
          {renderBadge(item, isRootItem)}
        </button>
      </li>
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col overflow-visible border-r border-border bg-card shadow-2xl transition-all duration-300 md:shadow-none',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'relative flex h-16 flex-none items-center border-b border-border bg-card transition-all duration-300',
            isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
          )}
        >
          <div
            className={cn(
              'flex items-center gap-2 overflow-hidden whitespace-nowrap',
              isCollapsed ? 'w-full justify-center' : ''
            )}
          >
            <img
              src={
                isDark
                  ? 'https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg'
                  : 'https://academialendaria.ai/wp-content/uploads/2025/12/Silhueta-AL-32-Black.svg'
              }
              alt="Academia Lendária"
              className={cn('h-8 w-8 shrink-0 object-contain transition-all duration-300')}
            />
            <div
              className={cn(
                'flex font-sans text-xl font-bold leading-none tracking-tight transition-all duration-300',
                isCollapsed ? 'hidden w-0 opacity-0' : 'opacity-100'
              )}
            >
              Lendár<span className="text-primary">[IA]</span>OS
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="absolute right-4 text-muted-foreground hover:text-foreground md:hidden"
          >
            <Icon name="cross" size="size-4" />
          </button>

          {!isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="absolute right-4 hidden text-muted-foreground hover:text-foreground md:block"
            >
              <Icon name="angle-small-left" size="size-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">{navStructure.map((item) => renderNavItem(item))}</ul>
        </nav>

        {/* New Footer: User Profile & Actions */}
        <div className="flex-none border-t border-border bg-card p-4">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={toggleCollapse}
                className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted md:block"
              >
                <Icon name="angle-double-right" size="size-4" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative">
                    <Avatar className="h-10 w-10 border-2 border-border transition-colors group-hover:border-primary">
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="ml-2 w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Alan Nicolas</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@lendaria.ai
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" className="mr-2 h-4 w-4" /> Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSectionClick(Section.EXTERNAL_VAULT)}>
                    <Icon name="lock" className="mr-2 h-4 w-4" /> Acessos e Senhas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDark(!isDark)}>
                    <Icon name={isDark ? 'sun' : 'moon'} className="mr-2 h-4 w-4" />
                    Tema: {isDark ? 'Escuro' : 'Claro'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Icon name="sign-out-alt" className="mr-2 h-4 w-4" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex w-full items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group flex w-full items-center gap-3 rounded-xl p-2 text-left outline-none transition-colors hover:bg-muted/50">
                    <Avatar className="h-9 w-9 border border-border transition-colors group-hover:border-primary/50">
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-bold transition-colors group-hover:text-primary">
                        Alan Nicolas
                      </p>
                      <p className="truncate text-xs text-muted-foreground">Admin Workspace</p>
                    </div>
                    <Icon
                      name="angle-small-up"
                      className="text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100"
                      size="size-4"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="mb-2 w-56" side="top">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Alan Nicolas</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@lendaria.ai
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" className="mr-2 h-4 w-4" /> Minha Conta
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSectionClick(Section.EXTERNAL_VAULT)}>
                    <Icon name="lock" className="mr-2 h-4 w-4" /> Acessos e Senhas
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" className="mr-2 h-4 w-4" /> Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Icon name="sign-out-alt" className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quick Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                title={isDark ? 'Mudar para Claro' : 'Mudar para Escuro'}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size="size-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
