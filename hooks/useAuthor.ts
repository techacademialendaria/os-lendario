import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Author data structure
export interface AuthorData {
  id: string;
  slug: string;
  name: string;
  shortBio: string | null;
  avatarUrl: string | null;
  bookCount: number;
  metadata: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    wikipedia?: string;
    nationality?: string;
    birthYear?: number;
    deathYear?: number;
    occupation?: string[];
  } | null;
}

// Database response type
interface DbMind {
  id: string;
  slug: string;
  name: string;
  short_bio: string | null;
  avatar_url: string | null;
  metadata: Record<string, unknown> | null;
  content_minds: { count: number }[];
}

interface UseAuthorResult {
  author: AuthorData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAuthor(slug: string | null): UseAuthorResult {
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuthor = useCallback(async () => {
    if (!slug) {
      setAuthor(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setAuthor(null);
      setLoading(false);
      return;
    }

    try {
      // First, get the mind/author data
      const { data, error: fetchError } = await supabase
        .from('minds')
        .select(
          `
          id,
          slug,
          name,
          short_bio,
          avatar_url,
          metadata
        `
        )
        .eq('slug', slug)
        .is('deleted_at', null)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // Not found
          setAuthor(null);
        } else {
          throw fetchError;
        }
      } else {
        const mind = data as Omit<DbMind, 'content_minds'>;
        const metadata = mind.metadata || {};

        // Count only book_summary contents for this author
        const { count: bookCount } = await supabase
          .from('content_minds')
          .select('contents!inner(content_type)', { count: 'exact', head: true })
          .eq('mind_id', mind.id)
          .eq('contents.content_type', 'book_summary');

        setAuthor({
          id: mind.id,
          slug: mind.slug,
          name: mind.name,
          shortBio: mind.short_bio,
          avatarUrl: mind.avatar_url,
          bookCount: bookCount || 0,
          metadata: {
            website: metadata.website as string | undefined,
            twitter: metadata.twitter as string | undefined,
            linkedin: metadata.linkedin as string | undefined,
            wikipedia: metadata.wikipedia as string | undefined,
            nationality: metadata.nationality as string | undefined,
            birthYear: metadata.birth_year as number | undefined,
            deathYear: metadata.death_year as number | undefined,
            occupation: metadata.occupation as string[] | undefined,
          },
        });
      }
    } catch (err) {
      console.error('Error fetching author:', err);
      setError(err as Error);
      setAuthor(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  return {
    author,
    loading,
    error,
    refetch: fetchAuthor,
  };
}

export default useAuthor;
