import React from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Select } from '@/components/ui/select';
import { STATUS_FILTER_OPTIONS } from '../types';
import type { FiltersBarProps } from '../types';

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  filterStatus,
  filterModule,
  modules,
  onSearchChange,
  onStatusChange,
  onModuleChange,
}) => {
  const moduleOptions = [
    { label: 'Todos os Modulos', value: 'all' },
    ...modules.map((m) => ({ label: m, value: m })),
  ];

  return (
    <div className="border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size="size-4"
          />
          <Input
            placeholder="Buscar por titulo ou ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select
          placeholder="Status"
          value={filterStatus}
          onValueChange={onStatusChange}
          className="w-40"
          options={STATUS_FILTER_OPTIONS}
        />
        <Select
          placeholder="Modulo"
          value={filterModule}
          onValueChange={onModuleChange}
          className="w-56"
          options={moduleOptions}
        />
      </div>
    </div>
  );
};
