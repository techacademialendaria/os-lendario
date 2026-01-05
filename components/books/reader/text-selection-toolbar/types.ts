import type { HighlightColor } from '../HighlightActions';

// ============================================================================
// Position Types
// ============================================================================

export interface Position {
  x: number;
  y: number;
}

// ============================================================================
// Action Mode
// ============================================================================

export type ActionMode = 'toolbar' | 'note' | 'colorPicker';

// ============================================================================
// State Types
// ============================================================================

export interface SelectionState {
  selectedText: string;
  position: Position;
  isVisible: boolean;
}

export interface UIState {
  mode: ActionMode;
  noteText: string;
  isSaving: boolean;
  selectedColor: HighlightColor;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseTextSelectionResult {
  state: SelectionState;
  savedRangeRef: React.MutableRefObject<Range | null>;
  reset: () => void;
}

export interface UseHighlightMarkResult {
  highlightMarkRef: React.MutableRefObject<HTMLElement | null>;
  createMark: (range: Range, color: HighlightColor) => boolean;
  convertToSaved: (highlightId: string) => void;
  removeMark: () => void;
}

export interface UseToolbarActionsOptions {
  selectedText: string;
  savedRangeRef: React.MutableRefObject<Range | null>;
  highlightMarkRef: React.MutableRefObject<HTMLElement | null>;
  selectedColor: HighlightColor;
  noteText: string;
  mode: ActionMode;
  onHighlight: (text: string, note?: string) => Promise<string | null>;
  onCopy?: (text: string) => void;
  createMark: (range: Range, color: HighlightColor) => boolean;
  convertToSaved: (highlightId: string) => void;
  removeMark: () => void;
  resetSelection: () => void;
  setMode: (mode: ActionMode) => void;
  setNoteText: (text: string) => void;
  setIsSaving: (saving: boolean) => void;
  setSelectedColor: (color: HighlightColor) => void;
}

// ============================================================================
// Component Props
// ============================================================================

export interface TextSelectionToolbarProps {
  containerRef: React.RefObject<HTMLElement>;
  /** Returns highlight ID on success, null on failure */
  onHighlight: (text: string, note?: string) => Promise<string | null>;
  onCopy?: (text: string) => void;
  disabled?: boolean;
}
