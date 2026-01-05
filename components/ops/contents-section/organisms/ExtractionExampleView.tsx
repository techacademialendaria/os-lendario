import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { EXTRACTION_EXAMPLE } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
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
 * ExtractionExampleView - Side-by-side comparison of content extracted as Fragment vs MIUs
 */
export const ExtractionExampleView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={EXTRACTION_EXAMPLE.title} />
      <OpsCardContent>
        {/* Source Content */}
        <div className="p-6 rounded-xl bg-muted/10 border border-border/30 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="outline" className="text-xs">{EXTRACTION_EXAMPLE.sourceContent.contentType}</Badge>
            <StatusBadge status={EXTRACTION_EXAMPLE.sourceContent.status} color="green" />
          </div>
          <h4 className="font-medium text-lg text-foreground mb-4">{EXTRACTION_EXAMPLE.sourceContent.title}</h4>
          <div className="relative pl-6 border-l-2" style={{ borderColor: OPS_ACCENT }}>
            <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
              &quot;{EXTRACTION_EXAMPLE.sourceContent.excerpt}&quot;
            </p>
          </div>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* As Fragment */}
          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col h-full">
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 pb-2 border-b border-red-500/10">
              Como Fragment (Legado)
            </h4>

            <div className="space-y-4 text-sm flex-1">
              <div className="grid grid-cols-[80px_1fr] gap-2">
                <code className="text-muted-foreground text-xs">type:</code>
                <span className="text-red-300 font-mono text-xs">{EXTRACTION_EXAMPLE.asFragment.type}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2">
                <code className="text-muted-foreground text-xs">content:</code>
                <span className="text-red-300 truncate font-mono text-xs" title={EXTRACTION_EXAMPLE.asFragment.content}>
                  {EXTRACTION_EXAMPLE.asFragment.content}
                </span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-2">
                <code className="text-muted-foreground text-xs">insight:</code>
                <span className="text-red-300 italic">{EXTRACTION_EXAMPLE.asFragment.insight}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/10">
              <p className="text-xs text-red-300 font-medium flex gap-2">
                <Icon name="exclamation-triangle" size="size-3" className="text-red-400" />
                {EXTRACTION_EXAMPLE.asFragment.problem}
              </p>
            </div>
          </div>

          {/* As MIUs */}
          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col h-full">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 pb-2 border-b border-emerald-500/10">
              Como MIUs (Zero-Inference)
            </h4>

            <div className="space-y-4 flex-1">
              {EXTRACTION_EXAMPLE.asMIUs.map((miu, i) => (
                <div key={i} className="p-3 rounded bg-muted/20 text-sm border border-emerald-500/10">
                  <p className="text-foreground italic mb-2 leading-relaxed">&quot;{miu.verbatim}&quot;</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      pronouns: {miu.pronouns.join(', ') || '[]'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      verbs: {miu.verbs.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advantage */}
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Icon name="check" size="size-4" className="text-emerald-400" />
          </div>
          <p className="text-sm md:text-base text-emerald-400 font-medium">{EXTRACTION_EXAMPLE.advantage}</p>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
