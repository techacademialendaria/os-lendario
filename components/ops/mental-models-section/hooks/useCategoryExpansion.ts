import { useState, useCallback } from 'react';

export function useCategoryExpansion() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategory(prev => prev === category ? null : category);
  }, []);

  const closeCategory = useCallback(() => {
    setExpandedCategory(null);
  }, []);

  return {
    expandedCategory,
    toggleCategory,
    closeCategory,
    isExpanded: (category: string) => expandedCategory === category
  };
}
