import React from 'react';
import { cn } from '@/lib/utils';
import type { ProgressOverlayProps } from '../types';

export const ProgressOverlay: React.FC<ProgressOverlayProps> = ({
  scrollProgress,
  showFullContent,
  readingMode,
  currentMode,
}) => {
  return (
    <>
      {/* Progress Bar with Glow */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] bg-border/10">
        <div
          className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-300 ease-out"
          style={{ width: `${showFullContent ? scrollProgress : Math.min(scrollProgress * 0.3, 30)}%` }}
        />
      </div>

      {/* Progress Percentage - Fixed bottom right */}
      {showFullContent && scrollProgress > 5 && (
        <div
          className="pointer-events-none fixed bottom-24 right-6 z-50 rounded-full px-3 py-1.5 backdrop-blur-xl transition-opacity duration-300 md:bottom-8"
          style={{
            backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            color: currentMode.textMuted,
          }}
        >
          <span className="font-mono text-[10px] font-black tracking-wider">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </>
  );
};
