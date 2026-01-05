import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import type { FilterConfig } from '../types';

interface SearchAndFiltersProps {
  searchPlaceholder: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters?: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  filters,
  activeFilters,
  onFilterChange
}) => (
  <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/10 border border-border/20 md:flex-row md:items-center md:gap-4">
    <div className="flex-1 relative">
      <Icon
        name="search"
        size="size-4"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
      />
      <Input
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 bg-background/50 border-border/30"
        aria-label={`Search ${searchPlaceholder.toLowerCase()}`}
      />
    </div>

    {filters && filters.length > 0 && (
      <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row md:items-center md:gap-2">
        {filters.map((filter, idx) => (
          <select
            key={idx}
            value={activeFilters[filter.key] || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="px-3 py-2 rounded-lg bg-background/50 border border-border/30 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label={`Filter by ${filter.label}`}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt, optIdx) => (
              <option key={optIdx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    )}
  </div>
);
