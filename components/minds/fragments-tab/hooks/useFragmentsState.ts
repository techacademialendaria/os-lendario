import { useState, useMemo, useCallback, useEffect } from 'react';
import type { MindFragment, MindFragmentsResult, RelevanceFilter, ContentGroup } from '../types';

export function useFragmentsState(fragmentsData: MindFragmentsResult | null) {
  // UI state
  const [selectedFragment, setSelectedFragment] = useState<MindFragment | null>(null);
  const [expandedContents, setExpandedContents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterRelevance, setFilterRelevance] = useState<RelevanceFilter>('all');

  // Filter fragments based on search and filters
  const filteredFragments = useMemo(() => {
    if (!fragmentsData?.fragments) return [];

    return fragmentsData.fragments.filter(f => {
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
  }, [fragmentsData?.fragments, searchQuery, filterType, filterRelevance]);

  // Group filtered fragments by content (source)
  const groupedByContent = useMemo(() => {
    const grouped: Record<string, MindFragment[]> = {};

    filteredFragments.forEach(f => {
      const contentId = f.contentId || 'unknown';
      if (!grouped[contentId]) {
        grouped[contentId] = [];
      }
      grouped[contentId].push(f);
    });

    return grouped;
  }, [filteredFragments]);

  // Get sorted content IDs (by fragment count)
  const sortedContentIds = useMemo(() => {
    return Object.keys(groupedByContent).sort((a, b) => {
      return groupedByContent[b].length - groupedByContent[a].length;
    });
  }, [groupedByContent]);

  // Get content title for a content ID
  const getContentTitle = useCallback((contentId: string): string => {
    const fragment = groupedByContent[contentId]?.[0];
    return fragment?.contentTitle || fragment?.sourceTitle || 'Conteudo sem titulo';
  }, [groupedByContent]);

  // Toggle content expansion
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

  // Expand first 3 contents on initial load
  useEffect(() => {
    if (sortedContentIds.length > 0 && expandedContents.size === 0) {
      setExpandedContents(new Set(sortedContentIds.slice(0, 3)));
    }
  }, [sortedContentIds]);

  // Select first fragment if none selected
  useEffect(() => {
    if (!selectedFragment && filteredFragments.length > 0) {
      setSelectedFragment(filteredFragments[0]);
    }
  }, [filteredFragments, selectedFragment]);

  return {
    // Selection
    selectedFragment,
    setSelectedFragment,
    // Expansion
    expandedContents,
    toggleContent,
    setExpandedContents,
    // Filters
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterRelevance,
    setFilterRelevance,
    // Derived data
    filteredFragments,
    groupedByContent,
    sortedContentIds,
    getContentTitle,
  };
}
