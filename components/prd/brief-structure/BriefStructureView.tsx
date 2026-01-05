// BriefStructureView - Orchestrator Template
// Composes all organisms for the Brief Structure view

import React from 'react';
import type { BriefStructureViewProps } from './types';
import { useBriefStructureData, useBriefStructureUI } from './hooks';
import {
  BriefHeader,
  InitialState,
  LoadingState,
  ErrorState,
  SectionsListView,
  ProgressFooter,
  PreviewDialog,
} from './organisms';

export const BriefStructureView: React.FC<BriefStructureViewProps> = ({
  project,
  onUpdate,
  onNext,
}) => {
  // Hooks
  const data = useBriefStructureData({ project, onUpdate });
  const ui = useBriefStructureUI();

  // Computed
  const preview = ui.formatPreview(data.structure);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <BriefHeader
        hasStructure={!!data.structure}
        onPreview={ui.openPreview}
        onRegenerate={data.handleGenerate}
        isGenerating={data.isGenerating}
      />

      {/* Initial State */}
      {!data.structure && !data.isGenerating && (
        <InitialState onGenerate={data.handleGenerate} />
      )}

      {/* Loading State */}
      {data.isGenerating && !data.structure && (
        <LoadingState progress={data.progress} />
      )}

      {/* Error State */}
      {data.error && (
        <ErrorState error={data.error} onRetry={data.handleGenerate} />
      )}

      {/* Sections */}
      {data.structure && (
        <SectionsListView
          structure={data.structure}
          regeneratingSection={data.regeneratingSection}
          onSectionChange={data.handleSectionChange}
          onRegenerateSection={data.handleRegenerateSection}
        />
      )}

      {/* Progress & Actions */}
      {data.structure && (
        <ProgressFooter isComplete={data.isComplete} onNext={onNext} />
      )}

      {/* Preview Dialog */}
      <PreviewDialog
        open={ui.showPreview}
        onOpenChange={ui.setShowPreview}
        preview={preview}
        onCopy={() => ui.copyToClipboard(preview)}
      />
    </div>
  );
};

export default BriefStructureView;
