import React from 'react';
import { createPortal } from 'react-dom';
import { useHighlights } from '@/hooks/useHighlights';
import { ReaderHeader, MobileReaderToolbar } from '../reader';
import { ReaderSidebar } from '../reader-sidebar';
import { useBookReader, useReaderUI, useReaderLifecycle } from './hooks';
import {
  ReaderErrorView,
  ReaderLoadingSkeleton,
  ReaderBackdrop,
  ProgressOverlay,
  ReaderContentArea,
} from './organisms';
import type { BookReaderTemplateProps } from './types';

const BookReaderTemplate: React.FC<BookReaderTemplateProps> = ({
  setSection: _setSection,
  setSidebarCollapsed,
  setSidebarHidden,
}) => {
  const reader = useBookReader();
  const ui = useReaderUI({ bookSlug: reader.bookSlug, loading: reader.loading });

  // Get highlights for lifecycle hook
  const { highlights } = useHighlights(reader.bookSlug);

  // Manage sidebar collapse and body scroll
  useReaderLifecycle({
    setSidebarCollapsed,
    setSidebarHidden,
    articleRef: ui.articleRef,
    highlights,
    showFullContent: reader.showFullContent,
    loading: reader.loading,
  });

  if (reader.error) {
    return <ReaderErrorView message={reader.error.message} onNavigateBack={reader.navigateToLibrary} />;
  }

  if (reader.loading) {
    return <ReaderLoadingSkeleton />;
  }

  if (!reader.book) return null;

  return (
    <div
      className="relative flex h-screen animate-fade-in overflow-hidden font-sans transition-colors duration-500"
      style={{ backgroundColor: ui.currentMode.bg, color: ui.currentMode.text }}
    >
      <ReaderBackdrop readingMode={ui.readingMode} currentMode={ui.currentMode} />
      <ProgressOverlay
        scrollProgress={ui.scrollProgress}
        showFullContent={reader.showFullContent}
        readingMode={ui.readingMode}
        currentMode={ui.currentMode}
      />

      <ReaderHeader
        bookSlug={reader.bookSlug}
        bookTitle={reader.book.title}
        bookCategory={reader.book.category}
        readingMode={ui.readingMode}
        fontSize={ui.fontSize}
        isFocusMode={ui.isFocusMode}
        currentMode={ui.currentMode}
        onNavigateBack={reader.navigateToDetails}
        onReadingModeChange={ui.setReadingMode}
        onFontSizeChange={ui.setFontSize}
        onOpenSidebar={() => ui.setSidebarOpen(true)}
      />

      <ReaderContentArea
        contentRef={ui.contentRef}
        articleRef={ui.articleRef}
        book={reader.book}
        readingMode={ui.readingMode}
        currentMode={ui.currentMode}
        fontSize={ui.fontSize}
        isFocusMode={ui.isFocusMode}
        showFullContent={reader.showFullContent}
        canHighlight={reader.canHighlight}
        displayContent={reader.displayContent}
        tldrSummary={reader.tldrSummary}
        readingTime={reader.readingTime}
        bookSlug={reader.bookSlug}
        interactions={reader.interactions}
        interactionsLoading={reader.interactionsLoading}
        isMarkingRead={reader.isMarkingRead}
        onScroll={ui.handleScroll}
        onHighlight={reader.handleHighlight}
        onCopy={reader.handleCopy}
        onNavigateToLogin={reader.navigateToLogin}
        onNavigateToDetails={reader.navigateToDetails}
        onMarkAsRead={reader.handleMarkAsRead}
      />

      {reader.showFullContent && createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          <ReaderSidebar
            isOpen={ui.sidebarOpen}
            isDesktop={ui.isDesktop}
            book={reader.book}
            chapters={reader.chapters}
            keyQuotes={reader.keyQuotes}
            activeTab={ui.activeTab}
            interactions={reader.interactions}
            interactionsLoading={reader.interactionsLoading}
            isTogglingFavorite={reader.isTogglingFavorite}
            isMarkingRead={reader.isMarkingRead}
            fallbackGradient={reader.fallbackGradient}
            onClose={() => ui.setSidebarOpen(false)}
            onTabChange={ui.setActiveTab}
            onScrollToChapter={ui.scrollToChapter}
            onToggleFavorite={reader.handleToggleFavorite}
            onMarkAsRead={reader.handleMarkAsRead}
            onSetReadingStatus={reader.setReadingStatus}
            onNavigateBack={reader.navigateToDetails}
            onNavigateToCategory={reader.navigateToCategory}
          />

          <MobileReaderToolbar
            readingMode={ui.readingMode}
            fontSize={ui.fontSize}
            isFocusMode={ui.isFocusMode}
            isFavorite={reader.interactions?.isFavorite || false}
            isTogglingFavorite={reader.isTogglingFavorite}
            interactionsLoading={reader.interactionsLoading}
            currentMode={ui.currentMode}
            onFontSizeChange={ui.setFontSize}
            onOpenSidebar={() => {
              ui.setActiveTab('chapters');
              ui.setSidebarOpen(true);
            }}
            onToggleFavorite={reader.handleToggleFavorite}
            onReadingModeChange={ui.setReadingMode}
          />
        </div>,
        document.body
      )}
    </div>
  );
};

export default BookReaderTemplate;
