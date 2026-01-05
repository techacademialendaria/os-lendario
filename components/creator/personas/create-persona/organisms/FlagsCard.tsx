import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';

interface FlagsCardProps {
  redFlags: string[];
  greenFlags: string[];
}

/**
 * Red/Green flags section card for persona review
 */
export const FlagsCard: React.FC<FlagsCardProps> = ({ redFlags, greenFlags }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'h-full bg-muted/10')}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="flag" size="size-4" /> Sinais de Compra
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-destructive">
            <Icon name="cross-circle" size="size-3" /> Red Flags (Evitar)
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {redFlags.map((flag, i) => (
              <li key={i}>- {flag}</li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-emerald-500">
            <Icon name="check-circle" size="size-3" /> Green Flags (Focar)
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {greenFlags.map((flag, i) => (
              <li key={i}>- {flag}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
