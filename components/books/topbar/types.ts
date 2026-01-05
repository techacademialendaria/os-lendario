import { Section } from '@/types';
import type { BookData } from '@/hooks/useBooks';

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  label: string;
  section: Section;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Explorar', section: Section.APP_BOOKS_LIBRARY, path: '/books' },
  { label: 'Autores', section: Section.APP_BOOKS_AUTHORS, path: '/books/authors' },
  { label: 'Meus Livros', section: Section.APP_BOOKS_MY_LIBRARY, path: '/books/my-library' },
];

// ============================================================================
// Component Props Types
// ============================================================================

export interface BooksTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
  visibleBookIds?: Set<string>;
}

export interface SearchState {
  localQuery: string;
  isDropdownOpen: boolean;
  isSearchFocused: boolean;
  isSearchOpen: boolean;
}

export interface SearchActions {
  setLocalQuery: (query: string) => void;
  setIsDropdownOpen: (open: boolean) => void;
  setIsSearchFocused: (focused: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  handleSearchInput: (value: string) => void;
  handleSelectBook: (book: BookData) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearSearch: () => void;
}

export interface TopbarSearchProps {
  state: SearchState;
  actions: SearchActions;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export interface DesktopNavigationProps {
  currentSection: Section;
  isHighlightsPage: boolean;
  onNavigate: (item: NavItem) => void;
}

export interface MobileNavigationProps {
  currentSection: Section;
  isHighlightsPage: boolean;
  onNavigate: (item: NavItem) => void;
  onSearchOpen: () => void;
}

export interface UserMenuProps {
  variant: 'desktop' | 'mobile';
  onLogout: () => void;
}

export interface DesktopSearchBarProps {
  localQuery: string;
  isSearchFocused: boolean;
  isDropdownOpen: boolean;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelectBook: (book: BookData) => void;
}

export interface MobileSearchOverlayProps {
  isOpen: boolean;
  localQuery: string;
  results: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSelectBook: (book: BookData) => void;
  onClear: () => void;
}

export interface SearchResultsDropdownProps {
  results: BookData[];
  loading: boolean;
  onSelectBook: (book: BookData) => void;
}
