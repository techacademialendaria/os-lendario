import { useState, useCallback, useMemo } from 'react';
import { usePRDAI } from '../../../../../hooks/prd/usePRDAI';
import {
  Requirement,
  RequirementsContent,
  RequirementType,
  ApprovalStatus,
  TYPE_CONFIG,
  EMPTY_CONTENT,
  REQUIREMENTS_SYSTEM,
  REQUIREMENTS_PROMPT,
} from '../types';

// =============================================================================
// REQUIREMENTS DATA HOOK
// =============================================================================

interface UseRequirementsDataProps {
  initialContent: RequirementsContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: RequirementsContent) => Promise<void>;
}

interface UseRequirementsDataReturn {
  requirements: RequirementsContent;
  isGenerating: boolean;
  hasContent: boolean;
  generate: () => Promise<void>;
  updateRequirement: (index: number, req: Requirement) => Promise<void>;
  deleteRequirement: (id: string) => Promise<void>;
  addRequirement: (type: RequirementType) => Promise<void>;
}

export function useRequirementsData({
  initialContent,
  briefProblem,
  briefSolution,
  onUpdate,
}: UseRequirementsDataProps): UseRequirementsDataReturn {
  const { generate: aiGenerate, isGenerating } = usePRDAI();
  const [requirements, setRequirements] = useState<RequirementsContent>(
    initialContent || EMPTY_CONTENT
  );

  const hasContent = requirements.requirements.length > 0;

  const generate = useCallback(async () => {
    try {
      const prompt = REQUIREMENTS_PROMPT.replace('{problem}', briefProblem).replace(
        '{solution}',
        briefSolution
      );

      const result = await aiGenerate(prompt, {
        systemPrompt: REQUIREMENTS_SYSTEM,
        temperature: 0.7,
      });

      let parsed: { requirements: Omit<Requirement, 'id' | 'code' | 'status'>[] };
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        else throw new Error('No JSON');
      } catch {
        return;
      }

      const counters = { functional: 1, non_functional: 1, constraint: 1 };
      const withIds: Requirement[] = parsed.requirements.map((r) => {
        const type = r.type as RequirementType;
        const prefix = TYPE_CONFIG[type].prefix;
        const code = `${prefix}${String(counters[type]++).padStart(3, '0')}`;
        return {
          ...r,
          id: `req-${Date.now()}-${code}`,
          code,
          status: 'pending' as ApprovalStatus,
        };
      });

      const updated = { ...requirements, requirements: withIds };
      setRequirements(updated);
      await onUpdate(updated);
    } catch (err) {
      console.error('Failed to generate requirements:', err);
    }
  }, [briefProblem, briefSolution, aiGenerate, requirements, onUpdate]);

  const updateRequirement = useCallback(
    async (index: number, req: Requirement) => {
      const realIndex = requirements.requirements.findIndex((r) => r.id === req.id);
      if (realIndex === -1) return;

      const updated = {
        ...requirements,
        requirements: requirements.requirements.map((r, i) => (i === realIndex ? req : r)),
      };
      setRequirements(updated);
      await onUpdate(updated);
    },
    [requirements, onUpdate]
  );

  const deleteRequirement = useCallback(
    async (id: string) => {
      const updated = {
        ...requirements,
        requirements: requirements.requirements.filter((r) => r.id !== id),
      };
      setRequirements(updated);
      await onUpdate(updated);
    },
    [requirements, onUpdate]
  );

  const addRequirement = useCallback(
    async (type: RequirementType) => {
      const prefix = TYPE_CONFIG[type].prefix;
      const existingCodes = requirements.requirements.filter((r) => r.type === type).length;
      const code = `${prefix}${String(existingCodes + 1).padStart(3, '0')}`;

      const newReq: Requirement = {
        id: `req-${Date.now()}`,
        code,
        description: '',
        type,
        priority: 'should',
        status: 'pending',
      };

      const updated = { ...requirements, requirements: [...requirements.requirements, newReq] };
      setRequirements(updated);
      await onUpdate(updated);
    },
    [requirements, onUpdate]
  );

  return {
    requirements,
    isGenerating,
    hasContent,
    generate,
    updateRequirement,
    deleteRequirement,
    addRequirement,
  };
}

// =============================================================================
// REQUIREMENTS FILTER HOOK
// =============================================================================

interface UseRequirementsFilterProps {
  requirements: Requirement[];
}

interface UseRequirementsFilterReturn {
  activeTab: RequirementType;
  setActiveTab: (tab: RequirementType) => void;
  filterPriority: 'all' | 'must' | 'should' | 'could';
  setFilterPriority: (priority: 'all' | 'must' | 'should' | 'could') => void;
  filteredRequirements: Requirement[];
  counts: Record<RequirementType, number>;
}

export function useRequirementsFilter({
  requirements,
}: UseRequirementsFilterProps): UseRequirementsFilterReturn {
  const [activeTab, setActiveTab] = useState<RequirementType>('functional');
  const [filterPriority, setFilterPriority] = useState<'all' | 'must' | 'should' | 'could'>('all');

  const filteredRequirements = useMemo(() => {
    return requirements.filter((r) => {
      if (r.type !== activeTab) return false;
      if (filterPriority !== 'all' && r.priority !== filterPriority) return false;
      return true;
    });
  }, [requirements, activeTab, filterPriority]);

  const counts = useMemo(() => {
    const c: Record<RequirementType, number> = { functional: 0, non_functional: 0, constraint: 0 };
    requirements.forEach((r) => c[r.type]++);
    return c;
  }, [requirements]);

  return {
    activeTab,
    setActiveTab,
    filterPriority,
    setFilterPriority,
    filteredRequirements,
    counts,
  };
}
