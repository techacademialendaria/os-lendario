/**
 * BookEditorView - Orchestrator Template
 * Composes organisms into the full book editor layout
 */
import React from 'react';
import {
  GeneralInfoCard,
  LanguageTabsSection,
  CoverUploadCard,
  MetadataCard,
  SettingsCard,
} from './organisms';
import type { BookEditorViewProps } from './types';

export const BookEditorView: React.FC<BookEditorViewProps> = ({
  formState,
  formErrors,
  selectedBook,
  saving,
  activeLangTab,
  onActiveLangTabChange,
  editorPreview,
  onEditorPreviewChange,
  authorResults,
  authorSearchLoading,
  showAuthorDropdown,
  onAuthorSearch,
  onSelectAuthor,
  onUpdateFormField,
  onUpdateVersionField,
  onUpdateMetadataField,
  onClearFieldError,
  setFormErrors,
  categoryOptions,
  collections,
  onToggleCategory,
  onToggleCollection,
  onCoverUpload,
  onSave,
  onDelete,
}) => {
  return (
    <div className="grid animate-fade-in grid-cols-1 items-start gap-8 lg:grid-cols-12">
      {/* Main Content */}
      <div className="space-y-6 lg:col-span-8">
        <GeneralInfoCard
          formState={formState}
          formErrors={formErrors}
          authorResults={authorResults}
          authorSearchLoading={authorSearchLoading}
          showAuthorDropdown={showAuthorDropdown}
          onAuthorSearch={onAuthorSearch}
          onSelectAuthor={onSelectAuthor}
          onUpdateFormField={onUpdateFormField}
          onClearFieldError={onClearFieldError}
          categoryOptions={categoryOptions}
          collections={collections}
          onToggleCategory={onToggleCategory}
          onToggleCollection={onToggleCollection}
        />

        <LanguageTabsSection
          formState={formState}
          formErrors={formErrors}
          selectedBook={selectedBook}
          activeLangTab={activeLangTab}
          onActiveLangTabChange={onActiveLangTabChange}
          editorPreview={editorPreview}
          onEditorPreviewChange={onEditorPreviewChange}
          onUpdateVersionField={onUpdateVersionField}
          setFormErrors={setFormErrors}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-6 lg:col-span-4">
        <CoverUploadCard coverUrl={formState.coverUrl} onCoverUpload={onCoverUpload} />

        <MetadataCard metadata={formState.metadata} onUpdateMetadataField={onUpdateMetadataField} />

        <SettingsCard
          formState={formState}
          selectedBook={selectedBook}
          onUpdateFormField={onUpdateFormField}
          onUpdateMetadataField={onUpdateMetadataField}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default BookEditorView;
