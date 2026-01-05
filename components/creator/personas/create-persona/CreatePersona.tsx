import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { WizardStep } from './molecules';
import { InputStep, ProcessingStep, ReviewStep } from './organisms';
import { usePersonaWizard, usePersonaGeneration } from './hooks';
import type { CreatePersonaProps } from './types';

/**
 * CreatePersona - Orchestrator for the persona creation wizard
 * Coordinates the 3-step wizard flow: Input -> Processing -> Review
 */
export const CreatePersona: React.FC<CreatePersonaProps> = ({ onCancel, onSave }) => {
  const wizard = usePersonaWizard();
  const { generatePersona } = usePersonaGeneration({
    inputText: wizard.inputText,
    setGeneratedPersona: wizard.setGeneratedPersona,
    goToStep: wizard.goToStep,
  });

  const handleSave = () => {
    if (wizard.generatedPersona) {
      onSave(wizard.generatedPersona);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/50 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-studio-primary/10 text-studio-primary">
            <Icon name="user" size="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Persona Studio</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <Icon name="cross" size="size-5" />
        </Button>
      </header>

      {/* Main */}
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-start px-4 py-8 md:py-12">
        {/* Stepper */}
        <div className="mb-12 w-full max-w-4xl">
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute left-0 top-5 -z-10 h-0.5 w-full rounded-full bg-border" />
            <div
              className="absolute left-0 top-5 -z-10 h-0.5 rounded-full bg-studio-primary transition-all duration-500"
              style={{ width: `${((wizard.currentStepNumber - 1) / 2) * 100}%` }}
            />
            <WizardStep number="1" label="Descrever" active={wizard.step === 'input'} completed={wizard.currentStepNumber > 1} />
            <WizardStep number="2" label="Processar" active={wizard.step === 'processing'} completed={wizard.currentStepNumber > 2} />
            <WizardStep number="3" label="Revisar" active={wizard.step === 'review'} completed={false} />
          </div>
        </div>

        {/* Step Content */}
        {wizard.step === 'input' && (
          <InputStep
            inputText={wizard.inputText}
            onInputChange={wizard.setInputText}
            onGenerate={generatePersona}
            onCancel={onCancel}
            isGenerating={false}
          />
        )}

        {wizard.step === 'processing' && <ProcessingStep />}

        {wizard.step === 'review' && wizard.generatedPersona && (
          <ReviewStep
            persona={wizard.generatedPersona}
            onEditField={wizard.handleEditField}
            onSave={handleSave}
            onRegenerate={() => wizard.goToStep('input')}
            onCancel={onCancel}
          />
        )}
      </main>
    </div>
  );
};

export default CreatePersona;
