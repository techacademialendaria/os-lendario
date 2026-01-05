// Export Actions Hook
// Handles copy, download, and complete actions

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExportFormat } from '../types';

interface UseExportActionsProps {
  content: string;
  selectedFormat: ExportFormat;
  projectSlug: string;
  advancePhase: () => Promise<boolean>;
}

export function useExportActions({
  content,
  selectedFormat,
  projectSlug,
  advancePhase,
}: UseExportActionsProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const handleDownload = useCallback(() => {
    const filename =
      selectedFormat === 'claude'
        ? 'CLAUDE.md'
        : selectedFormat === 'cursor'
          ? '.cursorrules'
          : `prd-${projectSlug || 'export'}.md`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, selectedFormat, projectSlug]);

  const handleDownloadAll = useCallback(() => {
    // TODO: Implement ZIP generation
    alert('ZIP download coming soon!');
  }, []);

  const handleComplete = useCallback(async () => {
    await advancePhase();
    navigate('/prd');
  }, [advancePhase, navigate]);

  return {
    copied,
    handleCopy,
    handleDownload,
    handleDownloadAll,
    handleComplete,
  };
}
