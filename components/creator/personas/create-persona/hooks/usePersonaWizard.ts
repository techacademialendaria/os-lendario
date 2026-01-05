import { useState, useCallback } from 'react';
import type { WizardStep, PersonaData } from '../types';

/**
 * Hook for managing the persona creation wizard state
 */
export function usePersonaWizard() {
  const [step, setStep] = useState<WizardStep>('input');
  const [inputText, setInputText] = useState('');
  const [generatedPersona, setGeneratedPersona] = useState<PersonaData | null>(null);

  const goToStep = useCallback((newStep: WizardStep) => {
    setStep(newStep);
  }, []);

  const resetWizard = useCallback(() => {
    setStep('input');
    setInputText('');
    setGeneratedPersona(null);
  }, []);

  const getStepNumber = useCallback((): number => {
    switch (step) {
      case 'input':
        return 1;
      case 'processing':
        return 2;
      case 'review':
        return 3;
      default:
        return 1;
    }
  }, [step]);

  const handleEditField = useCallback((path: string, value: unknown) => {
    setGeneratedPersona((prev) => {
      if (!prev) return null;

      const keys = path.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      } else if (keys.length === 2) {
        const parentKey = keys[0] as keyof PersonaData;
        const parentValue = prev[parentKey];
        if (typeof parentValue === 'object' && parentValue !== null && !Array.isArray(parentValue)) {
          return {
            ...prev,
            [keys[0]]: {
              ...parentValue,
              [keys[1]]: value,
            },
          };
        }
      }
      return prev;
    });
  }, []);

  return {
    // State
    step,
    inputText,
    generatedPersona,
    currentStepNumber: getStepNumber(),

    // Setters
    setInputText,
    setGeneratedPersona,

    // Actions
    goToStep,
    resetWizard,
    handleEditField,
  };
}
