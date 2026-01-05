// Loading State Component
// Displays loading spinner while project data is being fetched

import React from 'react';
import { Section } from '@/types';
import { Icon } from '@/components/ui/icon';
import PRDTopbar from '../../PRDTopbar';

interface LoadingStateProps {
  setSection: (s: Section) => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="refresh" className="mx-auto size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    </div>
  </div>
);
