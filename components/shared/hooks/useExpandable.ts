import { useState, useCallback } from 'react';

export interface UseExpandableReturn {
  expandedIds: Set<string>;
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
  expand: (id: string) => void;
  collapse: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;
  setExpandedIds: (ids: string[]) => void;
}

/**
 * Hook for managing expand/collapse state of multiple items
 *
 * @example
 * const { isExpanded, toggle } = useExpandable(['first-item']);
 *
 * <ExpandableCard
 *   id="first-item"
 *   isExpanded={isExpanded('first-item')}
 *   onToggle={toggle}
 * />
 */
export function useExpandable(
  defaultExpanded: string[] = []
): UseExpandableReturn {
  const [expandedIds, setExpandedIdsState] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const isExpanded = useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds]
  );

  const toggle = useCallback((id: string) => {
    setExpandedIdsState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expand = useCallback((id: string) => {
    setExpandedIdsState((prev) => new Set(prev).add(id));
  }, []);

  const collapse = useCallback((id: string) => {
    setExpandedIdsState((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const expandAll = useCallback((ids: string[]) => {
    setExpandedIdsState(new Set(ids));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedIdsState(new Set());
  }, []);

  const setExpandedIds = useCallback((ids: string[]) => {
    setExpandedIdsState(new Set(ids));
  }, []);

  return {
    expandedIds,
    isExpanded,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,
    setExpandedIds,
  };
}
