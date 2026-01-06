import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BookData } from './useBooks';

// Collection data structure
export interface BookCollection {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  bookCount: number;
}

// Database response types
interface DbCollectionTag {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  content_tags: Array<{ count: number }>;
}

interface DbBookContent {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  status: string;
  content: string | null;
  image_url: string | null;
  metadata: {
    author?: string;
    description?: string;
    category?: string;
    pageCount?: number;
    publishedDate?: string;
    isbn?: string;
    averageRating?: number;
    duration?: string;
    hasAudio?: boolean;
    word_count?: number;
    reading_time_minutes?: number;
  } | null;
  created_at: string;
  content_tags: Array<{
    tags: { id: string; slug: string } | null;
  }>;
  content_minds?: Array<{
    role: string;
    minds: { id: string; slug: string; name: string } | null;
  }>;
}

// Hook to fetch all book collections
interface UseBookCollectionsResult {
  collections: BookCollection[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBookCollections(): UseBookCollectionsResult {
  const [collections, setCollections] = useState<BookCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no collections available');
      setCollections([]);
      setLoading(false);
      return;
    }

    try {
      // Use optimized view (already has PT book counts)
      const { data, error: fetchError } = await supabase
        .from('v_collections_with_count')
        .select('*');

      if (fetchError) throw fetchError;

      // Transform to BookCollection format
      const transformedCollections: BookCollection[] = (data || []).map((row) => ({
        id: String(row.id),
        slug: row.slug,
        name: row.name,
        description: row.description,
        bookCount: row.book_count,
      }));

      setCollections(transformedCollections);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError(err as Error);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
  };
}

// Hook to fetch a single collection with its books
interface UseBookCollectionResult {
  collection: BookCollection | null;
  books: BookData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBookCollection(slug: string): UseBookCollectionResult {
  const [collection, setCollection] = useState<BookCollection | null>(null);
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollection = useCallback(async () => {
    if (!slug) {
      setCollection(null);
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setCollection(null);
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      // Use optimized view - SINGLE query for collection + books!
      const { data: booksData, error: booksError } = await supabase
        .from('v_books_by_collection')
        .select('*')
        .eq('tag_slug', slug);

      if (booksError) throw booksError;

      // Transform books using view structure
      const transformedBooks: BookData[] = (booksData || []).map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        author: row.author_name || 'Autor Desconhecido',
        authorSlug: row.author_slug,
        coverUrl: row.image_url,
        content: row.content,
        summary: row.description || row.content?.substring(0, 300) || null,
        category: row.category_name,
        categorySlug: row.category_slug,
        tags: [],
        hasAudio: row.has_audio || false,
        duration: row.duration,
        pageCount: row.page_count,
        publishedYear: null,
        isbn: null,
        rating: row.rating,
        status: row.status === 'published' ? 'published' : 'draft',
        createdAt: row.created_at,
        readingTime: null,
        wordCount: null,
      }));

      // Get collection info from first book row (or fetch separately if no books)
      if (booksData && booksData.length > 0) {
        setCollection({
          id: String(booksData[0].tag_id),
          slug: booksData[0].tag_slug,
          name: booksData[0].tag_name,
          description: booksData[0].tag_description || null,
          bookCount: transformedBooks.length,
        });
      } else {
        // Fetch collection info even if no books
        const { data: collData } = await supabase
          .from('v_collections_with_count')
          .select('*')
          .eq('slug', slug)
          .single();

        if (collData) {
          setCollection({
            id: String(collData.id),
            slug: collData.slug,
            name: collData.name,
            description: collData.description,
            bookCount: 0,
          });
        }
      }
      setBooks(transformedBooks);
    } catch (err) {
      console.error('Error fetching collection:', err);
      setError(err as Error);
      setCollection(null);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return {
    collection,
    books,
    loading,
    error,
    refetch: fetchCollection,
  };
}

export default useBookCollections;
