import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { VALID_TABS, type ValidTab } from '../types';

export interface UseMindProfileTabsReturn {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

export function useMindProfileTabs(): UseMindProfileTabsReturn {
  const location = useLocation();

  // Get initial tab from URL hash or default to "overview"
  const getInitialTab = (): string => {
    const hash = location.hash.replace('#', '');
    return VALID_TABS.includes(hash as ValidTab) ? hash : 'overview';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Sync tab with URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (VALID_TABS.includes(hash as ValidTab) && hash !== activeTab) {
      setActiveTab(hash);
    }
  }, [location.hash, activeTab]);

  // Update URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `${location.pathname}#${tab}`);
  };

  return { activeTab, handleTabChange };
}
