// EpicsList organism for Stories Template
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { EpicsListProps, STUDIO_TEAL } from '../types';

export const EpicsList: React.FC<EpicsListProps> = ({
  epics,
  stories,
  selectedEpicId,
  onSelectEpic,
  totalStories,
}) => (
  <aside className="w-80 flex-shrink-0 border-r border-border bg-muted/30">
    <div className="sticky top-0 border-b border-border bg-background/80 p-4 backdrop-blur-sm">
      <h3 className="font-bold">Epicos</h3>
      <p className="text-xs text-muted-foreground">{totalStories} stories total</p>
    </div>

    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="space-y-2 p-4">
        {epics.map((epic, i) => {
          const count = stories.filter((s) => s.epic_id === epic.id).length;
          const isSelected = selectedEpicId === epic.id;

          return (
            <button
              key={epic.id}
              onClick={() => onSelectEpic(epic.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all',
                isSelected
                  ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]'
                  : 'border-transparent hover:bg-muted'
              )}
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: STUDIO_TEAL }}
              >
                {i + 1}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="truncate text-sm font-medium">{epic.title}</div>
                <div className="text-xs text-muted-foreground">{count} stories</div>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  </aside>
);
