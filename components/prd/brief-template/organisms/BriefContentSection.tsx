// Brief Content Section Component
// Contains header with tabs and the editor/preview content

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EditorMode, BriefFormState, STUDIO_TEAL } from '../types';
import { BriefEditor } from './BriefEditor';
import { BriefPreview } from './BriefPreview';
import { DecisionSection } from './DecisionSection';

interface BriefContentSectionProps {
  viewMode: EditorMode;
  onViewModeChange: (mode: EditorMode) => void;
  form: BriefFormState;
  onFieldChange: (field: keyof BriefFormState, value: string) => void;
  isGenerating: string | null;
  onRegenerate: (field: string) => void;
  markdown: string;
  onDownload: () => void;
  isValid: boolean;
  isAdvancing: boolean;
  onTaskSelect: () => void;
  onProjectSelect: () => void;
}

export const BriefContentSection: React.FC<BriefContentSectionProps> = ({
  viewMode,
  onViewModeChange,
  form,
  onFieldChange,
  isGenerating,
  onRegenerate,
  markdown,
  onDownload,
  isValid,
  isAdvancing,
  onTaskSelect,
  onProjectSelect,
}) => (
  <div className="space-y-8 lg:col-span-8">
    {/* Header with tabs and download */}
    <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Seu Brief Estruturado</h1>
        <Badge
          variant="outline"
          className="border-[var(--studio-teal)]/20 bg-[var(--studio-teal)]/5 gap-2 text-[var(--studio-teal)]"
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          <Icon name="magic-wand" size="size-3" /> IA Generated
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {/* View Toggle */}
        <div className="flex rounded-lg border border-border bg-muted/50 p-1">
          <button
            onClick={() => onViewModeChange('edit')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
              viewMode === 'edit'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Editor
          </button>
          <button
            onClick={() => onViewModeChange('preview')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
              viewMode === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Markdown
          </button>
        </div>
        {/* Download Button */}
        <Button variant="outline" size="icon" onClick={onDownload} title="Baixar .md">
          <Icon name="download" size="size-4" />
        </Button>
      </div>
    </div>

    {viewMode === 'edit' ? (
      <BriefEditor
        form={form}
        onFieldChange={onFieldChange}
        isGenerating={isGenerating}
        onRegenerate={onRegenerate}
      />
    ) : (
      <BriefPreview markdown={markdown} />
    )}

    <DecisionSection
      isValid={isValid}
      isAdvancing={isAdvancing}
      onTaskSelect={onTaskSelect}
      onProjectSelect={onProjectSelect}
    />
  </div>
);
