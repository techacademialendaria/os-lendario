import { useState, useCallback } from 'react';
import type { SidebarTab } from '../types';

export interface UseLessonSidebarReturn {
  collapsed: boolean;
  tab: SidebarTab;
  setCollapsed: (collapsed: boolean) => void;
  setTab: (tab: SidebarTab) => void;
  toggleCollapsed: () => void;
}

export function useLessonSidebar(): UseLessonSidebarReturn {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<SidebarTab>('index');

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return {
    collapsed,
    tab,
    setCollapsed,
    setTab,
    toggleCollapsed,
  };
}
