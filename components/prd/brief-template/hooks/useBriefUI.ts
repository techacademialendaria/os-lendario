// Brief UI State Hook
// Manages UI state for the Brief Builder

import { useState, useCallback } from 'react';
import { BriefUIState, EditorMode, ProjectDecision } from '../types';

export interface UseBriefUIReturn {
  ui: BriefUIState;
  setViewMode: (mode: EditorMode) => void;
  setDecision: (decision: ProjectDecision) => void;
  setShowTaskDialog: (show: boolean) => void;
  setIsGenerating: (field: string | null) => void;
  setIsAdvancing: (advancing: boolean) => void;
}

export function useBriefUI(): UseBriefUIReturn {
  const [ui, setUI] = useState<BriefUIState>({
    viewMode: 'edit',
    decision: null,
    showTaskDialog: false,
    isGenerating: null,
    isAdvancing: false,
  });

  const setViewMode = useCallback((mode: EditorMode) => {
    setUI((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const setDecision = useCallback((decision: ProjectDecision) => {
    setUI((prev) => ({ ...prev, decision }));
  }, []);

  const setShowTaskDialog = useCallback((show: boolean) => {
    setUI((prev) => ({ ...prev, showTaskDialog: show }));
  }, []);

  const setIsGenerating = useCallback((field: string | null) => {
    setUI((prev) => ({ ...prev, isGenerating: field }));
  }, []);

  const setIsAdvancing = useCallback((advancing: boolean) => {
    setUI((prev) => ({ ...prev, isAdvancing: advancing }));
  }, []);

  return {
    ui,
    setViewMode,
    setDecision,
    setShowTaskDialog,
    setIsGenerating,
    setIsAdvancing,
  };
}
