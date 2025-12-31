import React from 'react';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Icon } from '../../ui/icon';

// Helper: Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Reuse the Mind interface from ArenaTemplate or define common one
export interface Mind {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
}

interface CloneCardSelectProps {
  clone: Mind;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

export const CloneCardSelect: React.FC<CloneCardSelectProps> = ({
  clone,
  selected,
  onClick,
  compact,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-lg border transition-all duration-200',
        selected
          ? 'border-studio-primary/50 bg-studio-primary/10'
          : 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10',
        compact ? 'flex items-center gap-3 p-2' : 'flex flex-col items-center gap-3 p-4 text-center'
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 rounded-full bg-black/50 text-studio-primary">
          <Icon name="check-circle" className="h-4 w-4" />
        </div>
      )}

      <Avatar
        className={cn(
          'border',
          selected ? 'border-studio-primary' : 'border-transparent group-hover:border-white/20',
          compact ? 'h-10 w-10' : 'h-16 w-16'
        )}
      >
        {clone.avatar?.startsWith('/') && <AvatarImage src={clone.avatar} alt={clone.name} />}
        <AvatarFallback className={cn('bg-zinc-800 font-bold text-white', clone.color)}>
          {clone.avatar?.startsWith('/') ? getInitials(clone.name) : clone.avatar}
        </AvatarFallback>
      </Avatar>

      <div className={cn('min-w-0 flex-1', compact && 'text-left')}>
        <h4 className={cn('truncate font-bold text-white', compact ? 'text-sm' : 'text-base')}>
          {clone.name}
        </h4>
        <p className={cn('truncate text-zinc-500', compact ? 'text-xs' : 'text-sm')}>
          {clone.role}
        </p>
      </div>

      {!compact && (
        <div className="mt-2 flex gap-4 font-mono text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Icon name="trophy" className="h-3 w-3" /> {clone.winRate}%
          </span>
          <span className="flex items-center gap-1">
            <Icon name="shield" className="h-3 w-3" /> {clone.fidelity}%
          </span>
        </div>
      )}
    </div>
  );
};
