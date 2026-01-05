// EpicsList Organism
// Displays list of epics with their stories

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { EpicWithStories } from '../types';

interface EpicsListProps {
  epics: EpicWithStories[];
  onAddStory: (epicId: string) => void;
}

export const EpicsList: React.FC<EpicsListProps> = ({ epics, onAddStory }) => (
  <div className="animate-fade-in space-y-4">
    {epics.map((epic, index) => (
      <Accordion
        key={epic.id}
        type="single"
        collapsible
        defaultValue={index === 0 ? epic.id : undefined}
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionItem value={epic.id} className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
            <div className="flex flex-1 items-center gap-4 text-left">
              <div className="flex size-12 flex-col items-center justify-center rounded-lg border border-border bg-muted">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Epico
                </span>
                <span className="font-mono text-lg font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-foreground">{epic.title}</h4>
                <p className="font-serif text-sm text-muted-foreground">
                  {epic.description}
                </p>
              </div>
              <Badge variant="outline" className="mr-4">
                {epic.detailedStories?.length || 0} stories
              </Badge>
            </div>
          </AccordionTrigger>

          <AccordionContent className="border-t border-border bg-muted/5 p-0">
            <div className="divide-y divide-border/50">
              {epic.detailedStories?.map((story) => (
                <div
                  key={story.id}
                  className="group flex items-center gap-4 p-4 pl-8 transition-colors hover:bg-muted/20"
                >
                  <div className="w-16 font-mono text-xs text-muted-foreground">
                    {story.id}
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <Badge variant="secondary" className="h-4 px-1 text-[9px]">
                      {story.verb}
                    </Badge>
                    <span className="text-sm font-medium">
                      {story.title.replace(story.verb, '').trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span title="Complexidade">
                      Comp:{' '}
                      <strong
                        className={cn(
                          story.complexity === 'P' && 'text-green-600',
                          story.complexity === 'M' && 'text-amber-600',
                          story.complexity === 'G' && 'text-red-600'
                        )}
                      >
                        {story.complexity}
                      </strong>
                    </span>
                    <span title="Criterios de Aceite">
                      <Icon name="check-circle" size="size-3" className="mr-1 inline" />
                      {story.criteria}
                    </span>
                  </div>
                  <div className="w-8 opacity-0 group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="size-6">
                      <Icon name="edit" size="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/50 p-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => onAddStory(epic.id)}
              >
                <Icon name="plus" size="size-3" /> Adicionar Story Manual
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))}
  </div>
);
