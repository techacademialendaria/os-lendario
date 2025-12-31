import React, { useState, useCallback } from 'react';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export interface ObjectivesContent {
  mainObjective: string;
  secondaryObjectives: string[];
  nonObjectives: string[];
  notes?: string;
}

type ApprovalStatus = 'pending' | 'approved' | 'adjust' | 'rejected';

interface ObjectiveItem {
  id: string;
  text: string;
  status: ApprovalStatus;
}

interface ObjectivesSectionProps {
  content: ObjectivesContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: ObjectivesContent) => Promise<void>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const APPROVAL_CONFIG: Record<
  ApprovalStatus,
  { label: string; icon: string; color: string; bgColor: string }
> = {
  pending: {
    label: 'Pendente',
    icon: 'clock',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  approved: {
    label: 'Aprovado',
    icon: 'check',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  adjust: { label: 'Ajustar', icon: 'edit', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  rejected: { label: 'Rejeitado', icon: 'cross', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

const EMPTY_CONTENT: ObjectivesContent = {
  mainObjective: '',
  secondaryObjectives: [],
  nonObjectives: [],
  notes: '',
};

// =============================================================================
// PROMPTS
// =============================================================================

const OBJECTIVES_SYSTEM = `Você é um product manager experiente definindo objetivos claros e mensuráveis.
Objetivos devem ser SMART: Específicos, Mensuráveis, Alcançáveis, Relevantes e com Prazo definido.`;

const OBJECTIVES_PROMPT = `Baseado no seguinte problema e solução, defina os objetivos do projeto:

PROBLEMA:
{problem}

SOLUÇÃO:
{solution}

Responda em JSON:
{
  "mainObjective": "Objetivo principal claro e mensurável",
  "secondaryObjectives": ["Objetivo secundário 1", "Objetivo secundário 2", "Objetivo secundário 3"],
  "nonObjectives": ["O que NÃO é objetivo deste projeto 1", "O que NÃO é objetivo 2"]
}`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const ObjectiveItemCard: React.FC<{
  item: ObjectiveItem;
  type: 'main' | 'secondary' | 'non';
  onUpdate: (text: string) => void;
  onStatusChange: (status: ApprovalStatus) => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}> = ({ item, type, onUpdate, onStatusChange, onDelete, onRegenerate, isRegenerating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const statusConfig = APPROVAL_CONFIG[item.status];

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText.trim());
      setIsEditing(false);
    }
  };

  const typeConfig = {
    main: { label: 'Principal', color: PRD_PRIMARY, icon: 'bullseye' },
    secondary: { label: 'Secundário', color: '#3B82F6', icon: 'target' },
    non: { label: 'Não-Objetivo', color: '#6B7280', icon: 'ban' },
  };

  const config = typeConfig[type];

  return (
    <Card
      className={cn('p-4 transition-all', statusConfig.bgColor, 'border-l-4')}
      style={{ borderLeftColor: config.color }}
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon name={config.icon} size="size-4" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {type === 'main' && (
            <Badge
              variant="outline"
              className="mb-2 text-[10px]"
              style={{ borderColor: config.color, color: config.color }}
            >
              {config.label}
            </Badge>
          )}

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditText(item.text);
                    setIsEditing(false);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <p
              className="cursor-pointer text-sm transition-colors hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              {item.text || (
                <span className="italic text-muted-foreground">Clique para editar...</span>
              )}
            </p>
          )}

          {/* Status & Actions */}
          {!isEditing && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {/* Approval Buttons */}
              <div className="flex gap-1">
                {(['approved', 'adjust', 'rejected'] as ApprovalStatus[]).map((status) => {
                  const cfg = APPROVAL_CONFIG[status];
                  const isActive = item.status === status;
                  return (
                    <Button
                      key={status}
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={cn('h-7 px-2', isActive && cfg.bgColor, isActive && cfg.color)}
                      onClick={() => onStatusChange(status)}
                    >
                      <Icon name={cfg.icon} size="size-3" className="mr-1" />
                      <span className="text-xs">{cfg.label}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="ml-auto flex gap-1">
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground"
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                  >
                    <Icon
                      name={isRegenerating ? 'spinner' : 'refresh'}
                      size="size-3"
                      className={cn(isRegenerating && 'animate-spin')}
                    />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground hover:text-destructive"
                    onClick={onDelete}
                  >
                    <Icon name="trash" size="size-3" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({
  content,
  briefProblem,
  briefSolution,
  onUpdate,
}) => {
  const { generate, isGenerating, progress } = usePRDAI();
  const [objectives, setObjectives] = useState<ObjectivesContent>(content || EMPTY_CONTENT);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  // Convert to items with status
  const [mainStatus, setMainStatus] = useState<ApprovalStatus>('pending');
  const [secondaryStatuses, setSecondaryStatuses] = useState<Record<string, ApprovalStatus>>({});
  const [nonStatuses, setNonStatuses] = useState<Record<string, ApprovalStatus>>({});

  // Generate objectives
  const handleGenerate = useCallback(async () => {
    try {
      const prompt = OBJECTIVES_PROMPT.replace('{problem}', briefProblem).replace(
        '{solution}',
        briefSolution
      );

      const result = await generate(prompt, {
        systemPrompt: OBJECTIVES_SYSTEM,
        temperature: 0.7,
      });

      let parsed: ObjectivesContent;
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        console.error('Failed to parse objectives');
        return;
      }

      setObjectives(parsed);
      await onUpdate(parsed);
    } catch (err) {
      console.error('Failed to generate objectives:', err);
    }
  }, [briefProblem, briefSolution, generate, onUpdate]);

  // Update handlers
  const handleUpdateMain = useCallback(
    async (text: string) => {
      const updated = { ...objectives, mainObjective: text };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const handleUpdateSecondary = useCallback(
    async (index: number, text: string) => {
      const updated = {
        ...objectives,
        secondaryObjectives: objectives.secondaryObjectives.map((o, i) => (i === index ? text : o)),
      };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const handleDeleteSecondary = useCallback(
    async (index: number) => {
      const updated = {
        ...objectives,
        secondaryObjectives: objectives.secondaryObjectives.filter((_, i) => i !== index),
      };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const handleAddSecondary = useCallback(async () => {
    const updated = {
      ...objectives,
      secondaryObjectives: [...objectives.secondaryObjectives, ''],
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleUpdateNon = useCallback(
    async (index: number, text: string) => {
      const updated = {
        ...objectives,
        nonObjectives: objectives.nonObjectives.map((o, i) => (i === index ? text : o)),
      };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const handleDeleteNon = useCallback(
    async (index: number) => {
      const updated = {
        ...objectives,
        nonObjectives: objectives.nonObjectives.filter((_, i) => i !== index),
      };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const handleAddNon = useCallback(async () => {
    const updated = {
      ...objectives,
      nonObjectives: [...objectives.nonObjectives, ''],
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleUpdateNotes = useCallback(
    async (notes: string) => {
      const updated = { ...objectives, notes };
      setObjectives(updated);
      await onUpdate(updated);
    },
    [objectives, onUpdate]
  );

  const hasContent = objectives.mainObjective || objectives.secondaryObjectives.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Icon name="target" className="text-studio-primary" />
            Objetivos do Projeto
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Defina o que o projeto deve alcançar e o que não faz parte do escopo
          </p>
        </div>
        {hasContent && (
          <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
            <Icon name="refresh" className="mr-1.5 size-4" />
            Regenerar
          </Button>
        )}
      </div>

      {/* Initial State */}
      {!hasContent && !isGenerating && (
        <Card className="p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-studio-primary/20">
            <Icon name="target" size="size-6" className="text-studio-primary" />
          </div>
          <h4 className="mb-2 font-bold">Gerar Objetivos</h4>
          <p className="mb-4 text-sm text-muted-foreground">
            A IA vai definir objetivos baseados no brief
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Gerar Objetivos
          </Button>
        </Card>
      )}

      {/* Loading */}
      {isGenerating && !hasContent && (
        <Card className="p-8 text-center">
          <Icon name="refresh" className="mx-auto mb-3 size-8 animate-spin text-studio-primary" />
          <p className="text-sm text-muted-foreground">Gerando objetivos...</p>
        </Card>
      )}

      {/* Content */}
      {hasContent && (
        <div className="space-y-6">
          {/* Main Objective */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Objetivo Principal
            </h4>
            <ObjectiveItemCard
              item={{ id: 'main', text: objectives.mainObjective, status: mainStatus }}
              type="main"
              onUpdate={handleUpdateMain}
              onStatusChange={setMainStatus}
            />
          </div>

          {/* Secondary Objectives */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Objetivos Secundários
              </h4>
              <Button variant="ghost" size="sm" onClick={handleAddSecondary}>
                <Icon name="plus" className="mr-1 size-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {objectives.secondaryObjectives.map((obj, index) => (
                <ObjectiveItemCard
                  key={index}
                  item={{
                    id: `secondary-${index}`,
                    text: obj,
                    status: secondaryStatuses[index] || 'pending',
                  }}
                  type="secondary"
                  onUpdate={(text) => handleUpdateSecondary(index, text)}
                  onStatusChange={(status) =>
                    setSecondaryStatuses((prev) => ({ ...prev, [index]: status }))
                  }
                  onDelete={() => handleDeleteSecondary(index)}
                />
              ))}
            </div>
          </div>

          {/* Non-Objectives */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Não-Objetivos (Fora do Escopo)
              </h4>
              <Button variant="ghost" size="sm" onClick={handleAddNon}>
                <Icon name="plus" className="mr-1 size-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {objectives.nonObjectives.map((obj, index) => (
                <ObjectiveItemCard
                  key={index}
                  item={{
                    id: `non-${index}`,
                    text: obj,
                    status: nonStatuses[index] || 'pending',
                  }}
                  type="non"
                  onUpdate={(text) => handleUpdateNon(index, text)}
                  onStatusChange={(status) =>
                    setNonStatuses((prev) => ({ ...prev, [index]: status }))
                  }
                  onDelete={() => handleDeleteNon(index)}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Notas e Feedback
            </h4>
            <Textarea
              value={objectives.notes || ''}
              onChange={(e) => handleUpdateNotes(e.target.value)}
              placeholder="Adicione notas ou feedback sobre os objetivos..."
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectivesSection;
