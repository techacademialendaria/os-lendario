import { useMemo } from 'react';
import { SENTIMENT_COLORS } from '../types';
import type { SentimentPieDataItem, GroupBarDataItem } from '../types';

interface GeneralStats {
  sentimentos: {
    positivo: number;
    misto: number;
    neutro: number;
    negativo: number;
  };
}

interface GroupHealthScore {
  grupo: string;
  score: number;
  positivo: number;
  negativo: number;
}

interface UseChartDataParams {
  generalStats: GeneralStats;
  groupHealthScores: GroupHealthScore[];
}

export function useChartData({ generalStats, groupHealthScores }: UseChartDataParams) {
  // Data for sentiment pie chart
  const sentimentPieData = useMemo<SentimentPieDataItem[]>(() => [
    { name: 'Positivo', value: generalStats.sentimentos.positivo, color: SENTIMENT_COLORS.positivo },
    { name: 'Misto', value: generalStats.sentimentos.misto, color: SENTIMENT_COLORS.misto },
    { name: 'Neutro', value: generalStats.sentimentos.neutro, color: SENTIMENT_COLORS.neutro },
    { name: 'Negativo', value: generalStats.sentimentos.negativo, color: SENTIMENT_COLORS.negativo },
  ], [generalStats]);

  // Data for group bar chart
  const groupBarData = useMemo<GroupBarDataItem[]>(() => {
    return groupHealthScores.slice(0, 10).map(g => ({
      name: g.grupo.length > 20 ? g.grupo.substring(0, 18) + '...' : g.grupo,
      score: g.score,
      positivo: g.positivo,
      negativo: g.negativo,
    }));
  }, [groupHealthScores]);

  return {
    sentimentPieData,
    groupBarData,
  };
}
