import { useMemo } from 'react';
import type { ViewData, StatConfig } from '../types';
import { OPS_PRIMARY, OPS_ACCENT } from '../../ops-tokens';

// Helper to format names (convert "LastName, FirstName" to "FirstName LastName")
const formatName = (name: string): string => {
  if (!name || !name.includes(',')) return name;
  const parts = name.split(',').map((p: string) => p.trim());
  if (parts.length === 2) {
    return `${parts[1]} ${parts[0]}`;
  }
  return name;
};

// Helper to format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Get strength label from numeric value
const getStrengthLabel = (strength: number): string => {
  if (strength > 0.6) return 'Strong Synergy';
  if (strength > 0.3) return 'Synergy';
  if (strength < -0.6) return 'Strong Conflict';
  if (strength < -0.3) return 'Conflict';
  return 'Neutral';
};

export function useViewsData(data: ViewData) {
  // Transform tools data
  const toolsWithContext = useMemo(() => {
    return data.tools.map((t: any) => ({
      ...t,
      driver_affinities_count: data.toolAffinities.filter((a: any) => a.tool_id === t.id).length
    }));
  }, [data.tools, data.toolAffinities]);

  // Transform drivers data
  const driversWithContext = useMemo(() => {
    return data.drivers.map((d: any) => ({
      ...d,
      spectrum_range: d.spectrum_low && d.spectrum_high
        ? `${d.spectrum_low} ↔ ${d.spectrum_high}`
        : 'Not specified'
    }));
  }, [data.drivers]);

  // Transform minds data
  const mindsWithContext = useMemo(() => {
    return data.minds.map((m: any) => ({
      ...m,
      name: formatName(m.name),
      primary_obsession: m.obsession || 'N/A',
      mmos_status: m.metadata?.status || 'unknown',
      mmos_subject_type: m.metadata?.subject_type || 'N/A',
      created_at_formatted: formatDate(m.created_at)
    }));
  }, [data.minds]);

  // Transform contents data
  const contentsWithContext = useMemo(() => {
    return data.contents.map((c: any) => {
      const projectName = Array.isArray(c.content_projects) && c.content_projects[0]
        ? c.content_projects[0].name
        : 'Unassigned';

      const primaryMindName = Array.isArray(c.content_minds) && c.content_minds[0]
        ? c.content_minds[0].mind_id
        : 'No Mind';

      return {
        ...c,
        project_name: projectName,
        primary_mind_name: primaryMindName,
        created_at_formatted: formatDate(c.created_at)
      };
    });
  }, [data.contents]);

  // Transform affinities data
  const flattenedAffinities = useMemo(() => {
    return data.toolAffinities.map((affinity: any) => ({
      id: affinity.id,
      tool_id: affinity.tool_id,
      driver_id: affinity.driver_id,
      tool_name: affinity.tools?.name || affinity.tool_id || 'Unknown',
      driver_name: affinity.drivers?.name || affinity.driver_id || 'Unknown',
      affinity_type: affinity.affinity_type,
      strength: affinity.strength,
      strength_label: getStrengthLabel(affinity.strength)
    }));
  }, [data.toolAffinities]);

  return {
    toolsWithContext,
    driversWithContext,
    mindsWithContext,
    contentsWithContext,
    flattenedAffinities
  };
}

export function useViewsStats(data: ViewData) {
  // Tools stats
  const toolsStats: StatConfig[] = useMemo(() => [
    { label: 'Total Tools', value: data.tools.length, icon: 'settings-sliders', color: OPS_PRIMARY },
    { label: 'By Type', value: new Set(data.tools.map((t: any) => t.tool_type)).size, icon: 'layers', color: '#10b981' },
    { label: 'Avg Year', value: (data.tools.reduce((sum: number, t: any) => sum + (t.year_originated || 0), 0) / Math.max(data.tools.length, 1)).toFixed(0), icon: 'chart-pie', color: OPS_ACCENT }
  ], [data.tools]);

  // Drivers stats
  const driversStats: StatConfig[] = useMemo(() => [
    { label: 'Total Drivers', value: data.drivers.length, icon: 'bolt', color: '#f59e0b' },
    { label: 'By Type', value: new Set(data.drivers.map((d: any) => d.driver_type)).size, icon: 'layers', color: '#8b5cf6' },
    { label: 'By Domain', value: new Set(data.drivers.map((d: any) => d.domain)).size, icon: 'grid-3x3', color: '#06b6d4' }
  ], [data.drivers]);

  // Mapping stats
  const mappingStats: StatConfig[] = useMemo(() => [
    { label: 'Total Systems', value: data.mappingSystems.length, icon: 'chart-pie', color: '#06b6d4' },
    { label: 'High Validity', value: data.mappingSystems.filter((s: any) => s.scientific_validity === 'high').length, icon: 'check-circle', color: '#10b981' },
    { label: 'By Type', value: new Set(data.mappingSystems.map((s: any) => s.system_type)).size, icon: 'lightbulb', color: '#f59e0b' }
  ], [data.mappingSystems]);

  // Affinity stats
  const affinityStats: StatConfig[] = useMemo(() => [
    { label: 'Total Affinities', value: data.toolAffinities.length, icon: 'link', color: '#8b5cf6' },
    { label: 'Synergies', value: data.toolAffinities.filter((a: any) => a.strength && a.strength > 0.3).length, icon: 'check-circle', color: '#10b981' },
    { label: 'Conflicts', value: data.toolAffinities.filter((a: any) => a.strength && a.strength < -0.3).length, icon: 'alert-circle', color: '#ef4444' }
  ], [data.toolAffinities]);

  // Minds stats
  const mindsStats: StatConfig[] = useMemo(() => [
    { label: 'Total Minds', value: data.minds.length, icon: 'brain', color: '#8b5cf6' },
    { label: 'With Prompts', value: data.minds.filter((m: any) => m.metadata?.has_prompts).length, icon: 'zap', color: '#f59e0b' },
    { label: 'Active', value: data.minds.filter((m: any) => m.metadata?.status === 'active').length, icon: 'check-circle', color: '#10b981' }
  ], [data.minds]);

  // Contents stats
  const contentsStats: StatConfig[] = useMemo(() => [
    { label: 'Total Contents', value: data.contents.length, icon: 'file-text', color: '#06b6d4' },
    { label: 'Published', value: data.contents.filter((c: any) => c.status === 'published').length, icon: 'check-circle', color: '#10b981' },
    { label: 'By Project', value: new Set(data.contents.map((c: any) => c.project_id)).size, icon: 'send', color: OPS_ACCENT }
  ], [data.contents]);

  return {
    toolsStats,
    driversStats,
    mappingStats,
    affinityStats,
    mindsStats,
    contentsStats
  };
}
