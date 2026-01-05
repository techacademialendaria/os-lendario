import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { PersonaData, PersonaIconName } from '../types';

interface ReviewProfileCardProps {
  persona: PersonaData;
  onEditField: (path: string, value: unknown) => void;
}

/**
 * Profile header card for reviewing persona name and quote
 */
export const ReviewProfileCard: React.FC<ReviewProfileCardProps> = ({ persona, onEditField }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
      <div className="h-1 w-full bg-studio-primary" />
      <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-studio-primary/20 bg-studio-accent/10 shadow-inner">
          <Icon
            name={persona.icon as PersonaIconName}
            size="size-10"
            className="text-studio-primary"
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <Input
              value={persona.name}
              onChange={(e) => onEditField('name', e.target.value)}
              className="h-auto border-none bg-transparent p-0 text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Badge
              variant="outline"
              className="mx-auto w-fit border-studio-primary/30 bg-studio-primary/10 text-studio-primary md:mx-0"
            >
              ICP Principal
            </Badge>
          </div>
          <div className="border-l-2 border-studio-primary/30 pl-4">
            <Input
              value={persona.definingQuote}
              onChange={(e) => onEditField('definingQuote', e.target.value)}
              className="h-auto border-none bg-transparent p-0 italic text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
