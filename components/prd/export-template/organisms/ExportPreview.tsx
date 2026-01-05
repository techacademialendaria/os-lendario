// Export Preview Component
// Shows the generated export content with copy/download actions

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { STUDIO_TEAL } from '../types';

interface ExportPreviewProps {
  content: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export const ExportPreview: React.FC<ExportPreviewProps> = ({
  content,
  copied,
  onCopy,
  onDownload,
}) => (
  <div className="lg:col-span-8">
    <Card className="flex h-full flex-col overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <Icon name="code" className="text-muted-foreground" size="size-4" />
          <span className="font-mono text-sm font-bold">prompt_output.md</span>
        </div>
        <Button
          size="sm"
          onClick={onCopy}
          className="gap-2 text-white"
          style={{ backgroundColor: STUDIO_TEAL }}
        >
          <Icon name={copied ? 'check' : 'copy'} size="size-3" />
          {copied ? 'Copiado!' : 'Copiar Prompt'}
        </Button>
      </div>

      <ScrollArea className="flex-1 bg-zinc-900">
        <pre className="p-6 font-mono text-sm leading-relaxed text-zinc-300">
          {content}
        </pre>
      </ScrollArea>

      <div className="border-t border-border bg-muted/10 p-3 text-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground"
          onClick={onDownload}
        >
          <Icon name="download" size="size-3" className="mr-2" />
          Baixar como arquivo
        </Button>
      </div>
    </Card>
  </div>
);
