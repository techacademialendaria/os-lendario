import React from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import {
  ReadingMode,
  ThemeStyle,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  FONT_SIZE_STEP,
} from './reader-theme';

interface ReaderHeaderProps {
  bookSlug: string;
  bookTitle: string;
  bookCategory?: string | null;
  readingMode: ReadingMode;
  fontSize: number;
  isFocusMode: boolean;
  currentMode: ThemeStyle;
  onNavigateBack: () => void;
  onReadingModeChange: (mode: ReadingMode) => void;
  onFontSizeChange: (size: number) => void;
  onOpenSidebar: () => void;
}

/**
 * ReaderHeader - Floating header with reading controls
 *
 * Features:
 * - Auto-hides on scroll (focus mode)
 * - Reading mode switcher (paper/night/sepia)
 * - Font size controls
 * - TOC button
 */
export const ReaderHeader: React.FC<ReaderHeaderProps> = ({
  bookTitle,
  bookCategory,
  readingMode,
  fontSize,
  isFocusMode,
  currentMode,
  onNavigateBack,
  onReadingModeChange,
  onFontSizeChange,
  onOpenSidebar,
}) => {
  return (
    <header
      className={cn(
        'fixed left-1/2 top-6 z-50 hidden w-[90%] max-w-4xl -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:block',
        isFocusMode ? 'opacity-0 -translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
      )}
    >
      <div
        className="flex h-16 items-center justify-between rounded-[2rem] px-6 shadow-2xl backdrop-blur-3xl"
        style={{
          backgroundColor: currentMode.headerBg,
          borderColor: currentMode.border,
          borderWidth: '1px',
        }}
      >
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateBack}
            className="p-2 transition-colors hover:opacity-70"
            style={{ color: currentMode.textMuted }}
          >
            <Icon name="arrow-left" size="size-5" />
          </button>
          <div className="hidden sm:block">
            <p className="mb-0.5 text-[8px] font-black uppercase leading-none tracking-[0.5em] text-primary">
              {bookCategory || 'Leitura'}
            </p>
            <h2 className="text-sm font-bold tracking-tight" style={{ color: currentMode.text }}>
              {bookTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Reading Mode Switcher */}
          <div
            className="flex items-center rounded-full p-1 backdrop-blur-sm"
            style={{ backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          >
            {(['paper', 'night', 'sepia'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onReadingModeChange(mode)}
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-all active:scale-90',
                  readingMode === mode
                    ? 'scale-110 border-primary shadow-lg'
                    : 'border-transparent opacity-50 hover:opacity-100'
                )}
                style={{
                  backgroundColor: mode === 'paper' ? '#FDFCFB' : mode === 'night' ? '#0A0A0A' : '#D2B48C',
                }}
                title={mode === 'paper' ? 'Modo Claro' : mode === 'night' ? 'Modo Escuro' : 'Modo Sépia'}
              />
            ))}
          </div>

          {/* Font Size Controls */}
          <div
            className="flex items-center rounded-full p-1 backdrop-blur-sm"
            style={{ backgroundColor: readingMode === 'night' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          >
            <button
              onClick={() => onFontSizeChange(Math.max(MIN_FONT_SIZE, fontSize - FONT_SIZE_STEP))}
              className="flex h-10 w-10 items-center justify-center opacity-60 hover:opacity-100 active:scale-90 transition-all"
            >
              <Icon name="minus" size="size-3" />
            </button>
            <span
              className="w-12 text-center font-mono text-[10px] font-black"
              style={{ color: currentMode.textDimmed }}
            >
              {fontSize}px
            </span>
            <button
              onClick={() => onFontSizeChange(Math.min(MAX_FONT_SIZE, fontSize + FONT_SIZE_STEP))}
              className="flex h-10 w-10 items-center justify-center opacity-60 hover:opacity-100 active:scale-90 transition-all"
            >
              <Icon name="plus" size="size-3" />
            </button>
          </div>

          {/* TOC Button */}
          <button
            onClick={onOpenSidebar}
            className="flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
            style={{
              backgroundColor: currentMode.button.bg,
              color: currentMode.button.text,
            }}
          >
            <Icon name="list" size="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ReaderHeader;
