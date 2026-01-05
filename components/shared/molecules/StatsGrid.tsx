import React from 'react';
import { StatCard, type StatCardProps } from './StatCard';

export interface StatItem extends Omit<StatCardProps, 'className'> {
  id: string;
}

export interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 3,
  className,
}) => {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columnClasses[columns]} ${className || ''}`}>
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          iconColorClass={stat.iconColorClass}
          bgColorClass={stat.bgColorClass}
          value={stat.value}
          label={stat.label}
          onClick={stat.onClick}
        />
      ))}
    </div>
  );
};
