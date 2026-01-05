import React from 'react';
import { BookInfoHeader } from './BookInfoHeader';
import { BookDescription } from './BookDescription';
import { BookTagsRow } from './BookTagsRow';
import { BookMetadata } from './BookMetadata';
import { AuthorSection } from './AuthorSection';
import { RelatedBooks } from './RelatedBooks';

interface BookContentColumnProps {
  detail: {
    book: any;
    loading: boolean;
    description: string;
    displayedDescription: string;
    shouldTruncateDescription: boolean;
    isDescriptionExpanded: boolean;
    toggleDescription: () => void;
    interactions: { isFavorite?: boolean } | null;
    interactionsLoading: boolean;
    isTogglingFavorite: boolean;
    author: any;
    authorLoading: boolean;
    displayedAuthorBio: string;
    shouldTruncateAuthorBio: boolean;
    isAuthorBioExpanded: boolean;
    toggleAuthorBio: () => void;
    relatedBooks: any[];
    navigateToAuthor: () => void;
    navigateToCategory: (slug: string) => void;
    navigateToBook: (slug: string) => void;
    handleToggleFavorite: () => void;
  };
}

export const BookContentColumn: React.FC<BookContentColumnProps> = ({ detail }) => {
  const { book, loading } = detail;

  return (
    <div className="space-y-8 md:col-span-8 lg:col-span-9">
      <BookInfoHeader book={book} loading={loading} onAuthorClick={detail.navigateToAuthor} />

      {!loading && book && detail.description && (
        <BookDescription
          description={detail.description}
          displayedDescription={detail.displayedDescription}
          shouldTruncate={detail.shouldTruncateDescription}
          isExpanded={detail.isDescriptionExpanded}
          onToggle={detail.toggleDescription}
        />
      )}

      {!loading && book && (
        <BookTagsRow
          tags={book.tags}
          isFavorite={detail.interactions?.isFavorite || false}
          isLoading={detail.interactionsLoading}
          isTogglingFavorite={detail.isTogglingFavorite}
          onTagClick={detail.navigateToCategory}
          onToggleFavorite={detail.handleToggleFavorite}
        />
      )}

      {!loading && book && (
        <BookMetadata pageCount={book.pageCount} publishedYear={book.publishedYear} hasAudio={book.hasAudio} />
      )}

      {!loading && book && <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />}

      {!loading && book && (
        <AuthorSection
          book={book}
          author={detail.author}
          authorLoading={detail.authorLoading}
          displayedAuthorBio={detail.displayedAuthorBio}
          shouldTruncateAuthorBio={detail.shouldTruncateAuthorBio}
          isAuthorBioExpanded={detail.isAuthorBioExpanded}
          onToggleBio={detail.toggleAuthorBio}
          onNavigateToAuthor={detail.navigateToAuthor}
        />
      )}

      {!loading && <RelatedBooks books={detail.relatedBooks} onBookClick={detail.navigateToBook} />}
    </div>
  );
};
