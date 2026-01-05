import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import LessonContextTabs from '../../views/LessonContextTabs';
import LessonContentView from '../../views/LessonContentView';
import LmsCourseSidebar from '../../views/LmsCourseSidebar';
import LessonActionsBar from '../../views/LessonActionsBar';
import { useLessonData, useResumePlayback } from './hooks';

/**
 * LmsStudentTemplate - Orchestrates the LMS student lesson view
 *
 * Responsibilities:
 * - Lesson data management (useLessonData)
 * - Resume playback state (useResumePlayback)
 * - UI state (sidebar, tabs)
 *
 * Lines: ~95 (down from 371)
 */
export default function LmsStudentTemplate() {
  const navigate = useNavigate();
  const { slug, lessonId } = useParams();

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Lesson data hook
  const lesson = useLessonData({ slug, lessonId });

  // Resume playback hook
  const resume = useResumePlayback({
    lessonId: lesson.realLesson?.id,
    watchProgress: lesson.lessonInteractions?.watchProgress,
    isCompleted: lesson.lessonInteractions?.isCompleted,
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* MAIN CONTENT (PLAYER) */}
      <div className="relative flex h-full flex-1 flex-col">
        {/* Top Navigation */}
        <header className="z-20 h-16 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate(`/lms/cursos/${slug}`)}
              >
                <Icon name="arrow-left" size="size-4" />
              </Button>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {lesson.courseData.title}
                </span>
                <h1 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  {lesson.activeLesson.title}
                  <Icon name="angle-small-right" className="text-muted-foreground" size="size-3" />
                  <span className="font-normal text-muted-foreground">
                    {lesson.activeLesson.moduleTitle}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2 text-muted-foreground hover:text-foreground',
                  !sidebarOpen && 'text-primary'
                )}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Icon name={sidebarOpen ? 'expand' : 'compress'} size="size-4" />
                {sidebarOpen ? 'Modo Foco' : 'Mostrar Menu'}
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area (Scrollable) */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-muted/20">
          <div
            className={cn(
              'mx-auto w-full p-6 md:p-8',
              lesson.activeLesson.type === 'text' ? 'max-w-5xl' : 'max-w-6xl'
            )}
          >
            <LessonContentView
              loading={lesson.lessonLoading}
              videoUrl={lesson.realLesson?.videoUrl}
              title={lesson.realLesson?.title || lesson.activeLesson.title}
              duration={lesson.realLesson?.duration}
              content={lesson.realLesson?.content || ''}
              resumeTime={resume.resumeTime}
              showResumeBanner={resume.showResumeBanner}
              onDismissResume={resume.dismissResume}
              onResumeFromStart={resume.resumeFromStart}
              onVideoProgress={lesson.handleVideoProgress}
              onVideoEnded={lesson.handleVideoEnded}
            />

            {/* Footer / Context (Below Content) */}
            <div className="mx-auto mt-8 max-w-3xl space-y-8">
              <LessonActionsBar
                courseSlug={slug || ''}
                previousLessonId={lesson.realLesson?.previousLessonId}
                nextLessonId={lesson.realLesson?.nextLessonId}
                rating={lesson.lessonInteractions?.rating || 0}
                onRate={lesson.handleRate}
                isFavorite={lesson.lessonInteractions?.isFavorite || false}
                onToggleFavorite={lesson.handleToggleFavorite}
                isTogglingFavorite={lesson.isTogglingFavorite}
                isCompleted={lesson.lessonInteractions?.isCompleted || false}
                onMarkComplete={lesson.handleMarkComplete}
                isMarkingComplete={lesson.isMarkingComplete}
                interactionsLoading={lesson.interactionsLoading}
                lessonType={lesson.activeLesson.type}
              />

              <LessonContextTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (CURRICULUM) */}
      <LmsCourseSidebar
        isOpen={sidebarOpen}
        progress={lesson.courseProgress}
        modules={lesson.courseData.modules}
        activeLessonId={lesson.activeLessonId}
        courseSlug={slug || ''}
        onLessonSelect={lesson.setActiveLessonId}
      />
    </div>
  );
}
