import React from 'react';
import { BatchProgressPanel } from '../../batch-progress/BatchProgressPanel';
import { BookEditorView } from '../../book-editor';
import { BookListTemplate as BookListView } from '../../book-list';

interface AdminMainContentProps {
  admin: {
    view: 'list' | 'editor' | 'pipeline';
    filteredBooks: any[];
    stats: any;
    categories: any[];
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    toggleSelectAll: () => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    statusFilter: string;
    setStatusFilter: (f: string) => void;
    categoryFilter: string;
    setCategoryFilter: (f: string) => void;
    layoutMode: 'grid' | 'list';
    setLayoutMode: (m: 'grid' | 'list') => void;
    handleCreate: () => void;
    handleEdit: (book: any) => void;
    handleDelete: (id: string, title: string) => void;
    handleBulkPublish: () => void;
    handleBulkArchive: () => void;
    clearSelection: () => void;
    formState: any;
    formErrors: any;
    selectedBook: any;
    saving: boolean;
    activeLangTab: any;
    setActiveLangTab: (lang: any) => void;
    editorPreview: boolean;
    setEditorPreview: (p: boolean) => void;
    authorResults: any[];
    authorSearchLoading: boolean;
    showAuthorDropdown: boolean;
    handleAuthorSearch: (q: string) => void;
    handleSelectAuthor: (a: any) => void;
    updateFormField: any;
    updateVersionField: any;
    updateMetadataField: any;
    clearFieldError: (f: any) => void;
    setFormErrors: (e: any) => void;
    categoryOptions: any[];
    collections: any[];
    toggleCategory: (s: string) => void;
    toggleCollection: (s: string) => void;
    handleCoverUpload: (f: File | null) => void;
    handleSave: () => void;
  };
}

export const AdminMainContent: React.FC<AdminMainContentProps> = ({ admin }) => {
  return (
    <main className="container mx-auto max-w-7xl flex-1 px-6 py-8 pb-32">
      {admin.view === 'list' && (
        <BookListView
          books={admin.filteredBooks}
          stats={admin.stats}
          categories={admin.categories}
          selectedIds={admin.selectedIds}
          onToggleSelect={admin.toggleSelect}
          onToggleSelectAll={admin.toggleSelectAll}
          searchQuery={admin.searchQuery}
          onSearchChange={admin.setSearchQuery}
          statusFilter={admin.statusFilter}
          onStatusFilterChange={admin.setStatusFilter}
          categoryFilter={admin.categoryFilter}
          onCategoryFilterChange={admin.setCategoryFilter}
          layoutMode={admin.layoutMode}
          onLayoutModeChange={admin.setLayoutMode}
          onCreate={admin.handleCreate}
          onEdit={admin.handleEdit}
          onDelete={admin.handleDelete}
          onBulkPublish={admin.handleBulkPublish}
          onBulkArchive={admin.handleBulkArchive}
          onClearSelection={admin.clearSelection}
        />
      )}

      {admin.view === 'pipeline' && (
        <div className="animate-fade-in">
          <BatchProgressPanel />
        </div>
      )}

      {admin.view === 'editor' && (
        <BookEditorView
          formState={admin.formState}
          formErrors={admin.formErrors}
          selectedBook={admin.selectedBook}
          saving={admin.saving}
          activeLangTab={admin.activeLangTab}
          onActiveLangTabChange={admin.setActiveLangTab}
          editorPreview={admin.editorPreview}
          onEditorPreviewChange={admin.setEditorPreview}
          authorResults={admin.authorResults}
          authorSearchLoading={admin.authorSearchLoading}
          showAuthorDropdown={admin.showAuthorDropdown}
          onAuthorSearch={admin.handleAuthorSearch}
          onSelectAuthor={admin.handleSelectAuthor}
          onUpdateFormField={admin.updateFormField}
          onUpdateVersionField={admin.updateVersionField}
          onUpdateMetadataField={admin.updateMetadataField}
          onClearFieldError={admin.clearFieldError}
          setFormErrors={admin.setFormErrors}
          categoryOptions={admin.categoryOptions}
          collections={admin.collections}
          onToggleCategory={admin.toggleCategory}
          onToggleCollection={admin.toggleCollection}
          onCoverUpload={admin.handleCoverUpload}
          onSave={admin.handleSave}
          onDelete={admin.handleDelete}
        />
      )}
    </main>
  );
};
