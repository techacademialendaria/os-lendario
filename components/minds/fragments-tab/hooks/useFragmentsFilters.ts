import { useState, useMemo, useCallback } from 'react';
import type { MindFragment, RelevanceFilter, UseFragmentsFiltersReturn } from '../types';

interface UseFragmentsFiltersOptions {
  fragments: MindFragment[];
}

export function useFragmentsFilters({ fragments }: UseFragmentsFiltersOptions): UseFragmentsFiltersReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterRelevance, setFilterRelevance] = useState<RelevanceFilter>('all');

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterType(null);
    setFilterRelevance('all');
  }, []);

  const filteredFragments = useMemo(() => {
    if (!fragments) return [];

    return fragments.filter(f => {
      // Search filter
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch =
          f.content.toLowerCase().includes(lowerQuery) ||
          f.context.toLowerCase().includes(lowerQuery) ||
          f.insight.toLowerCase().includes(lowerQuery) ||
          (f.sourceTitle?.toLowerCase().includes(lowerQuery) ?? false) ||
          (f.contentTitle?.toLowerCase().includes(lowerQuery) ?? false);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filterType && f.type !== filterType) return false;

      // Relevance filter
      if (filterRelevance !== 'all') {
        if (filterRelevance === 'high' && f.relevance < 8) return false;
        if (filterRelevance === 'medium' && (f.relevance < 5 || f.relevance >= 8)) return false;
        if (filterRelevance === 'low' && f.relevance >= 5) return false;
      }

      return true;
    });
  }, [fragments, searchQuery, filterType, filterRelevance]);

  return {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterRelevance,
    setFilterRelevance,
    clearFilters,
    filteredFragments,
  };
}
