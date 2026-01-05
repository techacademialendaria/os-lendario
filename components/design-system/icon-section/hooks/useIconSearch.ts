import { useState, useMemo, useCallback } from 'react';
import type { UIIconCategories, UseIconSearchReturn } from '../types';
import { UI_ICON_CATEGORIES } from '../data';

/**
 * Hook for managing icon search functionality
 * Handles search term state and filters categories based on search
 */
export function useIconSearch(): UseIconSearchReturn {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return UI_ICON_CATEGORIES;
    }

    const normalizedSearch = searchTerm.toLowerCase();

    return Object.entries(UI_ICON_CATEGORIES).reduce(
      (acc, [category, icons]) => {
        const matches = icons.filter((icon) =>
          icon.toLowerCase().includes(normalizedSearch)
        );
        if (matches.length > 0) {
          acc[category] = matches;
        }
        return acc;
      },
      {} as UIIconCategories
    );
  }, [searchTerm]);

  const hasResults = Object.keys(filteredCategories).length > 0;

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredCategories,
    hasResults,
    clearSearch,
  };
}
