import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardContent } from '../../ops-ui';

export const LoadingStateView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Icon name="spinner" size="size-6" className="animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Carregando modelos mentais...</span>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
