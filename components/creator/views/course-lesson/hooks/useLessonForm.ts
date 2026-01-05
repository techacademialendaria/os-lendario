import { useState, useEffect, useCallback } from 'react';
import type { LessonData as Lesson } from '../../../../../hooks/useLesson';

export interface UseLessonFormReturn {
  // Form state
  title: string;
  script: string;
  videoUrl: string | null;
  isPublished: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  // Actions
  setTitle: (title: string) => void;
  setScript: (script: string) => void;
  setVideoUrl: (url: string | null) => void;
  setIsPublished: (published: boolean) => void;
  handleSave: () => Promise<void>;
}

interface UseLessonFormOptions {
  lesson: Lesson | null;
  updateLesson: (data: {
    title: string;
    content: string;
    status: string;
    metadata: any;
  }) => Promise<void>;
}

export function useLessonForm({ lesson, updateLesson }: UseLessonFormOptions): UseLessonFormReturn {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync lesson data to local state
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || '');
      setScript(lesson.metadata?.script || lesson.content || '');
      setVideoUrl(lesson.metadata?.video_url || null);
      setIsPublished(lesson.status === 'published');
      setHasChanges(false);
    }
  }, [lesson]);

  // Track changes
  useEffect(() => {
    if (lesson) {
      const titleChanged = title !== (lesson.title || '');
      const scriptChanged = script !== (lesson.metadata?.script || lesson.content || '');
      const statusChanged = isPublished !== (lesson.status === 'published');
      setHasChanges(titleChanged || scriptChanged || statusChanged);
    }
  }, [title, script, isPublished, lesson]);

  const handleSave = useCallback(async () => {
    if (!lesson) return;
    setIsSaving(true);
    try {
      await updateLesson({
        title,
        content: script,
        status: isPublished ? 'published' : 'draft',
        metadata: {
          ...lesson.metadata,
          script,
          video_url: videoUrl,
        },
      });
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  }, [lesson, title, script, isPublished, videoUrl, updateLesson]);

  return {
    title,
    script,
    videoUrl,
    isPublished,
    hasChanges,
    isSaving,
    setTitle,
    setScript,
    setVideoUrl,
    setIsPublished,
    handleSave,
  };
}
