import { useState, useCallback } from 'react';
import type { MindFragment, MindFragmentsResult, ContentGroup } from '../types';

interface UseFragmentDialogsProps {
  fragmentsData: MindFragmentsResult | null;
  filteredFragments: MindFragment[];
  groupedByContent: Record<string, MindFragment[]>;
  selectedFragment: MindFragment | null;
  setSelectedFragment: (f: MindFragment | null) => void;
  getContentTitle: (contentId: string) => string;
  onDeleteFragment: (id: string) => Promise<boolean>;
  onDeleteFragmentsByContentId: (contentId: string) => Promise<{ success: boolean; count: number }>;
}

export function useFragmentDialogs({
  fragmentsData,
  filteredFragments,
  groupedByContent,
  selectedFragment,
  setSelectedFragment,
  getContentTitle,
  onDeleteFragment,
  onDeleteFragmentsByContentId,
}: UseFragmentDialogsProps) {
  // Dialog/Sheet state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fragmentToDelete, setFragmentToDelete] = useState<MindFragment | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<ContentGroup | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  // Handle delete request (single fragment)
  const handleDeleteRequest = useCallback((id: string) => {
    const fragment = fragmentsData?.fragments.find(f => f.id === id);
    if (fragment) {
      setFragmentToDelete(fragment);
      setDeleteDialogOpen(true);
    }
  }, [fragmentsData?.fragments]);

  // Handle delete confirmation (single fragment)
  const handleDeleteConfirm = useCallback(async (id: string) => {
    const success = await onDeleteFragment(id);
    if (success) {
      if (selectedFragment?.id === id) {
        const remaining = filteredFragments.filter(f => f.id !== id);
        setSelectedFragment(remaining[0] || null);
      }
      setFragmentToDelete(null);
    }
    return success;
  }, [onDeleteFragment, selectedFragment?.id, filteredFragments, setSelectedFragment]);

  // Handle bulk delete request (all fragments from a content)
  const handleBulkDeleteRequest = useCallback((contentId: string) => {
    const fragments = groupedByContent[contentId];
    if (fragments && fragments.length > 0) {
      setContentToDelete({
        contentId,
        contentTitle: getContentTitle(contentId),
        fragmentCount: fragments.length,
      });
      setBulkDeleteDialogOpen(true);
    }
  }, [groupedByContent, getContentTitle]);

  // Handle bulk delete confirmation
  const handleBulkDeleteConfirm = useCallback(async (contentId: string) => {
    const result = await onDeleteFragmentsByContentId(contentId);
    if (result.success) {
      // If we deleted the content that contains the selected fragment, select another
      if (selectedFragment?.contentId === contentId) {
        const remaining = filteredFragments.filter(f => f.contentId !== contentId);
        setSelectedFragment(remaining[0] || null);
      }
      setContentToDelete(null);
    }
    return result;
  }, [onDeleteFragmentsByContentId, selectedFragment?.contentId, filteredFragments, setSelectedFragment]);

  return {
    // Single delete
    deleteDialogOpen,
    setDeleteDialogOpen,
    fragmentToDelete,
    handleDeleteRequest,
    handleDeleteConfirm,
    // Bulk delete
    bulkDeleteDialogOpen,
    setBulkDeleteDialogOpen,
    contentToDelete,
    handleBulkDeleteRequest,
    handleBulkDeleteConfirm,
    // Create
    createSheetOpen,
    setCreateSheetOpen,
  };
}
