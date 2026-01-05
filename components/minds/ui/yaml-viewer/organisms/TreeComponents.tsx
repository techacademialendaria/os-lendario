import React from 'react';
import { Icon } from '../../../../ui/icon';
import { cn } from '../../../../../lib/utils';
import { formatKey } from '../types';

// --- NEURAL TREE COMPONENTS ---

export const TreeLine: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
  <div
    className={cn(
      'absolute bottom-0 left-0 top-0 w-px border-l border-white/5',
      isLast && 'h-[18px]'
    )}
  />
);

export const Connector: React.FC = () => (
  <div className="absolute left-0 top-[18px] h-px w-4 border-t border-white/5" />
);

export const ExpandButton: React.FC<{ expanded: boolean; onClick: () => void }> = ({
  expanded,
  onClick,
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="bg-studio-card absolute -left-[5px] top-[13px] z-10 flex h-[11px] w-[11px] items-center justify-center rounded-[2px] border border-white/10 opacity-0 transition-all hover:border-studio-primary/50 group-hover/node:opacity-100"
  >
    <Icon name={expanded ? 'minus' : 'plus'} size="size-[6px]" className="text-zinc-500" />
  </button>
);

export const KeyLabel: React.FC<{ label: string; icon?: string }> = ({ label, icon }) => (
  <span className="flex select-none items-center gap-2 text-sm font-medium text-zinc-400 transition-colors group-hover/node:text-zinc-200">
    {icon && (
      <Icon
        name={icon}
        size="size-3"
        className="opacity-40 transition-opacity group-hover/node:opacity-80"
      />
    )}
    <span className="opacity-90">{formatKey(label)}</span>
  </span>
);

export const ValueBadge: React.FC<{ value: string | number }> = ({ value }) => (
  <span className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
    {value}
  </span>
);
