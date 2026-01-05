import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { Persona } from '@/hooks/useAudienceProfiles';
import type { MatrixRow, PersonaColorInfo } from '../types';

interface ComparisonMatrixProps {
  matrix: MatrixRow[];
  selectedPersonaData: Array<{
    id: string;
    name: string;
    color: string;
    data: Persona | undefined;
    colorInfo: PersonaColorInfo;
  }>;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  matrix,
  selectedPersonaData,
}) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
      <div className="flex items-center justify-between border-b border-border p-6">
        <h3 className="text-lg font-bold text-foreground">Matriz de Comparacao Detalhada</h3>
        <Button variant="link" className="text-sm text-studio-accent hover:text-studio-accent/80">
          Ver todos os dados
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-xs font-semibold uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Metrica / KPI</th>
              {selectedPersonaData.map((sp) => (
                <th key={sp.id} className="border-l border-border/50 px-6 py-4 text-center">
                  <span className={cn('mb-1 block', sp.colorInfo.text)}>{sp.name}</span>
                  <span className="text-[10px] font-normal normal-case opacity-60">
                    {sp.data?.demographics?.role || 'Persona'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {matrix.map((row) => (
              <tr key={row.metric} className="transition-colors hover:bg-background/50">
                <td className="px-6 py-4 font-medium text-foreground">{row.metric}</td>
                {row.values.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      'border-l border-border/50 px-6 py-4 text-center',
                      cell.highlight === 'green' && 'font-bold text-green-500',
                      cell.highlight === 'red' && 'font-bold text-red-400',
                      cell.isQuote && 'text-xs text-muted-foreground'
                    )}
                  >
                    {cell.icon ? (
                      <div className="flex flex-col items-center gap-1">
                        <Icon name={cell.icon as any} size="size-5" className={cell.iconColor} />
                        <span className="text-muted-foreground">{cell.value}</span>
                      </div>
                    ) : cell.isQuote ? (
                      `"${cell.value}"`
                    ) : (
                      cell.value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
