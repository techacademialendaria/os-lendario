import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface OpsStats {
  tables: number;
  lastUpdated: string;
  // Core
  minds: number;
  tags: number;
  mindTags: number;
  // Drivers
  drivers: number;
  driverRels: number;
  mindDrivers: number;
  miuDriverEvidence: number;
  fragmentDrivers: number;
  // Mapping Systems
  systems: number;
  compMaps: number; // component_driver_map
  systemComponents: number;
  mindSystemMappings: number;
  mindComponentScores: number;
  mindPsychometrics: number;
  // Tools
  tools: number;
  toolRels: number;
  toolAffinities: number;
  mindTools: number;
  // Creator OS - Projects
  projects: number;
  projectMinds: number;
  audienceProfiles: number;
  // Creator OS - Contents
  contents: number;
  contentMinds: number;
  contentTags: number;
  contentsWithTranscription: number;
  // Fragments
  fragments: number;
  fragmentRels: number;
  // Operations
  jobExecutions: number;
  ingestionBatches: number;
  processingQueue: number;
  userProfiles: number;
}

interface UseOpsStatsResult {
  stats: OpsStats;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Fallback stats when Supabase is not configured
const FALLBACK_STATS: OpsStats = {
  tables: 31,
  lastUpdated: new Date().toISOString().split('T')[0],
  minds: 0, tags: 0, mindTags: 0,
  drivers: 0, driverRels: 0, mindDrivers: 0, miuDriverEvidence: 0, fragmentDrivers: 0,
  systems: 0, compMaps: 0, systemComponents: 0, mindSystemMappings: 0, mindComponentScores: 0, mindPsychometrics: 0,
  tools: 0, toolRels: 0, toolAffinities: 0, mindTools: 0,
  projects: 0, projectMinds: 0, audienceProfiles: 0,
  contents: 0, contentMinds: 0, contentTags: 0, contentsWithTranscription: 0,
  fragments: 0, fragmentRels: 0,
  jobExecutions: 0, ingestionBatches: 0, processingQueue: 0, userProfiles: 0
};

export function useOpsStats(): UseOpsStatsResult {
  const [stats, setStats] = useState<OpsStats>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - using fallback stats');
      setStats(FALLBACK_STATS);
      setLoading(false);
      return;
    }

    try {
      // Fetch all counts in parallel
      const results = await Promise.all([
        // Core
        supabase.from('minds').select('*', { count: 'exact', head: true }),
        supabase.from('tags').select('*', { count: 'exact', head: true }),
        supabase.from('mind_tags').select('*', { count: 'exact', head: true }),
        // Drivers
        supabase.from('drivers').select('*', { count: 'exact', head: true }),
        supabase.from('driver_relationships').select('*', { count: 'exact', head: true }),
        supabase.from('mind_drivers').select('*', { count: 'exact', head: true }),
        // miu_driver_evidence table doesn't exist - removed obsolete query
        Promise.resolve({ count: 0, error: null } as any),
        supabase.from('fragment_drivers').select('*', { count: 'exact', head: true }),
        // Mapping
        supabase.from('mapping_systems').select('*', { count: 'exact', head: true }),
        supabase.from('component_driver_map').select('*', { count: 'exact', head: true }),
        supabase.from('system_components').select('*', { count: 'exact', head: true }),
        supabase.from('mind_system_mappings').select('*', { count: 'exact', head: true }),
        supabase.from('mind_component_scores').select('*', { count: 'exact', head: true }),
        supabase.from('mind_psychometrics').select('*', { count: 'exact', head: true }),
        // Tools
        supabase.from('tools').select('*', { count: 'exact', head: true }),
        supabase.from('tool_relations' as never).select('*', { count: 'exact', head: true }),
        supabase.from('tool_driver_affinities').select('*', { count: 'exact', head: true }),
        supabase.from('mind_tools').select('*', { count: 'exact', head: true }),
        // Projects
        supabase.from('content_projects').select('*', { count: 'exact', head: true }),
        supabase.from('project_minds').select('*', { count: 'exact', head: true }),
        supabase.from('audience_profiles').select('*', { count: 'exact', head: true }),
        // Contents
        supabase.from('contents').select('*', { count: 'exact', head: true }),
        supabase.from('content_minds').select('*', { count: 'exact', head: true }),
        supabase.from('content_tags').select('*', { count: 'exact', head: true }),
        supabase.from('contents').select('*', { count: 'exact', head: true }).not('content', 'is', null),
        // Fragments
        supabase.from('fragments').select('*', { count: 'exact', head: true }),
        supabase.from('fragment_relationships').select('*', { count: 'exact', head: true }),
        // Ops
        supabase.from('job_executions').select('*', { count: 'exact', head: true }),
        supabase.from('ingestion_batches').select('*', { count: 'exact', head: true }),
        supabase.from('processing_queue').select('*', { count: 'exact', head: true }),
        supabase.from('user_profiles' as never).select('*', { count: 'exact', head: true }),
      ]);

      // Destructure results
      const [
        minds, tags, mindTags,
        drivers, driverRels, mindDrivers, miuDriverEvidence, fragmentDrivers,
        systems, compMaps, systemComponents, mindSystemMappings, mindComponentScores, mindPsychometrics,
        tools, toolRels, toolAffinities, mindTools,
        projects, projectMinds, audienceProfiles,
        contents, contentMinds, contentTags, contentsWithTranscription,
        fragments, fragmentRels,
        jobExecutions, ingestionBatches, processingQueue, userProfiles
      ] = results;

      setStats({
        tables: 31,
        lastUpdated: new Date().toISOString().split('T')[0],
        minds: minds.count ?? 0,
        tags: tags.count ?? 0,
        mindTags: mindTags.count ?? 0,
        drivers: drivers.count ?? 0,
        driverRels: driverRels.count ?? 0,
        mindDrivers: mindDrivers.count ?? 0,
        miuDriverEvidence: miuDriverEvidence.count ?? 0,
        fragmentDrivers: fragmentDrivers.count ?? 0,
        systems: systems.count ?? 0,
        compMaps: compMaps.count ?? 0,
        systemComponents: systemComponents.count ?? 0,
        mindSystemMappings: mindSystemMappings.count ?? 0,
        mindComponentScores: mindComponentScores.count ?? 0,
        mindPsychometrics: mindPsychometrics.count ?? 0,
        tools: tools.count ?? 0,
        toolRels: toolRels.count ?? 0,
        toolAffinities: toolAffinities.count ?? 0,
        mindTools: mindTools.count ?? 0,
        projects: projects.count ?? 0,
        projectMinds: projectMinds.count ?? 0,
        audienceProfiles: audienceProfiles.count ?? 0,
        contents: contents.count ?? 0,
        contentMinds: contentMinds.count ?? 0,
        contentTags: contentTags.count ?? 0,
        contentsWithTranscription: contentsWithTranscription.count ?? 0,
        fragments: fragments.count ?? 0,
        fragmentRels: fragmentRels.count ?? 0,
        jobExecutions: jobExecutions.count ?? 0,
        ingestionBatches: ingestionBatches.count ?? 0,
        processingQueue: processingQueue.count ?? 0,
        userProfiles: userProfiles.count ?? 0
      });

    } catch (err) {
      console.error('Error fetching comprehensive ops stats:', err);
      setError(err as Error);
      setStats(FALLBACK_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}

export default useOpsStats;
