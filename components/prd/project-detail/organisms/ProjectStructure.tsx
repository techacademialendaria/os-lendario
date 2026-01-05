// PRD Project Detail - Structure organism
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { ProjectStructureProps } from '../types';
import { STUDIO_TEAL, SUCCESS_GREEN } from '../types';

export const ProjectStructure: React.FC<ProjectStructureProps> = ({
  storiesByEpic,
  totalEpics,
  totalStories,
  onNavigateToEpics,
  onNavigateToStories,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Estrutura do Projeto</h3>
          <p className="text-xs text-muted-foreground">
            {totalEpics} epicos - {totalStories} stories
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          style={{ color: STUDIO_TEAL }}
          onClick={onNavigateToEpics}
        >
          <Icon name="pencil" size="size-3" /> Editar
        </Button>
      </div>

      <div className="space-y-4">
        {storiesByEpic.length > 0 ? (
          <Accordion type="multiple" defaultValue={[storiesByEpic[0]?.id]} className="space-y-4">
            {storiesByEpic.map((epic, idx) => {
              const epicStories = epic.stories || [];
              const completedCount = epicStories.filter((s) => s.metadata?.isValidated).length;
              const totalCount = epicStories.length || 1;
              const epicProgress = Math.round((completedCount / totalCount) * 100);

              return (
                <AccordionItem
                  key={epic.id}
                  value={epic.id}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline">
                    <div className="flex flex-1 items-center gap-4">
                      <Badge variant="outline" className="font-mono text-xs">
                        E{idx + 1}
                      </Badge>
                      <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                        {epic.title}
                      </span>
                      <div className="ml-auto mr-4 flex items-center gap-4 text-xs font-normal text-muted-foreground">
                        <span>{epicStories.length} stories</span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${epicProgress}%`,
                              backgroundColor: epicProgress === 100 ? SUCCESS_GREEN : STUDIO_TEAL,
                            }}
                          ></div>
                        </div>
                        <span>{epicProgress}%</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-border bg-muted/10 p-0">
                    <div className="divide-y divide-border/50">
                      {epicStories.length > 0 ? (
                        epicStories.map((story, sIdx) => (
                          <div
                            key={story.id}
                            className="group flex cursor-pointer items-center justify-between p-3 pl-6 transition-colors hover:bg-muted/20"
                            onClick={onNavigateToStories}
                          >
                            <div className="flex items-center gap-4">
                              <span className="w-8 font-mono text-xs text-muted-foreground">
                                {idx + 1}.{sIdx + 1}
                              </span>
                              <span
                                className="text-sm font-medium text-foreground transition-colors group-hover:text-[var(--studio-teal)]"
                                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                              >
                                {story.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge
                                variant="outline"
                                className={cn(
                                  'border-0 text-[10px] font-normal',
                                  story.metadata?.isValidated
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-muted text-muted-foreground'
                                )}
                              >
                                {story.metadata?.isValidated ? 'Concluido' : 'Rascunho'}
                              </Badge>
                              <Icon
                                name="angle-small-right"
                                className="text-muted-foreground group-hover:text-foreground"
                                size="size-3"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs italic text-muted-foreground">
                          Nenhuma historia criada neste epico.
                        </div>
                      )}
                      <div className="flex justify-center p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-[var(--studio-teal)]"
                          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                        >
                          <Icon name="plus" size="size-3" className="mr-1" /> Adicionar Story
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <Icon name="layers" className="mx-auto mb-4 size-12 text-muted-foreground" />
            <p className="text-muted-foreground">Nenhum epico criado ainda.</p>
            <Button variant="outline" className="mt-4" onClick={onNavigateToEpics}>
              Criar Epicos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
