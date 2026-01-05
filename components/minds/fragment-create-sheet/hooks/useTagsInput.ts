import { useState, useCallback } from 'react';
import type { UseTagsInputReturn } from '../types';

export function useTagsInput(): UseTagsInputReturn {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = useCallback(() => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }, [addTag]);

  const reset = useCallback(() => {
    setTags([]);
    setNewTag('');
  }, []);

  return {
    tags,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    handleKeyDown,
    reset,
  };
}
