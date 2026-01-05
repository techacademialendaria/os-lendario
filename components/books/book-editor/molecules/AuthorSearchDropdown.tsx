import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import type { AuthorSearchDropdownProps } from '../types';

export const AuthorSearchDropdown: React.FC<AuthorSearchDropdownProps> = ({
  authorName,
  authorResults,
  authorSearchLoading,
  showAuthorDropdown,
  onAuthorSearch,
  onSelectAuthor,
}) => {
  return (
    <div className="relative">
      <Icon
        name="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size="size-4"
      />
      <Input
        className="pl-10"
        placeholder="Buscar ou adicionar autor..."
        value={authorName}
        onChange={(e) => onAuthorSearch(e.target.value)}
      />
      {showAuthorDropdown && authorResults.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded-md border border-border bg-popover shadow-lg">
          {authorResults.map((author) => (
            <button
              key={author.id}
              type="button"
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted/50"
              onMouseDown={() => onSelectAuthor(author)}
            >
              {author.avatarUrl ? (
                <img src={author.avatarUrl} className="h-6 w-6 rounded-full" alt="" />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                  <Icon name="user" size="size-3" />
                </div>
              )}
              {author.name}
            </button>
          ))}
        </div>
      )}
      {authorSearchLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Icon name="spinner" size="size-4" className="animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
