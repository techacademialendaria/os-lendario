import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  PersonaBase,
  PersonaPsychographics,
  PersonaAdvancedPsychographics,
  PersonaThemes,
  PersonaSegments,
} from '../details';
import type { PersonasView } from '../personas-dashboard';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export type PersonaDetailTab = 'base' | 'psycho' | 'advanced' | 'themes' | 'segments';

export interface PersonaDetailProps {
  persona: Persona;
  activeTab: PersonaDetailTab;
  onTabChange: (tab: PersonaDetailTab) => void;
  onViewChange: (view: PersonasView) => void;
}

export const PersonaDetail: React.FC<PersonaDetailProps> = ({
  persona,
  activeTab,
  onTabChange,
  onViewChange,
}) => {
  // Calculate time since last update
  const getTimeSinceUpdate = () => {
    if (!persona.updatedAt) return 'Nunca';
    const now = new Date();
    const updated = new Date(persona.updatedAt);
    const diffHours = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Agora mesmo';
    if (diffHours < 24) return `Ha ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Ha ${diffDays}d`;
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      {/* Top Gradient */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-64 bg-gradient-to-b from-studio-accent/5 to-transparent" />

      <div className="scrollbar-hide z-10 flex-1 overflow-y-auto p-8">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Header Section */}
          <div className="mb-6">
            <button
              onClick={() => onViewChange('list')}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-studio-accent"
            >
              <Icon
                name="arrow-left"
                size="size-5"
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Voltar</span>
            </button>
          </div>

          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {persona.isIcp && (
                  <Badge className="border-studio-accent/20 bg-studio-accent/20 text-xs font-bold uppercase tracking-wider text-studio-accent">
                    Principal
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Icon name="clock" size="size-3" />
                  Atualizado {getTimeSinceUpdate()}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                {persona.name}
              </h1>
              <p className="text-lg text-studio-accent/70">
                {persona.description || persona.demographics.role}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => onViewChange('pain-editor')}
                variant="outline"
                className="h-10 gap-2 border-border bg-card px-4 font-bold text-foreground hover:bg-muted/20"
              >
                <Icon name="edit" size="size-5" />
                <span>Editar Dores</span>
              </Button>
              <Button className="h-10 gap-2 bg-studio-accent px-6 font-bold text-background shadow-[0_0_15px_-3px_rgba(242,208,13,0.3)] hover:bg-studio-accent/90">
                <Icon name="edit" size="size-5" />
                <span>Editar Persona</span>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-border">
            <div className="no-scrollbar flex gap-8 overflow-x-auto pb-px">
              <TabItem
                label="Perfil Base"
                id="base"
                active={activeTab === 'base'}
                onClick={() => onTabChange('base')}
              />
              <TabItem
                label="Psicografia"
                id="psycho"
                active={activeTab === 'psycho'}
                onClick={() => onTabChange('psycho')}
              />
              <TabItem
                label="Temas & Interesses"
                id="themes"
                active={activeTab === 'themes'}
                onClick={() => onTabChange('themes')}
              />
              <TabItem
                label="Segmentacoes"
                id="segments"
                active={activeTab === 'segments'}
                onClick={() => onTabChange('segments')}
                count={String(persona.painPoints.length + persona.desires.length)}
              />
              {/* Featured Tab */}
              <button
                onClick={() => onTabChange('advanced')}
                className={cn(
                  'relative flex min-w-max items-center gap-2 border-b-2 pb-4 text-sm tracking-wide transition-all',
                  activeTab === 'advanced'
                    ? 'border-studio-accent font-bold text-foreground'
                    : 'border-transparent font-bold text-studio-accent/70 hover:border-studio-accent/30 hover:text-studio-accent'
                )}
              >
                <Icon name="brain" size="size-4" />
                Psicografia Avancada
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'base' && <PersonaBase persona={persona} />}
          {activeTab === 'psycho' && (
            <PersonaPsychographics
              persona={persona}
              onViewChange={(v) => onViewChange(v as PersonasView)}
            />
          )}
          {activeTab === 'advanced' && <PersonaAdvancedPsychographics persona={persona} />}
          {activeTab === 'themes' && <PersonaThemes persona={persona} />}
          {activeTab === 'segments' && (
            <PersonaSegments
              persona={persona}
              onViewChange={(v) => onViewChange(v as PersonasView)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface TabItemProps {
  label: string;
  id: string;
  active: boolean;
  count?: string;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'relative flex min-w-max items-center gap-2 border-b-2 pb-4 text-sm tracking-wide transition-all',
      active
        ? 'border-studio-accent font-bold text-studio-accent'
        : 'border-transparent font-medium text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
    )}
  >
    {label}
    {count && (
      <span
        className={cn(
          'rounded border px-1.5 py-0.5 text-[10px]',
          active
            ? 'border-border bg-card text-studio-accent'
            : 'border-border bg-card text-muted-foreground'
        )}
      >
        {count}
      </span>
    )}
  </button>
);

export default PersonaDetail;
