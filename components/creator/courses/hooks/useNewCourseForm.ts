import { useState, useCallback } from 'react';
import type { CourseMode } from '../types';

interface UseNewCourseFormReturn {
  mode: CourseMode | null;
  setMode: (mode: CourseMode | null) => void;
  slug: string;
  setSlug: (slug: string) => void;
  persona: string;
  setPersona: (persona: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  isCreating: boolean;
  // Handlers
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileAdd: (file: File | null) => void;
  handleRemoveFile: (index: number) => void;
  handleCreateCourse: (onSuccess: () => void) => void;
  resetForm: () => void;
  // Validation
  isValid: boolean;
}

/**
 * Hook for managing new course form state
 */
export function useNewCourseForm(): UseNewCourseFormReturn {
  const [mode, setMode] = useState<CourseMode | null>(null);
  const [slug, setSlug] = useState('');
  const [persona, setPersona] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleSlugChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  }, []);

  const handleFileAdd = useCallback((file: File | null) => {
    if (file) setFiles((prev) => [...prev, file]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCreateCourse = useCallback(
    (onSuccess: () => void) => {
      if (!slug || !mode) return;
      setIsCreating(true);
      // Simulating API creation
      setTimeout(() => {
        setIsCreating(false);
        onSuccess();
      }, 1500);
    },
    [slug, mode]
  );

  const resetForm = useCallback(() => {
    setMode(null);
    setSlug('');
    setPersona('');
    setFiles([]);
  }, []);

  const isValid = Boolean(mode && slug.trim());

  return {
    mode,
    setMode,
    slug,
    setSlug,
    persona,
    setPersona,
    files,
    setFiles,
    isCreating,
    handleSlugChange,
    handleFileAdd,
    handleRemoveFile,
    handleCreateCourse,
    resetForm,
    isValid,
  };
}
