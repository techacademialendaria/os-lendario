import React, { useCallback } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { FragmentDetailPanel } from '../fragments/FragmentDetailPanel';
import { FragmentDeleteDialog } from '../fragments/FragmentDeleteDialog';
import { FragmentBulkDeleteDialog } from '../fragments/FragmentBulkDeleteDialog';
import { FragmentCreateSheet } from '../fragment-create-sheet';
import { useFragmentsState, useFragmentDialogs } from './hooks';
import { FragmentsStatsGrid, FragmentsFilters, FragmentsSidebar } from './organisms';
import type { FragmentsTabProps } from './types';

/**
 * FragmentsTab - Orchestrator Component
 *
 * STATE MANAGEMENT (extracted to hooks):
 * - useFragmentsState: selection, expansion, filters, derived data (5 useState -> 1 hook)
 * - useFragmentDialogs: delete dialog, bulk delete dialog, create sheet (5 useState -> 1 hook)
 *
 * TOTAL: 11 useState -> 2 custom hooks
 */
export const FragmentsTab: React.FC<FragmentsTabProps> = ({
  fragmentsData,
  loading,
  mindId,
  onUpdateFragment,
  onDeleteFragment,
  onDeleteFragmentsByContentId,
  onCreateFragment,
}) => {
  // State management via custom hooks
  const state = useFragmentsState(fragmentsData);
  const dialogs = useFragmentDialogs({
    fragmentsData,
    filteredFragments: state.filteredFragments,
    groupedByContent: state.groupedByContent,
    selectedFragment: state.selectedFragment,
    setSelectedFragment: state.setSelectedFragment,
    getContentTitle: state.getContentTitle,
    onDeleteFragment,
    onDeleteFragmentsByContentId,
  });

  // Navigate to a fragment (for relationships)
  const handleNavigateToFragment = useCallback((fragmentId: string) => {
    const fragment = fragmentsData?.fragments.find(f => f.id === fragmentId);
    if (fragment) {
      state.setSelectedFragment(fragment);
      // Expand the content group if not expanded
      if (!state.expandedContents.has(fragment.contentId)) {
        state.setExpandedContents(prev => new Set([...prev, fragment.contentId]));
      }
    }
  }, [fragmentsData?.fragments, state]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty state
  if (!fragmentsData || fragmentsData.fragments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="box" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum fragmento extraido para esta mente.</p>
        <p className="text-sm mt-2 opacity-70">
          Execute o pipeline InnerLens para extrair fragmentos dos conteudos.
        </p>
        <Button
          onClick={() => dialogs.setCreateSheetOpen(true)}
          className="mt-4 bg-brand-gold hover:bg-brand-gold/90 text-black"
        >
          <Icon name="plus" size="size-4" className="mr-2" />
          Adicionar Fragmento Manual
        </Button>

        <FragmentCreateSheet
          open={dialogs.createSheetOpen}
          onOpenChange={dialogs.setCreateSheetOpen}
          mindId={mindId}
          onCreate={onCreateFragment}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full min-h-[600px]">
      {/* Stats Header */}
      <FragmentsStatsGrid fragmentsData={fragmentsData} />

      {/* Filters + Create Button */}
      <FragmentsFilters
        searchQuery={state.searchQuery}
        onSearchChange={state.setSearchQuery}
        filterRelevance={state.filterRelevance}
        onRelevanceChange={state.setFilterRelevance}
        filterType={state.filterType}
        onClearTypeFilter={() => state.setFilterType(null)}
        onCreateClick={() => dialogs.setCreateSheetOpen(true)}
      />

      {/* Main Content - Detail left, Sidebar right */}
      <div className="flex gap-6">
        {/* Fragment Viewer/Editor - Left side */}
        <FragmentDetailPanel
          fragment={state.selectedFragment}
          onUpdate={onUpdateFragment}
          onDelete={dialogs.handleDeleteRequest}
          onNavigateToFragment={handleNavigateToFragment}
        />

        {/* Sidebar - Grouped by Content - Right side */}
        <FragmentsSidebar
          sortedContentIds={state.sortedContentIds}
          groupedByContent={state.groupedByContent}
          expandedContents={state.expandedContents}
          selectedFragment={state.selectedFragment}
          onToggleContent={state.toggleContent}
          onSelectFragment={state.setSelectedFragment}
          onBulkDeleteRequest={dialogs.handleBulkDeleteRequest}
          getContentTitle={state.getContentTitle}
        />
      </div>

      {/* Delete Dialog (single fragment) */}
      <FragmentDeleteDialog
        open={dialogs.deleteDialogOpen}
        onOpenChange={dialogs.setDeleteDialogOpen}
        fragment={dialogs.fragmentToDelete}
        onConfirm={dialogs.handleDeleteConfirm}
      />

      {/* Bulk Delete Dialog (all fragments from a content) */}
      <FragmentBulkDeleteDialog
        open={dialogs.bulkDeleteDialogOpen}
        onOpenChange={dialogs.setBulkDeleteDialogOpen}
        contentGroup={dialogs.contentToDelete}
        onConfirm={dialogs.handleBulkDeleteConfirm}
      />

      {/* Create Sheet */}
      <FragmentCreateSheet
        open={dialogs.createSheetOpen}
        onOpenChange={dialogs.setCreateSheetOpen}
        mindId={mindId}
        onCreate={onCreateFragment}
      />
    </div>
  );
};

export default FragmentsTab;
