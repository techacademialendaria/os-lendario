import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { TEXTAREA_CLASSES } from '../../../studio-tokens';

interface MethodologySectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Como o conteúdo será ensinado?</Label>
    <Textarea
      placeholder="Ex: Método GPS (Definir Destino → Mapear Origem → Traçar Rota) aplicado em cada módulo..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="rounded-lg border border-studio-primary/20 bg-studio-primary/5 p-4">
      <h4 className="mb-2 text-sm font-bold text-studio-primary">Framework GPS Sugerido</h4>
      <ul className="space-y-1 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <Icon name="target" size="size-3" className="text-studio-primary" />
          <strong>Destino:</strong> Onde o aluno quer chegar
        </li>
        <li className="flex items-center gap-2">
          <Icon name="map-marker" size="size-3" className="text-studio-primary" />
          <strong>Origem:</strong> Onde o aluno está hoje
        </li>
        <li className="flex items-center gap-2">
          <Icon name="route" size="size-3" className="text-studio-primary" />
          <strong>Rota:</strong> O caminho otimizado
        </li>
      </ul>
    </div>
  </div>
);
