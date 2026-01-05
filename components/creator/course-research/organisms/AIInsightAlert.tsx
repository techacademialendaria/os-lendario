import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';

export const AIInsightAlert: React.FC = () => {
  return (
    <Alert className="border-primary/20 bg-studio-primary/5">
      <Icon name="lightbulb" className="size-4 text-studio-primary" />
      <AlertTitle>Insight Principal da IA</AlertTitle>
      <AlertDescription>
        90% dos cursos de didatica focam em teoria. A maior reclamacao dos alunos e{' '}
        <strong>falta de templates praticos</strong> e{' '}
        <strong>exemplos aplicaveis</strong>. Esta e sua maior oportunidade de
        diferenciacao.
      </AlertDescription>
    </Alert>
  );
};
