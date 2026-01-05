import React from 'react';
import type { BooksTopbarProps } from './types';
import { useTopbarSearch, useTopbarNavigation } from './hooks';
import { DesktopHeader, MobileNavigation, MobileSearchOverlay } from './organisms';

/**
 * BooksTopbar - Atomic Design Template
 *
 * Orchestrates the books topbar with:
 * - Desktop: Glassmorphism header with logo, nav, search, and user menu
 * - Mobile: Bottom navigation bar + fullscreen search overlay
 *
 * @param currentSection - Current active section
 * @param setSection - Section state setter
 * @param visibleBookIds - Set of book IDs already visible (to filter from search)
 */
const BooksTopbarTemplate: React.FC<BooksTopbarProps> = ({
  currentSection,
  setSection,
  visibleBookIds = new Set(),
}) => {
  // Navigation state and actions
  const navigation = useTopbarNavigation({ setSection });

  // Search state and actions
  const search = useTopbarSearch({ visibleBookIds });

  return (
    <>
      {/* DESKTOP: Luxury Glassmorphism Header */}
      <DesktopHeader
        currentSection={currentSection}
        isHighlightsPage={navigation.isHighlightsPage}
        onNavigate={navigation.handleNavClick}
        onLogoClick={() => navigation.navigateTo('/books')}
        onLogout={navigation.handleLogout}
        // Search props
        localQuery={search.state.localQuery}
        isSearchFocused={search.state.isSearchFocused}
        isDropdownOpen={search.state.isDropdownOpen}
        results={search.filteredResults}
        loading={search.loading}
        inputRef={search.inputRef}
        dropdownRef={search.dropdownRef}
        onSearchInput={search.actions.handleSearchInput}
        onSearchKeyDown={search.actions.handleKeyDown}
        onSearchFocus={() => search.actions.setIsSearchFocused(true)}
        onSearchBlur={() => search.actions.setIsSearchFocused(false)}
        onSelectBook={search.actions.handleSelectBook}
      />

      {/* MOBILE: Bottom navigation bar */}
      <MobileNavigation
        currentSection={currentSection}
        isHighlightsPage={navigation.isHighlightsPage}
        onNavigate={navigation.handleNavClick}
        onSearchOpen={() => search.actions.setIsSearchOpen(true)}
        onLogout={navigation.handleLogout}
      />

      {/* MOBILE: Fullscreen search overlay */}
      <MobileSearchOverlay
        isOpen={search.state.isSearchOpen}
        localQuery={search.state.localQuery}
        results={search.filteredResults}
        loading={search.loading}
        inputRef={search.inputRef}
        onClose={() => search.actions.setIsSearchOpen(false)}
        onInput={search.actions.handleSearchInput}
        onKeyDown={search.actions.handleKeyDown}
        onSelectBook={search.actions.handleSelectBook}
        onClear={search.actions.clearSearch}
      />
    </>
  );
};

export default BooksTopbarTemplate;
