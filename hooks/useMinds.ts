import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { MindData } from '../components/minds/ui/MindCard';
import { MOCK_PSYCHOMETRICS } from '../services/psychometrics';

// List of slugs that have real avatar images in /public/minds-profile-images/
const MINDS_WITH_AVATAR = new Set([
  'aaron_beck',
  'abilio_diniz',
  'adam_smith',
  'alan_nicolas',
  'alan_watts',
  'albert_einstein',
  'andrej_karpathy',
  'andrew_huberman',
  'andy_grove',
  'arthur_schopenhauer',
  'asker_jeukendrup',
  'alex_hormozi',
  'austin_kleon',
  'ben_horowitz',
  'benjamin_franklin',
  'bj_fogg',
  'bob_proctor',
  'brad_frost',
  'cal_newport',
  'carl_jung',
  'carl_sagan',
  'charles_darwin',
  'charlie_munger',
  'chris_voss',
  'claude_hopkins',
  'claude_shannon',
  'cristiano_ronaldo',
  'dale_carnegie',
  'dan_lok',
  'daniel_kahneman',
  'daniel_pink',
  'david_allen',
  'david_lynch',
  'derek_sivers',
  'donald_knuth',
  'donald_trump',
  'donella_meadows',
  'eckhart_tolle',
  'elon_musk',
  'epictetus',
  'esther_perel',
  'eugene_schwartz',
  'frank_mccourt',
  'gary_halbert',
  'gary_vaynerchuk',
  'gary_vee',
  'geoffrey_hinton',
  'ira_glass',
  'jake_knapp',
  'james_clear',
  'jan_oberhauser_team',
  'jean_paul_sartre',
  'jeff_bezos',
  'jeffrey_gitomer',
  'jesse_enkamp',
  'jesus_cristo',
  'jocko_willink',
  'john_boyd',
  'john_julie_gottman',
  'john_von_neumann',
  'jon_benson',
  'jordan_belfort',
  'jose_amorim',
  'jose_silva',
  'jose-carlos-amorim',
  'julia_cameron',
  'kapil_gupta',
  'krishnamurti',
  'leo_babauta',
  'leo_gura',
  'leonardo_da_vinci',
  'lucy_guo',
  'malcolm_gladwell',
  'marc_andreessen',
  'marcus_aurelius',
  'mark_manson',
  'matt_gray',
  'mestre_brewteco',
  'michael_feathers',
  'marty_cagan',
  'michael_porter',
  'montaigne',
  'morgan_housel',
  'napoleon_hill',
  'nassim_taleb',
  'naval_ravikant',
  'neil_rackham',
  'nikola_tesla',
  'nir_eyal',
  'osho',
  'patrick_collison',
  'paul_graham',
  'pedro_valerio',
  'peter_attia',
  'peter_diamandis',
  'peter_drucker',
  'peter_senge',
  'peter_thiel',
  'phil_jackson',
  'philip_kotler',
  'ram_dass',
  'ramit_sethi',
  'ray_dalio',
  'ray_kurzweil',
  'rhonda_patrick',
  'richard_bandler',
  'richard_feynman',
  'rick_rubin',
  'robert_cialdini',
  'robert_dilts',
  'robert_greene',
  'russell_ackoff',
  'russell_barkley',
  'russel_brunson',
  'ryan_holiday',
  'sadhguru',
  'sam_altman',
  'sam_harris',
  'scott_galloway',
  'sean_ellis',
  'seneca',
  'seth_godin',
  'shane_parrish',
  'simon_sinek',
  'stephen_covey',
  'stephen_king',
  'steve_jobs',
  'steven_pinker',
  'tim_ferriss',
  'tim_grover',
  'tim_urban',
  'tony_robbins',
  'viktor_frankl',
  'w_edwards_deming',
  'walt_disney',
  'winston_churchill',
  'wolfgang_mozart',
  'yuval_harari',
  'zig_ziglar',
]);

// Database mind record
interface DbMind {
  id: string;
  slug: string;
  name: string;
  short_bio: string | null;
  primary_language: string | null;
  privacy_level: string;
  apex_score: number | null;
  created_at: string;
  updated_at: string;
}

// Extended mind with related data
interface DbMindWithRelations extends DbMind {
  mind_tags?: Array<{
    tags: { id: string; name: string } | null;
  }>;
}

// Map database status/completion to UI status
const deriveStatus = (mind: DbMindWithRelations): MindData['status'] => {
  // Check if mind has tags (indicates completion)
  const hasTags = mind.mind_tags && mind.mind_tags.length > 0;

  if (hasTags) {
    return 'production';
  }
  return 'draft';
};

// Calculate progress percentage for minds in progress
const calculateProgress = (mind: DbMindWithRelations): number => {
  let progress = 0;

  // Base fields (20%)
  if (mind.name) progress += 5;
  if (mind.short_bio) progress += 10;
  if (mind.primary_language) progress += 5;

  // Tags (80%)
  const tagCount = mind.mind_tags?.length || 0;
  progress += Math.min(tagCount * 10, 80);

  return Math.min(progress, 100);
};

