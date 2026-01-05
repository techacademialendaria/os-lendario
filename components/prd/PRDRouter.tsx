// @ts-nocheck
import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import type { EpicData, StoryData, PRDEpic, PRDStory } from '../../types/prd';
import { usePRDProject } from '../../hooks/prd/usePRDProject';
import PRDTopbar from './PRDTopbar';
import PRDDashboardTemplate from './dashboard-template';
import PRDNewTemplate from './templates/PRDNewTemplate';
import PRDUploadTemplate from './templates/PRDUploadTemplate';
import PRDBriefTemplate from './brief-template';
import PRDDocumentTemplate from './document-template';
import PRDEpicsTemplate from './epics-template';
import PRDStoriesTemplate from './stories-template';
import PRDExportTemplate from './export-template';
import PRDProjectDetailTemplate from './project-detail';
import { getSectionFromPath } from '../../routes';

// =============================================================================
// TRANSFORMERS
// =============================================================================

// Convert PRDEpic (from database) to EpicData (for templates)
function transformPRDEpicToEpicData(epic: PRDEpic): EpicData {
  return {
    id: epic.id,
    sequence_order: epic.sequence_order || 0,
    title: epic.title,
    description: epic.content || epic.metadata?.objective || '',
    storiesCount: epic.metadata?.storiesCount || 0,
    status: (epic.metadata?.storiesCount ?? 0) > 0 ? 'stories_generated' : 'pending',
  };
}

// Convert PRDStory (from database) to StoryData (for templates)
function transformPRDStoryToStoryData(story: PRDStory): StoryData {
  return {
    id: story.id,
    epic_id: story.parent_content_id || '',
    sequence_order: story.sequence_order || 0,
    title: story.title,
    userStory: story.content || '',
    acceptanceCriteria: story.metadata?.acceptanceCriteria || [],
    complexity: story.metadata?.complexity || 'M',
    isValid: story.metadata?.isValidated ?? true,
    validationErrors: [],
  };
}

interface PRDRouterProps {
  setSection: (s: Section) => void;
}

// =============================================================================
// EDITOR WRAPPERS
// =============================================================================

// Epics editor wrapper
const PRDEpicsEditor: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { project, updateProject, epics, loadContents, contentsLoading } = usePRDProject(
    slug || ''
  );
  const currentSection = getSectionFromPath(location.pathname) || Section.STUDIO_PRD_EDITOR;

  // Transform database epics to template format (MUST be before any conditional returns)
  const epicDataList = React.useMemo(() => {
    return epics.map(transformPRDEpicToEpicData);
  }, [epics]);

  // Load epics and stories from database
  React.useEffect(() => {
    if (project) {
      loadContents();
    }
  }, [project, loadContents]);

  // Handlers (defined before conditional returns)
  const handleUpdateEpics = async (newEpics: EpicData[]) => {
    if (!project) return;
    await updateProject({ epics: newEpics });
  };

  const handleGenerateStories = (epicId: string) => {
    console.log('[PRD-Epics] Generate stories for epic:', epicId);
  };

  const handleGenerateAllStories = () => {
    console.log('[PRD-Epics] Generate all stories');
  };

  const handleNext = () => {
    window.location.href = `/prd/${slug}/stories`;
  };

  // Conditional returns AFTER all hooks
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PRDTopbar currentSection={currentSection} setSection={setSection} />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Carregando projeto...</p>
        </main>
      </div>
    );
  }

  if (contentsLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PRDTopbar currentSection={currentSection} setSection={setSection} />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Carregando épicos...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PRDTopbar currentSection={currentSection} setSection={setSection} />
      <main className="flex-1">
        <PRDEpicsTemplate
          project={project}
          initialEpics={epicDataList}
          onUpdateEpics={handleUpdateEpics}
          onGenerateStories={handleGenerateStories}
          onGenerateAllStories={handleGenerateAllStories}
          onNext={handleNext}
        />
      </main>
    </div>
  );
};

// Stories editor wrapper - now using atomic design pattern
// The PRDStoriesTemplate handles its own data fetching internally

// Export editor wrapper
const PRDExportEditor: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { project } = usePRDProject(slug || '');
  const currentSection = getSectionFromPath(location.pathname) || Section.STUDIO_PRD_EDITOR;

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PRDTopbar currentSection={currentSection} setSection={setSection} />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Carregando projeto...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PRDTopbar currentSection={currentSection} setSection={setSection} />
      <main className="flex-1">
        <PRDExportTemplate project={project} />
      </main>
    </div>
  );
};

// =============================================================================
// ROUTER COMPONENT
// =============================================================================

const PRDRouter: React.FC<PRDRouterProps> = ({ setSection }) => {
  return (
    <Routes>
      {/* Dashboard - Lista de projetos (has its own layout) */}
      <Route path="/" element={<PRDDashboardTemplate setSection={setSection} />} />

      {/* Novo projeto (has its own layout) */}
      <Route path="/novo" element={<PRDNewTemplate setSection={setSection} />} />

      {/* Project Detail - visão geral do projeto */}
      <Route path="/:slug" element={<PRDProjectDetailTemplate setSection={setSection} />} />

      {/* Phase 1: Upload (has its own layout) */}
      <Route path="/:slug/upload" element={<PRDUploadTemplate setSection={setSection} />} />

      {/* Phase 2: Brief (has its own layout) */}
      <Route path="/:slug/brief" element={<PRDBriefTemplate setSection={setSection} />} />

      {/* Phase 3: PRD Document (has its own layout) */}
      <Route path="/:slug/prd" element={<PRDDocumentTemplate setSection={setSection} />} />

      {/* Phase 4: Épicos */}
      <Route path="/:slug/epicos" element={<PRDEpicsEditor setSection={setSection} />} />

      {/* Phase 5: Stories (atomic design - handles own data) */}
      <Route path="/:slug/stories" element={<PRDStoriesTemplate setSection={setSection} />} />

      {/* Phase 6: Exportar */}
      <Route path="/:slug/exportar" element={<PRDExportEditor setSection={setSection} />} />

      {/* Fallback - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/prd" replace />} />
    </Routes>
  );
};

export default PRDRouter;
