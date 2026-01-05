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

interface BookActionsDesktopProps {
  bookSlug: string;
  currentStatus: ReadingStatus | 'none';
  isChangingStatus: boolean;
  interactionsLoading: boolean;
  book: {
    title?: string;
    author?: string;
  };
  onChangeStatus: (status: ReadingStatus) => void;
  onNavigateToReader: () => void;
}

export const BookActionsDesktop: React.FC<BookActionsDesktopProps> = ({
  currentStatus,
  isChangingStatus,
  interactionsLoading,
  book,
  onChangeStatus,
  onNavigateToReader,
}) => {
  return (
    <div className="mt-10 hidden space-y-3 md:block">
      {/* Read Summary Button - Primary Action */}
      <Button
        size="lg"
        className="group relative h-16 w-full overflow-hidden rounded-2xl bg-foreground font-black uppercase tracking-[0.3em] text-[10px] text-background shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all duration-500"
        onClick={onNavigateToReader}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <Icon name="book-open-cover" size="size-4" />
          Ler Resumo
        </span>
        {/* Hover fill effect */}
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </Button>

      {/* Reading Status Button - Secondary */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className={cn(
              'h-14 w-full rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 border-2',
              currentStatus === 'none' && 'border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground',
              currentStatus === 'want_to_read' && 'border-primary/50 bg-primary/5 text-primary',
              currentStatus === 'reading' && 'border-primary/50 bg-primary/5 text-primary',
              currentStatus === 'read' && 'border-primary bg-primary/10 text-primary'
            )}
            disabled={isChangingStatus || interactionsLoading}
          >
            {isChangingStatus ? (
              <Icon name="refresh" className="mr-3 animate-spin" size="size-4" />
            ) : (
              <Icon name={STATUS_CONFIG[currentStatus].icon} className="mr-3" size="size-4" />
            )}
            {STATUS_CONFIG[currentStatus].label}
            <Icon name="chevron-down" className="ml-auto" size="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="left" className="!w-full rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl p-2">
          <DropdownMenuItem
            onClick={() => onChangeStatus('want_to_read')}
            className="rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em]"
          >
            <Icon name="bookmark" className="mr-3" size="size-4" />
            Quero Ler
            {currentStatus === 'want_to_read' && (
              <Icon name="check" className="ml-auto text-primary" size="size-4" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onChangeStatus('reading')}
            className="rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em]"
          >
            <Icon name="book-open" className="mr-3" size="size-4" />
            Lendo
            {currentStatus === 'reading' && (
              <Icon name="check" className="ml-auto text-primary" size="size-4" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onChangeStatus('read')}
            className="rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em]"
          >
            <Icon name="check-circle" className="mr-3" size="size-4" />
            Lido
            {currentStatus === 'read' && (
              <Icon name="check" className="ml-auto text-primary" size="size-4" />
            )}
          </DropdownMenuItem>
          {currentStatus !== 'none' && (
            <DropdownMenuItem
              onClick={() => onChangeStatus('none' as ReadingStatus)}
              className="rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground mt-1 border-t border-border/30"
            >
              <Icon name="xmark" className="mr-3" size="size-4" />
              Remover da Lista
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Buy on Amazon - Destacado */}
      <a
        href={`https://www.amazon.com.br/s?k=${encodeURIComponent((book.title || '') + ' ' + (book.author || ''))}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-full items-center justify-between px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-500 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex items-center gap-3">
          <Icon name="amazon" size="size-4" />
          Comprar na Amazon
        </span>
        <Icon name="arrow-up-right" size="size-4" className="opacity-60 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
};
