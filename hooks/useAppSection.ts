import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from '../types';
import { THEMES, ThemeName, isPRDApp } from '../lib/theme';
import { applyStudioTokens, getStudioTokensForSection } from '../lib/tokens';
import { getSectionFromPath, SECTION_ROUTES } from '../routes';

// Section type checkers
const isSalesApp = (section: Section) =>
  section.startsWith('template_sales') || section.startsWith('studio_sales');

const isMindsApp = (section: Section) =>
  section.startsWith('app_minds');

const isCreatorApp = (section: Section) =>
  section.startsWith('app_creator');

const isLearnApp = (section: Section) =>
  section.startsWith('app_learn');

const isLmsApp = (section: Section) =>
  section.startsWith('app_lms');

const isBooksApp = (section: Section) =>
  section.startsWith('app_books');

const isExternal = (section: Section) =>
  section === Section.EXTERNAL_CHALLENGES ||
  section === Section.EXTERNAL_PROMPT_OPS ||
  section === Section.EXTERNAL_VAULT;

const isOpsApp = (section: Section) =>
  section.startsWith('studio_ops');

const isDesignSystemApp = (section: Section) => {
  const dsRoutes = [
    Section.CONCEPT, Section.IDENTITY, Section.LEGENDARY_VS_MEDIOCRE,
    Section.COLORS, Section.TYPOGRAPHY, Section.SPACING, Section.ICONS, Section.ICONS_COMPARE,
    Section.LISTS, Section.MOTION, Section.GRAPHS, Section.CHARTS,
    Section.COMPONENTS, Section.BUTTONS, Section.ADVANCED, Section.FEEDBACK,
    Section.STATES, Section.CARDS, Section.FORMS, Section.TABLES,
    Section.TEMPLATE_APP_CMS, Section.TEMPLATE_APP_KANBAN,
    Section.TEMPLATE_APP_SETTINGS, Section.TEMPLATE_SIDEBAR_LEGACY,
    Section.TOKENS, Section.DOCS, Section.AI_MANUAL
  ];
  return dsRoutes.includes(section);
};

interface UseAppSectionOptions {
  defaultSection?: Section;
  defaultTheme?: ThemeName;
}

export function useAppSection(options: UseAppSectionOptions = {}) {
  const {
    defaultSection = Section.TEMPLATE_SALES_DASHBOARD,
    defaultTheme = 'Gold'
  } = options;

  const location = useLocation();
  const navigate = useNavigate();

  // Initialize from URL to prevent route mismatch on first render
  const [currentSection, setCurrentSection] = useState<Section>(() =>
    getSectionFromPath(location.pathname) || defaultSection
  );

  const [isDark, setIsDark] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);

  // Sync URL -> State (Initial Load + Back/Forward)
  useEffect(() => {
    const section = getSectionFromPath(location.pathname);
    if (section && section !== currentSection) {
      setCurrentSection(section);
    }
  }, [location.pathname, currentSection]);

  // Navigate to route when section changes via Sidebar
  const handleSetSection = useCallback((section: Section) => {
    if (SECTION_ROUTES[section]) {
      navigate(SECTION_ROUTES[section]);
    } else {
      setCurrentSection(section);
    }
  }, [navigate]);

  // Get effective theme based on current section
  const getEffectiveTheme = useCallback((section: Section): ThemeName => {
    // PRIORITY: Check URL path FIRST for special routes
    // This must come before section checks because unmatched routes default to sales template
    if (location.pathname.startsWith('/auth/')) return 'Gold';
    if (location.pathname.startsWith('/design/')) return 'Gold';
    if (location.pathname.startsWith('/books/')) return 'Gold';

    // Section-based theme selection
    if (isSalesApp(section)) return 'SalesRed';
    if (isMindsApp(section)) return 'Teal';
    if (isCreatorApp(section)) return 'Creator';
    if (isPRDApp(section)) return 'PRDStudio';
    if (isDesignSystemApp(section)) return 'Gold';
    return currentTheme;
  }, [currentTheme, location.pathname]);

  // Apply Theme & Dark Mode
  useEffect(() => {
    const root = document.documentElement;

    // Dark Mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply Theme Variables
    const effectiveThemeName = getEffectiveTheme(currentSection);
    const themeConfig = THEMES[effectiveThemeName];

    if (themeConfig) {
      root.style.setProperty('--primary', themeConfig.primary);
      root.style.setProperty('--primary-light', themeConfig.light);
    }

    // Apply Full Studio Palette (CSS Variables)
    const studioPalette = getStudioTokensForSection(currentSection);
    if (studioPalette) {
      applyStudioTokens(studioPalette);
    }
  }, [isDark, currentTheme, currentSection, getEffectiveTheme]);

  // Check if current section requires full-width layout
  const isFullWidthPage = useCallback((section: Section) =>
    isSalesApp(section) ||
    isMindsApp(section) ||
    isCreatorApp(section) ||
    isLearnApp(section) ||
    isLmsApp(section) ||
    isBooksApp(section) ||
    isPRDApp(section) ||
    isExternal(section) ||
    isDesignSystemApp(section) ||
    isOpsApp(section),
  []);

  return {
    // State
    currentSection,
    isDark,
    currentTheme,

    // Setters
    setSection: handleSetSection,
    setIsDark,
    setCurrentTheme,
    toggleDark: () => setIsDark(!isDark),

    // Computed
    isFullWidthPage: isFullWidthPage(currentSection),
    effectiveTheme: getEffectiveTheme(currentSection),

    // Section type checkers
    isSalesApp: isSalesApp(currentSection),
    isMindsApp: isMindsApp(currentSection),
    isCreatorApp: isCreatorApp(currentSection),
    isLearnApp: isLearnApp(currentSection),
    isLmsApp: isLmsApp(currentSection),
    isBooksApp: isBooksApp(currentSection),
    isPRDApp: isPRDApp(currentSection),
    isExternal: isExternal(currentSection),
    isOpsApp: isOpsApp(currentSection),
    isDesignSystemApp: isDesignSystemApp(currentSection),
  };
}

export default useAppSection;
