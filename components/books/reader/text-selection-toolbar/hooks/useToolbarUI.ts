import { useState, useEffect, useCallback } from 'react';
import type { ActionMode } from '../types';
import { DEFAULT_HIGHLIGHT_COLOR, type HighlightColor } from '../../HighlightActions';

interface UseToolbarUIOptions {
  isVisible: boolean;
  isSaving: boolean;
  mode: ActionMode;
  containerRef: React.RefObject<HTMLElement>;
  toolbarRef: React.RefObject<HTMLDivElement>;
  onReset: () => void;
}

interface UseToolbarUIResult {
  mode: ActionMode;
  noteText: string;
  isSaving: boolean;
  selectedColor: HighlightColor;
  setMode: (mode: ActionMode) => void;
  setNoteText: (text: string) => void;
  setIsSaving: (saving: boolean) => void;
  setSelectedColor: (color: HighlightColor) => void;
  resetUI: () => void;
}

export function useToolbarUI({
  isVisible,
  isSaving,
  mode,
  containerRef,
  toolbarRef,
  onReset,
}: UseToolbarUIOptions): UseToolbarUIResult {
  const [localMode, setLocalMode] = useState<ActionMode>('toolbar');
  const [noteText, setNoteText] = useState('');
  const [localIsSaving, setLocalIsSaving] = useState(false);
  const [selectedColor, setSelectedColor] = useState<HighlightColor>(DEFAULT_HIGHLIGHT_COLOR);

  const resetUI = useCallback(() => {
    setLocalMode('toolbar');
    setNoteText('');
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (localIsSaving) return;

      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        const container = containerRef.current;
        if (container?.contains(e.target as Node)) {
          if (localMode === 'note') {
            return;
          }
        }
        onReset();
      }
    };

    if (isVisible) {
      const timeout = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 200);
      return () => {
        clearTimeout(timeout);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVisible, localIsSaving, localMode, containerRef, toolbarRef, onReset]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible && !localIsSaving) {
        onReset();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, localIsSaving, onReset]);

  return {
    mode: localMode,
    noteText,
    isSaving: localIsSaving,
    selectedColor,
    setMode: setLocalMode,
    setNoteText,
    setIsSaving: setLocalIsSaving,
    setSelectedColor,
    resetUI,
  };
}
