// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { cn } from '../../../lib/utils';
import CreatorTopbar from '../CreatorTopbar';
import { useCourses, Course as HookCourse, CourseContentCounts } from '../../../hooks/useCourses';
import GlobalMetrics from '../GlobalMetrics';
import PipelineOverview, { PipelineStage } from '../PipelineOverview';
import FidelityBadge from '../FidelityBadge';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from '../studio-tokens';

interface Course {
  id: string | number;
  title: string;
  slug: string;
  icon: string;
  instructor: {
    name: string;
    avatar: string;
    isMMOS: boolean;
  };
  lessonsCount: number;
  modulesCount: number;
  researchCount: number;
  assessmentsCount: number;
  resourcesCount: number;
  duration: string;
  type: 'Greenfield' | 'Brownfield';
  statusLabel: string;
  progress: number;
  updatedAt: string;
  fidelityScore: number | null;
  frameworks: string[];
  pipeline: {
    brief: 'completed' | 'current' | 'pending';
    research: 'completed' | 'current' | 'pending';
    curriculum: 'completed' | 'current' | 'pending';
    lessons: 'completed' | 'current' | 'pending';
    validation: 'completed' | 'current' | 'pending';
  };
}

// Helper to convert hook courses to template Course format
const mapHookCourseToTemplateCourse = (hookCourse: HookCourse): Course => {
  const statusToPipeline = (status: HookCourse['status']): Course['pipeline'] => {
    const pipelines: Record<HookCourse['status'], Course['pipeline']> = {
      planning: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      brief: {
        brief: 'current',
        research: 'pending',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      research: {
        brief: 'completed',
        research: 'current',
        curriculum: 'pending',
        lessons: 'pending',
        validation: 'pending',
      },
      curriculum: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'current',
        lessons: 'pending',
        validation: 'pending',
      },
      generation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'current',
        validation: 'pending',
      },
      validation: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'current',
      },
      published: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'completed',
        validation: 'completed',
      },
    };
    return pipelines[status] || pipelines.planning;
  };

  // Calculate status and progress from actual content
  const getStatusFromCounts = (
    counts: CourseContentCounts | undefined
  ): { label: string; progress: number } => {
    if (!counts || counts.total === 0) {
      return { label: 'Novo', progress: 0 };
    }

    const hasResearch = counts.research > 0;
    const hasModules = counts.modules > 0;
    const hasLessons = counts.lessons > 0;
    const hasValidation = counts.assessments > 0 || counts.reports > 0;

    // Calculate progress based on pipeline completion
    let completedSteps = 1; // Brief always done if total > 0
    if (hasResearch) completedSteps++;
    if (hasModules) completedSteps++;
    if (hasLessons) completedSteps++;
    if (hasValidation) completedSteps++;
    const progress = Math.round((completedSteps / 5) * 100);

    // Determine current status label
    if (hasValidation && hasLessons) {
      return { label: `Completo · ${counts.lessons} lições`, progress: 100 };
    } else if (hasLessons) {
      return { label: `Em Produção · ${counts.lessons} lições`, progress };
    } else if (hasModules) {
      return { label: `Currículo · ${counts.modules} módulos`, progress };
    } else if (hasResearch) {
      return { label: `Pesquisa · ${counts.research} docs`, progress };
    } else {
      return { label: 'Brief', progress: 20 };
    }
  };

  const getIconFromSlug = (slug: string): string => {
    const iconMap: Record<string, string> = {
      'claude-code': 'terminal',
      'didatica-lendaria': 'presentation',
      vibecoding: 'magic-wand',
      'supabase-zero-backend': 'database',
      'dominando-obsidian': 'document',
      'metodo-mapa': 'map-marker',
      'meu-clone-ia': 'fingerprint',
      'prompt-engineer': 'comment-alt',
    };
    return iconMap[slug] || 'book';
  };

  // Use contentCounts to determine pipeline status dynamically
  const getPipelineFromCounts = (counts: CourseContentCounts | undefined): Course['pipeline'] => {
    if (!counts) return statusToPipeline(hookCourse.status);

    // Brief is complete if we have any content
    const hasBrief = counts.total > 0;
    // Research is complete if we have research docs
    const hasResearch = counts.research > 0;
    // Curriculum is complete if we have modules
    const hasCurriculum = counts.modules > 0;
    // Lessons are complete if we have lessons
    const hasLessons = counts.lessons > 0;
    // Validation based on assessments or reports
    const hasValidation = counts.assessments > 0 || counts.reports > 0;

    return {
      brief: hasBrief ? 'completed' : 'pending',
      research: hasResearch ? 'completed' : hasBrief ? 'current' : 'pending',
      curriculum: hasCurriculum ? 'completed' : hasResearch ? 'current' : 'pending',
      lessons: hasLessons ? 'completed' : hasCurriculum ? 'current' : 'pending',
      validation: hasValidation ? 'completed' : hasLessons ? 'current' : 'pending',
    };
  };

  const counts = hookCourse.contentCounts;
  const { label: statusLabel, progress } = getStatusFromCounts(counts);

  // Extract frameworks from metadata
  const getFrameworks = (): string[] => {
    const frameworks: string[] = [];
    const meta = hookCourse.metadata;
    if (meta) {
      if (meta.metodologia) frameworks.push(meta.metodologia as string);
      if (meta.course_type) frameworks.push(meta.course_type as string);
    }
    // Add GPS if course has lessons with GPS structure
    if ((counts?.lessons || 0) > 0) {
      frameworks.push('GPS');
    }
    return frameworks.slice(0, 3); // Max 3 badges
  };

  return {
    id: hookCourse.id,
    title: hookCourse.title,
    slug: hookCourse.slug,
    icon: getIconFromSlug(hookCourse.slug),
    instructor: {
      name: hookCourse.instructor,
      avatar: hookCourse.instructorAvatar || 'https://i.pravatar.cc/150?u=' + hookCourse.slug,
      isMMOS: true,
    },
    lessonsCount: counts?.lessons || hookCourse.lessons,
    modulesCount: counts?.modules || hookCourse.modules,
    researchCount: counts?.research || 0,
    assessmentsCount: counts?.assessments || 0,
    resourcesCount: counts?.resources || 0,
    duration: hookCourse.duration,
    type: (counts?.research || 0) > 0 ? 'Brownfield' : 'Greenfield',
    statusLabel,
    progress,
    updatedAt: new Date(hookCourse.updatedAt).toLocaleDateString('pt-BR'),
    fidelityScore: counts?.avgFidelityScore || null,
    frameworks: getFrameworks(),
    pipeline: getPipelineFromCounts(counts),
  };
};

