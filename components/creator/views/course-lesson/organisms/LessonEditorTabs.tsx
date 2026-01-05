// @ts-nocheck
import React from 'react';
import { Icon } from '../../../../ui/icon';
import { cn } from '../../../../../lib/utils';
import type { EditorTab } from '../types';

interface LessonEditorTabsProps {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
}

const tabs: { id: EditorTab; label: string; icon: string }[] = [
  { id: 'script', label: 'Roteiro', icon: 'document' },
  { id: 'media', label: 'Midia', icon: 'play' },
  { id: 'exercises', label: 'Exercicios', icon: 'check-square' },
  { id: 'settings', label: 'Configuracoes', icon: 'settings-sliders' },
];

export const LessonEditorTabs: React.FC<LessonEditorTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="shrink-0 border-b border-border bg-card/30 px-8">
      <div className="mx-auto flex max-w-4xl items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-b-2 text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon name={tab.icon} size="size-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
