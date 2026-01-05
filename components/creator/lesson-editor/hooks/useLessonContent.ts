/**
 * useLessonContent Hook
 * Manages lesson content state (title, script, video, status).
 */

import { useState } from 'react';
import type { UseLessonContentReturn } from '../types';
import { DEFAULT_TITLE, DEFAULT_SCRIPT } from '../data';

export function useLessonContent(): UseLessonContentReturn {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [status, setStatus] = useState(false);

  return {
    title,
    setTitle,
    videoUrl,
    setVideoUrl,
    script,
    setScript,
    status,
    setStatus,
  };
}
