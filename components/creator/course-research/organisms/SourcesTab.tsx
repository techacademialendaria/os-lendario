import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import type { SourcesTabProps } from '../types';
import { getSourceIcon } from '../types';

export const SourcesTab: React.FC<SourcesTabProps> = ({ sources }) => {
  return (
    <div className="mt-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Referencias e fontes de pesquisa
        </p>
        <Button variant="outline" size="sm">
          <Icon name="plus" className="mr-2 size-3" /> Adicionar Fonte
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Tipo</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="w-24">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                    <Icon
                      name={getSourceIcon(source.type)}
                      size="size-4"
                      className="text-muted-foreground"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{source.title}</p>
                    {source.url && (
                      <a
                        href={source.url}
                        className="text-xs hover:underline text-studio-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.url}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{source.notes}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="pencil" size="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Icon name="trash" size="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
