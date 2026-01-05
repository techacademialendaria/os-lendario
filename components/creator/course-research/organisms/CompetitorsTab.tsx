import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { CompetitorsTabProps } from '../types';

export const CompetitorsTab: React.FC<CompetitorsTabProps> = ({ competitors }) => {
  return (
    <div className="mt-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Analise dos principais concorrentes no mercado
        </p>
        <Button variant="outline" size="sm">
          <Icon name="plus" className="mr-2 size-3" /> Adicionar Concorrente
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {competitors.map((comp) => (
          <Card key={comp.id} className="transition-colors hover:border-primary/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{comp.name}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {comp.platform}
                    </Badge>
                    <span className="text-xs">{comp.price}</span>
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="menu-dots-vertical" size="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Icon name="star" className="size-3 text-brand-yellow" type="solid" />
                  <span className="font-medium">{comp.rating}</span>
                </div>
                <span className="text-muted-foreground">{comp.students} alunos</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-success text-xs font-bold uppercase tracking-wider">
                  Pontos Fortes
                </p>
                <div className="flex flex-wrap gap-1">
                  {comp.strengths.map((s, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-success/10 text-success border-0 text-[10px]"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                  Fraquezas
                </p>
                <div className="flex flex-wrap gap-1">
                  {comp.weaknesses.map((w, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="border-0 bg-destructive/10 text-[10px] text-destructive"
                    >
                      {w}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
