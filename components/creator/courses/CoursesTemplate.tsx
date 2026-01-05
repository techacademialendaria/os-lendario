/**
 * CoursesTemplate - Orchestrator Component
 *
 * Refactored from 1,987 lines to ~150 lines
 * Following Atomic Design pattern with hooks for state management
 */
import React from 'react';
import { Section } from '../../../types';
import { cn } from '../../../lib/utils';
import CreatorTopbar from '../CreatorTopbar';
import LessonEditor from '../lesson-editor';

// Hooks
import {
  useCoursesData,
  useCoursesWorkflow,
  useCoursesFilters,
  useNewCourseForm,
  useBriefEditor,
} from './hooks';

// Organisms (Views)
import {
  CoursesListView,
  NewCourseView,
  BriefEditorView,
  ResearchLoadingView,
  ResearchResultsView,
  ReformulationView,
  CurriculumView,
  GenerationView,
  ValidationView,
} from './organisms';

// Data
import { generationLog } from './data/mock-data';

interface CoursesTemplateProps {
  setSection: (s: Section) => void;
}

const CoursesTemplate: React.FC<CoursesTemplateProps> = ({ setSection }) => {
  // Data hook
  const {
    courses,
    loading,
    stats,
    courseContent,
    contentLoading,
    recentActivities,
    activitiesLoading,
  } = useCoursesData(null);

  // Workflow navigation hook
  const {
    view,
    setView,
    selectedCourseSlug,
    setSelectedCourseSlug,
    selectedCourse,
    goBack,
    goToBrief,
    startResearch,
    goToReformulation,
    goToCurriculum,
    startGeneration,
    goToLesson,
  } = useCoursesWorkflow(courses);

  // Filters hook
  const {
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    filteredCourses,
  } = useCoursesFilters(courses);

  // New course form hook
  const newCourseForm = useNewCourseForm();

  // Brief editor hook
  const briefEditor = useBriefEditor();

  // Handle lesson click from curriculum
  const handleLessonClick = (lessonSlug: string) => {
    newCourseForm.setSlug(lessonSlug);
    setView('lesson');
  };

  // Render current view based on workflow state
  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <CoursesListView
            courses={courses}
            filteredCourses={filteredCourses}
            loading={loading}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            stats={stats}
            recentActivities={recentActivities}
            activitiesLoading={activitiesLoading}
          />
        );

      case 'new':
        return (
          <NewCourseView
            mode={newCourseForm.mode}
            setMode={newCourseForm.setMode}
            slug={newCourseForm.slug}
            handleSlugChange={newCourseForm.handleSlugChange}
            persona={newCourseForm.persona}
            setPersona={newCourseForm.setPersona}
            isCreating={newCourseForm.isCreating}
            isValid={newCourseForm.isValid}
            onBack={() => {
              goBack();
              newCourseForm.resetForm();
            }}
            onBreadcrumbClick={() => setView('list')}
            onCreateCourse={() => newCourseForm.handleCreateCourse(goToBrief)}
          />
        );

      case 'brief':
        return (
          <BriefEditorView
            activeSection={briefEditor.activeSection}
            setActiveSection={briefEditor.setActiveSection}
            onBack={goBack}
            onBreadcrumbClick={() => setView('list')}
            onStartResearch={startResearch}
          />
        );

      case 'research_loading':
        return <ResearchLoadingView />;

      case 'research_results':
        return (
          <ResearchResultsView
            onBack={goBack}
            onBreadcrumbClick={() => setView('list')}
            onGoToReformulation={goToReformulation}
          />
        );

      case 'reformulation':
        return (
          <ReformulationView
            onBack={goBack}
            onBreadcrumbClick={() => setView('list')}
            onGoToCurriculum={goToCurriculum}
          />
        );

      case 'curriculum':
        return (
          <CurriculumView
            selectedCourse={selectedCourse}
            courseContent={courseContent}
            contentLoading={contentLoading}
            onBack={goBack}
            onBreadcrumbClick={() => setView('list')}
            onStartGeneration={startGeneration}
            onGoToBrief={goToBrief}
            onLessonClick={handleLessonClick}
          />
        );

      case 'generation':
        return (
          <GenerationView
            generationLog={generationLog}
            onBack={goBack}
            onBreadcrumbClick={() => setView('list')}
            onGoToLesson={goToLesson}
          />
        );

      case 'lesson':
        return (
          <LessonEditor
            onBack={() => setView('curriculum')}
            courseSlug={newCourseForm.slug}
            lessonId="1.1"
          />
        );

      case 'validation':
        return <ValidationView onBack={goBack} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      {/* Topbar - hidden in lesson editor mode */}
      {view !== 'lesson' && (
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      )}

      <main
        className={cn(
          'mx-auto w-full',
          view !== 'lesson' ? 'max-w-[1400px] p-6 md:p-12' : 'p-0'
        )}
      >
        {renderView()}
      </main>
    </div>
  );
};

export default CoursesTemplate;
