import React from 'react';
import { Clone } from './types';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback } from '../../ui/avatar';

interface CloneCardSelectProps {
  clone: Clone;
  selected: boolean;
  onClick: () => void;
}

export const CloneCardSelect: React.FC<CloneCardSelectProps> = ({ clone, selected, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'group relative cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300',
      selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'
    )}
  >
    {selected && (
      <div className="absolute right-2 top-2 text-primary">
        <Icon name="check-circle" type="solid" />
      </div>
    )}
    <div className="flex flex-col items-center gap-3 text-center">
      <Avatar
        className={cn('h-16 w-16 border-2', selected ? 'border-primary' : 'border-transparent')}
      >
        <AvatarFallback className={cn('bg-muted font-bold', clone.color)}>
          {clone.avatar}
        </AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-foreground">{clone.name}</h4>
        <p className="text-xs text-muted-foreground">{clone.role}</p>
      </div>
      <div className="flex gap-4 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Icon name="trophy" size="size-3" /> {clone.winRate}%
        </span>
        <span className="flex items-center gap-1">
          <Icon name="shield" size="size-3" /> {clone.fidelity}%
        </span>
      </div>
    </div>
  </div>
);
