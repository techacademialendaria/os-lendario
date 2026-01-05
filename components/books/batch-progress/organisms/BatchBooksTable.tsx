import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BatchBookRow } from '../../admin/BatchBookRow';

import type { BatchBook } from '@/hooks/useBatchProgress';

interface BatchBooksTableProps {
  books: BatchBook[];
  actionLoading: string | null;
  serverAvailable: boolean;
  searchQuery: string;
  onPlay: (slug: string) => void;
  onPause: (slug: string) => void;
  onRetry: (slug: string, fromPhase?: number) => void;
  onRemove: (slug: string, title: string) => void;
  onViewLogs: (slug: string, title: string) => void;
  onClearSearch: () => void;
}

export const BatchBooksTable: React.FC<BatchBooksTableProps> = ({
  books,
  actionLoading,
  serverAvailable,
  searchQuery,
  onPlay,
  onPause,
  onRetry,
  onRemove,
  onViewLogs,
  onClearSearch,
}) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[35%]">Livro</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-[25%]">Fase</TableHead>
            <TableHead className="w-[10%] text-center">Score</TableHead>
            <TableHead className="w-[15%] text-right">Acoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Icon name="inbox" size="size-12" className="opacity-50" />
                  <span>Nenhum livro encontrado</span>
                  {searchQuery && (
                    <Button variant="link" size="sm" onClick={onClearSearch}>
                      Limpar busca
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => (
              <BatchBookRow
                key={book.slug}
                book={book}
                isLoading={actionLoading === book.slug}
                serverAvailable={serverAvailable}
                onPlay={onPlay}
                onPause={onPause}
                onRetry={onRetry}
                onRemove={onRemove}
                onViewLogs={onViewLogs}
              />
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
