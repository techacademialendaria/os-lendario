import { useEffect } from 'react';
import { useHighlightMarker } from '@/hooks/useHighlightMarker';

interface UseReaderLifecycleOptions {
  setSidebarCollapsed?: (collapsed: boolean) => void;
  setSidebarHidden?: (hidden: boolean) => void;
  articleRef: React.RefObject<HTMLDivElement | null>;
  highlights: Array<{ id: string; text: string; note?: string | null }>;
  showFullContent: boolean;
  loading: boolean;
}

export function useReaderLifecycle({
  setSidebarCollapsed,
  setSidebarHidden,
  articleRef,
  highlights,
  showFullContent,
  loading,
}: UseReaderLifecycleOptions) {
  // Apply saved highlights to DOM when content is loaded
  useHighlightMarker({
    containerRef: articleRef as React.RefObject<HTMLElement>,
    highlights,
    enabled: showFullContent && !loading,
  });

  // Collapse app sidebar on mount, restore on unmount
  useEffect(() => {
    if (setSidebarCollapsed) {
      setSidebarCollapsed(true);
    }
    if (setSidebarHidden) {
      setSidebarHidden(false);
    }

    // Prevent body scroll while in reader mode
    document.body.style.overflow = 'hidden';

    return () => {
      if (setSidebarCollapsed) {
        setSidebarCollapsed(false);
      }
      document.body.style.overflow = '';
    };
  }, [setSidebarCollapsed, setSidebarHidden]);
}
