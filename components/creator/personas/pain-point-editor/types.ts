/**
 * Pain Point Editor Types
 *
 * Type definitions for the Pain Point Editor module.
 */

// =============================================================================
// CORE TYPES
// =============================================================================

export interface PainPoint {
  id: string;
  superficial: string;
  deep: string;
  relevance: number;
}

export interface PainPointEditorProps {
  personaId: string;
  personaName?: string;
  initialPainPoints?: PainPoint[];
  onBack: () => void;
  onSave: (painPoints: PainPoint[]) => void;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UsePainPointEditorReturn {
  // State
  painPoints: PainPoint[];
  isAdding: boolean;
  newPainPoint: Omit<PainPoint, 'id'>;
  editingId: string | null;
  isSaving: boolean;
  showAiSuggestion: boolean;

  // Actions
  setIsAdding: (value: boolean) => void;
  setNewPainPoint: React.Dispatch<React.SetStateAction<Omit<PainPoint, 'id'>>>;
  setEditingId: (id: string | null) => void;
  setShowAiSuggestion: (value: boolean) => void;
  handleAddPainPoint: () => void;
  handleUpdatePainPoint: (id: string, updates: Partial<PainPoint>) => void;
  handleDeletePainPoint: (id: string) => void;
  handleSave: () => Promise<void>;
  handleAiSuggest: () => void;
}

// =============================================================================
// ORGANISM PROPS
// =============================================================================

export interface EditorHeaderProps {
  personaName: string;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
  onAiSuggest: () => void;
}

export interface AiSuggestionPanelProps {
  onClose: () => void;
  onAddSuggested: () => void;
}

export interface PainPointsListProps {
  painPoints: PainPoint[];
  editingId: string | null;
  isAdding: boolean;
  onSetEditingId: (id: string | null) => void;
  onUpdatePainPoint: (id: string, updates: Partial<PainPoint>) => void;
  onDeletePainPoint: (id: string) => void;
  onSetIsAdding: (value: boolean) => void;
}

export interface PainPointItemProps {
  painPoint: PainPoint;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<PainPoint>) => void;
  onDelete: () => void;
}

export interface AddPainPointFormProps {
  newPainPoint: Omit<PainPoint, 'id'>;
  onNewPainPointChange: React.Dispatch<React.SetStateAction<Omit<PainPoint, 'id'>>>;
  onAdd: () => void;
  onCancel: () => void;
}

export interface EmptyStateProps {
  onAddFirst: () => void;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type RelevanceLevel = 'low' | 'moderate' | 'critical';

// =============================================================================
// UTILITY FUNCTIONS (Re-exported for convenience)
// =============================================================================

export const generateId = (): string =>
  `pain-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const getRelevanceColor = (value: number): string => {
  if (value >= 75) return 'text-red-400';
  if (value >= 50) return 'text-amber-400';
  return 'text-emerald-400';
};

export const getRelevanceLabel = (value: number): string => {
  if (value >= 75) return 'Critica';
  if (value >= 50) return 'Moderada';
  return 'Baixa';
};
