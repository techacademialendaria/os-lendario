import React, { useCallback } from 'react';
import { Section } from '../../../types';
import CreatorTopbar from '../CreatorTopbar';
import { useLessonsData, useLessonsFilters, useLessonsSelection } from './hooks';
import {
  CourseSidebar,
  LessonsHeader,
  StatsBar,
  FiltersBar,
  LessonsTable,
} from './organisms';
import { DEFAULT_PIPELINE } from './data';
import type { CourseLessonsTemplateProps } from './types';

const CourseLessonsTemplate: React.FC<CourseLessonsTemplateProps> = ({
  setSection,
  courseTitle,
  onNavigate,
  onEditLesson,
}) => {
  const { lessons, modules, stats, progressPercent, updateLessonsStatus } = useLessonsData();
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterModule,
    setFilterModule,
    filteredLessons,
  } = useLessonsFilters(lessons);
  const {
    selectedLessons,
    isGenerating,
    setIsGenerating,
    toggleSelectAll,
    toggleSelectLesson,
    clearSelection,
    allSelected,
  } = useLessonsSelection(filteredLessons.map((l) => l.id));

  const handleGenerateSelected = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      updateLessonsStatus(selectedLessons, 'generating');
      clearSelection();
      setIsGenerating(false);
    }, 1500);
  }, [selectedLessons, updateLessonsStatus, clearSelection, setIsGenerating]);

  const canProceed = stats.completed >= stats.total;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="lessons"
          pipeline={DEFAULT_PIPELINE}
          onNavigate={onNavigate}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <LessonsHeader
            selectedCount={selectedLessons.length}
            isGenerating={isGenerating}
            canProceed={canProceed}
            onGenerateSelected={handleGenerateSelected}
            onNavigateValidation={() => onNavigate('validation')}
          />

          <StatsBar stats={stats} progressPercent={progressPercent} />

          <FiltersBar
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            filterModule={filterModule}
            modules={modules}
            onSearchChange={setSearchQuery}
            onStatusChange={setFilterStatus}
            onModuleChange={setFilterModule}
          />

          <LessonsTable
            lessons={filteredLessons}
            selectedLessons={selectedLessons}
            allSelected={allSelected}
            onToggleSelectAll={toggleSelectAll}
            onToggleSelect={toggleSelectLesson}
            onEditLesson={onEditLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLessonsTemplate;
