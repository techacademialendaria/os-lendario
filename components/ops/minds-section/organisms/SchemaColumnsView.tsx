import React from 'react';
import { MIND_SCHEMA } from '../../data/minds-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

export const SchemaColumnsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Schema - Colunas Principais" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-6">
          {Object.entries(MIND_SCHEMA).map(([tableName, columns], i) => (
            <div key={i} className="p-5 rounded-xl bg-muted/5 border border-border/10">
              <code className="text-base font-bold block mb-4" style={{ color: OPS_ACCENT }}>{tableName}</code>
              <div className="space-y-2">
                {columns.map((col, j) => (
                  <div key={j} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm border-b border-border/5 last:border-0 pb-2 last:pb-0">
                    <code className="text-foreground font-bold w-40">{col.column}</code>
                    <span className="text-muted-foreground font-mono text-xs w-24 opacity-70">{col.type}</span>
                    <span className="text-muted-foreground flex-1 leading-relaxed">{col.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
