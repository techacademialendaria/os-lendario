import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { Column, SortOrder } from '../types';

interface TableHeaderProps {
  columns: Column[];
  sortBy: string | null;
  sortOrder: SortOrder;
  onSort: (key: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortBy,
  sortOrder,
  onSort
}) => (
  <thead>
    <tr className="border-b border-border/20 bg-muted/30">
      {columns.map((col) => (
        <th
          key={col.key}
          className={cn(
            'px-4 py-3 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider',
            col.sortable && 'cursor-pointer hover:text-foreground transition-colors',
            col.width && `w-[${col.width}]`
          )}
          onClick={() => col.sortable && onSort(col.key)}
        >
          <div className="flex items-center gap-2">
            {col.header}
            {col.sortable && (
              <Icon
                name={
                  sortBy === col.key
                    ? sortOrder === 'asc'
                      ? 'arrow-up'
                      : 'arrow-down'
                    : 'arrow-up-down'
                }
                size="size-3"
                className={cn(
                  'opacity-30',
                  sortBy === col.key && 'opacity-100'
                )}
              />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);
