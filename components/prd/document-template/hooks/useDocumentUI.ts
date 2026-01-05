// Document UI State Hook
// Manages UI state for the PRD Document

import { useState, useCallback } from 'react';

export interface UseDocumentUIReturn {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdvancing: boolean;
  setIsAdvancing: (advancing: boolean) => void;
}

export function useDocumentUI(): UseDocumentUIReturn {
  const [activeTab, setActiveTab] = useState('design');
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleSetIsAdvancing = useCallback((advancing: boolean) => {
    setIsAdvancing(advancing);
  }, []);

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    isAdvancing,
    setIsAdvancing: handleSetIsAdvancing,
  };
}
