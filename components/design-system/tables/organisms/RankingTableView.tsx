import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { rankingContributors } from '../data';
import { POSITION_STYLES } from '../types';

export const RankingTableView: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="font-sans text-xl font-semibold">Tabela de Ranking (Clássica)</h3>
      <p className="text-sm text-muted-foreground">
        Utilizada para gamificação, com destaque visual para posições e métricas.
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Pos.
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Contribuidor
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Prompts Aprovados
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Score Médio
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Visitas
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Favoritos
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Avaliações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankingContributors.map((contributor) => (
              <TableRow key={contributor.position} className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border font-bold shadow-sm ${POSITION_STYLES[contributor.positionStyle]}`}
                  >
                    {contributor.position}º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border border-brand-blue/10 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue">
                      <AvatarFallback className="font-bold">{contributor.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{contributor.name}</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        {contributor.role}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">
                  {contributor.promptsApproved}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="info" className="rounded-md px-3 font-mono text-sm">
                    {contributor.avgScore}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="eye" size="size-3" /> {contributor.views}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="heart" size="size-3" /> {contributor.favorites}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="comment-alt" size="size-3" /> {contributor.reviews}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
