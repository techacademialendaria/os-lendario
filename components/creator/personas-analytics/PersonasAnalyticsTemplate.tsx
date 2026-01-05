import React from 'react';
import type { Persona } from '@/hooks/useAudienceProfiles';
import type { PersonasView } from './types';
import { usePersonasAnalytics } from './hooks';
import {
  PersonasAnalyticsHeader,
  FilterBar,
  LtvChart,
  EngagementChart,
  ConsciousnessChart,
  JourneysChart,
  ComparisonMatrix,
} from './organisms';

interface PersonasAnalyticsTemplateProps {
  onViewChange: (view: PersonasView) => void;
  personas: Persona[];
}

export const PersonasAnalyticsTemplate: React.FC<PersonasAnalyticsTemplateProps> = ({
  onViewChange,
  personas,
}) => {
  const {
    selectedPersonas,
    period,
    showPersonaSelector,
    selectedPersonaData,
    analyticsData,
    maxLtv,
    setPeriod,
    setShowPersonaSelector,
    togglePersona,
    removePersona,
    getPersonaColor,
  } = usePersonasAnalytics(personas);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <PersonasAnalyticsHeader onBack={() => onViewChange('dashboard')} />

      <FilterBar
        selectedPersonas={selectedPersonas}
        personas={personas}
        showPersonaSelector={showPersonaSelector}
        period={period}
        onToggleSelector={() => setShowPersonaSelector(!showPersonaSelector)}
        onRemovePersona={removePersona}
        onTogglePersona={togglePersona}
        onPeriodChange={setPeriod}
        getPersonaColor={getPersonaColor}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LtvChart data={analyticsData.ltv} maxLtv={maxLtv} getPersonaColor={getPersonaColor} />
        <EngagementChart
          channelEngagement={analyticsData.channelEngagement}
          getPersonaColor={getPersonaColor}
        />
        <ConsciousnessChart data={analyticsData.consciousness} />
        <JourneysChart journeys={analyticsData.journeys} />
      </div>

      <ComparisonMatrix matrix={analyticsData.matrix} selectedPersonaData={selectedPersonaData} />
    </div>
  );
};
