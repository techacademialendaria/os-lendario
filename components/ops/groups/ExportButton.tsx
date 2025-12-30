import { useState } from 'react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../../ui/dropdown-menu';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import {
  exportToExcel,
  exportToCSV,
  exportToJSON,
  exportToPDF,
  type ExportOptions,
} from '../../../lib/groups-export';
import type { GroupRecord } from '../../../types/groups';

interface ExportButtonProps {
  registros: GroupRecord[];
  options: ExportOptions;
  className?: string;
}

export function ExportButton({ registros, options, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'excel' | 'csv' | 'json' | 'pdf') => {
    if (registros.length === 0) return;

    setIsExporting(true);
    try {
      switch (format) {
        case 'excel':
          exportToExcel(registros, options);
          break;
        case 'csv':
          exportToCSV(registros, options);
          break;
        case 'json':
          exportToJSON(registros, options);
          break;
        case 'pdf':
          exportToPDF(registros, options);
          break;
      }
    } finally {
      setIsExporting(false);
    }
  };

  const disabled = registros.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('rounded-xl border-border gap-2', className)}
          disabled={disabled || isExporting}
        >
          <Icon name="download" className="size-4" />
          Exportar
          {isExporting && <Icon name="refresh" className="size-3 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {registros.length} registro{registros.length !== 1 ? 's' : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2 cursor-pointer">
          <Icon name="table" className="size-4 text-green-600" />
          Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')} className="gap-2 cursor-pointer">
          <Icon name="document" className="size-4 text-blue-600" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')} className="gap-2 cursor-pointer">
          <Icon name="code" className="size-4 text-amber-600" />
          JSON
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2 cursor-pointer">
          <Icon name="page" className="size-4 text-red-600" />
          PDF (Imprimir)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
