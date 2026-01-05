import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';
import { TEXTAREA_CLASSES } from '../../../studio-tokens';

interface ExpectedResultsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExpectedResultsSection: React.FC<ExpectedResultsSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>O que o aluno vai conseguir fazer ao final?</Label>
    <Textarea
      placeholder="Ex: 1. Prospectar via LinkedIn com taxa de resposta de 40%+, 2. Conduzir calls de descoberta, 3. Fechar contratos acima de R$10k..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Alert>
      <Icon name="check-circle" className="text-success size-4" />
      <AlertDescription className="text-xs">
        <strong>Dica:</strong> Liste resultados mensuráveis e específicos. "Vai saber
        vender" é vago, "Vai fechar 3 contratos em 30 dias" é específico.
      </AlertDescription>
    </Alert>
  </div>
);
