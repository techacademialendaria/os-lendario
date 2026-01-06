import React from 'react';
import { ChapterSplash } from './ChapterSplash';
import { TldrBox } from './TldrBox';
import { ReaderArticle } from './ReaderArticle';
import { NavigationFooter } from './NavigationFooter';
import type { ReaderContentAreaProps } from '../types';

export const ReaderContentArea: React.FC<ReaderContentAreaProps> = ({
  contentRef,
  articleRef,
  book,
  readingMode,
  currentMode,
  fontSize,
  isFocusMode,
  showFullContent,
  canHighlight,
  displayContent,
  tldrSummary,
  readingTime,
  bookSlug,
  interactions,
  interactionsLoading,
  isMarkingRead,
  onScroll,
  onHighlight,
  onCopy,
  onNavigateToLogin,
  onNavigateToDetails,
  onMarkAsRead,
  isEditMode,
  onUpdateContent,
}) => {
  return (
    <div
      ref={contentRef as React.RefObject<HTMLDivElement>}
      className="relative z-10 h-full flex-1 overflow-y-auto scroll-smooth"
      onScroll={onScroll}
    >
      <div className="mx-auto max-w-[70ch] px-6 pb-32 pt-40 sm:px-12 md:pb-24 md:pt-48">
        {/* Chapter Splash - Luxury Title Section */}
        <ChapterSplash
          book={book}
          readingTime={readingTime}
          readingMode={readingMode}
          currentMode={currentMode}
          isFocusMode={isFocusMode}
        />

        {/* TL;DR Summary Box */}
        {tldrSummary && showFullContent && (
          <TldrBox
            summary={tldrSummary}
            readingMode={readingMode}
            currentMode={currentMode}
          />
        )}

        {/* Article Body */}
        <ReaderArticle
          articleRef={articleRef}
          displayContent={displayContent}
          showFullContent={showFullContent}
          canHighlight={canHighlight}
          book={book}
          bookSlug={bookSlug}
          fontSize={fontSize}
          currentMode={currentMode}
          onHighlight={onHighlight}
          onCopy={onCopy}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToDetails={onNavigateToDetails}
          isEditMode={isEditMode}
          onUpdateContent={onUpdateContent}
        />

        {/* Navigation Footer */}
        {showFullContent && (
          <NavigationFooter
            bookSlug={bookSlug}
            interactions={interactions}
            interactionsLoading={interactionsLoading}
            isMarkingRead={isMarkingRead}
            onNavigateToDetails={onNavigateToDetails}
            onMarkAsRead={onMarkAsRead}
          />
        )}
      </div>
    </div>
  );
};
