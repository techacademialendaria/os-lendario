import React, { Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Section } from '../types';

// Lazy load all templates for better performance
const DesignSystemRouter = React.lazy(() => import('./design-system/DesignSystemRouter').then(m => ({ default: m.default })));
const DocsRouter = React.lazy(() => import('./design-system/DesignSystemRouter').then(m => ({ default: m.DocsRouter })));
const PRDRouter = React.lazy(() => import('./prd/PRDRouter'));
const CoursesRouter = React.lazy(() => import('./creator/CoursesRouter'));
const LmsRouter = React.lazy(() => import('./lms/LmsRouter'));

// Creator Templates
const PersonasTemplate = React.lazy(() => import('./creator/templates/PersonasTemplate'));
const FrameworksTemplate = React.lazy(() => import('./creator/templates/FrameworksTemplate'));
const CreatorTopbar = React.lazy(() => import('./creator/CreatorTopbar'));
const CmsTemplate = React.lazy(() => import('./shared/templates/CmsTemplate'));
const SaasSettingsTemplate = React.lazy(() => import('./shared/templates/SaasSettingsTemplate'));

// Sales Templates
const SalesDashboardTemplate = React.lazy(() => import('./sales/templates/SalesDashboardTemplate'));
const SalesCallsTemplate = React.lazy(() => import('./sales/templates/SalesCallsTemplate'));
const SalesCallDetailsTemplate = React.lazy(() => import('./sales/templates/SalesCallDetailsTemplate'));
const SalesMarketingTemplate = React.lazy(() => import('./sales/templates/SalesMarketingTemplate'));
const SalesProductTemplate = React.lazy(() => import('./sales/templates/SalesProductTemplate'));
const SalesSettingsTemplate = React.lazy(() => import('./sales/templates/SalesSettingsTemplate'));
const SalesObjectionsTemplate = React.lazy(() => import('./sales/templates/SalesObjectionsTemplate'));

// Minds Templates
const MindsGalleryTemplate = React.lazy(() => import('./minds/templates/MindsGalleryTemplate'));
const MindProfileTemplate = React.lazy(() => import('./minds/templates/MindProfileTemplate'));
const MindComparisonTemplate = React.lazy(() => import('./minds/templates/MindComparisonTemplate'));
const ArtifactEditorTemplate = React.lazy(() => import('./minds/templates/ArtifactEditorTemplate'));
const ArenaTemplate = React.lazy(() => import('./minds/templates/ArenaTemplate'));

// Marketing Templates
const MarketingTemplatesPage = React.lazy(() => import('./marketing/templates/MarketingTemplatesPage'));
const LandingPageTemplate = React.lazy(() => import('./marketing/templates/LandingPageTemplate'));
const AdvertorialTemplate = React.lazy(() => import('./marketing/templates/AdvertorialTemplate'));
const EbookTemplate = React.lazy(() => import('./marketing/templates/EbookTemplate'));
const VSLTemplate = React.lazy(() => import('./marketing/templates/VSLTemplate'));
const WebinarTemplate = React.lazy(() => import('./marketing/templates/WebinarTemplate'));
const ThankYouTemplate = React.lazy(() => import('./marketing/templates/ThankYouTemplate'));
const SalesPageTemplate = React.lazy(() => import('./sales/templates/SalesPageTemplate'));

// Community Templates
const CommunityTemplatesPage = React.lazy(() => import('./marketing/templates/CommunityTemplatesPage'));
const CommunityCaptureTemplate = React.lazy(() => import('./marketing/templates/CommunityCaptureTemplate'));
const CommunityAdvertorialTemplate = React.lazy(() => import('./marketing/templates/CommunityAdvertorialTemplate'));
const CommunitySalesTemplate = React.lazy(() => import('./marketing/templates/CommunitySalesTemplate'));
const CommunityVSLTemplate = React.lazy(() => import('./marketing/templates/CommunityVSLTemplate'));

