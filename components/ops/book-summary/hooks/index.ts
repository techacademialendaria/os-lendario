// Re-export shared hooks
export { useTabs, useExpandable } from '../../../shared/hooks';
export type { UseTabsReturn, UseExpandableReturn } from '../../../shared/hooks';

// Domain-specific hooks
export { useSchemaSelection } from './useSchemaSelection';
export { useGlossaryFilters } from './useGlossaryFilters';
