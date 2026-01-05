import { useState, useCallback } from 'react';

/**
 * Hook to manage expanded/collapsed state of curriculum modules
 */
export function useExpandedModules() {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }, []);

  const isModuleExpanded = useCallback(
    (moduleId: string) => expandedModules.has(moduleId),
    [expandedModules]
  );

  const expandAll = useCallback((moduleIds: string[]) => {
    setExpandedModules(new Set(moduleIds));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedModules(new Set());
  }, []);

  return {
    expandedModules,
    toggleModule,
    isModuleExpanded,
    expandAll,
    collapseAll,
  };
}
