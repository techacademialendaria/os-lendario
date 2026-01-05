import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/card';
import { Icon } from '../../../../ui/icon';
import { Badge } from '../../../../ui/badge';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { MindArtifactsResult } from '../../../../../hooks/useMindArtifacts';

interface PromptsTabProps {
  artifactsData: MindArtifactsResult | null;
  loading: boolean;
}

export const PromptsTab: React.FC<PromptsTabProps> = ({ artifactsData, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-studio-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!artifactsData?.prompts.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="terminal" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum system prompt disponivel para esta mente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {artifactsData.prompts.map((prompt) => (
        <Card key={prompt.id} className={STUDIO_CARD_CLASSES}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">{prompt.title}</CardTitle>
            <Badge variant="outline" className="text-xs">
              {prompt.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg overflow-x-auto max-h-48">
              {prompt.content?.substring(0, 500)}...
            </pre>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
