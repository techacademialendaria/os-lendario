// PRD Stories Template - Orchestrator
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import { PRDStoriesTemplateProps } from './types';
import { useStoriesData, useStoriesUI } from './hooks';
import { LoadingState, StoriesHeader, EpicsList, StoriesList, StoryDetail, StoriesFooter } from './organisms';

export const PRDStoriesTemplate: React.FC<PRDStoriesTemplateProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  const {
    epics, stories, selectedEpicId, selectedStoryId, isGenerating,
    selectedEpic, epicStories, selectedStory, totalStories,
    setSelectedEpicId, setSelectedStoryId, generateStories, saveStory,
  } = useStoriesData({ project, updateProject });

  const { isAdvancing, goToEpics, goToProjects, handleAdvance } = useStoriesUI({
    slug: slug || '',
    storiesCount: totalStories,
    advancePhase,
  });

  const handleGenerateStories = useCallback(() => {
    if (selectedEpicId) generateStories(selectedEpicId);
  }, [selectedEpicId, generateStories]);

  const handleCloseDetail = useCallback(() => setSelectedStoryId(null), [setSelectedStoryId]);

  if (loading) return <LoadingState setSection={setSection} />;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <StoriesHeader onNavigateToProjects={goToProjects} onNavigateToEpics={goToEpics} />

      <main className="flex flex-1 overflow-hidden">
        <EpicsList
          epics={epics}
          stories={stories}
          selectedEpicId={selectedEpicId}
          onSelectEpic={setSelectedEpicId}
          totalStories={totalStories}
        />
        <StoriesList
          epic={selectedEpic}
          stories={epicStories}
          selectedStoryId={selectedStoryId}
          onSelectStory={setSelectedStoryId}
          onGenerateStories={handleGenerateStories}
          isGenerating={isGenerating}
        />
        <aside className="w-96 flex-shrink-0 bg-card">
          <StoryDetail story={selectedStory} onSave={saveStory} onClose={handleCloseDetail} />
        </aside>
      </main>

      <StoriesFooter
        totalStories={totalStories}
        hasStories={totalStories > 0}
        isAdvancing={isAdvancing}
        onAdvance={handleAdvance}
        onNavigateToEpics={goToEpics}
      />
    </div>
  );
};

export default PRDStoriesTemplate;
