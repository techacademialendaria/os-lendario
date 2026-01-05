// Brief Editor Component
// Editable form for the brief content

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { BriefFormState, STUDIO_TEAL, MIN_CHARS_REQUIRED } from '../types';

interface BriefEditorProps {
  form: BriefFormState;
  onFieldChange: (field: keyof BriefFormState, value: string) => void;
  isGenerating: string | null;
  onRegenerate: (field: string) => void;
}

export const BriefEditor: React.FC<BriefEditorProps> = ({
  form,
  onFieldChange,
  isGenerating,
  onRegenerate,
}) => (
  <div className="animate-fade-in space-y-8">
    {/* Problem */}
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Super Problema
        </label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
          onClick={() => onRegenerate('problem')}
          disabled={isGenerating !== null}
        >
          {isGenerating === 'problem' ? (
            <Icon name="refresh" size="size-3" className="animate-spin" />
          ) : (
            <Icon name="refresh" size="size-3" />
          )}
          Regenerar
        </Button>
      </div>
      <AutosizeTextarea
        className="bg-card font-serif text-base leading-relaxed"
        value={form.problem}
        onChange={(e) => onFieldChange('problem', e.target.value)}
        placeholder="Qual problema voce esta resolvendo? Descreva a dor do usuario..."
        disabled={isGenerating === 'problem'}
      />
      <p className="text-xs text-muted-foreground">
        {form.problem.length}/{MIN_CHARS_REQUIRED} caracteres minimos
        {form.problem.length >= MIN_CHARS_REQUIRED && (
          <Icon name="check" className="ml-1 inline size-3 text-green-500" />
        )}
      </p>
    </div>

    {/* Solution */}
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Solucao Proposta
        </label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
          onClick={() => onRegenerate('solution')}
          disabled={isGenerating !== null}
        >
          {isGenerating === 'solution' ? (
            <Icon name="refresh" size="size-3" className="animate-spin" />
          ) : (
            <Icon name="refresh" size="size-3" />
          )}
          Regenerar
        </Button>
      </div>
      <AutosizeTextarea
        className="bg-card font-serif text-base leading-relaxed"
        value={form.solution}
        onChange={(e) => onFieldChange('solution', e.target.value)}
        placeholder="Como voce vai resolver o problema? Descreva a abordagem..."
        disabled={isGenerating === 'solution'}
      />
      <p className="text-xs text-muted-foreground">
        {form.solution.length}/{MIN_CHARS_REQUIRED} caracteres minimos
        {form.solution.length >= MIN_CHARS_REQUIRED && (
          <Icon name="check" className="ml-1 inline size-3 text-green-500" />
        )}
      </p>
    </div>

    {/* Differentials */}
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Diferenciais Criticos
        </label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
        >
          <Icon name="refresh" size="size-3" /> Regenerar
        </Button>
      </div>
      <AutosizeTextarea
        className="border-l-4 bg-card font-mono text-sm leading-relaxed"
        style={{ borderLeftColor: STUDIO_TEAL }}
        value={form.differentials}
        onChange={(e) => onFieldChange('differentials', e.target.value)}
        placeholder="1. Diferencial 1&#10;2. Diferencial 2&#10;3. Diferencial 3"
      />
    </div>

    {/* Scope In / Out */}
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-600">
          <Icon name="check-circle" size="size-4" /> Escopo - O que FAZ
        </label>
        <AutosizeTextarea
          className="min-h-[150px] border-green-500/20 bg-green-500/5 text-sm"
          value={form.scopeIn}
          onChange={(e) => onFieldChange('scopeIn', e.target.value)}
          placeholder="- Funcionalidade 1&#10;- Funcionalidade 2&#10;- Funcionalidade 3"
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive">
          <Icon name="x-circle" size="size-4" /> Escopo - O que NAO FAZ
        </label>
        <AutosizeTextarea
          className="min-h-[150px] border-destructive/20 bg-destructive/5 text-sm"
          value={form.scopeOut}
          onChange={(e) => onFieldChange('scopeOut', e.target.value)}
          placeholder="- Nao inclui X&#10;- Nao inclui Y&#10;- Nao inclui Z"
        />
      </div>
    </div>

    {/* Success Metrics */}
    <div className="space-y-2">
      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Metricas de Sucesso
      </label>
      <AutosizeTextarea
        className="bg-card text-sm"
        value={form.metrics}
        onChange={(e) => onFieldChange('metrics', e.target.value)}
        placeholder="- Reducao de X em Y%&#10;- Aumento de Z em W%&#10;- Tempo de tarefa < N segundos"
      />
    </div>
  </div>
);
