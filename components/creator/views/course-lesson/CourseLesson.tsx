// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../../../../types';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { useCourse } from '../../../../hooks/useCourse';
import { useLesson } from '../../../../hooks/useLesson';
import CreatorTopbar from '../../CreatorTopbar';
import LessonSidebar from '../LessonSidebar';
import { useLessonForm, useLessonSidebar, useLessonEditor } from './hooks';
import { LessonSubHeader, LessonEditorTabs, LessonEditorContent } from './organisms';
import type { CourseLessonProps } from './types';

const CourseLesson: React.FC<CourseLessonProps> = ({ setSection }) => {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);
  const { lesson, modules, loading: lessonLoading, updateLesson } = useLesson(lessonId);

  // Custom hooks
  const sidebar = useLessonSidebar();
  const editor = useLessonEditor();
  const form = useLessonForm({ lesson, updateLesson });

  const loading = courseLoading || lessonLoading;

  if (loading) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-72 space-y-4 border-r border-border bg-card/50 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted/40" />
                <div className="h-8 w-full animate-pulse rounded bg-muted/60" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-8">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-96 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="flex flex-1 flex-col items-center justify-center">
          <Icon name="exclamation" className="mb-4 text-destructive" size="size-10" />
          <h2 className="mb-2 text-xl font-bold">Licao nao encontrada</h2>
          <Button size="sm" onClick={() => navigate(`/creator/cursos/${slug}`)}>
            Voltar para o Curso
          </Button>
        </main>
      </div>
    );
  }

  // Find current module and lesson index
  const currentModule = modules.find((mod) => mod.lessons.some((l) => l.id === lessonId));
  const moduleIndex = modules.findIndex((mod) => mod.id === currentModule?.id);
  const lessonIndex = currentModule?.lessons.findIndex((l) => l.id === lessonId) ?? -1;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <LessonSubHeader
        courseSlug={slug!}
        moduleIndex={moduleIndex}
        lessonIndex={lessonIndex}
        moduleTitle={currentModule?.title || 'Modulo'}
        isPublished={form.isPublished}
        onPublishedChange={form.setIsPublished}
        hasChanges={form.hasChanges}
        isSaving={form.isSaving}
        onSave={form.handleSave}
      />

      <div className="flex flex-1 overflow-hidden">
        <LessonSidebar
          modules={modules}
          currentLessonId={lessonId!}
          courseSlug={slug!}
          collapsed={sidebar.collapsed}
          onCollapsedChange={sidebar.setCollapsed}
          activeTab={sidebar.tab}
          onTabChange={sidebar.setTab}
          fidelityScore={lesson.fidelity_score ?? null}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <LessonEditorTabs activeTab={editor.editorTab} onTabChange={editor.setEditorTab} />

          <LessonEditorContent
            activeTab={editor.editorTab}
            title={form.title}
            onTitleChange={form.setTitle}
            script={form.script}
            onScriptChange={form.setScript}
            videoUrl={form.videoUrl}
            onVideoUrlChange={form.setVideoUrl}
            lesson={lesson}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
