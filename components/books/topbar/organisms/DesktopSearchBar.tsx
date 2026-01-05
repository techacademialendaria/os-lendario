import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { BookData } from '@/hooks/useBooks';
import { SearchResultsDropdown } from '../molecules';

interface DesktopSearchBarProps {
  localQuery: string;
  isSearchFocused: boolean;
  isDropdownOpen: boolean;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelectBook: (book: BookData) => void;
}

export const DesktopSearchBar: React.FC<DesktopSearchBarProps> = ({
  localQuery,
  isSearchFocused,
  isDropdownOpen,
  results,
  loading,
  inputRef,
  dropdownRef,
  onInput,
  onKeyDown,
  onFocus,
  onBlur,
  onSelectBook,
}) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="group relative">
        <Icon
          name="search"
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-300',
            isSearchFocused ? 'text-primary' : 'text-muted-foreground'
          )}
          size="size-3"
        />
        <input
          ref={inputRef}
          placeholder="BUSCAR LIVRO..."
          className="h-10 w-56 bg-transparent pl-6 pr-4 text-[9px] font-black uppercase tracking-[0.2em] text-foreground placeholder:text-muted-foreground/50 border-0 border-b border-border/50 focus:border-primary/40 transition-all duration-300 outline-none focus:outline-none focus:ring-0"
          value={localQuery}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {/* Search Results Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-4 w-80 overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <SearchResultsDropdown
            results={results}
            loading={loading}
            onSelectBook={onSelectBook}
            variant="desktop"
          />
        </div>
      )}
    </div>
  );
};
