/**
 * useInfiniteScroll - Manages infinite scroll behavior with IntersectionObserver
 */

import { useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  hasMore: boolean;
  loadingMore: boolean;
  loadMore: () => void;
  threshold?: number;
}

interface UseInfiniteScrollReturn {
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

export function useInfiniteScroll({
  hasMore,
  loadingMore,
  loadMore,
  threshold = 0.1,
}: UseInfiniteScrollParams): UseInfiniteScrollReturn {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore, threshold]);

  return { loadMoreRef };
}
