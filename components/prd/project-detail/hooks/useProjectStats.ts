// PRD Project Detail - Stats Hook
import { useMemo } from 'react';
import type { PRDProject, PRDEpic, PRDStory } from '@/types/prd';
import type { StatItem, PipelineStep, EpicWithStories } from '../types';
import { STATUS_TO_PHASE } from '../types';

interface UseProjectStatsProps {
  project: PRDProject | null;
  epics: PRDEpic[];
  stories: PRDStory[];
}

interface UseProjectStatsResult {
  stats: StatItem[];
  pipelineSteps: PipelineStep[];
  progress: number;
  currentPhase: number;
  statusLabel: string;
  storiesByEpic: EpicWithStories[];
  totalEpics: number;
  totalStories: number;
  completedStories: number;
}

export function useProjectStats({
  project,
  epics,
  stories,
}: UseProjectStatsProps): UseProjectStatsResult {
  const totalEpics = epics.length;
  const totalStories = stories.length;
  const completedStories = useMemo(
    () => stories.filter((s) => s.metadata?.isValidated).length,
    [stories]
  );

  const currentPhase = useMemo(
    () => STATUS_TO_PHASE[project?.status || 'upload'] || 1,
    [project?.status]
  );

  const progress = useMemo(() => Math.round((currentPhase / 6) * 100), [currentPhase]);

  const stats: StatItem[] = useMemo(
    () => [
      { label: 'Epicos', value: String(totalEpics), subtext: `${totalEpics} total` },
      {
        label: 'Stories',
        value: String(totalStories),
        subtext: `${completedStories} concluidas`,
      },
      { label: 'Pesquisas', value: '0', subtext: 'docs apoio' },
      { label: 'Qualidade', value: '--', subtext: 'sem score' },
    ],
    [totalEpics, totalStories, completedStories]
  );

  const pipelineSteps: PipelineStep[] = useMemo(
    () => [
      { id: 'upload', label: 'Upload', status: currentPhase >= 1 ? 'done' : 'pending' },
      { id: 'brief', label: 'Brief', status: currentPhase >= 2 ? 'done' : 'pending' },
      { id: 'prd', label: 'PRD', status: currentPhase >= 3 ? 'done' : 'pending' },
      { id: 'epics', label: 'Epicos', status: currentPhase >= 4 ? 'done' : 'pending' },
      {
        id: 'stories',
        label: 'Stories',
        status: currentPhase === 5 ? 'active' : currentPhase > 5 ? 'done' : 'pending',
      },
      {
        id: 'export',
        label: 'Exportado',
        status: currentPhase >= 6 ? 'done' : 'pending',
      },
    ],
    [currentPhase]
  );

  const statusLabel = useMemo(
    () =>
      project?.status === 'exported' || project?.status === 'completed'
        ? 'Exportado'
        : 'Em Producao',
    [project?.status]
  );

  const storiesByEpic: EpicWithStories[] = useMemo(
    () =>
      epics.map((epic) => ({
        ...epic,
        stories: stories.filter((s) => s.parent_content_id === epic.id),
      })),
    [epics, stories]
  );

  return {
    stats,
    pipelineSteps,
    progress,
    currentPhase,
    statusLabel,
    storiesByEpic,
    totalEpics,
    totalStories,
    completedStories,
  };
}
