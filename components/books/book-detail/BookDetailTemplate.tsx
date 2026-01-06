import React, { useState } from 'react';
import { Section } from '@/types';
import { useMetaTags, generateBookMetaTags } from '@/hooks/useMetaTags';
import BooksTopbar from '../topbar';
import { useBookDetail } from './hooks';
import {
  BookCover,
  BookActionsDesktop,
  BookActionsMobile,
  BookBackdrop,
  BookContentColumn,
  BookErrorView,
  EditModeToggle,
} from './organisms';

interface BookDetailTemplateProps {
  setSection: (s: Section) => void;
}

const BookDetailTemplate: React.FC<BookDetailTemplateProps> = ({ setSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);
  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    setSection(section);
  };

  const detail = useBookDetail();

  // Set meta tags for SEO and social sharing
  useMetaTags(
    detail.book
      ? generateBookMetaTags({
          title: detail.book.title,
          summary: detail.book.summary,
          coverUrl: detail.book.coverUrl,
          author: detail.book.author,
          isbn: detail.book.isbn,
          slug: detail.bookSlug || '',
        })
      : null
  );

  if (detail.error) {
    return <BookErrorView message={detail.error.message} onNavigateBack={detail.navigateToLibrary} />;
  }

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-foreground md:pb-12 overflow-x-hidden">
      <BookBackdrop coverUrl={detail.book?.coverUrl} />
      {/* BooksTopbar FORA do container animado para não quebrar position:fixed */}
      <BooksTopbar currentSection={currentSection} setSection={handleSetSection} />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 animate-fade-in">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-24">
              <BookCover book={detail.book} loading={detail.loading} fallbackGradient={detail.fallbackGradient} />
              {!detail.loading && detail.book && (
                <BookActionsDesktop
                  bookSlug={detail.bookSlug || ''}
                  currentStatus={detail.currentStatus}
                  isChangingStatus={detail.isChangingStatus}
                  interactionsLoading={detail.interactionsLoading}
                  book={detail.book}
                  onChangeStatus={detail.handleChangeStatus}
                  onNavigateToReader={detail.navigateToReader}
                />
              )}
            </div>
          </div>
          <BookContentColumn detail={detail} />
        </div>
      </main>

      {!detail.loading && detail.book && (
        <BookActionsMobile
          currentStatus={detail.currentStatus}
          isFavorite={detail.interactions?.isFavorite || false}
          isChangingStatus={detail.isChangingStatus}
          isTogglingFavorite={detail.isTogglingFavorite}
          interactionsLoading={detail.interactionsLoading}
          onChangeStatus={detail.handleChangeStatus}
          onToggleFavorite={detail.handleToggleFavorite}
          onNavigateToReader={detail.navigateToReader}
        />
      )}

      {/* Edit Mode Toggle - only for users with edit permission */}
      {detail.canEdit && !detail.loading && detail.book && (
        <EditModeToggle
          isEditMode={detail.isEditMode}
          isSaving={detail.isSaving}
          onToggle={detail.toggleEditMode}
        />
      )}
    </div>
  );
};

export default BookDetailTemplate;
