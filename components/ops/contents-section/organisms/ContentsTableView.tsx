import React from 'react';
import { CONTENTS_EXPLANATION } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode
} from '../../ops-ui';

/**
 * ContentsTableView - Contents table definition with columns and relationships
 */
export const ContentsTableView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={CONTENTS_EXPLANATION.title} />
      <OpsCardContent>
        <OpsText className="text-foreground max-w-4xl mb-6">
          {CONTENTS_EXPLANATION.definition}
        </OpsText>
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-6">
          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium tracking-wide">
            {CONTENTS_EXPLANATION.principle}
          </p>
        </div>

        {/* Key Columns */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Colunas Principais</h4>
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Coluna</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tipo</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
                </tr>
              </thead>
              <tbody>
                {CONTENTS_EXPLANATION.keyColumns.map((col, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4">
                      <OpsCode style={{ color: OPS_ACCENT }}>{col.name}</OpsCode>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{col.type}</td>
                    <td className="py-3 px-4 text-muted-foreground leading-relaxed">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Relationships */}
        <OpsGrid columns={2}>
          <div className="p-5 rounded-lg bg-muted/10 border border-border/20">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Has Many</h4>
            {CONTENTS_EXPLANATION.relationships.hasMany.map((rel, i) => (
              <div key={i} className="text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                <code style={{ color: OPS_ACCENT }}>{rel.table}</code>
                <span className="text-muted-foreground text-xs">via {rel.via}</span>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-lg bg-muted/10 border border-border/20">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Many to Many</h4>
            {CONTENTS_EXPLANATION.relationships.manyToMany.map((rel, i) => (
              <div key={i} className="text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                <code style={{ color: OPS_ACCENT }}>{rel.table}</code>
                <span className="text-muted-foreground text-xs">via {rel.via}</span>
              </div>
            ))}
          </div>
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
