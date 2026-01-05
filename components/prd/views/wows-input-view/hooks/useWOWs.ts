import { useState, useCallback } from 'react';
import { WOW, WOWCategory, MAX_WOWS, MIN_WOWS } from '../types';

// =============================================================================
// WOWS LIST HOOK
// =============================================================================

interface UseWOWsProps {
  initialWows: WOW[];
  onUpdate: (wows: WOW[]) => Promise<void>;
}

interface UseWOWsReturn {
  wows: WOW[];
  canAdvance: boolean;
  isAtMax: boolean;
  add: (text: string, category: WOWCategory) => Promise<void>;
  edit: (id: string, text: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useWOWs({ initialWows, onUpdate }: UseWOWsProps): UseWOWsReturn {
  const [wows, setWows] = useState<WOW[]>(initialWows);

  const canAdvance = wows.length >= MIN_WOWS;
  const isAtMax = wows.length >= MAX_WOWS;

  const add = useCallback(
    async (text: string, category: WOWCategory) => {
      if (wows.length >= MAX_WOWS || !text.trim()) return;

      const newWow: WOW = {
        id: `wow-${Date.now()}`,
        text: text.trim(),
        category,
        createdAt: new Date().toISOString(),
      };

      const updated = [newWow, ...wows];
      setWows(updated);
      await onUpdate(updated);
    },
    [wows, onUpdate]
  );

  const edit = useCallback(
    async (id: string, text: string) => {
      const updated = wows.map((w) => (w.id === id ? { ...w, text } : w));
      setWows(updated);
      await onUpdate(updated);
    },
    [wows, onUpdate]
  );

  const remove = useCallback(
    async (id: string) => {
      const updated = wows.filter((w) => w.id !== id);
      setWows(updated);
      await onUpdate(updated);
    },
    [wows, onUpdate]
  );

  return { wows, canAdvance, isAtMax, add, edit, remove };
}

// =============================================================================
// WOW INPUT HOOK
// =============================================================================

interface UseWOWInputReturn {
  text: string;
  category: WOWCategory;
  setText: (text: string) => void;
  setCategory: (category: WOWCategory) => void;
  reset: () => void;
}

export function useWOWInput(): UseWOWInputReturn {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<WOWCategory>('insight');

  const reset = useCallback(() => {
    setText('');
  }, []);

  return { text, category, setText, setCategory, reset };
}
