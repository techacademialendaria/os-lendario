import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../../ops-ui';
import { StatsGrid, type StatItem } from '../../../../shared/molecules';
import { BOOK_SUMMARY_EXPLANATION } from '../../../data/book-summary-content';

export const StatsCard: React.FC = () => {
  const stats: StatItem[] = [
    { id: 'phases', icon: 'layers', iconColorClass: 'text-violet-400', bgColorClass: 'bg-violet-500/10', value: BOOK_SUMMARY_EXPLANATION.stats.totalPhases, label: 'Fases Totais' },
    { id: 'pro', icon: 'cpu', iconColorClass: 'text-blue-400', bgColorClass: 'bg-blue-500/10', value: BOOK_SUMMARY_EXPLANATION.stats.proModelCalls, label: 'Chamadas PRO' },
    { id: 'flash', icon: 'zap', iconColorClass: 'text-amber-400', bgColorClass: 'bg-amber-500/10', value: BOOK_SUMMARY_EXPLANATION.stats.flashModelCalls, label: 'Chamadas FLASH' },
    { id: 'words', icon: 'document-text', iconColorClass: 'text-emerald-400', bgColorClass: 'bg-emerald-500/10', value: BOOK_SUMMARY_EXPLANATION.stats.outputWordCount, label: 'Palavras Output' },
  ];

  return (
    <OpsCard>
      <OpsCardHeader title="Pipeline em Numeros" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <StatsGrid stats={stats} columns={4} />
      </OpsCardContent>
    </OpsCard>
  );
};
