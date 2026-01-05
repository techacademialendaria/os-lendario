import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STUDIO_ACCENT, STUDIO_PRIMARY } from '../../studio-tokens';

interface Lesson { id: string; title: string; status: string; fidelity_score?: number | null; }
interface Module { id: string; title: string; lessons: Lesson[]; }

interface CurriculumStructureProps {
  modules: Module[];
  totalModules: number;
  totalLessons: number;
  courseSlug: string;
  expandedModules: Set<string>;
  onToggleModule: (moduleId: string) => void;
}

export const CurriculumStructure: React.FC<CurriculumStructureProps> = ({
  modules, totalModules, totalLessons, courseSlug, expandedModules, onToggleModule,
}) => {
  const navigate = useNavigate();
  const goToCurriculum = () => navigate(`/creator/cursos/${courseSlug}/curriculo`);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="border-b border-border pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
            <Icon name="list" size="size-4" /> Estrutura do Curriculo
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{totalModules} modulos - {totalLessons} licoes</span>
            <Button variant="outline" size="sm" onClick={goToCurriculum}>
              <Icon name="pencil" size="size-3" className="mr-1" />Editar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {modules.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg" style={{ backgroundColor: STUDIO_ACCENT }}>
              <Icon name="folder-open" style={{ color: STUDIO_PRIMARY }} size="size-6" />
            </div>
            <p className="mb-4 text-muted-foreground">Nenhum modulo criado ainda</p>
            <Button onClick={goToCurriculum} style={{ backgroundColor: STUDIO_PRIMARY }} className="text-white">
              <Icon name="plus" size="size-4" className="mr-2" />Criar Curriculo
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {modules.map((module, idx) => {
              const isExpanded = expandedModules.has(module.id);
              const pubCount = module.lessons.filter((l) => l.status === 'published').length;
              const moduleProgress = module.lessons.length > 0 ? Math.round((pubCount / module.lessons.length) * 100) : 0;
              return (
                <div key={module.id} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex cursor-pointer items-center justify-between bg-card p-4 transition-colors hover:bg-muted/20" onClick={() => onToggleModule(module.id)}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}>
                        <span className="text-sm font-bold">M{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">{module.title}</h4>
                        <p className="text-xs text-muted-foreground">{module.lessons.length} licoes - {moduleProgress}% completo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full" style={{ width: `${moduleProgress}%`, backgroundColor: STUDIO_PRIMARY }} />
                      </div>
                      <Icon name={isExpanded ? 'angle-up' : 'angle-down'} size="size-4" className="text-muted-foreground" />
                    </div>
                  </div>
                  {isExpanded && module.lessons.length > 0 && (
                    <div className="divide-y divide-border/50">
                      {module.lessons.map((lesson, lessonIdx) => (
                        <Link key={lesson.id} to={`/creator/cursos/${courseSlug}/licoes/${lesson.id}`} className="group flex items-center justify-between p-3 pl-6 transition-colors hover:bg-muted/10">
                          <div className="flex items-center gap-3">
                            <span className="w-8 font-mono text-xs text-muted-foreground">{idx + 1}.{lessonIdx + 1}</span>
                            <span className="text-sm transition-colors group-hover:text-studio-primary">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.fidelity_score != null && <span className="font-mono text-[10px] text-muted-foreground">{Math.round(lesson.fidelity_score * 100)}%</span>}
                            <Badge className={cn('border-0 text-[10px]', lesson.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground')}>
                              {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                            </Badge>
                            <Icon name="angle-right" size="size-4" className="text-muted-foreground group-hover:text-studio-primary" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {isExpanded && module.lessons.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="mb-3 text-sm text-muted-foreground">Este modulo ainda nao tem licoes</p>
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); goToCurriculum(); }}>
                        <Icon name="plus" size="size-3" className="mr-1" />Adicionar Licoes
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
