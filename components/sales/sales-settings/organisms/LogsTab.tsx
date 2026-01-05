import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { LogEntry } from '../types';
import { LOG_COLORS } from '../types';

interface LogsTabProps {
  logs: LogEntry[];
}

export const LogsTab: React.FC<LogsTabProps> = ({ logs }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer bg-muted">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Info
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Warning
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Error
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Icon name="download" size="size-3" /> Exportar CSV
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Timestamp</TableHead>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead>Mensagem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, i) => (
            <TableRow key={i} className="font-mono text-xs">
              <TableCell className="text-muted-foreground">{log.time}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    'font-bold uppercase',
                    LOG_COLORS[log.type] || 'text-muted-foreground'
                  )}
                >
                  {log.type}
                </span>
              </TableCell>
              <TableCell>{log.msg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
