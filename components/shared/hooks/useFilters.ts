import { useState, useCallback, useMemo } from 'react';

export interface UseFiltersOptions<T, F> {
  items: T[];
  filterFn: (item: T, filters: F) => boolean;
  initialFilters: F;
}

export interface UseFiltersReturn<T, F> {
  items: T[];
  filteredItems: T[];
  filters: F;
  setFilter: <K extends keyof F>(key: K, value: F[K]) => void;
  setFilters: (filters: F) => void;
  resetFilters: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

/**
 * Generic hook for filtering lists with search and custom filters
 *
 * @example
 * const { filteredItems, searchTerm, setSearchTerm, setFilter } = useFilters({
 *   items: users,
 *   initialFilters: { role: 'all', status: 'active' },
 *   filterFn: (user, filters) => {
 *     if (filters.role !== 'all' && user.role !== filters.role) return false;
 *     if (filters.status !== 'all' && user.status !== filters.status) return false;
 *     return true;
 *   },
 * });
 */
export function useFilters<T, F extends Record<string, unknown>>({
  items,
  filterFn,
  initialFilters,
}: UseFiltersOptions<T, F>): UseFiltersReturn<T, F> {
  const [filters, setFiltersState] = useState<F>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const setFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFilters = useCallback((newFilters: F) => {
    setFiltersState(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => filterFn(item, filters));
  }, [items, filters, filterFn]);

  return {
    items,
    filteredItems,
    filters,
    setFilter,
    setFilters,
    resetFilters,
    searchTerm,
    setSearchTerm,
  };
}
