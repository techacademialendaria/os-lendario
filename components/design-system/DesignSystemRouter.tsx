// @ts-nocheck
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Section } from '../../types';
import { useTheme } from '../../lib/ThemeContext';
import DesignSystemTopbar from './DesignSystemTopbar';

// Lazy load all sections for code splitting
const IdentitySection = React.lazy(() => import('./IdentitySection'));
const ColorSection = React.lazy(() => import('./ColorSection'));
const TypographySection = React.lazy(() => import('./TypographySection'));
const SpacingSection = React.lazy(() => import('./SpacingSection'));
const IconSection = React.lazy(() => import('./IconSection'));
const ListSection = React.lazy(() => import('./ListSection'));
const MotionSection = React.lazy(() => import('./MotionSection'));
const GraphSection = React.lazy(() => import('./GraphSection'));
const ChartsSection = React.lazy(() => import('./ChartsSection'));
const ComponentSection = React.lazy(() => import('./ComponentSection'));
const ButtonSection = React.lazy(() => import('./ButtonSection'));
const AdvancedUISection = React.lazy(() => import('./AdvancedUISection'));
const FeedbackSection = React.lazy(() => import('./FeedbackSection'));
const StatesSection = React.lazy(() => import('./StatesSection'));
const CardsSection = React.lazy(() => import('./CardsSection'));
const FormSection = React.lazy(() => import('./FormSection'));
const TableSection = React.lazy(() => import('./TableSection'));
const TokensSection = React.lazy(() => import('./TokensSection'));
const DocsSection = React.lazy(() => import('./DocsSection'));
const AiManualSection = React.lazy(() => import('./AiManualSection'));
const LegendaryVsMediocreSection = React.lazy(() => import('./LegendaryVsMediocreSection'));
const SidebarLegacy = React.lazy(() => import('./SidebarLegacy'));

// Lazy load shared templates
const CmsTemplate = React.lazy(() => import('../shared/templates/CmsTemplate'));
const KanbanTemplate = React.lazy(() => import('../shared/templates/KanbanTemplate'));
const SaasSettingsTemplate = React.lazy(() => import('../shared/templates/SaasSettingsTemplate'));

interface DesignSystemRouterProps {
  setSection: (s: Section) => void;
  currentTheme: string;
  language: string;
}

// Loading fallback component
const SectionLoading: React.FC = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

// Wrapper for sidebar legacy (needs special handling)
const SidebarLegacyWrapper: React.FC<{
  isDark: boolean;
  currentTheme: string;
  language: string;
}> = ({ isDark, currentTheme, language }) => (
  <div className="relative flex h-[800px] w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-muted/20">
      <div className="rounded-lg border border-primary/50 bg-background/80 p-4 font-bold text-primary shadow-lg backdrop-blur-sm">
        Modo de Visualização: Sidebar Histórica (v4.0)
      </div>
    </div>
    <div className="relative z-0 h-full">
      <Suspense fallback={<SectionLoading />}>
        <SidebarLegacy
          currentSection={Section.CONCEPT}
          setSection={() => {}}
          isDark={isDark}
          toggleTheme={() => {}}
          isCollapsed={false}
          toggleCollapse={() => {}}
          currentThemeName={currentTheme}
          setThemeName={() => {}}
          currentLanguage={language}
          setLanguage={() => {}}
          isMobileOpen={false}
          closeMobileMenu={() => {}}
          className="absolute relative h-full"
        />
      </Suspense>
    </div>
    <div className="flex-1 bg-card p-12">
      <h2 className="text-3xl font-bold text-muted-foreground opacity-20">Conteúdo da Página</h2>
    </div>
  </div>
);

const DesignSystemRouter: React.FC<DesignSystemRouterProps> = ({
  setSection,
  currentTheme,
  language,
}) => {
  const { isDark } = useTheme();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DesignSystemTopbar />
      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:px-12 md:py-8">
        <Suspense fallback={<SectionLoading />}>
          <Routes>
            {/* Foundations */}
            <Route path="concept" element={<ComponentSection />} />
            <Route path="identity" element={<IdentitySection />} />
            <Route path="legendary-vs-mediocre" element={<LegendaryVsMediocreSection />} />
            <Route
              path="colors"
              element={<ColorSection isDark={isDark} currentTheme={currentTheme} />}
            />
            <Route path="typography" element={<TypographySection />} />
            <Route path="spacing" element={<SpacingSection />} />
            <Route path="icons" element={<IconSection />} />
            <Route path="lists" element={<ListSection />} />
            <Route path="motion" element={<MotionSection />} />
            <Route path="graphs" element={<GraphSection />} />
            <Route path="charts" element={<ChartsSection />} />

            {/* Components */}
            <Route path="components" element={<ComponentSection />} />
            <Route path="buttons" element={<ButtonSection />} />
            <Route path="advanced" element={<AdvancedUISection />} />
            <Route path="feedback" element={<FeedbackSection />} />
            <Route path="states" element={<StatesSection />} />
            <Route path="cards" element={<CardsSection />} />
            <Route path="forms" element={<FormSection />} />
            <Route path="tables" element={<TableSection />} />

            {/* Templates */}
            <Route path="templates/cms" element={<CmsTemplate />} />
            <Route path="templates/kanban" element={<KanbanTemplate />} />
            <Route path="templates/settings" element={<SaasSettingsTemplate />} />
            <Route
              path="templates/sidebar-legacy"
              element={
                <SidebarLegacyWrapper
                  isDark={isDark}
                  currentTheme={currentTheme}
                  language={language}
                />
              }
            />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/design/concept" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

// Separate router for /docs/* routes
export const DocsRouter: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DesignSystemTopbar />
      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:px-12 md:py-8">
        <Suspense fallback={<SectionLoading />}>
          <Routes>
            <Route path="tokens" element={<TokensSection />} />
            <Route path="general" element={<DocsSection />} />
            <Route path="ai-manual" element={<AiManualSection />} />
            <Route path="*" element={<Navigate to="/docs/tokens" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default DesignSystemRouter;
