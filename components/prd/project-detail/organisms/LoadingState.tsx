// PRD Project Detail - Loading State organism
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Section } from '@/types';
import PRDTopbar from '../../PRDTopbar';

interface LoadingStateProps {
  setSection: (s: Section) => void;
}

interface NotFoundStateProps {
  setSection: (s: Section) => void;
  onBack: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <main className="flex flex-1 items-center justify-center">
      <Icon name="refresh" className="size-8 animate-spin text-muted-foreground" />
    </main>
  </div>
);

export const NotFoundState: React.FC<NotFoundStateProps> = ({ setSection, onBack }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <main className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="folder-open" className="mx-auto size-12 text-muted-foreground" />
        <p className="text-muted-foreground">Projeto nao encontrado</p>
        <Button variant="outline" onClick={onBack}>
          Voltar aos Projetos
        </Button>
      </div>
    </main>
  </div>
);
