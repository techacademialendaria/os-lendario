import React from 'react';
import { cn } from '../../../lib/utils';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabbedSectionProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tabsClassName?: string;
}

const variantStyles = {
  default: {
    container: 'border-b border-border',
    tab: 'border-b-2 border-transparent px-4 py-2 text-muted-foreground hover:text-foreground',
    active: 'border-primary text-foreground',
  },
  pills: {
    container: 'gap-2',
    tab: 'rounded-full px-4 py-2 text-muted-foreground hover:bg-muted',
    active: 'bg-primary text-primary-foreground hover:bg-primary',
  },
  underline: {
    container: 'gap-1',
    tab: 'border-b-2 border-transparent px-3 py-2 text-muted-foreground hover:text-foreground',
    active: 'border-primary text-primary',
  },
};

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function TabbedSection<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className,
  tabsClassName,
}: TabbedSectionProps<T>) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('flex', styles.container, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            'flex items-center gap-2 font-medium transition-colors',
            styles.tab,
            sizeStyles[size],
            activeTab === tab.id && styles.active,
            tab.disabled && 'cursor-not-allowed opacity-50',
            tabsClassName
          )}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className={cn(
              'flex size-5 items-center justify-center rounded-full text-xs',
              activeTab === tab.id
                ? 'bg-primary-foreground/20 text-inherit'
                : 'bg-muted text-muted-foreground'
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
