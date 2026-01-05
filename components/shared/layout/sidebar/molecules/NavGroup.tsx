import React from 'react';
import { Icon } from '../../../../ui/icon';
import { Button } from '../../../../ui/button';
import { cn } from '../../../../../lib/utils';
import type { NavItem, Section } from '../types';

interface NavGroupProps {
  item: NavItem;
  depth: number;
  isCollapsed: boolean;
  isExpanded: boolean;
  isParentActive: boolean;
  t: (key: string) => string;
  onToggleSubmenu: (key: string) => void;
  renderChildren: (children: NavItem[], depth: number) => React.ReactNode;
}

export const NavGroup: React.FC<NavGroupProps> = ({
  item,
  depth,
  isCollapsed,
  isExpanded,
  isParentActive,
  t,
  onToggleSubmenu,
  renderChildren,
}) => {
  const label = t(item.key);
  const isSoon = item.status === 'soon';
  const isRootItem = depth === 0;

  const paddingLeftClass = depth === 0 ? 'px-3' : `pl-${3 + depth * 3}`;
  const alignmentClass = isCollapsed
    ? 'justify-center px-2'
    : `justify-between ${paddingLeftClass}`;

  return (
    <li className="mb-1">
      <Button
        variant="ghost"
        onClick={() => onToggleSubmenu(item.key)}
        className={cn(
          'group relative flex h-auto w-full items-center rounded-lg py-2.5 text-sm font-normal transition-all duration-200',
          alignmentClass,
          isRootItem
            ? 'font-semibold text-foreground hover:bg-muted/50'
            : 'text-sm text-muted-foreground hover:bg-muted/30 hover:text-foreground',
          isParentActive && !isExpanded && !isRootItem ? 'font-medium text-primary' : '',
          isRootItem && isParentActive ? 'bg-muted/30 hover:bg-muted/50' : '',
          isSoon && 'opacity-60'
        )}
        title={isCollapsed ? label : undefined}
      >
        <div
          className={cn('flex items-center', isCollapsed ? 'w-full justify-center' : 'gap-3')}
        >
          {item.icon && (
            <Icon
              name={item.icon}
              size={isRootItem ? 'size-5' : 'size-4'}
              className={cn(
                isParentActive && isRootItem
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground'
              )}
            />
          )}
          {!isCollapsed && <span>{label}</span>}
          {!isCollapsed && isRootItem && item.badge && (
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              {item.badge}
            </span>
          )}
        </div>
        {!isCollapsed && (
          <Icon
            name="angle-small-down"
            className={cn(
              'size-4 opacity-50 transition-transform duration-200',
              isExpanded ? 'rotate-180' : ''
            )}
          />
        )}
      </Button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          isExpanded && !isCollapsed
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <ul className={cn('space-y-1 pb-1', isRootItem && 'mt-1')}>
            {item.children && renderChildren(item.children, depth + 1)}
          </ul>
        </div>
      </div>
    </li>
  );
};
