import { useState } from 'react';
import type { NewBook, LogsBookInfo, RemoveConfirmInfo } from '../types';

export function useBatchDialogs() {
  // Add book dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newBook, setNewBook] = useState<NewBook>({ title: '', author: '', slug: '' });
  const [addingBook, setAddingBook] = useState(false);

  // Logs viewer state
  const [logsBook, setLogsBook] = useState<LogsBookInfo | null>(null);

  // Remove confirmation dialog state
  const [removeConfirm, setRemoveConfirm] = useState<RemoveConfirmInfo | null>(null);

  const resetAddDialog = () => {
    setShowAddDialog(false);
    setNewBook({ title: '', author: '', slug: '' });
  };

  const openLogsViewer = (slug: string, title: string) => {
    setLogsBook({ slug, title });
  };

  const closeLogsViewer = () => {
    setLogsBook(null);
  };

  const openRemoveConfirm = (slug: string, title: string) => {
    setRemoveConfirm({ slug, title });
  };

  const closeRemoveConfirm = () => {
    setRemoveConfirm(null);
  };

  return {
    // Add dialog
    showAddDialog,
    setShowAddDialog,
    newBook,
    setNewBook,
    addingBook,
    setAddingBook,
    resetAddDialog,
    // Logs viewer
    logsBook,
    openLogsViewer,
    closeLogsViewer,
    // Remove confirm
    removeConfirm,
    openRemoveConfirm,
    closeRemoveConfirm,
  };
}
