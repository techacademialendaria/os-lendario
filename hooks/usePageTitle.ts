import { useEffect } from 'react';
import { Section } from '../types';

const APP_NAME = 'Academia Lendária';

/**
 * Maps each Section to its default display title
 */
const SECTION_TITLES: Record<Section, string> = {
  // Studios (Main Navigation)
  [Section.STUDIO_LEARN]: 'Learn Studio',
  [Section.STUDIO_CLONE]: 'Clone Studio',
  [Section.STUDIO_BRAND]: 'Brand Studio',
  [Section.STUDIO_CONTENT]: 'Content Studio',
  [Section.STUDIO_MARKETING]: 'Marketing Studio',
  [Section.STUDIO_SALES]: 'Sales Studio',
  [Section.STUDIO_PEOPLE]: 'People Studio',
  [Section.STUDIO_OPS]: 'Ops Studio',

  // Design System
  [Section.CONCEPT]: 'Conceito',
  [Section.IDENTITY]: 'Identidade',
  [Section.LEGENDARY_VS_MEDIOCRE]: 'Lendário vs Medíocre',
  [Section.COLORS]: 'Cores',
  [Section.TYPOGRAPHY]: 'Tipografia',
  [Section.SPACING]: 'Espaçamento',
  [Section.ICONS]: 'Ícones',
  [Section.ICONS_COMPARE]: 'Comparar Ícones',
  [Section.LISTS]: 'Listas',
  [Section.MOTION]: 'Motion',
  [Section.GRAPHS]: 'Gráficos',
  [Section.CHARTS]: 'Charts',
  [Section.COMPONENTS]: 'Componentes',
  [Section.BUTTONS]: 'Botões',
  [Section.ADVANCED]: 'Avançado',
  [Section.FEEDBACK]: 'Feedback',
  [Section.STATES]: 'Estados',
  [Section.CARDS]: 'Cards',
  [Section.FORMS]: 'Formulários',
  [Section.TABLES]: 'Tabelas',
  [Section.TEMPLATE_APP_CMS]: 'Template CMS',
  [Section.TEMPLATE_APP_KANBAN]: 'Template Kanban',
  [Section.TEMPLATE_APP_SETTINGS]: 'Template Settings',
  [Section.TEMPLATE_SIDEBAR_LEGACY]: 'Sidebar Legacy',

  // Creator App
  [Section.APP_CREATOR_COURSES]: 'Cursos',
  [Section.APP_CREATOR_CONTENT]: 'Conteúdo',
  [Section.APP_CREATOR_PERSONAS]: 'Personas',
  [Section.APP_CREATOR_FRAMEWORKS]: 'Frameworks',
  [Section.APP_CREATOR_PERFORMANCE]: 'Performance',
  [Section.APP_CREATOR_SETTINGS]: 'Configurações',

  // Learn App
  [Section.APP_LEARN_GROUPS]: 'WhatsApp Groups',
  [Section.APP_LMS_HOME]: 'LMS',

  // Sales App
  [Section.TEMPLATE_SALES_DASHBOARD]: 'Sales Dashboard',
  [Section.TEMPLATE_SALES_CALLS]: 'Chamadas',
  [Section.TEMPLATE_SALES_CALL_DETAILS]: 'Detalhes da Chamada',
  [Section.TEMPLATE_SALES_MARKETING]: 'Marketing',
  [Section.TEMPLATE_SALES_PRODUCT]: 'Produto',
  [Section.TEMPLATE_SALES_SETTINGS]: 'Configurações',
  [Section.TEMPLATE_SALES_OBJECTIONS]: 'Objeções',

  // Minds App
  [Section.APP_MINDS_GALLERY]: 'Galeria de Mentes',
  [Section.APP_MINDS_PROFILE]: 'Perfil da Mente',
  [Section.APP_MINDS_MATRIX]: 'Matriz de Comparação',
  [Section.APP_MINDS_WIZARD]: 'Wizard de Criação',
  [Section.APP_MINDS_ARENA]: 'Arena',

  // Marketing Templates
  [Section.MARKETING_GUIDE]: 'Guia de Marketing',
  [Section.TEMPLATE_LANDING]: 'Landing Page',
  [Section.TEMPLATE_ADVERTORIAL]: 'Advertorial',
  [Section.TEMPLATE_SALES]: 'Página de Vendas',
  [Section.TEMPLATE_EBOOK]: 'E-book',
  [Section.TEMPLATE_VSL]: 'VSL',
  [Section.TEMPLATE_WEBINAR]: 'Webinar',
  [Section.TEMPLATE_THANKYOU]: 'Thank You',

  // Community Templates
  [Section.TEMPLATE_COMMUNITY_CAPTURE]: 'Captura',
  [Section.TEMPLATE_COMMUNITY_ADVERTORIAL]: 'Advertorial',
  [Section.TEMPLATE_COMMUNITY_SALES]: 'Vendas',
  [Section.TEMPLATE_COMMUNITY_VSL]: 'VSL',
  [Section.TEMPLATE_COMMUNITY_EMAILS]: 'E-mails',

  // External
  [Section.EXTERNAL_CHALLENGES]: 'Desafios',
  [Section.EXTERNAL_PROMPT_OPS]: 'Prompt Ops',
  [Section.EXTERNAL_VAULT]: 'Vault',

  // Docs
  [Section.TOKENS]: 'Tokens',
  [Section.DOCS]: 'Documentação',
  [Section.AI_MANUAL]: 'Manual AI',

  // PRD Studio
  [Section.STUDIO_PRD_DASHBOARD]: 'PRD Dashboard',
  [Section.STUDIO_PRD_NEW]: 'Novo PRD',
  [Section.STUDIO_PRD_EDITOR]: 'Editor PRD',
  [Section.STUDIO_PRD_EXPORT]: 'Exportar PRD',

  // Ops Studio
  [Section.STUDIO_OPS_DB]: 'Database',
  [Section.STUDIO_OPS_SCHEMA]: 'Schema',
  [Section.STUDIO_OPS_VIEWS]: 'Views',
  [Section.STUDIO_OPS_TOOL_STACKS]: 'Tool Stacks',
  [Section.STUDIO_OPS_USERS]: 'Usuários',
  [Section.STUDIO_OPS_EMAILS]: 'Email Templates',

  // Books App
  [Section.APP_BOOKS_LIBRARY]: 'Biblioteca',
  [Section.APP_BOOKS_MY_LIBRARY]: 'Meus Livros',
  [Section.APP_BOOKS_DETAIL]: 'Detalhes do Livro',
  [Section.APP_BOOKS_READER]: 'Leitor',
  [Section.APP_BOOKS_RATING]: 'Avaliar Livro',
  [Section.APP_BOOKS_COLLECTION]: 'Coleção',
  [Section.APP_BOOKS_COLLECTIONS]: 'Coleções',
  [Section.APP_BOOKS_AUTHOR]: 'Livros do Autor',
  [Section.APP_BOOKS_AUTHORS]: 'Autores',
  [Section.APP_BOOKS_CATEGORY]: 'Categoria',
  [Section.APP_BOOKS_HIGHLIGHTS]: 'Highlights',
  [Section.APP_BOOKS_ADMIN]: 'Gestão de Acervo',
};

/**
 * Hook to dynamically update the page title
 *
 * @param title - Custom title string OR Section enum for default title
 *
 * @example
 * // Using custom title (dynamic from database)
 * usePageTitle(mind?.name || 'Carregando...');
 *
 * @example
 * // Using section-based default title
 * usePageTitle(Section.APP_MINDS_GALLERY);
 */
export function usePageTitle(title: string | Section | null | undefined): void {
  useEffect(() => {
    if (!title) {
      document.title = APP_NAME;
      return;
    }

    // Check if it's a Section enum value
    const isSection = Object.values(Section).includes(title as Section);
    const displayTitle = isSection ? SECTION_TITLES[title as Section] || title : title;

    document.title = `${displayTitle} | ${APP_NAME}`;
  }, [title]);
}

/**
 * Get the default title for a specific section
 */
export function getSectionTitle(section: Section): string {
  return SECTION_TITLES[section] || section;
}

export { SECTION_TITLES };
