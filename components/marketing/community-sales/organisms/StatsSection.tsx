import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { STATS } from '../data';

export const StatsSection: React.FC = () => (
  <section className="px-4 py-20">
    <div className="mx-auto max-w-5xl">
      <h2 className="mx-auto mb-12 max-w-2xl text-center text-3xl font-bold">
        Os dados que provam que <span className="text-destructive">voce nao esta sozinho</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none bg-muted/10 text-center shadow-none">
            <CardContent className="pt-6">
              <div className="mb-2 text-5xl font-bold text-destructive">{stat.value}</div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-serif text-xs text-muted-foreground">{stat.sublabel}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-r-lg border-l-4 border-primary bg-primary/5 p-6">
        <p className="font-serif text-lg italic text-muted-foreground">
          "O problema nao e voce. E o sistema que voce esta usando. Ou a falta dele.
          Profissionais qualificados, experientes, mas travados pela complexidade."
        </p>
      </div>
    </div>
  </section>
);
