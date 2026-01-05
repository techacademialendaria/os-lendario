import React from 'react';
import { STATS } from '../data';

export const ArticleStatsGrid: React.FC = () => (
  <div className="my-12">
    <h3 className="mb-6 flex items-center gap-2 font-sans text-2xl font-bold uppercase tracking-wide">
      <span className="block h-6 w-1 bg-destructive" /> Os numeros que ninguem quer
      admitir
    </h3>
    <div className="space-y-6 rounded-xl border border-border bg-muted/10 p-8">
      <p className="mb-4 font-sans text-sm text-muted-foreground">
        Uma pesquisa com 150+ profissionais em transicao revelou o que todos sentem mas
        poucos falam:
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {STATS.map((stat, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-1 text-4xl font-bold text-destructive">{stat.value}</div>
            <p className="font-sans text-sm leading-snug">{stat.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 border-l-2 border-primary pl-4 text-base italic">
        A media de idade? <strong>40 anos.</strong> Profissionais no auge da capacidade
        intelectual. Desperdicando energia em operacional enquanto jovens de 25 anos usam
        IA para entregar em 2 horas o que voce leva 2 dias.
      </p>
    </div>
  </div>
);
