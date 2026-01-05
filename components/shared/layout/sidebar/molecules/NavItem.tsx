import React from 'react';
import { Icon } from '../../../../ui/icon';
import { Button } from '../../../../ui/button';
import { cn } from '../../../../../lib/utils';
import type { NavItem as NavItemType, Section } from '../types';
import { StatusBadge } from './StatusBadge';

interface NavItemProps {
  item: NavItemType;
  depth: number;
  isCollapsed: boolean;
  currentSection: Section;
  t: (key: string) => string;
  onSectionClick: (section: Section) => void;
}

export const NavItemLeaf: React.FC<NavItemProps> = ({
  item,
  depth,
  isCollapsed,
  currentSection,
  t,
  onSectionClick,
}) => {
  const isActive = item.section === currentSection;
  const label = t(item.key);
  const isSoon = item.status === 'soon';
  const isRootItem = depth === 0;

  const paddingLeftClass = depth === 0 ? 'px-3' : `pl-${3 + depth * 3}`;
  const isCreatorItem = item.key === 'learn_courses' || item.section?.startsWith('app_creator');

  return (
    <li className="mb-1">
      <Button
        variant="ghost"
        onClick={() => item.section && !isSoon && onSectionClick(item.section)}
        disabled={isSoon}
        className={cn(
          'flex h-auto w-full items-center rounded-lg py-2 text-left text-sm font-normal transition-all duration-200',
          isCollapsed ? 'justify-center px-2' : `gap-3 ${paddingLeftClass}`,
          isRootItem && isActive
            ? 'border-l-2 border-primary bg-primary/10 font-bold text-primary hover:bg-primary/15'
            : isRootItem
              ? 'font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              : isActive && isCreatorItem
                ? 'rounded-r-none border-r-2 border-studio-primary bg-studio-primary/10 font-medium hover:bg-studio-primary/15'
                : isActive
                  ? 'rounded-r-none border-r-2 border-primary bg-primary/5 font-medium text-primary hover:bg-primary/10'
                  : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
          isSoon &&
            'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted-foreground'
        )}
        style={isActive && isCreatorItem ? { color: 'hsl(var(--primary-color))' } : {}}
        title={isCollapsed ? label : undefined}
      >
        {item.icon ? (
          <Icon
            name={item.icon}
            size={isRootItem ? 'size-5' : 'size-4'}
            className={cn(
              isRootItem && isActive
                ? 'text-primary'
                : 'text-muted-foreground group-hover:text-foreground',
              !isRootItem && isActive && !isCreatorItem && 'text-primary'
            )}
            style={
              !isRootItem && isActive && isCreatorItem
                ? { color: 'hsl(var(--primary-color))' }
                : {}
            }
          />
        ) : (
          <div
            className={cn(
              'h-1.5 w-1.5 shrink-0 rounded-full',
              !isCollapsed && 'ml-1.5 mr-1',
              isActive && !isCreatorItem
                ? 'bg-primary'
                : !isActive
                  ? 'bg-border group-hover:bg-muted-foreground'
                  : ''
            )}
            style={
              isActive && isCreatorItem ? { backgroundColor: 'hsl(var(--primary-color))' } : {}
            }
          />
        )}

        {!isCollapsed && <span className="flex-1">{label}</span>}
        <StatusBadge item={item} isRootItem={isRootItem} isCollapsed={isCollapsed} />
      </Button>
    </li>
  );
};
