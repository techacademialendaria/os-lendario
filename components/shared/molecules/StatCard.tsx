import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Icon } from '../../ui/icon';

export interface StatCardProps {
  icon: string;
  iconColorClass: string;
  bgColorClass: string;
  value: number | string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconColorClass,
  bgColorClass,
  value,
  label,
  onClick,
  className,
}) => {
  const Component = onClick ? 'button' : 'div';

  return (
    <Card className={onClick ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}>
      <CardContent className={`flex items-center gap-4 p-4 ${className || ''}`}>
        <Component
          onClick={onClick}
          className="flex w-full items-center gap-4"
          {...(onClick ? { type: 'button' } : {})}
        >
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${bgColorClass}`}>
            <Icon name={icon} className={`size-6 ${iconColorClass}`} />
          </div>
          <div className="text-left">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </Component>
      </CardContent>
    </Card>
  );
};
