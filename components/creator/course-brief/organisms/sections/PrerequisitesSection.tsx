import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';
import { TEXTAREA_CLASSES } from '../../../studio-tokens';

interface PrerequisitesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const PrerequisitesSection: React.FC<PrerequisitesSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>O que o aluno precisa saber/ter antes?</Label>
    <Textarea
      placeholder="Ex: Conhecimento básico de Excel, acesso a CRM, disposição para aplicar..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Alert className="border-brand-yellow/20 bg-brand-yellow/5">
      <Icon name="exclamation-triangle" className="size-4 text-brand-yellow" />
      <AlertDescription className="text-xs">
        Se não houver pré-requisitos, deixe claro que é para iniciantes absolutos.
      </AlertDescription>
    </Alert>
  </div>
);
