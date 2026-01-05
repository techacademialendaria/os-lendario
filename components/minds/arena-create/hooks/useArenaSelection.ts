import { useState, useCallback } from 'react';
import type { Mind } from '../types';

export interface UseArenaSelectionReturn {
  // Player selections
  selectedClone1: string | null;
  selectedClone2: string | null;
  selectClone1: (id: string) => void;
  selectClone2: (id: string) => void;
  // Image errors
  imgError1: boolean;
  imgError2: boolean;
  // Randomize
  isRandomizing: boolean;
  randomize: (minds: Mind[]) => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function useArenaSelection(): UseArenaSelectionReturn {
  const [selectedClone1, setSelectedClone1] = useState<string | null>(null);
  const [selectedClone2, setSelectedClone2] = useState<string | null>(null);
  const [imgError1, setImgError1] = useState(false);
  const [imgError2, setImgError2] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectClone1 = useCallback((id: string) => {
    setSelectedClone1(id);
    setImgError1(false);
  }, []);

  const selectClone2 = useCallback((id: string) => {
    setSelectedClone2(id);
    setImgError2(false);
  }, []);

  const randomize = useCallback((minds: Mind[]) => {
    if (minds.length < 2) return;

    setIsRandomizing(true);

    // Simulate roulette effect
    const interval = setInterval(() => {
      const r1 = minds[Math.floor(Math.random() * minds.length)].id;
      const r2 = minds[Math.floor(Math.random() * minds.length)].id;
      selectClone1(r1);
      selectClone2(r2);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      // Ensure they are different
      const final1 = minds[Math.floor(Math.random() * minds.length)];
      let final2 = minds[Math.floor(Math.random() * minds.length)];
      while (final2.id === final1.id) {
        final2 = minds[Math.floor(Math.random() * minds.length)];
      }
      selectClone1(final1.id);
      selectClone2(final2.id);
      setIsRandomizing(false);
    }, 800);
  }, [selectClone1, selectClone2]);

  return {
    selectedClone1,
    selectedClone2,
    selectClone1,
    selectClone2,
    imgError1,
    imgError2,
    isRandomizing,
    randomize,
    searchQuery,
    setSearchQuery,
  };
}
