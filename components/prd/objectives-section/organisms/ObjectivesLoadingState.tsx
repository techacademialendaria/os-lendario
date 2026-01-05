/**
 * ObjectivesLoadingState
 * Loading indicator during AI generation
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const ObjectivesLoadingState: React.FC = () => {
  return (
    <Card className="p-8 text-center">
      <Icon name="refresh" className="mx-auto mb-3 size-8 animate-spin text-studio-primary" />
      <p className="text-sm text-muted-foreground">Gerando objetivos...</p>
    </Card>
  );
};
