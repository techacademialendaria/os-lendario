import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Column } from '../types';

interface TableBodyProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>) => void;
}

const renderCellContent = (value: any, column: Column) => {
  switch (column.type) {
    case 'badge':
      return (
        <Badge variant="secondary" className="text-[10px]">
          {value}
        </Badge>
      );
    case 'tags':
      return Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tag: any, idx: number) => (
            <Badge key={idx} variant="outline" className="text-[9px]">
              {tag}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-[9px]">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      ) : null;
    case 'progress': {
      const val = Math.max(-1, Math.min(1, Number(value) || 0));
      const isPositive = val > 0;
      const absVal = Math.abs(val);
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full',
                isPositive ? 'bg-green-500' : val < 0 ? 'bg-red-500' : 'bg-gray-500'
              )}
              style={{ width: `${absVal * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono w-10">{val.toFixed(2)}</span>
        </div>
      );
    }
    default:
      return value;
  }
};

export const TableBody: React.FC<TableBodyProps> = ({ columns, data, onRowClick }) => (
  <tbody>
    {data.length === 0 ? (
      <tr>
        <td
          colSpan={columns.length}
          className="px-4 py-8 text-center text-muted-foreground"
        >
          <Icon name="inbox" size="size-8" className="mx-auto mb-2 opacity-30" />
          <p>No data found</p>
        </td>
      </tr>
    ) : (
      data.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          className={cn(
            'border-b border-border/20 hover:bg-muted/20 transition-colors',
            onRowClick && 'cursor-pointer'
          )}
          onClick={() => onRowClick?.(row)}
        >
          {columns.map((col) => (
            <td
              key={col.key}
              className="px-4 py-3 text-foreground"
              style={{ width: col.width }}
            >
              {renderCellContent(row[col.key], col)}
            </td>
          ))}
        </tr>
      ))
    )}
  </tbody>
);
