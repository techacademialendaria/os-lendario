import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '@/types';
import { useCourse } from '@/hooks/useCourse';
import { useCourseContents } from '@/hooks/useCourseContents';
import CreatorTopbar from '../CreatorTopbar';
import { useExpandedModules } from './hooks';
import {
  LoadingSkeleton,
  CourseNotFound,
  CourseHeader,
  KpiCardsGrid,
  ProductionPipeline,
  CurriculumStructure,
  SidebarPanel,
} from './organisms';
import { getPipelineStages, getQuickActions, buildKpiStats, type CourseOverviewProps } from './types';

const CourseOverview: React.FC<CourseOverviewProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const { course, loading: courseLoading } = useCourse(slug);
  const { content, loading: contentLoading } = useCourseContents(slug ?? null);
  const { expandedModules, toggleModule } = useExpandedModules();

  const loading = courseLoading || contentLoading;

  if (loading) return <LoadingSkeleton setSection={setSection} />;
  if (!course) return <CourseNotFound slug={slug} setSection={setSection} />;

  const modules = content?.modules || [];
  const totalModules = content?.totalModules || 0;
  const totalLessons = content?.totalLessons || 0;
  const allLessons = modules.flatMap((m) => m.lessons);
  const publishedLessons = allLessons.filter((l) => l.status === 'published').length;
  const draftLessons = allLessons.filter((l) => l.status === 'draft').length;
  const researchCount = content?.research?.length || 0;
  const lessonsWithScore = allLessons.filter((l) => l.fidelity_score != null);
  const avgFidelity = lessonsWithScore.length > 0
    ? lessonsWithScore.reduce((sum, l) => sum + (l.fidelity_score || 0), 0) / lessonsWithScore.length
    : null;

  const pipelineStages = getPipelineStages({
    hasResearch: researchCount > 0,
    hasModules: totalModules > 0,
    hasLessons: totalLessons > 0,
    publishedLessons,
    totalLessons,
    courseStatus: course.status || '',
  });

  const progressPercent = totalLessons > 0 ? Math.round((publishedLessons / totalLessons) * 100) : 0;
  const currentStage = pipelineStages.find((s) => s.status === 'current')?.label || 'BRIEFING';
  const stats = buildKpiStats({ totalModules, totalLessons, publishedLessons, draftLessons, researchCount, avgFidelity, lessonsWithScoreCount: lessonsWithScore.length });
  const quickActions = getQuickActions(slug || '');
  const metadata = course.project_metadata || {};

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
        <div className="animate-fade-in space-y-6">
          <CourseHeader
            courseName={course.name}
            courseDescription={course.description}
            courseSlug={slug || ''}
            currentStage={currentStage}
          />
          <KpiCardsGrid stats={stats} />
          <ProductionPipeline stages={pipelineStages} progressPercent={progressPercent} />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            <div className="space-y-4 xl:col-span-3">
              <CurriculumStructure
                modules={modules}
                totalModules={totalModules}
                totalLessons={totalLessons}
                courseSlug={slug || ''}
                expandedModules={expandedModules}
                onToggleModule={toggleModule}
              />
            </div>
            <SidebarPanel
              quickActions={quickActions}
              courseInfo={{
                status: course.status,
                projectType: course.project_type,
                metodologia: metadata.metodologia ? String(metadata.metodologia) : undefined,
                duracaoEstimada: metadata.duracao_estimada ? String(metadata.duracao_estimada) : undefined,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseOverview;
