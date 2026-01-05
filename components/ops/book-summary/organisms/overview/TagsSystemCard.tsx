import React from 'react';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode } from '../../../ops-ui';
import { OPS_ACCENT, OPS_PRIMARY } from '../../../ops-tokens';
import { BOOK_TAGS_SYSTEM } from '../../../data/book-summary-content';

export const TagsSystemCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_TAGS_SYSTEM.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="mb-4">{BOOK_TAGS_SYSTEM.description}</OpsText>
      <OpsGrid columns={3}>
        {BOOK_TAGS_SYSTEM.tagTypes.map((tag, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <OpsCode className="text-xs font-bold mb-2 block" style={{ color: OPS_ACCENT }}>{tag.type}</OpsCode>
            <p className="text-xs text-foreground mb-2">{tag.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {tag.examples.slice(0, 4).map((ex, j) => (
                <span key={j} className="text-[10px] bg-muted/30 px-1.5 py-0.5 rounded">{ex}</span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground italic">Uso: {tag.usage}</p>
          </div>
        ))}
      </OpsGrid>
      <div className="mt-4 p-4 rounded-lg bg-muted/10">
        <h5 className="text-xs font-bold mb-2" style={{ color: OPS_ACCENT }}>Workflow de Tagging</h5>
        <div className="flex items-center gap-2 flex-wrap">
          {BOOK_TAGS_SYSTEM.workflow.map((step, i) => (
            <React.Fragment key={i}>
              <span className="text-[10px] bg-muted/20 px-2 py-1 rounded">{step}</span>
              {i < BOOK_TAGS_SYSTEM.workflow.length - 1 && (
                <Icon name="arrow-right" size="size-3" style={{ color: OPS_PRIMARY }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </OpsCardContent>
  </OpsCard>
);
