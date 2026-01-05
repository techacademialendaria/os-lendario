// PRD Export Template - Orchestrator
// Composes all organisms for the Export phase

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePRDProject } from '@/hooks/prd/usePRDProject';
import { PRDExportTemplateProps, ExportFormat } from './types';
import { useExportContent, useExportActions } from './hooks';
import {
  ExportHeader,
  ProjectStats,
  ExportFormatSelector,
  ExportPreview,
  ExportFooter,
} from './organisms';

export const PRDExportTemplate: React.FC<PRDExportTemplateProps> = ({ project }) => {
  const { slug } = useParams<{ slug: string }>();
  const { advancePhase } = usePRDProject(slug || '');

  // State
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('lovable');

  // Hooks
  const { content } = useExportContent({ project, selectedFormat });
  const { copied, handleCopy, handleDownload, handleDownloadAll, handleComplete } =
    useExportActions({
      content,
      selectedFormat,
      projectSlug: project.slug,
      advancePhase,
    });

  // Stats
  const epicsCount = project.project_metadata?.epics?.length || 0;
  const storiesCount = project.project_metadata?.stories?.length || 0;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <ExportHeader slug={slug || ''} />

      <main className="container mx-auto max-w-6xl flex-1 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Seu Kit de Execucao esta pronto</h1>
          <p className="font-serif text-muted-foreground">
            Escolha sua ferramenta de IA preferida e copie o prompt otimizado.
          </p>
        </div>

        <ProjectStats epicsCount={epicsCount} storiesCount={storiesCount} />

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          <ExportFormatSelector
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
            onDownloadAll={handleDownloadAll}
          />

          <ExportPreview
            content={content}
            copied={copied}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        </div>

        <ExportFooter onComplete={handleComplete} />
      </main>
    </div>
  );
};

export default PRDExportTemplate;
