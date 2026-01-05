/**
 * Configuração centralizada de Topbars
 * Garante que todos os módulos sigam o mesmo padrão visual
 * Impossibilita inconsistências no menu/navegação
 */

import { ModuleTopbarProps, ModuleTopbarNavItem } from './ModuleTopbar';
import { Section } from '../../types';

// ============================================================================
// STUDIO TOKENS (Creator & PRD)
// ============================================================================
export const CREATOR_TOKENS = {
  primary: 'hsl(var(--primary-color))',
  accent: 'hsl(var(--accent-color))',
} as const;

export const PRD_TOKENS = {
  primary: '#538096', // Blue-gray
  accent: '#A8D5E2', // Light blue
} as const;

// ============================================================================
// MINDS & SALES TOKENS
// ============================================================================
export const MINDS_TOKENS = {
  primary: 'hsl(var(--primary-color))',
  accent: 'hsl(var(--accent-color))',
} as const;

export const SALES_TOKENS = {
  primary: '#FF3B30', // Red
  accent: '#FF3B30',
} as const;

export const BOOKS_TOKENS = {
  primary: 'hsl(var(--brand-gold))', // Gold
  accent: 'hsl(var(--brand-gold))',
} as const;

export const LMS_TOKENS = {
  primary: 'hsl(var(--primary-color))',
  accent: 'hsl(var(--accent-color))',
} as const;

// ============================================================================
// TOPBAR CONFIGS (Single source of truth)
// ============================================================================

export const TOPBAR_CONFIGS = {
  creator: {
    title: 'Course Creator',
    subtitle: 'Gestão de Conteúdo Educacional',
    icon: 'graduation-cap',
    primaryColor: CREATOR_TOKENS.primary,
    accentColor: CREATOR_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Cursos',
        icon: 'graduation-cap',
        section: Section.APP_CREATOR_COURSES,
        path: '/creator/cursos',
      },
      {
        label: 'Pipeline',
        icon: 'sitemap',
        section: Section.APP_CREATOR_CONTENT,
        path: '/creator/pipeline',
      },
      {
        label: 'Personas',
        icon: 'users-alt',
        section: Section.APP_CREATOR_PERSONAS,
        path: '/creator/personas',
      },
      {
        label: 'Frameworks',
        icon: 'layers',
        section: Section.APP_CREATOR_FRAMEWORKS,
        path: '/creator/frameworks',
      },
      {
        label: 'Performance',
        icon: 'chart-histogram',
        section: Section.APP_CREATOR_PERFORMANCE,
        path: '/creator/performance',
      },
    ] as ModuleTopbarNavItem[],
  } as const,

  prd: {
    title: 'PRD',
    subtitle: 'Documentos de Requisitos',
    icon: 'clipboard-list',
    primaryColor: PRD_TOKENS.primary,
    accentColor: PRD_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Projetos',
        icon: 'folder',
        section: Section.STUDIO_PRD_DASHBOARD,
        path: '/prd',
      },
    ] as ModuleTopbarNavItem[],
  } as const,

  minds: {
    title: 'Mentes Sintéticas',
    subtitle: 'Cognitive Core',
    icon: 'brain',
    primaryColor: MINDS_TOKENS.primary,
    accentColor: MINDS_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Mentes',
        icon: 'grid',
        section: Section.APP_MINDS_GALLERY,
      },
      {
        label: 'Arena',
        icon: 'bolt',
        section: Section.APP_MINDS_ARENA,
      },
      {
        label: 'Pipeline',
        icon: 'sitemap',
        section: Section.APP_MINDS_PROFILE,
      },
      {
        label: 'DNA Mental',
        icon: 'diamond',
        section: Section.APP_MINDS_MATRIX,
      },
    ] as ModuleTopbarNavItem[],
  } as const,

  sales: {
    title: 'Sales Intelligence',
    subtitle: 'Enterprise',
    icon: 'chart-histogram',
    primaryColor: SALES_TOKENS.primary,
    accentColor: SALES_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Dashboard',
        icon: 'apps',
        section: Section.TEMPLATE_SALES_DASHBOARD,
      },
      {
        label: 'Calls',
        icon: 'headset',
        section: Section.TEMPLATE_SALES_CALLS,
      },
      {
        label: 'Objeções',
        icon: 'shield',
        section: Section.TEMPLATE_SALES_OBJECTIONS,
      },
      {
        label: 'Marketing',
        icon: 'megaphone',
        section: Section.TEMPLATE_SALES_MARKETING,
      },
      {
        label: 'Produto',
        icon: 'box',
        section: Section.TEMPLATE_SALES_PRODUCT,
      },
      {
        label: 'Configurações',
        icon: 'settings',
        section: Section.TEMPLATE_SALES_SETTINGS,
      },
    ] as ModuleTopbarNavItem[],
  } as const,

  books: {
    title: 'Biblioteca',
    subtitle: 'Lendária',
    icon: 'book-open-cover',
    primaryColor: BOOKS_TOKENS.primary,
    accentColor: BOOKS_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Explorar',
        icon: 'globe',
        section: Section.APP_BOOKS_LIBRARY,
        path: '/books',
      },
      {
        label: 'Autores',
        icon: 'user',
        section: Section.APP_BOOKS_AUTHORS,
        path: '/books/authors',
      },
      {
        label: 'Meus Livros',
        icon: 'star',
        section: Section.APP_BOOKS_MY_LIBRARY,
        path: '/books/my-library',
      },
    ] as ModuleTopbarNavItem[],
  } as const,

  lms: {
    title: 'Academia',
    subtitle: 'Lendár[IA]',
    icon: 'graduation-cap',
    primaryColor: LMS_TOKENS.primary,
    accentColor: LMS_TOKENS.accent,
    variant: 'left' as const,
    navItems: [
      {
        label: 'Início',
        icon: 'home',
        section: Section.APP_LMS_HOME,
        path: '/lms',
      },
      {
        label: 'Minha Lista',
        icon: 'list',
        section: Section.APP_LMS_HOME,
        path: '/lms?filter=saved',
      },
    ] as ModuleTopbarNavItem[],
  } as const,
} as const;

// ============================================================================
// HELPER: Get config for module
// ============================================================================
export type ModuleKey = keyof typeof TOPBAR_CONFIGS;

export const getTopbarConfig = (module: ModuleKey) => TOPBAR_CONFIGS[module];

export type TopbarConfig = (typeof TOPBAR_CONFIGS)[ModuleKey];
