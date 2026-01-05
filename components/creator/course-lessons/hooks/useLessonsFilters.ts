import { useState, useMemo } from 'react';
import type { Lesson } from '../types';

export function useLessonsFilters(lessons: Lesson[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModule, setFilterModule] = useState('all');

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesStatus = filterStatus === 'all' || lesson.status === filterStatus;
      const matchesModule = filterModule === 'all' || lesson.moduleName === filterModule;
      const matchesSearch =
        searchQuery === '' ||
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.id.includes(searchQuery);
      return matchesStatus && matchesModule && matchesSearch;
    });
  }, [lessons, filterStatus, filterModule, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterModule,
    setFilterModule,
    filteredLessons,
  };
}
