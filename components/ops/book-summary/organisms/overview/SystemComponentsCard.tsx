import React from 'react';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsCode } from '../../../ops-ui';
import { BOOK_SUMMARY_EXPLANATION } from '../../../data/book-summary-content';

export const SystemComponentsCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Componentes do Sistema" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={3}>
        {BOOK_SUMMARY_EXPLANATION.components.map((comp, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-muted/20 border-l-4 transition-all hover:bg-muted/30"
            style={{ borderColor: comp.color }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={comp.icon} size="size-4" style={{ color: comp.color }} />
              <OpsCode className="text-xs font-bold" style={{ color: comp.color }}>{comp.name}</OpsCode>
            </div>
            <p className="text-xs text-muted-foreground">{comp.desc}</p>
          </div>
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);
