import { useState, useEffect } from 'react';
import type { UseResumePlaybackOptions, ResumeState } from '../types';

interface UseResumePlaybackResult extends ResumeState {
  dismissResume: () => void;
  resumeFromStart: () => void;
}

export function useResumePlayback({
  lessonId,
  watchProgress,
  isCompleted,
}: UseResumePlaybackOptions): UseResumePlaybackResult {
  const [resumeTime, setResumeTime] = useState<number>(0);
  const [showResumeBanner, setShowResumeBanner] = useState(false);

  // Check for saved progress when interactions load
  useEffect(() => {
    if (watchProgress && !isCompleted) {
      const savedTime = watchProgress.currentTime;
      const percentage = watchProgress.percentage;
      // Only show resume if watched between 5% and 90%
      if (savedTime > 10 && percentage < 90 && percentage > 5) {
        setResumeTime(savedTime);
        setShowResumeBanner(true);
      }
    }
  }, [watchProgress, isCompleted]);

  // Reset resume state when lesson changes
  useEffect(() => {
    setResumeTime(0);
    setShowResumeBanner(false);
  }, [lessonId]);

  const dismissResume = () => {
    setShowResumeBanner(false);
  };

  const resumeFromStart = () => {
    setShowResumeBanner(false);
    setResumeTime(0);
  };

  return {
    resumeTime,
    showResumeBanner,
    dismissResume,
    resumeFromStart,
  };
}
