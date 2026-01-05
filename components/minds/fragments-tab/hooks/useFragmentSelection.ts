import { useState, useCallback } from 'react';
import type { MindFragment, UseFragmentSelectionReturn } from '../types';

export function useFragmentSelection(): UseFragmentSelectionReturn {
  const [selectedFragment, setSelectedFragment] = useState<MindFragment | null>(null);
  const [expandedContents, setExpandedContents] = useState<Set<string>>(new Set());

  const select = useCallback((fragment: MindFragment) => {
    setSelectedFragment(fragment);
  }, []);

  const clear = useCallback(() => {
    setSelectedFragment(null);
  }, []);

  const toggleContent = useCallback((contentId: string) => {
    setExpandedContents(prev => {
      const next = new Set(prev);
      if (next.has(contentId)) {
        next.delete(contentId);
      } else {
        next.add(contentId);
      }
      return next;
    });
  }, []);

  const expandContent = useCallback((contentId: string) => {
    setExpandedContents(prev => {
      if (prev.has(contentId)) return prev;
      return new Set([...prev, contentId]);
    });
  }, []);

  const initializeExpanded = useCallback((contentIds: string[]) => {
    setExpandedContents(prev => {
      if (prev.size > 0) return prev; // Only initialize if empty
      return new Set(contentIds.slice(0, 3));
    });
  }, []);

  return {
    selectedFragment,
    expandedContents,
    select,
    clear,
    toggleContent,
    expandContent,
    initializeExpanded,
  };
}
