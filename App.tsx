
import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/shared/layout/Sidebar';
import { Section, Language } from './types';
import { THEMES, ThemeName, isPRDApp } from './lib/theme';
import { Icon } from './components/ui/icon';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { cn } from './lib/utils';

// Design System Router (lazy loads 22 sections internally)
import DesignSystemRouter, { DocsRouter } from './components/design-system/DesignSystemRouter';

// Shared Templates (only used outside design system)
import SaasSettingsTemplate from './components/shared/templates/SaasSettingsTemplate';
const CmsTemplate = React.lazy(() => import('./components/shared/templates/CmsTemplate'));

// Creator Templates
import CoursesRouter from './components/creator/CoursesRouter';
import PersonasTemplate from './components/creator/templates/PersonasTemplate';
import FrameworksTemplate from './components/creator/templates/FrameworksTemplate';
import CreatorTopbar from './components/creator/CreatorTopbar';

// PRD Studio
import PRDRouter from './components/prd/PRDRouter';

// Sales Templates
import SalesDashboardTemplate from './components/sales/templates/SalesDashboardTemplate';
import SalesCallsTemplate from './components/sales/templates/SalesCallsTemplate';
import SalesCallDetailsTemplate from './components/sales/templates/SalesCallDetailsTemplate';
import SalesMarketingTemplate from './components/sales/templates/SalesMarketingTemplate';
import SalesProductTemplate from './components/sales/templates/SalesProductTemplate';
import SalesSettingsTemplate from './components/sales/templates/SalesSettingsTemplate';
import SalesObjectionsTemplate from './components/sales/templates/SalesObjectionsTemplate';

// Minds Templates (New)
import MindsGalleryTemplate from './components/minds/templates/MindsGalleryTemplate';
import MindProfileTemplate from './components/minds/templates/MindProfileTemplate';
import MindComparisonTemplate from './components/minds/templates/MindComparisonTemplate';
import ArtifactEditorTemplate from './components/minds/templates/ArtifactEditorTemplate';
import ArenaTemplate from './components/minds/templates/ArenaTemplate';

// Marketing Templates
import MarketingTemplatesPage from './components/marketing/templates/MarketingTemplatesPage';
import LandingPageTemplate from './components/marketing/templates/LandingPageTemplate';
import AdvertorialTemplate from './components/marketing/templates/AdvertorialTemplate';
import EbookTemplate from './components/marketing/templates/EbookTemplate';
import VSLTemplate from './components/marketing/templates/VSLTemplate';
import WebinarTemplate from './components/marketing/templates/WebinarTemplate';
import ThankYouTemplate from './components/marketing/templates/ThankYouTemplate';
import CommunityTemplatesPage from './components/marketing/templates/CommunityTemplatesPage';
import CommunityCaptureTemplate from './components/marketing/templates/CommunityCaptureTemplate';
import CommunityAdvertorialTemplate from './components/marketing/templates/CommunityAdvertorialTemplate';
import CommunitySalesTemplate from './components/marketing/templates/CommunitySalesTemplate';
import CommunityVSLTemplate from './components/marketing/templates/CommunityVSLTemplate';
import SalesPageTemplate from './components/sales/templates/SalesPageTemplate';

