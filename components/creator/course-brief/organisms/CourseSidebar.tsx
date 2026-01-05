import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { CourseSidebarProps } from '../types';

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  courseTitle,
  currentStep,
  pipeline,
  onNavigate,
}) => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-64 shrink-0 flex-col border-r border-border bg-card/50">
      <div className="border-b border-border p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('overview')}
          className="mb-2 h-auto w-full justify-start px-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="arrow-left" size="size-3" className="mr-2" />
          <span>Voltar ao curso</span>
        </Button>
        <h3 className="truncate font-bold text-foreground">{courseTitle}</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Pipeline
          </p>
          {pipeline.map((step) => {
            let iconName = 'circle';
            let colorClass = 'text-muted-foreground/40';

            if (step.status === 'completed') {
              iconName = 'check-circle';
              colorClass = 'text-success';
            } else if (step.status === 'current') {
              iconName = 'target';
              colorClass = 'text-primary';
            }

            const isActive = currentStep === step.key;

            return (
              <Button
                key={step.key}
                variant="ghost"
                onClick={() => step.status !== 'pending' && onNavigate(step.key as import('../types').CourseView)}
                disabled={step.status === 'pending'}
                className={cn(
                  'flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all',
                  isActive
                    ? 'bg-studio-primary/10 font-medium text-studio-primary ring-1 ring-studio-primary/20'
                    : step.status === 'pending'
                      ? 'cursor-not-allowed text-muted-foreground/50'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon
                  name={iconName}
                  size="size-4"
                  className={colorClass}
                  type={step.status === 'completed' ? 'solid' : 'regular'}
                />
                <span>{step.label}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-muted/20 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="clock" size="size-3" />
          <span>Auto-save ativo</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Última alteração: há 2 min</p>
      </div>
    </div>
  );
};
