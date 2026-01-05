import { useState, useCallback } from 'react';

export function useModelExpansion() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const toggleModel = useCallback((modelSlug: string) => {
    setExpandedModel(prev => prev === modelSlug ? null : modelSlug);
  }, []);

  const closeModel = useCallback(() => {
    setExpandedModel(null);
  }, []);

  return {
    expandedModel,
    toggleModel,
    closeModel,
    isExpanded: (modelSlug: string) => expandedModel === modelSlug
  };
}
