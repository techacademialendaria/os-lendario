import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LanguageIndicator, BookCoverThumb } from '../molecules';
import type { TableViewProps } from '../types';
import { STATUS_CONFIG } from '../types';
import { formatRelativeDate } from '../../admin/utils';

/**
 * TableView - List view for books in table format
 */
export const TableView: React.FC<TableViewProps> = ({
  books,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
}) => {
  const getBookId = (book: typeof books[0]) =>
    book.languages.pt?.id || book.languages.en?.id || book.languages.es?.id || '';

  return (
    <div className="relative animate-fade-in overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedIds.length === books.length && books.length > 0}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[80px]">Capa</TableHead>
            <TableHead>Titulo & Autor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Idiomas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Atualizado</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => {
            const bookId = getBookId(book);
            const statusConfig = STATUS_CONFIG[book.status as keyof typeof STATUS_CONFIG];

            return (
              <TableRow
                key={bookId}
                className={cn(
                  'group transition-colors hover:bg-muted/20',
                  selectedIds.includes(bookId) && 'bg-brand-gold/5'
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(bookId)}
                    onCheckedChange={() => onToggleSelect(bookId)}
                  />
                </TableCell>
                <TableCell>
                  <BookCoverThumb book={book} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span
                      className="cursor-pointer text-sm font-bold text-foreground transition-colors hover:text-brand-gold"
                      onClick={() => onEdit(book)}
                    >
                      {book.originalTitle}
                    </span>
                    <span className="font-serif text-xs text-muted-foreground">
                      {book.author?.name || 'Autor Desconhecido'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {book.category ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-normal uppercase tracking-wider"
                    >
                      {book.category.name}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <LanguageIndicator book={book} />
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusConfig?.variant || 'secondary'}
                    className="text-[9px] font-bold uppercase"
                  >
                    {statusConfig?.label || book.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatRelativeDate(book.updatedAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu
                    align="right"
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Icon name="menu-dots-vertical" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem onClick={() => onEdit(book)}>
                      <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="eye" className="mr-2 h-4 w-4" /> Ver no Site
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      destructive
                      onClick={() => onDelete(bookId, book.originalTitle)}
                    >
                      <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
