// Live Preview Sidebar Component
// Shows live markdown preview of the PRD

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LivePreviewSidebarProps {
  preview: string;
  onDownload: () => void;
}

export const LivePreviewSidebar: React.FC<LivePreviewSidebarProps> = ({
  preview,
  onDownload,
}) => (
  <aside className="h-fit space-y-6 lg:sticky lg:top-32 lg:col-span-5">
    <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-xl border border-border bg-muted/30 shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 p-3">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Icon name="code" size="size-3" /> Live Preview (PRD.md)
        </span>
        <Badge variant="outline" className="bg-background text-[10px]">
          Auto-Save
        </Badge>
      </div>
      <ScrollArea className="flex-1 bg-card p-6">
        <article className="prose prose-sm dark:prose-invert max-w-none font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre-wrap">{preview}</pre>
        </article>
      </ScrollArea>
      <div className="border-t border-border bg-muted/10 p-3 text-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-full text-xs text-muted-foreground"
          onClick={onDownload}
        >
          <Icon name="download" size="size-3" className="mr-2" /> Baixar Markdown
        </Button>
      </div>
    </div>
  </aside>
);
