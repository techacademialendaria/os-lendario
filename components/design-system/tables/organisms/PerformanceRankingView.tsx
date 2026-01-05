import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { performanceRows, performanceHeaders } from '../data';

export const PerformanceRankingView: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="font-sans text-2xl font-bold">Ranking de Performance</h3>
          <p className="text-sm text-muted-foreground">
            Layout de alta densidade visual, adaptado para as variáveis semânticas do sistema.
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-primary text-primary">
          System Adapted
        </Badge>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card font-sans text-card-foreground shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="w-16 px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Time</th>
                {performanceHeaders.map((header) => (
                  <th key={header} className="px-4 py-4 text-center">
                    {header}
                  </th>
                ))}
                <th className="px-4 py-4 text-center text-muted-foreground/60">Ship</th>
                <th className="px-6 py-4 text-right font-bold text-primary">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {performanceRows.map((row) => (
                <tr key={row.id} className="group transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="sm"
                        className="ring-2 ring-background transition-all group-hover:ring-primary/50"
                      >
                        <AvatarImage src={row.avatar} />
                        <AvatarFallback className="bg-muted text-foreground">
                          {row.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="block font-semibold text-foreground">{row.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{row.tag}</span>
                      </div>
                    </div>
                  </td>
                  {row.scores.map((score, sIndex) => (
                    <td key={sIndex} className="px-4 py-4 text-center">
                      <div className="inline-flex min-w-[50px] items-center justify-center rounded border border-primary bg-primary/10 px-3 py-1 font-mono font-bold text-primary">
                        {score}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-right text-xl font-bold text-foreground">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
