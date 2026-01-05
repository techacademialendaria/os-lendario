import React from 'react';
import {
  StatsCards,
  Toolbar,
  EmptyState,
  TableView,
  GridView,
  BulkActionsBar,
  ResultsCount,
} from './organisms';
import type { BookListTemplateProps } from './types';

/**
 * BookListTemplate - Orchestrator component for the book list feature
 * Composes all organisms without containing business logic
 */
export const BookListTemplate: React.FC<BookListTemplateProps> = ({
  books,
  stats,
  categories,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  layoutMode,
  onLayoutModeChange,
  onCreate,
  onEdit,
  onDelete,
  onBulkPublish,
  onBulkArchive,
  onClearSelection,
}) => {
  const hasFilters = searchQuery !== '' || statusFilter !== 'all' || categoryFilter !== 'all';
  const hasBooks = books.length > 0;

  return (
    <>
      <div className="animate-fade-in space-y-8">
        <StatsCards stats={stats} />

        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={onCategoryFilterChange}
          categories={categories}
          layoutMode={layoutMode}
          onLayoutModeChange={onLayoutModeChange}
        />

        {!hasBooks && <EmptyState hasFilters={hasFilters} onCreate={onCreate} />}

        {hasBooks && layoutMode === 'list' && (
          <TableView
            books={books}
            selectedIds={selectedIds}
            onToggleSelect={onToggleSelect}
            onToggleSelectAll={onToggleSelectAll}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}

        {hasBooks && layoutMode === 'grid' && (
          <GridView
            books={books}
            selectedIds={selectedIds}
            onToggleSelect={onToggleSelect}
            onEdit={onEdit}
          />
        )}

        {hasBooks && <ResultsCount shown={books.length} total={stats.total} />}
      </div>

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onBulkPublish={onBulkPublish}
        onBulkArchive={onBulkArchive}
        onClearSelection={onClearSelection}
      />
    </>
  );
};

export default BookListTemplate;
