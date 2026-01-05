// PRD Project Detail - Template (Orchestrator)
import React from 'react';
import { useParams } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';
import { Section } from '@/types';
import { useProjectNavigation, useProjectStats } from './hooks';
import {
  ProjectHeader,
  ProjectMetrics,
  ProjectPipeline,
  ProjectStructure,
  QuickActions,
  ProjectInfoCard,
  LoadingState,
  NotFoundState,
  Breadcrumb,
} from './organisms';
import type { PRDProjectDetailTemplateProps } from './types';

const PRDProjectDetailTemplate: React.FC<PRDProjectDetailTemplateProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const { project, epics, stories, loading } = usePRDProject(slug || '');
  const navigation = useProjectNavigation({ slug, project });
  const stats = useProjectStats({ project, epics, stories });

  if (loading) return <LoadingState setSection={setSection} />;
  if (!project) return <NotFoundState setSection={setSection} onBack={navigation.handleBack} />;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
      <main className="container w-full flex-1 space-y-8 py-6 md:py-8">
        <Breadcrumb projectName={project.name} onBack={navigation.handleBack} />
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <ProjectHeader
              project={project}
              statusLabel={stats.statusLabel}
              onBack={navigation.handleBack}
              onContinue={navigation.handleContinueProduction}
            />
            <ProjectMetrics stats={stats.stats} />
            <ProjectPipeline
              steps={stats.pipelineSteps}
              progress={stats.progress}
              onNavigate={navigation.handleNavigateToPhase}
            />
            <ProjectStructure
              storiesByEpic={stats.storiesByEpic}
              totalEpics={stats.totalEpics}
              totalStories={stats.totalStories}
              slug={slug || ''}
              onNavigateToEpics={navigation.handleNavigateToEpics}
              onNavigateToStories={navigation.handleNavigateToStories}
            />
          </div>
          <div className="w-full space-y-6 lg:w-80">
            <QuickActions
              slug={slug || ''}
              onEditBrief={navigation.handleEditBrief}
              onEditPRD={navigation.handleEditPRD}
              onViewStories={navigation.handleViewStories}
              onDownload={navigation.handleDownloadZip}
              onExport={navigation.handleExport}
            />
            <ProjectInfoCard project={project} statusLabel={stats.statusLabel} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PRDProjectDetailTemplate;
