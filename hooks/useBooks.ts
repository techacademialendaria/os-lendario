import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { stripMarkdown } from '../lib/utils';

// Book data structure for UI
export interface BookData {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string | null;
  coverUrl: string | null;
  content: string | null;
  summary: string | null;
  category: string | null;
  categorySlug: string | null;
  tags: Array<{ slug: string; name: string }>;
  hasAudio: boolean;
  duration: string | null;
  pageCount: number | null;
  publishedYear: number | null;
  isbn: string | null;
  rating: number | null;
  status: 'draft' | 'published';
  createdAt: string;
  readingTime: number | null;
  wordCount: number | null;
}

// View record structure (from v_books_pt / v_books_by_category)
interface DbBookView {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
  // Pre-joined author fields
  author_id: string | null;
  author_slug: string | null;
  author_name: string | null;
  author_avatar: string | null;
  // Extracted metadata fields
  language: string | null;
  rating: number | null;
  has_audio: boolean | null;
  page_count: number | null;
  duration: string | null;
  description: string | null;
  // Pre-joined category fields
  category_slug: string | null;
  category_name: string | null;
  // From v_books_by_category (optional)
  tag_slug?: string;
  tag_name?: string;
}

// V1: Only Portuguese books - no deduplication needed

// Transform view record to UI BookData (simplified - data already joined)
const transformViewToBookData = (row: DbBookView): BookData => {
  const metadata = (row.metadata || {}) as Record<string, unknown>;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    // Author already joined in view
    author: row.author_name || 'Autor Desconhecido',
    authorSlug: row.author_slug,
    coverUrl: row.image_url,
    content: row.content,
    // Description already extracted in view
    summary: row.description
      ? stripMarkdown(row.description)
      : row.content
        ? stripMarkdown(row.content.substring(0, 300))
        : null,
    // Category already joined in view
    category: row.category_name,
    categorySlug: row.category_slug,
    tags: [], // Tags not needed for listing
    // Metadata already extracted in view
    hasAudio: row.has_audio || false,
    duration: row.duration,
    pageCount: row.page_count,
    publishedYear: metadata.publishedDate
      ? parseInt(String(metadata.publishedDate).split('-')[0], 10) || null
      : null,
    isbn: (metadata.isbn as string) || null,
    rating: row.rating,
    status: row.status === 'published' ? 'published' : 'draft',
    createdAt: row.created_at,
    readingTime: (metadata.reading_time_minutes as number) || null,
    wordCount: (metadata.word_count as number) || null,
  };
};

interface UseBooksOptions {
  limit?: number;
  categorySlug?: string;
}

interface UseBooksResult {
  books: BookData[];
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  totalBooks: number;
}

const DEFAULT_PAGE_SIZE = 12;

