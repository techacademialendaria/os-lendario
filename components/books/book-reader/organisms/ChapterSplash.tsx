import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ChapterSplashProps } from '../types';

export const ChapterSplash: React.FC<ChapterSplashProps> = ({
  book,
  readingTime,
  readingMode,
  currentMode,
  isFocusMode,
}) => {
  // State-based animation to ensure it plays on mount/reload
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset on book change and trigger animation
    setIsVisible(false);
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, [book.title]); // Re-trigger when book changes

  return (
    <div
      className={cn(
        'mb-24 space-y-8 text-center transition-all duration-500 md:mb-40 md:space-y-10',
        isFocusMode
          ? 'opacity-0 blur-sm -translate-y-4'
          : isVisible
            ? 'opacity-100 blur-0 translate-y-0'
            : 'opacity-0 blur-sm translate-y-4'
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge
          variant="outline"
          className="border-primary/20 bg-primary/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.6em] text-primary rounded-full"
        >
          {book.category || 'Resumo do Livro'}
        </Badge>
        {/* Reading Time Indicator */}
        {readingTime.minutes > 0 && (
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium"
            style={{
              backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              color: currentMode.textMuted,
            }}
          >
            <Icon name="clock" size="size-3" />
            {readingTime.minutes} min de leitura
          </span>
        )}
      </div>
      <h1
        className="text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        style={{ color: currentMode.text }}
      >
        {book.title}
      </h1>
      <p className="font-serif text-lg italic md:text-xl" style={{ color: currentMode.textMuted }}>
        por {book.author}
      </p>
      <div className="mx-auto h-1 w-20 rounded-full bg-primary/20" />
    </div>
  );
};
