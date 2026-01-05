/**
 * AuditPanel Organism
 * Displays AI audit results or empty state.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { STUDIO_PRIMARY } from '../../studio-tokens';
import type { AuditPanelProps } from '../types';

export const AuditPanel: React.FC<AuditPanelProps> = ({ aiAudit }) => {
  if (!aiAudit.hasAnalysis) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
          <Icon name="magic-wand" size="size-7" className="text-muted-foreground" />
        </div>
        <h4 className="mb-2 text-sm font-semibold">Sem analise</h4>
        <p className="mb-6 px-4 text-xs text-muted-foreground">
          Esta licao ainda nao foi analisada pelo sistema de auditoria didatica.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-studio-primary/40 text-studio-primary hover:bg-studio-primary/5 hover:text-studio-primary"
        >
          <Icon name="magic-wand" size="size-3" />
          Analisar Conteudo
        </Button>
        <p className="mt-4 text-[10px] text-muted-foreground">
          Funcionalidade em desenvolvimento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
        <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-muted"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={STUDIO_PRIMARY}
              strokeWidth="3"
              strokeDasharray={`${aiAudit.overallScore || 0}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-studio-primary">
              {aiAudit.overallScore}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Score de Fidelidade</p>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {aiAudit.metrics.map((metric, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium">{metric.score}%</span>
            </div>
            <Progress value={metric.score} className="h-1" />
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {aiAudit.suggestions.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Sugestoes
          </h5>
          {aiAudit.suggestions.map((sug, i) => (
            <div
              key={i}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-xs"
            >
              {sug}
            </div>
          ))}
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full text-xs">
        <Icon name="refresh" className="mr-2" size="size-3" /> Re-analisar
      </Button>
    </div>
  );
};