export function useBooks(options: UseBooksOptions = {}): UseBooksResult {
  const { limit = DEFAULT_PAGE_SIZE, categorySlug } = options;
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchBooks = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setOffset(0);
    }
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no books available');
      setBooks([]);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    try {
      const currentOffset = isLoadMore ? offset : 0;

      // Use optimized view (v_books_pt already filters PT + published)
      // For category filter, use v_books_by_category view
      const viewName = categorySlug ? 'v_books_by_category' : 'v_books_pt';

      let query = supabase
        .from(viewName)
        .select('*')
        .order('created_at', { ascending: false })
        .range(currentOffset, currentOffset + limit - 1);

      // Add category filter if provided (single query now!)
      if (categorySlug) {
        query = query.eq('tag_slug', categorySlug);
      }

      const { data: booksData, error: booksError } = await query;

      if (booksError) {
        throw booksError;
      }

      // V1: No deduplication needed - only PT books, data already joined in view
      const transformedBooks = (booksData || []).map(transformViewToBookData);

      // Check if there are more books
      setHasMore(transformedBooks.length === limit);

      if (isLoadMore) {
        setBooks(prev => [...prev, ...transformedBooks]);
        setOffset(currentOffset + limit);
      } else {
        setBooks(transformedBooks);
        setOffset(limit);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err as Error);
      if (!isLoadMore) {
        setBooks([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [limit, categorySlug, offset]);

  const loadMore = useCallback(async () => {
    if (!loadingMore && hasMore) {
      await fetchBooks(true);
    }
  }, [fetchBooks, loadingMore, hasMore]);

  useEffect(() => {
    fetchBooks(false);
  }, [categorySlug]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    books,
    loading,
    loadingMore,
    error,
    refetch: () => fetchBooks(false),
    loadMore,
    hasMore,
    totalBooks: books.length,
  };
}

// Hook for single book details
interface UseBookResult {
  book: BookData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBook(slug: string): UseBookResult {
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = useCallback(async () => {
    if (!slug) {
      setBook(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setBook(null);
      setLoading(false);
      return;
    }

    try {
      // Use optimized view for single book lookup
      const { data: bookData, error: bookError } = await supabase
        .from('v_books_pt')
        .select('*')
        .eq('slug', slug)
        .single();

      if (bookError) {
        throw bookError;
      }

      setBook(bookData ? transformViewToBookData(bookData) : null);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err as Error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return {
    book,
    loading,
    error,
    refetch: fetchBook,
  };
}

// Hook for book categories (tags with type book_category)
interface UseBookCategoriesResult {
  categories: Array<{ slug: string; name: string; count: number }>;
  loading: boolean;
  error: Error | null;
}

export function useBookCategories(): UseBookCategoriesResult {
  const [categories, setCategories] = useState<
    Array<{ slug: string; name: string; count: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isSupabaseConfigured()) {
        setCategories([]);
        setLoading(false);
        return;
      }

      try {
        // Use optimized view (already has PT book counts)
        const { data, error: catError } = await supabase
          .from('v_categories_with_count')
          .select('slug, name, book_count');

        if (catError) throw catError;

        const categoriesWithCount = (data || []).map((cat) => ({
          slug: cat.slug,
          name: cat.name,
          count: cat.book_count,
        }));

        setCategories(categoriesWithCount);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook for quick book search (lightweight, for dropdown autocomplete)
interface UseBookSearchResult {
  results: BookData[];
  loading: boolean;
  search: (query: string) => void;
  clearResults: () => void;
}

export function useBookSearch(): UseBookSearchResult {
  const [results, setResults] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback((query: string) => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query || query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      if (!isSupabaseConfigured()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        interface SearchResult {
          id: string;
          slug: string;
          title: string;
          image_url: string | null;
          metadata: { author?: string } | null;
          content_minds: Array<{
            role: string;
            minds: { id: string; slug: string; name: string } | null;
          }> | null;
        }

        // Search by title only (more reliable) - client-side will filter by author too
        const { data, error } = await supabase
          .from('contents')
          .select(`
            id,
            slug,
            title,
            image_url,
            metadata,
            content_minds(role, minds(id, slug, name))
          `)
          .eq('content_type', 'book_summary')
          .eq('status', 'published')
          .ilike('title', `%${query}%`)
          .limit(10);

        if (error) throw error;

        // Also search by author in metadata (client-side for reliability)
        const searchLower = query.toLowerCase();
        const transformedResults = ((data || []) as SearchResult[])
          .map((item) => {
            const authorMind = item.content_minds?.find((cm) => cm.role === 'author')?.minds;
            const metadata = item.metadata || {};
            return {
              id: item.id,
              slug: item.slug,
              title: item.title,
              author: authorMind?.name || metadata.author || 'Autor Desconhecido',
              authorSlug: authorMind?.slug || null,
              coverUrl: item.image_url,
            } as BookData;
          })
          .filter((book) =>
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower)
          )
          .slice(0, 6);

        setResults(transformedResults);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  }, []);

  return { results, loading, search, clearResults };
}

// Hook for featured books sections (with specific limits)
interface UseFeaturedBooksResult {
  recentBooks: BookData[];
  popularBooks: BookData[];
  audiobookBooks: BookData[];
  loading: boolean;
}

export function useFeaturedBooks(): UseFeaturedBooksResult {
  const [recentBooks, setRecentBooks] = useState<BookData[]>([]);
  const [popularBooks, setPopularBooks] = useState<BookData[]>([]);
  const [audiobookBooks, setAudiobookBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        // V1: Use optimized view (already filtered PT + published + joined)
        const [recentResult, popularResult, audioResult] = await Promise.all([
          // Recent books
          supabase
            .from('v_books_pt')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(2),

          // Popular books by rating
          supabase
            .from('v_books_pt')
            .select('*')
            .not('rating', 'is', null)
            .order('rating', { ascending: false })
            .limit(5),

          // Audiobooks
          supabase
            .from('v_books_pt')
            .select('*')
            .eq('has_audio', true)
            .limit(5),
        ]);

        // Transform using view structure
        setRecentBooks((recentResult.data || []).map(transformViewToBookData));
        setPopularBooks((popularResult.data || []).map(transformViewToBookData));
        setAudiobookBooks((audioResult.data || []).map(transformViewToBookData));
      } catch (err) {
        console.error('Error fetching featured books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { recentBooks, popularBooks, audiobookBooks, loading };
}

// Hook for total book count (lightweight)
export function useBookCount(): { count: number; loading: boolean } {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        // Use optimized view (already filtered to PT + published)
        const { count: totalCount } = await supabase
          .from('v_books_pt')
          .select('*', { count: 'exact', head: true });

        setCount(totalCount || 0);
      } catch (err) {
        console.error('Error fetching book count:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading };
}

export default useBooks;
