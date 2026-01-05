/**
 * useHighlights - Hook for managing book highlights
 *
 * Uses the mind_content_interactions system with interaction_type = 'highlight'
 * Each highlight is a separate row with the text stored in value JSONB.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

// ============================================================================
// Types
// ============================================================================

export interface Highlight {
  id: string;
  text: string;
  note?: string;
  chapter?: string;
  position?: number;
  createdAt: string;
}

export interface BookWithHighlights {
  contentId: string;
  slug: string;
  title: string;
  author: string;
  subtitle?: string;
  imageUrl: string | null;
  highlights: Highlight[];
}

interface UseHighlightsResult {
  book: BookWithHighlights | null;
  highlights: Highlight[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  addHighlight: (text: string, note?: string, chapter?: string, position?: number) => Promise<string>;
  updateHighlight: (highlightId: string, updates: Partial<Pick<Highlight, 'text' | 'note'>>) => Promise<void>;
  deleteHighlight: (highlightId: string) => Promise<void>;
  copyAllHighlights: () => string;
}

// Database response types
interface ContentMindRow {
  minds: { name: string } | null;
}

interface ContentRow {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  metadata: Record<string, unknown> | null;
  content_minds: ContentMindRow[] | null;
}

interface UserProfileRow {
  mind_id: string | null;
}

interface InteractionRow {
  id: string;
  value: Record<string, unknown> | null;
  created_at: string;
}

interface HighlightWithContentRow {
  content_id: string;
  created_at: string;
  contents: ContentRow;
}

// ============================================================================
// Hook: useHighlights - Get highlights for a specific book
// ============================================================================

export function useHighlights(slug: string): UseHighlightsResult {
  const { user } = useAuth();
  const [book, setBook] = useState<BookWithHighlights | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHighlights = useCallback(async () => {
    if (!isSupabaseConfigured() || !slug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get content info by slug
      const { data: contentData, error: contentError } = await supabase
        .from('contents')
        .select(`
          id,
          slug,
          title,
          image_url,
          metadata,
          content_minds (
            minds (
              name
            )
          )
        `)
        .eq('slug', slug)
        .single();

      if (contentError) throw contentError;
      if (!contentData) throw new Error('Book not found');

      const content = contentData as unknown as ContentRow;
      const contentId = content.id;
      const author = content.content_minds?.[0]?.minds?.name || 'Unknown';
      const metadata = (content.metadata as Record<string, unknown>) || {};

      // Get user's mind_id
      let mindId: string | null = null;
      if (user?.id) {
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('mind_id')
          .eq('id', user.id)
          .single();
        const profile = profileData as unknown as UserProfileRow | null;
        mindId = profile?.mind_id || null;
      }

      // Fetch highlights for this book and user
      let highlightsData: Highlight[] = [];
      if (mindId) {
        const { data: interactionsData, error: interactionsError } = await supabase
          .from('mind_content_interactions')
          .select('id, value, created_at')
          .eq('mind_id', mindId)
          .eq('content_id', contentId)
          .eq('interaction_type', 'highlight')
          .order('created_at', { ascending: true });

        if (interactionsError) throw interactionsError;

        const interactions = (interactionsData || []) as unknown as InteractionRow[];
        highlightsData = interactions.map((row) => {
          const value = row.value || {};
          return {
            id: row.id,
            text: (value.text as string) || '',
            note: value.note as string | undefined,
            chapter: value.chapter as string | undefined,
            position: value.position as number | undefined,
            createdAt: row.created_at,
          };
        });
      }

      setBook({
        contentId,
        slug: content.slug,
        title: content.title,
        author,
        subtitle: metadata.subtitle as string | undefined,
        imageUrl: content.image_url || null,
        highlights: highlightsData,
      });
      setHighlights(highlightsData);
    } catch (err) {
      console.error('[useHighlights] Error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch highlights'));
    } finally {
      setIsLoading(false);
    }
  }, [slug, user?.id]);

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  const addHighlight = useCallback(async (
    text: string,
    note?: string,
    chapter?: string,
    position?: number
  ): Promise<string> => {
    if (!user?.id || !book?.contentId) {
      throw new Error('User not authenticated or book not loaded');
    }

    // Build metadata for the highlight
    const metadata = {
      ...(note && { note }),
      ...(chapter && { chapter }),
      ...(position !== undefined && { position }),
    };

    // Use the add_note RPC function which handles multiple highlights per content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: rpcError } = await (supabase.rpc as any)('add_note', {
      p_content_id: book.contentId,
      p_text: text,
      p_note_type: 'highlight',
      p_metadata: metadata,
    });

    if (rpcError) throw rpcError;

    const result = data as { note_id: string; type: string };
    const newHighlight: Highlight = {
      id: result.note_id,
      text,
      note,
      chapter,
      position,
      createdAt: new Date().toISOString(),
    };

    setHighlights((prev) => [...prev, newHighlight]);

    return result.note_id;
  }, [user?.id, book?.contentId]);

  const updateHighlight = useCallback(async (
    highlightId: string,
    updates: Partial<Pick<Highlight, 'text' | 'note'>>
  ) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    // Get current highlight to merge values
    const currentHighlight = highlights.find((h) => h.id === highlightId);
    if (!currentHighlight) {
      throw new Error('Highlight not found');
    }

    const newValue = {
      text: updates.text ?? currentHighlight.text,
      ...(updates.note !== undefined && { note: updates.note }),
      ...(currentHighlight.chapter && { chapter: currentHighlight.chapter }),
      ...(currentHighlight.position !== undefined && { position: currentHighlight.position }),
    };

    const updatePayload = { value: newValue, updated_at: new Date().toISOString() };

    const { error: updateError } = await supabase
      .from('mind_content_interactions')
      .update(updatePayload as never)
      .eq('id', highlightId);

    if (updateError) throw updateError;

    setHighlights((prev) =>
      prev.map((h) =>
        h.id === highlightId
          ? { ...h, ...updates }
          : h
      )
    );
  }, [user?.id, highlights]);

  const deleteHighlight = useCallback(async (highlightId: string) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const { error: deleteError } = await supabase
      .from('mind_content_interactions')
      .delete()
      .eq('id', highlightId);

    if (deleteError) throw deleteError;

    setHighlights((prev) => prev.filter((h) => h.id !== highlightId));
  }, [user?.id]);

  const copyAllHighlights = useCallback(() => {
    if (!book || highlights.length === 0) return '';

    const lines = [
      `# ${book.title}`,
      `**${book.author}**`,
      '',
      '---',
      '',
      '## Highlights',
      '',
      ...highlights.map((h, i) => {
        let text = `> ${h.text}`;
        if (h.note) {
          text += `\n\n_Note: ${h.note}_`;
        }
        if (h.chapter) {
          text += `\n\n— ${h.chapter}`;
        }
        return text + (i < highlights.length - 1 ? '\n' : '');
      }),
    ];

    return lines.join('\n');
  }, [book, highlights]);

  return {
    book,
    highlights,
    isLoading,
    error,
    refetch: fetchHighlights,
    addHighlight,
    updateHighlight,
    deleteHighlight,
    copyAllHighlights,
  };
}

// ============================================================================
// Hook: useAllHighlights - Get all highlights across all books for a user
// ============================================================================

interface BookHighlightsSummary {
  contentId: string;
  slug: string;
  title: string;
  author: string;
  imageUrl: string | null;
  highlightCount: number;
  lastHighlightAt: string | null;
}

interface UseAllHighlightsResult {
  books: BookHighlightsSummary[];
  totalHighlights: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAllHighlights(): UseAllHighlightsResult {
  const { user } = useAuth();
  const [books, setBooks] = useState<BookHighlightsSummary[]>([]);
  const [totalHighlights, setTotalHighlights] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllHighlights = useCallback(async () => {
    if (!isSupabaseConfigured() || !user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get mind_id
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('mind_id')
        .eq('id', user.id)
        .single();

      const profile = profileData as unknown as UserProfileRow | null;
      if (!profile?.mind_id) {
        setBooks([]);
        setTotalHighlights(0);
        setIsLoading(false);
        return;
      }

      // Get all highlights grouped by content
      const { data: highlightsData, error: highlightsError } = await supabase
        .from('mind_content_interactions')
        .select(`
          content_id,
          created_at,
          contents (
            id,
            slug,
            title,
            image_url,
            metadata,
            content_minds (
              minds (
                name
              )
            )
          )
        `)
        .eq('mind_id', profile.mind_id)
        .eq('interaction_type', 'highlight')
        .order('created_at', { ascending: false });

      if (highlightsError) throw highlightsError;

      const highlights = (highlightsData || []) as unknown as HighlightWithContentRow[];

      // Group by content
      const groupedMap = new Map<string, {
        content: ContentRow;
        count: number;
        lastAt: string;
      }>();

      for (const row of highlights) {
        // Skip if content is null (orphaned highlight)
        if (!row.contents) continue;

        const contentId = row.content_id;
        const existing = groupedMap.get(contentId);
        if (existing) {
          existing.count++;
        } else {
          groupedMap.set(contentId, {
            content: row.contents,
            count: 1,
            lastAt: row.created_at,
          });
        }
      }

      const summaries: BookHighlightsSummary[] = [];
      for (const [contentId, data] of groupedMap) {
        const content = data.content;
        const author = content.content_minds?.[0]?.minds?.name || 'Unknown';

        summaries.push({
          contentId,
          slug: content.slug,
          title: content.title,
          author,
          imageUrl: content.image_url || null,
          highlightCount: data.count,
          lastHighlightAt: data.lastAt,
        });
      }

      // Sort by last highlight
      summaries.sort((a, b) => {
        const dateA = a.lastHighlightAt ? new Date(a.lastHighlightAt).getTime() : 0;
        const dateB = b.lastHighlightAt ? new Date(b.lastHighlightAt).getTime() : 0;
        return dateB - dateA;
      });

      setBooks(summaries);
      setTotalHighlights(highlights.length);
    } catch (err) {
      console.error('[useAllHighlights] Error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch highlights'));
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAllHighlights();
  }, [fetchAllHighlights]);

  return {
    books,
    totalHighlights,
    isLoading,
    error,
    refetch: fetchAllHighlights,
  };
}
