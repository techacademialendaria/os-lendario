import React from 'react';
import { OpsPage } from '../ops-ui';
import type { GapsSectionProps } from './types';
import {
  GapsCriticalDiagram,
  GapsQuickStats,
  GapsSummaryTable,
  DependencyChainView,
  GapImpactAnalysis,
  CurrentDataStatus,
  ResolutionRoadmap,
  QuickWinsView,
  ProposedTablesView,
  FitScoreFormula,
  ExecutiveSummary,
} from './organisms';

export const GapsSection: React.FC<GapsSectionProps> = ({ stats, loading }) => {
  return (
    <OpsPage>
      <GapsCriticalDiagram />
      <GapsQuickStats />
      <GapsSummaryTable />
      <DependencyChainView />
      <GapImpactAnalysis />
      <CurrentDataStatus stats={stats} loading={loading} />
      <ResolutionRoadmap />
      <QuickWinsView />
      <ProposedTablesView />
      <FitScoreFormula />
      <ExecutiveSummary />
    </OpsPage>
  );
};
