import React, { useState, useCallback, useMemo } from 'react';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
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

interface RequirementsSectionProps {
  content: RequirementsContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: RequirementsContent) => Promise<void>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const TYPE_CONFIG: Record<RequirementType, { label: string; prefix: string; color: string }> = {
  functional: { label: 'Funcionais', prefix: 'RF', color: '#3B82F6' },
  non_functional: { label: 'Não-Funcionais', prefix: 'RNF', color: '#8B5CF6' },
  constraint: { label: 'Restrições', prefix: 'RES', color: '#F59E0B' },
};

const PRIORITY_CONFIG: Record<
  RequirementPriority,
  { label: string; color: string; bgColor: string }
> = {
  must: { label: 'Must', color: 'text-red-500', bgColor: 'bg-red-500/10' },
  should: { label: 'Should', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  could: { label: 'Could', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
};

const EMPTY_CONTENT: RequirementsContent = { requirements: [], notes: '' };

// =============================================================================
// PROMPTS
// =============================================================================

const REQUIREMENTS_SYSTEM = `Você é um analista de requisitos experiente.
Escreva requisitos claros, testáveis e priorizados usando MoSCoW (Must/Should/Could).`;

const REQUIREMENTS_PROMPT = `Baseado no problema e solução, gere requisitos:

PROBLEMA: {problem}
SOLUÇÃO: {solution}

Responda em JSON:
{
  "requirements": [
    { "description": "O sistema deve...", "type": "functional", "priority": "must" },
    { "description": "O sistema deve suportar...", "type": "non_functional", "priority": "should" }
  ]
}

Gere 8-12 requisitos balanceados entre funcionais (5-7), não-funcionais (2-3) e restrições (1-2).`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const RequirementRow: React.FC<{
  requirement: Requirement;
  onUpdate: (req: Requirement) => void;
  onDelete: () => void;
}> = ({ requirement, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(requirement.description);

  const typeConfig = TYPE_CONFIG[requirement.type];
  const priorityConfig = PRIORITY_CONFIG[requirement.priority];

  const handleSave = () => {
    onUpdate({ ...requirement, description: editDesc });
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-3 transition-all',
        requirement.status === 'approved' && 'border-emerald-500/30 bg-emerald-500/5',
        requirement.status === 'rejected' && 'border-red-500/30 bg-red-500/5'
      )}
    >
      {/* Code */}
      <Badge
        variant="outline"
        className="shrink-0 font-mono text-xs"
        style={{ borderColor: typeConfig.color, color: typeConfig.color }}
      >
        {requirement.code}
      </Badge>

      {/* Description */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleSave}>
              Salvar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <p
            className="cursor-pointer text-sm hover:text-primary"
            onClick={() => setIsEditing(true)}
          >
            {requirement.description}
          </p>
        )}
      </div>

      {/* Priority */}
      <Badge className={cn('shrink-0 text-xs', priorityConfig.bgColor, priorityConfig.color)}>
        {priorityConfig.label}
      </Badge>

      {/* Actions */}
      {!isEditing && (
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant={requirement.status === 'approved' ? 'default' : 'ghost'}
            size="icon"
            className={cn('h-7 w-7', requirement.status === 'approved' && 'bg-emerald-600')}
            onClick={() =>
              onUpdate({
                ...requirement,
                status: requirement.status === 'approved' ? 'pending' : 'approved',
              })
            }
          >
            <Icon name="check" size="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Icon name="trash" size="size-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  content,
  briefProblem,
  briefSolution,
  onUpdate,
}) => {
  const { generate, isGenerating } = usePRDAI();
  const [requirements, setRequirements] = useState<RequirementsContent>(content || EMPTY_CONTENT);
  const [activeTab, setActiveTab] = useState<RequirementType>('functional');
  const [filterPriority, setFilterPriority] = useState<RequirementPriority | 'all'>('all');

  // Filter requirements
  const filteredRequirements = useMemo(() => {
    return requirements.requirements.filter((r) => {
      if (r.type !== activeTab) return false;
      if (filterPriority !== 'all' && r.priority !== filterPriority) return false;
      return true;
    });
  }, [requirements.requirements, activeTab, filterPriority]);

  // Counts
  const counts = useMemo(() => {
    const c: Record<RequirementType, number> = { functional: 0, non_functional: 0, constraint: 0 };
    requirements.requirements.forEach((r) => c[r.type]++);
    return c;
  }, [requirements.requirements]);

  const handleGenerate = useCallback(async () => {
    try {
      const prompt = REQUIREMENTS_PROMPT.replace('{problem}', briefProblem).replace(
        '{solution}',
        briefSolution
      );

      const result = await generate(prompt, {
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
  }, [briefProblem, briefSolution, generate, requirements, onUpdate]);

  const handleUpdateRequirement = useCallback(
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

  const handleDeleteRequirement = useCallback(
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

  const handleAddRequirement = useCallback(async () => {
    const prefix = TYPE_CONFIG[activeTab].prefix;
    const existingCodes = requirements.requirements.filter((r) => r.type === activeTab).length;
    const code = `${prefix}${String(existingCodes + 1).padStart(3, '0')}`;

    const newReq: Requirement = {
      id: `req-${Date.now()}`,
      code,
      description: '',
      type: activeTab,
      priority: 'should',
      status: 'pending',
    };

    const updated = { ...requirements, requirements: [...requirements.requirements, newReq] };
    setRequirements(updated);
    await onUpdate(updated);
  }, [activeTab, requirements, onUpdate]);

  const hasContent = requirements.requirements.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Icon name="check-square" className="text-studio-primary" />
            Requisitos
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Requisitos funcionais, não-funcionais e restrições
          </p>
        </div>
        {hasContent && (
          <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
            <Icon name="refresh" className="mr-1.5 size-4" />
            Regenerar
          </Button>
        )}
      </div>

      {!hasContent && !isGenerating && (
        <Card className="p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-studio-primary/20">
            <Icon name="check-square" size="size-6" className="text-studio-primary" />
          </div>
          <h4 className="mb-2 font-bold">Gerar Requisitos</h4>
          <p className="mb-4 text-sm text-muted-foreground">
            A IA vai criar requisitos baseados no brief
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Gerar Requisitos
          </Button>
        </Card>
      )}

      {isGenerating && !hasContent && (
        <Card className="p-8 text-center">
          <Icon name="refresh" className="mx-auto mb-3 size-8 animate-spin text-studio-primary" />
          <p className="text-sm text-muted-foreground">Gerando requisitos...</p>
        </Card>
      )}

      {hasContent && (
        <>
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b pb-2">
            {(Object.keys(TYPE_CONFIG) as RequirementType[]).map((type) => {
              const config = TYPE_CONFIG[type];
              return (
                <Button
                  key={type}
                  variant={activeTab === type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(type)}
                  style={activeTab === type ? { backgroundColor: config.color } : undefined}
                >
                  {config.label}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {counts[type]}
                  </Badge>
                </Button>
              );
            })}

            <div className="ml-auto flex gap-1">
              {(['all', 'must', 'should', 'could'] as const).map((p) => (
                <Button
                  key={p}
                  variant={filterPriority === p ? 'secondary' : 'ghost'}
                  size="sm"
                  className="text-xs"
                  onClick={() => setFilterPriority(p)}
                >
                  {p === 'all' ? 'Todos' : PRIORITY_CONFIG[p].label}
                </Button>
              ))}
            </div>
          </div>

          {/* Requirements List */}
          <div className="space-y-2">
            {filteredRequirements.map((req, index) => (
              <RequirementRow
                key={req.id}
                requirement={req}
                onUpdate={(r) => handleUpdateRequirement(index, r)}
                onDelete={() => handleDeleteRequirement(req.id)}
              />
            ))}

            {filteredRequirements.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhum requisito nesta categoria
              </p>
            )}
          </div>

          {/* Add Button */}
          <Button variant="outline" size="sm" onClick={handleAddRequirement}>
            <Icon name="plus" className="mr-1.5 size-4" />
            Adicionar {TYPE_CONFIG[activeTab].label.slice(0, -1)}
          </Button>
        </>
      )}
    </div>
  );
};

export default RequirementsSection;
