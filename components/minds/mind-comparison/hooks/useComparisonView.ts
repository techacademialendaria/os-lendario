import { useState } from 'react';
import type { ViewMode } from '../types';

export function useComparisonView() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return {
    viewMode,
    setViewMode,
  };
}