import { SECTION_ROUTES, getSectionFromPath } from './routes';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<Section>(Section.TEMPLATE_SALES_DASHBOARD);
  const [isDark, setIsDark] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('Gold');
  const [language, setLanguage] = useState<Language>('pt');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMindSlug, setSelectedMindSlug] = useState<string | null>(null);

  // Sync URL -> State (Initial Load + Back/Forward)
  useEffect(() => {
    const section = getSectionFromPath(location.pathname);
    if (section && section !== currentSection) {
      setCurrentSection(section);
    }
  }, [location.pathname]);

  // Navigate to route when section changes via Sidebar
  const handleSetSection = (section: Section) => {
    // If it's a section with a defined route, navigate there
    if (SECTION_ROUTES[section]) {
      navigate(SECTION_ROUTES[section]);
    } else {
      // Fallback or internal state only (should replace all eventually)
      setCurrentSection(section);
    }
  };

  // Helper to check if current section is part of Sales Intelligence
  const isSalesApp = (section: Section) => {
    return section.startsWith('template_sales') || section.startsWith('studio_sales');
  };

  // Helper to check if current section is part of Synthetic Minds
  const isMindsApp = (section: Section) => {
    return section.startsWith('app_minds');
  };

  // Helper to check if current section is part of Course Creator
  const isCreatorApp = (section: Section) => {
    return section.startsWith('app_creator');
  };

  // Helper to check if it's an external iframe section
  const isExternal = (section: Section) => {
    return section === Section.EXTERNAL_CHALLENGES || section === Section.EXTERNAL_PROMPT_OPS || section === Section.EXTERNAL_VAULT;
  };

  // Apply Theme & Dark Mode
  useEffect(() => {
    const root = document.documentElement;

    // 1. Dark Mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 2. Apply Theme Variables
    // Sales Intelligence = SalesRed
    // Synthetic Minds = Teal
    // Course Creator = Indigo
    let effectiveThemeName: ThemeName = currentTheme;

    if (isSalesApp(currentSection)) {
      effectiveThemeName = 'SalesRed';
    } else if (isMindsApp(currentSection)) {
      effectiveThemeName = 'Teal';
    } else if (isCreatorApp(currentSection)) {
      effectiveThemeName = 'Indigo';
    } else if (isPRDApp(currentSection)) {
      effectiveThemeName = 'PRDStudio';
    }

    const themeConfig = THEMES[effectiveThemeName];

    if (themeConfig) {
      root.style.setProperty('--primary', themeConfig.primary);
      root.style.setProperty('--primary-light', themeConfig.light);
      // Optional: adjust foreground if needed based on theme brightness, 
      // but usually Design System keeps foreground consistent.
    }

  }, [isDark, currentTheme, currentSection]);

  // Helper to check if current section is part of Design System
  const isDesignSystemApp = (section: Section) => {
    const dsRoutes = [
      Section.CONCEPT, Section.IDENTITY, Section.LEGENDARY_VS_MEDIOCRE,
      Section.COLORS, Section.TYPOGRAPHY, Section.SPACING, Section.ICONS,
      Section.LISTS, Section.MOTION, Section.GRAPHS, Section.CHARTS,
      Section.COMPONENTS, Section.BUTTONS, Section.ADVANCED, Section.FEEDBACK,
      Section.STATES, Section.CARDS, Section.FORMS, Section.TABLES,
      Section.TEMPLATE_APP_CMS, Section.TEMPLATE_APP_KANBAN,
      Section.TEMPLATE_APP_SETTINGS, Section.TEMPLATE_SIDEBAR_LEGACY,
      Section.TOKENS, Section.DOCS, Section.AI_MANUAL
    ];
    return dsRoutes.includes(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      // External Iframes
      case Section.EXTERNAL_CHALLENGES:
        return <iframe src="https://halloween.lendario.ai/" className="w-full h-full border-0" title="Desafios" />;
      case Section.EXTERNAL_PROMPT_OPS:
        return <iframe src="https://prompts.academialendaria.ai/" className="w-full h-full border-0" title="Prompt Ops" />;
      case Section.EXTERNAL_VAULT:
        return <iframe src="https://vault.academialendaria.com.br/" className="w-full h-full border-0" title="Vault" />;

      // Design System (all sections handled by router)
      case Section.CONCEPT:
      case Section.IDENTITY:
      case Section.LEGENDARY_VS_MEDIOCRE:
      case Section.COLORS:
      case Section.TYPOGRAPHY:
      case Section.SPACING:
      case Section.ICONS:
      case Section.LISTS:
      case Section.MOTION:
      case Section.GRAPHS:
      case Section.CHARTS:
      case Section.COMPONENTS:
      case Section.BUTTONS:
      case Section.ADVANCED:
      case Section.FEEDBACK:
      case Section.STATES:
      case Section.CARDS:
      case Section.FORMS:
      case Section.TABLES:
      case Section.TEMPLATE_APP_CMS:
      case Section.TEMPLATE_APP_KANBAN:
      case Section.TEMPLATE_APP_SETTINGS:
      case Section.TEMPLATE_SIDEBAR_LEGACY:
        return (
          <Routes>
            <Route path="/design/*" element={
              <DesignSystemRouter
                setSection={handleSetSection}
                isDark={isDark}
                currentTheme={currentTheme}
                language={language}
              />
            } />
          </Routes>
        );

      // Docs (also part of Design System)
      case Section.TOKENS:
      case Section.DOCS:
      case Section.AI_MANUAL:
        return (
          <Routes>
            <Route path="/docs/*" element={<DocsRouter />} />
          </Routes>
        );

      // Sales App Templates
      case Section.TEMPLATE_SALES_DASHBOARD:
        return <SalesDashboardTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_CALLS:
        return <SalesCallsTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_CALL_DETAILS:
        return <SalesCallDetailsTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_MARKETING:
        return <SalesMarketingTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_PRODUCT:
        return <SalesProductTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_SETTINGS:
        return <SalesSettingsTemplate setSection={handleSetSection} />;
      case Section.TEMPLATE_SALES_OBJECTIONS:
        return <SalesObjectionsTemplate setSection={handleSetSection} />;

      // Minds App Templates
      case Section.APP_MINDS_GALLERY:
      case Section.APP_MINDS_PROFILE:
      case Section.APP_MINDS_MATRIX:
      case Section.APP_MINDS_WIZARD:
      case Section.APP_MINDS_ARENA:
        return (
          <Routes>
            <Route path="/minds/gallery" element={<MindsGalleryTemplate setSection={handleSetSection} onSelectMind={(slug) => { setSelectedMindSlug(slug); navigate(`/minds/${slug}`); }} />} />
            <Route path="/minds/matrix" element={<MindComparisonTemplate setSection={handleSetSection} />} />
            <Route path="/minds/arena" element={<ArenaTemplate setSection={handleSetSection} />} />
            <Route path="/minds/wizard" element={<div className="p-12 text-center text-muted-foreground">Wizard de Criacao (Em Desenvolvimento)</div>} />
            <Route path="/minds/:mindSlug/artifacts/new" element={<ArtifactEditorTemplate setSection={handleSetSection} />} />
            <Route path="/minds/:mindSlug/artifacts/:artifactId" element={<ArtifactEditorTemplate setSection={handleSetSection} />} />
            <Route path="/minds/:mindSlug" element={<MindProfileTemplate setSection={handleSetSection} />} />
            <Route path="/minds" element={<MindsGalleryTemplate setSection={handleSetSection} onSelectMind={(slug) => { setSelectedMindSlug(slug); navigate(`/minds/${slug}`); }} />} />
          </Routes>
        );

      // Course Creator Templates
      case Section.APP_CREATOR_COURSES:
        return (
          <Routes>
            <Route path="/creator/courses/*" element={<CoursesRouter setSection={handleSetSection} />} />
            <Route path="/creator/cursos/*" element={<CoursesRouter setSection={handleSetSection} />} />
          </Routes>
        );
      case Section.APP_CREATOR_CONTENT:
        return (
          <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_CONTENT} setSection={handleSetSection} />
            <div className="p-6">
              <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Carregando...</div>}>
                <CmsTemplate />
              </Suspense>
            </div>
          </div>
        );
      case Section.APP_CREATOR_PERSONAS:
        return <PersonasTemplate setSection={handleSetSection} />;
      case Section.APP_CREATOR_FRAMEWORKS:
        return <FrameworksTemplate setSection={handleSetSection} />;
      case Section.APP_CREATOR_PERFORMANCE:
        return (
          <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_PERFORMANCE} setSection={handleSetSection} />
            <div className="p-12 text-center text-muted-foreground">Analytics & Performance (Em Desenvolvimento)</div>
          </div>
        );
      case Section.APP_CREATOR_SETTINGS:
        return (
          <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_SETTINGS} setSection={handleSetSection} />
            <div className="p-6 max-w-4xl mx-auto w-full">
              <SaasSettingsTemplate />
            </div>
          </div>
        );

      // PRD Studio
      case Section.STUDIO_PRD_DASHBOARD:
      case Section.STUDIO_PRD_NEW:
      case Section.STUDIO_PRD_EDITOR:
      case Section.STUDIO_PRD_EXPORT:
        return (
          <Routes>
            <Route path="/prd/*" element={<PRDRouter setSection={handleSetSection} />} />
          </Routes>
        );

      // Marketing Templates
      case Section.MARKETING_GUIDE:
        return <MarketingTemplatesPage />;
      case Section.TEMPLATE_LANDING:
        return <LandingPageTemplate />;
      case Section.TEMPLATE_ADVERTORIAL:
        return <AdvertorialTemplate />;
      case Section.TEMPLATE_SALES:
        return <SalesPageTemplate />;
      case Section.TEMPLATE_EBOOK:
        return <EbookTemplate />;
      case Section.TEMPLATE_VSL:
        return <VSLTemplate />;
      case Section.TEMPLATE_WEBINAR:
        return <WebinarTemplate />;
      case Section.TEMPLATE_THANKYOU:
        return <ThankYouTemplate />;

      // Community Templates
      case Section.TEMPLATE_COMMUNITY_CAPTURE:
        return <CommunityCaptureTemplate />;
      case Section.TEMPLATE_COMMUNITY_ADVERTORIAL:
        return <CommunityAdvertorialTemplate />;
      case Section.TEMPLATE_COMMUNITY_SALES:
        return <CommunitySalesTemplate />;
      case Section.TEMPLATE_COMMUNITY_VSL:
        return <CommunityVSLTemplate />;
      case Section.TEMPLATE_COMMUNITY_EMAILS:
        return <CommunityTemplatesPage />;

      default:
        return <div className="p-12 text-center text-muted-foreground">Em desenvolvimento: {currentSection}</div>;
    }
  };

  const isFullWidthPage = isSalesApp(currentSection) || isMindsApp(currentSection) || isCreatorApp(currentSection) || isPRDApp(currentSection) || isExternal(currentSection) || isDesignSystemApp(currentSection);

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Lendár[IA]</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-muted-foreground">
            <Icon name="menu-burger" size="size-5" />
          </button>
        </div>

        <Sidebar
          currentSection={currentSection}
          setSection={handleSetSection}
          isDark={isDark}
          toggleTheme={() => setIsDark(!isDark)}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentThemeName={currentTheme}
          setThemeName={setCurrentTheme}
          currentLanguage={language}
          setLanguage={setLanguage}
          isMobileOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out h-screen overflow-y-auto custom-scrollbar",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {/* Apply padding only if NOT a sales/minds/creator template or external iframe */}
          <div className={cn(
            isFullWidthPage ? "h-full p-0 w-full" : "max-w-[1920px] mx-auto p-6 md:p-12"
          )}>
            {renderContent()}
          </div>
        </main>

        <Toaster />
      </div>
    </TooltipProvider>
  );
};

export default App;