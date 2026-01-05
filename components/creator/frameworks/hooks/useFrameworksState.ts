import { useState } from 'react';
import type { Framework } from '@/hooks/useContentFrameworks';
import type { FrameworkCategory } from '../types';

export function useFrameworksState() {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<FrameworkCategory>('all');

  const selectFramework = (framework: Framework) => {
    setSelectedFramework(framework);
  };

  const clearSelection = () => {
    setSelectedFramework(null);
  };

  return {
    selectedFramework,
    categoryFilter,
    setCategoryFilter,
    selectFramework,
    clearSelection,
  };
}
