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
      // Fetch collections (tags with tag_type = 'collection')
      const { data, error: fetchError } = await supabase
        .from('tags')
        .select(`
          id,
          slug,
          name,
          description,
          content_tags(count)
        `)
        .eq('tag_type', 'collection')
        .order('name');

      if (fetchError) throw fetchError;

      // Transform to BookCollection format
      const transformedCollections: BookCollection[] = ((data || []) as DbCollectionTag[]).map(
        (tag) => ({
          id: tag.id,
          slug: tag.slug,
          name: tag.name,
          description: tag.description,
          bookCount: tag.content_tags?.[0]?.count || 0,
        })
      );

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
      // Fetch collection tag
      const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select(`
          id,
          slug,
          name,
          description
        `)
        .eq('slug', slug)
        .eq('tag_type', 'collection')
        .single();

      if (tagError) throw tagError;

      const tagRecord = tagData as { id: string; slug: string; name: string; description: string | null };

      // Fetch books in this collection via content_tags join
      const { data: booksData, error: booksError } = await supabase
        .from('contents')
        .select(`
          id,
          slug,
          title,
          content_type,
          status,
          content,
          image_url,
          metadata,
          created_at,
          content_tags!inner(
            tags!inner(id, slug)
          ),
          content_minds(
            role,
            minds(id, slug, name)
          )
        `)
        .eq('content_type', 'book_summary')
        .eq('content_tags.tags.slug', slug);

      if (booksError) throw booksError;

      // Transform books
      const transformedBooks: BookData[] = ((booksData || []) as DbBookContent[]).map((book) => {
        const metadata = book.metadata || {};
        const authorMind = book.content_minds?.find((cm) => cm.role === 'author')?.minds;
        const author = authorMind?.name || metadata.author || 'Autor Desconhecido';

        return {
          id: book.id,
          slug: book.slug,
          title: book.title,
          author,
          authorSlug: authorMind?.slug || null,
          coverUrl: book.image_url,
          content: book.content || null,
          summary: metadata.description || book.content?.substring(0, 300) || null,
          category: metadata.category || null,
          categorySlug: null,
          tags: [],
          hasAudio: metadata.hasAudio || false,
          duration: metadata.duration || null,
          pageCount: metadata.pageCount || null,
          publishedYear: metadata.publishedDate
            ? parseInt(metadata.publishedDate.split('-')[0], 10) || null
            : null,
          isbn: metadata.isbn || null,
          rating: metadata.averageRating || null,
          status: book.status === 'published' ? 'published' : 'draft',
          createdAt: book.created_at,
          readingTime: metadata.reading_time_minutes || null,
          wordCount: metadata.word_count || null,
        };
      });

      setCollection({
        id: tagRecord.id,
        slug: tagRecord.slug,
        name: tagRecord.name,
        description: tagRecord.description,
        bookCount: transformedBooks.length,
      });
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
