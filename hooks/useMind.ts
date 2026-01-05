/**
 * useMind Hook
 *
 * Fetch a single mind profile by ID or slug with full psychological and proficiency data.
 * Includes avatar, expertise, obsessions, values, and psychometric profiling.
 *
 * @param mindIdOrSlug - The mind ID (slug format like "john-doe") to fetch
 * @returns Object containing:
 *   - mind: MindProfile | null - The fetched mind data
 *   - isLoading: boolean - true while fetching
 *   - error: Error | null - Error object if fetch failed
 *   - refetch: () => Promise<void> - Function to manually re-fetch
 *
 * @example
 * const { mind, isLoading, error } = useMind('albert-einstein');
 *
 * if (error) return <ErrorMessage error={error} />;
 * if (isLoading) return <LoadingSpinner />;
 * return <MindProfile mind={mind} />;
 *
 * @throws Throws error if Supabase is not configured
 */

// @ts-nocheck
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

  // Obsession (consolidated to single text field)
  obsession: string | null;

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
  // Use local image from /public/minds/{slug}.jpg
  return `/minds/${slug}.jpg`;
};

// Derive tier from apex score
const deriveTier = (apexScore: number | null): 1 | 2 | 3 => {
  if (!apexScore) return 3;
  if (apexScore >= 0.85) return 1;
  if (apexScore >= 0.7) return 2;
  return 3;
};

// Derive status from data completeness
const deriveStatus = (
  proficiencies: number,
  hasObsession: boolean,
  values: number
): MindProfile['status'] => {
  const total = proficiencies + (hasObsession ? 1 : 0) + values;
  if (total >= 5) return 'production';
  if (total >= 2) return 'progress';
  return 'draft';
};

// Derive communication style from obsession and values
const deriveCommunicationStyle = (
  obsession: string | null,
  values: MindProfile['values']
): string[] => {
  const styles: string[] = [];

  // Check for common patterns in obsession and value notes
  const allText = [obsession || '', ...values.map((v) => v.notes || '')]
    .join(' ')
    .toLowerCase();

  if (allText.includes('direct') || allText.includes('pragmati')) styles.push('Direto');
  if (allText.includes('honest') || allText.includes('truth')) styles.push('Honesto');
  if (allText.includes('autoridade') || allText.includes('authority')) styles.push('Autoritário');
  if (allText.includes('simple') || allText.includes('clear')) styles.push('Claro');
  if (allText.includes('creative') || allText.includes('innov')) styles.push('Inovador');
  if (allText.includes('analytic') || allText.includes('data')) styles.push('Analítico');

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
      // Note: obsession is now a direct text field on minds (consolidated from mind_obsessions)
      const { data: mindData, error: mindError } = (await supabase
        .from('minds')
        .select(
          `
          *,
          skills:mind_tags(
            tag:tags(name, tag_type)
          ),
          values:mind_drivers(
            driver:drivers(name),
            strength,
            evidence
          )
        `
        )
        .eq('slug', slug)
        .is('deleted_at', null)
        .single()) as { data: any; error: any };

      if (mindError) {
        throw mindError;
      }

      if (!mindData) {
        throw new Error('Mind not found');
      }

      // Get sources count from contents table (via mind_sources project)
      // Use maybeSingle() to avoid 406 error when no project exists
      const { data: sourcesProject } = await supabase
        .from('content_projects')
        .select('id')
        .eq('persona_mind_id', mindData.id)
        .eq('project_type', 'mind_sources')
        .maybeSingle();

      let sourcesCount = 0;
      if (sourcesProject) {
        const { count } = await supabase
          .from('contents')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', sourcesProject.id);
        sourcesCount = count || 0;
      }

      // Transform proficiencies (filter only skills from mind_tags)
      const proficiencies = (mindData.skills || [])
        .filter((s: any) => s.tag?.tag_type === 'skill' && s.tag?.name)
        .map((s: any) => ({
          skillName: s.tag.name,
          skillCode: s.tag.name.toLowerCase().replace(/\s+/g, '-'), // Generate code from name
          level: 5, // Default level since score was removed
        }));

      // Obsession is now a direct text field on minds (consolidated from mind_obsessions)
      const obsession: string | null = mindData.obsession || null;

      // Transform values (from mind_drivers with driver join)
      const values = (mindData.values || [])
        .map((v: any) => ({
          name: v.driver?.name || 'Unknown Driver',
          importance: v.strength || 0,
          notes: v.evidence,
        }))
        .sort((a: any, b: any) => b.importance - a.importance);

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
        obsession,
        values,
        sourcesCount: sourcesCount || 0,
        status:
          mindData.mmos_metadata?.overrides?.status ||
          deriveStatus(proficiencies.length, !!obsession, values.length),
        tier: mindData.mmos_metadata?.overrides?.tier
          ? (parseInt(mindData.mmos_metadata.overrides.tier) as 1 | 2 | 3)
          : deriveTier(mindData.apex_score),
        signatureSkill:
          mindData.mmos_metadata?.overrides?.signature_skill ||
          psychometrics?.aptitudes.zone_of_genius.title ||
          proficiencies[0]?.skillName ||
          'Synthetic Mind',
        topExpertise: proficiencies.slice(0, 5).map((p: any) => p.skillName),
        communicationStyle: deriveCommunicationStyle(obsession, values),
        psychometrics,
        mmos_metadata: mindData.mmos_metadata,
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
    refetch: fetchMind,
  };
}

export default useMind;
