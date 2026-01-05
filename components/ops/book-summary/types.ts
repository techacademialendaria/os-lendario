// ============================================================================
// Book Summary Section Types
// ============================================================================

export type ViewType = 'intro' | 'decisions' | 'overview' | 'database' | 'pipeline' | 'diagrams' | 'glossary';

export interface ViewTab {
  id: ViewType;
  label: string;
  icon: string;
}

// ============================================================================
// View Props
// ============================================================================

export interface IntroViewProps {
  onNavigate?: (view: ViewType) => void;
}

export interface DecisionsViewProps {
  isExpanded: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export interface OverviewViewProps {
  onNavigateToDiagrams: () => void;
}

export interface DatabaseViewProps {
  selectedSchema: string;
  onSchemaChange: (schema: string) => void;
}

export interface PipelineViewProps {
  isExpanded: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export interface DiagramsViewProps {}

export interface GlossaryViewProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// ============================================================================
// Hook State Types
// ============================================================================

export interface GlossaryFilterState {
  glossaryFilter: string;
  setGlossaryFilter: (filter: string) => void;
  selectedGlossaryCategory: string;
  setSelectedGlossaryCategory: (category: string) => void;
}

export interface SchemaSelectionState {
  selectedSchema: string;
  setSelectedSchema: (schema: string) => void;
}

// ============================================================================
// Tab Configuration
// ============================================================================

export const VIEW_TABS: ViewTab[] = [
  { id: 'intro', label: 'Intro', icon: 'book-open' },
  { id: 'decisions', label: 'Decisoes', icon: 'lightbulb' },
  { id: 'overview', label: 'Visao Geral', icon: 'eye' },
  { id: 'database', label: 'Database', icon: 'database' },
  { id: 'pipeline', label: 'Pipeline', icon: 'zap' },
  { id: 'diagrams', label: 'Diagramas', icon: 'chart-histogram' },
  { id: 'glossary', label: 'Glossario', icon: 'graduation-cap' },
];
