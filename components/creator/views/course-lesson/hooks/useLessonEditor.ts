import { useState, useCallback } from 'react';
import type { EditorTab } from '../types';

export interface UseLessonEditorReturn {
  editorTab: EditorTab;
  setEditorTab: (tab: EditorTab) => void;
}

export function useLessonEditor(): UseLessonEditorReturn {
  const [editorTab, setEditorTab] = useState<EditorTab>('script');

  return {
    editorTab,
    setEditorTab,
  };
}
