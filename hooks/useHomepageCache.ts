/**
 * useHomepageCache - Fetches pre-generated homepage data from cache
 *
 * Benefits:
 * - Single HTTP request instead of 6-8 database queries
 * - ~50KB JSON instead of megabytes of content
 * - CDN-cacheable (served from Supabase Storage edge)
 * - Auto-updates every 60 minutes via Edge Function cron
 *
 * Fallback:
 * - If cache is unavailable, returns null and components should use original hooks
 */

import { useState, useEffect } from 'react';

// ============================================================================
// Types (must match Edge Function output)
// ============================================================================

export interface CachedBook {
  id: string;
  slug: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  rating: number | null;
  hasAudio: boolean;
  category: string | null;
  categorySlug: string | null;
}

export interface CachedCollection {
  slug: string;
  name: string;
  description: string | null;
  bookCount: number;
}

export interface CachedCategory {
  slug: string;
  name: string;
  count: number;
}

export interface HomepageCache {
  generatedAt: string;
  expiresAt: string;
  version: number;
  stats: {
    totalBooks: number;
    totalCollections: number;
    totalCategories: number;
  };
  featured: {
    recent: CachedBook[];
    popular: CachedBook[];
    audiobooks: CachedBook[];
  };
  collections: CachedCollection[];
  categories: CachedCategory[];
  allBooks: CachedBook[];
}

export interface UseHomepageCacheResult {
  cache: HomepageCache | null;
  isLoading: boolean;
  error: Error | null;
  isStale: boolean;
  refetch: () => Promise<void>;
}

// ============================================================================
// Constants
// ============================================================================

// @ts-ignore - Vite env types
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const CACHE_URL = `${SUPABASE_URL}/storage/v1/object/public/public-cache/homepage-cache.json`;

// Local storage key for offline fallback
const LOCAL_CACHE_KEY = 'homepage-cache-v1';

// ============================================================================
// Hook
// ============================================================================

export function useHomepageCache(): UseHomepageCacheResult {
  const [cache, setCache] = useState<HomepageCache | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isStale, setIsStale] = useState(false);

  const fetchCache = async () => {
    if (!SUPABASE_URL) {
      setError(new Error('Supabase URL not configured'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Try to fetch from network with cache-busting for freshness check
      const response = await fetch(CACHE_URL, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cache: ${response.status}`);
      }

      const data: HomepageCache = await response.json();

      // Check if cache is expired
      const now = new Date();
      const expiresAt = new Date(data.expiresAt);
      const stale = now > expiresAt;

      setCache(data);
      setIsStale(stale);

      // Save to local storage for offline fallback
      try {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
      } catch {
        // Ignore localStorage errors (quota exceeded, etc.)
      }
    } catch (err) {
      console.warn('Failed to fetch homepage cache, trying local fallback:', err);

      // Try local storage fallback
      try {
        const localData = localStorage.getItem(LOCAL_CACHE_KEY);
        if (localData) {
          const parsed: HomepageCache = JSON.parse(localData);
          setCache(parsed);
          setIsStale(true); // Mark as stale since we couldn't refresh
          setError(null);
          return;
        }
      } catch {
        // Ignore localStorage errors
      }

      setError(err instanceof Error ? err : new Error('Unknown error'));
      setCache(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCache();
  }, []);

  return {
    cache,
    isLoading,
    error,
    isStale,
    refetch: fetchCache,
  };
}

// ============================================================================
// Utility: Convert cached book to BookData format
// ============================================================================

import type { BookData } from './useBooks';

export function cachedBookToBookData(book: CachedBook): BookData {
  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author || 'Autor Desconhecido',
    coverUrl: book.coverUrl,
    category: book.category,
    categorySlug: book.categorySlug,
    summary: null,
    rating: book.rating,
    duration: null,
    pageCount: null,
    hasAudio: book.hasAudio,
    publishedYear: null,
    isbn: null,
    authorSlug: null,
    tags: [],
    createdAt: new Date().toISOString(),
    content: null,
    status: 'published',
    readingTime: null,
    wordCount: null,
  };
}
