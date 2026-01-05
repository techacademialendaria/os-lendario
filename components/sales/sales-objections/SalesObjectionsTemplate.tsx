import React from 'react';
import { Section } from '../../../types';
import SalesTopbar from '../SalesTopbar';
import { useObjectionsState } from './hooks';
import {
  ObjectionsHeader,
  MetricsGrid,
  EvolutionChart,
  RankingPanel,
  MatrixPanel,
  AlertsPanel,
} from './organisms';
import {
  MOCK_OBJECTION_RANKING,
  PRODUCTS,
  MOCK_MATRIX_DATA,
  MOCK_ALERTS,
} from './data';
import type { SalesObjectionsTemplateProps } from './types';

const SalesObjectionsTemplate: React.FC<SalesObjectionsTemplateProps> = ({ setSection }) => {
  const { period, setPeriod } = useObjectionsState();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_OBJECTIONS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        <ObjectionsHeader period={period} onPeriodChange={setPeriod} />

        <MetricsGrid />

        <EvolutionChart />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RankingPanel rankings={MOCK_OBJECTION_RANKING} />
          <MatrixPanel products={PRODUCTS} matrixData={MOCK_MATRIX_DATA} />
        </div>

        <AlertsPanel alerts={MOCK_ALERTS} />
      </main>
    </div>
  );
};

export default SalesObjectionsTemplate;
