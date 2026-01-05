/**
 * PersonasDashboard - Orchestrator Component
 *
 * Refactored from 444 lines to ~60 lines
 * Following Atomic Design pattern
 */
import React from 'react';
import type { PersonasDashboardProps } from './types';
import { DEFAULT_STATS } from './types';
import {
  DashboardHeader,
  KpiRow,
  BehavioralProfilesCard,
  TriggersCard,
  ConsciousnessCard,
  ValidationStatusCard,
  InsightsSection,
} from './organisms';

export const PersonasDashboard: React.FC<PersonasDashboardProps> = ({
  onViewChange,
  stats = DEFAULT_STATS,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Header */}
      <DashboardHeader onViewChange={onViewChange} />

      {/* KPI Row */}
      <KpiRow stats={stats} />

      {/* Row 2: Behaviors & Triggers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BehavioralProfilesCard stats={stats} />
        <TriggersCard />
      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ConsciousnessCard />
        <ValidationStatusCard />
      </div>

      {/* Row 4: Insights */}
      <InsightsSection />
    </div>
  );
};

export default PersonasDashboard;
