import React, { useState } from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import { Skeleton } from '../../../ui/skeleton';
import { cn } from '../../../../lib/utils';
import { PersonaCard } from '../ui';
import type { PersonasView } from '../personas-dashboard';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

interface PersonasListProps {
  onViewChange: (view: PersonasView) => void;
  onSelectPersona: (id: string) => void;
  personas: Persona[];
  loading?: boolean;
}

// Map Persona from hook to PersonaCard props
const mapPersonaToCard = (persona: Persona, index: number) => ({
  id: persona.id,
  name: persona.name,
  role: persona.demographics.role,
  icon: (persona.icon || 'user') as any,
  isIcp: persona.isIcp || index === 0,
  demographics: {
    location: persona.demographics.location,
    age: persona.demographics.age,
    income: persona.demographics.income,
  },
  definingQuote: persona.definingQuote,
  values: persona.psychographics.values,
  painPointsCount: persona.painPoints.length,
  desiresCount: persona.desires.length,
  consciousness: {
    level: 'Alta' as const,
    percentage: 75,
  },
});

export const PersonasList: React.FC<PersonasListProps> = ({
  onViewChange,
  onSelectPersona,
  personas,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersonas = personas.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.demographics.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight md:text-4xl">
            Minhas Personas
          </h1>
          <p className="text-base text-muted-foreground">
            Gerencie e visualize seus perfis de cliente ideal (ICP).
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onViewChange('create')} className="gap-2">
            <Icon name="cloud-upload" size="size-4" />
            Importar via IA
          </Button>
          <Button
            onClick={() => onViewChange('create')}
            className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20"
          >
            <Icon name="plus" size="size-4" />
            Nova Persona
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="group relative w-full md:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              name="search"
              size="size-4"
              className="text-muted-foreground transition-colors group-focus-within:text-studio-accent"
            />
          </div>
          <Input
            className="pl-10"
            placeholder="Buscar por nome, cargo ou segmento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
          {['Nível de Consciência', 'Canal Preferido', 'Faixa de Renda'].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 rounded-full"
            >
              {filter}
              <Icon name="angle-small-down" size="size-3" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 shrink-0 text-studio-accent"
            title="Limpar Filtros"
          >
            <Icon name="filter" size="size-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
              <Skeleton className="h-28 w-full" />
              <div className="space-y-4 p-5 pt-8">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Personas Grid */}
      {!loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPersonas.map((persona, index) => (
            <PersonaCard
              key={persona.id}
              {...mapPersonaToCard(persona, index)}
              onClick={() => onSelectPersona(persona.id)}
            />
          ))}

          {/* Create New Card */}
          <Button
            variant="ghost"
            onClick={() => onViewChange('create')}
            className={cn(
              'group flex h-auto min-h-[400px] flex-col items-center justify-center gap-4',
              'rounded-xl border border-dashed border-border/50',
              'transition-all duration-300 hover:border-studio-accent/50 hover:bg-studio-accent/5'
            )}
          >
            <div
              className={cn(
                'mb-2 flex size-16 items-center justify-center rounded-full',
                'bg-muted/30 text-muted-foreground',
                'transition-all group-hover:scale-110 group-hover:bg-studio-accent/20 group-hover:text-studio-accent'
              )}
            >
              <Icon name="plus" size="size-8" />
            </div>
            <span className="text-lg font-bold text-foreground group-hover:text-studio-accent">
              Criar Nova Persona
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              Adicione um novo perfil de cliente ideal
            </span>
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && personas.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted/30">
            <Icon name="users-alt" size="size-8" className="text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Nenhuma persona cadastrada</h3>
          <p className="mb-6 max-w-md text-sm text-muted-foreground">
            Crie sua primeira buyer persona para direcionar melhor seu conteúdo e ofertas.
          </p>
          <Button
            onClick={() => onViewChange('create')}
            className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20"
          >
            <Icon name="magic-wand" size="size-4" /> Criar Primeira Persona
          </Button>
        </div>
      )}

      {/* No Results */}
      {!loading && personas.length > 0 && filteredPersonas.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <Icon name="search" size="size-12" className="mb-4 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Nenhum resultado encontrado</h3>
          <p className="text-sm text-muted-foreground">
            Tente buscar por outro termo ou limpar os filtros.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonasList;
