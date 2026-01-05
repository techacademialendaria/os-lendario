import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TEXTAREA_CLASSES, INPUT_CLASSES } from '../../../studio-tokens';

interface TargetAudienceSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Descreva seu aluno ideal (ICP)</Label>
    <Textarea
      placeholder="Ex: Gestores de vendas B2B com equipe de 5+ pessoas, buscando aumentar conversão em 30%..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-xs">Cargo típico</Label>
        <Input placeholder="Ex: Gerente de Vendas" className={INPUT_CLASSES} />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Experiência</Label>
        <Input placeholder="Ex: 3-5 anos" className={INPUT_CLASSES} />
      </div>
    </div>
  </div>
);
