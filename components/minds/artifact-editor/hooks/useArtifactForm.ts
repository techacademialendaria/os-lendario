import { useState, useEffect } from 'react';
import type { ContentType, UseArtifactFormReturn } from '../types';

export function useArtifactForm(): UseArtifactFormReturn {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('other');
  const [category, setCategory] = useState('other');
  const [isPublished, setIsPublished] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    setHasChanges(title.trim().length > 0 || content.trim().length > 0);
  }, [title, content, contentType, category]);

  const reset = () => {
    setTitle('');
    setContent('');
    setContentType('other');
    setCategory('other');
    setIsPublished(true);
    setHasChanges(false);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    contentType,
    setContentType,
    category,
    setCategory,
    isPublished,
    setIsPublished,
    hasChanges,
    reset,
  };
}
