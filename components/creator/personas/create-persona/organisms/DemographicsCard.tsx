import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { PersonaDemographics } from '../types';

interface DemographicsCardProps {
  demographics: PersonaDemographics;
  onEditField: (path: string, value: unknown) => void;
}

/**
 * Demographics section card for persona review
 */
export const DemographicsCard: React.FC<DemographicsCardProps> = ({ demographics, onEditField }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'h-full')}>
      <CardHeader className="border-b border-border bg-muted/5 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="id-badge" size="size-4" /> Demografia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Idade</Label>
          <Input
            value={demographics.age}
            onChange={(e) => onEditField('demographics.age', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Ocupacao</Label>
          <Input
            value={demographics.role}
            onChange={(e) => onEditField('demographics.role', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Renda</Label>
          <Input
            value={demographics.income}
            onChange={(e) => onEditField('demographics.income', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Localizacao</Label>
          <Input
            value={demographics.location}
            onChange={(e) => onEditField('demographics.location', e.target.value)}
            className="h-9"
          />
        </div>
      </CardContent>
    </Card>
  );
};
