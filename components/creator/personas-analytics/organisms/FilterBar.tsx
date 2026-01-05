import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { Persona } from '@/hooks/useAudienceProfiles';
import type { SelectedPersona, PersonaColorInfo } from '../types';
import { PERIOD_OPTIONS } from '../data';

interface FilterBarProps {
  selectedPersonas: SelectedPersona[];
  personas: Persona[];
  showPersonaSelector: boolean;
  period: string;
  onToggleSelector: () => void;
  onRemovePersona: (id: string) => void;
  onTogglePersona: (persona: Persona) => void;
  onPeriodChange: (period: string) => void;
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedPersonas,
  personas,
  showPersonaSelector,
  period,
  onToggleSelector,
  onRemovePersona,
  onTogglePersona,
  onPeriodChange,
  getPersonaColor,
}) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'p-4')}>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Persona Selector */}
        <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
          <span className="whitespace-nowrap text-sm font-bold text-foreground">
            Selecionar Personas:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {selectedPersonas.map((sp, index) => {
              const colorInfo = getPersonaColor(index);
              return (
                <div
                  key={sp.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-colors',
                    colorInfo.bgLight,
                    colorInfo.border,
                    'border'
                  )}
                >
                  <div className={cn('size-2 rounded-full', colorInfo.bg)} />
                  <span className="text-sm font-bold text-foreground">{sp.name}</span>
                  <button
                    onClick={() => onRemovePersona(sp.id)}
                    className="text-muted-foreground transition-colors hover:text-red-400"
                  >
                    <Icon name="xmark" size="size-4" />
                  </button>
                </div>
              );
            })}
            <div className="relative">
              <button
                onClick={onToggleSelector}
                className="ml-1 flex size-8 items-center justify-center rounded-full border border-dashed border-muted-foreground/50 text-muted-foreground transition-colors hover:border-studio-accent hover:text-studio-accent"
              >
                <Icon name="plus" size="size-4" />
              </button>
              {/* Dropdown */}
              {showPersonaSelector && (
                <div className="absolute left-0 top-10 z-50 min-w-[200px] rounded-lg border border-border bg-card p-2 shadow-xl">
                  <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Adicionar Persona
                  </div>
                  {personas
                    .filter((p) => !selectedPersonas.find((sp) => sp.id === p.id))
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onTogglePersona(p);
                          onToggleSelector();
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                      >
                        <Icon
                          name={p.icon as any}
                          size="size-4"
                          className="text-muted-foreground"
                        />
                        {p.name}
                      </button>
                    ))}
                  {personas.filter((p) => !selectedPersonas.find((sp) => sp.id === p.id)).length ===
                    0 && (
                    <p className="px-2 py-1.5 text-sm text-muted-foreground">
                      Todas as personas selecionadas
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Period Filter */}
        <div className="flex w-full items-center justify-end gap-3 md:w-auto">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Periodo:
          </span>
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-studio-accent"
          >
            {PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};
