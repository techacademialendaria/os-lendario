import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// List of slugs that have real avatar images in /public/minds-profile-images/
// Same list as in useMinds.ts - SINGLE SOURCE OF TRUTH
const MINDS_WITH_AVATAR = new Set([
  'aaron_beck', 'abilio_diniz', 'adam_smith', 'alan_nicolas', 'alan_watts', 'albert_einstein',
  'andrej_karpathy', 'andrew_huberman', 'andy_grove', 'arthur_schopenhauer', 'asker_jeukendrup',
  'alex_hormozi', 'austin_kleon', 'ben_horowitz', 'benjamin_franklin', 'bj_fogg', 'bob_proctor', 'brad_frost',
  'cal_newport', 'carl_jung', 'carl_sagan', 'charles_darwin', 'charlie_munger',
  'chris_voss', 'claude_hopkins', 'claude_shannon', 'cristiano_ronaldo', 'dale_carnegie',
  'dan_lok', 'daniel_kahneman', 'daniel_pink', 'david_allen', 'david_lynch',
  'derek_sivers', 'donald_knuth', 'donald_trump', 'donella_meadows', 'eckhart_tolle',
  'elon_musk', 'epictetus', 'esther_perel', 'eugene_schwartz', 'frank_mccourt',
  'gary_halbert', 'gary_vaynerchuk', 'gary_vee', 'geoffrey_hinton', 'ira_glass',
  'jake_knapp', 'james_clear', 'jan_oberhauser_team', 'jean_paul_sartre', 'jeff_bezos',
  'jeffrey_gitomer', 'jesse_enkamp', 'jesus_cristo', 'jocko_willink', 'john_boyd',
  'john_julie_gottman', 'john_von_neumann', 'jon_benson', 'jordan_belfort', 'jose_amorim', 'jose_silva',
  'jose-carlos-amorim', 'julia_cameron', 'kapil_gupta', 'krishnamurti', 'leo_babauta',
  'leo_gura', 'leonardo_da_vinci', 'lucy_guo', 'malcolm_gladwell', 'marc_andreessen',
  'marcus_aurelius', 'mark_manson', 'matt_gray', 'mestre_brewteco', 'michael_feathers',
  'marty_cagan', 'michael_porter', 'montaigne', 'morgan_housel', 'napoleon_hill', 'nassim_taleb',
  'naval_ravikant', 'neil_rackham', 'nikola_tesla', 'nir_eyal', 'osho',
  'patrick_collison', 'paul_graham', 'pedro_valerio', 'peter_attia', 'peter_diamandis', 'peter_drucker',
  'peter_senge', 'peter_thiel', 'phil_jackson', 'philip_kotler', 'ram_dass',
  'ramit_sethi', 'ray_dalio', 'ray_kurzweil', 'rhonda_patrick', 'richard_bandler',
  'richard_feynman', 'rick_rubin', 'robert_cialdini', 'robert_dilts', 'robert_greene',
  'russell_ackoff', 'russell_barkley', 'russel_brunson', 'ryan_holiday', 'sadhguru', 'sam_altman',
  'sam_harris', 'scott_galloway', 'sean_ellis', 'seneca', 'seth_godin',
  'shane_parrish', 'simon_sinek', 'stephen_covey', 'stephen_king', 'steve_jobs',
  'steven_pinker', 'tim_ferriss', 'tim_grover', 'tim_urban', 'tony_robbins',
  'viktor_frankl', 'w_edwards_deming', 'walt_disney', 'winston_churchill', 'wolfgang_mozart',
  'yuval_harari', 'zig_ziglar'
]);

/**
 * Simple, lightweight mind for listing (Arena, search, etc)
 */
export interface PublicMind {
  id: string;
  slug: string;
  name: string;
  shortBio: string;
  apexScore: number | null;
  avatar: string;
  hasRealAvatar: boolean;
}

interface UsePublicMindsResult {
  minds: PublicMind[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Fetch all public minds for listing/selection purposes
 * Used by: Arena Create, Mind Selection, Debates, etc.
 *
 * Features:
 * - Single source of truth for mind data
 * - Avatar fallback to local images
 * - Optimized query (no relational data)
 * - Real-time sorting by updated_at
 */
export function usePublicMinds(): UsePublicMindsResult {
  const [minds, setMinds] = useState<PublicMind[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMinds = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      const { data: mindsData, error: mindsError } = await supabase
        .from('minds')
        .select('id, slug, name, short_bio, apex_score')
        .eq('privacy_level', 'public')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (mindsError) {
        throw mindsError;
      }

      const transformedMinds = (mindsData || []).map((m: any) => {
        const hasRealAvatar = MINDS_WITH_AVATAR.has(m.slug);
        // Normalize slug: replace hyphens with underscores for file lookup
        const normalizedSlug = m.slug.replace(/-/g, '_');
        return {
          id: m.id,
          slug: m.slug,
          name: (m.name || '').replace(/^["']|["']$/g, '') || m.slug,
          shortBio: m.short_bio || '',
          apexScore: m.apex_score,
          avatar: `/minds-profile-images/${normalizedSlug}.jpg`,
          hasRealAvatar,
        };
      });

      setMinds(transformedMinds);
    } catch (err) {
      console.error('Error fetching public minds:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch minds'));
      setMinds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinds();
  }, [fetchMinds]);

  return { minds, loading, error, refetch: fetchMinds };
}
