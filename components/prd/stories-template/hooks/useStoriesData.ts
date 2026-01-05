// useStoriesData - Data management hook for Stories Template
import { useState, useEffect, useCallback, useMemo } from 'react';
import { EpicSummary, StorySummary, Complexity } from '../types';
import { PRDProject, PRDProjectMetadata } from '@/types/prd';

interface UseStoriesDataProps {
  project: PRDProject | null;
  updateProject: (updates: Partial<PRDProjectMetadata>) => Promise<boolean>;
}

export function useStoriesData({ project, updateProject }: UseStoriesDataProps) {
  const [epics, setEpics] = useState<EpicSummary[]>([]);
  const [stories, setStories] = useState<StorySummary[]>([]);
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize from project
  useEffect(() => {
    if (project?.project_metadata) {
      const projectEpics = project.project_metadata.epics || [];
      const projectStories = project.project_metadata.stories || [];
      setEpics(projectEpics);
      setStories(projectStories);
      if (projectEpics.length > 0 && !selectedEpicId) {
        setSelectedEpicId(projectEpics[0].id);
      }
    }
  }, [project, selectedEpicId]);

  // Computed values
  const selectedEpic = useMemo(
    () => epics.find((e) => e.id === selectedEpicId),
    [epics, selectedEpicId]
  );

  const epicStories = useMemo(
    () => stories.filter((s) => s.epic_id === selectedEpicId),
    [stories, selectedEpicId]
  );

  const selectedStory = useMemo(
    () => stories.find((s) => s.id === selectedStoryId) || null,
    [stories, selectedStoryId]
  );

  const totalStories = stories.length;

  // Generate stories for an epic
  const generateStories = useCallback(
    async (epicId: string) => {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const epic = epics.find((e) => e.id === epicId);
      if (!epic) {
        setIsGenerating(false);
        return;
      }

      const mockStories: StorySummary[] = (epic.stories || ['Story 1', 'Story 2', 'Story 3']).map(
        (title, i) => ({
          id: `story-${epicId}-${i}-${Date.now()}`,
          epic_id: epicId,
          sequence_order: i + 1,
          title: typeof title === 'string' ? title : `Story ${i + 1}`,
          userStory: `Como usuario, quero ${typeof title === 'string' ? title.toLowerCase() : 'realizar acao'}, para alcancar objetivo`,
          acceptanceCriteria: [
            'Sistema deve validar dados de entrada',
            'Feedback visual de sucesso/erro',
            'Acao deve ser registrada no log',
          ],
          complexity: (['P', 'M', 'G'] as Complexity[])[i % 3],
          isValid: true,
        })
      );

      const otherStories = stories.filter((s) => s.epic_id !== epicId);
      const updatedStories = [...otherStories, ...mockStories];
      setStories(updatedStories);
      await updateProject({ stories: updatedStories });
      setIsGenerating(false);
    },
    [epics, stories, updateProject]
  );

  // Save a story
  const saveStory = useCallback(
    async (updatedStory: StorySummary) => {
      const updated = stories.map((s) => (s.id === updatedStory.id ? updatedStory : s));
      setStories(updated);
      await updateProject({ stories: updated });
    },
    [stories, updateProject]
  );

  return {
    // State
    epics,
    stories,
    selectedEpicId,
    selectedStoryId,
    isGenerating,
    // Computed
    selectedEpic,
    epicStories,
    selectedStory,
    totalStories,
    // Actions
    setSelectedEpicId,
    setSelectedStoryId,
    generateStories,
    saveStory,
  };
}
