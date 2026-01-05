import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { ObjectionAlert } from '../types';

interface AlertsPanelProps {
  alerts: ObjectionAlert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <Card className="border-y border-l-4 border-r border-border border-l-brand-yellow bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-brand-yellow/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-black">
            <Icon name="exclamation" size="size-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
              Atencao: Sem Material de Apoio
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Objecoes com alta frequencia detectadas sem playbooks ou conteudo cadastrado.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow/10"
        >
          Ver Todos
        </Button>
      </CardHeader>
      <div className="p-0">
        <Table>
          <TableBody>
            {alerts.map((alert, i) => (
              <TableRow key={i} className="border-border hover:bg-muted/20">
                <TableCell className="text-sm font-bold">{alert.objection}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{alert.freq}</span> ocorrencias
                </TableCell>
                <TableCell>
                  <Badge
                    variant="warning"
                    className="border-brand-yellow/20 bg-brand-yellow/10 text-brand-yellow-dark"
                  >
                    Crescimento: {alert.growth}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="h-7 bg-brand-yellow text-xs font-bold text-black hover:bg-brand-yellow/90"
                  >
                    <Icon name="magic-wand" size="size-3" className="mr-2" /> Criar Material
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
