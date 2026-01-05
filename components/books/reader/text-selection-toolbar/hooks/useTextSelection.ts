import { useState, useCallback, useRef, useEffect } from 'react';
import type { Position, SelectionState } from '../types';

interface UseTextSelectionOptions {
  containerRef: React.RefObject<HTMLElement>;
  disabled?: boolean;
  mode: 'toolbar' | 'note' | 'colorPicker';
  toolbarRef: React.RefObject<HTMLDivElement>;
  onReset: () => void;
}

interface UseTextSelectionResult {
  state: SelectionState;
  savedRangeRef: React.MutableRefObject<Range | null>;
  reset: () => void;
  resetKeepMark: () => void;
}

export function useTextSelection({
  containerRef,
  disabled = false,
  mode,
  toolbarRef,
  onReset,
}: UseTextSelectionOptions): UseTextSelectionResult {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  const savedRangeRef = useRef<Range | null>(null);

  // Reset state keeping mark (for successful saves)
  const resetKeepMark = useCallback(() => {
    setIsVisible(false);
    setSelectedText('');
    savedRangeRef.current = null;
  }, []);

  // Full reset (removes mark too via onReset callback)
  const reset = useCallback(() => {
    onReset();
    setIsVisible(false);
    setSelectedText('');
    savedRangeRef.current = null;
  }, [onReset]);

  // Selection detection
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (disabled) return;

      // Don't process if clicking inside toolbar
      if (toolbarRef.current?.contains(e.target as Node)) {
        return;
      }

      // Don't process if note input is showing
      if (mode === 'note') {
        return;
      }

      // Small delay to let selection finalize
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          reset();
          return;
        }

        const text = selection.toString().trim();
        if (!text || text.length < 3) {
          reset();
          return;
        }

        // Check if selection is within the container
        const range = selection.getRangeAt(0);
        const container = containerRef.current;
        if (!container || !container.contains(range.commonAncestorContainer)) {
          return;
        }

        // Get position for toolbar
        const rect = range.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Position toolbar above the selection, centered
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top - containerRect.top - 10;

        // Store text and CLONE the range
        setSelectedText(text);
        savedRangeRef.current = range.cloneRange();
        setPosition({ x, y });
        setIsVisible(true);
      }, 10);
    },
    [containerRef, disabled, mode, reset, toolbarRef]
  );

  // Event listeners
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return {
    state: {
      selectedText,
      position,
      isVisible,
    },
    savedRangeRef,
    reset,
    resetKeepMark,
  };
}
