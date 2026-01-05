import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  FRAGMENT_TYPE_LABELS,
  FRAGMENT_TYPE_ICONS,
} from '../../../../hooks/useMindFragments';
import type { RelevanceFilter } from '../types';

interface FragmentsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterRelevance: RelevanceFilter;
  onRelevanceChange: (value: RelevanceFilter) => void;
  filterType: string | null;
  onClearTypeFilter: () => void;
  onCreateClick: () => void;
}

export const FragmentsFilters: React.FC<FragmentsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterRelevance,
  onRelevanceChange,
  filterType,
  onClearTypeFilter,
  onCreateClick,
}) => {
  return (
    <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg border border-white/5">
      <div className="relative flex-1 max-w-md">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          placeholder="Buscar nos fragmentos..."
          className="pl-9 h-9 bg-black/20 border-transparent focus:border-brand-gold/30 text-xs"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Relevance Filter */}
      <div className="flex items-center gap-1 bg-black/40 rounded-md p-1 border border-white/5">
        {(['all', 'high', 'medium', 'low'] as const).map((level) => (
          <Button
            key={level}
            variant={filterRelevance === level ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onRelevanceChange(level)}
            className="h-7 px-2 text-xs"
          >
            {level === 'all' ? 'Todos' : level === 'high' ? 'Alta' : level === 'medium' ? 'Media' : 'Baixa'}
          </Button>
        ))}
      </div>

      {/* Type Filter */}
      {filterType && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearTypeFilter}
          className="h-7 text-xs gap-1"
        >
          <Icon name={FRAGMENT_TYPE_ICONS[filterType] || 'file'} size="size-3" />
          {FRAGMENT_TYPE_LABELS[filterType] || filterType}
          <Icon name="times" size="size-3" className="ml-1" />
        </Button>
      )}

      {/* Create Button */}
      <Button
        onClick={onCreateClick}
        size="sm"
        className="h-7 ml-auto bg-brand-gold hover:bg-brand-gold/90 text-black text-xs"
      >
        <Icon name="plus" size="size-3" className="mr-1" />
        Novo
      </Button>
    </div>
  );
};
