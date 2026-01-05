import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { STATUS_OPTIONS } from '../types';

interface BatchFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export const BatchFiltersBar: React.FC<BatchFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => (
  <div className="flex flex-wrap items-center gap-4">
    <div className="relative flex-1 min-w-[200px]">
      <Icon
        name="search"
        size="size-4"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        placeholder="Buscar por titulo, autor ou slug..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
    <Select
      value={statusFilter}
      onValueChange={onStatusChange}
      options={STATUS_OPTIONS}
      className="w-[180px]"
    />
  </div>
);
