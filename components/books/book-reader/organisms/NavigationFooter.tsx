import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { NavigationFooterProps } from '../types';

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  interactions,
  interactionsLoading,
  isMarkingRead,
  onNavigateToDetails,
  onMarkAsRead,
}) => {
  const isRead = interactions?.readingStatus === 'read';

  return (
    <div className="mt-32 flex animate-fade-in items-center justify-between border-t border-border pt-12">
      <button
        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        onClick={onNavigateToDetails}
      >
        <Icon name="arrow-left" size="size-4" /> Voltar aos Detalhes
      </button>
      <button
        className={cn(
          'h-14 gap-3 rounded-full px-10 font-black uppercase tracking-[0.2em] text-sm shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] flex items-center',
          isRead
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-primary text-primary-foreground'
        )}
        onClick={onMarkAsRead}
        disabled={isMarkingRead || interactionsLoading}
      >
        {isMarkingRead ? (
          <Icon name="refresh" className="animate-spin" size="size-4" />
        ) : isRead ? (
          <Icon name="check-circle" type="solid" size="size-4" />
        ) : (
          <Icon name="check" size="size-4" />
        )}
        {isRead ? 'Lido' : 'Marcar como Lido'}
      </button>
    </div>
  );
};
