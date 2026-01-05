// useEpicsData Hook
// Manages state for PRD Epics Template

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import type { EpicWithStories, UseEpicsDataReturn } from '../types';

export function useEpicsData(): UseEpicsDataReturn {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [epics, setEpics] = useState<EpicWithStories[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize from project
  useEffect(() => {
    if (project?.project_metadata?.epics) {
      const projectEpics = project.project_metadata.epics.map((e, epicIdx) => ({
        ...e,
        detailedStories: (e.stories || []).map((s, storyIdx) => {
          const title = typeof s === 'string' ? s : `Story ${storyIdx + 1}`;
          const verb = title.split(' ')[0] || 'Implementar';
          return {
            id: `${epicIdx + 1}.${storyIdx + 1}`,
            title,
            verb,
            complexity: (['P', 'M', 'G'] as const)[storyIdx % 3],
            criteria: Math.floor(Math.random() * 4) + 2,
          };
        }),
      }));
      setEpics(projectEpics);
      setHasGenerated(projectEpics.length > 0);
    }
  }, [project]);

  return {
    project,
    loading,
    epics,
    setEpics,
    isGenerating,
    setIsGenerating,
    hasGenerated,
    setHasGenerated,
    isAdvancing,
    setIsAdvancing,
    slug,
  };
}
