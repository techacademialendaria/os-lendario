import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_PSYCHOMETRICS } from '../services/psychometrics';
import type { PsychometricProfile } from '../types/psychometrics';

// Full mind profile data
export interface MindProfile {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  shortBio: string;
  apexScore: number | null;
  primaryLanguage: string | null;
  createdAt: string;
  updatedAt: string;

  // Proficiencies/Expertise
  proficiencies: Array<{
    skillName: string;
    skillCode: string;
    level: number; // 1-10
  }>;

  // Obsessions
  obsessions: Array<{
    name: string;
    intensity: number; // 1-10
    notes: string | null;
  }>;

  // Values
  values: Array<{
    name: string;
    importance: number; // 1-10
    notes: string | null;
  }>;

  // Sources count (for display)
  sourcesCount: number;

  // Derived fields
  status: 'production' | 'progress' | 'draft';
  tier: 1 | 2 | 3;
  signatureSkill: string;
  topExpertise: string[];
  communicationStyle: string[];
  psychometrics?: PsychometricProfile;
  mmos_metadata?: any;
}

// Generate avatar URL from slug
// Priority: 1) DB avatar_url (future), 2) Local image, 3) DiceBear fallback
const generateAvatar = (slug: string, dbAvatarUrl?: string | null): string => {
  if (dbAvatarUrl) {
    return dbAvatarUrl;
  }
  // Use local image from /public/minds-profile-images/{slug}.jpg
  return `/minds-profile-images/${slug}.jpg`;
};

// Derive tier from apex score
const deriveTier = (apexScore: number | null): 1 | 2 | 3 => {
  if (!apexScore) return 3;
  if (apexScore >= 0.85) return 1;
  if (apexScore >= 0.70) return 2;
  return 3;
};

// Derive status from data completeness
const deriveStatus = (
  proficiencies: number,
  obsessions: number,
  values: number
): MindProfile['status'] => {
  const total = proficiencies + obsessions + values;
  if (total >= 8) return 'production';
  if (total >= 3) return 'progress';
  return 'draft';
};

// Derive communication style from obsessions and values
const deriveCommunicationStyle = (
  obsessions: MindProfile['obsessions'],
  values: MindProfile['values']
): string[] => {
  const styles: string[] = [];

  // Check for common patterns
  const allNotes = [
    ...obsessions.map(o => o.notes || ''),
    ...values.map(v => v.notes || '')
  ].join(' ').toLowerCase();

  if (allNotes.includes('direct') || allNotes.includes('pragmati')) styles.push('Direto');
  if (allNotes.includes('honest') || allNotes.includes('truth')) styles.push('Honesto');
  if (allNotes.includes('autoridade') || allNotes.includes('authority')) styles.push('Autoritário');
  if (allNotes.includes('simple') || allNotes.includes('clear')) styles.push('Claro');
  if (allNotes.includes('creative') || allNotes.includes('innov')) styles.push('Inovador');
  if (allNotes.includes('analytic') || allNotes.includes('data')) styles.push('Analítico');

  // Default if none found
  if (styles.length === 0) {
    styles.push('Técnico', 'Estruturado');
  }

  return styles.slice(0, 4);
};

interface UseMindResult {
  mind: MindProfile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useMind(slug: string | null): UseMindResult {
  const [mind, setMind] = useState<MindProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMind = useCallback(async () => {
    if (!slug) {
      setMind(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      // Fetch mind with all related data
      // Filter out soft-deleted minds (deleted_at IS NULL)
      const { data: mindData, error: mindError } = await supabase
        .from('minds')
        .select(`
          *,
          proficiencies:mind_proficiencies(
            level_10,
            skill:skills(name, code)
          ),
          obsessions:mind_obsessions(
            name,
            intensity_10,
            notes
          ),
          values:mind_values(
            name,
            importance_10,
            notes
          )
        `)
        .eq('slug', slug)
        .is('deleted_at', null)
        .single() as { data: any; error: any };

      if (mindError) {
        throw mindError;
      }

      if (!mindData) {
        throw new Error('Mind not found');
      }

      // Get sources count from contents table (via mind_sources project)
      const { data: sourcesProject } = await supabase
        .from('content_projects')
        .select('id')
        .eq('persona_mind_id', mindData.id)
        .eq('project_type', 'mind_sources')
        .single();

      let sourcesCount = 0;
      if (sourcesProject) {
        const { count } = await supabase
          .from('contents')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', sourcesProject.id);
        sourcesCount = count || 0;
      }

      // Transform proficiencies
      const proficiencies = (mindData.proficiencies || [])
        .filter((p: any) => p.skill?.name)
        .map((p: any) => ({
          skillName: p.skill.name,
          skillCode: p.skill.code,
          level: p.level_10
        }))
        .sort((a: any, b: any) => b.level - a.level);

      // Transform obsessions
      const obsessions = (mindData.obsessions || []).map((o: any) => ({
        name: o.name,
        intensity: o.intensity_10,
        notes: o.notes
      })).sort((a: any, b: any) => b.intensity - a.intensity);

      // Transform values
      const values = (mindData.values || []).map((v: any) => ({
        name: v.name,
        importance: v.importance_10,
        notes: v.notes
      })).sort((a: any, b: any) => b.importance - a.importance);

      // Get psychometrics
      const psychometrics = MOCK_PSYCHOMETRICS[mindData.slug] || MOCK_PSYCHOMETRICS[mindData.name];

      const profile: MindProfile = {
        id: mindData.id,
        slug: mindData.slug,
        name: mindData.name,
        avatar: generateAvatar(mindData.slug),
        shortBio: mindData.short_bio || '',
        apexScore: mindData.apex_score,
        primaryLanguage: mindData.primary_language,
        createdAt: mindData.created_at,
        updatedAt: mindData.updated_at,
        proficiencies,
        obsessions,
        values,
        sourcesCount: sourcesCount || 0,
        status: mindData.mmos_metadata?.overrides?.status || deriveStatus(proficiencies.length, obsessions.length, values.length),
        tier: mindData.mmos_metadata?.overrides?.tier ? parseInt(mindData.mmos_metadata.overrides.tier) as 1 | 2 | 3 : deriveTier(mindData.apex_score),
        signatureSkill: mindData.mmos_metadata?.overrides?.signature_skill || psychometrics?.aptitudes.zone_of_genius.title || proficiencies[0]?.skillName || 'Synthetic Mind',
        topExpertise: proficiencies.slice(0, 5).map((p: any) => p.skillName),
        communicationStyle: deriveCommunicationStyle(obsessions, values),
        psychometrics,
        mmos_metadata: mindData.mmos_metadata
      };

      setMind(profile);
    } catch (err) {
      console.error('Error fetching mind:', err);
      setError(err as Error);
      setMind(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchMind();
  }, [fetchMind]);

  return {
    mind,
    loading,
    error,
    refetch: fetchMind
  };
}

export default useMind;
