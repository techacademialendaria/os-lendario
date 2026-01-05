import { useMemo } from 'react';
import { useOpsStats } from '@/hooks/useOpsStats';
import { useSchema } from '@/hooks/useSchema';
import { getModules } from '../data';

export function useSchemaData() {
  const { stats, loading: statsLoading, refetch } = useOpsStats();
  const { policies, loading: schemaLoading } = useSchema();

  const modules = useMemo(() => getModules(stats), [stats]);

  const criticalIssues = useMemo(() => {
    return [
      stats.mindDrivers === 0,
      stats.mindComponentScores === 0,
      stats.toolAffinities === 0
    ].filter(Boolean).length;
  }, [stats.mindDrivers, stats.mindComponentScores, stats.toolAffinities]);

  return {
    stats,
    modules,
    policies,
    criticalIssues,
    loading: statsLoading || schemaLoading,
    schemaLoading,
    refetch,
  };
}
