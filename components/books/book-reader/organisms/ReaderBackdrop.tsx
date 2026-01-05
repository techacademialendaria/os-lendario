import React from 'react';
import { cn } from '@/lib/utils';
import type { ReadingMode, ThemeStyle } from '../../reader';

interface ReaderBackdropProps {
  readingMode: ReadingMode;
  currentMode: ThemeStyle;
}

export const ReaderBackdrop: React.FC<ReaderBackdropProps> = ({
  readingMode,
  currentMode,
}) => {
  return (
    <>
      {/* Background Texture Overlay (Premium Grain) */}
      <div className={cn(
        "pointer-events-none fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] transition-opacity duration-1000",
        currentMode.texture
      )} />

      {/* Premium Digital Paper - Vignette Effect */}
      <div className={cn(
        "pointer-events-none fixed inset-0 z-0",
        readingMode === 'night'
          ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]'
          : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]'
      )} />
    </>
  );
};
