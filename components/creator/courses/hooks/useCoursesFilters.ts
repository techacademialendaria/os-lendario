import { useState, useMemo, useCallback } from 'react';
import type { ViewMode, Course } from '../types';

interface UseCoursesFiltersReturn {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCourses: Course[];
}

/**
 * Hook for managing course list filters and search
 */
export function useCoursesFilters(courses: Course[]): UseCoursesFiltersReturn {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on search term and status filter
  const filteredCourses = useMemo(() => {
    let result = courses;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.category.toLowerCase().includes(term) ||
          course.instructor.name.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (filterStatus !== 'Todos') {
      switch (filterStatus) {
        case 'published':
          result = result.filter((c) => c.progress === 100);
          break;
        case 'production':
          result = result.filter((c) => c.progress < 100);
          break;
        default:
          break;
      }
    }

    return result;
  }, [courses, searchTerm, filterStatus]);

  return {
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    filteredCourses,
  };
}
