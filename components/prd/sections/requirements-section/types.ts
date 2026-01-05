// =============================================================================
// REQUIREMENTS SECTION TYPES
// =============================================================================

export type RequirementType = 'functional' | 'non_functional' | 'constraint';
export type RequirementPriority = 'must' | 'should' | 'could';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Requirement {
  id: string;
  code: string;
  description: string;
  type: RequirementType;
  priority: RequirementPriority;
  status: ApprovalStatus;
}

export interface RequirementsContent {
  requirements: Requirement[];
  notes?: string;
}

export interface RequirementsSectionProps {
  content: RequirementsContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: RequirementsContent) => Promise<void>;
}

export interface RequirementRowProps {
  requirement: Requirement;
  onUpdate: (req: Requirement) => void;
  onDelete: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const TYPE_CONFIG: Record<RequirementType, { label: string; prefix: string; color: string }> = {
  functional: { label: 'Funcionais', prefix: 'RF', color: '#3B82F6' },
  non_functional: { label: 'Nao-Funcionais', prefix: 'RNF', color: '#8B5CF6' },
  constraint: { label: 'Restricoes', prefix: 'RES', color: '#F59E0B' },
};

export const PRIORITY_CONFIG: Record<
  RequirementPriority,
  { label: string; color: string; bgColor: string }
> = {
  must: { label: 'Must', color: 'text-red-500', bgColor: 'bg-red-500/10' },
  should: { label: 'Should', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  could: { label: 'Could', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
};

export const EMPTY_CONTENT: RequirementsContent = { requirements: [], notes: '' };

// =============================================================================
// PROMPTS
// =============================================================================

export const REQUIREMENTS_SYSTEM = `Voce e um analista de requisitos experiente.
Escreva requisitos claros, testaveis e priorizados usando MoSCoW (Must/Should/Could).`;

export const REQUIREMENTS_PROMPT = `Baseado no problema e solucao, gere requisitos:

PROBLEMA: {problem}
SOLUCAO: {solution}

Responda em JSON:
{
  "requirements": [
    { "description": "O sistema deve...", "type": "functional", "priority": "must" },
    { "description": "O sistema deve suportar...", "type": "non_functional", "priority": "should" }
  ]
}

Gere 8-12 requisitos balanceados entre funcionais (5-7), nao-funcionais (2-3) e restricoes (1-2).`;
