import React, { useState, useCallback } from 'react';
import { PRDProject, BlindSpot, BlindSpotCategory } from '../../../types/prd';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import PRDBlindSpotCard, { BlindSpotStatus } from '../PRDBlindSpotCard';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface BlindSpotsViewProps {
  project: PRDProject;
  onUpdate: (blindSpots: BlindSpot[]) => Promise<void>;
  onNext: () => void;
}

// =============================================================================
// PROMPTS
// =============================================================================

const BLIND_SPOTS_SYSTEM = `Você é um consultor estratégico especializado em análise crítica de ideias de produtos.
Seu papel é identificar pontos cegos - aspectos importantes que o usuário pode ter esquecido de considerar.
Seja construtivo mas direto. Foque em questões práticas e acionáveis.`;

const BLIND_SPOTS_PROMPT = `Analise a seguinte ideia de produto e identifique 4-5 pontos cegos importantes:

{content}

Responda APENAS com um array JSON (sem markdown, sem explicações) no seguinte formato:
[
  {
    "title": "Título curto do ponto cego",
    "description": "Explicação de por que isso é importante considerar",
    "category": "Técnico" | "Mercado" | "UX" | "Viabilidade"
  }
]

Categorias:
- Técnico: questões de implementação, escalabilidade, segurança
- Mercado: concorrência, modelo de negócio, timing
- UX: usabilidade, acessibilidade, experiência do usuário
- Viabilidade: recursos, custos, regulamentações`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// Add Manual Input
const AddBlindSpotInput: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim().length >= 3) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <Card className="border-dashed bg-muted/20 p-4">
      <div className="flex items-center gap-3">
        <Icon name="plus" className="text-muted-foreground" size="size-5" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Adicionar ponto cego manualmente..."
          className="flex-1 border-0 bg-transparent focus-visible:ring-0"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        {value.trim().length >= 3 && (
          <Button size="sm" variant="ghost" onClick={handleSubmit}>
            Adicionar
          </Button>
        )}
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const BlindSpotsView: React.FC<BlindSpotsViewProps> = ({ project, onUpdate, onNext }) => {
  const { generate, isGenerating, error, progress } = usePRDAI();
  const [blindSpots, setBlindSpots] = useState<BlindSpot[]>(
    project.project_metadata?.brief?.blindSpots || []
  );

  const uploadContent = project.project_metadata?.upload?.content || '';
  const addressedCount = blindSpots.filter((bs) => bs.selected).length;
  const canAdvance = addressedCount >= 2;

  // Generate blind spots
  const handleGenerate = useCallback(async () => {
    try {
      const result = await generate(BLIND_SPOTS_PROMPT.replace('{content}', uploadContent), {
        systemPrompt: BLIND_SPOTS_SYSTEM,
        temperature: 0.8,
      });

      // Parse response
      let parsed: Array<{ title: string; description: string; category: BlindSpotCategory }>;
      try {
        // Try to extract JSON from response
        let jsonContent = result.content;
        const jsonMatch = jsonContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }
        parsed = JSON.parse(jsonContent);
      } catch {
        console.error('Failed to parse blind spots response:', result.content);
        return;
      }

      // Transform to BlindSpot type
      const generated: BlindSpot[] = parsed.map((bs, i) => ({
        id: `bs-${Date.now()}-${i}`,
        title: bs.title,
        description: bs.description,
        category: bs.category as BlindSpotCategory,
        selected: false,
      }));

      setBlindSpots(generated);
      await onUpdate(generated);
    } catch (err) {
      console.error('Failed to generate blind spots:', err);
    }
  }, [generate, uploadContent, onUpdate]);

  // Handle status change
  const handleStatusChange = useCallback(
    async (id: string, status: BlindSpotStatus) => {
      const updated = blindSpots.map((bs) =>
        bs.id === id ? { ...bs, selected: status === 'considered' } : bs
      );
      setBlindSpots(updated);
      await onUpdate(updated);
    },
    [blindSpots, onUpdate]
  );

  // Handle edit
  const handleEdit = useCallback(
    async (id: string, title: string, description: string) => {
      const updated = blindSpots.map((bs) => (bs.id === id ? { ...bs, title, description } : bs));
      setBlindSpots(updated);
      await onUpdate(updated);
    },
    [blindSpots, onUpdate]
  );

  // Handle delete
  const handleDelete = useCallback(
    async (id: string) => {
      const updated = blindSpots.filter((bs) => bs.id !== id);
      setBlindSpots(updated);
      await onUpdate(updated);
    },
    [blindSpots, onUpdate]
  );

  // Handle add manual
  const handleAddManual = useCallback(
    async (title: string) => {
      const newBlindSpot: BlindSpot = {
        id: `bs-manual-${Date.now()}`,
        title,
        description: 'Ponto cego adicionado manualmente',
        category: 'Técnico',
        selected: false,
      };
      const updated = [...blindSpots, newBlindSpot];
      setBlindSpots(updated);
      await onUpdate(updated);
    },
    [blindSpots, onUpdate]
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Icon name="lightbulb" className="text-studio-primary" />
            Pontos Cegos (QA)
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A IA identificou aspectos que você pode ter esquecido de considerar
          </p>
        </div>
        {blindSpots.length > 0 && !isGenerating && (
          <Button variant="outline" size="sm" onClick={handleGenerate}>
            <Icon name="refresh" className="mr-2 size-4" />
            Regenerar
          </Button>
        )}
      </div>

      {/* Initial State */}
      {blindSpots.length === 0 && !isGenerating && (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-studio-primary/20">
            <Icon name="lightbulb" size="size-8" className="text-studio-primary" />
          </div>
          <h3 className="mb-2 text-lg font-bold">Vamos identificar pontos cegos</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">
            A IA vai analisar sua ideia e sugerir aspectos que você pode ter esquecido de considerar
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Analisar Pontos Cegos
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-12 text-center">
          <Icon name="refresh" className="mx-auto mb-4 size-12 animate-spin text-studio-primary" />
          <h3 className="mb-2 text-lg font-bold">Analisando sua ideia...</h3>
          <p className="text-muted-foreground">
            Identificando pontos cegos e áreas não consideradas
          </p>
          {progress > 0 && (
            <div className="mx-auto mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-studio-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5 p-6">
          <div className="flex items-center gap-3 text-destructive">
            <Icon name="exclamation" size="size-5" />
            <div>
              <p className="font-medium">Erro ao gerar pontos cegos</p>
              <p className="text-sm opacity-80">{error.message}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleGenerate} className="mt-4">
            Tentar novamente
          </Button>
        </Card>
      )}

      {/* Blind Spots List */}
      {blindSpots.length > 0 && !isGenerating && (
        <div className="space-y-4">
          {blindSpots.map((bs, index) => (
            <PRDBlindSpotCard
              key={bs.id}
              blindSpot={bs}
              index={index}
              onStatusChange={(status) => handleStatusChange(bs.id, status)}
              onEdit={(title, desc) => handleEdit(bs.id, title, desc)}
              onDelete={() => handleDelete(bs.id)}
            />
          ))}

          {/* Add Manual */}
          <AddBlindSpotInput onAdd={handleAddManual} />
        </div>
      )}

      {/* Progress & Actions */}
      {blindSpots.length > 0 && !isGenerating && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <span
              className={cn(
                'font-mono font-medium',
                canAdvance ? 'text-emerald-500' : 'text-amber-500'
              )}
            >
              {addressedCount}/{blindSpots.length}
            </span>{' '}
            pontos endereçados {!canAdvance && '(mínimo 2)'}
          </div>
          <Button
            onClick={onNext}
            disabled={!canAdvance}
            className={canAdvance ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
          >
            Continuar
            <Icon name="arrow-right" className="ml-2 size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlindSpotsView;
