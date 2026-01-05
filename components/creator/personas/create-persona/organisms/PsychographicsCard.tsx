import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { PersonaPsychographics } from '../types';

interface PsychographicsCardProps {
  psychographics: PersonaPsychographics;
  onEditField: (path: string, value: unknown) => void;
}

/**
 * Psychographics section card for persona review
 */
export const PsychographicsCard: React.FC<PsychographicsCardProps> = ({
  psychographics,
  onEditField,
}) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'h-full lg:col-span-2')}>
      <CardHeader className="border-b border-border bg-muted/5 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="brain" size="size-4" /> Psicografia & Mindset
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-studio-primary">Valores Core</Label>
            <Input
              value={psychographics.values.join(', ')}
              onChange={(e) =>
                onEditField(
                  'psychographics.values',
                  e.target.value.split(',').map((s) => s.trim())
                )
              }
              placeholder="Separar por virgula"
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-studio-primary">
              Medos Secretos
            </Label>
            <Input
              value={psychographics.fears.join(', ')}
              onChange={(e) =>
                onEditField(
                  'psychographics.fears',
                  e.target.value.split(',').map((s) => s.trim())
                )
              }
              placeholder="Separar por virgula"
              className="h-9"
            />
          </div>
        </div>
        <div className="rounded-lg border border-studio-primary/20 bg-studio-primary/10 p-4">
          <Label className="mb-2 block text-xs font-bold uppercase text-studio-primary">
            Pensamento Dominante
          </Label>
          <AutosizeTextarea
            value={psychographics.mindset}
            onChange={(e) => onEditField('psychographics.mindset', e.target.value)}
            className="border-none bg-transparent p-0 italic focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};
