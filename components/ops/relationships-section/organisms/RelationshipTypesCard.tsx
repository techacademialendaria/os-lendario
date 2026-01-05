import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode
} from '../../ops-ui';
import type { RelationshipTypesCardProps } from '../types';

export const RelationshipTypesCard: React.FC<RelationshipTypesCardProps> = ({
  title,
  desc,
  types
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 leading-relaxed max-w-4xl">{desc}</OpsText>

        <OpsGrid columns={3}>
          {types.map((type, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 flex flex-col h-full shadow-sm" style={{ borderColor: type.color }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl" style={{ color: type.color }}>{type.symbol}</span>
                <span className="text-base font-bold" style={{ color: type.color }}>{type.label}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{type.desc}</p>
              <div className="mt-auto space-y-2">
                <OpsCode className="text-xs bg-muted/30 px-2 py-1.5 rounded text-muted-foreground block border border-white/5 truncate" title={type.example}>
                  {type.example}
                </OpsCode>
                <p className="text-[10px] text-muted-foreground/70 italic px-1 pt-1 border-t border-border/30">
                  {type.useCase}
                </p>
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
