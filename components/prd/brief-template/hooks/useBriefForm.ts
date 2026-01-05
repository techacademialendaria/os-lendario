// Brief Form State Hook
// Manages form state for the Brief Builder

import { useState, useEffect, useCallback } from 'react';
import { BriefFormState, MIN_CHARS_REQUIRED } from '../types';

interface UseBriefFormOptions {
  initialData?: {
    superProblem?: string;
    solution?: string;
    differentials?: string[];
    scopeIn?: string[];
    scopeOut?: Array<{ item: string }>;
    successMetrics?: Array<{ metric: string; target: string }>;
    structure?: {
      problem?: string;
      solution?: string;
      classification?: 'task' | 'project';
    };
  };
}

export interface UseBriefFormReturn {
  form: BriefFormState;
  setField: (field: keyof BriefFormState, value: string) => void;
  isValid: boolean;
  generateMarkdown: () => string;
  getBriefData: () => object;
}

export function useBriefForm(options: UseBriefFormOptions = {}): UseBriefFormReturn {
  const { initialData } = options;

  const [form, setForm] = useState<BriefFormState>({
    problem: '',
    solution: '',
    differentials: '',
    scopeIn: '',
    scopeOut: '',
    metrics: '',
  });

  // Initialize from project data
  useEffect(() => {
    if (initialData) {
      setForm({
        problem: initialData.superProblem || initialData.structure?.problem || '',
        solution: initialData.solution || initialData.structure?.solution || '',
        differentials: initialData.differentials?.join('\n') || '',
        scopeIn: initialData.scopeIn?.join('\n') || '',
        scopeOut: initialData.scopeOut?.map((s) => s.item).join('\n') || '',
        metrics: initialData.successMetrics?.map((m) => `${m.metric}: ${m.target}`).join('\n') || '',
      });
    }
  }, [initialData]);

  const setField = useCallback((field: keyof BriefFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const isValid = form.problem.length >= MIN_CHARS_REQUIRED && form.solution.length >= MIN_CHARS_REQUIRED;

  const generateMarkdown = useCallback(() => {
    return `# Project Brief

## Problema
${form.problem || '_Não definido_'}

## Solução Proposta
${form.solution || '_Não definido_'}

## Diferenciais
${form.differentials || '_Não definido_'}

## Escopo (In)
${form.scopeIn || '_Não definido_'}

## Escopo (Out)
${form.scopeOut || '_Não definido_'}

## Métricas de Sucesso
${form.metrics || '_Não definido_'}
`;
  }, [form]);

  const getBriefData = useCallback(() => {
    return {
      superProblem: form.problem,
      solution: form.solution,
      differentials: form.differentials.split('\n').filter(Boolean),
      scopeIn: form.scopeIn.split('\n').filter(Boolean),
      scopeOut: form.scopeOut
        .split('\n')
        .filter(Boolean)
        .map((item) => ({ item, reason: '' })),
      successMetrics: form.metrics
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const [metric, target] = line.split(':').map((s) => s.trim());
          return { metric: metric || line, definition: '', target: target || '' };
        }),
      structure: {
        problem: form.problem,
        solution: form.solution,
        targetAudience: '',
        differentials: form.differentials.split('\n').filter(Boolean),
        risks: [],
        successMetrics: [],
        classification: 'project' as const,
        estimatedComplexity: 'medium' as const,
      },
    };
  }, [form]);

  return {
    form,
    setField,
    isValid,
    generateMarkdown,
    getBriefData,
  };
}
