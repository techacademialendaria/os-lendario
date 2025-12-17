import React from 'react';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Icon } from '../../ui/icon';

// Helper: Extract initials from full name (e.g., "Steve Jobs" -> "SJ")
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
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

export const CloneCardSelect: React.FC<CloneCardSelectProps> = ({ clone, selected, onClick, compact }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer transition-all duration-200 border rounded-lg overflow-hidden group relative",
                selected
                    ? "bg-brand-gold/10 border-brand-gold/50"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10",
                compact ? "p-2 flex items-center gap-3" : "p-4 flex flex-col items-center text-center gap-3"
            )}
        >
            {selected && (
                <div className="absolute top-2 right-2 text-brand-gold bg-black/50 rounded-full">
                    <Icon name="check-circle" className="w-4 h-4" />
                </div>
            )}

            <Avatar className={cn(
                "border",
                selected ? "border-brand-gold" : "border-transparent group-hover:border-white/20",
                compact ? "w-10 h-10" : "w-16 h-16"
            )}>
                {clone.avatar?.startsWith('/') && (
                  <AvatarImage src={clone.avatar} alt={clone.name} />
                )}
                <AvatarFallback className={cn("bg-zinc-800 font-bold text-white", clone.color)}>
                    {clone.avatar?.startsWith('/') ? getInitials(clone.name) : clone.avatar}
                </AvatarFallback>
            </Avatar>

            <div className={cn("flex-1 min-w-0", compact && "text-left")}>
                <h4 className={cn("font-bold text-white truncate", compact ? "text-sm" : "text-base")}>
                    {clone.name}
                </h4>
                <p className={cn("text-zinc-500 truncate", compact ? "text-xs" : "text-sm")}>
                    {clone.role}
                </p>
            </div>

            {!compact && (
                <div className="flex gap-4 text-xs font-mono text-zinc-500 mt-2">
                    <span className="flex items-center gap-1">
                        <Icon name="trophy" className="w-3 h-3" /> {clone.winRate}%
                    </span>
                    <span className="flex items-center gap-1">
                        <Icon name="shield-check" className="w-3 h-3" /> {clone.fidelity}%
                    </span>
                </div>
            )}
        </div>
    );
};
