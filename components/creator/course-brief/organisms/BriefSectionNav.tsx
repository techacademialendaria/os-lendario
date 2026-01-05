import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { BriefSectionNavProps } from '../types';

export const BriefSectionNav: React.FC<BriefSectionNavProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="w-64 shrink-0">
      <Card className={STUDIO_CARD_CLASSES}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Seções do Brief
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  'flex h-auto w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-studio-primary/10 font-medium text-studio-primary'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon name={section.icon} size="size-3" />
                  <span className="truncate">{section.title}</span>
                </div>
                {activeSection > section.id && (
                  <Icon
                    name="check-circle"
                    className="text-success size-3 shrink-0"
                    type="solid"
                  />
                )}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};
