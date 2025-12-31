import React from 'react';
import { cn } from '../../lib/utils';

export interface CircularProgressScoreProps {
  /** Score value from 0 to 100 */
  score: number;
  /** Size of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Label text below the score */
  label?: string;
  /** Custom class for the container */
  className?: string;
}

const sizeConfig = {
  sm: { container: 'h-12 w-12', text: 'text-sm', label: 'text-[10px]' },
  md: { container: 'h-16 w-16', text: 'text-xl', label: 'text-xs' },
  lg: { container: 'h-20 w-20', text: 'text-2xl', label: 'text-xs' },
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-orange-500';
};

export const CircularProgressScore: React.FC<CircularProgressScoreProps> = ({
  score,
  size = 'lg',
  label,
  className,
}) => {
  const config = sizeConfig[size];
  const colorClass = getScoreColor(score);

  return (
    <div className={cn('text-center', className)}>
      <div className={cn('relative mx-auto mb-2 flex items-center justify-center', config.container)}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            className="text-muted"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <path
            className={colorClass}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', config.text, colorClass)}>
            {score}
          </span>
        </div>
      </div>
      {label && (
        <p className={cn('text-muted-foreground', config.label)}>{label}</p>
      )}
    </div>
  );
};

export default CircularProgressScore;
