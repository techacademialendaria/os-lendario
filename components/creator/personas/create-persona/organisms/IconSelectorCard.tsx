import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import { AVAILABLE_ICONS, type PersonaIconName } from '../types';

interface IconSelectorCardProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

/**
 * Icon selector card for persona review
 */
export const IconSelectorCard: React.FC<IconSelectorCardProps> = ({
  selectedIcon,
  onSelectIcon,
}) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="palette" size="size-4" /> Icone da Persona
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_ICONS.map((iconName) => (
            <Button
              key={iconName}
              type="button"
              variant="ghost"
              onClick={() => onSelectIcon(iconName)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg border p-0 transition-all',
                selectedIcon === iconName
                  ? 'border-studio-primary bg-studio-primary/20 text-studio-primary'
                  : 'border-border/50 hover:border-studio-primary/50 hover:bg-muted/30'
              )}
            >
              <Icon name={iconName as PersonaIconName} size="size-6" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
