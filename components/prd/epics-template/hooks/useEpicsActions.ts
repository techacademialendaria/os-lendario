// useEpicsActions Hook
// Manages actions for PRD Epics Template

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import { useToast } from '@/hooks/use-toast';
import type { EpicWithStories, UseEpicsActionsReturn } from '../types';
import { MOCK_EPICS } from '../data';

interface UseEpicsActionsParams {
  slug: string | undefined;
  epics: EpicWithStories[];
  setEpics: React.Dispatch<React.SetStateAction<EpicWithStories[]>>;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setHasGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdvancing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useEpicsActions({
  slug,
  epics,
  setEpics,
  setIsGenerating,
  setHasGenerated,
  setIsAdvancing,
}: UseEpicsActionsParams): UseEpicsActionsReturn {
  const navigate = useNavigate();
  const { updateProject, advancePhase } = usePRDProject(slug || '');
  const { toast } = useToast();

  // Generate epics with AI
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setEpics(MOCK_EPICS);
    setHasGenerated(true);

    await updateProject({
      epics: MOCK_EPICS.map((e) => ({
        ...e,
        stories: e.detailedStories?.map((s) => s.title) || [],
        storiesCount: e.detailedStories?.length || 0,
      })),
    });

    toast({
      title: 'Plano Gerado',
      description: 'Epicos e Stories criados com base no PRD.',
      variant: 'success',
    });

    setIsGenerating(false);
  }, [updateProject, toast, setEpics, setHasGenerated, setIsGenerating]);

  // Refine with AI
  const handleRefine = useCallback(() => {
    toast({
      title: 'Refinando...',
      description: 'Ajustando granularidade das stories.',
    });
  }, [toast]);

  // Add manual story to epic
  const handleAddStory = useCallback((epicId: string) => {
    setEpics((prev) =>
      prev.map((e) =>
        e.id === epicId
          ? {
              ...e,
              detailedStories: [
                ...(e.detailedStories || []),
                {
                  id: `${epicId}.${(e.detailedStories?.length || 0) + 1}`,
                  title: 'Nova Story',
                  verb: 'Implementar',
                  complexity: 'M' as const,
                  criteria: 2,
                },
              ],
              storiesCount: (e.storiesCount || 0) + 1,
            }
          : e
      )
    );
  }, [setEpics]);

  // Validate and advance
  const handleValidate = useCallback(async () => {
    if (epics.length === 0) return;

    setIsAdvancing(true);

    // Save all data
    await updateProject({
      epics: epics.map((e) => ({
        ...e,
        stories: e.detailedStories?.map((s) => s.title) || [],
        storiesCount: e.detailedStories?.length || 0,
      })),
      stories: epics.flatMap((e) =>
        (e.detailedStories || []).map((s, idx) => ({
          id: `story-${e.id}-${idx}`,
          epic_id: e.id,
          sequence_order: idx + 1,
          title: s.title,
          userStory: `Como usuario, quero ${s.title.toLowerCase()}, para alcancar objetivo`,
          acceptanceCriteria: Array(s.criteria).fill('Criterio de aceite'),
          complexity: s.complexity,
          isValid: true,
        }))
      ),
    });

    toast({
      title: 'Plano Aprovado',
      description: 'Avancando para exportacao...',
      variant: 'success',
    });

    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/exportar`);
    }
    setIsAdvancing(false);
  }, [epics, updateProject, advancePhase, navigate, slug, toast, setIsAdvancing]);

  // Navigate to projects
  const navigateToProjects = useCallback(() => {
    navigate('/prd');
  }, [navigate]);

  return {
    handleGenerate,
    handleRefine,
    handleAddStory,
    handleValidate,
    navigateToProjects,
  };
}
