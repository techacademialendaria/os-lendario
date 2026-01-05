import { useState, useCallback } from 'react';
import type { Competitor, MarketGap, Source, PipelineStep } from '../types';
import { mockCompetitors, mockGaps, mockSources, defaultPipeline } from '../data';

export interface UseCourseResearchDataReturn {
  // Tab state
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data state
  competitors: Competitor[];
  gaps: MarketGap[];
  sources: Source[];
  pipeline: PipelineStep[];

  // Loading state
  isRunningAI: boolean;

  // Actions
  handleRunAIResearch: () => void;
  handleToggleGap: (id: string) => void;
}

export function useCourseResearchData(): UseCourseResearchDataReturn {
  // Tab state
  const [activeTab, setActiveTab] = useState('competitors');

  // Data state - using mock data for now
  const [competitors] = useState<Competitor[]>(mockCompetitors);
  const [gaps, setGaps] = useState<MarketGap[]>(mockGaps);
  const [sources] = useState<Source[]>(mockSources);
  const [pipeline] = useState<PipelineStep[]>(defaultPipeline);

  // Loading state
  const [isRunningAI, setIsRunningAI] = useState(false);

  // Actions
  const handleRunAIResearch = useCallback(() => {
    setIsRunningAI(true);
    setTimeout(() => {
      setIsRunningAI(false);
    }, 3000);
  }, []);

  const handleToggleGap = useCallback((id: string) => {
    setGaps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, addressed: !g.addressed } : g))
    );
  }, []);

  return {
    activeTab,
    setActiveTab,
    competitors,
    gaps,
    sources,
    pipeline,
    isRunningAI,
    handleRunAIResearch,
    handleToggleGap,
  };
}
