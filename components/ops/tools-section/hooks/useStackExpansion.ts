import { useState, useCallback } from 'react';

export function useStackExpansion() {
  const [expandedStack, setExpandedStack] = useState<string | null>(null);

  const toggleStack = useCallback((stackName: string) => {
    setExpandedStack(prev => prev === stackName ? null : stackName);
  }, []);

  const closeStack = useCallback(() => {
    setExpandedStack(null);
  }, []);

  const isExpanded = useCallback((stackName: string) => {
    return expandedStack === stackName;
  }, [expandedStack]);

  return {
    expandedStack,
    toggleStack,
    closeStack,
    isExpanded
  };
}
