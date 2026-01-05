// Brief Structure UI Hook
// Manages UI state for the brief structure view

import { useState, useCallback } from 'react';
import type { BriefStructure } from '../types';
import { COMPLEXITY_LABELS } from '../types';

export function useBriefStructureUI() {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  const openPreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const closePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  // Format preview markdown
  const formatPreview = useCallback((structure: BriefStructure | null): string => {
    if (!structure) return '';
    return `# Brief do Projeto

## Problema
${structure.problem}

## Solucao
${structure.solution}

## Publico-Alvo
${structure.targetAudience}

## Diferenciais
${structure.differentials.map((d) => `- ${d}`).join('\n')}

## Riscos
${structure.risks.map((r) => `- ${r}`).join('\n')}

## Metricas de Sucesso
${structure.successMetrics.map((m) => `- ${m}`).join('\n')}

---
Classificacao: ${structure.classification === 'task' ? 'Tarefa Simples' : 'Projeto Completo'}
Complexidade: ${COMPLEXITY_LABELS[structure.estimatedComplexity].label}`;
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  return {
    showPreview,
    setShowPreview,
    togglePreview,
    openPreview,
    closePreview,
    formatPreview,
    copyToClipboard,
  };
}
