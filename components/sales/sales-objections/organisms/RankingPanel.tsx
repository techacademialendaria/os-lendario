import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sparkline } from '../molecules';
import type { ObjectionRanking } from '../types';

interface RankingPanelProps {
  rankings: ObjectionRanking[];
}

export const RankingPanel: React.FC<RankingPanelProps> = ({ rankings }) => {
  const maxCount = Math.max(...rankings.map((r) => r.count));

  return (
    <Card className="flex h-[500px] flex-col border-border">
      <CardHeader className="border-b border-border px-6 py-4">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <Icon name="list-ol" className="text-foreground" /> Ranking de Frequencia
        </CardTitle>
      </CardHeader>
      <div className="custom-scrollbar flex-1 overflow-y-auto p-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/10 backdrop-blur-sm">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[200px] text-xs font-bold">Objecao</TableHead>
              <TableHead className="w-[100px] text-center text-xs font-bold">
                Trend (7d)
              </TableHead>
              <TableHead className="text-right text-xs font-bold">Calls</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((obj, i) => (
              <TableRow key={i} className="group border-border hover:bg-muted/20">
                <TableCell className="text-sm font-medium">
                  {obj.name}
                  <Progress
                    value={(obj.count / maxCount) * 100}
                    className="mt-2 h-1.5 bg-muted"
                    indicatorClassName={obj.color}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Sparkline data={obj.trend} color={obj.stroke} />
                </TableCell>
                <TableCell className="text-right font-mono text-sm font-bold">
                  {obj.count}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Icon name="arrow-right" size="size-3" />
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
