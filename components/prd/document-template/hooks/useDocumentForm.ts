// Document Form State Hook
// Manages form state for the PRD Document

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Requirement,
  TechStack,
  DesignState,
  DEFAULT_REQUIREMENTS,
  DEFAULT_TECH_STACK,
  DEFAULT_SCOPE_LIMITS,
} from '../types';

interface UseDocumentFormOptions {
  projectName?: string;
  briefData?: {
    superProblem?: string;
    solution?: string;
    structure?: {
      problem?: string;
      solution?: string;
    };
  };
  prdDocumentData?: {
    requirements?: Requirement[];
    techStack?: TechStack;
    scopeLimits?: string;
    screens?: string;
    vibe?: string;
  };
}

export interface UseDocumentFormReturn {
  // Design
  design: DesignState;
  setDesignField: (field: keyof DesignState, value: string) => void;

  // Requirements
  requirements: Requirement[];
  handleRequirementAction: (id: string, action: 'approve' | 'reject' | 'undo') => void;
  pendingCount: number;
  approvedCount: number;
  allCriticalReviewed: boolean;

  // Tech Stack
  techStack: TechStack;
  setTechStackField: (field: keyof TechStack, value: string) => void;
  scopeLimits: string;
  setScopeLimits: (value: string) => void;

  // Preview
  generatePreview: string;

  // Data for save
  getDocumentData: () => object;
}

export function useDocumentForm(options: UseDocumentFormOptions = {}): UseDocumentFormReturn {
  const { projectName, briefData, prdDocumentData } = options;

  // Design state
  const [design, setDesign] = useState<DesignState>({
    screens: '',
    vibe: '',
  });

  // Requirements state
  const [requirements, setRequirements] = useState<Requirement[]>(DEFAULT_REQUIREMENTS);

  // Tech stack state
  const [techStack, setTechStack] = useState<TechStack>(DEFAULT_TECH_STACK);
  const [scopeLimits, setScopeLimits] = useState(DEFAULT_SCOPE_LIMITS);

  // Initialize from project data
  useEffect(() => {
    if (prdDocumentData) {
      if (prdDocumentData.requirements) {
        setRequirements(prdDocumentData.requirements);
      }
      if (prdDocumentData.techStack) {
        setTechStack(prdDocumentData.techStack);
      }
      if (prdDocumentData.scopeLimits) {
        setScopeLimits(prdDocumentData.scopeLimits);
      }
      if (prdDocumentData.screens) {
        setDesign(prev => ({ ...prev, screens: prdDocumentData.screens || '' }));
      }
      if (prdDocumentData.vibe) {
        setDesign(prev => ({ ...prev, vibe: prdDocumentData.vibe || '' }));
      }
    }
  }, [prdDocumentData]);

  // Design handlers
  const setDesignField = useCallback((field: keyof DesignState, value: string) => {
    setDesign((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Requirements handlers
  const handleRequirementAction = useCallback(
    (id: string, action: 'approve' | 'reject' | 'undo') => {
      setRequirements((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                status:
                  action === 'undo' ? 'pending' : action === 'approve' ? 'approved' : 'rejected',
              }
            : req
        )
      );
    },
    []
  );

  // Computed
  const pendingCount = requirements.filter((r) => r.status === 'pending').length;
  const approvedCount = requirements.filter((r) => r.status === 'approved').length;
  const allCriticalReviewed = requirements
    .filter((r) => r.category === 'must')
    .every((r) => r.status !== 'pending');

  // Tech stack handlers
  const setTechStackField = useCallback((field: keyof TechStack, value: string) => {
    setTechStack((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Generate preview markdown
  const generatePreview = useMemo(() => {
    const problem = briefData?.superProblem || briefData?.structure?.problem || 'Nao definido';
    const solution = briefData?.solution || briefData?.structure?.solution || 'Nao definido';

    return `# Especificacao Tecnica: ${projectName || 'Projeto'}

**Status:** Draft | **Autor:** Alan Nicolas

---

## 1. Visao Geral
${problem}

## 2. Solucao
${solution}

## 3. Requisitos Funcionais
${
  requirements
    .filter((r) => r.status === 'approved')
    .map((r) => `- [x] ${r.text} (${r.category.toUpperCase()})`)
    .join('\n') || '- Nenhum aprovado ainda'
}

${requirements
  .filter((r) => r.status === 'pending')
  .map((r) => `- [ ] ${r.text}`)
  .join('\n')}

## 4. Stack Tecnologico
- **Frontend:** ${techStack.frontend}
- **Backend:** ${techStack.backend}
- **AI:** ${techStack.ai}
- **Hosting:** ${techStack.hosting}

## 5. Limites de Escopo
${scopeLimits}
`;
  }, [projectName, briefData, requirements, techStack, scopeLimits]);

  // Get data for save
  const getDocumentData = useCallback(() => {
    return {
      requirements,
      techStack,
      scopeLimits,
      screens: design.screens,
      vibe: design.vibe,
    };
  }, [requirements, techStack, scopeLimits, design]);

  return {
    design,
    setDesignField,
    requirements,
    handleRequirementAction,
    pendingCount,
    approvedCount,
    allCriticalReviewed,
    techStack,
    setTechStackField,
    scopeLimits,
    setScopeLimits,
    generatePreview,
    getDocumentData,
  };
}
