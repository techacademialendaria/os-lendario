import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreatorTopbar from '@/components/creator/CreatorTopbar';
import { Section } from '@/types';
import { useCourse } from '@/hooks/useCourse';
import type { CourseCurriculumTemplateProps, CurriculumView } from './types';
import { defaultPipeline } from './data';
import { useCurriculumState } from './hooks';
import {
  CourseSidebar,
  CurriculumHeader,
  ModuleCard,
  AddModuleSheet,
  AddLessonSheet,
} from './organisms';

export const CourseCurriculumTemplate: React.FC<CourseCurriculumTemplateProps> = ({
  setSection,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);

  const courseTitle = course?.name || 'Carregando...';

  const onNavigate = (view: CurriculumView) => {
    if (!slug) return;
    const routes: Record<CurriculumView, string> = {
      overview: `/creator/cursos/${slug}`,
      brief: `/creator/cursos/${slug}/brief`,
      research: `/creator/cursos/${slug}/research`,
      curriculum: `/creator/cursos/${slug}/curriculo`,
      lessons: `/creator/cursos/${slug}/licoes`,
      validation: `/creator/cursos/${slug}/validacao`,
    };
    navigate(routes[view]);
  };

  const onEditLesson = (lessonId: string) => {
    navigate(`/creator/cursos/${slug}/licoes/${lessonId}`);
  };
  const {
    modules,
    stats,
    isAddModuleOpen,
    newModuleTitle,
    newModuleDescription,
    isAddLessonOpen,
    newLessonTitle,
    newLessonDuration,
    newLessonType,
    setIsAddModuleOpen,
    setNewModuleTitle,
    setNewModuleDescription,
    setIsAddLessonOpen,
    setNewLessonTitle,
    setNewLessonDuration,
    setNewLessonType,
    toggleModule,
    handleAddModule,
    handleAddLesson,
    deleteModule,
    deleteLesson,
    openAddLessonSheet,
  } = useCurriculumState();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="curriculum"
          pipeline={defaultPipeline}
          onNavigate={onNavigate}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <CurriculumHeader
            modulesCount={modules.length}
            totalLessons={stats.totalLessons}
            totalDuration={stats.totalDuration}
            onAddModule={() => setIsAddModuleOpen(true)}
            onNavigate={onNavigate}
          />

          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-4xl space-y-4 p-8">
              {modules.map((mod, modIndex) => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  moduleIndex={modIndex}
                  onToggle={toggleModule}
                  onAddLesson={openAddLessonSheet}
                  onDeleteModule={deleteModule}
                  onDeleteLesson={deleteLesson}
                  onEditLesson={onEditLesson}
                />
              ))}

              <Button
                variant="outline"
                className="w-full border-dashed bg-studio-primary/5 py-8 hover:border-primary/50 hover:bg-primary/5"
                onClick={() => setIsAddModuleOpen(true)}
              >
                <Icon name="plus" className="mr-2 size-5" />
                Adicionar Novo Modulo
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>

      <AddModuleSheet
        isOpen={isAddModuleOpen}
        onOpenChange={setIsAddModuleOpen}
        title={newModuleTitle}
        description={newModuleDescription}
        onTitleChange={setNewModuleTitle}
        onDescriptionChange={setNewModuleDescription}
        onSubmit={handleAddModule}
      />

      <AddLessonSheet
        isOpen={isAddLessonOpen}
        onOpenChange={setIsAddLessonOpen}
        title={newLessonTitle}
        duration={newLessonDuration}
        type={newLessonType}
        onTitleChange={setNewLessonTitle}
        onDurationChange={setNewLessonDuration}
        onTypeChange={setNewLessonType}
        onSubmit={handleAddLesson}
      />
    </div>
  );
};

export default CourseCurriculumTemplate;
