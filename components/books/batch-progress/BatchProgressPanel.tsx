import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useBatchProgress } from '@/hooks/useBatchProgress';
import { LogsViewer } from '../admin/LogsViewer';
import { BatchStatsCards } from '../admin/BatchStatsCards';
import { BatchActiveIndicator } from '../admin/BatchActiveIndicator';
import { AddBookDialog, RemoveDialog } from '../admin/BatchDialogs';
import { useBatchFilters, useBatchDialogs, useBatchActions } from './hooks';
import {
  BatchHeader,
  BatchFiltersBar,
  BatchProgressBar,
  BatchBooksTable,
  BatchServerWarning,
  BatchCompletionCard,
  BatchLoadingState,
  BatchEmptyState,
} from './organisms';
import type { BatchProgressPanelProps } from './types';

export const BatchProgressPanel: React.FC<BatchProgressPanelProps> = ({ className }) => {
  const { toast } = useToast();
  const {
    data,
    loading,
    refetch,
    serverAvailable,
    playBook,
    pauseBook,
    retryBook,
    addBook,
    removeBook,
    retryAllFailed,
    pauseAll,
    sseState,
    computed,
  } = useBatchProgress();

  const filters = useBatchFilters(data?.books);
  const dialogs = useBatchDialogs();
  const actions = useBatchActions({
    playBook,
    pauseBook,
    retryBook,
    removeBook,
    addBook,
    retryAllFailed,
    pauseAll,
  });

  const summary = data?.summary || { total: 0, pending: 0, in_progress: 0, completed: 0, failed: 0 };

  const handleAddBook = async () => {
    if (!dialogs.newBook.title.trim() || !dialogs.newBook.author.trim()) {
      toast({
        title: 'Campos obrigatorios',
        description: 'Titulo e autor sao obrigatorios',
        variant: 'destructive',
      });
      return;
    }

    dialogs.setAddingBook(true);
    const result = await actions.handleAddBook(
      dialogs.newBook.title,
      dialogs.newBook.author,
      dialogs.newBook.slug || undefined
    );
    dialogs.setAddingBook(false);

    if (result.success) {
      dialogs.resetAddDialog();
    }
  };

  const handleRemoveConfirm = async () => {
    if (!dialogs.removeConfirm) return;
    await actions.handleRemove(dialogs.removeConfirm.slug);
    dialogs.closeRemoveConfirm();
  };

  // Loading state
  if (loading && !data) {
    return <BatchLoadingState className={className} />;
  }

  // Empty state
  if (!data && !loading) {
    return <BatchEmptyState className={className} onAddBook={() => dialogs.setShowAddDialog(true)} />;
  }

  return (
    <div className={cn('space-y-6', className)}>
      <BatchHeader
        sseState={sseState}
        failedCount={summary.failed}
        inProgressCount={summary.in_progress}
        bulkLoading={actions.bulkLoading}
        onRetryAllFailed={actions.handleRetryAllFailed}
        onPauseAll={actions.handlePauseAll}
        onAddBook={() => dialogs.setShowAddDialog(true)}
        onRefresh={refetch}
      />

      <BatchStatsCards
        total={summary.total}
        inProgress={summary.in_progress}
        pending={summary.pending}
        completed={summary.completed}
        failed={summary.failed}
      />

      <BatchProgressBar
        completed={summary.completed}
        total={summary.total}
        progressPercent={computed.progressPercent}
      />

      <BatchActiveIndicator activeBook={computed.activeBook} />

      <BatchFiltersBar
        searchQuery={filters.searchQuery}
        onSearchChange={filters.setSearchQuery}
        statusFilter={filters.statusFilter}
        onStatusChange={filters.setStatusFilter}
      />

      <BatchBooksTable
        books={filters.filteredBooks}
        actionLoading={actions.actionLoading}
        serverAvailable={serverAvailable}
        searchQuery={filters.searchQuery}
        onPlay={actions.handlePlay}
        onPause={actions.handlePause}
        onRetry={actions.handleRetry}
        onRemove={dialogs.openRemoveConfirm}
        onViewLogs={dialogs.openLogsViewer}
        onClearSearch={() => filters.setSearchQuery('')}
      />

      {!serverAvailable && <BatchServerWarning />}

      {summary.total > 0 && summary.completed === summary.total && (
        <BatchCompletionCard total={summary.total} onAddBook={() => dialogs.setShowAddDialog(true)} />
      )}

      {dialogs.logsBook && (
        <LogsViewer
          slug={dialogs.logsBook.slug}
          title={dialogs.logsBook.title}
          open={!!dialogs.logsBook}
          onOpenChange={(open) => !open && dialogs.closeLogsViewer()}
        />
      )}

      <RemoveDialog
        open={!!dialogs.removeConfirm}
        onOpenChange={(open) => !open && dialogs.closeRemoveConfirm()}
        bookInfo={dialogs.removeConfirm}
        onConfirm={handleRemoveConfirm}
      />

      <AddBookDialog
        open={dialogs.showAddDialog}
        onOpenChange={dialogs.setShowAddDialog}
        newBook={dialogs.newBook}
        onNewBookChange={dialogs.setNewBook}
        onAdd={handleAddBook}
        adding={dialogs.addingBook}
      />
    </div>
  );
};

export default BatchProgressPanel;
