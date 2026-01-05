import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ToolbarProps } from '../types';
import { STATUS_OPTIONS } from '../types';

/**
 * Toolbar - Search, filters and layout controls
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  layoutMode,
  onLayoutModeChange,
}) => {
  const categoryOptions = [
    { label: 'Todas', value: 'all' },
    ...categories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-3 shadow-sm md:flex-row">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size="size-4"
        />
        <Input
          placeholder="Buscar por titulo ou autor..."
          className="h-10 border-transparent bg-muted/20 pl-10 focus:border-brand-gold/50"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters and Layout Toggle */}
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select
          placeholder="Status"
          value={statusFilter}
          onValueChange={onStatusFilterChange}
          options={[...STATUS_OPTIONS]}
          className="h-10 w-full md:w-36"
        />

        <Select
          placeholder="Categoria"
          value={categoryFilter}
          onValueChange={onCategoryFilterChange}
          options={categoryOptions}
          className="h-10 w-full md:w-44"
        />

        <Separator orientation="vertical" className="hidden h-8 md:block" />

        {/* Layout Toggle */}
        <div className="flex rounded-lg border border-border bg-muted/50 p-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 transition-all',
              layoutMode === 'grid'
                ? 'bg-background text-brand-gold shadow-sm'
                : 'text-muted-foreground'
            )}
            onClick={() => onLayoutModeChange('grid')}
          >
            <Icon name="grid" size="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 transition-all',
              layoutMode === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground'
            )}
            onClick={() => onLayoutModeChange('list')}
          >
            <Icon name="list" size="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
