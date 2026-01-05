import { useState, useCallback } from 'react';
import type { PainPoint, UsePainPointEditorReturn } from '../types';
import { generateId } from '../types';

interface UsePainPointEditorOptions {
  initialPainPoints?: PainPoint[];
  onSave: (painPoints: PainPoint[]) => void;
}

export function usePainPointEditor({
  initialPainPoints = [],
  onSave,
}: UsePainPointEditorOptions): UsePainPointEditorReturn {
  const [painPoints, setPainPoints] = useState<PainPoint[]>(initialPainPoints);
  const [isAdding, setIsAdding] = useState(false);
  const [newPainPoint, setNewPainPoint] = useState<Omit<PainPoint, 'id'>>({
    superficial: '',
    deep: '',
    relevance: 50,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const handleAddPainPoint = useCallback(() => {
    if (!newPainPoint.superficial.trim()) return;

    const painPoint: PainPoint = {
      id: generateId(),
      ...newPainPoint,
    };

    setPainPoints((prev) => [...prev, painPoint]);
    setNewPainPoint({ superficial: '', deep: '', relevance: 50 });
    setIsAdding(false);
  }, [newPainPoint]);

  const handleUpdatePainPoint = useCallback((id: string, updates: Partial<PainPoint>) => {
    setPainPoints((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const handleDeletePainPoint = useCallback(
    (id: string) => {
      setPainPoints((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) setEditingId(null);
    },
    [editingId]
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(painPoints);
    } finally {
      setIsSaving(false);
    }
  }, [painPoints, onSave]);

  const handleAiSuggest = useCallback(() => {
    setShowAiSuggestion(true);
    // In a real implementation, this would call an AI service
  }, []);

  return {
    // State
    painPoints,
    isAdding,
    newPainPoint,
    editingId,
    isSaving,
    showAiSuggestion,

    // Actions
    setIsAdding,
    setNewPainPoint,
    setEditingId,
    setShowAiSuggestion,
    handleAddPainPoint,
    handleUpdatePainPoint,
    handleDeletePainPoint,
    handleSave,
    handleAiSuggest,
  };
}
