import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './organisms/SidebarHeader';
import { SidebarTabs } from './organisms/SidebarTabs';
import { SidebarFooter } from './organisms/SidebarFooter';
import type { ReaderSidebarProps } from './types';

/**
 * ReaderSidebarTemplate - Floating sidebar with chapters and insights
 *
 * Features:
 * - Book info header with cover
 * - Chapters tab with navigation
 * - Insights tab with reading status, quotes, tags
 * - Mobile slide-up, desktop slide-in
 */
const ReaderSidebarTemplate: React.FC<ReaderSidebarProps> = ({
  isOpen,
  isDesktop,
  book,
  chapters,
  keyQuotes,
  activeTab,
  interactions,
  interactionsLoading,
  isTogglingFavorite,
  isMarkingRead,
  fallbackGradient,
  onClose,
  onTabChange,
  onScrollToChapter,
  onToggleFavorite,
  onMarkAsRead,
  onSetReadingStatus,
  onNavigateBack,
  onNavigateToCategory,
}) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="pointer-events-auto absolute inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        style={
          isDesktop
            ? { right: 16, top: 16, left: 'auto', bottom: 16, width: '340px', maxHeight: 'none' }
            : { right: 0, left: 0, bottom: 0, top: 'auto', width: '100%', maxHeight: '85vh' }
        }
        className={cn(
          'pointer-events-auto absolute flex flex-col shadow-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out',
          isDesktop
            ? 'rounded-[2rem] border border-border bg-card/95 backdrop-blur-2xl'
            : 'rounded-t-3xl border-t border-border bg-card/98 backdrop-blur-xl',
          isOpen
            ? isDesktop ? 'translate-x-0 opacity-100' : 'translate-y-0 opacity-100'
            : isDesktop ? 'translate-x-[120%] opacity-0' : 'translate-y-full opacity-0'
        )}
      >
        {/* Mobile: Drag handle */}
        <div className="flex justify-center py-2 md:hidden">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        <SidebarHeader
          book={book}
          fallbackGradient={fallbackGradient}
          interactions={interactions}
          interactionsLoading={interactionsLoading}
          isTogglingFavorite={isTogglingFavorite}
          onToggleFavorite={onToggleFavorite}
          onClose={onClose}
        />

        <SidebarTabs
          activeTab={activeTab}
          chapters={chapters}
          keyQuotes={keyQuotes}
          book={book}
          interactions={interactions}
          interactionsLoading={interactionsLoading}
          isMarkingRead={isMarkingRead}
          onTabChange={onTabChange}
          onScrollToChapter={onScrollToChapter}
          onSetReadingStatus={onSetReadingStatus}
          onMarkAsRead={onMarkAsRead}
          onNavigateToCategory={onNavigateToCategory}
        />

        <SidebarFooter onNavigateBack={onNavigateBack} />
      </div>
    </>
  );
};

export default ReaderSidebarTemplate;
