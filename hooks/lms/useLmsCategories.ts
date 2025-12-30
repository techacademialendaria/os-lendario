/**
 * useLmsCategories Hook
 *
 * Fetch course categories for the LMS.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export interface LmsCategory {
  id: number;
  name: string;
  slug: string;
}

interface UseLmsCategoriesResult {
  categories: LmsCategory[];
  loading: boolean;
  error: Error | null;
}

export function useLmsCategories(): UseLmsCategoriesResult {
  const [categories, setCategories] = useState<LmsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      type TagResult = { id: number; name: string; slug: string };

      const { data, error: queryError } = (await supabase
        .from('tags')
        .select('id, name, slug')
        .eq('tag_type', 'course_category')
        .order('name')) as { data: TagResult[] | null; error: any };

      if (queryError) throw queryError;

      setCategories(
        (data || []).map((t) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
        }))
      );
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err as Error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error };
}

export default useLmsCategories;
