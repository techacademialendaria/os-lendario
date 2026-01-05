import { useState, useCallback } from 'react';
import type { GlossaryFilterState } from '../types';

export function useGlossaryFilters(): GlossaryFilterState {
  const [glossaryFilter, setGlossaryFilter] = useState<string>('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('all');

  const handleSetGlossaryFilter = useCallback((filter: string) => {
    setGlossaryFilter(filter);
  }, []);

  const handleSetSelectedGlossaryCategory = useCallback((category: string) => {
    setSelectedGlossaryCategory(category);
  }, []);

  return {
    glossaryFilter,
    setGlossaryFilter: handleSetGlossaryFilter,
    selectedGlossaryCategory,
    setSelectedGlossaryCategory: handleSetSelectedGlossaryCategory,
  };
}
