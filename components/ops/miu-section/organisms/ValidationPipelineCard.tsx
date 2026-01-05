import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsLabel, OpsCode } from '../../ops-ui';
import { MIU_VALIDATION } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const ValidationPipelineCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={MIU_VALIDATION.title} />
    <OpsCardContent>
      <OpsText className="text-muted-foreground text-sm mb-6">{MIU_VALIDATION.description}</OpsText>

      {/* Quality Gates */}
      <div className="mb-6">
        <OpsLabel className="mb-3">Quality Gates</OpsLabel>
        <OpsGrid columns={2}>
          {MIU_VALIDATION.qualityGates.map((gate, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={gate.icon} size="size-4" style={{ color: OPS_ACCENT }} />
                <span className="font-medium text-foreground">{gate.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{gate.rule}</p>
              <p className="text-xs text-muted-foreground/70 italic">{gate.reason}</p>
            </div>
          ))}
        </OpsGrid>
      </div>

      {/* Validation Statuses */}
      <div className="mb-6">
        <OpsLabel className="mb-3">Status de Validacao</OpsLabel>
        <div className="flex flex-wrap gap-2">
          {MIU_VALIDATION.statuses.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: s.color === 'green' ? '#22c55e' :
                    s.color === 'red' ? '#ef4444' :
                      s.color === 'yellow' ? '#eab308' : '#f97316'
                }}
              />
              <OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{s.status}</OpsCode>
              <span className="text-xs text-muted-foreground">- {s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Rejections */}
      <div>
        <OpsLabel className="mb-3">Rejeicoes Comuns</OpsLabel>
        <div className="space-y-2">
          {MIU_VALIDATION.commonRejections.map((r, i) => (
            <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Badge variant="outline" className="text-[10px] text-red-400 border-red-400/30 w-fit">{r.reason}</Badge>
                <span className="text-xs text-muted-foreground italic">{r.example}</span>
              </div>
              <p className="text-xs text-emerald-400 mt-2">Fix: {r.fix}</p>
            </div>
          ))}
        </div>
      </div>
    </OpsCardContent>
  </OpsCard>
);
