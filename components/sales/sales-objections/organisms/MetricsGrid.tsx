import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Objecoes Unicas
            <Icon name="fingerprint" className="text-brand-blue" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3">
            <span className="font-mono text-3xl font-bold text-foreground">14</span>
            <Badge
              variant="outline"
              className="h-5 border-brand-blue/20 bg-brand-blue/10 text-[10px] text-brand-blue"
            >
              +2 novas
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Mais Frequente
            <Icon name="flame" className="text-destructive" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="truncate text-lg font-bold text-foreground">Preco muito alto</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">245 calls</span>
              <Icon name="trend-up" className="size-3 text-destructive" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Taxa de Resolucao (IA)
            <Icon name="check-circle" className="text-brand-green" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3">
            <span className="font-mono text-3xl font-bold text-foreground">42%</span>
            <p className="mb-1 text-[10px] text-muted-foreground">Contornadas com sucesso</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
