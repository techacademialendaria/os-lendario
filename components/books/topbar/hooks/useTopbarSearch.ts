import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookSearch, type BookData } from '@/hooks/useBooks';
import type { SearchState, SearchActions } from '../types';

interface UseTopbarSearchOptions {
  visibleBookIds?: Set<string>;
}

interface UseTopbarSearchResult {
  state: SearchState;
  actions: SearchActions;
  results: BookData[];
  filteredResults: BookData[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export function useTopbarSearch(options: UseTopbarSearchOptions = {}): UseTopbarSearchResult {
  const { visibleBookIds = new Set() } = options;
  const navigate = useNavigate();

  // State
  const [localQuery, setLocalQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null!);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  // Book search hook
  const { results, loading, search, clearResults } = useBookSearch();

  // Filter out books already visible on page
  const filteredResults = results.filter((book) => !visibleBookIds.has(book.id));

  // Handle search input
  const handleSearchInput = useCallback((value: string) => {
    setLocalQuery(value);
    search(value);
    setIsDropdownOpen(value.length >= 2);
  }, [search]);

  // Handle selecting a book from results
  const handleSelectBook = useCallback((book: BookData) => {
    setIsDropdownOpen(false);
    setIsSearchOpen(false);
    setLocalQuery('');
    clearResults();
    navigate(`/books/${book.slug}`);
  }, [navigate, clearResults]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredResults.length > 0) {
      handleSelectBook(filteredResults[0]);
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsSearchFocused(false);
      inputRef.current?.blur();
    }
  }, [filteredResults, handleSelectBook]);

  // Clear search state
  const clearSearch = useCallback(() => {
    setLocalQuery('');
    clearResults();
    setIsDropdownOpen(false);
  }, [clearResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    state: {
      localQuery,
      isDropdownOpen,
      isSearchFocused,
      isSearchOpen,
    },
    actions: {
      setLocalQuery,
      setIsDropdownOpen,
      setIsSearchFocused,
      setIsSearchOpen,
      handleSearchInput,
      handleSelectBook,
      handleKeyDown,
      clearSearch,
    },
    results,
    filteredResults,
    loading,
    inputRef,
    dropdownRef,
  };
}
