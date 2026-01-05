import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { ReadingStatus } from '@/hooks/useMyBooks';
import { STATUS_CONFIG } from '../data';

interface BookActionsMobileProps {
  currentStatus: ReadingStatus | 'none';
  isFavorite: boolean;
  isChangingStatus: boolean;
  isTogglingFavorite: boolean;
  interactionsLoading: boolean;
  onChangeStatus: (status: ReadingStatus) => void;
  onToggleFavorite: () => void;
  onNavigateToReader: () => void;
}

export const BookActionsMobile: React.FC<BookActionsMobileProps> = ({
  currentStatus,
  isFavorite,
  isChangingStatus,
  isTogglingFavorite,
  interactionsLoading,
  onChangeStatus,
  onToggleFavorite,
  onNavigateToReader,
}) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-card/95 p-4 backdrop-blur-xl md:hidden">
      <div className="flex gap-3">
        {/* Read Button - Primary */}
        <Button
          size="lg"
          className="h-14 flex-1 bg-foreground font-black uppercase tracking-[0.1em] text-xs text-background shadow-lg hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
          onClick={onNavigateToReader}
        >
          <Icon name="book-open-cover" className="mr-2" size="size-4" />
          Ler Resumo
        </Button>

        {/* Status Button - Secondary */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              variant={currentStatus === 'none' ? 'outline' : 'secondary'}
              className={cn(
                'h-14 w-14 shrink-0 p-0 transition-all duration-300',
                currentStatus === 'want_to_read' && 'border-green-500/30 bg-green-500/10 text-green-500',
                currentStatus === 'reading' && 'border-blue-500/30 bg-blue-500/10 text-blue-400',
                currentStatus === 'read' && 'border-primary/30 bg-primary/10 text-primary'
              )}
              disabled={isChangingStatus || interactionsLoading}
            >
              {isChangingStatus ? (
                <Icon name="refresh" className="animate-spin" size="size-5" />
              ) : (
                <Icon name={STATUS_CONFIG[currentStatus].icon} size="size-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onChangeStatus('want_to_read')}>
              <Icon name="bookmark" className="mr-2" size="size-4" />
              Quero Ler
              {currentStatus === 'want_to_read' && (
                <Icon name="check" className="ml-auto text-brand-green" size="size-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeStatus('reading')}>
              <Icon name="book-open" className="mr-2" size="size-4" />
              Lendo
              {currentStatus === 'reading' && (
                <Icon name="check" className="ml-auto text-blue-400" size="size-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeStatus('read')}>
              <Icon name="check-circle" className="mr-2" size="size-4" />
              Lido
              {currentStatus === 'read' && (
                <Icon name="check" className="ml-auto text-brand-gold" size="size-4" />
              )}
            </DropdownMenuItem>
            {currentStatus !== 'none' && (
              <DropdownMenuItem
                onClick={() => onChangeStatus('none' as ReadingStatus)}
                className="text-muted-foreground"
              >
                <Icon name="xmark" className="mr-2" size="size-4" />
                Remover
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className="h-14 w-14 shrink-0 rounded-xl border border-border transition-all duration-300 hover:border-primary/40"
          onClick={onToggleFavorite}
          disabled={interactionsLoading || isTogglingFavorite}
        >
          <Icon
            name={isFavorite ? 'star-solid' : 'star'}
            size="size-5"
            className={cn('transition-colors duration-300', isFavorite ? 'text-primary' : 'text-muted-foreground')}
          />
        </Button>
      </div>
    </div>
  );
};
