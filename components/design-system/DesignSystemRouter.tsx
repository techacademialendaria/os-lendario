// @ts-nocheck
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Section } from '../../types';
import { useTheme } from '../../lib/ThemeContext';
import DesignSystemTopbar from './DesignSystemTopbar';

// Lazy load all sections for code splitting
const IdentitySection = React.lazy(() => import('./identity-section').then(m => ({ default: m.IdentitySection })));
const ColorSection = React.lazy(() => import('./color-section').then(m => ({ default: m.ColorSection })));
const TypographySection = React.lazy(() => import('./TypographySection'));
const SpacingSection = React.lazy(() => import('./SpacingSection'));
const IconSection = React.lazy(() => import('./icon-section').then(m => ({ default: m.IconSection })));
const ListSection = React.lazy(() => import('./list-section').then(m => ({ default: m.ListSection })));
const MotionSection = React.lazy(() => import('./MotionSection'));
const GraphSection = React.lazy(() => import('./GraphSection'));
const ChartsSection = React.lazy(() => import('./ChartsSection'));
const ComponentSection = React.lazy(() => import('./component-section').then(m => ({ default: m.ComponentSection })));
const ButtonSection = React.lazy(() => import('./ButtonSection'));
const AdvancedUISection = React.lazy(() => import('./AdvancedUISection'));
const FeedbackSection = React.lazy(() => import('./feedback-section').then(m => ({ default: m.FeedbackSection })));
const StatesSection = React.lazy(() => import('./StatesSection'));
const CardsSection = React.lazy(() => import('./cards-section').then(m => ({ default: m.CardsSection })));
const FormSection = React.lazy(() => import('./form-section').then(m => ({ default: m.FormSection })));
const TableSection = React.lazy(() => import('./tables').then(m => ({ default: m.TableSection })));
const TokensSection = React.lazy(() => import('./tokens').then(m => ({ default: m.TokensSection })));
const DocsSection = React.lazy(() => import('./DocsSection'));
const AiManualSection = React.lazy(() => import('./AiManualSection'));
const LegendaryVsMediocreSection = React.lazy(() => import('./LegendaryVsMediocreSection'));
const LendarioLuxeSection = React.lazy(() => import('./lendario-luxe').then(m => ({ default: m.LendarioLuxeSection })));

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
            <Route path="lendario-luxe" element={<LendarioLuxeSection />} />
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
