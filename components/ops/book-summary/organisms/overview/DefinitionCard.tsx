import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../../ops-ui';
import { OPS_ACCENT } from '../../../ops-tokens';
import { BOOK_SUMMARY_EXPLANATION } from '../../../data/book-summary-content';

export const DefinitionCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_SUMMARY_EXPLANATION.title} />
    <OpsCardContent>
      <OpsText className="text-foreground mb-4">{BOOK_SUMMARY_EXPLANATION.definition}</OpsText>
      <div className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
        <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>Principio Central</h4>
        <OpsText className="text-sm">{BOOK_SUMMARY_EXPLANATION.principle}</OpsText>
      </div>
    </OpsCardContent>
  </OpsCard>
);
