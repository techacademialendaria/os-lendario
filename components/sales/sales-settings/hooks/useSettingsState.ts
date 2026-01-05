import { useState } from 'react';
import type { SettingsTab } from '../types';

export function useSettingsState() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('integrations');

  return {
    activeTab,
    setActiveTab,
  };
}
