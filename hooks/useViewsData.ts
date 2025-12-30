import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ViewsData, UseViewsDataReturn } from '../types/views';

const FALLBACK_DATA: ViewsData = {
  minds: [],
  contents: [],
  fragments: [],
  drivers: [],
  driverRelationships: [],
  tools: [],
  toolAffinities: [],
  mappingSystems: [],
  inferenceBridges: [],
  mentalModels: [],
  toolStacks: [],
  mindToolMappings: [],
  assessmentProfiles: [],
  systemConvergence: [],
  jobExecutions: [],
  processingQueue: [],
  loading: true,
  error: null,
};

/**
 * Hook to fetch all views data (minds, contents, drivers, tools, etc)
 * Includes caching, error handling, and performance optimizations
 */
export function useViewsData(): UseViewsDataReturn {
  const [data, setData] = useState<ViewsData>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<{ timestamp: number; data: ViewsData } | null>(null);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const fetchData = useCallback(async () => {
    // Check cache first
    if (cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_DURATION) {
      console.info('Using cached views data');
      setData(cacheRef.current.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - using fallback data');
      setData(FALLBACK_DATA);
      setLoading(false);
      return;
    }

    try {
      // Fetch all data in parallel
      const results = await Promise.all([
        // Core Entities
        supabase
          .from('minds')
          .select(`
            id, slug, name, short_bio, obsession, metadata, created_at, updated_at
          `)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(100),

        supabase
          .from('contents')
          .select(`
            id, slug, title, content_type, status, fidelity_score, created_at, project_id,
            content_projects(id, name),
            content_minds(mind_id, role)
          `)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(100),



        // Cognitive Engine - Drivers
        supabase
          .from('drivers')
          .select('id, slug, name, driver_type, description, domain, stability, spectrum_low, spectrum_high, is_active')
          .eq('is_active', true)
          .order('name')
          .limit(100),

        // Cognitive Engine - Tools
        supabase
          .from('tools')
          .select('id, slug, name, tool_type, evidence_level, year_originated')
          .eq('is_active', true)
          .order('name')
          .limit(100),

        supabase
          .from('tool_driver_affinities')
          .select(`
            id,
            tool_id,
            driver_id,
            affinity_type,
            strength,
            rationale,
            tools(id, name),
            drivers(id, name)
          `)
          .limit(100),

        // Cognitive Engine - Mapping Systems
        supabase
          .from('mapping_systems')
          .select('id, slug, name, system_type, category, structure_type, scientific_validity, origin_author, origin_year, is_active')
          .eq('is_active', true)
          .order('name')
          .limit(100),




      ]);

      const [
        mindsRes,
        contentsRes,
        driversRes,
        toolsRes,
        toolAffinitiesRes,
        mappingSystemsRes,
      ] = results;

      const newData: ViewsData = {
        minds: mindsRes.data || [],
        contents: contentsRes.data || [],
        fragments: [],
        drivers: driversRes.data || [],
        driverRelationships: [],
        tools: toolsRes.data || [],
        toolAffinities: toolAffinitiesRes.data || [],
        mappingSystems: mappingSystemsRes.data || [],
        inferenceBridges: [],
        mentalModels: [],
        toolStacks: [],
        mindToolMappings: [],
        assessmentProfiles: [],
        systemConvergence: [],
        jobExecutions: [],
        processingQueue: [],
        loading: false,
        error: null,
      };

      // Update cache
      cacheRef.current = { timestamp: Date.now(), data: newData };
      setData(newData);

    } catch (err) {
      console.error('Error fetching views data:', err);
      setError(err as Error);
      setData({
        ...FALLBACK_DATA,
        loading: false,
        error: err as Error,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isLoading: loading, // Alias for consistency with other hooks
  };
}

export default useViewsData;
