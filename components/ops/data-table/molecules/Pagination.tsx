import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange
}) => (
  <div className="flex items-center justify-between px-4 py-4 border-t border-border/20">
    <div className="text-xs text-muted-foreground">
      Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} records
    </div>

    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={`Go to previous page (page ${Math.max(1, currentPage - 1)})`}
        title="Previous page"
      >
        <Icon name="chevron-left" size="size-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrentPage = page === currentPage;
          const isVisible =
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1);

          if (!isVisible) {
            if (page === currentPage - 2) {
              return (
                <span key="dots-before" className="px-2 text-muted-foreground">
                  ...
                </span>
              );
            }
            if (page === currentPage + 2) {
              return (
                <span key="dots-after" className="px-2 text-muted-foreground">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isCurrentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/30 hover:bg-muted/50'
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={`Go to next page (page ${Math.min(totalPages, currentPage + 1)})`}
        title="Next page"
      >
        <Icon name="chevron-right" size="size-4" />
      </button>
    </div>

    {/* Page Info */}
    <div className="text-xs text-muted-foreground">
      Page {currentPage} of {totalPages}
    </div>
  </div>
);
