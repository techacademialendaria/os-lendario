import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid } from '../../ops-ui';
import { MIU_EXPLANATION } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const ExamplesCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Exemplos de Extracao" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <div className="space-y-4">
        {MIU_EXPLANATION.examples.map((ex, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg space-y-3 ${ex.status === 'rejected'
              ? 'bg-red-500/10 border border-red-500/30'
              : 'bg-muted/20'
            }`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[10px]">{ex.context}</Badge>
              <Badge
                variant="outline"
                className={`text-[10px] ${ex.status === 'validated'
                  ? 'text-emerald-400 border-emerald-400/30'
                  : 'text-red-400 border-red-400/30'
                }`}
              >
                {ex.status}
              </Badge>
            </div>
            <p
              className="text-foreground italic border-l-2 pl-3"
              style={{ borderColor: ex.status === 'rejected' ? '#ef4444' : OPS_ACCENT }}
            >
              &quot;{ex.verbatim}&quot;
            </p>
            {ex.rejectionReason && (
              <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                Motivo da rejeicao: {ex.rejectionReason}
              </p>
            )}
            <OpsGrid columns={4} className="gap-2 text-xs">
              <div className="p-2 rounded bg-muted/20">
                <span className="text-muted-foreground">pronouns:</span>
                <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.pronouns.join(', ') || '-'}</span>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <span className="text-muted-foreground">verbs:</span>
                <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.verbs.join(', ')}</span>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <span className="text-muted-foreground">modal:</span>
                <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.modal.length > 0 ? ex.analysis.modal.join(', ') : '-'}</span>
              </div>
              <div className={`p-2 rounded col-span-2 md:col-span-1 ${ex.status === 'rejected' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                <span className={ex.status === 'rejected' ? 'text-red-400' : 'text-emerald-400'}>
                  {ex.analysis.pattern}
                </span>
              </div>
            </OpsGrid>
          </div>
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);
