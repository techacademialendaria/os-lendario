import React, { useState } from 'react';
import { Section } from '../../../types';
import CreatorTopbar from '../CreatorTopbar';
import { useAudienceProfiles } from '../../../hooks/useAudienceProfiles';

// Views
import { PersonasDashboard, type PersonasView } from './personas-dashboard';
import { PersonasList } from './views/PersonasList';
import { PersonaDetail, type PersonaDetailTab } from './views/PersonaDetail';
import { PersonasAnalyticsTemplate } from '../personas-analytics';
import { PainPointEditor } from './pain-point-editor';
import { CreatePersona } from './create-persona';

interface PersonasTemplateProps {
  setSection: (s: Section) => void;
}

/**
 * PersonasTemplate - Enhanced Personas Module
 *
 * Views:
 * - dashboard: KPIs, behavioral profiles, triggers, insights
 * - list: Grid of persona cards with search/filters
 * - create: Wizard for creating new personas
 * - detail: Full persona view with tabs
 * - analytics: Comparison and analytics
 * - pain-editor: Pain point editor
 */
const PersonasTemplate: React.FC<PersonasTemplateProps> = ({ setSection }) => {
  const [currentView, setCurrentView] = useState<PersonasView>('dashboard');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<PersonaDetailTab>('base');

  // Fetch personas from database
  const { personas, loading, error, refetch } = useAudienceProfiles();

  // Calculate stats for dashboard
  const stats = {
    total: personas.length,
    active: personas.filter((p) => !p.slug.includes('draft')).length,
    drafts: personas.filter((p) => p.slug.includes('draft')).length,
    withDisc: personas.length, // TODO: Add disc field to personas
    withEnneagram: Math.floor(personas.length * 0.7), // TODO: Add enneagram field
  };

  const handleSelectPersona = (id: string) => {
    setSelectedPersonaId(id);
    setCurrentView('detail');
  };

  const handleViewChange = (view: PersonasView) => {
    setCurrentView(view);
    if (view !== 'detail') {
      setSelectedPersonaId(null);
    }
  };

  const selectedPersona = personas.find((p) => p.id === selectedPersonaId);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <PersonasDashboard onViewChange={handleViewChange} stats={stats} />;

      case 'list':
        return (
          <PersonasList
            onViewChange={handleViewChange}
            onSelectPersona={handleSelectPersona}
            personas={personas}
            loading={loading}
          />
        );

      case 'create':
        return (
          <CreatePersona
            onCancel={() => handleViewChange('list')}
            onSave={(persona) => {
              // TODO: Save persona to database
              console.log('Save persona:', persona);
              refetch();
              handleViewChange('list');
            }}
          />
        );

      case 'detail':
        if (!selectedPersona) {
          handleViewChange('list');
          return null;
        }
        return (
          <PersonaDetail
            persona={selectedPersona}
            activeTab={activeDetailTab}
            onTabChange={setActiveDetailTab}
            onViewChange={handleViewChange}
          />
        );

      case 'analytics':
        return <PersonasAnalyticsTemplate onViewChange={handleViewChange} personas={personas} />;

      case 'pain-editor':
        if (!selectedPersona) {
          handleViewChange('list');
          return null;
        }
        return (
          <PainPointEditor
            personaId={selectedPersona.id}
            personaName={selectedPersona.name}
            initialPainPoints={selectedPersona.painPoints.map((pp, i) => ({
              id: `pain-${i}`,
              superficial: pp.superficial,
              deep: pp.deep,
              relevance: 50, // Default relevance
            }))}
            onBack={() => handleViewChange('detail')}
            onSave={(painPoints) => {
              // TODO: Save pain points to database
              console.log('Save pain points:', painPoints);
              refetch();
              handleViewChange('detail');
            }}
          />
        );

      default:
        return <PersonasDashboard onViewChange={handleViewChange} stats={stats} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_PERSONAS} setSection={setSection} />

      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col p-6 md:p-12">
        {/* Navigation Pills */}
        <div className="mb-8 flex items-center gap-2 border-b border-border pb-4">
          <NavPill
            label="Dashboard"
            active={currentView === 'dashboard'}
            onClick={() => handleViewChange('dashboard')}
          />
          <NavPill
            label="Personas"
            active={currentView === 'list'}
            onClick={() => handleViewChange('list')}
          />
          <NavPill
            label="Analytics"
            active={currentView === 'analytics'}
            onClick={() => handleViewChange('analytics')}
          />
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

// Navigation Pill component
const NavPill: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
      active
        ? 'bg-studio-accent text-background'
        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    }`}
  >
    {label}
  </button>
);

export default PersonasTemplate;
