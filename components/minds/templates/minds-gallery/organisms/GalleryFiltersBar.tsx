import React from 'react';
import { Icon } from '../../../../ui/icon';
import { Input } from '../../../../ui/input';
import { Select } from '../../../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../../../ui/tabs';
import type { ViewMode, StatusFilter } from '../types';

interface GalleryFiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const GalleryFiltersBar: React.FC<GalleryFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-studio-card flex flex-col items-start justify-between gap-4 rounded-xl border border-studio-border p-2 shadow-sm xl:flex-row xl:items-center">
      {/* Search */}
      <div className="relative w-full xl:w-96">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size="size-4"
        />
        <Input
          placeholder="Buscar por nome, tag ou categoria..."
          className="h-10 rounded-lg border-transparent bg-transparent pl-10 text-sm transition-all hover:bg-studio-primary/5 focus:border-studio-primary/20 focus:bg-studio-primary/5"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters Group */}
      <div className="flex w-full flex-wrap items-center gap-2 p-1 xl:w-auto">
        <Select
          placeholder="Categorias"
          options={[
            { label: 'Todas Categorias', value: 'all' },
            { label: 'Tecnologia', value: 'technology_innovation' },
            { label: 'Negocios', value: 'business_strategy' },
            { label: 'Filosofia', value: 'philosophy' },
          ]}
          className="h-9 w-[160px] border-studio-border bg-transparent text-xs hover:border-studio-primary/20"
        />

        <Tabs
          value={statusFilter}
          onValueChange={(v) => onStatusFilterChange(v as StatusFilter)}
          className="w-auto"
        >
          <TabsList className="h-9 rounded-lg border border-studio-border bg-studio-card p-1">
            <TabsTrigger
              value="all"
              className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-studio-primary/10 data-[state=active]:text-white"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="production"
              className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400"
            >
              Producao
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="h-7 rounded-sm text-[10px] text-zinc-500 data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-400"
            >
              Em Progresso
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mx-2 hidden h-6 w-px bg-studio-border md:block"></div>

        <div className="flex gap-1 rounded-lg border border-studio-border bg-studio-card p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`rounded p-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-studio-primary/10 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon name="grid" size="size-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`rounded p-1.5 transition-all ${
              viewMode === 'list'
                ? 'bg-studio-primary/10 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon name="list" size="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
