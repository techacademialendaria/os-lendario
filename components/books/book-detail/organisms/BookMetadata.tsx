import React from 'react';
import { Icon } from '@/components/ui/icon';

interface BookMetadataProps {
  pageCount?: number | null;
  publishedYear?: number | null;
  hasAudio?: boolean;
}

export const BookMetadata: React.FC<BookMetadataProps> = ({
  pageCount,
  publishedYear,
  hasAudio,
}) => {
  if (!pageCount && !publishedYear && !hasAudio) return null;

  return (
    <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border/30">
      {pageCount && (
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Paginas</span>
          <span className="text-sm font-bold font-mono text-foreground">{pageCount}</span>
        </div>
      )}
      {publishedYear && (
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Ano</span>
          <span className="text-sm font-bold font-mono text-foreground">{publishedYear}</span>
        </div>
      )}
      {hasAudio && (
        <div className="flex items-center gap-2">
          <Icon name="headset" size="size-3" className="text-primary" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Audiobook</span>
        </div>
      )}
    </div>
  );
};