// Generate avatar URL from slug
// Priority: 1) DB avatar_url (future), 2) Local image, 3) DiceBear fallback
const generateAvatar = (slug: string, dbAvatarUrl?: string | null): string => {
  // Future: if DB has avatar_url, use it
  if (dbAvatarUrl) {
    return dbAvatarUrl;
  }

  // Use local image from /public/minds-profile-images/{slug}.jpg
  // The slug format matches image filenames (e.g., carl_jung, albert_einstein)
  return `/minds-profile-images/${slug}.jpg`;
};

// DiceBear fallback URL for missing images
const getDiceBearFallback = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

// Extract expertise from tags
const extractExpertise = (mindTags: DbMindWithRelations['mind_tags']): string[] => {
  if (!mindTags || mindTags.length === 0) {
    return ['Knowledge Base'];
  }

  return mindTags
    .filter((mt) => mt.tags?.name)
    .slice(0, 5)
    .map((mt) => mt.tags!.name);
};

// Extract signature skill (first tag)
const extractSignatureSkill = (mindTags: DbMindWithRelations['mind_tags']): string => {
  if (!mindTags || mindTags.length === 0) {
    return 'Synthetic Mind';
  }

  return mindTags[0]?.tags?.name || 'Synthetic Mind';
};

// Derive taxonomy from tags
const deriveTaxonomy = (mindTags: DbMindWithRelations['mind_tags']): MindData['taxonomy'] => {
  // Default taxonomy
  const defaultTaxonomy = {
    category: 'knowledge',
    roles: ['expert'],
  };

  if (!mindTags || mindTags.length === 0) {
    return defaultTaxonomy;
  }

  // Extract tag names as roles
  const roles = mindTags
    .filter((mt) => mt.tags?.name)
    .slice(0, 3)
    .map((mt) => mt.tags!.name.toLowerCase().replace(/\s+/g, '-'));

  return {
    category: 'synthetic_mind',
    roles: roles.length > 0 ? roles : ['expert'],
  };
};

// Transform database mind to UI MindData
const transformToMindData = (dbMind: DbMindWithRelations): MindData => {
  const status = deriveStatus(dbMind);
  const progressPercent = status === 'progress' ? calculateProgress(dbMind) : undefined;

  // Try to find psychometric data
  const psychometrics =
    MOCK_PSYCHOMETRICS[dbMind.slug] || MOCK_PSYCHOMETRICS[dbMind.name] || undefined;

  // Use psychometric signature skill if available, otherwise existing logic
  const signatureSkill =
    psychometrics?.aptitudes.zone_of_genius.title || extractSignatureSkill(dbMind.mind_tags);

  // Check if slug has a real avatar image
  const hasRealAvatar = MINDS_WITH_AVATAR.has(dbMind.slug);

  // Clean name (remove surrounding quotes if present)
  const cleanName = dbMind.name.replace(/^["']|["']$/g, '');

  return {
    id: dbMind.id,
    name: cleanName,
    slug: dbMind.slug,
    avatar: generateAvatar(dbMind.slug),
    hasRealAvatar,
    description:
      psychometrics?.philosophy.core ||
      dbMind.short_bio ||
      `${cleanName} - Mente sintética em desenvolvimento.`,
    status,
    signatureSkill,
    expertise: extractExpertise(dbMind.mind_tags),
    differentials: ['Clone cognitivo treinado', 'Base de conhecimento estruturada'],
    taxonomy: deriveTaxonomy(dbMind.mind_tags),
    progressPercent,
    psychometrics, // Attach the full profile
  };
};

interface UseMindsResult {
  minds: MindData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isUsingMockData: boolean;
  totalMinds: number;
}

export function useMinds(): UseMindsResult {
  const [minds, setMinds] = useState<MindData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchMinds = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no minds available');
      setMinds([]);
      setIsUsingMockData(false);
      setLoading(false);
      return;
    }

    try {
      // Fetch minds with related tags and profiles
      // Filter out soft-deleted minds (deleted_at IS NULL)
      const { data: mindsData, error: mindsError } = await supabase
        .from('minds')
        .select(
          `
          *,
          mind_tags(
            tags(id, name)
          )
        `
        )
        .eq('privacy_level', 'public')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (mindsError) {
        throw mindsError;
      }

      const transformedMinds = (mindsData || []).map(transformToMindData);
      setMinds(transformedMinds);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Error fetching minds:', err);
      setError(err as Error);
      setMinds([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinds();
  }, [fetchMinds]);

  return {
    minds,
    loading,
    error,
    refetch: fetchMinds,
    isUsingMockData,
    totalMinds: minds.length,
  };
}

export default useMinds;
