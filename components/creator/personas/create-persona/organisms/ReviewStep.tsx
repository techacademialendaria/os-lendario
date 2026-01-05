import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ReviewProfileCard } from './ReviewProfileCard';
import { DemographicsCard } from './DemographicsCard';
import { PsychographicsCard } from './PsychographicsCard';
import { PainPointsCard } from './PainPointsCard';
import { DesiresCard } from './DesiresCard';
import { FlagsCard } from './FlagsCard';
import { IconSelectorCard } from './IconSelectorCard';
import type { ReviewStepProps } from '../types';

/**
 * Review step for editing and confirming the generated persona
 */
export const ReviewStep: React.FC<ReviewStepProps> = ({
  persona,
  onEditField,
  onSave,
  onRegenerate,
  onCancel,
}) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in space-y-6">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">Revisar Persona</h1>
        <p className="text-lg font-medium text-studio-primary/70">
          Confira os dados e edite se necessario antes de salvar.
        </p>
      </div>

      {/* Header Profile Card */}
      <ReviewProfileCard persona={persona} onEditField={onEditField} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Demographics */}
        <DemographicsCard demographics={persona.demographics} onEditField={onEditField} />

        {/* Psychographics */}
        <PsychographicsCard psychographics={persona.psychographics} onEditField={onEditField} />

        {/* Pain Points */}
        <PainPointsCard painPoints={persona.painPoints} />

        {/* Desires */}
        <DesiresCard desires={persona.desires} />

        {/* Flags */}
        <FlagsCard redFlags={persona.redFlags} greenFlags={persona.greenFlags} />
      </div>

      {/* Icon Selector */}
      <IconSelectorCard
        selectedIcon={persona.icon}
        onSelectIcon={(icon) => onEditField('icon', icon)}
      />

      {/* Actions */}
      <div className="flex items-center justify-between pb-10 pt-4">
        <Button
          variant="ghost"
          onClick={onRegenerate}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="refresh" size="size-4" />
          Gerar Novamente
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className="gap-2 bg-studio-accent text-studio-bg shadow-lg hover:opacity-90"
          >
            <Icon name="check" size="size-4" />
            Salvar Persona
          </Button>
        </div>
      </div>
    </div>
  );
};
