import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { Desire } from '../types';

interface DesiresCardProps {
  desires: Desire[];
}

/**
 * Desires (Heaven) section card for persona review
 */
export const DesiresCard: React.FC<DesiresCardProps> = ({ desires }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'h-full border-t-4 border-t-emerald-500')}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
          <Icon name="star" size="size-4" /> Desejos (Ceu)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {desires.map((desire, i) => (
          <div key={i} className="space-y-1">
            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {desire.surface}
            </p>
            <p className="border-l border-emerald-500/20 pl-3.5 text-xs text-muted-foreground">
              {desire.hidden}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
