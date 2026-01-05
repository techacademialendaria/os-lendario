import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { invoices, financialTotal } from '../data';
import { STATUS_BADGE_VARIANTS, STATUS_LABELS } from '../types';

export const FinancialHistoryView: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="font-sans text-xl font-semibold">Histórico Financeiro</h3>
      <p className="text-sm text-muted-foreground">
        Tabela otimizada para dados numéricos, alinhamento à direita para moedas e status.
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableCaption className="mb-4">Lista das últimas transações do sistema.</TableCaption>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[100px] text-muted-foreground">Fatura</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Método</TableHead>
              <TableHead className="text-right text-muted-foreground">Data</TableHead>
              <TableHead className="text-right text-muted-foreground">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">{invoice.id}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_BADGE_VARIANTS[invoice.status]} className="rounded-sm px-2 font-normal">
                    {STATUS_LABELS[invoice.status]}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Icon name={invoice.methodIcon} size="size-3" className="text-muted-foreground" />
                  <span className="text-sm">{invoice.methodLabel}</span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  {invoice.date}
                </TableCell>
                <TableCell
                  className={`text-right font-mono font-medium ${
                    invoice.isCancelled
                      ? 'text-muted-foreground line-through decoration-destructive/50'
                      : 'text-foreground'
                  }`}
                >
                  {invoice.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="border-t border-border bg-muted/20">
            <TableRow className="border-none hover:bg-transparent">
              <TableCell
                colSpan={4}
                className="text-right font-sans text-sm font-medium text-muted-foreground"
              >
                Total Processado
              </TableCell>
              <TableCell className="text-right font-mono text-lg font-bold text-foreground">
                {financialTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};
