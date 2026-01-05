import { useCallback, useRef } from 'react';
import type { HighlightColor } from '../../HighlightActions';
import { getHighlightStyles } from '../../HighlightActions';

const TEMP_HIGHLIGHT_CLASS = 'temp-highlight-mark';
const SAVED_HIGHLIGHT_CLASS = 'saved-highlight';

interface UseHighlightMarkResult {
  highlightMarkRef: React.MutableRefObject<HTMLElement | null>;
  createMark: (range: Range, color: HighlightColor) => boolean;
  convertToSaved: (highlightId: string) => void;
  removeMark: () => void;
}

export function useHighlightMark(): UseHighlightMarkResult {
  const highlightMarkRef = useRef<HTMLElement | null>(null);

  const createMark = useCallback(
    (range: Range, color: HighlightColor): boolean => {
      const mark = document.createElement('mark');
      mark.className = TEMP_HIGHLIGHT_CLASS;
      mark.dataset.highlightColor = color;
      Object.assign(mark.style, getHighlightStyles(color));

      try {
        range.surroundContents(mark);
        highlightMarkRef.current = mark;
        return true;
      } catch {
        console.warn('Could not create highlight mark - selection spans multiple elements');
        return false;
      }
    },
    []
  );

  const convertToSaved = useCallback((highlightId: string) => {
    if (highlightMarkRef.current) {
      highlightMarkRef.current.className = SAVED_HIGHLIGHT_CLASS;
      highlightMarkRef.current.dataset.highlightId = highlightId;
      highlightMarkRef.current.style.cursor = 'pointer';
      highlightMarkRef.current = null;
    }
  }, []);

  const removeMark = useCallback(() => {
    if (highlightMarkRef.current) {
      const mark = highlightMarkRef.current;
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
      }
      highlightMarkRef.current = null;
    }
  }, []);

  return {
    highlightMarkRef,
    createMark,
    convertToSaved,
    removeMark,
  };
}
