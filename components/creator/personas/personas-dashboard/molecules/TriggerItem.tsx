import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { TriggerItemProps, TagColor } from '../types';

const TAG_STYLES: Record<TagColor, string> = {
  indigo: 'border-indigo-500/20 bg-indigo-500/20 text-indigo-300',
  purple: 'border-purple-500/20 bg-purple-500/20 text-purple-300',
  emerald: 'border-emerald-500/20 bg-emerald-500/20 text-emerald-300',
};

export const TriggerItem: React.FC<TriggerItemProps> = ({
  icon,
  title,
  description,
  tags,
  tagColors,
}) => (
  <div className="group cursor-pointer rounded-lg border border-transparent bg-muted/20 p-3 transition-all hover:border-border hover:bg-muted/30">
    <div className="mb-1 flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Icon name={icon as any} size="size-4" className="text-studio-accent" />
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
      </div>
      <div className="flex gap-1">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={cn(
              'rounded border px-1.5 py-0.5 text-[10px] font-medium',
              TAG_STYLES[tagColors[i]]
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <p className="pl-6 text-xs leading-relaxed text-muted-foreground">{description}</p>
  </div>
);
