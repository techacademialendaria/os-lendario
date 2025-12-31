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

export interface StackCategory {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
}

export interface ArchitectureContent {
  stack: StackCategory;
  components: string;
  integrations: string[];
  scalabilityNotes: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ArchitectureSectionProps {
  content: ArchitectureContent | null;
  briefSolution: string;
  onUpdate: (content: ArchitectureContent) => Promise<void>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STACK_CONFIG: Record<keyof StackCategory, { label: string; icon: string; color: string }> = {
  frontend: { label: 'Frontend', icon: 'window', color: '#3B82F6' },
  backend: { label: 'Backend', icon: 'server', color: '#10B981' },
  database: { label: 'Database', icon: 'database', color: '#8B5CF6' },
  infrastructure: { label: 'Infraestrutura', icon: 'cloud', color: '#F59E0B' },
};

const EMPTY_CONTENT: ArchitectureContent = {
  stack: { frontend: [], backend: [], database: [], infrastructure: [] },
  components: '',
  integrations: [],
  scalabilityNotes: '',
  status: 'pending',
};

// =============================================================================
// PROMPTS
// =============================================================================

const ARCHITECTURE_SYSTEM = `Você é um arquiteto de software experiente.
Sugira stacks tecnológicos modernos e apropriados para o projeto.`;

const ARCHITECTURE_PROMPT = `Baseado na solução, sugira uma arquitetura técnica:

SOLUÇÃO: {solution}

Responda em JSON:
{
  "stack": {
    "frontend": ["React", "TypeScript", "Tailwind CSS"],
    "backend": ["Node.js", "Express", "TypeScript"],
    "database": ["PostgreSQL", "Redis"],
    "infrastructure": ["Vercel", "Supabase"]
  },
  "components": "Diagrama de componentes em texto descritivo ou Mermaid",
  "integrations": ["API de Pagamento", "Autenticação OAuth"],
  "scalabilityNotes": "Considerações sobre escalabilidade..."
}`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const StackSection: React.FC<{
  category: keyof StackCategory;
  items: string[];
  onUpdate: (items: string[]) => void;
}> = ({ category, items, onUpdate }) => {
  const [newItem, setNewItem] = useState('');
  const config = STACK_CONFIG[category];

  const handleAdd = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon name={config.icon} size="size-4" style={{ color: config.color }} />
        </div>
        <h4 className="text-sm font-bold">{config.label}</h4>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
            {item}
            <button onClick={() => handleRemove(index)} className="ml-1 hover:text-destructive">
              <Icon name="cross" size="size-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Adicionar ${config.label.toLowerCase()}...`}
          className="h-8 flex-1 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button size="sm" variant="ghost" onClick={handleAdd} disabled={!newItem.trim()}>
          <Icon name="plus" size="size-4" />
        </Button>
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({
  content,
  briefSolution,
  onUpdate,
}) => {
  const { generate, isGenerating } = usePRDAI();
  const [architecture, setArchitecture] = useState<ArchitectureContent>(content || EMPTY_CONTENT);

  const handleGenerate = useCallback(async () => {
    try {
      const prompt = ARCHITECTURE_PROMPT.replace('{solution}', briefSolution);
      const result = await generate(prompt, {
        systemPrompt: ARCHITECTURE_SYSTEM,
        temperature: 0.7,
      });

      let parsed: Omit<ArchitectureContent, 'status'>;
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        else throw new Error('No JSON');
      } catch {
        return;
      }

      const updated: ArchitectureContent = { ...parsed, status: 'pending' };
      setArchitecture(updated);
      await onUpdate(updated);
    } catch (err) {
      console.error('Failed to generate architecture:', err);
    }
  }, [briefSolution, generate, onUpdate]);

  const handleUpdateStack = useCallback(
    async (category: keyof StackCategory, items: string[]) => {
      const updated = {
        ...architecture,
        stack: { ...architecture.stack, [category]: items },
      };
      setArchitecture(updated);
      await onUpdate(updated);
    },
    [architecture, onUpdate]
  );

  const handleUpdateComponents = useCallback(
    async (components: string) => {
      const updated = { ...architecture, components };
      setArchitecture(updated);
      await onUpdate(updated);
    },
    [architecture, onUpdate]
  );

  const handleUpdateIntegrations = useCallback(
    async (integrations: string[]) => {
      const updated = { ...architecture, integrations };
      setArchitecture(updated);
      await onUpdate(updated);
    },
    [architecture, onUpdate]
  );

  const handleUpdateScalability = useCallback(
    async (scalabilityNotes: string) => {
      const updated = { ...architecture, scalabilityNotes };
      setArchitecture(updated);
      await onUpdate(updated);
    },
    [architecture, onUpdate]
  );

  const handleStatusChange = useCallback(
    async (status: 'pending' | 'approved' | 'rejected') => {
      const updated = { ...architecture, status };
      setArchitecture(updated);
      await onUpdate(updated);
    },
    [architecture, onUpdate]
  );

  const hasContent = architecture.stack.frontend.length > 0 || architecture.components;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Icon name="sitemap" className="text-studio-primary" />
            Arquitetura Técnica
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Stack tecnológico, componentes e integrações
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
            <Icon name="sitemap" size="size-6" className="text-studio-primary" />
          </div>
          <h4 className="mb-2 font-bold">Gerar Arquitetura</h4>
          <p className="mb-4 text-sm text-muted-foreground">
            A IA vai sugerir uma arquitetura técnica
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Gerar Arquitetura
          </Button>
        </Card>
      )}

