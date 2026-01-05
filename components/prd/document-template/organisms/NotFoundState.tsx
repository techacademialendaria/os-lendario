// Not Found State Component
// Displays when project is not found

import React from 'react';
import { Section } from '@/types';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import PRDTopbar from '../../PRDTopbar';

interface NotFoundStateProps {
  setSection: (s: Section) => void;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="folder-open" size="size-16" className="mx-auto text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Projeto nao encontrado</h2>
        <p className="text-muted-foreground">O projeto que voce esta procurando nao existe.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar
        </Button>
      </div>
    </div>
  </div>
);
