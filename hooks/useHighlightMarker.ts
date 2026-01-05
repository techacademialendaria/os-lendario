/**
 * useHighlightMarker - Hook to apply visual highlight marks to DOM
 *
 * Finds text in the DOM and wraps it with <mark> elements.
 * Used to show saved highlights when reading a book.
 */

import { useEffect, useCallback, useRef } from 'react';

interface Highlight {
  id: string;
  text: string;
}

interface UseHighlightMarkerOptions {
  containerRef: React.RefObject<HTMLElement>;
  highlights: Highlight[];
  enabled?: boolean;
}

// CSS class for persistent highlights
const HIGHLIGHT_CLASS = 'saved-highlight';
const HIGHLIGHT_STYLES = {
  backgroundColor: '#E6B325',
  color: '#000',
  borderRadius: '2px',
  cursor: 'pointer',
};

/**
 * Find and mark text in the DOM
 * Returns true if text was found and marked
 */
function findAndMarkText(
  container: HTMLElement,
  searchText: string,
  highlightId: string
): boolean {
  // Skip if already marked
  const existingMark = container.querySelector(`[data-highlight-id="${highlightId}"]`);
  if (existingMark) return true;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node);
  }

  // Normalize search text (remove extra whitespace)
  const normalizedSearch = searchText.replace(/\s+/g, ' ').trim();

  // Try to find the text in a single text node first
  for (const textNode of textNodes) {
    const nodeText = textNode.textContent || '';
    const normalizedNode = nodeText.replace(/\s+/g, ' ');
    const index = normalizedNode.indexOf(normalizedSearch);

    if (index !== -1) {
      // Found! Create the mark
      try {
        const range = document.createRange();

        // Find actual position accounting for whitespace normalization
        let actualIndex = 0;
        let normalizedIndex = 0;
        while (normalizedIndex < index && actualIndex < nodeText.length) {
          if (/\s/.test(nodeText[actualIndex])) {
            // Skip extra whitespace in original
            while (actualIndex < nodeText.length - 1 && /\s/.test(nodeText[actualIndex + 1])) {
              actualIndex++;
            }
          }
          actualIndex++;
          normalizedIndex++;
        }

        // Find end position
        let actualEnd = actualIndex;
        let searchIndex = 0;
        while (searchIndex < normalizedSearch.length && actualEnd < nodeText.length) {
          if (/\s/.test(nodeText[actualEnd]) && /\s/.test(normalizedSearch[searchIndex])) {
            // Skip extra whitespace
            while (actualEnd < nodeText.length - 1 && /\s/.test(nodeText[actualEnd + 1])) {
              actualEnd++;
            }
          }
          actualEnd++;
          searchIndex++;
        }

        range.setStart(textNode, actualIndex);
        range.setEnd(textNode, actualEnd);

        const mark = document.createElement('mark');
        mark.className = HIGHLIGHT_CLASS;
        mark.dataset.highlightId = highlightId;
        Object.assign(mark.style, HIGHLIGHT_STYLES);

        range.surroundContents(mark);
        return true;
      } catch {
        // surroundContents can fail if range spans elements
        console.warn('Could not mark text:', searchText.slice(0, 50));
      }
    }
  }

  // If not found in single node, try across multiple nodes
  // This is more complex and less reliable, so we do a simpler approach:
  // Just search in the full text content
  const fullText = container.textContent || '';
  if (fullText.includes(normalizedSearch)) {
    console.warn('Highlight text found but spans multiple nodes:', searchText.slice(0, 50));
  }

  return false;
}

/**
 * Remove all highlight marks from container
 */
function clearAllMarks(container: HTMLElement) {
  const marks = container.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
    }
  });
}

/**
 * Hook to apply highlight marks to DOM
 */
export function useHighlightMarker({
  containerRef,
  highlights,
  enabled = true,
}: UseHighlightMarkerOptions) {
  const appliedHighlightsRef = useRef<Set<string>>(new Set());

  // Apply highlights to DOM
  const applyHighlights = useCallback(() => {
    const container = containerRef.current;
    if (!container || !enabled || highlights.length === 0) return;

    // Small delay to ensure DOM is rendered
    setTimeout(() => {
      for (const highlight of highlights) {
        if (!appliedHighlightsRef.current.has(highlight.id)) {
          const marked = findAndMarkText(container, highlight.text, highlight.id);
          if (marked) {
            appliedHighlightsRef.current.add(highlight.id);
          }
        }
      }
    }, 100);
  }, [containerRef, highlights, enabled]);

  // Apply highlights when they change or content loads
  useEffect(() => {
    applyHighlights();
  }, [applyHighlights]);

  // Also apply after a longer delay (for lazy-loaded content)
  useEffect(() => {
    if (!enabled || highlights.length === 0) return;

    const timeouts = [500, 1000, 2000].map((delay) =>
      setTimeout(applyHighlights, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [applyHighlights, enabled, highlights.length]);

  // Function to manually add a new highlight mark
  const addHighlightMark = useCallback(
    (text: string, id: string) => {
      const container = containerRef.current;
      if (!container) return false;

      const marked = findAndMarkText(container, text, id);
      if (marked) {
        appliedHighlightsRef.current.add(id);
      }
      return marked;
    },
    [containerRef]
  );

  // Function to clear all marks
  const clearMarks = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      clearAllMarks(container);
      appliedHighlightsRef.current.clear();
    }
  }, [containerRef]);

  return {
    applyHighlights,
    addHighlightMark,
    clearMarks,
  };
}

export default useHighlightMarker;
