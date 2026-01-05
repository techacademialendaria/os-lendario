import React from 'react';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT } from '../../ops-tokens';
import type { ViewType, ViewTab } from '../types';
import { VIEW_TABS } from '../types';

interface ViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewTabs: React.FC<ViewTabsProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {VIEW_TABS.map((tab) => (
        <ViewTabButton
          key={tab.id}
          tab={tab}
          isActive={activeView === tab.id}
          onClick={() => onViewChange(tab.id)}
        />
      ))}
    </div>
  );
};

interface ViewTabButtonProps {
  tab: ViewTab;
  isActive: boolean;
  onClick: () => void;
}

const ViewTabButton: React.FC<ViewTabButtonProps> = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'text-white scale-105'
          : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
      }`}
      style={isActive ? { backgroundColor: OPS_ACCENT } : {}}
    >
      <Icon name={tab.icon} size="size-4" />
      {tab.label}
    </button>
  );
};
