/**
 * useLessonEditorState Hook
 * Manages UI state for the lesson editor (tabs, sidebar).
 */

import { useState } from 'react';
import type { UseLessonEditorStateReturn } from '../types';

export function useLessonEditorState(): UseLessonEditorStateReturn {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'index' | 'audit'>('index');

  return {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarTab,
    setSidebarTab,
  };
}
