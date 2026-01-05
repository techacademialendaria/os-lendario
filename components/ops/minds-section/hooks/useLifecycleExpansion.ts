import { useState, useCallback } from 'react';

export function useLifecycleExpansion() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const toggleStage = useCallback((stage: number) => {
    setExpandedStage(prev => prev === stage ? null : stage);
  }, []);

  const closeStage = useCallback(() => {
    setExpandedStage(null);
  }, []);

  return {
    expandedStage,
    toggleStage,
    closeStage,
    isExpanded: (stage: number) => expandedStage === stage
  };
}
