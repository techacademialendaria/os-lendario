import React from 'react';
import MindsTopbar from '../MindsTopbar';
import { Section } from '@/types';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useComparisonView } from './hooks';
import { ComparisonHero, ComparisonGridView, ComparisonListView } from './organisms';
import { mindsData } from './data';
import type { MindComparisonProps } from './types';

const MindComparisonTemplate: React.FC<MindComparisonProps> = ({ setSection }) => {
  const { viewMode, setViewMode } = useComparisonView();

  usePageTitle('Matriz de Comparacao');

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <MindsTopbar currentSection={Section.APP_MINDS_MATRIX} setSection={setSection} />

      <ComparisonHero viewMode={viewMode} onViewModeChange={setViewMode} />

      <main className="mx-auto w-full max-w-[1600px] p-6 md:p-10">
        {viewMode === 'grid' ? (
          <ComparisonGridView minds={mindsData} />
        ) : (
          <ComparisonListView minds={mindsData} />
        )}
      </main>
    </div>
  );
};

export default MindComparisonTemplate;
