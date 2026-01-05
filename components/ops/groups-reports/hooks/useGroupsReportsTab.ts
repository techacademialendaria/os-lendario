import { useState, useCallback } from 'react';
import type { TabValue } from '../types';

export function useGroupsReportsTab(initialTab: TabValue = 'overview') {
  const [activeTab, setActiveTab] = useState<TabValue>(initialTab);

  const changeTab = useCallback((tab: TabValue) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    setActiveTab: changeTab,
  };
}
