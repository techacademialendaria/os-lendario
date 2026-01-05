import React from 'react';
import { Section } from '@/types';
import type { BookData } from '@/hooks/useBooks';
import type { NavItem } from '../types';
import { TopbarLogo } from '../molecules';
import { DesktopNavigation } from './DesktopNavigation';
import { DesktopSearchBar } from './DesktopSearchBar';
import { DesktopUserMenu } from './DesktopUserMenu';

interface DesktopHeaderProps {
  currentSection: Section;
  isHighlightsPage: boolean;
  onNavigate: (item: NavItem) => void;
  onLogoClick: () => void;
  onLogout: () => void;
  // Search props
  localQuery: string;
  isSearchFocused: boolean;
  isDropdownOpen: boolean;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onSearchInput: (value: string) => void;
  onSearchKeyDown: (e: React.KeyboardEvent) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSelectBook: (book: BookData) => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  currentSection,
  isHighlightsPage,
  onNavigate,
  onLogoClick,
  onLogout,
  localQuery,
  isSearchFocused,
  isDropdownOpen,
  results,
  loading,
  inputRef,
  dropdownRef,
  onSearchInput,
  onSearchKeyDown,
  onSearchFocus,
  onSearchBlur,
  onSelectBook,
}) => {
  return (
    <header className="sticky top-0 z-50 hidden w-full border-b border-border bg-background/60 backdrop-blur-3xl md:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          <TopbarLogo onNavigate={onLogoClick} />
          <DesktopNavigation
            currentSection={currentSection}
            isHighlightsPage={isHighlightsPage}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right: Search + Avatar */}
        <div className="flex items-center gap-8">
          <DesktopSearchBar
            localQuery={localQuery}
            isSearchFocused={isSearchFocused}
            isDropdownOpen={isDropdownOpen}
            results={results}
            loading={loading}
            inputRef={inputRef}
            dropdownRef={dropdownRef}
            onInput={onSearchInput}
            onKeyDown={onSearchKeyDown}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            onSelectBook={onSelectBook}
          />
          <DesktopUserMenu onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};