      {isGenerating && !hasContent && (
        <Card className="p-8 text-center">
          <Icon name="refresh" className="mx-auto mb-3 size-8 animate-spin text-studio-primary" />
          <p className="text-sm text-muted-foreground">Gerando arquitetura...</p>
        </Card>
      )}

      {hasContent && (
        <div className="space-y-6">
          {/* Stack Grid */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Stack Tecnológico
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(STACK_CONFIG) as (keyof StackCategory)[]).map((category) => (
                <StackSection
                  key={category}
                  category={category}
                  items={architecture.stack[category]}
                  onUpdate={(items) => handleUpdateStack(category, items)}
                />
              ))}
            </div>
          </div>

          {/* Components */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Diagrama de Componentes
            </h4>
            <Textarea
              value={architecture.components}
              onChange={(e) => handleUpdateComponents(e.target.value)}
              placeholder="Descreva os componentes do sistema ou use diagrama Mermaid..."
              className="min-h-[150px] font-mono text-sm"
            />
          </div>

          {/* Integrations */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Integrações
            </h4>
            <div className="mb-2 flex flex-wrap gap-2">
              {architecture.integrations.map((integration, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 pr-1">
                  <Icon name="link" size="size-3" className="mr-1" />
                  {integration}
                  <button
                    onClick={() =>
                      handleUpdateIntegrations(
                        architecture.integrations.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-1 hover:text-destructive"
                  >
                    <Icon name="cross" size="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Adicionar integração e pressionar Enter..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                  handleUpdateIntegrations([
                    ...architecture.integrations,
                    (e.target as HTMLInputElement).value.trim(),
                  ]);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>

          {/* Scalability Notes */}
          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Considerações de Escalabilidade
            </h4>
            <Textarea
              value={architecture.scalabilityNotes}
              onChange={(e) => handleUpdateScalability(e.target.value)}
              placeholder="Notas sobre escalabilidade, performance, etc..."
              className="min-h-[100px]"
            />
          </div>

          {/* Approval */}
          <div className="flex items-center gap-2 border-t pt-4">
            <span className="mr-2 text-sm text-muted-foreground">Status:</span>
            <Button
              size="sm"
              variant={architecture.status === 'approved' ? 'default' : 'outline'}
              className={cn(architecture.status === 'approved' && 'bg-emerald-600')}
              onClick={() => handleStatusChange('approved')}
            >
              <Icon name="check" className="mr-1 size-3" />
              Aprovado
            </Button>
            <Button
              size="sm"
              variant={architecture.status === 'rejected' ? 'default' : 'outline'}
              className={cn(architecture.status === 'rejected' && 'bg-red-600')}
              onClick={() => handleStatusChange('rejected')}
            >
              <Icon name="cross" className="mr-1 size-3" />
              Rejeitar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureSection;
