import { Section } from './types';

// Map Sections to URL paths
export const SECTION_ROUTES: Record<Section, string> = {
  // Studios (Main Navigation)
  [Section.STUDIO_LEARN]: '/studio/learn',
  [Section.STUDIO_CLONE]: '/studio/clone',
  [Section.STUDIO_BRAND]: '/studio/brand',
  [Section.STUDIO_CONTENT]: '/studio/content',
  [Section.STUDIO_MARKETING]: '/studio/marketing',
  [Section.STUDIO_SALES]: '/studio/sales',
  [Section.STUDIO_PEOPLE]: '/studio/people',
  [Section.STUDIO_OPS]: '/studio/ops',

  // Design System (under Brand)
  [Section.CONCEPT]: '/design/concept',
  [Section.IDENTITY]: '/design/identity',
  [Section.LEGENDARY_VS_MEDIOCRE]: '/design/legendary-vs-mediocre',
  [Section.COLORS]: '/design/colors',
  [Section.TYPOGRAPHY]: '/design/typography',
  [Section.SPACING]: '/design/spacing',
  [Section.ICONS]: '/design/icons',
  [Section.ICONS_COMPARE]: '/design/icons-compare',
  [Section.LISTS]: '/design/lists',
  [Section.MOTION]: '/design/motion',
  [Section.GRAPHS]: '/design/graphs',
  [Section.CHARTS]: '/design/charts',
  [Section.COMPONENTS]: '/design/components',
  [Section.BUTTONS]: '/design/buttons',
  [Section.ADVANCED]: '/design/advanced',
  [Section.FEEDBACK]: '/design/feedback',
  [Section.STATES]: '/design/states',
  [Section.CARDS]: '/design/cards',
  [Section.FORMS]: '/design/forms',
  [Section.TABLES]: '/design/tables',

  // Design System Templates
  [Section.TEMPLATE_APP_CMS]: '/design/templates/cms',
  [Section.TEMPLATE_APP_KANBAN]: '/design/templates/kanban',
  [Section.TEMPLATE_APP_SETTINGS]: '/design/templates/settings',
  [Section.TEMPLATE_SIDEBAR_LEGACY]: '/design/templates/sidebar-legacy',

  // Creator App
  [Section.APP_CREATOR_COURSES]: '/creator/courses',
  [Section.APP_CREATOR_CONTENT]: '/creator/content',
  [Section.APP_CREATOR_PERSONAS]: '/creator/personas',
  [Section.APP_CREATOR_FRAMEWORKS]: '/creator/frameworks',
  [Section.APP_CREATOR_PERFORMANCE]: '/creator/performance',
  [Section.APP_CREATOR_SETTINGS]: '/creator/settings',

  // Sales App
  [Section.TEMPLATE_SALES_DASHBOARD]: '/sales/dashboard',
  [Section.TEMPLATE_SALES_CALLS]: '/sales/calls',
  [Section.TEMPLATE_SALES_CALL_DETAILS]: '/sales/calls/details',
  [Section.TEMPLATE_SALES_MARKETING]: '/sales/marketing',
  [Section.TEMPLATE_SALES_PRODUCT]: '/sales/product',
  [Section.TEMPLATE_SALES_SETTINGS]: '/sales/settings',
  [Section.TEMPLATE_SALES_OBJECTIONS]: '/sales/objections',

  // Minds App
  [Section.APP_MINDS_GALLERY]: '/minds/gallery',
  [Section.APP_MINDS_PROFILE]: '/minds/profile',
  [Section.APP_MINDS_MATRIX]: '/minds/matrix',
  [Section.APP_MINDS_WIZARD]: '/minds/wizard',
  [Section.APP_MINDS_ARENA]: '/minds/arena',

  // Marketing Templates
  [Section.MARKETING_GUIDE]: '/marketing/guide',
  [Section.TEMPLATE_LANDING]: '/marketing/landing',
  [Section.TEMPLATE_ADVERTORIAL]: '/marketing/advertorial',
  [Section.TEMPLATE_SALES]: '/marketing/sales-page',
  [Section.TEMPLATE_EBOOK]: '/marketing/ebook',
  [Section.TEMPLATE_VSL]: '/marketing/vsl',
  [Section.TEMPLATE_WEBINAR]: '/marketing/webinar',
  [Section.TEMPLATE_THANKYOU]: '/marketing/thank-you',

  // Learn App
  [Section.APP_LEARN_GROUPS]: '/learn/groups',
  [Section.APP_LMS_HOME]: '/lms',

  // Community Templates
  [Section.TEMPLATE_COMMUNITY_CAPTURE]: '/community/capture',
  [Section.TEMPLATE_COMMUNITY_ADVERTORIAL]: '/community/advertorial',
  [Section.TEMPLATE_COMMUNITY_SALES]: '/community/sales',
  [Section.TEMPLATE_COMMUNITY_VSL]: '/community/vsl',
  [Section.TEMPLATE_COMMUNITY_EMAILS]: '/community/emails',

  // External
  [Section.EXTERNAL_CHALLENGES]: '/external/challenges',
  [Section.EXTERNAL_PROMPT_OPS]: '/external/prompt-ops',
  [Section.EXTERNAL_VAULT]: '/external/vault',

  // Docs
  [Section.TOKENS]: '/docs/tokens',
  [Section.DOCS]: '/docs/general',
  [Section.AI_MANUAL]: '/docs/ai-manual',

  // PRD Studio
  [Section.STUDIO_PRD_DASHBOARD]: '/prd',
  [Section.STUDIO_PRD_NEW]: '/prd/novo',
  [Section.STUDIO_PRD_EDITOR]: '/prd/:slug',
  [Section.STUDIO_PRD_EXPORT]: '/prd/:slug/exportar',

  // Ops Studio
  [Section.STUDIO_OPS_DB]: '/studio/ops/db',
  [Section.STUDIO_OPS_VIEWS]: '/studio/ops/views',
  [Section.STUDIO_OPS_SCHEMA]: '/studio/ops/schema',
  [Section.STUDIO_OPS_TOOL_STACKS]: '/studio/ops/tool-stacks',
  [Section.STUDIO_OPS_USERS]: '/studio/ops/users',
  [Section.STUDIO_OPS_EMAILS]: '/studio/ops/emails',

  // Books Library
  [Section.APP_BOOKS_LIBRARY]: '/books',
  [Section.APP_BOOKS_MY_LIBRARY]: '/books/my-library',
  [Section.APP_BOOKS_DETAIL]: '/books/:slug',
  [Section.APP_BOOKS_READER]: '/books/:slug/read',
  [Section.APP_BOOKS_RATING]: '/books/:slug/rate',
  [Section.APP_BOOKS_COLLECTIONS]: '/books/collections',
  [Section.APP_BOOKS_COLLECTION]: '/books/collections/:collectionSlug',
  [Section.APP_BOOKS_AUTHOR]: '/books/author/:slug',
  [Section.APP_BOOKS_AUTHORS]: '/books/authors',
  [Section.APP_BOOKS_CATEGORY]: '/books/category/:slug',
  [Section.APP_BOOKS_HIGHLIGHTS]: '/books/:slug/highlights',
  [Section.APP_BOOKS_ADMIN]: '/books/admin',
};

