import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';
import { TEXTAREA_CLASSES } from '../../../studio-tokens';

interface DreamOutcomeSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const DreamOutcomeSection: React.FC<DreamOutcomeSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Qual é a promessa principal do curso?</Label>
    <Textarea
      placeholder="Ex: Dominar vendas B2B e fechar contratos de alto valor em 30 dias..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Alert>
      <Icon name="lightbulb" className="size-4" />
      <AlertDescription className="text-xs">
        <strong>Dica GPS:</strong> Use a fórmula "Conseguir [resultado específico] em [tempo
        definido] sem [objeção comum]"
      </AlertDescription>
    </Alert>
  </div>
);
