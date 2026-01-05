import { useState, useCallback } from 'react';

export function useLessonsSelection(filteredLessonIds: string[]) {
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSelectAll = useCallback(() => {
    if (selectedLessons.length === filteredLessonIds.length) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons([...filteredLessonIds]);
    }
  }, [selectedLessons.length, filteredLessonIds]);

  const toggleSelectLesson = useCallback((lessonId: string) => {
    setSelectedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLessons([]);
  }, []);

  const allSelected = filteredLessonIds.length > 0 &&
    selectedLessons.length === filteredLessonIds.length;

  return {
    selectedLessons,
    isGenerating,
    setIsGenerating,
    toggleSelectAll,
    toggleSelectLesson,
    clearSelection,
    allSelected,
  };
}
