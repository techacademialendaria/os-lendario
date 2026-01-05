// Brief Preview Component
// Displays the markdown preview of the brief

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BriefPreviewProps {
  markdown: string;
}

export const BriefPreview: React.FC<BriefPreviewProps> = ({ markdown }) => (
  <div className="animate-fade-in">
    <Card className="overflow-hidden border border-border shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Icon name="code" size="size-3" /> brief.md
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
          {markdown}
        </pre>
      </CardContent>
    </Card>
  </div>
);
