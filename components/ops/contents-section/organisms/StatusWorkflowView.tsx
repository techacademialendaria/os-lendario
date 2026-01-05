import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { CONTENT_STATUSES } from '../../data/contents-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid
} from '../../ops-ui';

// Helper component for status badges
const StatusBadge: React.FC<{ status: string; color: 'gray' | 'yellow' | 'green' | 'red' }> = ({ status, color }) => {
  const colorMap = {
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    yellow: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <Badge variant="outline" className={`text-[10px] ${colorMap[color]}`}>
      {status}
    </Badge>
  );
};

/**
 * StatusWorkflowView - Content status workflow visualization
 */
export const StatusWorkflowView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Status Workflow" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-muted/10 rounded-xl border border-border/20">
          {CONTENT_STATUSES.map((s, i) => (
            <React.Fragment key={s.status}>
              <StatusBadge status={s.status} color={s.color} />
              {i < CONTENT_STATUSES.length - 1 && (
                <Icon name="arrow-right" size="size-3" className="text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>

        <OpsGrid>
          {CONTENT_STATUSES.map((s, i) => (
            <div
              key={i}
              className={`p-5 rounded-lg border flex flex-col justify-between transition-all hover:-translate-y-0.5 ${
                s.color === 'gray' ? 'bg-gray-500/5 border-gray-500/10' :
                s.color === 'yellow' ? 'bg-amber-500/5 border-amber-500/10' :
                s.color === 'green' ? 'bg-emerald-500/5 border-emerald-500/10' :
                'bg-red-500/5 border-red-500/10'
              }`}
            >
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={s.status} color={s.color} />
                </div>
                <span className="text-sm text-foreground font-medium block mb-1">{s.description}</span>
              </div>
              <div className="pt-3 border-t border-black/10 dark:border-white/5 mt-auto">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground/80">Proxima acao:</strong> {s.nextAction}
                </p>
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
