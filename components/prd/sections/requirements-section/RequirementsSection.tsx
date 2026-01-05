import React from 'react';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { cn } from '../../../../lib/utils';
import { RequirementsSectionProps, RequirementType, TYPE_CONFIG, PRIORITY_CONFIG } from './types';
import { useRequirementsData, useRequirementsFilter } from './hooks/useRequirements';
import { RequirementRow } from './organisms/RequirementRow';

// =============================================================================
// MAIN COMPONENT (Orchestrator: ~80 lines)
// =============================================================================

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  content,
  briefProblem,
  briefSolution,
  onUpdate,
}) => {
  const {
    requirements,
    isGenerating,
    hasContent,
    generate,
    updateRequirement,
    deleteRequirement,
    addRequirement,
  } = useRequirementsData({ initialContent: content, briefProblem, briefSolution, onUpdate });

  const { activeTab, setActiveTab, filterPriority, setFilterPriority, filteredRequirements, counts } =
    useRequirementsFilter({ requirements: requirements.requirements });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Icon name="check-square" className="text-studio-primary" />
            Requisitos
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Requisitos funcionais, nao-funcionais e restricoes
          </p>
        </div>
        {hasContent && (
          <Button variant="outline" size="sm" onClick={generate} disabled={isGenerating}>
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
          <p className="mb-4 text-sm text-muted-foreground">A IA vai criar requisitos baseados no brief</p>
          <Button onClick={generate} className="bg-studio-primary hover:bg-studio-primary/90">
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
                onUpdate={(r) => updateRequirement(index, r)}
                onDelete={() => deleteRequirement(req.id)}
              />
            ))}
            {filteredRequirements.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">Nenhum requisito nesta categoria</p>
            )}
          </div>

          {/* Add Button */}
          <Button variant="outline" size="sm" onClick={() => addRequirement(activeTab)}>
            <Icon name="plus" className="mr-1.5 size-4" />
            Adicionar {TYPE_CONFIG[activeTab].label.slice(0, -1)}
          </Button>
        </>
      )}
    </div>
  );
};

export default RequirementsSection;
