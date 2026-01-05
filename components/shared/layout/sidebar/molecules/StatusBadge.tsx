import React from 'react';
import type { NavItem } from '../types';

interface StatusBadgeProps {
  item: NavItem;
  isRootItem: boolean;
  isCollapsed: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  item,
  isRootItem,
  isCollapsed,
}) => {
  if (isCollapsed) return null;

  // For root items with badges (count badges like "8 cursos")
  if (isRootItem && item.badge) {
    return (
      <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
        {item.badge}
      </span>
    );
  }

  // For items with status 'soon' - no badge
  if (item.status === 'soon') {
    return null;
  }

  if (item.status === 'beta') {
    return (
      <span className="ml-auto rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-medium text-amber-600 dark:text-amber-400">
        Beta
      </span>
    );
  }

  return null;
};