export const getSectionFromPath = (path: string): Section | null => {
  // Direct match
  const entry = Object.entries(SECTION_ROUTES).find(
    ([, route]) => path === route || path === route + '/'
  );
  if (entry) return entry[0] as Section;

  // Handle dynamic routes for Minds (e.g., /minds/alan_nicolas)
  if (path.startsWith('/minds/')) {
    const subPath = path.replace('/minds/', '');
    if (subPath === 'gallery') return Section.APP_MINDS_GALLERY;
    if (subPath === 'matrix') return Section.APP_MINDS_MATRIX;
    if (subPath === 'wizard') return Section.APP_MINDS_WIZARD;
    if (subPath === 'arena') return Section.APP_MINDS_ARENA;
    // Any other /minds/slug is a profile
    return Section.APP_MINDS_PROFILE;
  }

  // Handle /minds root
  if (path === '/minds' || path === '/minds/') {
    return Section.APP_MINDS_GALLERY;
  }

  // Handle Creator routes (both /creator/courses and /creator/cursos)
  if (path.startsWith('/creator/courses') || path.startsWith('/creator/cursos')) {
    return Section.APP_CREATOR_COURSES;
  }

  // Handle Books routes
  if (path.startsWith('/books/')) {
    const subPath = path.replace('/books/', '');
    if (subPath === 'admin') return Section.APP_BOOKS_ADMIN;
    if (subPath === 'authors') return Section.APP_BOOKS_AUTHORS;
    if (subPath === 'my-library') return Section.APP_BOOKS_MY_LIBRARY;
    if (subPath === 'collections') return Section.APP_BOOKS_COLLECTIONS;
    if (subPath.startsWith('collections/')) return Section.APP_BOOKS_COLLECTION;
    if (subPath.startsWith('author/')) return Section.APP_BOOKS_AUTHOR;
    if (subPath.startsWith('category/')) return Section.APP_BOOKS_CATEGORY;
    if (subPath.includes('/read')) return Section.APP_BOOKS_READER;
    if (subPath.includes('/rate')) return Section.APP_BOOKS_RATING;
    if (subPath.includes('/highlights')) return Section.APP_BOOKS_HIGHLIGHTS;
    // Any other /books/slug is a book detail
    return Section.APP_BOOKS_DETAIL;
  }

  // Handle /books root
  if (path === '/books' || path === '/books/') {
    return Section.APP_BOOKS_LIBRARY;
  }

  // Handle LMS routes
  if (path.startsWith('/lms')) {
    return Section.APP_LMS_HOME;
  }

  // Partial match for nested routes (e.g., /prd/my-project)
  // We sort by length descending to match the most specific path first
  const sortedRoutes = Object.entries(SECTION_ROUTES).sort((a, b) => b[1].length - a[1].length);

  for (const [section, route] of sortedRoutes) {
    // Skip dynamic routes (contain :)
    if (route.includes(':')) continue;
    if (path.startsWith(route)) {
      return section as Section;
    }
  }

  return null;
};
