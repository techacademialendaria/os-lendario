import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ValidationBarProps } from '../types';

export const ValidationBar: React.FC<ValidationBarProps> = ({
  icon,
  iconColor,
  label,
  value,
  barColor,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-2 font-medium text-foreground">
        <Icon name={icon as any} size="size-4" className={iconColor} />
        {label}
      </span>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
      <div className={cn('h-full rounded-full', barColor)} style={{ width: `${value}%` }} />
    </div>
  </div>
);
