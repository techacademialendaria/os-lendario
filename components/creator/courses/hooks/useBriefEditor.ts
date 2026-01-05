import { useState, useCallback } from 'react';
import type { PainPoint } from '../types';

interface UseBriefEditorReturn {
  activeSection: number;
  setActiveSection: (section: number) => void;
  showValidation: boolean;
  setShowValidation: (show: boolean) => void;
  painPoints: PainPoint[];
  setPainPoints: (points: PainPoint[]) => void;
  // Navigation
  goToNextSection: () => void;
  goToPrevSection: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastSection: boolean;
  // Pain points helpers
  addPainPoint: (text: string, intensity: number) => void;
  removePainPoint: (id: number) => void;
  updatePainPoint: (id: number, updates: Partial<Omit<PainPoint, 'id'>>) => void;
}

const TOTAL_SECTIONS = 8;

/**
 * Hook for managing brief editor state
 */
export function useBriefEditor(): UseBriefEditorReturn {
  const [activeSection, setActiveSection] = useState(1);
  const [showValidation, setShowValidation] = useState(false);
  const [painPoints, setPainPoints] = useState<PainPoint[]>([
    { id: 1, text: 'Falta de tempo', intensity: 8 },
  ]);

  const canGoPrev = activeSection > 1;
  const canGoNext = activeSection < TOTAL_SECTIONS;
  const isLastSection = activeSection === TOTAL_SECTIONS;

  const goToNextSection = useCallback(() => {
    if (canGoNext) {
      setActiveSection((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevSection = useCallback(() => {
    if (canGoPrev) {
      setActiveSection((prev) => prev - 1);
    }
  }, [canGoPrev]);

  const addPainPoint = useCallback((text: string, intensity: number) => {
    setPainPoints((prev) => [
      ...prev,
      { id: Math.max(0, ...prev.map((p) => p.id)) + 1, text, intensity },
    ]);
  }, []);

  const removePainPoint = useCallback((id: number) => {
    setPainPoints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updatePainPoint = useCallback((id: number, updates: Partial<Omit<PainPoint, 'id'>>) => {
    setPainPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  return {
    activeSection,
    setActiveSection,
    showValidation,
    setShowValidation,
    painPoints,
    setPainPoints,
    goToNextSection,
    goToPrevSection,
    canGoNext,
    canGoPrev,
    isLastSection,
    addPainPoint,
    removePainPoint,
    updatePainPoint,
  };
}
