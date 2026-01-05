import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { InsightItemProps } from '../types';

export const InsightItem: React.FC<InsightItemProps> = ({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  tag,
  tagColor,
  highlighted,
}) => (
  <div
    className={cn(
      'group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/20',
      highlighted && 'bg-studio-accent/5'
    )}
  >
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all',
        iconBg,
        `border-${tagColor}/20`,
        `group-hover:bg-${tagColor.split('-')[0]}-500 group-hover:text-background`
      )}
    >
      <Icon name={icon as any} size="size-5" className={iconColor} />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="truncate text-sm font-bold text-foreground">{title}</h4>
      <p className="truncate text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <Badge
        variant="outline"
        className={cn(
          'text-xs',
          `border-${tagColor}/20 bg-${tagColor.split('-')[0]}-500/10 text-${tagColor}`
        )}
      >
        {tag}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-foreground"
      >
        <Icon name="angle-right" size="size-4" />
      </Button>
    </div>
  </div>
);
