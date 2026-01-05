import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '@/types';
import { usePRDProjects } from '@/hooks/prd/usePRDProjects';
import { cn } from '@/lib/utils';
import PRDTopbar from '../PRDTopbar';
import { useDashboardFilters } from './hooks';
import {
  LoadingSkeleton,
  EmptyState,
  MetricsRow,
  PipelineVisual,
  FiltersBar,
  ProjectCard,
  NoResults,
  MockDataIndicator,
} from './organisms';
import type { PRDDashboardTemplateProps } from './types';

export const PRDDashboardTemplate: React.FC<PRDDashboardTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { projects, loading, totalProjects, projectsByStatus, isUsingMockData } = usePRDProjects();
  const filters = useDashboardFilters(projects);

  const handleCreateClick = () => navigate('/prd/novo');

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
          <EmptyState onCreateClick={handleCreateClick} />
        </main>
      </div>
    );
  }

  // Main render
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
        <div className="animate-fade-in space-y-6">
          <MockDataIndicator isUsingMockData={isUsingMockData} />
          <MetricsRow totalProjects={totalProjects} projectsByStatus={projectsByStatus} />
          <PipelineVisual projectsByStatus={projectsByStatus} />
          <FiltersBar
            searchQuery={filters.searchQuery}
            setSearchQuery={filters.setSearchQuery}
            filterStatus={filters.filterStatus}
            setFilterStatus={filters.setFilterStatus}
            viewMode={filters.viewMode}
            setViewMode={filters.setViewMode}
          />
          <div
            className={cn(
              'transition-all duration-300',
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-3'
            )}
          >
            {filters.filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} viewMode={filters.viewMode} />
            ))}
          </div>
          {filters.filteredProjects.length === 0 && <NoResults hasProjects={projects.length > 0} />}
        </div>
      </main>
    </div>
  );
};

export default PRDDashboardTemplate;
