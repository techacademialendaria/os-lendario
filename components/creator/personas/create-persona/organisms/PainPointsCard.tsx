import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { PainPoint } from '../types';

interface PainPointsCardProps {
  painPoints: PainPoint[];
}

/**
 * Pain points (Hell) section card for persona review
 */
export const PainPointsCard: React.FC<PainPointsCardProps> = ({ painPoints }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'h-full border-t-4 border-t-orange-500')}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
          <Icon name="flame" size="size-4" /> Dores (Inferno)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {painPoints.map((pain, i) => (
          <div key={i} className="space-y-1">
            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              {pain.superficial}
            </p>
            <p className="border-l border-orange-500/20 pl-3.5 text-xs text-muted-foreground">
              {pain.deep}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
