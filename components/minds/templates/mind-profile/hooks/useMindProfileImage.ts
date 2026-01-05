import { useState, useMemo } from 'react';
import { getDiceBearUrl } from '../types';
import type { MindProfile as Mind } from '../../../../../hooks/useMind';

export interface UseMindProfileImageReturn {
  imgError: boolean;
  setImgError: (value: boolean) => void;
  avatarSrc: string;
}

export function useMindProfileImage(mind: Mind | null): UseMindProfileImageReturn {
  const [imgError, setImgError] = useState(false);

  const avatarSrc = useMemo(() => {
    if (!mind) return '';
    return imgError ? getDiceBearUrl(mind.slug) : mind.avatar;
  }, [imgError, mind]);

  return { imgError, setImgError, avatarSrc };
}
