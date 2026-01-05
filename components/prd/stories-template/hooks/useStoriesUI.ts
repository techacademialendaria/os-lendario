// useStoriesUI - UI state management hook for Stories Template
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseStoriesUIProps {
  slug: string;
  storiesCount: number;
  advancePhase: () => Promise<boolean>;
}

export function useStoriesUI({ slug, storiesCount, advancePhase }: UseStoriesUIProps) {
  const navigate = useNavigate();
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Navigate to epics page
  const goToEpics = useCallback(() => {
    navigate(`/prd/${slug}/epicos`);
  }, [navigate, slug]);

  // Navigate to projects list
  const goToProjects = useCallback(() => {
    navigate('/prd');
  }, [navigate]);

  // Advance to export phase
  const handleAdvance = useCallback(async () => {
    if (storiesCount === 0) return;
    setIsAdvancing(true);
    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/exportar`);
    }
    setIsAdvancing(false);
  }, [storiesCount, advancePhase, navigate, slug]);

  return {
    isAdvancing,
    goToEpics,
    goToProjects,
    handleAdvance,
  };
}
