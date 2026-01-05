/**
 * Hook to apply Gold theme on mount
 */

import { useEffect } from 'react';
import { THEMES } from '@/lib/theme';

export function useGoldTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const goldTheme = THEMES.Gold;
    root.style.setProperty('--primary', goldTheme.primary);
    root.style.setProperty('--primary-light', goldTheme.light);
    root.style.setProperty('--primary-foreground', goldTheme.foreground);
  }, []);
}
