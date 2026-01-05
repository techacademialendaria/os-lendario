import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

export interface ExpandableCardProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  icon?: string;
  badge?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  defaultExpanded?: boolean;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  id,
  title,
  isExpanded,
  onToggle,
  children,
  icon,
  badge,
  className,
  headerClassName,
  contentClassName,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader
        className={cn(
          'cursor-pointer select-none transition-colors hover:bg-muted/50',
          headerClassName
        )}
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <Icon name={icon} className="size-5 text-muted-foreground" />
            )}
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {badge}
          </div>
          <Icon
            name="chevron-down"
            className={cn(
              'size-5 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </div>
      </CardHeader>
      <div
        className={cn(
          'grid transition-all duration-200',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <CardContent className={cn('pt-0', contentClassName)}>
            {children}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
