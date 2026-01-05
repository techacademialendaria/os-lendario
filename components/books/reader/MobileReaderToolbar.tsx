import React, { useState } from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import {
  ReadingMode,
  ThemeStyle,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  FONT_SIZE_STEP,
} from './reader-theme';

interface MobileReaderToolbarProps {
  readingMode: ReadingMode;
  fontSize: number;
  isFocusMode: boolean;
  isFavorite: boolean;
  isTogglingFavorite: boolean;
  interactionsLoading: boolean;
  currentMode: ThemeStyle;
  onFontSizeChange: (size: number) => void;
  onOpenSidebar: () => void;
  onToggleFavorite: () => void;
  onReadingModeChange: (mode: ReadingMode) => void;
}

/**
 * MobileReaderToolbar - Bottom toolbar for mobile readers
 *
 * Features:
 * - Font size picker (popup)
 * - Chapters/TOC button
 * - Favorite toggle
 * - Reading mode cycle
 * - Auto-hides on scroll (focus mode)
 */
export const MobileReaderToolbar: React.FC<MobileReaderToolbarProps> = ({
  readingMode,
  fontSize,
  isFocusMode,
  isFavorite,
  isTogglingFavorite,
  interactionsLoading,
  currentMode,
  onFontSizeChange,
  onOpenSidebar,
  onToggleFavorite,
  onReadingModeChange,
}) => {
  const [showFontPicker, setShowFontPicker] = useState(false);

  const cycleReadingMode = () => {
    const modes: ReadingMode[] = ['night', 'paper', 'sepia'];
    const currentIndex = modes.indexOf(readingMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    onReadingModeChange(modes[nextIndex]);
  };

  return (
    <div
      className={cn(
        'pointer-events-auto absolute bottom-0 left-0 right-0 backdrop-blur-xl md:hidden transition-all duration-500',
        isFocusMode ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      )}
      style={{
        backgroundColor: currentMode.headerBg,
        borderTopColor: currentMode.border,
        borderTopWidth: '1px',
      }}
    >
      {/* Font Size Picker (Popup) */}
      {showFontPicker && (
        <div
          className="absolute bottom-full left-0 right-0 p-4"
          style={{
            backgroundColor: currentMode.bg,
            borderTopColor: currentMode.border,
            borderTopWidth: '1px',
          }}
        >
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => onFontSizeChange(Math.max(MIN_FONT_SIZE, fontSize - FONT_SIZE_STEP))}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-90"
              style={{
                backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: currentMode.textMuted,
              }}
            >
              <Icon name="minus" size="size-5" />
            </button>
            <span
              className="w-16 text-center font-mono text-sm font-black"
              style={{ color: currentMode.text }}
            >
              {fontSize}px
            </span>
            <button
              onClick={() => onFontSizeChange(Math.min(MAX_FONT_SIZE, fontSize + FONT_SIZE_STEP))}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-90"
              style={{
                backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: currentMode.textMuted,
              }}
            >
              <Icon name="plus" size="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* 4-Button Toolbar */}
      <div className="flex items-center justify-around px-4 py-3">
        {/* 1. Font Size */}
        <button
          onClick={() => setShowFontPicker(!showFontPicker)}
          className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
          style={{ color: showFontPicker ? 'var(--brand-gold, #E6B325)' : currentMode.textMuted }}
        >
          <span className="font-serif text-2xl font-medium">A</span>
        </button>

        {/* 2. Chapters/Table of Contents */}
        <button
          onClick={() => {
            setShowFontPicker(false);
            onOpenSidebar();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:opacity-70"
          style={{ color: currentMode.textMuted }}
        >
          <Icon name="list" size="size-6" />
        </button>

        {/* 3. Favorite */}
        <button
          onClick={() => {
            setShowFontPicker(false);
            onToggleFavorite();
          }}
          disabled={isTogglingFavorite || interactionsLoading}
          className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
          style={{ color: isFavorite ? 'var(--brand-gold, #E6B325)' : currentMode.textMuted }}
        >
          <Icon
            name={isFavorite ? 'star-solid' : 'star'}
            size="size-6"
            className={isTogglingFavorite ? 'animate-pulse' : ''}
          />
        </button>

        {/* 4. Reading Mode Cycle */}
        <button
          onClick={() => {
            setShowFontPicker(false);
            cycleReadingMode();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:opacity-70"
          style={{ color: currentMode.textMuted }}
          title={readingMode === 'paper' ? 'Modo Claro' : readingMode === 'night' ? 'Modo Escuro' : 'Modo Sépia'}
        >
          <div
            className="h-6 w-6 rounded-full border-2"
            style={{
              borderColor: currentMode.textMuted,
              backgroundColor: readingMode === 'paper' ? '#FDFCFB' : readingMode === 'night' ? '#0A0A0A' : '#D2B48C',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MobileReaderToolbar;
