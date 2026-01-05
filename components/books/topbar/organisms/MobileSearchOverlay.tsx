import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import type { BookData } from '@/hooks/useBooks';
import { SearchResultsDropdown } from '../molecules';

interface MobileSearchOverlayProps {
  isOpen: boolean;
  localQuery: string;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onClose: () => void;
  onInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSelectBook: (book: BookData) => void;
  onClear: () => void;
}

export const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({
  isOpen,
  localQuery,
  results,
  loading,
  inputRef,
  onClose,
  onInput,
  onKeyDown,
  onSelectBook,
  onClear,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClear();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden animate-fade-in">
      {/* Search header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <button
          onClick={handleClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground active:bg-muted"
        >
          <Icon name="arrow-left" size="size-5" />
        </button>
        <div className="relative flex-1 group">
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size="size-4"
          />
          <Input
            ref={inputRef}
            placeholder="Buscar livro..."
            className="h-12 w-full rounded-2xl border-border bg-muted/30 pl-12 pr-10 text-base focus:border-primary/30 transition-all"
            value={localQuery}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
          {localQuery && (
            <button
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <Icon name="xmark" size="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <SearchResultsDropdown
            results={[]}
            loading={true}
            onSelectBook={onSelectBook}
            variant="mobile"
          />
        ) : results.length > 0 ? (
          <SearchResultsDropdown
            results={results}
            loading={false}
            onSelectBook={onSelectBook}
            variant="mobile"
          />
        ) : localQuery.length >= 2 ? (
          <SearchResultsDropdown
            results={[]}
            loading={false}
            onSelectBook={onSelectBook}
            variant="mobile"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Icon name="search" size="size-16" className="text-muted-foreground/20" />
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Digite para buscar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
