import React from 'react';
import { cn } from '../../../../lib/utils';
import { useJsonParser } from './hooks';
import { NeuralTreeViewer, MarkdownFallback } from './organisms';
import type { YamlViewerProps } from './types';

export const JsonViewer: React.FC<YamlViewerProps> = ({ content, className }) => {
  const { parsedData, parseError } = useJsonParser(content);

  if (parseError) {
    return <MarkdownFallback content={content} error={parseError} />;
  }

  if (!parsedData) {
    return <div className="text-xs italic text-muted-foreground">Vazio ou carregando...</div>;
  }

  return (
    <div className={cn('relative', className)}>
      <NeuralTreeViewer data={parsedData} />
    </div>
  );
};
