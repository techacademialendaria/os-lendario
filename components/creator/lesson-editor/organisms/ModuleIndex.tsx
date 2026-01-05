/**
 * ModuleIndex Organism
 * Displays the course module/lesson navigation index.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ModuleIndexProps } from '../types';

export const ModuleIndex: React.FC<ModuleIndexProps> = ({ modules }) => {
  return (
    <div className="space-y-3 p-3">
      {modules.map((mod) => (
        <div key={mod.id} className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-studio-primary">
            <span className="truncate">{mod.title}</span>
            <span className="font-mono text-[10px] font-normal text-muted-foreground">
              /{mod.lessons.length}
            </span>
          </div>
          {mod.lessons.map((lesson) => (
            <Button
              key={lesson.id}
              variant="ghost"
              className={cn(
                'flex h-auto w-full items-start justify-start gap-2 rounded-lg px-2 py-2 text-left text-xs transition-all',
                lesson.active
                  ? 'bg-studio-primary/10 font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all',
                  lesson.active
                    ? 'border-studio-primary bg-studio-primary'
                    : 'border-muted-foreground/30'
                )}
              >
                {lesson.active && (
                  <Icon name="check" size="size-2" className="text-white" />
                )}
              </span>
              <span className="line-clamp-2 leading-tight">{lesson.title}</span>
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
