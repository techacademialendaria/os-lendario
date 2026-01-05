import { useState, useCallback } from 'react';

export interface UseTabsReturn<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  isActive: (tab: T) => boolean;
  goToTab: (tab: T) => void;
}

/**
 * Hook for managing tab navigation state
 *
 * @example
 * type ViewTab = 'overview' | 'details' | 'settings';
 *
 * const { activeTab, setActiveTab, isActive } = useTabs<ViewTab>('overview');
 *
 * <TabbedSection
 *   tabs={[
 *     { id: 'overview', label: 'Overview' },
 *     { id: 'details', label: 'Details' },
 *     { id: 'settings', label: 'Settings' },
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 */
export function useTabs<T extends string>(defaultTab: T): UseTabsReturn<T> {
  const [activeTab, setActiveTabState] = useState<T>(defaultTab);

  const setActiveTab = useCallback((tab: T) => {
    setActiveTabState(tab);
  }, []);

  const isActive = useCallback(
    (tab: T) => activeTab === tab,
    [activeTab]
  );

  const goToTab = useCallback((tab: T) => {
    setActiveTabState(tab);
  }, []);

  return {
    activeTab,
    setActiveTab,
    isActive,
    goToTab,
  };
}
