import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardContent } from '../../ops-ui';

export const EmptyStateView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Icon name="info-circle" size="size-6" className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Nenhum modelo mental encontrado</span>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
