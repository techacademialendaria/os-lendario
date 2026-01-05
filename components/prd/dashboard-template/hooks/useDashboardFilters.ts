import { useState, useMemo } from 'react';
import type { PRDProject } from '@/types/prd';
import type { FilterStatus, ViewMode, UseDashboardFiltersReturn } from '../types';

export function useDashboardFilters(projects: PRDProject[]): UseDashboardFiltersReturn {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === ('in_progress' as FilterStatus)) {
          return ['upload', 'brief', 'prd', 'epics', 'stories'].includes(p.status ?? '');
        }
        return p.status === filterStatus;
      })
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, filterStatus, searchQuery]);

  return {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    filteredProjects,
  };
}