// Ops Templates
const OpsDBTemplate = React.lazy(() => import('./ops/templates/OpsDBTemplate'));
const GroupsTemplate = React.lazy(() => import('./ops/templates/GroupsTemplate'));
const OpsViewsTemplate = React.lazy(() => import('./ops/templates/OpsViewsTemplate'));
const OpsSchemaTemplate = React.lazy(() => import('./ops/templates/OpsSchemaTemplate'));

// Books Templates
const BooksLibraryTemplate = React.lazy(() => import('./books/templates/BooksLibraryTemplate'));
const BookDetailTemplate = React.lazy(() => import('./books/templates/BookDetailTemplate'));
const BookReaderTemplate = React.lazy(() => import('./books/templates/BookReaderTemplate'));
const BookCollectionTemplate = React.lazy(() => import('./books/templates/BookCollectionTemplate'));

// Loading fallback
const RouteLoader: React.FC = () => (
  <div className="flex items-center justify-center h-full min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

// External iframe wrapper
const ExternalFrame: React.FC<{ src: string; title: string }> = ({ src, title }) => (
  <iframe src={src} className="w-full h-full border-0" title={title} />
);

// Creator layout wrapper
const CreatorLayout: React.FC<{
  section: Section;
  setSection: (s: Section) => void;
  children: React.ReactNode;
}> = ({ section, setSection, children }) => (
  <div className="flex flex-col min-h-screen bg-background font-sans">
    <Suspense fallback={<RouteLoader />}>
      <CreatorTopbar currentSection={section} setSection={setSection} />
    </Suspense>
    {children}
  </div>
);

interface AppRoutesProps {
  setSection: (section: Section) => void;
  currentTheme: string;
  language: string;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  setSidebarHidden?: (hidden: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ setSection, currentTheme, language, setSidebarCollapsed, setSidebarHidden }) => {
  const navigate = useNavigate();

  const handleSelectMind = (slug: string) => {
    navigate(`/minds/${slug}`);
  };

  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Design System */}
        <Route path="/design/*" element={
          <DesignSystemRouter
            setSection={setSection}
            currentTheme={currentTheme}
            language={language}
          />
        } />

        {/* Docs */}
        <Route path="/docs/*" element={<DocsRouter />} />

        {/* PRD Studio */}
        <Route path="/prd/*" element={<PRDRouter setSection={setSection} />} />

        {/* Minds App */}
        <Route path="/minds" element={<MindsGalleryTemplate setSection={setSection} onSelectMind={handleSelectMind} />} />
        <Route path="/minds/gallery" element={<MindsGalleryTemplate setSection={setSection} onSelectMind={handleSelectMind} />} />
        <Route path="/minds/matrix" element={<MindComparisonTemplate setSection={setSection} />} />
        <Route path="/minds/arena" element={<ArenaTemplate setSection={setSection} />} />
        <Route path="/minds/wizard" element={<div className="p-12 text-center text-muted-foreground">Wizard de Criação (Em Desenvolvimento)</div>} />
        <Route path="/minds/:mindSlug/artifacts/new" element={<ArtifactEditorTemplate setSection={setSection} />} />
        <Route path="/minds/:mindSlug/artifacts/:artifactId" element={<ArtifactEditorTemplate setSection={setSection} />} />
        <Route path="/minds/:mindSlug" element={<MindProfileTemplate setSection={setSection} />} />

        {/* Creator App */}
        <Route path="/creator/courses/*" element={<CoursesRouter setSection={setSection} />} />
        <Route path="/creator/cursos/*" element={<CoursesRouter setSection={setSection} />} />
        <Route path="/creator/content" element={
          <CreatorLayout section={Section.APP_CREATOR_CONTENT} setSection={setSection}>
            <div className="p-6">
              <CmsTemplate />
            </div>
          </CreatorLayout>
        } />
        <Route path="/creator/personas" element={<PersonasTemplate setSection={setSection} />} />
        <Route path="/creator/frameworks" element={<FrameworksTemplate setSection={setSection} />} />
        <Route path="/creator/performance" element={
          <CreatorLayout section={Section.APP_CREATOR_PERFORMANCE} setSection={setSection}>
            <div className="p-12 text-center text-muted-foreground">Analytics & Performance (Em Desenvolvimento)</div>
          </CreatorLayout>
        } />
        <Route path="/creator/settings" element={
          <CreatorLayout section={Section.APP_CREATOR_SETTINGS} setSection={setSection}>
            <div className="p-6 max-w-4xl mx-auto w-full">
              <SaasSettingsTemplate />
            </div>
          </CreatorLayout>
        } />

        {/* Sales App */}
        <Route path="/sales/dashboard" element={<SalesDashboardTemplate setSection={setSection} />} />
        <Route path="/sales/calls" element={<SalesCallsTemplate setSection={setSection} />} />
        <Route path="/sales/calls/details" element={<SalesCallDetailsTemplate setSection={setSection} />} />
        <Route path="/sales/marketing" element={<SalesMarketingTemplate setSection={setSection} />} />
        <Route path="/sales/product" element={<SalesProductTemplate setSection={setSection} />} />
        <Route path="/sales/settings" element={<SalesSettingsTemplate setSection={setSection} />} />
        <Route path="/sales/objections" element={<SalesObjectionsTemplate setSection={setSection} />} />

        {/* Learn App */}
        <Route path="/learn/groups" element={<GroupsTemplate setSection={setSection} />} />

        {/* LMS (Student View) */}
        <Route path="/lms/*" element={<LmsRouter />} />

        {/* Marketing Templates */}
        <Route path="/marketing/guide" element={<MarketingTemplatesPage />} />
        <Route path="/marketing/landing" element={<LandingPageTemplate />} />
        <Route path="/marketing/advertorial" element={<AdvertorialTemplate />} />
        <Route path="/marketing/sales-page" element={<SalesPageTemplate />} />
        <Route path="/marketing/ebook" element={<EbookTemplate />} />
        <Route path="/marketing/vsl" element={<VSLTemplate />} />
        <Route path="/marketing/webinar" element={<WebinarTemplate />} />
        <Route path="/marketing/thank-you" element={<ThankYouTemplate />} />

        {/* Community Templates */}
        <Route path="/community/capture" element={<CommunityCaptureTemplate />} />
        <Route path="/community/advertorial" element={<CommunityAdvertorialTemplate />} />
        <Route path="/community/sales" element={<CommunitySalesTemplate />} />
        <Route path="/community/vsl" element={<CommunityVSLTemplate />} />
        <Route path="/community/emails" element={<CommunityTemplatesPage />} />

        {/* External Iframes */}
        <Route path="/external/challenges" element={<ExternalFrame src="https://halloween.lendario.ai/" title="Desafios" />} />
        <Route path="/external/prompt-ops" element={<ExternalFrame src="https://prompts.academialendaria.ai/" title="Prompt Ops" />} />
        <Route path="/external/vault" element={<ExternalFrame src="https://vault.academialendaria.com.br/" title="Vault" />} />

        {/* Ops Studio */}
        <Route path="/studio/ops/db" element={<OpsDBTemplate setSection={setSection} />} />
        <Route path="/studio/ops/views" element={<OpsViewsTemplate setSection={setSection} />} />
        <Route path="/studio/ops/schema" element={<OpsSchemaTemplate setSection={setSection} />} />

        {/* Books Library */}
        <Route path="/books" element={<BooksLibraryTemplate setSection={setSection} onSelectBook={(slug) => navigate(`/books/${slug}`)} />} />
        <Route path="/books/collections/:collectionSlug" element={<BookCollectionTemplate setSection={setSection} />} />
        <Route path="/books/:bookSlug" element={<BookDetailTemplate setSection={setSection} />} />
        <Route path="/books/:bookSlug/read" element={<BookReaderTemplate setSection={setSection} setSidebarCollapsed={setSidebarCollapsed} setSidebarHidden={setSidebarHidden} />} />

        {/* Default / 404 */}
        <Route path="/" element={<SalesDashboardTemplate setSection={setSection} />} />
        <Route path="*" element={
          <div className="p-12 text-center text-muted-foreground">
            Página não encontrada
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
