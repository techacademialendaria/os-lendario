// MentalModelsSection Types and Interfaces

export interface MentalModelsSectionProps {
  className?: string;
}

export interface CategoryExpansionState {
  expandedCategory: string | null;
  toggleCategory: (category: string) => void;
}

export interface ModelExpansionState {
  expandedModel: string | null;
  toggleModel: (model: string) => void;
}

export interface CategoriesViewProps {
  expandedCategory: string | null;
  expandedModel: string | null;
  onToggleCategory: (category: string) => void;
  onToggleModel: (model: string) => void;
}
