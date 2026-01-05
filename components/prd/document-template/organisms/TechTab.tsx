// Tech Tab Component
// Tab content for tech stack configuration

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TechStack, STUDIO_TEAL } from '../types';

interface TechTabProps {
  techStack: TechStack;
  onTechStackChange: (field: keyof TechStack, value: string) => void;
  scopeLimits: string;
  onScopeLimitsChange: (value: string) => void;
  pendingCount: number;
  isAdvancing: boolean;
  onBack: () => void;
  onFinish: () => void;
}

export const TechTab: React.FC<TechTabProps> = ({
  techStack,
  onTechStackChange,
  scopeLimits,
  onScopeLimitsChange,
  pendingCount,
  isAdvancing,
  onBack,
  onFinish,
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">Arquitetura Tecnica</h3>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">
            Sugestao da IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Frontend</label>
            <Input
              value={techStack.frontend}
              onChange={(e) => onTechStackChange('frontend', e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Backend / BaaS</label>
            <Input
              value={techStack.backend}
              onChange={(e) => onTechStackChange('backend', e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">AI Model</label>
            <Input
              value={techStack.ai}
              onChange={(e) => onTechStackChange('ai', e.target.value)}
              className="bg-background"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Limites de Escopo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AutosizeTextarea
            className="min-h-[150px] text-sm"
            value={scopeLimits}
            onChange={(e) => onScopeLimitsChange(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>

    <div className="flex justify-end gap-3 border-t border-border pt-8">
      <Button variant="ghost" onClick={onBack}>
        Voltar
      </Button>
      <Button
        size="lg"
        className="px-8 font-bold text-white shadow-lg hover:opacity-90"
        style={{ backgroundColor: STUDIO_TEAL }}
        onClick={onFinish}
        disabled={pendingCount > 0 || isAdvancing}
      >
        {isAdvancing ? (
          <>
            <Icon name="refresh" className="mr-2 animate-spin" />
            Gerando...
          </>
        ) : (
          <>
            Gerar Plano de Execucao <Icon name="check-circle" className="ml-2" />
          </>
        )}
      </Button>
    </div>
  </div>
);
