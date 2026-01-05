import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Select } from '../../../ui/select';
import { cn } from '../../../../lib/utils';
import { SearchInput } from '../../../shared/molecules';
import { CourseCard, MetricCard, PipelineStage, ContentTypeBar, ActivityItem } from '../molecules';
import type { Course, ViewMode, MetricConfig, PipelineStageConfig } from '../types';
import { DEFAULT_CONTENT_TYPES } from '../types';

interface CoursesListViewProps {
  courses: Course[];
  filteredCourses: Course[];
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  stats: {
    totalLessons: number;
    totalModules: number;
    pipelineCounts: {
      briefing: number;
      research: number;
      curriculum: number;
      generation: number;
      validation: number;
      published: number;
    };
  };
  recentActivities: Array<{
    id: string;
    tipo_label: string;
    title: string;
    project_slug: string;
    project_name: string;
    updated_at: string;
  }>;
  activitiesLoading: boolean;
}

export const CoursesListView: React.FC<CoursesListViewProps> = ({
  courses,
  filteredCourses,
  loading,
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  stats,
  recentActivities,
  activitiesLoading,
}) => {
  const navigate = useNavigate();

  // Metrics config
  const metrics: MetricConfig[] = [
    {
      label: 'Cursos Ativos',
      value: courses.length,
      icon: 'graduation-cap',
      change: '+12%',
      changeLabel: 'vs mês anterior',
      trendUp: true,
      sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0',
    },
    {
      label: 'Total de Lições',
      value: stats.totalLessons,
      icon: 'document',
      change: '+5',
      changeLabel: 'novas esta semana',
      trendUp: true,
      sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2',
    },
    {
      label: 'Horas de Conteúdo',
      value: '28.8h',
      icon: 'clock',
      change: '—',
      changeLabel: '0% atualizado hoje',
      trendUp: false,
      sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15',
    },
    {
      label: 'Alunos Impactados',
      value: '3.2k',
      icon: 'users',
      change: '+15%',
      changeLabel: 'vs mês anterior',
      trendUp: true,
      sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0',
    },
  ];

  // Pipeline stages config
  const pipelineStages: PipelineStageConfig[] = [
    { id: 'briefing', label: 'BRIEFING', icon: 'file-edit', count: stats.pipelineCounts.briefing || 8, status: 'active' },
    { id: 'research', label: 'PESQUISA', icon: 'search', count: stats.pipelineCounts.research || 3, status: 'pending' },
    { id: 'curriculum', label: 'CURRÍCULO', icon: 'list', count: stats.pipelineCounts.curriculum || 1, status: 'pending' },
    { id: 'generation', label: 'GERAÇÃO', icon: 'magic-wand', count: stats.pipelineCounts.generation || 2, status: 'pending' },
    { id: 'validation', label: 'VALIDAÇÃO', icon: 'check-circle', count: stats.pipelineCounts.validation || 0, status: 'pending' },
    { id: 'production', label: 'PRODUÇÃO', icon: 'video-camera', count: 4, status: 'pending' },
    { id: 'published', label: 'PUBLICADO', icon: 'rocket', count: stats.pipelineCounts.published || 12, status: 'done' },
  ];

  // Loading skeleton
  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-5">
              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted/60" />
              </div>
            </Card>
          ))}
        </div>
        {/* Pipeline skeleton */}
        <Card className="p-6">
          <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
              </div>
            ))}
          </div>
        </Card>
        {/* Course cards skeleton */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="space-y-3 xl:col-span-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Pipeline de Produção */}
      <Card className="group cursor-pointer border-border bg-card transition-colors hover:border-studio-primary/50">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-studio-primary">
              <Icon name="sitemap" size="size-4" /> Pipeline de Produção
            </h3>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground transition-colors group-hover:border-studio-primary group-hover:text-studio-primary"
            >
              Clique para Gerenciar <Icon name="arrow-right" size="size-3" className="ml-2" />
            </Badge>
          </div>

          <div className="relative flex min-w-[700px] items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted">
              <div className="h-full bg-studio-primary transition-all duration-1000" style={{ width: '15%' }} />
            </div>

            {pipelineStages.map((stage) => (
              <PipelineStage key={stage.id} stage={stage} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* Left: Course List */}
        <div className="space-y-4 xl:col-span-3">
          {/* Search + Filters */}
          <Card className="border-border/30 bg-card/50">
            <CardContent className="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar cursos..."
                className="flex-1"
              />
              <Select
                placeholder="Todos"
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Publicados', value: 'published' },
                  { label: 'Em Produção', value: 'production' },
                ]}
                className="h-10 w-full sm:w-[120px]"
              />
              <div className="flex rounded-lg border border-border/30 bg-muted/20 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('h-8 w-8', viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
                  onClick={() => setViewMode('list')}
                >
                  <Icon name="list" size="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('h-8 w-8', viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
                  onClick={() => setViewMode('grid')}
                >
                  <Icon name="grid" size="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Course Cards */}
          <div
            className={cn(
              'transition-all duration-300',
              viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3'
            )}
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewMode={viewMode}
                onClick={() => navigate(`/creator/cursos/${course.slug}`)}
              />
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="h-fit space-y-6 lg:sticky lg:top-24">
          {/* Activity Feed */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                <Icon name="bell" size="size-4" /> Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-0 pt-4">
              <div className="relative space-y-0">
                {/* Timeline vertical line */}
                <div className="absolute bottom-6 left-4 top-2 w-px bg-border" />

                {activitiesLoading ? (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="relative flex gap-4 pb-6">
                      <div className="z-10 h-8 w-8 shrink-0 animate-pulse rounded-lg bg-muted/30" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-3 w-24 animate-pulse rounded bg-muted/30" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted/20" />
                      </div>
                    </div>
                  ))
                ) : recentActivities.length === 0 ? (
                  <div className="py-4 text-center">
                    <Icon name="inbox" size="size-6" className="mx-auto mb-2 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">Nenhuma atividade recente</p>
                  </div>
                ) : (
                  recentActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      onClick={() => navigate(`/creator/cursos/${activity.project_slug}`)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content by Type */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border pb-3">
              <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                <Icon name="layers" size="size-4" /> Conteúdos por Tipo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              {DEFAULT_CONTENT_TYPES.map((type, i) => (
                <ContentTypeBar key={i} type={type} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
