import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardContent } from '../../ops-ui';

interface ErrorStateViewProps {
  error: Error;
}

export const ErrorStateView: React.FC<ErrorStateViewProps> = ({ error }) => {
  return (
    <OpsCard>
      <OpsCardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Icon name="exclamation-circle" size="size-6" className="text-destructive" />
          <span className="text-sm text-destructive">Erro ao carregar modelos mentais</span>
          <span className="text-xs text-muted-foreground">{error.message}</span>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
