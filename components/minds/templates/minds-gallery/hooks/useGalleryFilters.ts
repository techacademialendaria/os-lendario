import { useState, useMemo, useCallback } from 'react';
import type { ViewMode, StatusFilter } from '../types';
import type { MindData as Mind } from '../../../../minds/ui/MindCard';

export interface UseGalleryFiltersReturn {
  // State
  viewMode: ViewMode;
  statusFilter: StatusFilter;
  searchQuery: string;
  filteredMinds: Mind[];
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSearchQuery: (query: string) => void;
}

export function useGalleryFilters(minds: Mind[]): UseGalleryFiltersReturn {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter minds by status and search, then sort: with avatar first, then alphabetically
  const filteredMinds = useMemo(() => {
    return minds
      .filter((mind) => {
        const matchesStatus = statusFilter === 'all' || mind.status === statusFilter;
        const matchesSearch =
          !searchQuery ||
          mind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mind.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mind.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // Prioritize minds with real avatar photos first
        if (a.hasRealAvatar && !b.hasRealAvatar) return -1;
        if (!a.hasRealAvatar && b.hasRealAvatar) return 1;

        // Then sort alphabetically by name
        return a.name.localeCompare(b.name, 'pt-BR');
      });
  }, [minds, statusFilter, searchQuery]);

  return {
    viewMode,
    statusFilter,
    searchQuery,
    filteredMinds,
    setViewMode,
    setStatusFilter,
    setSearchQuery,
  };
}