const PipelineStep = ({
  status,
  label,
  count,
}: {
  status: 'completed' | 'current' | 'pending';
  label: string;
  count?: number;
}) => {
  let iconName = 'circle';
  let colorClass = 'text-muted-foreground/30';
  let labelClass = 'text-muted-foreground/50';

  if (status === 'completed') {
    iconName = 'check-circle';
    colorClass = 'text-success';
    labelClass = 'text-success';
  } else if (status === 'current') {
    iconName = 'target';
    colorClass = 'text-primary animate-pulse';
    labelClass = 'text-primary font-medium';
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <Icon
        name={iconName}
        className={cn('size-4 transition-colors', colorClass)}
        type={status === 'completed' ? 'solid' : 'regular'}
      />
      <span className={cn('text-[8px] uppercase tracking-wide transition-colors', labelClass)}>
        {label}
      </span>
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            'font-mono text-[9px] font-bold',
            status === 'completed' ? 'text-success' : 'text-muted-foreground'
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
};

interface PipelineVisualProps {
  pipeline: Course['pipeline'];
  counts?: {
    research: number;
    modules: number;
    lessons: number;
    assessments: number;
  };
}

const PipelineVisual = ({ pipeline, counts }: PipelineVisualProps) => (
  <div className="relative flex w-full items-center justify-between">
    <div className="absolute left-0 top-[7px] -z-10 h-0.5 w-full bg-muted"></div>
    <div className="z-10 bg-card px-1">
      <PipelineStep status={pipeline.brief} label="Brief" />
    </div>
    <div className="z-10 bg-card px-1">
      <PipelineStep status={pipeline.research} label="Pesquisa" count={counts?.research} />
    </div>
    <div className="z-10 bg-card px-1">
      <PipelineStep status={pipeline.curriculum} label="Módulos" count={counts?.modules} />
    </div>
    <div className="z-10 bg-card px-1">
      <PipelineStep status={pipeline.lessons} label="Lições" count={counts?.lessons} />
    </div>
    <div className="z-10 bg-card px-1">
      <PipelineStep status={pipeline.validation} label="QA" count={counts?.assessments} />
    </div>
  </div>
);

interface CoursesListProps {
  setSection: (s: Section) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const {
    courses: hookCourses,
    loading: isLoading,
    isUsingMockData,
    totalContents,
    aggregatedCounts,
  } = useCourses();
  const allCourses: Course[] = hookCourses.map(mapHookCourseToTemplateCourse);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [instructorFilter, setInstructorFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('recent');

  // Calculate pipeline stage counts from hook courses
  const pipelineStageCounts = useMemo(() => {
    const counts: Record<PipelineStage, number> = {
      brief: 0,
      research: 0,
      curriculum: 0,
      generation: 0,
      validation: 0,
      production: 0,
      published: 0,
    };

    hookCourses.forEach((course) => {
      // Map course status to pipeline stage
      const statusToStage: Record<string, PipelineStage> = {
        planning: 'brief',
        brief: 'brief',
        research: 'research',
        curriculum: 'curriculum',
        generation: 'generation',
        validation: 'validation',
        published: 'published',
      };
      const stage = statusToStage[course.status] || 'brief';
      counts[stage]++;
    });

    return counts;
  }, [hookCourses]);

  // Calculate total hours from all courses
  const totalHours = useMemo(() => {
    return hookCourses.reduce((acc, course) => {
      const hours = course.metadata?.duration_hours || course.metadata?.estimated_hours || 0;
      return acc + (typeof hours === 'number' ? hours : 0);
    }, 0);
  }, [hookCourses]);

  // Get unique minds count
  const uniqueMindsCount = useMemo(() => {
    const minds = new Set<string>();
    hookCourses.forEach((course) => {
      if (course.instructor && course.instructor !== 'Sem instrutor') {
        minds.add(course.instructor);
      }
    });
    return minds.size;
  }, [hookCourses]);

  // Calculate Top Instructors
  type InstructorStat = { name: string; avatar: string; count: number };
  const instructorCounts = allCourses.reduce(
    (acc, course) => {
      const { name, avatar } = course.instructor;
      if (!acc[name]) acc[name] = { name, avatar, count: 0 };
      acc[name].count += 1;
      return acc;
    },
    {} as Record<string, InstructorStat>
  );

  const topInstructors = (Object.values(instructorCounts) as InstructorStat[])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Filter and sort courses
  const courses = useMemo(() => {
    let filtered = [...allCourses];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query) ||
          c.instructor.name.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap: Record<string, Course['pipeline']['validation'][]> = {
        published: ['completed'],
        production: ['current'],
        drafts: ['pending'],
      };
      // Map status filter to pipeline states
      if (statusFilter === 'published') {
        filtered = filtered.filter((c) => c.progress === 100);
      } else if (statusFilter === 'production') {
        filtered = filtered.filter((c) => c.progress > 0 && c.progress < 100);
      } else if (statusFilter === 'drafts') {
        filtered = filtered.filter((c) => c.progress === 0 || c.pipeline.brief === 'current');
      }
    }

    // Instructor filter
    if (instructorFilter !== 'all') {
      filtered = filtered.filter((c) => c.instructor.name === instructorFilter);
    }

    // Sort
    switch (sortOrder) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
      case 'alpha':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }

    return filtered;
  }, [allCourses, searchQuery, statusFilter, instructorFilter, sortOrder]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1200px] p-6 md:p-8">
          {/* Header skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <div />
            <div className="h-9 w-28 animate-pulse rounded bg-muted" />
          </div>

          {/* Metrics skeleton */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted/50" />
            ))}
          </div>

          {/* Pipeline skeleton */}
          <div className="mb-6 h-24 animate-pulse rounded-lg bg-muted/50" />

          {/* Filter skeleton */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-9 max-w-md flex-1 animate-pulse rounded bg-muted/50" />
            <div className="h-9 w-[130px] animate-pulse rounded bg-muted/50" />
            <div className="h-9 w-[130px] animate-pulse rounded bg-muted/50" />
            <div className="h-9 w-[120px] animate-pulse rounded bg-muted/50" />
          </div>

          {/* Course cards skeleton */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-4 rounded-lg bg-muted/30 p-4"
              >
                <div className="h-12 w-12 shrink-0 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted/60" />
                </div>
                <div className="hidden h-8 w-24 rounded bg-muted/60 md:block" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1200px] p-6 md:p-8">
        {/* Header with action */}
        <div className="mb-6 flex items-center justify-between">
          <div />
          <Button
            onClick={() => navigate('/creator/cursos/novo')}
            className="shadow-lg shadow-studio-primary/20"
          >
            <Icon name="plus" className="mr-2 size-4" /> Novo Curso
          </Button>
        </div>

        {/* Global Metrics */}
        <GlobalMetrics
          coursesCount={allCourses.length}
          lessonsCount={aggregatedCounts.lessons}
          totalHours={totalHours || '--'}
          mindsCount={uniqueMindsCount}
          className="mb-6"
        />

        {/* Pipeline Overview */}
        <PipelineOverview stageCounts={pipelineStageCounts} className="mb-6" />

        {/* Main content with sidebar */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Courses list */}
          <div className="min-w-0 flex-1">
            {/* Search + Filters */}
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="size-4"
                />
                <Input
                  placeholder="Buscar cursos..."
                  className="h-9 border-0 bg-muted/50 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                placeholder="Status"
                value={statusFilter}
                onValueChange={setStatusFilter}
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Publicados', value: 'published' },
                  { label: 'Em Produção', value: 'production' },
                  { label: 'Rascunhos', value: 'drafts' },
                ]}
                className="h-9 w-[120px] border-0 bg-muted/50"
              />
              <Select
                placeholder="Ordenar"
                value={sortOrder}
                onValueChange={setSortOrder}
                options={[
                  { label: 'Recentes', value: 'recent' },
                  { label: 'Antigos', value: 'oldest' },
                  { label: 'A-Z', value: 'alpha' },
                ]}
                className="h-9 w-[110px] border-0 bg-muted/50"
              />
            </div>

            {/* Course Cards */}
            <div className="space-y-2">
              {courses.length === 0 ? (
                <div className="rounded-lg bg-muted/30 p-12 text-center">
                  <div className="mx-auto max-w-md">
                    {allCourses.length === 0 ? (
                      <>
                        <Icon
                          name="graduation-cap"
                          className="mx-auto mb-4 text-muted-foreground"
                          size="size-16"
                        />
                        <h3 className="mb-2 text-xl font-bold">Nenhum curso encontrado</h3>
                        <p className="mb-6 text-sm text-muted-foreground">
                          Comece criando seu primeiro curso.
                        </p>
                        <Button
                          onClick={() => navigate('/creator/cursos/novo')}
                          className="bg-primary"
                        >
                          <Icon name="plus" className="mr-2" size="size-4" />
                          Criar Primeiro Curso
                        </Button>
                      </>
                    ) : (
                      <>
                        <Icon
                          name="search"
                          className="mx-auto mb-4 text-muted-foreground"
                          size="size-12"
                        />
                        <h3 className="mb-2 text-lg font-bold">Nenhum resultado</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Nenhum curso corresponde aos filtros.
                        </p>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setSearchQuery('');
                            setStatusFilter('all');
                            setInstructorFilter('all');
                          }}
                        >
                          Limpar Filtros
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                courses.map((course) => (
                  <Card
                    key={course.id}
                    className="group cursor-pointer transition-colors hover:border-studio-primary/30"
                    onClick={() => navigate(`/creator/cursos/${course.slug}`)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon name={course.icon} size="size-5" />
                      </div>

                      {/* Title + Meta */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-studio-primary">
                            {course.title}
                          </span>
                          {course.fidelityScore !== null && course.fidelityScore < 85 && (
                            <FidelityBadge
                              score={course.fidelityScore}
                              size="sm"
                              showLabel={false}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{course.instructor.name}</span>
                          <span>·</span>
                          <span>
                            {course.modulesCount} módulos · {course.lessonsCount} lições
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="hidden shrink-0 text-right md:block">
                        <div className="text-sm font-medium text-foreground">
                          {course.statusLabel}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{course.updatedAt}</div>
                      </div>

                      {/* Arrow */}
                      <Icon
                        name="angle-right"
                        className="text-muted-foreground transition-colors group-hover:text-studio-primary"
                        size="size-4"
                      />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-full shrink-0 space-y-4 lg:w-72">
            {/* Content breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Icon name="layers" size="size-3.5" />
                  Conteúdos por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lições</span>
                  <span className="font-mono font-medium">{aggregatedCounts.lessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Módulos</span>
                  <span className="font-mono font-medium">{aggregatedCounts.modules}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pesquisas</span>
                  <span className="font-mono font-medium">{aggregatedCounts.research}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avaliações</span>
                  <span className="font-mono font-medium">{aggregatedCounts.assessments}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recursos</span>
                  <span className="font-mono font-medium">{aggregatedCounts.resources}</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Instructors */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Icon name="trophy" size="size-3.5" />
                  Top Instrutores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {topInstructors.slice(0, 5).map((instr, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-4 text-xs text-muted-foreground">{idx + 1}.</span>
                      <span className="truncate">{instr.name}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {instr.count} cursos
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesList;
