import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { CoursesHeader } from '../../ui';
import type { Course } from '../types';

interface CurriculumModule {
  id: string;
  title: string;
  description?: string;
  lessons: Array<{
    id: string;
    slug: string;
    title: string;
    duration?: string;
    fidelity_score?: number;
    status: string;
  }>;
}

interface CurriculumViewProps {
  selectedCourse: Course | undefined;
  courseContent: {
    projectName: string;
    totalModules: number;
    totalLessons: number;
    modules: CurriculumModule[];
  } | null;
  contentLoading: boolean;
  onBack: () => void;
  onBreadcrumbClick: () => void;
  onStartGeneration: () => void;
  onGoToBrief: () => void;
  onLessonClick: (lessonSlug: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  selectedCourse,
  courseContent,
  contentLoading,
  onBack,
  onBreadcrumbClick,
  onStartGeneration,
  onGoToBrief,
  onLessonClick,
}) => {
  const courseName = courseContent?.projectName || selectedCourse?.title || 'Curso';
  const modules = courseContent?.modules || [];

  // Loading skeleton
  if (contentLoading) {
    return (
      <div className="animate-fade-in space-y-8 pb-20">
        <div className="mb-6">
          <div className="mb-2 h-4 w-48 animate-pulse rounded bg-muted" />
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-40 animate-pulse rounded bg-muted/60" />
          <div className="flex gap-2">
            <div className="h-8 w-28 animate-pulse rounded bg-muted" />
            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((m) => (
            <Card key={m}>
              <CardHeader className="border-b border-border bg-muted/20 py-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {[1, 2, 3].map((l) => (
                  <div
                    key={l}
                    className="flex items-center justify-between border-b border-border p-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded bg-muted/40" />
                      <div className="h-4 w-10 animate-pulse rounded bg-muted/40" />
                      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                      <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title={courseName}
        breadcrumb="Currículo"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground">
          {courseContent
            ? `${courseContent.totalModules} módulos · ${courseContent.totalLessons} lições`
            : 'Estrutura gerada com base no brief otimizado e gaps de mercado.'}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="refresh" className="mr-2" /> Regenerar
          </Button>
          <Button size="sm" onClick={onStartGeneration} className="shadow-lg shadow-primary/20">
            Aprovar e Criar Aulas
          </Button>
        </div>
      </div>

      {modules.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="folder-open" className="mx-auto mb-4 text-muted-foreground" size="size-12" />
          <h3 className="mb-2 text-lg font-bold">Nenhum conteúdo encontrado</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Este curso ainda não tem módulos ou lições cadastrados.
          </p>
          <Button onClick={onGoToBrief}>Criar Brief</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {modules.map((mod, modIndex) => (
            <Card key={mod.id}>
              <CardHeader className="border-b border-border bg-muted/20 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-studio-primary">
                    Módulo {modIndex + 1}: {mod.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {mod.lessons.length} aulas
                  </Badge>
                </div>
                {mod.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{mod.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {mod.lessons.map((les, lesIndex) => (
                  <div
                    key={les.id}
                    className="group flex cursor-pointer items-center justify-between border-b border-border p-4 last:border-0 hover:bg-muted/10"
                    onClick={() => onLessonClick(les.slug)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name="menu-burger"
                        className="cursor-grab text-muted-foreground opacity-30 group-hover:opacity-100"
                        size="size-3"
                      />
                      <span className="w-10 font-mono text-xs text-muted-foreground">
                        {modIndex + 1}.{lesIndex + 1}
                      </span>
                      <span className="text-sm font-medium">{les.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {les.fidelity_score && (
                        <Badge
                          variant={
                            les.fidelity_score >= 80
                              ? 'success'
                              : les.fidelity_score >= 60
                                ? 'warning'
                                : 'destructive'
                          }
                          className="text-[10px]"
                        >
                          Score: {les.fidelity_score}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-[10px] font-normal">
                        {les.duration || '--'}
                      </Badge>
                      <Badge
                        variant={les.status === 'published' ? 'success' : 'outline'}
                        className="text-[10px]"
                      >
                        {les.status === 'published'
                          ? 'Publicado'
                          : les.status === 'draft'
                            ? 'Rascunho'
                            : les.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Icon name="pencil" size="size-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
