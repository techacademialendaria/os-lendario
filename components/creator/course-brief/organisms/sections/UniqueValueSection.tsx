import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { TEXTAREA_CLASSES } from '../../../studio-tokens';
import { VALUE_PROPOSITION_TAGS } from '../../types';

interface UniqueValueSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const UniqueValueSection: React.FC<UniqueValueSectionProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>O que diferencia este curso dos concorrentes?</Label>
    <Textarea
      placeholder="Ex: Único curso que combina IA com técnicas de Social Selling, incluindo 50+ templates prontos..."
      className={TEXTAREA_CLASSES}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="grid grid-cols-3 gap-3">
      {VALUE_PROPOSITION_TAGS.map((tag) => (
        <Button key={tag} variant="outline" size="sm" className="justify-start text-xs">
          <Icon name="plus" className="mr-2 size-3" /> {tag}
        </Button>
      ))}
    </div>
  </div>
);
