import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { FiltersBarProps, FilterStatus } from '../types';

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}) => (
  <Card className="border-border/30 bg-card/50">
    <CardContent className="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size="size-4"
        />
        <Input
          placeholder="Buscar projetos..."
          className="h-10 rounded-lg border-border/30 bg-muted/20 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select
        placeholder="Todos"
        value={filterStatus}
        onValueChange={(val) => setFilterStatus(val as FilterStatus)}
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Em Progresso', value: 'in_progress' },
          { label: 'Exportados', value: 'exported' },
        ]}
        className="h-10 w-full sm:w-[140px]"
      />
      <div className="flex rounded-lg border border-border/30 bg-muted/20 p-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8',
            viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => setViewMode('list')}
        >
          <Icon name="list" size="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8',
            viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => setViewMode('grid')}
        >
          <Icon name="grid" size="size-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);
