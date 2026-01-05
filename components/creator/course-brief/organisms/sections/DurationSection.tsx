import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INPUT_CLASSES } from '../../../studio-tokens';

interface DurationSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const DurationSection: React.FC<DurationSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Estrutura geral do curso</Label>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-xs">Duração Total Estimada</Label>
        <Input
          placeholder="Ex: 8 horas"
          className={INPUT_CLASSES}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Número de Módulos</Label>
        <Input placeholder="Ex: 6 módulos" className={INPUT_CLASSES} />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Duração Média por Aula</Label>
        <Input placeholder="Ex: 8-12 minutos" className={INPUT_CLASSES} />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Formato Principal</Label>
        <Input placeholder="Ex: Vídeo + PDF" className={INPUT_CLASSES} />
      </div>
    </div>
  </div>
);
