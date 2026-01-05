import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode } from '../../../ops-ui';
import { BOOK_SUMMARY_RELATIONSHIPS } from '../../../data/book-summary-content';

interface RelationshipColumnProps {
  title: string;
  items: Array<{ icon: string; table: string; cardinality: string; description: string; via: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const RelationshipColumn: React.FC<RelationshipColumnProps> = ({ title, items, color, bgColor, borderColor }) => (
  <div className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
    <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>{title}</h4>
    <div className="space-y-3">
      {items.map((rel, i) => (
        <div key={i} className="p-3 rounded bg-muted/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name={rel.icon} size="size-3" style={{ color }} />
            <OpsCode className="text-xs font-bold" style={{ color }}>{rel.table}</OpsCode>
            <Badge variant="outline" className="text-[9px]" style={{ borderColor: `${color}30`, color }}>{rel.cardinality}</Badge>
          </div>
          <p className="text-[10px] text-muted-foreground">{rel.description}</p>
          <p className="text-[9px] text-muted-foreground/60 mt-1 font-mono">via: {rel.via}</p>
        </div>
      ))}
    </div>
  </div>
);

export const RelationshipsCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_SUMMARY_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="mb-4">{BOOK_SUMMARY_RELATIONSHIPS.description}</OpsText>
      <OpsGrid columns={2}>
        <RelationshipColumn title="Inbound (De onde vem)" items={BOOK_SUMMARY_RELATIONSHIPS.inbound} color="#0891b2" bgColor="bg-cyan-500/5" borderColor="border-cyan-500/20" />
        <RelationshipColumn title="Outbound (Para onde vai)" items={BOOK_SUMMARY_RELATIONSHIPS.outbound} color="#dc2626" bgColor="bg-red-500/5" borderColor="border-red-500/20" />
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);
