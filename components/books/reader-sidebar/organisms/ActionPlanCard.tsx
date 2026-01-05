import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * ActionPlanCard - CTA for creating reading notes
 */
export const ActionPlanCard: React.FC = () => (
  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
    <h4 className="mb-2 text-sm font-bold text-primary">Plano de Acao</h4>
    <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
      Anote as principais licoes deste livro e como aplica-las na sua vida.
    </p>
    <Button
      size="sm"
      variant="outline"
      className="h-8 w-full border-primary/30 text-xs text-primary hover:bg-primary/10"
    >
      Criar Notas
    </Button>
  </div>
);

export default ActionPlanCard;
