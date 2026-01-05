import { useCallback } from 'react';
import type { Language } from '../../../../../types';
import { translations } from '../data';

export function useSidebarTranslations(currentLanguage: Language) {
  const t = useCallback(
    (key: string) => translations[currentLanguage][key] || key,
    [currentLanguage]
  );

  return { t };
}
