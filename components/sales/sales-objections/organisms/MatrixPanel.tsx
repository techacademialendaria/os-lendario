import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { MatrixRow } from '../types';

interface MatrixPanelProps {
  products: string[];
  matrixData: MatrixRow[];
}

const getHeatmapColor = (val: number): string => {
  if (val > 70) return 'bg-destructive text-destructive-foreground font-bold';
  if (val > 40) return 'bg-destructive/60 text-white';
  if (val > 20) return 'bg-destructive/30 text-white/80';
  return 'bg-muted/30 text-muted-foreground';
};

export const MatrixPanel: React.FC<MatrixPanelProps> = ({ products, matrixData }) => {
  return (
    <Card className="flex h-[500px] flex-col border-border">
      <CardHeader className="border-b border-border px-6 py-4">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <Icon name="grid" className="text-brand-indigo" /> Matriz Objecao x Produto
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-center p-6">
        {/* Matrix Header */}
        <div className="mb-1 grid grid-cols-4 gap-1">
          <div className="self-end pr-2 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Objecao
          </div>
          {products.map((p, i) => (
            <div
              key={i}
              className="rotate-0 self-end pb-2 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              {p}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="space-y-1">
          {matrixData.map((row, i) => (
            <div key={i} className="group grid grid-cols-4 items-center gap-1">
              <div
                className="truncate pr-2 text-right text-xs font-bold text-muted-foreground transition-colors group-hover:text-foreground"
                title={row.objection}
              >
                {row.objection}
              </div>
              {row.values.map((val, j) => (
                <div
                  key={j}
                  className={cn(
                    'flex h-12 cursor-pointer items-center justify-center rounded-sm border border-transparent text-xs transition-transform hover:scale-105 hover:border-white/20',
                    getHeatmapColor(val)
                  )}
                  title={`${val} ocorrencias`}
                >
                  {val > 0 ? val : '-'}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Baixa</span>
          <div className="h-2 w-16 rounded-full bg-gradient-to-r from-muted via-destructive/50 to-destructive"></div>
          <span>Alta Intensidade</span>
        </div>
      </CardContent>
    </Card>
  );
};
