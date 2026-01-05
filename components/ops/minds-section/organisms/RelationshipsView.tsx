import React from 'react';
import { MIND_RELATIONSHIPS } from '../../data/minds-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

export const RelationshipsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MIND_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6">{MIND_RELATIONSHIPS.description}</OpsText>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inbound */}
          <div className="p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
            <h5 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#0891b2' }}>
              <Icon name="arrow-small-down" size="size-4" />
              Inbound (dados que alimentam)
            </h5>
            <div className="space-y-3">
              {MIND_RELATIONSHIPS.inbound.map((rel, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/5 hover:border-cyan-500/30 transition-colors">
                  <div className="mt-0.5 p-1.5 rounded bg-cyan-500/10">
                    <Icon name={rel.icon} size="size-4" style={{ color: '#0891b2' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{rel.table}</code>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 text-foreground px-1.5 py-0.5 rounded">{rel.cardinality}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{rel.relationship}</p>
                    <span className="text-[10px] italic opacity-70 block" style={{ color: OPS_PRIMARY }}>via: {rel.via}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outbound */}
          <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/10">
            <h5 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#dc2626' }}>
              <Icon name="arrow-small-up" size="size-4" />
              Outbound (dados derivados)
            </h5>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {MIND_RELATIONSHIPS.outbound.map((rel, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/5 hover:border-red-500/30 transition-colors">
                  <div className="mt-0.5 p-1.5 rounded bg-red-500/10">
                    <Icon name={rel.icon} size="size-4" style={{ color: '#dc2626' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{rel.table}</code>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 text-foreground px-1.5 py-0.5 rounded">{rel.cardinality}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{rel.relationship}</p>
                    <span className="text-[10px] italic opacity-70 block" style={{ color: OPS_PRIMARY }}>via: {rel.via}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
